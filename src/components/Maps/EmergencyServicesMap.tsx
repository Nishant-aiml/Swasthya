import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { HeartPulse } from 'lucide-react';
import { Card } from '@/components/ui/Card';
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

interface HealthcareFacility {
  id: string;
  name: string;
  address: string;
  location: Location;
  type: string;
  phone: string;
}

const EmergencyServicesMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location>({ lat: 17.385044, lng: 78.486671 }); // Default to Hyderabad
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || map) return;

    const mapInstance = L.map(mapContainerRef.current).setView(
      [userLocation.lat, userLocation.lng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' OpenStreetMap contributors'
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup on unmount
    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, [userLocation]);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        if (map) {
          map.setView([newLocation.lat, newLocation.lng], 13);
        }
        setLoading(false);
      },
      () => {
        // Keep default Hyderabad location on error
        setLoading(false);
      }
    );
  }, []);

  // Update markers when facilities change
  useEffect(() => {
    if (!map || !facilities.length) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add user location marker
    const userIcon = L.divIcon({
      className: 'bg-blue-500 rounded-full w-4 h-4 border-2 border-white',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .bindPopup('Your Location')
      .addTo(map);

    facilities.forEach(facility => {
      const facilityIcon = L.divIcon({
        className: 'bg-red-500 rounded-full w-4 h-4 border-2 border-white',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker([facility.location.lat, facility.location.lng], { icon: facilityIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-lg">${facility.name}</h3>
            <p class="text-sm text-gray-600">${facility.address}</p>
            <p class="text-sm text-gray-600">${facility.phone}</p>
            <div class="flex items-center gap-2 mt-2 text-sm text-blue-600">
              <span>${facility.type}</span>
            </div>
          </div>
        `)
        .addTo(map);
    });
  }, [map, facilities, userLocation]);

  // Load nearby healthcare facilities
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockFacilities: HealthcareFacility[] = [
      {
        id: '1',
        name: 'City Hospital',
        address: '123 Main St, Hyderabad',
        location: {
          lat: userLocation.lat + 0.01,
          lng: userLocation.lng + 0.01,
        },
        type: 'Hospital',
        phone: '+91 1234567890',
      },
      {
        id: '2',
        name: 'Community Clinic',
        address: '456 Park Ave, Hyderabad',
        location: {
          lat: userLocation.lat - 0.01,
          lng: userLocation.lng - 0.01,
        },
        type: 'Clinic',
        phone: '+91 9876543210',
      },
    ];

    setFacilities(mockFacilities);
  }, [userLocation]);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px]">
      <div ref={mapContainerRef} className="h-full w-full" />

      {/* Facilities List */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Card className="p-4 w-80 bg-white/90 backdrop-blur-sm">
          <h2 className="font-semibold mb-4">Nearby Healthcare Facilities</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {facilities.map((facility) => (
              <Card key={facility.id} className="p-3 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <HeartPulse className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium">{facility.name}</h3>
                    <p className="text-sm text-gray-500">{facility.address}</p>
                    <p className="text-sm text-gray-500">{facility.phone}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyServicesMap;
