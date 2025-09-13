import React, { useEffect, useRef } from 'react';
import { Location } from '@/types/location';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface MapProps {
  markers: Location[];
  center: Location;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ markers, center, zoom = 13 }) => {
  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  const customMapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede',
        },
        {
          lightness: 21,
        },
      ],
    },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      // Initialize the map
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      markers.forEach(marker => {
        const newMarker = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map,
          title: marker.address
        });

        const infoWindow = new google.maps.InfoWindow({
          content: marker.address
        });

        newMarker.addListener('click', () => {
          infoWindow.open(map, newMarker);
        });

        markersRef.current.push(newMarker);
      });
    };

    initMap();
  }, [markers, center, zoom]);

  const CustomMarker = () => (
    <div className="absolute transform -translate-x-1/2 -translate-y-full">
      <div className="flex flex-col items-center">
        <MapPin className="w-8 h-8 text-emerald-500" />
        <div className="w-2 h-2 bg-emerald-500 rounded-full -mt-1" />
      </div>
    </div>
  );

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '300px' }}
    />
  );
};

export default Map;
