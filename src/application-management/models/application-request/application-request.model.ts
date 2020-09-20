import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const ApplicationRequestSchema = new Schema({
    applicationTemplateId: [{ type: Schema.Types.ObjectId, ref: 'ApplicationTemplate' }],
    referenceNumber: String,
    title: String,
    shortDescription: String,
    longDescription: String,
    keyInformation: String,
    attachments: [{fileId: String, fileType: String, name: String}],
    published: { type: Boolean, default: false },
    interestExpressed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    deadline: { type: Date },
    reviewDeadline: {type: Date},
    currentStage: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    filesToUpload: [String],
    datePublished: { type: Date },
    dateUnPublished: { type: Date },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ApplicationRequestModel extends BaseModel {
    applicationTemplateId: string;
    referenceNumber: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    keyInformation: string;
    attachments: [{fileId: string, name: string}]
    published: boolean;
    interestExpressed: Array<string>,
    owner: any,
    filesToUpload: Array<string>,
    datePublished: Date;
    dateUnPublished: Date;
    deadline: Date;
    reviewDeadline: Date;
    currentStage: string;
}