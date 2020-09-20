import { Schema } from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { ApplicationStageTemplateSchema, ApplicationStageTemplateModel } from './application-stage-template.model';
import { ApplicationFormTemplateSchema, ApplicationFormTemplateModel } from './application-form.model';
import { TemplateCustomPropertySchema, TemplateCustomPropertyModel } from './custom-properties-template.model';
import { ReportingTemplateSchema, ReportingTemplateModel } from './application-reporting-template.model';

export const ApplicationTemplateSchema = new Schema({
    templateType: String,
    stages: [ApplicationStageTemplateSchema],
    forms: [ApplicationFormTemplateSchema],
    customProperties: [TemplateCustomPropertySchema],
    filesToUpload: [String],
    reportingTemplates: [ReportingTemplateSchema],
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface ApplicationTemplateModel extends BaseModel{
    templateType: string;
    stages: Array<ApplicationStageTemplateModel>;
    forms: Array<ApplicationFormTemplateModel>;
    customProperties: Array<TemplateCustomPropertyModel>;
    filesToUpload: Array<string>;
    reportingTemplates: Array<ReportingTemplateModel>;
}