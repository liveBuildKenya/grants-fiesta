import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TemplateCustomPropertyModel } from 'src/application-management/models/application-template/custom-properties-template.model';
import { CreateTemplateCustomPropertyViewModel } from 'src/application-management/models/application-template/create-template-custom-properties-view.model';
import { Model } from 'mongoose';

@Injectable()
export class TemplateCustomPropertiesService {

    constructor(@InjectModel('TemplateCustomProperty') private templateCustomPropertyModel: Model<TemplateCustomPropertyModel>) {}

    async createTemplateCustomProperties(createTemplateCustomPropertiesViewModel: CreateTemplateCustomPropertyViewModel) {
        createTemplateCustomPropertiesViewModel.dateCreated = new Date(Date.now());
        return await new this.templateCustomPropertyModel(createTemplateCustomPropertiesViewModel);
    }
}
