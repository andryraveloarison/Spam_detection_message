import { ContactDto, DiscussionDto, MessageDto } from "../types/MessageInterface"
import Axios from "./caller.service"


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

export const messageService = {
    sendMessage, getContact, getDiscussion, updateMessage
}
