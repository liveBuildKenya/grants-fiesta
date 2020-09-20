import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CriteriaQuestionTemplateModel } from 'src/application-management/models/application-template/criteria-question-template.model';
import { Model } from 'mongoose';
import { CreateCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/create-criteria-questions-template-view.model';

@Injectable()
export class CriteriaQuestionService {
    constructor(@InjectModel('CriteriaQuestion') private criteriaQuestionModel: Model<CriteriaQuestionTemplateModel>) {}

    async createCriteriaQuestion(createCriteriaQuestionTemplateViewModel: CreateCriteriaQuestionTemplateViewModel){
        createCriteriaQuestionTemplateViewModel.dateCreated = new Date(Date.now());
        return new this.criteriaQuestionModel(createCriteriaQuestionTemplateViewModel);
    }
}
