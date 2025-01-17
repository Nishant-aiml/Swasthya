import React from 'react';
import SymptomChecker from '../components/HealthAI/SymptomChecker';
import WellnessTracker from '../components/HealthAI/WellnessTracker';
import CustomHealthPlan from '../components/HealthAI/CustomHealthPlan';
import RiskPredictor from '../components/HealthAI/RiskPredictor';
import WearableSync from '../components/HealthAI/WearableSync';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your AI-Powered Health Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized health insights, track your wellness metrics, and receive
          AI-generated recommendations for a healthier lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <section>
            <SymptomChecker />
          </section>
          <section>
            <CustomHealthPlan />
          </section>
          <section>
            <WearableSync />
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section>
            <WellnessTracker />
          </section>
          <section>
            <RiskPredictor />
          </section>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
        <p className="text-sm text-blue-800">
          All AI-powered features use advanced machine learning models to provide personalized
          health insights. Always consult with healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
} 