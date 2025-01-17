import React, { useState } from 'react';
import Cart from './Cart';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { Product } from '@/types/Product';

const categories = [
  'All Products',
  'Medicines',
  'Medical Equipment',
  'Personal Care',
  'Feminine Hygiene',
  'First Aid',
  'Health Supplements'
];

const products: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Medicines',
    price: 50,
    image: '/images/paracetamol.jpg',
    description: 'Pain relief and fever reduction tablets',
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Digital Thermometer',
    category: 'Medical Equipment',
    price: 299,
    image: '/images/thermometer.jpg',
    description: 'Accurate digital temperature measurement',
    inStock: true,
    prescription: false,
    rating: 4.3,
    reviews: 89
  },
  {
    id: '3',
    name: 'Whisper Ultra Soft',
    category: 'Feminine Hygiene',
    price: 199,
    image: '/images/pads.jpg',
    description: 'Pack of 20 sanitary pads',
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 543
  },
  {
    id: '4',
    name: 'First Aid Kit',
    category: 'First Aid',
    price: 599,
    image: '/images/firstaid.jpg',
    description: 'Complete emergency medical kit',
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '5',
    name: 'Insulin Syringes',
    category: 'Medical Equipment',
    price: 150,
    image: '/images/syringes.jpg',
    description: 'Sterile insulin syringes',
    inStock: true,
    prescription: true,
    rating: 4.4,
    reviews: 167
  },
  {
    id: '6',
    name: 'Vitamin D3 Supplements',
    category: 'Health Supplements',
    price: 399,
    image: '/images/vitamind.jpg',
    description: '60 tablets of Vitamin D3',
    inStock: true,
    prescription: false,
    rating: 4.8,
    reviews: 432
  }
];

export default function PharmacyPage() {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">HealthCare Pharmacy</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Cart
                items={cartItems}
                onUpdateQuantity={(productId, quantity) => {
                  if (quantity === 0) {
                    removeFromCart(productId);
                  } else {
                    updateQuantity(productId, quantity - (cartItems.find(item => item.product.id === productId)?.quantity || 0));
                  }
                }}
                onClose={() => {}} // Add proper close handler if needed
                show={true}
                total={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                  </div>
                  {product.prescription && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Prescription Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
