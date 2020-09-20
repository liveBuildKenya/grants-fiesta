import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const EvaluationGroupSchema = new Schema({
    requestForApplication: { type: Schema.Types.ObjectId, ref: 'ApplicationRequest' },
    evaluators: [{ 
        stageId: String,
        customProperty: {},
        userIds: [String],
    }],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now } 
});

export interface EvaluationGroupModel extends BaseModel {
    requestForApplication: any;
    evaluators: [{
        stageId: string;
        customProperty: any;
        userIds: Array<string>;
    }];
}