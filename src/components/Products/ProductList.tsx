import React, { useState } from 'react';
import { Star, Filter, ShoppingCart, Heart } from 'lucide-react';
import { ProductCategory, WomenHygieneSubCategory, type Product } from '../../types/products';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart, onAddToWishlist }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<WomenHygieneSubCategory | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'popularity'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubCategory && product.subCategory !== selectedSubCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'price-desc':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'rating':
        return b.rating.average - a.rating.average;
      case 'popularity':
        return b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });

  // Get all available categories from the enum
  const categories = Object.values(ProductCategory);
  const subCategories = Object.values(WomenHygieneSubCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow space-y-4">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="text-blue-600"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-categories for Women Hygiene */}
            {selectedCategory === ProductCategory.WOMEN_HYGIENE && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Type</h3>
                <div className="space-y-2">
                  {subCategories.map((subCategory) => (
                    <label key={subCategory} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="subCategory"
                        checked={selectedSubCategory === subCategory}
                        onChange={() => setSelectedSubCategory(subCategory)}
                        className="text-blue-600"
                      />
                      <span>{subCategory}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Product Image */}
            <div className="relative aspect-w-1 aspect-h-1">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountedPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>

              {/* Price */}
              <div className="mt-2 flex items-center space-x-2">
                {product.discountedPrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">₹{product.discountedPrice}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                )}
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= product.rating.average
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating.count})</span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => onAddToWishlist(product)}
                  className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 rounded-md"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Info */}
              <div className="mt-4 text-sm text-gray-500">
                {product.inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
                {product.prescriptionRequired && (
                  <span className="ml-2 text-blue-600">Prescription Required</span>
                )}
              </div>
            </div>

            {/* Reviews Preview */}
            {product.reviews.length > 0 && (
              <div className="border-t px-4 py-3 bg-gray-50">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.reviews[0].userName}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.reviews[0].comment}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 