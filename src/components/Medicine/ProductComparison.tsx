import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge
} from '../ui';
import { Star, ThumbsUp, Image } from 'lucide-react';
import { MedicineDatabase, Medicine, WomensProduct, ProductReview } from '../../services/medicineDatabase';

interface ProductComparisonProps {
  productIds: string[];
  category: 'medicines' | 'womens-products';
}

export default function ProductComparison({ productIds, category }: ProductComparisonProps) {
  const [comparisonData, setComparisonData] = useState<{
    products: (Medicine | WomensProduct)[];
    priceComparison: { id: string; prices: number[] }[];
    ratingComparison: { id: string; rating: number; reviews: number }[];
  } | null>(null);
  const [reviews, setReviews] = useState<{ [key: string]: ProductReview[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = MedicineDatabase.getInstance();
      const comparison = await db.compareProducts(productIds);
      setComparisonData(comparison);

      // Fetch reviews for each product
      const reviewsData: { [key: string]: ProductReview[] } = {};
      for (const id of productIds) {
        reviewsData[id] = await db.getProductReviews(id);
      }
      setReviews(reviewsData);
      setLoading(false);
    };

    fetchData();
  }, [productIds]);

  if (loading || !comparisonData) {
    return <div>Loading comparison...</div>;
  }

  const renderPriceRange = (prices: number[]) => {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min.toFixed(2)}` : `₹${min.toFixed(2)} - ₹${max.toFixed(2)}`;
  };

  const renderRating = (rating: number, totalReviews: number) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      <span className="text-sm text-gray-500">({totalReviews} reviews)</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {comparisonData.products.map((product) => (
                  <TableHead key={product.id}>{('brandNames' in product) ? product.genericName : product.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Price Range</TableCell>
                {comparisonData.priceComparison.map((item) => (
                  <TableCell key={item.id}>{renderPriceRange(item.prices)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rating</TableCell>
                {comparisonData.ratingComparison.map((item) => (
                  <TableCell key={item.id}>
                    {renderRating(item.rating, item.reviews)}
                  </TableCell>
                ))}
              </TableRow>
              {category === 'medicines' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Prescription Required</TableCell>
                    {comparisonData.products.map((product) => (
                      <TableCell key={product.id}>
                        {'prescriptionRequired' in product && (
                          <Badge variant={product.prescriptionRequired ? "destructive" : "default"}>
                            {product.prescriptionRequired ? "Yes" : "No"}
                          </Badge>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Side Effects</TableCell>
                    {comparisonData.products.map((product) => (
                      <TableCell key={product.id}>
                        {'sideEffects' in product && (
                          <ul className="list-disc list-inside text-sm">
                            {product.sideEffects.map((effect, index) => (
                              <li key={index}>{effect}</li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              )}
              {category === 'womens-products' && (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Features</TableCell>
                    {comparisonData.products.map((product) => (
                      <TableCell key={product.id}>
                        {'features' in product && (
                          <ul className="list-disc list-inside text-sm">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Variants</TableCell>
                    {comparisonData.products.map((product) => (
                      <TableCell key={product.id}>
                        {'variants' in product && (
                          <div className="space-y-2">
                            {product.variants.map((variant, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {variant.size} - {variant.absorbency}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisonData.products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {('brandNames' in product) ? product.genericName : product.name} Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews[product.id]?.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {renderRating(review.rating, 1)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      {review.verified && (
                        <Badge variant="secondary">Verified Purchase</Badge>
                      )}
                    </div>
                    <p className="text-sm mb-2">{review.review}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-500">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                      {review.images && review.images.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Image className="w-4 h-4" />
                          {review.images.length} images
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
