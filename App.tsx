import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ServiceDetails } from './pages/ServiceDetails';
import { FreelancerDashboard } from './pages/FreelancerDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { UserRole } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: UserRole }> = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard/freelancer" 
          element={
            <ProtectedRoute requiredRole={UserRole.FREELANCER}>
              <FreelancerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/client" 
          element={
            <ProtectedRoute requiredRole={UserRole.CLIENT}>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;