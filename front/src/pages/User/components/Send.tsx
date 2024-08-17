import React, { useState } from "react";
import "../../../styles/User/send.css"
import { messageService } from "../../../services/message.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


const Send: React.FC  = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  const [formData, setFormData] = useState({
      senderId: user?.id? user.id : 0,
      receiverEmail: "",
      message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(formData.message){
        await messageService.sendMessage(formData).then(()=>{
          alert("Message sended!")
          setFormData(
            {senderId:user?.id? user.id :0 ,receiverEmail: "", message: "" }
            )
        })
      }
      
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div className="send-modal">
      <div className="send-overlay"></div>
      <div className="add-device-send-modal">
        <h1>Handefa hafatra</h1>
        <form onSubmit={handleSubmit}>
        <div className="add-device-form">
          <div className="form-element">
            <label>Alefa any amin'i</label>
            <input
                type="email"
                name="receiverEmail"
                value={formData.receiverEmail}
                onChange={handleChange}
              />
          </div>
          <div className="form-element">
            <label>Hafatra</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>         
         
        </div>
        <div className="btn-group">
          <button className="add-device-button">
            Alefa
          </button>
        </div>
        </form>

      </div>
      
    </div>
  );
};


export default Send;