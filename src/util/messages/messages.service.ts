import { Injectable } from '@nestjs/common';
import { MessageModel } from './message.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel('Messages') private messageModel: Model<MessageModel>
    ){

    }

    async getAllMessages(){
        return await this.messageModel.find().exec();
    }

    async createMessage(createMessageObject){
        const newMessage = new this.messageModel(createMessageObject)
        return await newMessage.save();
    }

    async respondToMessage(respondToMessageObject){
        /**
         * get message doc by _id 
         * push response to message.responses
         * save updated
         * return updated
         */

         // eslint-disable-next-line prefer-const
         let _ = await this.messageModel.findOne({_id: respondToMessageObject.messageId});
         _.responses.push({
             response: respondToMessageObject.response
         });
         _.dateUpdated = new Date(Date.now());
         const _updated = await _.save();
         return _updated;
    }
}
