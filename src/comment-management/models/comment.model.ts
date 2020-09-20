import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { UserModel } from 'src/user-management/models/user.model';

export const CommentSchema = new Schema({
    moduleItemId: String,
    moduleType: String,
    commentText: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    stageId: String,
    customProperty: {},
    dateCreated: { type: Date},
    dateUpdated: { type: Date, default: Date.now }
});

export interface CommentModel extends BaseModel {
    moduleItemId: string;
    moduleType: string;
    commentText: string;
    user: UserModel;
    stageId: string;
    customProperty: any;
}