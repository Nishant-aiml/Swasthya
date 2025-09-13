import axios from 'axios';

interface Hospital {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  insuranceAccepted: string[];
  specialties: string[];
  rating: number;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openingHours: string;
}

interface InsuranceProvider {
  id: string;
  name: string;
  networkHospitals: string[];
  coverageTypes: string[];
}

const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const HOSPITALS_OVERPASS_API = 'https://overpass-api.de/api/interpreter';

export const hospitalMappingService = {
  async searchHospitals(query: string, userLocation: { lat: number; lng: number }) {
    try {
      // Use OpenStreetMap's Overpass API to fetch hospitals
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${userLocation.lat},${userLocation.lng});
          way["amenity"="hospital"](around:5000,${userLocation.lat},${userLocation.lng});
          relation["amenity"="hospital"](around:5000,${userLocation.lat},${userLocation.lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await axios.post(HOSPITALS_OVERPASS_API, overpassQuery);
      const hospitals = response.data.elements.map((element: any) => ({
        id: element.id.toString(),
        name: element.tags?.name || 'Unknown Hospital',
        location: element.tags?.['addr:full'] || `${element.tags?.['addr:street'] || ''} ${element.tags?.['addr:housenumber'] || ''}`,
        coordinates: {
          lat: element.lat || element.center?.lat,
          lng: element.lon || element.center?.lon
        },
        insuranceAccepted: [], // To be populated from local data
        specialties: [],
        rating: 0,
        reviews: [],
        contact: {
          phone: element.tags?.phone || '',
          email: element.tags?.email || '',
          website: element.tags?.website || ''
        },
        openingHours: element.tags?.opening_hours || '24/7'
      }));

      return hospitals;
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      return [];
    }
  },

  async geocodeLocation(address: string) {
    try {
      const response = await axios.get(`${NOMINATIM_API}/search`, {
        params: {
          q: address,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'Swasthya-App'
        }
      });

      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  },

  // Local storage functions for ratings and reviews
  saveReview(hospitalId: string, review: { userId: string; rating: number; comment: string }) {
    const reviews = this.getReviews(hospitalId);
    reviews.push({
      ...review,
      date: new Date().toISOString()
    });
    localStorage.setItem(`hospital_reviews_${hospitalId}`, JSON.stringify(reviews));
  },

  getReviews(hospitalId: string) {
    const reviews = localStorage.getItem(`hospital_reviews_${hospitalId}`);
    return reviews ? JSON.parse(reviews) : [];
  },

  // Mock insurance provider data
  getInsuranceProviders(): InsuranceProvider[] {
    return [
      {
        id: '1',
        name: 'HealthGuard',
        networkHospitals: ['1', '2', '3'],
        coverageTypes: ['Emergency', 'Hospitalization', 'Surgery']
      },
      {
        id: '2',
        name: 'MediCare Plus',
        networkHospitals: ['2', '4', '5'],
        coverageTypes: ['General', 'Specialist', 'Dental']
      },
      {
        id: '3',
        name: 'InsureWell',
        networkHospitals: ['1', '3', '5'],
        coverageTypes: ['Emergency', 'General', 'Maternity']
      }
    ];
  }
};