
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Component to protect routes based on user authentication and role
 */
const RequireAuth = ({ children, requiredRole }) => {
  const location = useLocation();
  
  // Get user data from localStorage - in a real app, this might come from a context or Redux
  const userString = localStorage.getItem('user');
  
  // If no user is found, redirect to login
  if (!userString) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  const user = JSON.parse(userString);
  
  // If role is required and user doesn't have it, redirect based on user's role
  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/student" replace />;
    }
  }
  
  // User is authenticated and has the required role
  return children;
};

export default RequireAuth;
