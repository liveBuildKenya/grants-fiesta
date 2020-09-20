import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const RequestForApplicationFormsResponseSchema = new Schema({
    requestForApplicationFormId: String,
    requestForApplicationFormResponse: {},
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface RequestForApplicationFormsResponseModel extends BaseModel {
    requestForApplicationFormId: string;
    requestForApplicationFormResponse: any;
}