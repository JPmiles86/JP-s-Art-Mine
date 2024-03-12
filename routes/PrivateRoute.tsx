// my-gallery/routes/PrivateRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';

const PrivateRoute: React.FC<{ path: string; element: React.ReactElement }> = ({ path, element }) => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/signin" replace />
    );
  };
  
  export default PrivateRoute;