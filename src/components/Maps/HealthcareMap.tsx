import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Hospital {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
}

// Sample hospital data
const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Apollo Hospitals",
    lat: 17.4226,
    lng: 78.4467,
    type: "Multi-Specialty Hospital"
  },
  {
    id: 2,
    name: "CARE Hospitals",
    lat: 17.4150,
    lng: 78.4487,
    type: "Multi-Specialty Hospital"
  },
  {
    id: 3,
    name: "Yashoda Hospital",
    lat: 17.4069,
    lng: 78.4683,
    type: "Super-Specialty Hospital"
  },
  {
    id: 4,
    name: "KIMS Hospital",
    lat: 17.4226,
    lng: 78.4577,
    type: "Multi-Specialty Hospital"
  }
];

interface HealthcareMapProps {
  height?: string;
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Wrapper component to handle client-side only rendering
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

function HealthcareMap({ height = '600px' }: HealthcareMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([17.4226, 78.4567]);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView(currentPosition, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
      }).addTo(map);

      // Add markers for hospitals
      hospitals.forEach(hospital => {
        L.marker([hospital.lat, hospital.lng])
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${hospital.name}</h3>
              <p class="text-sm text-gray-600">${hospital.type}</p>
            </div>
          `)
          .addTo(map);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height, width: '100%' }} id="map" className="rounded-lg overflow-hidden">
      <LoadingSpinner />
    </div>
  );
}

function MapComponent({ height = '600px' }: HealthcareMapProps) {
  return (
    <ClientOnly>
      <HealthcareMap height={height} />
    </ClientOnly>
  );
}

export default MapComponent;
