import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const UserGroupSchema = new mongoose.Schema({
    groupName: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    permissions: [String],
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

export interface UserGroupModel extends BaseModel {
    groupName: string;
    users: string[];
    permissions: Array<string>;
    dateCreated: Date;
    dateUpdated: Date;
}

export enum DefaultSystemUserGroups {
    SYSTEMADMINS  = "SYSTEMADMINS", // Set in the DB (gives overall access everywhere in the system including permissions management)
    ALLUSERSINCLUDINGGUESTS  = "ALLUSERSINCLUDINGGUESTS", // Not set in the DB
    ALLUSERS  = "ALLUSERS", // Not set in the DB
}