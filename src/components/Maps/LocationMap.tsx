import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Maximize2, Minimize2, Crosshair } from 'lucide-react';
import { toast } from 'sonner';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Service {
  id: string;
  name: string;
  coordinates: Coordinates;
  type: string;
  address: string;
  phone: string;
  distance?: number;
}

const serviceTypes = [
  { value: 'all', label: 'All Services' },
  { value: 'hospital', label: 'Hospitals' },
  { value: 'clinic', label: 'Clinics' },
  { value: 'doctors', label: 'Doctors' },
  { value: 'pharmacy', label: 'Pharmacies' }
];

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India's center

const LocationMap: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [serviceType, setServiceType] = useState<string>("all");
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize map
    if (!mapContainerRef.current || map) return;

    const newMap = L.map(mapContainerRef.current, {
      center: [defaultCenter.lat, defaultCenter.lng],
      zoom: 5,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: ' OpenStreetMap contributors'
        })
      ]
    });
    setMap(newMap);

    // Cleanup
    return () => {
      if (newMap) {
        newMap.remove();
      }
      setMap(null);
    };
  }, []);

  const updateLocation = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({ lat: latitude, lng: longitude });

    if (map) {
      map.setView([latitude, longitude], 13);
      
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map?.removeLayer(layer);
        }
      });

      // Add user marker
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: '<div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">You</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([latitude, longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your Location');

      // Fetch nearby services
      await fetchNearbyServices(latitude, longitude);
    }
  };

  const fetchNearbyServices = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${searchRadius},${lat},${lng});
          node["amenity"="clinic"](around:${searchRadius},${lat},${lng});
          node["amenity"="doctors"](around:${searchRadius},${lat},${lng});
          node["amenity"="pharmacy"](around:${searchRadius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });

      if (!response.ok) throw new Error('Failed to fetch services');

      const data = await response.json();
      const fetchedServices: Service[] = data.elements.map((element: any) => ({
        id: element.id,
        name: element.tags.name || 'Unnamed Service',
        coordinates: { lat: element.lat, lng: element.lon },
        type: element.tags.amenity,
        address: element.tags['addr:street'] || 'Address not available',
        phone: element.tags.phone || 'Phone not available'
      }));

      setServices(fetchedServices);
      addServiceMarkers(fetchedServices);
    } catch (error) {
      toast.error('Failed to fetch nearby services');
    } finally {
      setIsLoading(false);
    }
  };

  const addServiceMarkers = (services: Service[]) => {
    if (!map) return;

    services.forEach(service => {
      if (serviceType === 'all' || service.type === serviceType) {
        const markerColor = getMarkerColor(service.type);
        const icon = L.divIcon({
          className: 'service-marker',
          html: `<div class="w-6 h-6 rounded-full ${markerColor} border-2 border-white flex items-center justify-center text-white text-xs">${getServiceIcon(service.type)}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([service.coordinates.lat, service.coordinates.lng], { icon })
          .addTo(map)
          .bindPopup(createPopupContent(service))
          .on('click', () => setSelectedService(service));
      }
    });
  };

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'hospital': return 'bg-red-500';
      case 'clinic': return 'bg-green-500';
      case 'doctors': return 'bg-yellow-500';
      case 'pharmacy': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getServiceIcon = (type: string): string => {
    switch (type) {
      case 'hospital': return 'H';
      case 'clinic': return 'C';
      case 'doctors': return 'D';
      case 'pharmacy': return 'P';
      default: return '?';
    }
  };

  const createPopupContent = (service: Service): string => {
    return `
      <div class="p-2">
        <h3 class="font-bold">${service.name}</h3>
        <p class="text-sm">${service.address}</p>
        <p class="text-sm">${service.phone}</p>
        <button 
          class="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
          onclick="window.getDirections(${service.coordinates.lat}, ${service.coordinates.lng})"
        >
          Get Directions
        </button>
      </div>
    `;
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        updateLocation,
        (error) => toast.error('Failed to get location: ' + error.message),
        { enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    handleLocationUpdate();
  }, []);

  useEffect(() => {
    if (location && services.length > 0) {
      addServiceMarkers(services);
    }
  }, [serviceType, services]);

  useEffect(() => {
    // Add getDirections to window object
    (window as any).getDirections = (lat: number, lng: number) => {
      const service = services.find(s => 
        s.coordinates.lat === lat && s.coordinates.lng === lng
      );
      if (service) {
        setSelectedService(service);
      }
    };

    return () => {
      delete (window as any).getDirections;
    };
  }, [services]);

  useEffect(() => {
    if (!map || !location || !selectedService) return;

    // Remove existing routing control
    if (routingControl) {
      map.removeControl(routingControl);
      setRoutingControl(null);
    }

    // Create new routing control
    const newRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(location.lat, location.lng),
        L.latLng(selectedService.coordinates.lat, selectedService.coordinates.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: 'smart',
      showAlternatives: false,
      plan: L.Routing.plan([
        L.latLng(location.lat, location.lng),
        L.latLng(selectedService.coordinates.lat, selectedService.coordinates.lng)
      ], {
        draggableWaypoints: false,
        addWaypoints: false
      })
    });

    newRoutingControl.addTo(map);
    setRoutingControl(newRoutingControl);

    // Show toast notification
    toast.success(`Getting directions to ${selectedService.name}`);

  }, [selectedService, location, map]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
      }
    }, 100);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'}`}>
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-white"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLocationUpdate}
          className="bg-white"
        >
          <Crosshair className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="w-64">
          <Select value={serviceType} onValueChange={(value: string) => setServiceType(value)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filter by service type" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-64">
          <Input
            type="number"
            placeholder="Search radius (meters)"
            value={searchRadius}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                setSearchRadius(value);
                if (location) {
                  fetchNearbyServices(location.lat, location.lng);
                }
              }
            }}
            className="bg-white"
          />
        </div>
      </div>

      <div ref={mapContainerRef} className="h-full w-full" />

      {selectedService && location && map && routingControl && (
        <div className="absolute bottom-4 left-4 z-10">
          <Card className="w-64">
            <CardHeader>
              <CardTitle className="text-sm">Directions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">To: {selectedService.name}</p>
              <p className="text-sm text-gray-500">{selectedService.address}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LocationMap;