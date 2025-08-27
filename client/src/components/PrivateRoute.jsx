// client/src/components/PrivateRoute.jsx (Simplified)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus(); // Let's also consider loading state

  // Optional: If you have a loading state for checking auth, you can show a loader
  if (loading) {
    return <div>Loading...</div>; // Or a proper Loader component
  }

  // If logged in, render the nested component via <Outlet />.
  // If not logged in, redirect to the login page.
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;