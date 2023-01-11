import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }}></Navigate>

};

export default PrivateRoutes;