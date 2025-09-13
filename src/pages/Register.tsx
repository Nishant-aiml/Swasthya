import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { FaUser, FaLock, FaEnvelope, FaHospital, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    lower: false,
    upper: false
  });
  const navigate = useNavigate();
  const { register, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 6,
      number: /\d/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password)
    });
  }, [password]);

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      setIsSubmitting(true);
      await register(email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered.', {
          action: {
            label: 'Login Instead',
            onClick: () => navigate('/login')
          }
        });
      }
      // Other errors are handled in AuthContext
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaHospital className="text-6xl text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Swasthya
          </h1>
          <p className="text-sm text-gray-600 mt-1">Your Health, Our Priority</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all duration-200 ease-in-out group-hover:border-blue-400"
                placeholder="Enter your email"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all duration-200 ease-in-out group-hover:border-blue-400"
                placeholder="Create a password"
                disabled={isSubmitting}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2">
              <div className={`text-xs ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                <span className={`mr-1 ${passwordStrength.length ? '✓' : '○'}`}></span>
                6+ characters
              </div>
              <div className={`text-xs ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
                <span className={`mr-1 ${passwordStrength.number ? '✓' : '○'}`}></span>
                Contains number
              </div>
              <div className={`text-xs ${passwordStrength.lower ? 'text-green-600' : 'text-gray-500'}`}>
                <span className={`mr-1 ${passwordStrength.lower ? '✓' : '○'}`}></span>
                Lowercase letter
              </div>
              <div className={`text-xs ${passwordStrength.upper ? 'text-green-600' : 'text-gray-500'}`}>
                <span className={`mr-1 ${passwordStrength.upper ? '✓' : '○'}`}></span>
                Uppercase letter
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all duration-200 ease-in-out group-hover:border-blue-400"
                placeholder="Confirm your password"
                disabled={isSubmitting}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isSubmitting || !passwordStrength.length || !passwordStrength.number || !passwordStrength.lower || !passwordStrength.upper}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
