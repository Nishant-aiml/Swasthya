import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import { DailyHealthTrivia } from '@/components/Games/DailyHealthTrivia';
import { RapidFireQuiz } from '@/components/Games/RapidFireQuiz';
import { WellnessWheel } from '@/components/Games/WellnessWheel';
import InsuranceMapping from './pages/InsuranceMapping';
import FaceDetection from './pages/FaceDetection';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to={(location.state as any)?.from?.pathname || "/"} replace /> : 
                <Login />
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
                <Navigate to={(location.state as any)?.from?.pathname || "/"} replace /> : 
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
            path="/funzone/*"
            element={
              <ProtectedRoute>
                <Funzone />
              </ProtectedRoute>
            }
          >
            <Route path="daily-trivia" element={<DailyHealthTrivia />} />
            <Route path="rapid-fire" element={<RapidFireQuiz />} />
            <Route path="wellness-wheel" element={<WellnessWheel />} />
          </Route>

          <Route
            path="/insurance-mapping"
            element={
              <ProtectedRoute>
                <InsuranceMapping />
              </ProtectedRoute>
            }
          />

          <Route
            path="/face-detection"
            element={
              <ProtectedRoute>
                <FaceDetection />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}
