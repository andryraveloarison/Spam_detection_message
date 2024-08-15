import { UserInterface } from "src/module/auth/types/UserInterface";

export interface MessageInterface {
    id: number;
    sender: UserInterface;
    receiver: UserInterface;
    message: string;
    type: string
}