import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { UserModel } from 'src/user-management/models/user.model';
import { UserGroupModel } from 'src/user-management/models/userGroups.model';

export const MessageSchema = new Schema({
    title: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    sentTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sentToGroups: [{ type: Schema.Types.ObjectId, ref: 'UserGroup' }],
    responseTo: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

export interface MessageModel extends BaseModel {
    title: string;
    description: string;
    createdBy: string | UserModel;
    sentTo: string[] | UserModel[];
    sentToGroups: string[] | UserGroupModel[];
    responseTo: string | MessageModel;
    dateCreated?: Date;
    dateUpdated?: Date;
}