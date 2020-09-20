import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { UploadedFileSchema, UploadedFileModel } from './uploaded-file.model';
import { UserModel } from 'src/user-management/models/user.model';
import { RequestForApplicationFormsResponseSchema, RequestForApplicationFormsResponseModel } from './request-for-application-forms-response.model';

export const ApplicationSchema = new Schema({
    requestForApplication: { type: Schema.Types.ObjectId, ref: 'ApplicationRequest' },
    country: String,
    customProperties: {},
    requestForApplicationFormsResponse: [RequestForApplicationFormsResponseSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    currentStage: String,
    approved: { type: Boolean, default: false }, 
    granted: { type: Boolean, default: false },
    uploadedFiles: [UploadedFileSchema],
    submitted: { type: Boolean, default: false },
    dateSubmitted: { type: Date },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
});

export interface ApplicationModel extends BaseModel {
    requestForApplication: any;
    customProperties: any,
    country: string;
    user: UserModel | string;
    currentStage: string;
    uploadedFiles: Array<UploadedFileModel>;
    submitted: boolean;
    approved: boolean;
    granted: boolean;
    dateSubmitted: Date,
    requestForApplicationFormsResponse: Array<RequestForApplicationFormsResponseModel>;
}