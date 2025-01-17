import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClose: () => void;
  show: boolean;
  total: number;
}

const Cart: React.FC<CartProps> = ({ items = [], onUpdateQuantity, onClose, show, total }) => {
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <span className="text-sm text-gray-500">({items.length} items)</span>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.product.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 0)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">₹{total}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
