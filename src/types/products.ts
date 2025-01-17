// Product Categories
export enum ProductCategory {
  PRESCRIPTION_MEDICINES = 'Prescription Medicines',
  OVER_THE_COUNTER = 'Over-the-Counter',
  WOMEN_HYGIENE = 'Women Hygiene',
  FIRST_AID = 'First Aid',
  HEALTH_SUPPLEMENTS = 'Health Supplements',
  BABY_CARE = 'Baby Care',
  PERSONAL_CARE = 'Personal Care',
  MEDICAL_DEVICES = 'Medical Devices'
}

// Women's Hygiene Subcategories
export enum WomenHygieneSubCategory {
  SANITARY_PADS = 'Sanitary Pads',
  TAMPONS = 'Tampons',
  MENSTRUAL_CUPS = 'Menstrual Cups',
  INTIMATE_HYGIENE = 'Intimate Hygiene',
  PAIN_RELIEF = 'Pain Relief',
  FEMININE_WIPES = 'Feminine Wipes'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: WomenHygieneSubCategory;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
  unit: string;
  dosageForm?: string;
  prescriptionRequired: boolean;
  composition?: string[];
  usageInstructions: string[];
  sideEffects?: string[];
  warnings?: string[];
  features?: string[];
  tags: string[];
  reviews: Review[];
  rating: {
    average: number;
    count: number;
    distribution: { [key: number]: number }; // 1-5 stars distribution
  };
  specifications?: {
    [key: string]: string;
  };
  relatedProducts?: string[]; // Product IDs
  offers?: {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    validUntil: Date;
  }[];
}

// Sample data for women's hygiene products
export const WOMEN_HYGIENE_PRODUCTS: Product[] = [
  {
    id: 'whp1',
    name: 'Ultra Soft Sanitary Pads - XL',
    brand: 'Whisper',
    category: ProductCategory.WOMEN_HYGIENE,
    subCategory: WomenHygieneSubCategory.SANITARY_PADS,
    description: 'Ultra-soft sanitary pads with wings for maximum comfort and protection.',
    price: 149,
    discountedPrice: 129,
    images: ['whisper-xl.jpg'],
    inStock: true,
    stockCount: 500,
    unit: 'pack of 30',
    prescriptionRequired: false,
    usageInstructions: [
      'Change pad every 4-6 hours',
      'Dispose properly in waste bin',
      'Wash hands before and after use'
    ],
    features: [
      'Extra Large size for heavy flow days',
      'Wings for better fit',
      'Ultra-soft top layer',
      '12-hour protection',
      'Odour control technology'
    ],
    tags: ['sanitary pads', 'women hygiene', 'heavy flow', 'night use'],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Sarah M.',
        rating: 5,
        comment: "Best pads I've ever used. Super comfortable and no leakage.",
        date: new Date('2024-01-15'),
        verified: true,
        helpful: 45
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Priya R.',
        rating: 4,
        comment: 'Very good quality but slightly expensive.',
        date: new Date('2024-02-01'),
        verified: true,
        helpful: 12
      }
    ],
    rating: {
      average: 4.5,
      count: 1250,
      distribution: {
        1: 25,
        2: 50,
        3: 175,
        4: 400,
        5: 600
      }
    },
    specifications: {
      'Size': 'XL - 320mm',
      'Pack Contains': '30 pads',
      'Material': 'Cotton-like soft top layer',
      'Features': 'Wings, Gel technology',
      'Suitable for': 'Heavy flow, Night use'
    },
    offers: [
      {
        id: 'o1',
        title: 'Buy 2 Get 1 Free',
        description: 'Purchase any 2 packs and get 1 pack free',
        discountPercentage: 33,
        validUntil: new Date('2024-03-31')
      }
    ]
  },
  {
    id: 'whp2',
    name: 'Organic Cotton Tampons',
    brand: 'OrganiCare',
    category: ProductCategory.WOMEN_HYGIENE,
    subCategory: WomenHygieneSubCategory.TAMPONS,
    description: '100% organic cotton tampons for natural period care.',
    price: 299,
    images: ['organic-tampons.jpg'],
    inStock: true,
    stockCount: 200,
    unit: 'pack of 16',
    prescriptionRequired: false,
    usageInstructions: [
      'Change every 4-8 hours',
      'Wash hands before insertion',
      'Choose appropriate absorbency'
    ],
    features: [
      '100% organic cotton',
      'No chemicals or fragrances',
      'Biodegradable',
      'Compact applicator'
    ],
    tags: ['tampons', 'organic', 'women hygiene', 'eco-friendly'],
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Emma K.',
        rating: 5,
        comment: 'Love that these are organic and eco-friendly!',
        date: new Date('2024-02-10'),
        verified: true,
        helpful: 28
      }
    ],
    rating: {
      average: 4.8,
      count: 450,
      distribution: {
        1: 5,
        2: 10,
        3: 25,
        4: 110,
        5: 300
      }
    }
  }
];

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string[];
  experience: number;
  hospital: string;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  languages: string[];
  consultationFee: number;
  availability: {
    [key: string]: { // day of week
      available: boolean;
      slots: {
        start: string;
        end: string;
      }[];
    };
  };
  rating: {
    average: number;
    count: number;
  };
  reviews: Review[];
  services: string[];
  awards?: string[];
  memberships?: string[];
  image: string;
  about: string;
}

// Sample data for doctors
export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Gynecologist',
    qualifications: ['MBBS', 'MD - Obstetrics & Gynecology', 'DNB'],
    experience: 15,
    hospital: 'City General Hospital',
    location: {
      city: 'New Delhi',
      address: '123 Healthcare Ave, Medical District',
      coordinates: {
        lat: 28.6129,
        lng: 77.2295
      }
    },
    languages: ['English', 'Hindi'],
    consultationFee: 1000,
    availability: {
      'Monday': {
        available: true,
        slots: [
          { start: '10:00', end: '13:00' },
          { start: '16:00', end: '19:00' }
        ]
      },
      'Wednesday': {
        available: true,
        slots: [
          { start: '10:00', end: '13:00' },
          { start: '16:00', end: '19:00' }
        ]
      },
      'Friday': {
        available: true,
        slots: [
          { start: '10:00', end: '13:00' }
        ]
      }
    },
    rating: {
      average: 4.8,
      count: 350
    },
    reviews: [
      {
        id: 'dr1',
        userId: 'u4',
        userName: 'Meera S.',
        rating: 5,
        comment: 'Dr. Johnson is very professional and caring. She takes time to listen and explain everything clearly.',
        date: new Date('2024-02-15'),
        verified: true,
        helpful: 42
      }
    ],
    services: [
      'Regular Check-ups',
      'Pregnancy Care',
      'Gynecological Surgery',
      'Fertility Treatment',
      'Menstrual Disorders'
    ],
    awards: [
      'Best Gynecologist Award 2023',
      'Excellence in Women\'s Healthcare 2022'
    ],
    memberships: [
      'Indian Medical Association',
      'Federation of Obstetric and Gynaecological Societies of India'
    ],
    image: 'dr-sarah.jpg',
    about: 'Dr. Sarah Johnson is a highly experienced gynecologist with over 15 years of practice. She specializes in high-risk pregnancies and minimally invasive surgical procedures.'
  }
]; 