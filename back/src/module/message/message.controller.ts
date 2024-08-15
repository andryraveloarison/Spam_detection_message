import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContactDto, DiscussionDto, MessageDto, ResponseContact } from './dto/MessageDto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService){}

    @Post('send')
    async register(@Body() messageDto: MessageDto) {
        return this.messageService.sendMessage(messageDto);
    }


    @Post('contact') 
    findContact(@Body() contactDto: ContactDto): Promise<ResponseContact[]>{
        return this.messageService.findContact(contactDto);
    }

    @Post('discussion') 
    async getDiscussion(@Body() discussionDto: DiscussionDto) {
        return this.messageService.getDiscussion(discussionDto);
    }

    @Get('/:id')
    async changeType(@Param('id') id: string) {
        return this.messageService.changeType(+id);
    }



}
