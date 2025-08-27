import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const AdminRoute = ({ children }) => {
  const { loggedIn, isAdmin } = useAuthStatus();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? (children || <Outlet />) : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;