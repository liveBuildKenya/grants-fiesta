import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportingTemplateModel } from 'src/application-management/models/application-template/application-reporting-template.model';
import { CreateReportingTemplateViewModel } from 'src/application-management/models/application-template/create-reporting-template-view.model';

@Injectable()
export class ReportingTemplateService {
    constructor(@InjectModel('ReportingTemplate') private reportingTemplateModel: Model<ReportingTemplateModel>) {}
    
    async createReportingTemplate(createReportingTemplateViewModel: CreateReportingTemplateViewModel){
        return new this.reportingTemplateModel(createReportingTemplateViewModel);
    }
}
