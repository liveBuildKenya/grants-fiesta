import { Injectable, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Injectable()
export class MessageManagementService {
    

    constructor(
        private messageService: MessagesService
    ){}

    async getAllMessages(){
        return {
            status: HttpStatus.OK,
            body: {
                message: `All messages fetched`,
                result: await this.messageService.getAllMessages()
            }
        }
    }

    async createHelpMessage(createMessageObject){
        return {
            status: HttpStatus.OK,
            body: {
                message: `Message Posted`,
                result: await this.messageService.createMessage(createMessageObject)
            }
        }
    }

    async respondToMessage(respondToMessageObject){
        return {
            status: HttpStatus.OK,
            body: {
                message: `Response ${respondToMessageObject.response} to message ${respondToMessageObject.messageId} saved`,
                result: await this.messageService.respondToMessage(respondToMessageObject)
            }
        }
    }
}
