import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationStageTemplateModel } from 'src/application-management/models/application-template/application-stage-template.model';
import { Model } from 'mongoose';
import { CreateApplicationStageTemplateViewModel } from 'src/application-management/models/application-template/create-application-stage-template-view.model';

@Injectable()
export class ApplicationStageService {
    constructor(@InjectModel('ApplicationStage') private applicationStageModel: Model<ApplicationStageTemplateModel>) {}
    
    async createApplicationStage(createApplicationStageTemplate: CreateApplicationStageTemplateViewModel){
        createApplicationStageTemplate.dateCreated = new Date(Date.now());
        return new this.applicationStageModel(createApplicationStageTemplate);
    }
}
