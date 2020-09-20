import { Schema } from 'mongoose';
import { BaseModel } from "src/shared/models/base.model";

export const ApplicationFormTemplateSchema = new Schema({
    title: String,
    displayOrder: Number,
    requestForApplicationFormFields: {},
    isSummary: Boolean,
    dateCreated: {type: Date}
})

export interface ApplicationFormTemplateModel extends BaseModel {
    title: string;
    displayOrder: number;
    requestForApplicationFormFields: any;
    isSummary: boolean;
}