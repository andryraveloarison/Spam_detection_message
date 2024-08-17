import { UserInterface } from "./UserInterface";

export interface MessageInterface {
    id: number;
    sender: UserInterface;
    receiver: UserInterface;
    message: string;
    type: string
}


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


export interface MessageResponseDto {
    messageId: number;
    senderId: number;
    receiverID: string;
    message: string;
}


export interface UpdateBase {
    message: string;
    type: string
}