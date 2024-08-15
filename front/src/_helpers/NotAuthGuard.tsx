import { Navigate } from 'react-router-dom';
import { accountService } from '../services';
import { useState, ReactNode } from "react"; // Corrigez l'importation de ReactNode ici
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface NotAuthGuardProps {
  children: ReactNode;
}

const NotAuthGuard: React.FC<NotAuthGuardProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token)

  if(!token){
    // get Role
    return children
  }else{
      return <Navigate to="/user"/>
  }

    if (role) {

      switch (role) {
        case '2':
          return <Navigate to="/user" replace />;
        case '1':
          return <Navigate to="/admin/" replace />;
        case '3':
          return <Navigate to="/superAdmin" replace />;
        default:
          break;
      }
    }

  return (
    <>
      {children}
    </>
  );
};

export default NotAuthGuard;
