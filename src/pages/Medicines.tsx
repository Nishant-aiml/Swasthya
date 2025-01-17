import React, { useState, useMemo } from 'react';
import EPrescriptions from '../components/Medicines/EPrescriptions';
import MedicineReminder from '../components/Medicines/MedicineReminder';
import DiscountOffers from '../components/Medicines/DiscountOffers';
import SubscriptionService from '../components/Medicines/SubscriptionService';
import AlternativeMedicineFinder from '../components/Medicines/AlternativeMedicineFinder';
import Cart from '@/components/Pharmacy/Cart';
import ProductCard from '@/components/Pharmacy/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { FileText, Bell, Tag, Package, Search, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  prescription: boolean;
  rating: number;
  reviews: number;
}

const categories = [
  "All Products",
  "Medicines",
  "Women's Care",
  "Personal Care",
  "Baby Care",
  "Health Devices",
  "Supplements",
  "Ayurvedic",
  "Wellness"
];

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
    category: "Health Devices",
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
    name: "Whisper Ultra Clean Sanitary Pads",
    category: "Women's Care",
    price: 199,
    image: "/images/pharmacy/pads.jpg",
    description: "Pack of 30, Ultra thin with wings",
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 543
  },
  {
    id: "4",
    name: "Intimate Wash",
    category: "Women's Care",
    price: 299,
    image: "/images/pharmacy/intimate-wash.jpg",
    description: "pH balanced intimate hygiene wash",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 234
  },
  {
    id: "5",
    name: "Hand Sanitizer Pack",
    category: "Personal Care",
    price: 149,
    image: "/images/pharmacy/sanitizer.jpg",
    description: "70% Alcohol, Pack of 3",
    inStock: true,
    prescription: false,
    rating: 4.4,
    reviews: 167
  },
  {
    id: "6",
    name: "Baby Diaper Pack",
    category: "Baby Care",
    price: 699,
    image: "/images/pharmacy/diapers.jpg",
    description: "Ultra-soft diapers, Pack of 46",
    inStock: true,
    prescription: false,
    rating: 4.8,
    reviews: 432
  },
  {
    id: "7",
    name: "Blood Pressure Monitor",
    category: "Health Devices",
    price: 1999,
    image: "/images/pharmacy/bp-monitor.jpg",
    description: "Digital BP monitor with memory function",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 298
  },
  {
    id: "8",
    name: "Multivitamin Tablets",
    category: "Supplements",
    price: 449,
    image: "/images/pharmacy/vitamins.jpg",
    description: "Daily multivitamin supplement, 60 tablets",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 187
  },
  {
    id: "9",
    name: "Ashwagandha Tablets",
    category: "Ayurvedic",
    price: 299,
    image: "/images/pharmacy/ashwagandha.jpg",
    description: "Natural stress relief supplement",
    inStock: true,
    prescription: false,
    rating: 4.4,
    reviews: 156
  },
  {
    id: "10",
    name: "Menstrual Cup",
    category: "Women's Care",
    price: 599,
    image: "/images/pharmacy/menstrual-cup.jpg",
    description: "Reusable silicone menstrual cup",
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 342
  },
  {
    id: "11",
    name: "Period Pain Relief Patches",
    category: "Women's Care",
    price: 249,
    image: "/images/pharmacy/pain-patch.jpg",
    description: "Natural pain relief patches, Pack of 5",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 178
  },
  {
    id: "12",
    name: "Women's Multivitamin",
    category: "Women's Care",
    price: 549,
    image: "/images/pharmacy/women-vitamin.jpg",
    description: "Specially formulated for women's health",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 245
  }
];

export default function Medicines() {
  const [activeTab, setActiveTab] = useState('pharmacy');
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    if (product.prescription) {
      toast.error("This medicine requires a prescription. Please upload a valid prescription.");
      return;
    }
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            Pharmacy & Medicine Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Order medicines, set reminders, and manage your prescriptions
          </p>
        </div>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-start sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto">
            <TabsTrigger
              value="pharmacy"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'pharmacy'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Pharmacy</span>
            </TabsTrigger>

            <TabsTrigger
              value="prescriptions"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'prescriptions'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>E-Prescriptions</span>
            </TabsTrigger>

            <TabsTrigger
              value="reminders"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'reminders'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Reminders</span>
            </TabsTrigger>

            <TabsTrigger
              value="offers"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'offers'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>Offers</span>
            </TabsTrigger>

            <TabsTrigger
              value="subscription"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'subscription'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>

            <TabsTrigger
              value="alternatives"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                activeTab === 'alternatives'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Alternatives</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 sm:mt-6">
            <TabsContent value="pharmacy">
              <div className="focus:outline-none">
                {/* Search and Category Filter */}
                <div className="mb-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Search medicines, devices, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>

                {/* Cart */}
                <Cart
                  items={cartItems}
                  total={cartTotal}
                  onUpdateQuantity={updateQuantity}
                  onClose={() => setShowCart(false)}
                  show={showCart}
                />
              </div>
            </TabsContent>

            <TabsContent value="prescriptions">
              <div className="focus:outline-none">
                <EPrescriptions />
              </div>
            </TabsContent>

            <TabsContent value="reminders">
              <div className="focus:outline-none">
                <MedicineReminder />
              </div>
            </TabsContent>

            <TabsContent value="offers">
              <div className="focus:outline-none">
                <DiscountOffers />
              </div>
            </TabsContent>

            <TabsContent value="subscription">
              <div className="focus:outline-none">
                <SubscriptionService />
              </div>
            </TabsContent>

            <TabsContent value="alternatives">
              <div className="focus:outline-none">
                <AlternativeMedicineFinder />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}