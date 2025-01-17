export interface Medicine {
  id: string;
  genericName: string;
  brandNames: BrandVariant[];
  category: string[];
  type: 'tablet' | 'syrup' | 'injection' | 'topical' | 'other';
  dosageForm: string;
  strength: string;
  usedFor: string[];
  sideEffects: string[];
  warnings: string[];
  manufacturer: string;
  prescriptionRequired: boolean;
  price: number;
  avgRating: number;
  totalReviews: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface BrandVariant {
  brandName: string;
  manufacturer: string;
  price: number;
  packSize: string;
  avgRating: number;
  totalReviews: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface WomensProduct {
  id: string;
  category: 'sanitary-pads' | 'menstrual-cups' | 'tampons' | 'intimate-hygiene' | 'feminine-wellness';
  name: string;
  brand: string;
  description: string;
  features: string[];
  variants: WomensProductVariant[];
  avgRating: number;
  totalReviews: number;
  ingredients?: string[];
  suitableFor: string[];
  certifications?: string[];
}

export interface WomensProductVariant {
  id: string;
  size: string;
  type: string;
  absorbency?: 'light' | 'medium' | 'heavy' | 'overnight';
  packSize: number;
  price: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface ProductReview {
  id: string;
  productId: string;
  rating: number;
  review: string;
  userName: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export class MedicineDatabase {
  private static instance: MedicineDatabase;
  private medicines: Map<string, Medicine> = new Map();
  private womensProducts: Map<string, WomensProduct> = new Map();
  private reviews: Map<string, ProductReview[]> = new Map();

  private constructor() {
    this.initializeDatabase();
  }

  static getInstance(): MedicineDatabase {
    if (!MedicineDatabase.instance) {
      MedicineDatabase.instance = new MedicineDatabase();
    }
    return MedicineDatabase.instance;
  }

  private initializeDatabase() {
    // Initialize with some common medicines
    this.medicines.set('paracetamol-500mg', {
      id: 'paracetamol-500mg',
      genericName: 'Paracetamol',
      brandNames: [
        {
          brandName: 'Crocin',
          manufacturer: 'GSK',
          price: 20.50,
          packSize: '10 tablets',
          avgRating: 4.5,
          totalReviews: 1250,
          availability: 'in-stock'
        },
        {
          brandName: 'Dolo',
          manufacturer: 'Micro Labs',
          price: 15.75,
          packSize: '15 tablets',
          avgRating: 4.3,
          totalReviews: 980,
          availability: 'in-stock'
        }
      ],
      category: ['Analgesic', 'Antipyretic'],
      type: 'tablet',
      dosageForm: 'Tablet',
      strength: '500mg',
      usedFor: ['Fever', 'Headache', 'Body Pain'],
      sideEffects: ['Nausea', 'Liver problems with overdose'],
      warnings: ['Do not exceed recommended dose', 'Consult doctor if symptoms persist'],
      manufacturer: 'Various',
      prescriptionRequired: false,
      price: 15.75,
      avgRating: 4.4,
      totalReviews: 2230,
      availability: 'in-stock'
    });

    // Initialize women's products
    this.womensProducts.set('whisper-ultra-soft', {
      id: 'whisper-ultra-soft',
      category: 'sanitary-pads',
      name: 'Ultra Soft Sanitary Pads',
      brand: 'Whisper',
      description: 'Ultra-soft sanitary pads with wings for maximum comfort and protection',
      features: [
        'Super soft top layer',
        'Wing design for better fit',
        'Anti-leak barriers',
        'Odor control technology'
      ],
      variants: [
        {
          id: 'whisper-ultra-soft-regular',
          size: 'Regular',
          type: 'Wings',
          absorbency: 'medium',
          packSize: 30,
          price: 149.00,
          availability: 'in-stock'
        },
        {
          id: 'whisper-ultra-soft-xl',
          size: 'XL',
          type: 'Wings',
          absorbency: 'heavy',
          packSize: 30,
          price: 179.00,
          availability: 'in-stock'
        }
      ],
      avgRating: 4.6,
      totalReviews: 3500,
      suitableFor: ['Day use', 'Night use'],
      certifications: ['ISO 9001', 'FDA Approved']
    });
  }

  // Search medicines by generic name
  async searchMedicines(query: string): Promise<Medicine[]> {
    const results: Medicine[] = [];
    this.medicines.forEach(medicine => {
      if (medicine.genericName.toLowerCase().includes(query.toLowerCase())) {
        results.push(medicine);
      }
    });
    return results;
  }

  // Get medicine alternatives (same generic name, different brands)
  async getMedicineAlternatives(genericName: string): Promise<BrandVariant[]> {
    const medicine = Array.from(this.medicines.values())
      .find(m => m.genericName.toLowerCase() === genericName.toLowerCase());
    return medicine ? medicine.brandNames : [];
  }

  // Search women's products
  async searchWomensProducts(
    category: string,
    filters: {
      priceRange?: { min: number; max: number };
      absorbency?: string;
      rating?: number;
    }
  ): Promise<WomensProduct[]> {
    const results: WomensProduct[] = [];
    this.womensProducts.forEach(product => {
      if (product.category === category) {
        let matches = true;

        if (filters.priceRange) {
          const lowestPrice = Math.min(...product.variants.map(v => v.price));
          if (lowestPrice < filters.priceRange.min || lowestPrice > filters.priceRange.max) {
            matches = false;
          }
        }

        if (filters.absorbency) {
          if (!product.variants.some(v => v.absorbency === filters.absorbency)) {
            matches = false;
          }
        }

        if (filters.rating) {
          if (product.avgRating < filters.rating) {
            matches = false;
          }
        }

        if (matches) {
          results.push(product);
        }
      }
    });

    return results;
  }

  // Compare products
  async compareProducts(productIds: string[]): Promise<{
    products: (Medicine | WomensProduct)[];
    priceComparison: { id: string; prices: number[] }[];
    ratingComparison: { id: string; rating: number; reviews: number }[];
  }> {
    const products: (Medicine | WomensProduct)[] = [];
    const priceComparison: { id: string; prices: number[] }[] = [];
    const ratingComparison: { id: string; rating: number; reviews: number }[] = [];

    productIds.forEach(id => {
      const medicine = this.medicines.get(id);
      const womensProduct = this.womensProducts.get(id);
      const product = medicine || womensProduct;

      if (product) {
        products.push(product);
        
        if ('brandNames' in product) {
          priceComparison.push({
            id: product.id,
            prices: product.brandNames.map(b => b.price)
          });
        } else {
          priceComparison.push({
            id: product.id,
            prices: product.variants.map(v => v.price)
          });
        }

        ratingComparison.push({
          id: product.id,
          rating: product.avgRating,
          reviews: product.totalReviews
        });
      }
    });

    return {
      products,
      priceComparison,
      ratingComparison
    };
  }

  // Get product reviews
  async getProductReviews(productId: string): Promise<ProductReview[]> {
    return this.reviews.get(productId) || [];
  }

  // Add a product review
  async addProductReview(review: Omit<ProductReview, 'id'>): Promise<ProductReview> {
    const newReview: ProductReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      helpful: 0
    };

    const existingReviews = this.reviews.get(review.productId) || [];
    this.reviews.set(review.productId, [...existingReviews, newReview]);

    return newReview;
  }
}
