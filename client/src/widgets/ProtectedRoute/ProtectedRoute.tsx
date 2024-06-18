import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {user} = useSelector((state: RootState) => state.user);

  console.log(user);

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/sign/in" />;
  }

  return children;
};

export default ProtectedRoute;