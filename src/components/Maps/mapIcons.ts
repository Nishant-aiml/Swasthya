import L from 'leaflet';

// Custom icons for different service types
export const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export const serviceIcons = {
  hospital: createCustomIcon('#dc2626'),  // red
  pharmacy: createCustomIcon('#16a34a'),  // green
  clinic: createCustomIcon('#2563eb'),    // blue
  ambulance: createCustomIcon('#9333ea'), // purple
};

export const userLocationIcon = L.divIcon({
  className: 'custom-div-icon',
  html: '<div style="background-color: #4f46e5; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});
