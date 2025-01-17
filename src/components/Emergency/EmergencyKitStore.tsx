import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Plus, Minus, Package, Shield, Truck, X } from 'lucide-react';

interface EmergencyKit {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  category: 'basic' | 'advanced' | 'professional' | 'specialized';
  items: string[];
  features: string[];
  specifications: {
    dimensions: string;
    weight: string;
    certification: string;
    warranty: string;
  };
}

interface CartItem extends EmergencyKit {
  quantity: number;
}

export default function EmergencyKitStore() {
  const [kits] = useState<EmergencyKit[]>([
    {
      id: '1',
      name: 'Basic First Aid Kit',
      description: 'Essential first aid supplies for common emergencies',
      price: 999,
      rating: 4.5,
      reviews: 128,
      image: 'https://placehold.co/300x300',
      inStock: true,
      category: 'basic',
      items: [
        'Bandages (various sizes)',
        'Antiseptic wipes',
        'Gauze pads',
        'Medical tape',
        'Scissors',
        'Tweezers'
      ],
      features: [
        'Compact and portable',
        'Clear organization',
        'Easy-to-follow guide',
        'Waterproof case'
      ],
      specifications: {
        dimensions: '20 x 15 x 5 cm',
        weight: '500g',
        certification: 'ISO 13485',
        warranty: '1 year'
      }
    },
    {
      id: '2',
      name: 'Professional Emergency Kit',
      description: 'Comprehensive medical supplies for serious emergencies',
      price: 2499,
      rating: 4.8,
      reviews: 89,
      image: 'https://placehold.co/300x300',
      inStock: true,
      category: 'professional',
      items: [
        'All Basic Kit items',
        'Blood pressure monitor',
        'Pulse oximeter',
        'Emergency blanket',
        'CPR mask',
        'Splints'
      ],
      features: [
        'Professional-grade equipment',
        'Organized compartments',
        'Emergency protocols guide',
        'Durable carrying case'
      ],
      specifications: {
        dimensions: '40 x 30 x 15 cm',
        weight: '2.5kg',
        certification: 'ISO 13485, CE',
        warranty: '2 years'
      }
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedKit, setSelectedKit] = useState<EmergencyKit | null>(null);
  const [activeCategory, setActiveCategory] = useState<EmergencyKit['category'] | 'all'>('all');

  const addToCart = (kit: EmergencyKit) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === kit.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === kit.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...kit, quantity: 1 }];
    });
  };

  const updateQuantity = (kitId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === kitId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const filteredKits = activeCategory === 'all'
    ? kits
    : kits.filter(kit => kit.category === activeCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Emergency Kit Store</h2>
          <p className="text-sm text-gray-500 mt-1">
            Be prepared for any emergency with our certified medical kits
          </p>
        </div>
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {['all', 'basic', 'advanced', 'professional', 'specialized'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as typeof activeCategory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKits.map((kit) => (
          <div
            key={kit.id}
            className="border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="relative">
              <img
                src={kit.image}
                alt={kit.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-400 hover:text-red-500">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{kit.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{kit.description}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{kit.rating}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{kit.price}</span>
                  {kit.inStock ? (
                    <span className="text-green-600 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-600 text-sm">Out of Stock</span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(kit)}
                  disabled={!kit.inStock}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Certified Products</h3>
          <p className="mt-2 text-sm text-gray-600">
            All our kits are certified by relevant medical authorities
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Assured</h3>
          <p className="mt-2 text-sm text-gray-600">
            Premium quality medical supplies with long shelf life
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
          <p className="mt-2 text-sm text-gray-600">
            Express shipping available for urgent requirements
          </p>
        </div>
      </div>

      {/* Cart Drawer */}
      {cart.length > 0 && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl p-6 transform transition-transform">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            <button className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold">₹{cartTotal}</span>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}