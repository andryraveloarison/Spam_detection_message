import { LoginInterface, RegisterInterface, UserInterface } from "../types/UserInterface"
import Axios from "./caller.service"


let login = (credentials: LoginInterface) => {
    return Axios.post('/auth/login', credentials)
}

let register = (credentials: Omit<RegisterInterface, 'id'>) => {
    return Axios.post('/auth/register', credentials)
}

let saveToken = (token: string) => {
    localStorage.setItem('token',token)
}

let logout = () => {
    localStorage.removeItem('token')
    return true
}

let isLogged = () => {
    return false 
}

let getTocken = () => {
    return localStorage.getItem('token')
}


export const accountService = {
    login, saveToken, logout, isLogged,getTocken, register
}
