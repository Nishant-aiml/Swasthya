import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Share2, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import type { Product, Review } from '../../types/products';
import FileUpload from '../Common/FileUpload';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
  onPrescriptionUpload?: (files: File[]) => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  onAddToWishlist,
  onPrescriptionUpload
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'specifications'>('description');
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);

  const handleAddToCart = () => {
    if (product.prescriptionRequired && !showPrescriptionUpload) {
      setShowPrescriptionUpload(true);
      return;
    }
    onAddToCart(product, quantity);
  };

  const handlePrescriptionUpload = (files: File[]) => {
    if (onPrescriptionUpload) {
      onPrescriptionUpload(files);
      onAddToCart(product, quantity);
      setShowPrescriptionUpload(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Images */}
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-1 rounded-full bg-white shadow hover:bg-gray-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-1 rounded-full bg-white shadow hover:bg-gray-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-lg text-gray-500">{product.brand}</p>

          {/* Rating */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= product.rating.average
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">
              {product.rating.average} ({product.rating.count} reviews)
            </p>
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="flex items-center">
              {product.discountedPrice ? (
                <>
                  <p className="text-3xl font-bold text-gray-900">₹{product.discountedPrice}</p>
                  <p className="ml-2 text-lg text-gray-500 line-through">₹{product.price}</p>
                  <span className="ml-2 text-green-600">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
              )}
            </div>
            {product.offers && product.offers.length > 0 && (
              <div className="mt-2">
                {product.offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded inline-block mr-2"
                  >
                    {offer.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            {product.inStock ? (
              <p className="text-green-600">In Stock ({product.stockCount} available)</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToWishlist(product)}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Heart className="h-5 w-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Prescription Upload */}
          {showPrescriptionUpload && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Prescription</h3>
              <FileUpload
                onFileUpload={handlePrescriptionUpload}
                maxFiles={1}
                acceptedFileTypes={['image/*', 'application/pdf']}
                label="Upload your prescription"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as typeof selectedTab)}
                className={`${
                  selectedTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {selectedTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
              {product.features && (
                <>
                  <h3>Features</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              {product.usageInstructions && (
                <>
                  <h3>Usage Instructions</h3>
                  <ul>
                    {product.usageInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </>
              )}
              {product.warnings && (
                <>
                  <h3>Warnings</h3>
                  <ul>
                    {product.warnings.map((warning, index) => (
                      <li key={index} className="text-red-600">{warning}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {selectedTab === 'specifications' && product.specifications && (
            <div className="border rounded-lg overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid grid-cols-2 gap-4 px-4 py-3 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-500">{key}</div>
                  <div className="text-sm text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div>
              {/* Rating Distribution */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center">
                      <p className="text-5xl font-bold text-gray-900">{product.rating.average}</p>
                      <div className="ml-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= product.rating.average
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Based on {product.rating.count} reviews</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">{rating}★</span>
                        <div className="flex-1 h-4 mx-2 bg-gray-100 rounded">
                          <div
                            className="h-full bg-yellow-400 rounded"
                            style={{
                              width: `${(product.rating.distribution[rating] / product.rating.count) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12">
                          {product.rating.distribution[rating]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {product.reviews.map((review: Review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-1 font-medium text-gray-900">{review.userName}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      {review.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-gray-600">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="mt-4 flex space-x-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt=""
                            className="h-20 w-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 