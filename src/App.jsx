import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MealTracker from './pages/MealTracker';
import MealPlanner from './pages/MealPlanner';
import NutritionInfo from './pages/NutritionInfo';
import CalorieCalculator from './pages/CalorieCalculator';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import UserProfilePage from './pages/UserProfile';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import './styles/main.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/meal-tracker" 
                element={
                  <ProtectedRoute>
                    <MealTracker />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/meal-planner" 
                element={
                  <ProtectedRoute>
                    <MealPlanner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/nutrition-info" 
                element={
                  <ProtectedRoute>
                    <NutritionInfo />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calorie-calculator" 
                element={
                  <ProtectedRoute>
                    <CalorieCalculator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile/*" 
                element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App; 