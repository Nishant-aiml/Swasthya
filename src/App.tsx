import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from '@/components/ui/ToastNotification';
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
import InsuranceMapping from './pages/InsuranceMapping';
import { DailyHealthTrivia } from '@/components/Games/DailyHealthTrivia';
import { RapidFireQuiz } from '@/components/Games/RapidFireQuiz';
import { WellnessWheel } from '@/components/Games/WellnessWheel';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Dashboard />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Profile />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/emergency"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Emergency />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/emergency-chat"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <EmergencyChat />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <AppointmentPage />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/medicines"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Medicines />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/health-ai"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <HealthAI />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/resources"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Resources />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/funzone"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <Funzone />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/insurance-mapping"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <InsuranceMapping />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/funzone/trivia"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <DailyHealthTrivia />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/funzone/quiz"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <RapidFireQuiz />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/funzone/wheel"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <main className="flex-grow">
                  <WellnessWheel />
                </main>
                <Footer />
              </>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Toaster position="top-center" richColors closeButton />
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
