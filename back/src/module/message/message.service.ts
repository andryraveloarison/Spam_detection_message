import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../auth/entities/users.entity';
import { ContactDto, DiscussionDto, MessageDto, ResponseContact } from './dto/MessageDto';
import { Message } from './entities/message.entity';
import { MessageInterface } from './types/MessageInterface';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

const { AuthenticationError } = require('../../error/customError')


@Injectable()
export class MessageService {

  constructor(
    private httpService: HttpService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Message) private messageRepository: Repository<Message>

  ){}

  
  async sendMessage(messageDto: MessageDto): Promise<MessageInterface> {
        // Creation d'une personne
        const apiUrl = 'http://localhost:5000/getType'; // Remplacez par l'URL de votre API Flask

        let email = messageDto.receiverEmail

        const findOneOptions: FindOneOptions<Users> = {
          where: { email },
        };
        
        let id = messageDto.senderId

        const sender = await this.userRepository.findOneBy({id})
        const receiver = await this.userRepository.findOne(findOneOptions);

        if(!receiver) {
          throw new AuthenticationError(' Ce compte n\'existe pas', 1)
        }

        const message = messageDto.message
        // Envoi de la requête à l'API Flask
        const payload = {
          message: message
        }
        const response: AxiosResponse<any> = await this.httpService.post(apiUrl, payload).toPromise();

        
        const type = response.data.type; 

        console.log(type)
        let newMessage = {
          sender: sender,
          receiver: receiver,
          message: message,
          type: type
        }

        return await this.messageRepository.save(newMessage)

      }


    async findContact(contactDto: ContactDto): Promise<ResponseContact[]> {
      const id = contactDto.senderId
      const type = contactDto.type
      const sender = await this.messageRepository.findOneBy({id})
      const receiver = await this.messageRepository.findOneBy({id})

      const findOptions: FindOneOptions<Message> = {
        where: { receiver, sender, type },
        relations:[
          "receiver",
          "sender",
          "receiver.person", // Inclure la relation 'person' de l'entité 'receiver'
          "sender.person"     // Inclure la relation 'person' de l'entité 'sender'
        ]
      };

      const allMessages = await this.messageRepository.find(findOptions);

      const contacts = []

      allMessages.forEach((message) => {
          if (!contacts.some(contact => contact.id === message.receiver.id)) {
            if(message.receiver.id != id){
              let receiver = message.receiver
              const {password, ...newContact} = receiver
              contacts.push(newContact);
            }
            
          }

          if (!contacts.some(contact => contact.id === message.sender.id)) {
            if(message.sender.id != id){
              let sender = message.sender
              const {password, ...newContact} = sender
              contacts.push(newContact);
            }
          }   
       })


      const data = []
      contacts.map((contact) => {
        const newContact = {
          contactId: contact.id,
          nom: contact.person.first_name,
          email: contact.email
        }

        data.push(newContact)
        
      })


      return data
    }

    getDiscussion = async (discussionDto : DiscussionDto): Promise<Message[]> => {

      const sender = await this.messageRepository.findOneBy({id:discussionDto.senderId})
      const receiver = await this.messageRepository.findOneBy({id:discussionDto.receiverId})
      let type = discussionDto.type

      let messages = await this.messageRepository.find({
        where: { sender, receiver, type },
        relations: {
          sender:true,
          receiver:true
        },
        order: {
          id: "ASC" // Supposant que vous vouliez trier par la date de création en descendant
        }
      });

      const data = []

      messages.map((message) => {
        const newMessage = {
          messageId: message.id,
          senderId: message.sender.id,
          receiverId: message.receiver.id,
          message: message.message
        }
        data.push(newMessage)
      })

      return data
    }


    changeType = async (id: number)=>{

      const message = await this.messageRepository.findOneBy({id})
      let newType = "spam"
      if(message.type == "spam"){
        newType = "ham" 
      }
      message.type = newType; // Assurez-vous que votre modèle Message autorise la mise à jour de ce champ
      await this.messageRepository.save(message); 

    }




}
