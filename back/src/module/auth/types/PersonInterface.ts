import { Role } from "../entities/role.entity"

export interface PersonInterface {
    id: number
    first_name: string
    last_name: string
    address: string
    phone_number: string    
    photo: string
    email: string
    role: Role
}

