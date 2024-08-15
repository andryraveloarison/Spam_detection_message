import { Navigate } from 'react-router-dom';
import { ReactNode } from "react"; // Corrigez l'importation de ReactNode ici
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AdminGuardProps {
    children: ReactNode;
    }
    
    const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token)
    const role = useSelector((state: RootState) => state.auth.user?.role.id)

    if(!token){
        return <Navigate to="/auth"/>
    }

    if(role != 1){
        return <Navigate to="/user"/>
    }

        return children
    

};

export default AdminGuard;