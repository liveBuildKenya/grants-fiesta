import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { CriteriaQuestionTemplateModel, CriteriaQuestionTemplateSchema } from './criteria-question-template.model';

export const EvaluationSubCriteriaTemplateSchema = new Schema({
    displayOrder: Number,
    isCalculated: Boolean,
    criteriaQuestions: [CriteriaQuestionTemplateSchema],
    allowComments: Boolean,
    name: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface EvaluationSubCriteriaTemplateModel extends BaseModel{
    displayOrder: number;
    isCalculated: boolean;
    criteriaQuestions: Array<CriteriaQuestionTemplateModel>,
    allowComments: boolean,
    name: string
}