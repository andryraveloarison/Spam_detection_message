import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Users } from "../../auth/entities/users.entity"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    type: string

    @ManyToOne(type => Users, user => user.sentMessages)
    sender: Users;

    @ManyToOne(type => Users, user => user.receivedMessages)
    receiver: Users; 
    
}