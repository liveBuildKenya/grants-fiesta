import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const EventSchema = new Schema({
    moduleItemId: String,
    moduleType: String,
    name: String,
    description: String,
    remindDate: Date,
    startDate: Date,
    endDate: Date,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface EventModel extends BaseModel {
    name: string;
    moduleItemId: string;
    moduleType: string;
    description: string;
    remindDate: Date;
    startDate: Date;
    endDate: Date;
}