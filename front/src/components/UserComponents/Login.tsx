import { useAppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/user/action";
import { useNavigate } from "react-router-dom";
import '../../styles/Public/login.css'
import { useState } from "react";


const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading]= useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

  
    const loginAction = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try{
             // Logique de soumission du formulaire ici
          await dispatch(loginUser({ email, password })).then((response)=>{
            let status = response.type.split("/")[2]
  
            if(status == "fulfilled"){
              navigate('/user/reception', { replace: true }); // Naviguez vers /login
            }
          })
  
      }
      catch(error: any){
          setLoading(false);
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
              console.error('Mot de passe incorrect.');
          } 
      }   
  
    };


    
  
    return (
      <>      


          <div className="form-container sign-in">
            <form onSubmit={loginAction}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maily"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="teny fanalahidy"
                required
              />
              <button id="login" className="buttonConnexion">Hampiasa</button>
            </form>
          </div>

                 
      </>
    )
  }

export default Login;