import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BMICalculator from './pages/BMICalculator'
import CalorieCalculator from './pages/CalorieCalculator'
import WaterIntakeCalculator from './pages/WaterIntakeCalculator'
import IdealWeightCalculator from './pages/IdealWeightCalculator'
import ErrorBoundary from './components/ErrorBoundary'

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Box flex="1" p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/water-intake-calculator" element={<WaterIntakeCalculator />} />
              <Route path="/ideal-weight-calculator" element={<IdealWeightCalculator />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ErrorBoundary>
  )
}

export default App 