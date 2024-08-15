import React, {  useState } from "react";
import "./ChangeType.css"
import { messageService } from "../../../services/message.service";



type CustomerModalProps = {
  idMessage: number;
  type: string;
  cancelModal: () => void;
};

const ChangeType: React.FC<CustomerModalProps>  = ({ idMessage , type , cancelModal}) => {

  if (type == "spam"){
    type = "ham"
  }else {
    type = "spam"
  }

  const updateMessage = async() => {
        await messageService.updateMessage(idMessage).then(() => {
            window.location.reload()
        })
    }       
  


  return (
    <div className="modal">
      <div className="overlay" onClick={cancelModal}></div>
      <div className="delete-customer-modal">
        <h1>
            { type == "ham" ?
                "Tsy spam ity message ity ?" : "Avadika ho spam ?"
            }
        </h1>
        <div className="delete-customer-form">
          <div className="form-element">
          <button className="delete-customer-button" onClick={updateMessage}>
            Eka
          </button>
          <button className="cancel-customer-button" onClick={cancelModal}>
            Aaa
          </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};


export default ChangeType;