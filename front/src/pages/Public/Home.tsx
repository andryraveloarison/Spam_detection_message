import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/Public/home.css'


const Home: React.FC = () => {

  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

  const navigateLogin = () => {
    navigate('/auth', { replace: true }); // Naviguez vers /login
  };
  
    return (
      <div className="homeDiv">
  
        <h1>Smart Sales Insights</h1>
        <button className="linearButton" onClick={()=> {navigateLogin()}}> Get started</button>
       
      </div>
    )
  }

export default Home;