import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Pill, AlertCircle, Calendar, User, Menu, X, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';
import { useColorMode } from '../hooks/useColorMode';
import NotificationCenter from './Notifications/NotificationCenter';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-purple-100 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Swasthya
                </span>
                <span className="text-[10px] sm:text-xs text-purple-600">by Shrinu</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/emergency"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Emergency
                  </Link>
                  <Link
                    to="/medicines"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    <Pill className="h-4 w-4" />
                    Medicines
                  </Link>
                  <Link
                    to="/resources"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Resources
                  </Link>
                  <Link
                    to="/funzone"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-pink-700 hover:bg-pink-50 hover:text-pink-800 transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Funzone
                  </Link>
                  <Link
                    to="/health-ai"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                  >
                    <Brain className="h-4 w-4" />
                    Health AI
                  </Link>
                  <Link
                    to="/appointments"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    Appointments
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <div className="ml-2">
                    <NotificationCenter />
                  </div>
                  <button
                    onClick={toggleColorMode}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {colorMode === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={logout}
                    className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm transition-all hover:shadow"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-purple-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button and notification */}
            <div className="flex items-center gap-3 lg:hidden">
              {isAuthenticated && (
                <div className="flex items-center">
                  <NotificationCenter />
                </div>
              )}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-purple-600 hover:text-purple-700 hover:bg-purple-50 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute top-16 inset-x-0 bg-white shadow-lg border-b border-purple-100 z-50">
          <div className="px-4 py-2 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/emergency"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <AlertCircle className="h-4 w-4" />
                  Emergency
                </Link>
                <Link
                  to="/medicines"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <Pill className="h-4 w-4" />
                  Medicines
                </Link>
                <Link
                  to="/resources"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <BookOpen className="h-4 w-4" />
                  Resources
                </Link>
                <Link
                  to="/funzone"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-pink-700 hover:bg-pink-50 hover:text-pink-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <Sparkles className="h-4 w-4" />
                  Funzone
                </Link>
                <Link
                  to="/health-ai"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <Brain className="h-4 w-4" />
                  Health AI
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <button
                    onClick={() => {
                      toggleColorMode();
                      toggleMenu();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      {colorMode === 'dark' ? (
                        <>
                          <Sun className="h-5 w-5 mr-3" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 mr-3" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full mt-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm transition-all hover:shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 rounded-lg text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors hover:bg-purple-50"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full mt-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm transition-all hover:shadow"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
