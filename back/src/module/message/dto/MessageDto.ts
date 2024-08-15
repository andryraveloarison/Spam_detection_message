export interface MessageDto {
    senderId: number;
    receiverEmail: string;
    message: string;
}


export interface DiscussionDto {
    senderId: number;
    receiverId: number;
    type: string;
}


export interface ContactDto {
    senderId: number;
    type: string
}


export interface ResponseContact {
    contactId: number;
    nom: string;
    email: string
}