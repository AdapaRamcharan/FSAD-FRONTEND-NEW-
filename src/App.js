import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

// Dashboard Layout
import DashboardLayout from './components/layout/DashboardLayout';

// User Pages
import UserDashboard from './pages/User/UserDashboard';
import Cities from './pages/City/Cities';
import CityDetails from './pages/City/CityDetails';
import ReportIssue from './pages/Report/ReportIssue';
import FindNearMe from './pages/FindNearMe/FindNearMe';
import Feedback from './pages/Feedback/Feedback';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageReports from './pages/Admin/ManageReports';
import Analytics from './pages/Admin/Analytics';
import Users from './pages/Admin/Users';

// Protected Route wrapper
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* User Dashboard Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="cities" element={<Cities />} />
        <Route path="city" element={<CityDetails />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="find-near-me" element={<FindNearMe />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-reports" element={<ManageReports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="cities" element={<Cities />} />
        <Route path="city" element={<CityDetails />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Catch all - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
