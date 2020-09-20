import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';


export const InviteSchema = new mongoose.Schema({
    email: String,
    message: String,
    status: String,
    invitedBy: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface InviteModel extends BaseModel {
    email: string;
    message: string;
    status: string;
    invitedBy: string;
}