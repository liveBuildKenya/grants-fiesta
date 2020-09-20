import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const EvaluationRankingSchema = new Schema({
    stageId: String,
    requestForApplicationId: String,
    customProperty: {},
    applicationIds: [String],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface EvaluationRankingModel extends BaseModel {
    stageId: string,
    requestForApplicationId: string,
    customProperty: any,
    applicationIds: [string]
}