import { create } from 'zustand';
import { Medicine } from '../types';

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (medicine: Medicine, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (medicine, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item.medicine.id === medicine.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.medicine.id === medicine.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        items: [...state.items, { medicine, quantity }],
      };
    });
  },
  
  removeItem: (medicineId) => {
    set((state) => ({
      items: state.items.filter(item => item.medicine.id !== medicineId),
    }));
  },
  
  updateQuantity: (medicineId, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalAmount: () => {
    return get().items.reduce((total, item) => 
      total + (item.medicine.price * item.quantity), 0
    );
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));