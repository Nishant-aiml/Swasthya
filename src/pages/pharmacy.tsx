import React, { useState } from 'react';
import Cart from '@/components/Pharmacy/Cart';
import ProductCard from '@/components/Pharmacy/ProductCard';
import SearchAndFilter from '@/components/Pharmacy/SearchAndFilter';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag, Truck, Clock, Shield } from 'lucide-react';
import { Product } from '@/types/Product';

const categories = [
  "Medicines",
  "Medical Equipment",
  "Personal Care",
  "Feminine Hygiene",
  "First Aid",
  "Health Supplements"
];

// Dummy product data
const products: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Medicines",
    price: 50,
    image: "/images/pharmacy/paracetamol.jpg",
    description: "Pain relief and fever reduction tablets",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 128
  },
  {
    id: "2",
    name: "Digital Thermometer",
    category: "Medical Equipment",
    price: 299,
    image: "/images/pharmacy/thermometer.jpg",
    description: "Accurate digital temperature measurement",
    inStock: true,
    prescription: false,
    rating: 4.3,
    reviews: 89
  },
  {
    id: "3",
    name: "Whisper Ultra Soft",
    category: "Feminine Hygiene",
    price: 199,
    image: "/images/pharmacy/pads.jpg",
    description: "Pack of 20 sanitary pads",
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 543
  },
  {
    id: "4",
    name: "First Aid Kit",
    category: "First Aid",
    price: 599,
    image: "/images/pharmacy/firstaid.jpg",
    description: "Complete emergency medical kit",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 234
  },
  {
    id: "5",
    name: "Insulin Syringes",
    category: "Medical Equipment",
    price: 149,
    image: "/images/pharmacy/syringe.jpg",
    description: "Pack of 10 sterile syringes",
    inStock: true,
    prescription: true,
    rating: 4.4,
    reviews: 167
  },
  {
    id: "6",
    name: "Vitamin D3 Supplements",
    category: "Health Supplements",
    price: 399,
    image: "/images/pharmacy/vitamind.jpg",
    description: "60 tablets bottle",
    inStock: true,
    prescription: false,
    rating: 4.8,
    reviews: 432
  },
  // Add more products as needed
];

const PharmacyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    if (product.prescription) {
      toast.error("This product requires a prescription. Please consult a doctor.");
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.success("Item removed from cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">HealthCare Pharmacy</h1>
            <Cart
              items={cart}
              onUpdateQuantity={(productId, quantity) => {
                if (quantity === 0) {
                  removeFromCart(productId);
                } else {
                  updateCartQuantity(productId, quantity - (cart.find(item => item.product.id === productId)?.quantity || 0));
                }
              }}
              onClose={() => {}} // Add proper close handler if needed
              show={true}
              total={cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Trusted Online Pharmacy</h2>
            <p className="text-lg mb-8">Get medicines delivered to your doorstep with our reliable service</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Tag className="h-6 w-6" />
                  <span>Best Prices</span>
                </div>
              </Card>
              <Card className="bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-6 w-6" />
                  <span>Fast Delivery</span>
                </div>
              </Card>
              <Card className="bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  <span>24/7 Support</span>
                </div>
              </Card>
              <Card className="bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  <span>Genuine Products</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Support</h3>
              <p className="text-gray-600">24/7 Helpline: 1800-XXX-XXXX</p>
              <p className="text-gray-600">Email: support@healthcare.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Delivery Information</h3>
              <p className="text-gray-600">Free delivery on orders above ₹500</p>
              <p className="text-gray-600">Same day delivery in select cities</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Secure Shopping</h3>
              <p className="text-gray-600">100% Genuine Products</p>
              <p className="text-gray-600">Secure Payment Gateway</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PharmacyPage;
