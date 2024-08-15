import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/RegistrationDto';
import { LoginDto } from './dto/LoginDto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Persons } from './entities/persons.entity';
import { Users } from './entities/users.entity';
import { PersonInterface } from './types/PersonInterface';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/jwt';
import { Role } from './entities/role.entity';

const { AuthenticationError } = require('../../error/customError')


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Persons) private personRepository: Repository<Persons>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ){}

  
    async register(registrationDto: RegistrationDto): Promise<PersonInterface> {
        // Creation d'une personne

        let email = registrationDto.email

        const findOneOptions: FindOneOptions<Users> = {
          where: { email },
          relations: ['person', 'person.role'],
        };
        
        const user = await this.userRepository.findOne(findOneOptions);

        if(user) {
          throw new AuthenticationError(' Ce compte existe deja', 1)
        }

        let { password,idRole, ...newPersonData } = registrationDto;
        const id = registrationDto.idRole
        const role = await this.roleRepository.findOneBy({id})
        const newPerson = {...newPersonData, role} 

        await this.personRepository.save(newPerson).then(async (response) => {

          if(id != 3){

          //Creation du compte de la personne
          let { password, ...register } = registrationDto;
          let person  = response;
          
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt);
          
          // Création de l'objet utilisateur avec le mot de passe haché
          const newAccount = { email, password: hashedPassword, person: person };
          
          this.userRepository.save(newAccount)

        }


        })

        return this.personRepository.save(newPerson)
      }

    
    async login(loginDto: LoginDto ): Promise<any> {
        // Logique de connexion ici
        const email = loginDto.email
        const password = loginDto.password

        const findOneOptions: FindOneOptions<Users> = {
          where: { email },
          relations: ['person', 'person.role'],
        };
        
        const user = await this.userRepository.findOne(findOneOptions);

        if (!user){ 
          throw new AuthenticationError(' Ce compte n\'existe pas', 1)
        }

        if (!bcrypt.compareSync(password, user.password)) {
          throw new AuthenticationError('Mauvais password ou email', 0)
        }


        const id = user.person.id
        const role = user.person.role.id
        
        const token = generateToken({id, email, role})
        const person = user.person
        const response = {person,token}
        return response;

      }


    findAll(): Promise<Users[]> {
        return this.userRepository.find({
          relations: {
              person: true,
          
          },
        });
    }

}
