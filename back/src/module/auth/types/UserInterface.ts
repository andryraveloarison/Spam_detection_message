
import {PersonInterface} from './PersonInterface'

export interface UserInterface {
    id: number
    email: string
    password: string
    person: PersonInterface
}