import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const ClarificationRepliesSchema = new Schema({
  reply: String,
  repliedBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
  dateReplied:{ type: Date, default: Date.now },
  isPublished: Boolean
})

export const ClarificationSchema = new Schema({
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  moduleType: String,
  relatedModuleItemID:String,
  isPublished: Boolean,
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  replies: [ClarificationRepliesSchema]
});

export interface ClarificationReplyModel extends BaseModel {
 reply: string,
 repliedBy?: string,
 dateReplied?: Date 
 isPublishReply?: boolean
}

export interface ClarificationModel extends BaseModel {
  requestedBy: string;
  title: string;
  description: string;
  moduleType: string;
  relatedModuleItemID?:string;
  isPublished?: boolean;
  dateUpdated?: Date;
  dateCreated?: Date;
  replies?: [ReplyToRFCModel]
}

export interface ReplyToRFCModel {
  _id?: string
  reply: string;
  isPublished: boolean;
  rfcId?: string;
}