import { Injectable } from '@nestjs/common';
import { CreateApplicationEvaluationViewModel } from 'src/evaluation-management/models/application-evaluation/create-application-evaluation-view.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationEvaluationModel } from 'src/evaluation-management/models/application-evaluation/application-evaluation.model';

@Injectable()
export class ApplicationEvaluationService {

    constructor(@InjectModel('ApplicationEvaluation') private applicationEvaluationModel: Model<ApplicationEvaluationModel>) {}

    async createEvaluation(createApplicationEvaluationViewModel: CreateApplicationEvaluationViewModel) {
        createApplicationEvaluationViewModel.dateCreated = new Date(Date.now());
        
        const newApplicationEvaluation = new this.applicationEvaluationModel(createApplicationEvaluationViewModel);

        return newApplicationEvaluation.save();
    }

    async getApplicationEvaluationByApplicationId(applicationId: string) {
        return this.applicationEvaluationModel.find({applicationId: applicationId});
    }

    async getApplicationByUserIdStageIdAndApplicationId(searchFilter: {userId: string, stageId: string, applicationId: string, criteriaId: string}) {
        return this.applicationEvaluationModel.findOne({
            userId: searchFilter.userId,
            stageId: searchFilter.stageId,
            applicationId: searchFilter.applicationId,
            criteriaId: searchFilter.criteriaId
        });
    }
}
