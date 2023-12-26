import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const ProtectedRoute = () => {
    const { isAuthenticated, isAuthCheckComplete } = useAuth();

    if (!isAuthCheckComplete) {
        // Authentication check is still in progress
        return 'Loading'; // Replace with your loading indicator or placeholder
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
