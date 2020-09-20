import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const CriteriaQuestionTemplateSchema = new Schema({
    questionText: String,
    possibleMarks: Number,
    questionType: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface CriteriaQuestionTemplateModel extends BaseModel {
    questionText: string;
    questionType: string;
    possibleMarks: number;   
}