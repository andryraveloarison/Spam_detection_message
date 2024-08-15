import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Role } from "./role.entity"

@Entity()
export class Persons {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    phone_number: string    
    
    @Column()
    photo: string

    @ManyToOne(() => Role, (role) => role.persons)
    role: Role
    
}