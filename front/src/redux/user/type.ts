

export interface UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    user: UserInterface | null;
    token:string
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

