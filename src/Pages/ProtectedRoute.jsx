import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext'; // Ensure correct import path

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
