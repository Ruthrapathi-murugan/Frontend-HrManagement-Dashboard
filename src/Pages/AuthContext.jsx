import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Example logic for authentication status
    const isAuthenticated = !!localStorage.getItem('authStatus');

    return (
        <AuthContext.Provider value={{ isAuthenticated, navigate }}>
            {children}
        </AuthContext.Provider>
    );
};
