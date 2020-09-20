import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const ResponsesSchema= new Schema({
    response: String,
    dateCreated: { type: Date, default: Date.now }
})

export const MessagesSchema = new Schema({
    description: String,
    to: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
    responses: [
        ResponsesSchema
    ]
})

export interface MessageModel extends BaseModel{
    description: string;
    to: string;
    userId?: string;
    messageId?: string;
    responses?: [
        RespondToMessageModel
    ]
}
export interface ResponsesModel extends BaseModel{
    response: string;
}
export interface RespondToMessageModel {
    response: string;
    _id?: string;
    dateCreated?: string
}