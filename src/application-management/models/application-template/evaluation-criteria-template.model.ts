import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { EvaluationSubCriteriaTemplateSchema, EvaluationSubCriteriaTemplateModel } from './evaluation-sub-criteria-template.model';

export const EvaluationCriteriaTemplateSchema = new Schema({
    subCriteria: [EvaluationSubCriteriaTemplateSchema],
    name: String,
    displayOrder: Number,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface EvaluationCriteriaTemplateModel extends BaseModel{
    subCriteria: Array<EvaluationSubCriteriaTemplateModel>,
    name: string,
    displayOrder: number
}