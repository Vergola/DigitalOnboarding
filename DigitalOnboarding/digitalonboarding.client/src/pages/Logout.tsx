import { useEffect } from 'react';
import { useAuth } from '../services/AuthProvider.tsx';
function Logout() {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    });
    return (
        <h1>You have been successfully logged out</h1>
    )
}

export default Logout;