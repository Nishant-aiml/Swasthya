import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Emergency from './pages/Emergency';
import EmergencyChat from './components/Emergency/EmergencyChat';
import AppointmentPage from './pages/appointments';
import Medicines from './pages/Medicines';
import HealthAI from './pages/HealthAI';
import Resources from './pages/Resources';
import Funzone from './pages/Funzone';
import { AuthProvider } from './context/AuthContext';
import { DailyHealthTrivia } from '@/components/Games/DailyHealthTrivia';
import { RapidFireQuiz } from '@/components/Games/RapidFireQuiz';
import { WellnessWheel } from '@/components/Games/WellnessWheel';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
    </>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login />
        } 
      />
      
      <Route 
        path="/register" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Register />
        } 
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency"
        element={
          <ProtectedRoute>
            <Emergency />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency-chat"
        element={
          <ProtectedRoute>
            <EmergencyChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <AppointmentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicines"
        element={
          <ProtectedRoute>
            <Medicines />
          </ProtectedRoute>
        }
      />

      <Route
        path="/health-ai"
        element={
          <ProtectedRoute>
            <HealthAI />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />

      <Route
        path="/funzone"
        element={
          <ProtectedRoute>
            <Funzone />
          </ProtectedRoute>
        }
      />

      {/* Game Routes */}
      <Route 
        path="/games/daily-trivia" 
        element={
          <ProtectedRoute>
            <DailyHealthTrivia />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/rapid-fire" 
        element={
          <ProtectedRoute>
            <RapidFireQuiz />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/spin-wheel" 
        element={
          <ProtectedRoute>
            <WellnessWheel />
          </ProtectedRoute>
        } 
      />

      {/* Catch all route - redirect to login if not authenticated, otherwise to dashboard */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token && !hideNavbarPaths.includes(location.pathname)) {
      window.location.href = '/login';
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar && isAuthenticated && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
