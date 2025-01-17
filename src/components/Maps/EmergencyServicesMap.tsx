import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hospital, Navigation, Phone, Clock, MapPin, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
}

interface Service {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic';
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  distance?: number;
  duration?: string;
}

const serviceTypeOptions = [
  { value: 'all', label: 'All Services' },
  { value: 'hospital', label: 'Hospitals' },
  { value: 'pharmacy', label: 'Pharmacies' },
  { value: 'clinic', label: 'Clinics' }
];

// Function to calculate distance between two points in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function estimateDuration(distance: number): string {
  const averageSpeed = 30;
  const hours = distance / averageSpeed;
  const minutes = Math.round(hours * 60);
  return minutes < 60 ? `${minutes} mins` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function MapComponent({ location, services, selectedService, setSelectedService }: any) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
  }, [location, map]);

  useEffect(() => {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    services.forEach((service: Service) => {
      const marker = L.marker([service.lat, service.lng])
        .addTo(map)
        .bindPopup(`<b>${service.name}</b><br>${service.address || ''}`);

      marker.on('click', () => {
        const distance = calculateDistance(location.lat, location.lng, service.lat, service.lng);
        setSelectedService({
          ...service,
          distance: distance.toFixed(1),
          duration: estimateDuration(distance)
        });
      });
    });

    if (location) {
      L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'bg-blue-500 rounded-full w-4 h-4 border-2 border-white',
          iconSize: [16, 16]
        })
      })
        .addTo(map)
        .bindPopup('Your Location');
    }
  }, [services, location, map, setSelectedService]);

  useEffect(() => {
    if (selectedService && location) {
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      const line = L.polyline(
        [[location.lat, location.lng], [selectedService.lat, selectedService.lng]],
        { color: '#4f46e5', weight: 4 }
      ).addTo(map);

      map.fitBounds(line.getBounds(), { padding: [50, 50] });
    }
  }, [selectedService, location, map]);

  return null;
}

export default function EmergencyServicesMap() {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceType, setServiceType] = useState<'all' | 'hospital' | 'pharmacy' | 'clinic'>('all');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(true);

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchNearbyServices(latitude, longitude);
        },
        (error) => toast.error('Failed to get location: ' + error.message),
        { enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const fetchNearbyServices = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const radius = 5000;
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await axios.post('https://overpass-api.de/api/interpreter', query);
      
      const mappedServices: Service[] = response.data.elements.map((element: any) => ({
        id: element.id.toString(),
        name: element.tags.name || 'Unnamed Service',
        type: element.tags.amenity as 'hospital' | 'pharmacy' | 'clinic',
        lat: element.lat,
        lng: element.lon,
        address: element.tags['addr:street'] 
          ? `${element.tags['addr:street']}${element.tags['addr:housenumber'] ? ' ' + element.tags['addr:housenumber'] : ''}`
          : 'Address not available',
        phone: element.tags.phone || element.tags['contact:phone']
      }));

      setServices(mappedServices);
    } catch (error) {
      toast.error('Failed to fetch nearby services');
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLocationUpdate();
  }, []);

  const filteredServices = services.filter(
    service => serviceType === 'all' || service.type === serviceType
  );

  const handleServiceClick = (service: Service) => {
    const distance = calculateDistance(location!.lat, location!.lng, service.lat, service.lng);
    setSelectedService({
      ...service,
      distance: Number(distance.toFixed(1)),
      duration: estimateDuration(distance)
    });
    // On mobile, hide the list when a service is selected
    if (window.innerWidth < 768) {
      setShowList(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Service List - Hidden by default on mobile */}
        <div className={`${showList ? 'block' : 'hidden'} md:block w-full md:w-1/3 space-y-4`}>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-4">
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {serviceTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-4">Loading nearby services...</div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-4">No services found nearby</div>
              ) : (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 rounded-lg border ${
                      selectedService?.id === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } cursor-pointer`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {service.address}
                        </div>
                        {service.phone && (
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${service.phone}`} className="hover:text-blue-600">
                              {service.phone}
                            </a>
                          </div>
                        )}
                        {service.distance && service.duration && (
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Clock className="h-4 w-4" />
                            {service.distance}km • {service.duration}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Navigation className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Map container - Full width on mobile */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && (
              <MapComponent
                location={location}
                services={services}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {/* Emergency information cards - Grid on desktop, Stack on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-red-600 mb-2">Emergency Numbers</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:108" className="hover:text-blue-600">Ambulance: 108</a>
            </li>
            <li>
              <a href="tel:100" className="hover:text-blue-600">Police: 100</a>
            </li>
            <li>
              <a href="tel:101" className="hover:text-blue-600">Fire: 101</a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-blue-600 mb-2">Emergency Tips</h3>
          <ul className="space-y-2 text-sm">
            <li>Stay calm and assess the situation</li>
            <li>Call emergency services immediately</li>
            <li>Follow dispatcher instructions</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-green-600 mb-2">What to Prepare</h3>
          <ul className="space-y-2 text-sm">
            <li>Current location details</li>
            <li>Nature of emergency</li>
            <li>Patient's condition</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-purple-600 mb-2">While Waiting</h3>
          <ul className="space-y-2 text-sm">
            <li>Keep the patient comfortable</li>
            <li>Gather medical information</li>
            <li>Clear access for emergency services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
