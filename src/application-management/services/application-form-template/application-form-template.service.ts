import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationFormTemplateModel } from 'src/application-management/models/application-template/application-form.model';
import { CreateApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/create-application-template-form-view.model';

@Injectable()
export class ApplicationFormTemplateService {
    constructor(@InjectModel('ApplicationFormTemplate') private applicationFormTemplateModel: Model<ApplicationFormTemplateModel>) {}

    async createApplicationFormTemplate(createApplicationFormTemplateViewModel: CreateApplicationFormTemplateViewModel) {
        createApplicationFormTemplateViewModel.dateCreated = new Date(Date.now());
        return await new this.applicationFormTemplateModel(createApplicationFormTemplateViewModel);
    }
}
