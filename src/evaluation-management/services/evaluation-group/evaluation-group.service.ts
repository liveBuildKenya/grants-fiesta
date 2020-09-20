import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationGroupModel } from 'src/evaluation-management/models/evaluation-group/evaluation-group.model';
import { CreateEvaluationGroupViewModel } from 'src/evaluation-management/models/evaluation-group/create-evaluation-group-view.model';

@Injectable()
export class EvaluationGroupService {

    constructor(@InjectModel('EvaluationGroup') private evaluationGroupModel: Model<EvaluationGroupModel>) {}

    async createEvaluationGroup(createEvaluationGroupViewModel: CreateEvaluationGroupViewModel) {
        createEvaluationGroupViewModel.dateCreated = new Date(Date.now());
        const newEvaluationGroup = await new this.evaluationGroupModel({
            requestForApplication: createEvaluationGroupViewModel.requestForApplicationId,
            isUsingCustomProperty: createEvaluationGroupViewModel.isUsingCustomProperty
        });
        return newEvaluationGroup.save();
    }

    async getAllEvaluationGroups() {
        return await this.evaluationGroupModel.find();
    }

    async getEvaluationGroupById(evaluationGroupId: string) {
        return await this.evaluationGroupModel.findById(evaluationGroupId)
    }

    async getEvaluationGroupByRequestForApplicationId(requetsForApplicationId: string) {
        return await this.evaluationGroupModel.findOne({requestForApplication: requetsForApplicationId}).populate('requestForApplication')
    }

    async updateEvaluationGroup(evaluationGroup: EvaluationGroupModel) {
        return await this.evaluationGroupModel.updateOne({_id: evaluationGroup.id}, evaluationGroup);
    }

    async deleteEvaluationGroup(evaluationGroupId: string) {
        return await this.evaluationGroupModel.deleteOne({ _id: evaluationGroupId });
    }
}
