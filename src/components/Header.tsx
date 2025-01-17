import React, { useState } from 'react';
import { Menu, User as UserIcon, LogOut, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NotificationsPanel from './Notifications/NotificationsPanel';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/emergency', label: 'Emergency', className: 'text-red-600 hover:text-red-700' },
    { path: '/medicines', label: 'Medicines', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/doctors', label: 'Doctors', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/health-ai', label: 'Health AI', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/profile', label: 'Profile', className: 'text-gray-700 hover:text-gray-900' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="h-2 bg-emerald-500"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-emerald-600 text-xl sm:text-2xl font-bold">Swasthya</span>
                <span className="text-gray-600 text-sm sm:text-base">by Shrinu</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${link.className} px-3 py-2 font-medium ${
                    isActivePath(link.path) ? 'border-b-2 border-emerald-500' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationsPanel />
            <Link to="/profile" className="p-2 rounded-full text-gray-500 hover:text-gray-700">
              <UserIcon className="h-6 w-6" />
            </Link>
            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActivePath(link.path)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}