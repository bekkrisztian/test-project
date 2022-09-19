import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

interface IProtectedRoute {
    children: any;
}

const ProtectedRoute = (props: IProtectedRoute) => {

    const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return props.children;
    }
    
    
    return <Navigate to="/login" />;
}

export default ProtectedRoute;