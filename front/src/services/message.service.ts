import { ContactDto, DiscussionDto, MessageDto, UpdateBase } from "../types/MessageInterface"
import Axios from "./caller.service"
import axios from "axios"


let sendMessage = (credentials: MessageDto) => {
    return Axios.post('/message/send', credentials)
}

let getContact = (credentials: ContactDto) => {
    return Axios.post('/message/contact', credentials)
}


let getDiscussion = (credentials: DiscussionDto) => {
    return Axios.post('/message/discussion', credentials)
}

let updateMessage = (id: number) => {
    return Axios.get('/message/'+id)
}


let updateBaseIa = async (credential: UpdateBase)=> {
    return await axios.post('http://localhost:5000/updateBase', credential);
}


let updateModeleIa = () => {
    return axios.get('http://localhost:5000/updateModel');
}

export const messageService = {
    sendMessage, getContact, getDiscussion, updateMessage, updateBaseIa, updateModeleIa
}
