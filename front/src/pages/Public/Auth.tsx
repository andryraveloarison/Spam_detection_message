import React, { useState } from "react";
import '../../styles/Public/login.css'
import Register from "../../components/UserComponents/Register";
import Login from "../../components/UserComponents/Login";


const Auth: React.FC = () => {

    const [isActive, setIsActive] = useState(false);
    
    return (
      <>      

        <div className={isActive ? "container active" : "container"} id="container">
          <Register/>
          <Login/>

          <div className="toggle-container">
              <div className="toggle">
                  <div className="toggle-panel toggle-left">
                      <h1>Hiverina!</h1>
                      <p>Raha efa manana kaonty </p>
                      <button className="hidden" id="login" onClick={() => {setIsActive(false)}}>Connexion</button>

                  </div>
                  <div className="toggle-panel toggle-right">
                      <h1>Tongasoa</h1>
                      <p>Mbola tsy manana kaonty ve ?</p>
                      <button className="hidden" id="register" onClick={() => {setIsActive(true)}}>Inscription</button>
                  </div>
              </div>
          </div>
    </div>
       
      </>
    )
  }

export default Auth;