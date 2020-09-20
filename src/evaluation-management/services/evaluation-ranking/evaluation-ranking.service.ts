import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationRankingModel } from 'src/evaluation-management/models/evaluation-ranking/evaluation-ranking.model';
import { CreateEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/create-evaluation-ranking-view.model';
import { SearchEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/search-evaluation-ranking-view.model';

@Injectable()
export class EvaluationRankingService {

    constructor(@InjectModel('EvaluationRanking') private evaluationRankingModel: Model<EvaluationRankingModel>) {}

    async createEvaluationRanking(createEvaluationRankingViewModel: CreateEvaluationRankingViewModel){
        createEvaluationRankingViewModel.dateCreated = (new Date(Date.now()));

        const newEvaluationRanking = new this.evaluationRankingModel(createEvaluationRankingViewModel);

        return await newEvaluationRanking.save();
    }

    async searchEvaluationRanking(searchEvaluationRankingViewModel: SearchEvaluationRankingViewModel) {
        return await this.evaluationRankingModel.find({
            requestForApplicationId: searchEvaluationRankingViewModel.requestForApplicationId,
            stageId: searchEvaluationRankingViewModel.stageId,
            customProperty: searchEvaluationRankingViewModel.customProperty
        });
    }
}
