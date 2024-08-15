import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm"
import { Persons } from "./persons.entity"
import { Message } from "src/module/message/entities/message.entity"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string


    @OneToOne(() => Persons)
    @JoinColumn()
    person: Persons

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];
}