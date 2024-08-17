import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { messageService } from '../../../services/message.service';
import { MessageResponseDto } from '../../../types/MessageInterface';
import ChangeType from '../../../components/UserComponents/Modals/ChangeType';
import '../../../styles/User/message.css'
const Discussion: React.FC = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user)
  const contact = location.state.contact;
  const type = location.state.type;
  const [modal, setModal] = useState<string>("")


  const credentials = {
            senderId: user?.id? user.id : 1,
            receiverId: contact.contactId,
            type: type
        }

    const [messages, setMessages] = useState<MessageResponseDto[]>([])
    const [message, setMessage] = useState<any>({})

    const selectMessage = (message: any ) => {
            setMessage(message)
            setModal("activate")
    }

    const displayMessages = () => {

        return messages.map((message) => (
            <div 
                key={message.messageId} 
                onClick={()=>selectMessage(message)}
                style={{ listStyleType: 'none', cursor: "pointer",
                justifyContent: message.senderId == user?.id? "end" : "start"
            }}
                className='div-one-message'
            >
            <li style={{textAlign: message.senderId == user?.id? "end" : "start", textDecoration:"none"}}
                className='list-message'
            >{message.message}</li>
            </div>
        ));

    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await messageService.getDiscussion(credentials);
            setMessages(response.data);
            console.log(response.data)

        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
        };
    
        fetchData();
    }, []);


  return (
    <>
        <div className='div-discussion'>
            <h1 className='header-discussion'>   {contact.nom} {type == "spam" && "("+type+")"}</h1>
            <div className='div-message'>
                { displayMessages() }
            </div>

        </div>
        
        {modal === "activate" && (
        <ChangeType
          idMessage={message.messageId}
          message={message.message}
          type={type}
          cancelModal={() => setModal("")} // Pass an inline function
          />
      )}
    </>
  )
};


export default Discussion;
