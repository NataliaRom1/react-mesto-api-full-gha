import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { pathname } = useLocation()
  return props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' state={{ backUrl: pathname }} />;
}

export default ProtectedRoute;