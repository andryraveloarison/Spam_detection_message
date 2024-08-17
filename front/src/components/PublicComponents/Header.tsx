import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../redux/store";
import { UserInterface } from "../../redux/user/type";
import { useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/user/action";
import "../../styles/User/header.css";
import { messageService } from "../../services/message.service";


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation
  const [user, setUser] = useState<UserInterface | null>()
  const myUser = useSelector((state: RootState) => state.auth.user)

  const [isloading, setIsLoading] = useState<boolean>(false)

  const navigateLogout = async() => {
    await dispatch(logoutUser())

    navigate('/', { replace: true }); // Naviguez vers /login

  };


  const update = async() => {
    setIsLoading(true)
    await messageService.updateModeleIa().then(()=> {
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    setUser(myUser)
  },[])
  
    return (
      <>
      
       <button className="update-model" onClick={update}> 
        {
          isloading ? "Miandry kely..." : "Hanatsara FA"
        } 
       </button>

       <button className="logout" onClick={()=> {navigateLogout()}}> Hiala</button>

      </>
    )
  }

export default Header;