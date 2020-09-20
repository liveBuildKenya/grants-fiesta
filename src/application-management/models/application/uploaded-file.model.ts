import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const UploadedFileSchema = new Schema({
    fileId: String,
    name: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface UploadedFileModel extends BaseModel {
    fileId: string;
    name: string;
}