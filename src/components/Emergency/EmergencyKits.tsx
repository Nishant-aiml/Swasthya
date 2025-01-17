import React from 'react';
import { ShoppingCart, Heart, AlertTriangle, Info } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  items: string[];
  inStock: boolean;
  deliveryTime: string;
}

export default function EmergencyKits() {
  const kits: Kit[] = [
    {
      id: '1',
      name: 'Basic First Aid Kit',
      description: 'Essential medical supplies for common emergencies',
      price: 999,
      rating: 4.5,
      reviews: 128,
      image: '/images/basic-kit.jpg',
      items: [
        'Bandages',
        'Antiseptic wipes',
        'Gauze pads',
        'Medical tape',
        'Scissors',
        'Tweezers'
      ],
      inStock: true,
      deliveryTime: '2-3 business days'
    },
    {
      id: '2',
      name: 'Advanced Emergency Kit',
      description: 'Comprehensive medical kit for serious emergencies',
      price: 2499,
      rating: 4.8,
      reviews: 86,
      image: '/images/advanced-kit.jpg',
      items: [
        'All Basic Kit items',
        'Blood pressure monitor',
        'Emergency blanket',
        'CPR mask',
        'Cold packs',
        'Splint'
      ],
      inStock: true,
      deliveryTime: '1-2 business days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Emergency Medical Kits</h1>
        <p className="text-gray-600 mb-6">Be prepared for medical emergencies with our curated kits</p>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Important Notice</h3>
              <p className="mt-1 text-sm text-red-700">
                These kits are for emergency preparedness. If you're currently experiencing a medical emergency,
                please call emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kits.map((kit) => (
            <div key={kit.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{kit.name}</h2>
                    <p className="text-gray-600 mt-1">{kit.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-gray-900">₹{kit.price}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{kit.rating}</span>
                      <span className="text-sm text-gray-400 ml-1">({kit.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Included Items:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {kit.items.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      Delivery: {kit.deliveryTime}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    kit.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {kit.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={!kit.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart className="h-5 w-5" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Quality Assured</h3>
            <p className="text-sm text-blue-600">
              All our medical kits are FDA approved and meet international safety standards
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Express Delivery</h3>
            <p className="text-sm text-green-600">
              Priority shipping available for urgent requirements
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Expert Support</h3>
            <p className="text-sm text-purple-600">
              24/7 customer support for product guidance and emergency assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
