import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const TemplateCustomPropertySchema = new Schema({
    name: String,
    possibleValues: [String],
    dateCreated: {type: Date},
    dateUpdated: {type: Date, default: Date.now}
});

export interface TemplateCustomPropertyModel extends BaseModel {
    name: string;
    possibleValues: Array<string>;
}