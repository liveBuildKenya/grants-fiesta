import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ApplicationTemplateModel } from 'src/application-management/models/application-template/application-template.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRequestForApplicationTemplateViewModel } from 'src/application-management/models/application-template/create-request-for-application-template-view.model';

@Injectable()
export class ApplicationTemplateService {

    constructor(@InjectModel('ApplicationTemplate') private applicationTemplateModel: Model<ApplicationTemplateModel>) {}

    async createRequestForApplicationTemplate(createRequestForApplicationTemplateModel: CreateRequestForApplicationTemplateViewModel) {
        createRequestForApplicationTemplateModel.dateCreated = new Date(Date.now());
        const newApplicationTemplate = new this.applicationTemplateModel(createRequestForApplicationTemplateModel);
        return await newApplicationTemplate.save();
    }

    async getApplicationTemplates() {
        return await this.applicationTemplateModel.find()
    }

    async updateApplicationTemplate(applicationTemplate) {
        await this.applicationTemplateModel.updateOne({_id: applicationTemplate._id}, applicationTemplate);
        return await this.getApplicationTemplateById(applicationTemplate._id);
    }

    async deleteApplicationTemplate(applicationTemplateId: string) {
        return await this.applicationTemplateModel.deleteOne({_id: applicationTemplateId});
    }
    
    async getApplicationTemplateById(applicationTemplateId: string) {
        return await this.applicationTemplateModel.findById(applicationTemplateId);
    }
}
