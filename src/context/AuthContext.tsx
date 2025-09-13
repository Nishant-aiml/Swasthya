import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const getErrorMessage = (error: AuthError) => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials and try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please register first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Please login instead.';
    case 'auth/weak-password':
      return 'Password is too weak. It should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a few minutes before trying again.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    case 'auth/popup-closed-by-user':
      return 'Authentication popup was closed. Please try again.';
    case 'auth/requires-recent-login':
      return 'Please log out and log in again to perform this action.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);

      // If user is authenticated and trying to access login/register, redirect to home
      if (user && ['/login', '/register'].includes(location.pathname)) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      toast.success('Welcome back! Successfully logged in.', {
        duration: 3000,
        position: 'top-center',
      });
      
      // Get the redirect path from state or default to home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error: any) {
      const message = getErrorMessage(error);
      toast.error(message, {
        duration: 5000,
        position: 'top-center',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      toast.success('Account created successfully! Welcome to Swasthya.', {
        duration: 3000,
        position: 'top-center',
      });
      navigate('/');
    } catch (error: any) {
      const message = getErrorMessage(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error(message, {
          duration: 5000,
          position: 'top-center',
          action: {
            label: 'Login Instead',
            onClick: () => navigate('/login')
          }
        });
      } else {
        toast.error(message, {
          duration: 5000,
          position: 'top-center',
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Successfully logged out! Come back soon.', {
        duration: 3000,
        position: 'top-center',
      });
      navigate('/login');
    } catch (error: any) {
      const message = getErrorMessage(error);
      toast.error(message, {
        duration: 5000,
        position: 'top-center',
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
