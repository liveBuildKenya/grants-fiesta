import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationCriteriaTemplateModel } from 'src/application-management/models/application-template/evaluation-criteria-template.model';
import { CreateEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-criteria-template-view.model';

@Injectable()
export class EvaluationCriteriaService {
    constructor(@InjectModel('EvaluationCriteria') private evaluationCriteriaModel: Model<EvaluationCriteriaTemplateModel>) {}

    async createEvaluationCriteria(createEvaluationCriteriaTemplateViewModel: CreateEvaluationCriteriaTemplateViewModel) {
        createEvaluationCriteriaTemplateViewModel.dateCreated = new Date(Date.now());
        return new this.evaluationCriteriaModel(createEvaluationCriteriaTemplateViewModel);
    }
}
