import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../redux/store";
import { UserInterface } from "../../redux/user/type";
import { useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/user/action";
import "../../styles/User/header.css";


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation
  const [user, setUser] = useState<UserInterface | null>()
  const myUser = useSelector((state: RootState) => state.auth.user)


  const navigateLogout = async() => {
    await dispatch(logoutUser())

    navigate('/', { replace: true }); // Naviguez vers /login

  };

  useEffect(()=>{
    setUser(myUser)
  },[])
  
    return (
      <>
         
       <button className="logout" onClick={()=> {navigateLogout()}}> Logout</button>

      </>
    )
  }

export default Header;