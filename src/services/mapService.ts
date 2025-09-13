import axios from 'axios';

const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface MapPosition {
  lat: number;
  lng: number;
}

interface Place {
  id: string;
  name: string;
  type: string;
  lat: number;
  lon: number;
  distance?: number;
}

interface OverpassElement {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity: string;
    healthcare?: string;
    [key: string]: string | undefined;
  };
}

// Function to search for nearby healthcare facilities
export const searchNearbyPlaces = async (
  position: MapPosition,
  type: string,
  radius: number = 5000
): Promise<Place[]> => {
  try {
    let amenityType = '';
    switch (type) {
      case 'hospital':
        amenityType = 'hospital';
        break;
      case 'clinic':
        amenityType = 'clinic';
        break;
      case 'pharmacy':
        amenityType = 'pharmacy';
        break;
      default:
        amenityType = 'hospital';
    }

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="${amenityType}"](around:${radius},${position.lat},${position.lng});
        way["amenity"="${amenityType}"](around:${radius},${position.lat},${position.lng});
        relation["amenity"="${amenityType}"](around:${radius},${position.lat},${position.lng});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await axios.post(OVERPASS_API, query);
    const elements = response.data.elements as OverpassElement[];

    return elements
      .filter(element => element.tags?.name && element.lat && element.lon)
      .map(element => ({
        id: element.id.toString(),
        name: element.tags.name!,
        type: type,
        lat: element.lat,
        lon: element.lon,
        distance: calculateDistance(
          position.lat,
          position.lng,
          element.lat,
          element.lon
        )
      }));
  } catch (error) {
    console.error('Error searching nearby places:', error);
    throw new Error('Failed to search for nearby places');
  }
};

// Function to calculate distance between two points in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

// Function to get directions between two points
export const getDirections = async (
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${NOMINATIM_API}/directions/v1/driving/${startLon},${startLat};${endLon},${endLat}`,
      {
        params: {
          overview: 'full',
          geometries: 'geojson',
          steps: true
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting directions:', error);
    throw new Error('Failed to get directions');
  }
};
