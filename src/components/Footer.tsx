import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Healthcare</h3>
            <p className="text-gray-300">
              Providing quality healthcare services and emergency assistance 24/7.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/emergency" className="text-gray-300 hover:text-white">
                  Emergency Services
                </a>
              </li>
              <li>
                <a href="/pharmacy" className="text-gray-300 hover:text-white">
                  Pharmacy
                </a>
              </li>
              <li>
                <a href="/appointments" className="text-gray-300 hover:text-white">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Emergency: 911</li>
              <li>Email: support@healthcare.com</li>
              <li>Address: 123 Healthcare St, Medical City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
