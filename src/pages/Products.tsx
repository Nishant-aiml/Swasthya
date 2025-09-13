import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { ShoppingBag, Star, Filter, Search, Tag, ArrowUpDown } from 'lucide-react';
import { WOMEN_HYGIENE_PRODUCTS } from '../types/products';
import { useAuth } from '../hooks/useAuth';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  alternatives: Alternative[];
  tags: string[];
}

interface Alternative {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { user } = useAuth();
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'women-hygiene', name: 'Women Hygiene' },
    { id: 'medicines', name: 'Medicines' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'personal-care', name: 'Personal Care' }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Whisper Ultra Clean',
      description: 'Ultra thin sanitary pads with wings',
      price: 149,
      category: 'women-hygiene',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 1250,
      inStock: true,
      alternatives: [
        { id: 'a1', name: 'Stayfree Secure', price: 130, rating: 4.3, reviews: 980, inStock: true },
        { id: 'a2', name: 'Sofy Bodyfit', price: 145, rating: 4.4, reviews: 850, inStock: true }
      ],
      tags: ['sanitary pads', 'ultra thin', 'wings']
    },
    {
      id: '2',
      name: 'Intimate Hygiene Wash',
      description: 'pH balanced intimate wash for daily use',
      price: 299,
      category: 'women-hygiene',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 850,
      inStock: true,
      alternatives: [
        { id: 'b1', name: 'VWash Plus', price: 275, rating: 4.4, reviews: 720, inStock: true },
        { id: 'b2', name: 'Lactacyd', price: 285, rating: 4.5, reviews: 650, inStock: true }
      ],
      tags: ['intimate care', 'pH balanced', 'daily use']
    },
    {
      id: '3',
      name: 'Menstrual Cup',
      description: 'Reusable silicone menstrual cup',
      price: 599,
      category: 'women-hygiene',
      image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 1500,
      inStock: true,
      alternatives: [
        { id: 'c1', name: 'Sirona Cup', price: 550, rating: 4.6, reviews: 1200, inStock: true },
        { id: 'c2', name: 'Peesafe Cup', price: 575, rating: 4.5, reviews: 980, inStock: true }
      ],
      tags: ['eco-friendly', 'reusable', 'sustainable']
    },
    {
      id: '4',
      name: 'Women\'s Multivitamin',
      description: 'Daily multivitamin supplement for women',
      price: 549,
      category: 'wellness',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 2100,
      inStock: true,
      alternatives: [
        { id: 'd1', name: 'HealthKart Women\'s', price: 499, rating: 4.4, reviews: 1800, inStock: true },
        { id: 'd2', name: 'GNC Women\'s', price: 599, rating: 4.7, reviews: 1600, inStock: true }
      ],
      tags: ['vitamins', 'supplements', 'women\'s health']
    },
    {
      id: '5',
      name: 'Hand Sanitizer Pack',
      description: '70% Alcohol-based sanitizer, Pack of 3',
      price: 149,
      category: 'personal-care',
      image: 'https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 3200,
      inStock: true,
      alternatives: [
        { id: 'e1', name: 'Dettol Sanitizer', price: 140, rating: 4.3, reviews: 2800, inStock: true },
        { id: 'e2', name: 'Lifebuoy Sanitizer', price: 145, rating: 4.4, reviews: 2600, inStock: true }
      ],
      tags: ['sanitizer', 'hygiene', 'protection']
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'price') {
      return (a.price - b.price) * order;
    }
    return (a.rating - b.rating) * order;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Healthcare Products</h1>
        <p className="mt-2 text-gray-600">Find the best healthcare products and alternatives</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ArrowUpDown className="h-5 w-5" />
            {sortBy === 'price' ? 'Price' : 'Rating'}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-orange-500 transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.alternatives.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowAlternatives(true);
                    }}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    {product.alternatives.length} alternatives
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alternatives Modal */}
      {showAlternatives && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Alternatives for {selectedProduct.name}</h2>
              <button
                onClick={() => setShowAlternatives(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {selectedProduct.alternatives.map(alt => (
                <div key={alt.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{alt.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm ml-1">{alt.rating} ({alt.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{alt.price}</div>
                    <button className="mt-2 px-4 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 