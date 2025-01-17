import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { searchNearbyPlaces } from '../../services/mapService';
import '../../styles/global.css';
import ReactDOM from 'react-dom';

// Custom icons for different facility types
const createIcon = (color: string) => new L.Icon({
  iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color}'%3E%3Cpath d='M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'/%3E%3C/svg%3E`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const icons = {
  hospital: createIcon('%23e11d48'), // Red
  clinic: createIcon('%234f46e5'), // Indigo
  pharmacy: createIcon('%2316a34a') // Green
};

interface Place {
  id: string;
  name: string;
  type: string;
  lat: number;
  lon: number;
  distance?: number;
}

interface MapPosition {
  lat: number;
  lng: number;
}

function RoutingControl({ start, end }: { start: L.LatLng; end: L.LatLng }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: '#6366f1', weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      }
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
}

function LocationMarker({ onPositionFound }: { onPositionFound: (pos: MapPosition) => void }) {
  const [position, setPosition] = useState<MapPosition | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
      onPositionFound(e.latlng);
    });
  }, [map, onPositionFound]);

  return position === null ? null : (
    <Marker 
      position={position}
      icon={new L.Icon({
        iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230ea5e9"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3C/svg%3E',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      })}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function HealthcareMap() {
  const [userPosition, setUserPosition] = useState<MapPosition | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [selectedType, setSelectedType] = useState<string>('hospital');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize map
    try {
      if (!userPosition) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Unable to get your location. Please enable location services.');
            setLoading(false);
          }
        );
      }
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Unable to initialize map. Please try again later.');
      setLoading(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!userPosition) return;
    
    try {
      setLoading(true);
      const places = await searchNearbyPlaces(selectedType, 5000);
      setNearbyPlaces(places);
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to search for nearby places. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const facilities = [
    { value: 'hospital', label: 'Hospitals' },
    { value: 'clinic', label: 'Clinics' },
    { value: 'pharmacy', label: 'Pharmacies' }
  ];

  // Create portal container
  useEffect(() => {
    const portalContainer = document.getElementById('map-controls-portal');
    if (!portalContainer) {
      const div = document.createElement('div');
      div.id = 'map-controls-portal';
      div.style.position = 'fixed';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.pointerEvents = 'none';
      div.style.zIndex = '100000000';
      document.body.appendChild(div);
    }
  }, []);

  const handlePositionFound = async (position: MapPosition) => {
    setUserPosition(position);
    await handleSearch();
  };

  const handleFacilityTypeChange = async (type: string) => {
    setSelectedType(type);
    if (userPosition) {
      await handleSearch();
    }
  };

  const renderControls = () => {
    const portalContainer = document.getElementById('map-controls-portal');
    if (!portalContainer) return null;

    const controls = (
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        pointerEvents: 'auto',
        zIndex: 100000000
      }}>
        <div className="map-controls-container" style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ position: 'relative', zIndex: 100000000 }}
          >
            {facilities.find(f => f.value === selectedType)?.label || 'Select Facility'}
            <span className="ml-2">▼</span>
          </button>
          
          {isDropdownOpen && (
            <div 
              className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
              style={{ position: 'absolute', zIndex: 100000000 }}
            >
              {facilities.map((facility) => (
                <div
                  key={facility.value}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleFacilityTypeChange(facility.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {facility.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    return ReactDOM.createPortal(controls, portalContainer);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full h-[600px] relative" style={{ isolation: 'isolate' }}>
      {/* Map Container with lower z-index */}
      <div className="relative z-0">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={13}
          style={{ zIndex: 0 }}
          className="h-[400px] w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onPositionFound={handlePositionFound} />

          {nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={icons[place.type as keyof typeof icons]}
              eventHandlers={{
                click: () => setSelectedPlace(place),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{place.type}</p>
                  {place.distance && (
                    <p className="text-sm text-gray-600">
                      {(place.distance / 1000).toFixed(2)} km away
                    </p>
                  )}
                  {userPosition && (
                    <button
                      onClick={() => setSelectedPlace(place)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                    >
                      Get Directions
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {userPosition && selectedPlace && (
            <RoutingControl
              start={new L.LatLng(userPosition.lat, userPosition.lng)}
              end={new L.LatLng(selectedPlace.lat, selectedPlace.lon)}
            />
          )}
        </MapContainer>
      </div>

      {/* Render controls through portal */}
      {renderControls()}

      {/* Loading indicator in portal as well */}
      {ReactDOM.createPortal(
        <div style={{
          position: 'absolute',
          top: '4rem',
          left: '1rem',
          pointerEvents: 'auto',
          zIndex: 100000000
        }}>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            {loading && (
              <div className="text-sm text-gray-600">
                Searching nearby locations...
              </div>
            )}
            {nearbyPlaces.length > 0 && (
              <div className="text-sm text-gray-600">
                Found {nearbyPlaces.length} locations nearby
              </div>
            )}
            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </div>,
        document.getElementById('map-controls-portal') || document.body
      )}
    </div>
  );
}
