import React, { useState } from 'react';
import { Crown, Check, Star, Shield, Clock, Zap } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  savings?: number;
}

export default function MembershipPlans() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingPeriod === 'monthly' ? 99 : 999,
      billingPeriod,
      features: [
        'Basic health tracking',
        'Emergency services locator',
        'Medicine reminders',
        'Limited health records storage (100MB)'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 299 : 2999,
      billingPeriod,
      features: [
        'All Basic features',
        'Priority doctor appointments',
        'AI-powered health insights',
        'Advanced health tracking',
        '24/7 chat support',
        'Health records storage (5GB)',
        'Family account (up to 4 members)'
      ],
      isPopular: true,
      savings: billingPeriod === 'yearly' ? 599 : 0
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 599 : 5999,
      billingPeriod,
      features: [
        'All Pro features',
        'Unlimited health records storage',
        'Priority emergency response',
        'Personal health concierge',
        'Family account (up to 8 members)',
        'Quarterly health assessments',
        'Premium insurance benefits'
      ],
      savings: billingPeriod === 'yearly' ? 1199 : 0
    }
  ];

  const handleSubscribe = (planId: string) => {
    // Handle subscription logic
    console.log('Subscribing to plan:', planId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Membership Plans</h2>
        <p className="mt-2 text-gray-600">
          Choose the perfect plan for your healthcare needs
        </p>

        {/* Billing Period Toggle */}
        <div className="mt-6 inline-flex items-center p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs text-green-600">Save up to 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg ${
              plan.isPopular
                ? 'border-2 border-blue-500 shadow-lg'
                : 'border border-gray-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-gray-500">
                  /{plan.billingPeriod === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>

              {plan.savings && plan.savings > 0 && (
                <div className="mt-2 inline-flex items-center text-green-600 text-sm">
                  <Zap className="h-4 w-4 mr-1" />
                  Save ₹{plan.savings}/year
                </div>
              )}

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`mt-8 w-full px-4 py-2 rounded-lg font-medium ${
                  plan.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Star className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Premium Benefits</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get exclusive access to premium healthcare services and priority support
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Enhanced Security</h3>
          <p className="mt-2 text-sm text-gray-600">
            Advanced encryption and security measures to protect your health data
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
          <p className="mt-2 text-sm text-gray-600">
            Round-the-clock access to healthcare professionals and support team
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="grid gap-6">
          <div>
            <h4 className="text-base font-medium text-gray-900">
              Can I switch plans anytime?
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">
              What payment methods are accepted?
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              We accept all major credit cards, debit cards, and UPI payments. All transactions are secure and encrypted.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">
              Is there a refund policy?
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Yes, we offer a 30-day money-back guarantee if you're not satisfied with our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}