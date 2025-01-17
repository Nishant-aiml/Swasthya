import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Hospital, Pill, Ambulance, Building2, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { serviceIcons, userLocationIcon } from './mapIcons';

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
  type: 'hospital' | 'pharmacy' | 'clinic' | 'ambulance';
  lat: number;
  lng: number;
  address: string;
  phone: string;
}

interface HealthcareMapProps {
  height?: string;
  showFullscreenControl?: boolean;
}

function MapComponent({ location, services, selectedService, setSelectedService, serviceType }: any) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
  }, [location, map]);

  useEffect(() => {
    if (services && location) {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add markers for services
      services.forEach((service: Service) => {
        if (serviceType === 'all' || service.type === serviceType) {
          const marker = L.marker([service.lat, service.lng], {
            icon: serviceIcons[service.type],
          })
            .addTo(map)
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-lg">${service.name}</h3>
                <p class="text-gray-600">${service.address}</p>
                <p class="text-gray-600">${service.phone}</p>
                <button 
                  class="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  onclick="window.showRoute(${service.lat}, ${service.lng})"
                >
                  Get Directions
                </button>
              </div>
            `);

          marker.on('click', () => setSelectedService(service));
        }
      });

      // Add user location marker
      L.marker([location.lat, location.lng], {
        icon: userLocationIcon,
      })
        .addTo(map)
        .bindPopup('Your Location');
    }

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };
  }, [services, location, map, serviceType, setSelectedService]);

  // Handle routing
  useEffect(() => {
    if (selectedService && location) {
      // Remove existing routing control
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Create new routing control
      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(location.lat, location.lng),
          L.latLng(selectedService.lat, selectedService.lng),
        ],
        routeWhileDragging: false,
        showAlternatives: true,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: '#4f46e5', weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
      }).addTo(map);

      setRoutingControl(newRoutingControl);

      return () => {
        if (newRoutingControl) {
          map.removeControl(newRoutingControl);
        }
      };
    }
  }, [selectedService, location, map]);

  return null;
}

const HealthcareMap: React.FC<HealthcareMapProps> = ({ 
  height = '400px',
  showFullscreenControl = false,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceType, setServiceType] = useState('all');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      // Simulated services data - in a real app, this would come from an API
      const dummyServices = [
        {
          id: '1',
          name: 'City Hospital',
          type: 'hospital' as const,
          lat: lat + 0.01,
          lng: lng + 0.01,
          address: '123 Healthcare St',
          phone: '+1 234-567-8900'
        },
        {
          id: '2',
          name: 'Central Pharmacy',
          type: 'pharmacy' as const,
          lat: lat - 0.01,
          lng: lng - 0.01,
          address: '456 Medical Ave',
          phone: '+1 234-567-8901'
        },
        {
          id: '3',
          name: 'Downtown Clinic',
          type: 'clinic' as const,
          lat: lat + 0.015,
          lng: lng - 0.015,
          address: '789 Health Blvd',
          phone: '+1 234-567-8902'
        },
        {
          id: '4',
          name: 'Emergency Ambulance Services',
          type: 'ambulance' as const,
          lat: lat - 0.015,
          lng: lng + 0.015,
          address: '321 Emergency Rd',
          phone: '+1 234-567-8903'
        },
      ];
      setServices(dummyServices);
    } catch (error) {
      toast.error('Failed to fetch nearby services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLocationUpdate();
    
    // Add the showRoute function to the window object for the popup button
    (window as any).showRoute = (lat: number, lng: number) => {
      const service = services.find(s => s.lat === lat && s.lng === lng);
      if (service) {
        setSelectedService(service);
      }
    };
  }, []);

  const containerStyle = {
    height: isFullscreen ? '100vh' : height,
    width: '100%',
    position: 'relative' as const,
  };

  return (
    <div style={containerStyle} className={isFullscreen ? 'fixed inset-0 z-50' : ''}>
      {showFullscreenControl && (
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      )}

      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md p-2 space-y-2">
        <button
          onClick={() => setServiceType('all')}
          className={`block w-full px-3 py-1 rounded-md text-left ${
            serviceType === 'all' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
        >
          All Services
        </button>
        <button
          onClick={() => setServiceType('hospital')}
          className={`block w-full px-3 py-1 rounded-md text-left ${
            serviceType === 'hospital' ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'
          }`}
        >
          Hospitals
        </button>
        <button
          onClick={() => setServiceType('pharmacy')}
          className={`block w-full px-3 py-1 rounded-md text-left ${
            serviceType === 'pharmacy' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
          }`}
        >
          Pharmacies
        </button>
        <button
          onClick={() => setServiceType('clinic')}
          className={`block w-full px-3 py-1 rounded-md text-left ${
            serviceType === 'clinic' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
        >
          Clinics
        </button>
        <button
          onClick={() => setServiceType('ambulance')}
          className={`block w-full px-3 py-1 rounded-md text-left ${
            serviceType === 'ambulance' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'
          }`}
        >
          Ambulance
        </button>
      </div>

      <MapContainer
        center={[20.5937, 78.9629]} // India's center coordinates
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
            serviceType={serviceType}
          />
        )}
      </MapContainer>

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default HealthcareMap;
