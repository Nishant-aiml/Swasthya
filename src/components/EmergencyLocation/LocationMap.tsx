import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useEmergencyServices } from '../../hooks/useEmergencyServices';
import type { EmergencyService, EmergencyServiceType } from '../../types/emergency';
import ServiceList from './ServiceList';
import ServiceDetails from './ServiceDetails';
import { Compass, Loader, List as ListIcon, X } from 'lucide-react';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultCoords = { lat: 28.6139, lng: 77.2090 }; // New Delhi coordinates

// Custom type for Leaflet Routing Machine control
type RoutingControl = L.Control & {
  getPlan(): { getWaypoints(): L.LatLng[] };
  setWaypoints(waypoints: L.LatLng[]): void;
  remove(): void;
};

const serviceTypeColors = {
  hospital: '#ef4444', // red
  clinic: '#f97316',   // orange
  pharmacy: '#22c55e', // green
  ambulance: '#3b82f6'  // blue
};

const DEFAULT_ZOOM = 14;
const SEARCH_RADIUS = 10; // in kilometers

export default function LocationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routingControlRef = useRef<RoutingControl | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showList, setShowList] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<EmergencyServiceType | null>(null);

  const {
    services,
    loading,
    error: servicesError,
    selectedService,
    selectService,
    fetchNearbyServices
  } = useEmergencyServices();

  const getUserLocation = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    setIsLocating(true);
    setError(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    // Watch position instead of just getting it once
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setIsLocating(false);

        // Create user marker with accuracy circle
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div class="relative">
              <div class="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="absolute w-12 h-12 bg-blue-500 rounded-full opacity-30 animate-ping-slow"></div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24]
        });

        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
        }

        const userMarker = L.marker([latitude, longitude], { icon: userIcon });
        userMarker.addTo(map);
        userMarkerRef.current = userMarker;

        // Add accuracy circle
        const accuracyCircle = L.circle([latitude, longitude], {
          radius: position.coords.accuracy,
          weight: 1,
          color: '#4299e1',
          fillColor: '#4299e1',
          fillOpacity: 0.1
        }).addTo(map);

        // Add search radius circle
        const searchCircle = L.circle([latitude, longitude], {
          radius: SEARCH_RADIUS * 1000, // Convert km to meters
          weight: 1,
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.05,
          dashArray: '5, 10'
        }).addTo(map);

        // Center map on user location
        map.setView([latitude, longitude], DEFAULT_ZOOM, { animate: true });

        // Fetch nearby services
        fetchNearbyServices({ 
          lat: latitude, 
          lng: longitude,
          serviceTypes: selectedType ? [selectedType] : undefined,
          radius: SEARCH_RADIUS
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Could not get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }
        setError(errorMessage);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    // Cleanup function to stop watching position
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [fetchNearbyServices, selectedType]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([defaultCoords.lat, defaultCoords.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);
      L.control.attribution({ position: 'bottomright' }).addTo(map);

      // Add scale control
      L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

      mapRef.current = map;
      getUserLocation();
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
    };
  }, [getUserLocation]);

  // Update markers when services change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !services.length) return;

    try {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      services.forEach((service) => {
        const serviceIcon = L.divIcon({
          className: 'service-marker',
          html: `
            <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                 style="background-color: ${serviceTypeColors[service.type]}">
              <span class="text-white text-xs font-bold">${service.type[0].toUpperCase()}</span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([service.location.lat, service.location.lng], { icon: serviceIcon });
        marker.addTo(map)
          .bindPopup(
            `<div class="p-3">
              <h3 class="font-bold text-lg mb-1">${service.name}</h3>
              <p class="text-gray-600 mb-2">${service.address}</p>
              <p class="text-emerald-600 font-medium">${service.distance.toFixed(1)}km away</p>
              ${service.isOpen24Hours ? '<p class="text-blue-600">Open 24/7</p>' : ''}
              <button onclick="window.handleServiceClick('${service.id}')" 
                      class="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                View Details
              </button>
            </div>`,
            { 
              closeButton: false,
              className: 'service-popup'
            }
          );

        marker.on('click', () => handleServiceSelect(service));
        markersRef.current.push(marker);
      });

      // Add circle to show search radius
      if (userLocation) {
        L.circle([userLocation[0], userLocation[1]], {
          radius: 10000, // 10km in meters
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.1,
          weight: 1
        }).addTo(map);
      }
    } catch (error) {
      console.error('Error updating service markers:', error);
      setError('Failed to update service markers');
    }
  }, [services, userLocation]);

  const handleServiceSelect = useCallback((service: EmergencyService | null) => {
    selectService(service);
    if (!service) {
      setShowList(true);
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
      return;
    }

    setShowList(false);

    const map = mapRef.current;
    if (!map || !userLocation) return;

    // Remove existing routing control
    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }

    // Add new routing control with driving directions
    try {
      const routingControl = (L.Routing as any).control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(service.location.lat, service.location.lng)
        ],
        routeWhileDragging: false,
        showAlternatives: true,
        lineOptions: {
          styles: [{ color: serviceTypeColors[service.type], weight: 6 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          profile: 'driving',
          suppressDemoServerWarning: true
        }),
        createMarker: () => null, // Don't show default markers
        show: true, // Show turn-by-turn instructions
        collapsible: true, // Allow collapsing instructions
        containerClassName: 'routing-container'
      }) as RoutingControl;
      
      routingControl.addTo(map);
      routingControlRef.current = routingControl;

      // Fit bounds to show both points with padding
      const bounds = L.latLngBounds([
        [userLocation[0], userLocation[1]],
        [service.location.lat, service.location.lng]
      ]);
      map.fitBounds(bounds, { 
        padding: [50, 50],
        maxZoom: DEFAULT_ZOOM
      });
    } catch (error) {
      console.error('Error showing route:', error);
      setError('Failed to show route. Try using the Directions button instead.');
    }
  }, [userLocation, selectService]);

  const handleBack = useCallback(() => {
    selectService(null);
    setShowList(true);

    if (routingControlRef.current) {
      routingControlRef.current.remove();
      routingControlRef.current = null;
    }

    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation[0], userLocation[1]], 14, { animate: true });
    }
  }, [userLocation, selectService]);

  const handleTypeSelect = useCallback((type: EmergencyServiceType | null) => {
    setSelectedType(type);
    if (userLocation) {
      fetchNearbyServices({
        lat: userLocation[0],
        lng: userLocation[1],
        serviceTypes: type ? [type] : undefined
      });
    }
  }, [userLocation, fetchNearbyServices]);

  // Add global click handler for popup buttons
  useEffect(() => {
    (window as any).handleServiceClick = (serviceId: string) => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        handleServiceSelect(service);
      }
    };

    return () => {
      delete (window as any).handleServiceClick;
    };
  }, [services, handleServiceSelect]);

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-[600px] bg-gray-50">
      {(error || servicesError) && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          {error || servicesError}
        </div>
      )}

      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Service Type Filters */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        {(['hospital', 'clinic', 'pharmacy', 'ambulance'] as const).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(selectedType === type ? null : type)}
            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
              selectedType === type
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: selectedType === type ? serviceTypeColors[type] : undefined
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowList(!showList)}
        className="absolute top-16 left-4 z-10 md:hidden bg-white p-2 rounded-full shadow-lg"
      >
        {showList ? <X className="h-6 w-6" /> : <ListIcon className="h-6 w-6" />}
      </button>

      {/* Location Button */}
      <button
        onClick={getUserLocation}
        className="absolute bottom-24 right-4 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
        disabled={isLocating}
      >
        {isLocating ? (
          <Loader className="h-6 w-6 text-blue-600 animate-spin" />
        ) : (
          <Compass className="h-6 w-6 text-blue-600" />
        )}
      </button>

      {/* Service List/Details Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transition-transform duration-300 z-20
          ${showList ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          md:relative md:translate-x-0`}
      >
        {selectedService ? (
          <ServiceDetails
            service={selectedService}
            userLocation={userLocation}
            onBack={handleBack}
            loading={loading}
          />
        ) : (
          <ServiceList
            services={services}
            onServiceSelect={handleServiceSelect}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}


