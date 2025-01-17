import React from 'react';
import { Pill, IndianRupee, Store, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Medicine } from '../../types';

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addToCart(medicine);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{medicine.brandName}</h3>
          <p className="text-gray-600 text-sm">{medicine.genericName}</p>
          <p className="text-gray-500 text-sm mt-1">{medicine.manufacturer}</p>
        </div>
        <div className="flex items-center text-emerald-600 font-semibold">
          <IndianRupee className="h-4 w-4" />
          <span>{medicine.price}</span>
        </div>
      </div>
      
      {medicine.alternatives && medicine.alternatives.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Generic Alternatives</h4>
          <div className="space-y-2">
            {medicine.alternatives.map((alt, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <span>{alt.name}</span>
                <span className="text-emerald-600 font-medium">₹{alt.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
        <button className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50">
          <Heart className="h-4 w-4" />
          Save
        </button>
      </div>

      <div className="mt-2">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Store className="h-4 w-4" />
          Check Availability
        </button>
      </div>
    </div>
  );
}