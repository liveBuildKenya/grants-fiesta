import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationSubCriteriaTemplateModel } from 'src/application-management/models/application-template/evaluation-sub-criteria-template.model';
import { CreateEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-sub-criteria-template-view.model';

@Injectable()
export class EvaluationSubCriteriaService {
    constructor(@InjectModel('EvaluationSubCriteria') private evaluationSubCriteriaTemplateModel: Model<EvaluationSubCriteriaTemplateModel>) {}

    async createEvaluationSubCriteria(createEvaluationSubCriteriaTemplateViewModel: CreateEvaluationSubCriteriaTemplateViewModel) {
        createEvaluationSubCriteriaTemplateViewModel.dateCreated = new Date(Date.now());
        return await new this.evaluationSubCriteriaTemplateModel(createEvaluationSubCriteriaTemplateViewModel);
    }
}
