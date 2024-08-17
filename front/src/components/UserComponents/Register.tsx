import { useAppDispatch } from "../../redux/store";
import { loginUser, registerUser } from "../../redux/user/action";
import { useNavigate } from "react-router-dom";
import '../../styles/Public/login.css'
import { useState } from "react";

interface payloadInterface {
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  photo: string;
  email: string;
  password: string;
  roleId: number;
}


const Register: React.FC = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading]= useState(false)
    const [payload, setPayload] = useState<payloadInterface>(
      {
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",    
        photo: "assets/avatar.png",
        email: "",
        password: "",
        roleId:2
    }
    )
    const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

  
    const registerAction = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try{
             // Logique de soumission du formulaire ici
          await dispatch(registerUser(payload)).then((response)=>{
            let status = response.type.split("/")[2]
  
            if(status == "fulfilled"){
              alert("Compte creer!")
              navigate('/auth', { replace: true }); // Naviguez vers /login
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


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setPayload({
        ...payload,
        [name]: value,
      });
    };
  
    return (
      <>      
          <div className="form-container sign-up">
              <form onSubmit={registerAction}>
              <input
                type="text"
                name="first_name"
                value={payload.first_name}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="last_name"
                value={payload.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="address"
                value={payload.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="phone_number"
                value={payload.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />

              <input
                type="email"
                name="email"
                value={payload.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={payload.password}
                onChange={handleChange}
                placeholder="Password"
              />
              
              <button id="register" className="buttonRegister">Hamorona</button>
            </form>
          </div>

                 
      </>
    )
  }

export default Register;