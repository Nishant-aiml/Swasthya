import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FaUserNurse, FaClock, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { toast } from 'sonner';

interface NursingService {
  id: string;
  name: string;
  description: string;
  charges: number;
  availability: string;
  type: string;
  rating: number;
  reviews: number;
}

const nursingServices: NursingService[] = [
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    description: 'Professional care for elderly patients including medication management, personal hygiene, and mobility assistance.',
    charges: 1200,
    availability: '24/7',
    type: 'elderly',
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'post-surgery',
    name: 'Post-Surgery Care',
    description: 'Specialized care for post-operative recovery including wound care, medication management, and rehabilitation support.',
    charges: 1500,
    availability: '24/7',
    type: 'post-surgery',
    rating: 4.9,
    reviews: 203
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    description: 'Professional physiotherapy services at home including exercises, massage, and rehabilitation techniques.',
    charges: 800,
    availability: '8 AM - 8 PM',
    type: 'physiotherapy',
    rating: 4.7,
    reviews: 178
  },
  {
    id: 'vaccination',
    name: 'Vaccination at Home',
    description: 'Safe and convenient vaccination services at your doorstep by certified healthcare professionals.',
    charges: 500,
    availability: '9 AM - 6 PM',
    type: 'vaccination',
    rating: 4.9,
    reviews: 245
  },
  {
    id: 'chronic-care',
    name: 'Chronic Illness Care',
    description: 'Comprehensive care for patients with chronic conditions including regular health monitoring and medication management.',
    charges: 1400,
    availability: '24/7',
    type: 'chronic',
    rating: 4.8,
    reviews: 189
  }
];

export default function HomeNursing() {
  const [selectedService, setSelectedService] = useState<NursingService | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredServices = nursingServices
    .filter(service => filterType === 'all' || service.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.charges - b.charges;
      if (sortBy === 'price-high') return b.charges - a.charges;
      return 0;
    });

  const handleBook = (service: NursingService) => {
    setSelectedService(service);
    setShowBookingDialog(true);
  };

  const handleViewDetails = (service: NursingService) => {
    setSelectedService(service);
    setShowDetailsDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 md:p-6">
      {/* Mobile Header with Fixed Position */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 -mx-3 px-3 py-3 md:static md:bg-transparent md:border-none md:mx-0">
        <h2 className="text-lg font-bold text-gray-900 mb-3 md:text-2xl md:mb-6">Home Nursing Services</h2>
        
        {/* Mobile-optimized Filter Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-row md:gap-4 md:pb-0">
          <select
            className="min-w-[140px] h-9 px-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:rounded-lg md:px-3 md:text-base"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Services</option>
            <option value="elderly">Elderly Care</option>
            <option value="post-surgery">Post-Surgery</option>
            <option value="physiotherapy">Physiotherapy</option>
            <option value="vaccination">Vaccination</option>
            <option value="chronic">Chronic Care</option>
          </select>
          <select
            className="min-w-[140px] h-9 px-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:rounded-lg md:px-3 md:text-base"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Services Grid - Optimized for Mobile Scroll */}
      <div className="mt-4 md:mt-6 space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6 md:space-y-0">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-blue-200 transition-colors"
          >
            {/* Service Card Header */}
            <div className="p-3 md:p-4 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full">
                    <FaUserNurse className="text-blue-600 text-lg" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="ml-1 text-xs font-medium text-gray-700">
                    {service.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Card Body */}
            <div className="p-3 md:p-4 space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
              
              {/* Service Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FaClock className="text-blue-500" />
                  <span>{service.availability}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaMoneyBillWave className="text-green-500" />
                  <span>₹{service.charges}/day</span>
                </div>
              </div>

              {/* Action Buttons - Full Width on Mobile */}
              <div className="flex flex-col gap-2 pt-2 md:flex-row">
                <Button
                  onClick={() => handleBook(service)}
                  className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Book Now
                </Button>
                <Button
                  onClick={() => handleViewDetails(service)}
                  variant="outline"
                  className="w-full h-9 text-sm border-gray-200 hover:bg-gray-50"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-Optimized Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent 
          className="w-full h-[100dvh] p-0 rounded-none md:h-auto md:max-w-[425px] md:rounded-lg md:p-6" 
          aria-describedby="booking-dialog-description"
        >
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 md:static md:border-none">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Book Home Nursing</DialogTitle>
              <DialogDescription id="booking-dialog-description" className="text-sm text-gray-500">
                Fill in the details to book {selectedService?.name}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Booking submitted successfully! We will contact you shortly.');
              setShowBookingDialog(false);
            }} 
            className="p-4 space-y-4 overflow-y-auto max-h-[calc(100dvh-8rem)] md:max-h-none"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                required
                className="w-full h-10 px-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter patient name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">TRNI Number</label>
              <input
                type="text"
                required
                pattern="[A-Z0-9]{10}"
                className="w-full h-10 px-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter TRNI number"
              />
              <p className="text-xs text-gray-500">10-digit unique identifier</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                className="w-full h-10 px-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="w-full h-10 px-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Preferred Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-10 px-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Special Instructions</label>
              <textarea
                className="w-full p-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any special requirements or medical conditions..."
              />
            </div>

            {/* Fixed Bottom Buttons on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 md:static md:border-none">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBookingDialog(false)}
                className="flex-1 h-10 text-sm border-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 text-sm bg-blue-600 hover:bg-blue-700"
              >
                Book Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile-Optimized Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent 
          className="w-full h-[100dvh] p-0 rounded-none md:h-auto md:max-w-[425px] md:rounded-lg md:p-6" 
          aria-describedby="details-dialog-description"
        >
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 md:static md:border-none">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">{selectedService?.name}</DialogTitle>
              <DialogDescription id="details-dialog-description" className="text-sm text-gray-500">
                Service Details
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedService && (
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100dvh-8rem)] md:max-h-none">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Description</h4>
                <p className="text-sm text-gray-600">{selectedService.description}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Service Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Availability</p>
                    <p className="font-medium text-gray-900">{selectedService.availability}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Charges</p>
                    <p className="font-medium text-gray-900">₹{selectedService.charges}/day</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Rating</p>
                    <p className="font-medium text-gray-900">{selectedService.rating}/5</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Reviews</p>
                    <p className="font-medium text-gray-900">{selectedService.reviews}</p>
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Button on Mobile */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:static md:border-none">
                <Button
                  onClick={() => {
                    setShowDetailsDialog(false);
                    handleBook(selectedService);
                  }}
                  className="w-full h-10 text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Book This Service
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
