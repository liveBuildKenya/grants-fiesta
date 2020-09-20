import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const ReportAttachmentSchema = new Schema({
    fileId: String,
    requestForApplicationId: String,
    stageId: String,
    dateCreated: {type: Date},
    dateUpdated: {type: Date, default: Date.now}
});

export interface ReportAttachementModel extends BaseModel{
    fileId: string;
    requestForApplicationId: string;
    stageId: string;
}
