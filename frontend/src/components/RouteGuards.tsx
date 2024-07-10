import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getIsAuthenticated } from '@/appstore/userSlice'; // Adjust the import path as needed

export function ProtectedRoute() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}