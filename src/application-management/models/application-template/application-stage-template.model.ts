import { Schema } from 'mongoose';
import { EvaluationCriteriaTemplateSchema, EvaluationCriteriaTemplateModel } from './evaluation-criteria-template.model';
import { BaseModel } from 'src/shared/models/base.model';

export const ApplicationStageTemplateSchema = new Schema({
    categorizationField: String,
    name: String,
    displayOrder: Number,
    targetDuration: Number,
    durationType: String,
    stageType: String,
    evaluationCriteria: [EvaluationCriteriaTemplateSchema],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ApplicationStageTemplateModel extends BaseModel {
    categorizationField: string;
    name: string;
    displayOrder: number;
    targetDuration: number;
    durationType: string;
    stageType: string;
    evaliationCriteria: Array<EvaluationCriteriaTemplateModel>;
}