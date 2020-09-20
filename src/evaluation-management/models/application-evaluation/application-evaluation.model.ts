import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const ApplicationEvaluationSchema = new Schema({
    applicationId: String,
    userId: String,
    stageId: String,
    stageType: String,
    criteriaId: String,
    criteriaName: String,
    questionRatings: [
        {
            subCriteriaId: String,
            questionId: String,
            question: String,
            value: String || Number || Boolean,
        }
    ],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ApplicationEvaluationModel extends BaseModel {
    applicationId: string;
    userId: string;
    stageId: string;
    stageType: string;
    criteriaId: string;
    criteriaName: string;
    questionRatings: [
        {
            subCriteriaId: string;
            questionId: string;
            question: string;
            value: any;
        }
    ];
}