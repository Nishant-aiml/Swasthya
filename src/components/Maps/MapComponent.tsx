import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default icon issue
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

const hospitals = [
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

interface MapComponentProps {
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ height = '600px' }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={[17.4065, 78.4772]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
