import axios from 'axios';

const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export interface Place {
  id: string;
  name: string;
  type: string;
  distance: number;
  address: string;
  phone?: string;
  lat: number;
  lon: number;
}

// Function to get user's current position
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Function to search for nearby healthcare facilities using API
export async function searchNearbyPlaces(type: string, radius: number): Promise<Place[]> {
  try {
    // Get user's location
    const position = await getCurrentPosition();
    const { latitude: lat, longitude: lon } = position.coords;

    // TODO: Replace with actual API call
    const response = await fetch(`/api/places/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lon, type, radius }),
    });

    if (!response.ok) {
      throw new Error('Failed to search nearby places');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching nearby places:', error);
    return [];
  }
}

// Function to get directions between two points
export async function getDirections(
  startLat: number, 
  startLon: number, 
  endLat: number, 
  endLon: number
): Promise<any> {
  try {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson&steps=true`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error);
    return null;
  }
}
