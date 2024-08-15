import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Persons } from "./persons.entity"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Persons, (person) => person.role)
    persons: Persons[]
}