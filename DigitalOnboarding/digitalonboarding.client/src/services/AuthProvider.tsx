import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isAuthCheckComplete: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsAuthenticated(await status());
            setIsAuthCheckComplete(true);
        };
        fetchData();
    }, []);

    

    const login = async () => {
        // Perform login logic, update isAuthenticated state
        setIsAuthenticated(true);
    };

    const logout = async () => {
        // Perform logout logic, update isAuthenticated state
        const response = await fetch('accounts/logout', {
            method: 'POST',
        });
        if (response.ok) {
            setIsAuthenticated(false);
        }
    };

    const status = async () => {
        const response = await fetch('accounts/status');
        const data = await response.json();
        if (response.ok) {
            return data.isAuthenticated;
        }
        return false;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAuthCheckComplete, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
