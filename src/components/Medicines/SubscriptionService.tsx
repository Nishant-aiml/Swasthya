import React, { useState } from 'react';
import { Calendar, Package, Truck, CreditCard, CheckCircle, PlusCircle } from 'lucide-react';

interface Subscription {
  id: string;
  medicineName: string;
  quantity: number;
  frequency: 'monthly' | 'biweekly';
  nextDelivery: Date;
  status: 'active' | 'paused' | 'cancelled';
  autoRefill: boolean;
  price: number;
}

export default function SubscriptionService() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      medicineName: 'Blood Pressure Medicine',
      quantity: 30,
      frequency: 'monthly',
      nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      autoRefill: true,
      price: 499
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newSubscription: Subscription = {
      id: Date.now().toString(),
      medicineName: formData.get('medicineName') as string,
      quantity: Number(formData.get('quantity')),
      frequency: formData.get('frequency') as 'monthly' | 'biweekly',
      nextDelivery: new Date(formData.get('nextDelivery') as string),
      status: 'active',
      autoRefill: formData.get('autoRefill') === 'true',
      price: Number(formData.get('price'))
    };

    setSubscriptions(prev => [...prev, newSubscription]);
    setShowAddForm(false);
  };

  const toggleSubscriptionStatus = (id: string) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        const newStatus = sub.status === 'active' ? 'paused' : 'active';
        return { ...sub, status: newStatus };
      }
      return sub;
    }));
  };

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Medicine Subscriptions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Never run out of your essential medicines with automatic refills
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Subscription</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <form onSubmit={handleAddSubscription}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  name="frequency"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">First Delivery Date</label>
                <input
                  type="date"
                  name="nextDelivery"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Delivery</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="autoRefill"
                  id="autoRefill"
                  value="true"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoRefill" className="text-sm font-medium text-gray-700">
                  Enable Auto-refill
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Subscription
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="border rounded-lg p-6 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{subscription.medicineName}</h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    {subscription.quantity} units
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {subscription.frequency}
                  </span>
                  <span className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    ₹{subscription.price}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  Next delivery on {subscription.nextDelivery.toLocaleDateString()}
                </span>
              </div>
              {subscription.autoRefill && (
                <span className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Auto-refill enabled
                </span>
              )}
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => toggleSubscriptionStatus(subscription.id)}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  subscription.status === 'active'
                    ? 'border-yellow-500 text-yellow-700 hover:bg-yellow-50'
                    : 'border-green-500 text-green-700 hover:bg-green-50'
                }`}
              >
                {subscription.status === 'active' ? 'Pause' : 'Resume'} Subscription
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Manage Subscription
              </button>
            </div>
          </div>
        ))}
      </div>

      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active subscriptions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start a subscription to get regular medicine deliveries
          </p>
        </div>
      )}
    </div>
  );
} 