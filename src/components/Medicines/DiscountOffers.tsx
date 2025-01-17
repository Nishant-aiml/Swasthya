import React, { useState } from 'react';
import { Tag, ShoppingCart, Clock, Percent } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: Date;
  code: string;
  minimumPurchase?: number;
  category: string;
  image: string;
}

export default function DiscountOffers() {
  const [offers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Diabetes Care Products',
      description: 'Get 20% off on all diabetes care medicines and equipment',
      discountPercentage: 20,
      validUntil: new Date('2024-04-30'),
      code: 'DIABETES20',
      minimumPurchase: 1000,
      category: 'Diabetes',
      image: 'https://placehold.co/300x200'
    },
    {
      id: '2',
      title: 'First Order Discount',
      description: 'Special 15% discount for your first order',
      discountPercentage: 15,
      validUntil: new Date('2024-12-31'),
      code: 'FIRST15',
      category: 'General',
      image: 'https://placehold.co/300x200'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(offers.map(offer => offer.category))];

  const filteredOffers = selectedCategory === 'all'
    ? offers
    : offers.filter(offer => offer.category === selectedCategory);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Special Offers & Discounts</h2>
          <p className="text-sm text-gray-500 mt-1">
            Save big on your medicine purchases with these exclusive deals
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{offer.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                </div>
                <span className="flex items-center text-green-600 font-semibold">
                  <Percent className="h-4 w-4 mr-1" />
                  {offer.discountPercentage}%
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Valid until {offer.validUntil.toLocaleDateString()}</span>
                  </div>
                  <span className="text-blue-600 font-medium">
                    {offer.category}
                  </span>
                </div>

                {offer.minimumPurchase && (
                  <div className="flex items-center text-sm text-gray-500">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    <span>Min. purchase: ₹{offer.minimumPurchase}</span>
                  </div>
                )}

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-gray-400 mr-2" />
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {offer.code}
                    </code>
                  </div>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No offers available</h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new discounts and deals
          </p>
        </div>
      )}
    </div>
  );
} 