export interface LoginInterface {
    email: string,
    password: string
}

export interface RegisterInterface {
    id: number
    first_name: string
    last_name: string
    address: string
    phone_number: string    
    photo: string
    email: string
}


export interface UserInterface {
    id: number
    first_name: string
    last_name: string
    address: string
    phone_number: string    
    photo: string
    email: string
    role: RoleInterface
}


export interface RoleInterface {
    id: number
    name: string
}

