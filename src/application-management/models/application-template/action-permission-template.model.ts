import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const ActionPermissionTemplateSchema = new Schema({
    action: String,
    users: [String],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ActionPermissionTemplateModel extends BaseModel{
    action: string;
    users: Array<string>;
}