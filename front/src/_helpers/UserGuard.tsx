import { Navigate } from 'react-router-dom';
import { accountService } from '../services';
import { useState, ReactNode } from "react"; // Corrigez l'importation de ReactNode ici
import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface UserGuardProps {
    children: ReactNode;
    }
    
    const UserGuard: React.FC<UserGuardProps> = ({ children }) => {
    
    const token = useSelector((state: RootState) => state.auth.token)
    console.log(token)
    if(!token){
        return <Navigate to="/auth"/>
    }else{
        return children
    }

    /*
    const user = useSelector(selectUser)

    if(user.role===1){
        return  <Navigate to="/admin"/>
    }
    if(user.role ===3){
        return <Navigate to="/superAdmin"/>
    }
    if(user.role === 2)
    {
        return children
    }*/

    


};

export default UserGuard;