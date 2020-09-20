import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const ReportingTemplateSchema = new Schema({
    fileId: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ReportingTemplateModel extends BaseModel {
    fileId: string;
}