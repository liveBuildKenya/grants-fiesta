import { Schema } from "mongoose";
import { BaseModel } from "src/shared/models/base.model";

export const WhistleBlowSchema = new Schema({
    title: String,
    message: String,
    email: String,
    fileId: String
});

export interface WhistleBlowModel extends BaseModel {
    title: string;
    massage: string;
    email: string;
    fileId: string;
}