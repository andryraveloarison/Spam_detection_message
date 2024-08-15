import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ContactDto, ResponseContact } from "../../../types/MessageInterface";
import { messageService } from "../../../services/message.service";
import { useNavigate } from "react-router-dom";


const Reception: React.FC = () => {

  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  const [contacts, setContacts] = useState<ResponseContact[]>([])
  const credentials = {
    senderId: user?.id? user.id : 1,
     type: "ham"
  }

    const displayContacts = () => {
      return contacts.map((contact) => (
        <div key={contact.contactId} onClick={() => handleContactClick(contact)}>
          <li>{contact.nom}</li>
        </div>
      ));
    };
    

    const handleContactClick = (contact: ResponseContact) =>{
      
      let type = "ham"
      navigate(`/user/discussion`, { state: { contact, type } });

    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await messageService.getContact(credentials);
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
  
    fetchData();
  }, []);

  

  
    return (
      <>
  
        <h1>Boite de reception </h1>
        <h1></h1>
        {displayContacts()}

       
      </>
    )
  }

export default Reception;