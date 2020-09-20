import { Injectable, HttpStatus } from '@nestjs/common';
import { EvaluationGroupService } from '../evaluation-group/evaluation-group.service';
import { CreateApplicationEvaluationViewModel } from 'src/evaluation-management/models/application-evaluation/create-application-evaluation-view.model';
import { ApplicationEvaluationService } from '../application-evaluation/application-evaluation.service';
import { CreateEvaluationGroupViewModel } from 'src/evaluation-management/models/evaluation-group/create-evaluation-group-view.model';
import { isNullOrUndefined } from 'util';
import { find, filter, remove } from 'lodash';
import { EditEvaluationGroupMembersViewModel } from 'src/evaluation-management/models/evaluation-group/edit-evaluation-group-members-view.model';
import { CreateEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/create-evaluation-ranking-view.model';
import { ApplicationService } from 'src/application-management/services/application/application.service';
import { EvaluationRankingService } from '../evaluation-ranking/evaluation-ranking.service';
import { DeleteEvaluationGroupMembersViewModel } from 'src/evaluation-management/models/evaluation-group/delete-evaluation-group-members-view.model';
import { ObjectId } from 'mongodb';
import { SearchEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/search-evaluation-ranking-view.model';

@Injectable()
export class EvaluationManagementService {

    constructor(private evaluationGroupService: EvaluationGroupService,
                private applicationEvaluationService: ApplicationEvaluationService,
                private applicationService: ApplicationService,
                private evaluationRankingService: EvaluationRankingService) {}

    async createEvaluationGroup(createEvaluationGroupViewModel: CreateEvaluationGroupViewModel) {
        if (!createEvaluationGroupViewModel.evaluators) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Group not created: evaluators not defined',
                    result: createEvaluationGroupViewModel,
                    error: 'evaluators not defined'
                }
            };
        }

        if (!createEvaluationGroupViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Group not created: requestForApplicationId not defined',
                    result: createEvaluationGroupViewModel,
                    error: 'requestForApplicationId not defined'
                }
            };
        }

        const evaluationGroup = await this.evaluationGroupService.getEvaluationGroupByRequestForApplicationId(createEvaluationGroupViewModel.requestForApplicationId);

        if(isNullOrUndefined(evaluationGroup)) {
            const newEvaluationGroup = await this.evaluationGroupService.createEvaluationGroup(createEvaluationGroupViewModel);

            if (createEvaluationGroupViewModel.isUsingCustomProperty) {
                newEvaluationGroup.evaluators.push(                {
                    stageId: createEvaluationGroupViewModel.evaluators.stageId,
                    customProperty: createEvaluationGroupViewModel.evaluators.customProperty,
                    userIds: createEvaluationGroupViewModel.evaluators.userIds
                });
            } else {
                newEvaluationGroup.evaluators.push({
                    stageId: createEvaluationGroupViewModel.evaluators.stageId,
                    customProperty: null,
                    userIds: createEvaluationGroupViewModel.evaluators.userIds
                })
            }

            await this.evaluationGroupService.updateEvaluationGroup(newEvaluationGroup);

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Evaluation group created successfully',
                    result: (await this.evaluationGroupService.getAllEvaluationGroups())
                }
            }
        }
        else {

            const stageEvaluators = find(evaluationGroup.evaluators,
                {
                    stageId: createEvaluationGroupViewModel.evaluators.stageId, 
                    customProperty: createEvaluationGroupViewModel.evaluators.customProperty
                });

            if (isNullOrUndefined(stageEvaluators)) {

                if (createEvaluationGroupViewModel.isUsingCustomProperty) {
                    evaluationGroup.evaluators.push(                {
                        stageId: createEvaluationGroupViewModel.evaluators.stageId,
                        customProperty: createEvaluationGroupViewModel.evaluators.customProperty,
                        userIds: createEvaluationGroupViewModel.evaluators.userIds
                    });
                } else {
                    evaluationGroup.evaluators.push({
                        stageId: createEvaluationGroupViewModel.evaluators.stageId,
                        customProperty: null,
                        userIds: createEvaluationGroupViewModel.evaluators.userIds
                    })
                }

                await this.evaluationGroupService.updateEvaluationGroup(evaluationGroup);

                return {
                    status: HttpStatus.OK,
                    body: {
                        message: 'Evaluations group updated successfully',
                        result: (await this.evaluationGroupService.getEvaluationGroupById(evaluationGroup.id))
                    }
                };
            }
            else {
                return {
                    status: HttpStatus.METHOD_NOT_ALLOWED,
                    body: {
                        message: 'Evaluations group already exists',
                        result: (await this.evaluationGroupService.getEvaluationGroupById(evaluationGroup.id))
                    }
                };
            }
        }
    }

    async deleteEvaluationGroupMembers(evaluationGroupId: string, deleteEvaluationGroupMembersViewModel: DeleteEvaluationGroupMembersViewModel) {
        const evaluationGroup = await this.evaluationGroupService.getEvaluationGroupById(evaluationGroupId);

        remove(evaluationGroup.evaluators, (evaluationGroupEvaluators) => {
            return find(evaluationGroupEvaluators, { _id: new ObjectId(deleteEvaluationGroupMembersViewModel.evaluatorsId)});
        });

        await this.evaluationGroupService.updateEvaluationGroup(evaluationGroup);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluators deleted',
                result: (await this.evaluationGroupService.getEvaluationGroupById(evaluationGroupId))
            }
        };
    }

    async getAllEvaluationGroups() {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation groups',
                result: (await this.evaluationGroupService.getAllEvaluationGroups())
            }
        }
    }

    async deleteEvaluationGroup(evaluationGroupId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation group deleted',
                result: (await this.evaluationGroupService.deleteEvaluationGroup(evaluationGroupId))
            }
        }
    }

    async getUserEvaluationGroup(currentUser, requestForApplicationId) {

        const requestForApplicationEvaluationGroup = await this.evaluationGroupService.getEvaluationGroupByRequestForApplicationId(requestForApplicationId);

        if (isNullOrUndefined(requestForApplicationEvaluationGroup)) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Evaluation group does not exist',
                    result: null
                }
            };
        }
        else {
            const evaluationGroups = filter(requestForApplicationEvaluationGroup.evaluators, (evaluator) => {
                return evaluator.userIds.includes(currentUser._id);
            });
    
    
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'User evaluation group',
                    result: evaluationGroups
                }
            }
        }
    }

    async createApplicationEvaluation(currentUser, createApplicationEvaluationViewModel: CreateApplicationEvaluationViewModel) {
        if (!createApplicationEvaluationViewModel.applicationId) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application Evaluation ont created: applicationId not defined',
                    result: createApplicationEvaluationViewModel,
                    error: 'applicationId not defined'
                }
            }
        }

        if (!createApplicationEvaluationViewModel.stageId) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application Evaluation ont created: stageId not defined',
                    result: createApplicationEvaluationViewModel,
                    error: 'stageId not defined'
                }
            }
        }

        if (!createApplicationEvaluationViewModel.criteriaId ) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application Evaluation ont created: criteriaId not defined',
                    result: createApplicationEvaluationViewModel,
                    error: 'criteriaId not defined'
                }
            }
        }

        createApplicationEvaluationViewModel.userId = currentUser._id;

        const userApplicationEvaluations = await this.applicationEvaluationService.getApplicationByUserIdStageIdAndApplicationId({
            applicationId: createApplicationEvaluationViewModel.applicationId,
            userId: createApplicationEvaluationViewModel.userId,
            stageId: createApplicationEvaluationViewModel.stageId,
            criteriaId: createApplicationEvaluationViewModel.criteriaId
        });

        // if (userApplicationEvaluations.length > 0) {
            
        //     const criteriaEvaluated = userApplicationEvaluations
        //         .find(userApplicationEvaluation => userApplicationEvaluation.criteria.criteriaId === createApplicationEvaluationViewModel.criteria.criteriaId);

        // } else {
        //     return {
        //         status: HttpStatus.OK,
        //         body: {
        //             message: 'Evaluation Created',
        //             result: (await this.applicationEvaluationService.createEvaluation(createApplicationEvaluationViewModel))
        //         }
        //     };
        // }

        if (!isNullOrUndefined(userApplicationEvaluations)) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Evaluation Already exists',
                    result: userApplicationEvaluations
                }
            };
        }
        else {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Evaluation Created',
                    result: (await this.applicationEvaluationService.createEvaluation(createApplicationEvaluationViewModel))
                }
            };
        }
    }

    async getApplicationEvaluationByApplicationId(applicationId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application evaluation',
                result: (await this.applicationEvaluationService.getApplicationEvaluationByApplicationId(applicationId))
            }
        };
    }

    async editEvaluationGroupMembers(evaluationGroupId: string, editEvaluationGroupMembersViewModel: EditEvaluationGroupMembersViewModel) {
        if (!editEvaluationGroupMembersViewModel.evaluationGroupEvaluatorsId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Group not edited: evaluationGroupEvaluatorsId not defined',
                    result: editEvaluationGroupMembersViewModel,
                    error: 'stageId not defined'
                }
            };
        }

        if (!editEvaluationGroupMembersViewModel.userIds || editEvaluationGroupMembersViewModel.userIds.length == 0) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Group not edited: userIds not defined',
                    result: editEvaluationGroupMembersViewModel,
                    error: 'userIds not defined'
                }
            };
        }

        const evaluationGroup = await this.evaluationGroupService.getEvaluationGroupById(evaluationGroupId);
        const evaluators: any = find(evaluationGroup.evaluators, {_id: new ObjectId(editEvaluationGroupMembersViewModel.evaluationGroupEvaluatorsId)});
        if (isNullOrUndefined(evaluators)) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Members not edited: evaluators not found',
                    result: null,
                    error: 'evaluators not found'
                }
            }
        }
        else {
            evaluators.userIds = editEvaluationGroupMembersViewModel.userIds;

            await this.evaluationGroupService.updateEvaluationGroup(evaluationGroup);

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Members added',
                    result: (await this.evaluationGroupService.getEvaluationGroupById(evaluationGroupId))
                }
            };
        }
    }

    async createEvaluationRanking(createEvaluationRankingViewModel: CreateEvaluationRankingViewModel) {
        if (!createEvaluationRankingViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Ranking not created: requestForApplicationId not defined',
                    result: createEvaluationRankingViewModel,
                    error: 'requestForApplicationId not defined'
                }
            }
        }

        if (!createEvaluationRankingViewModel.stageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Ranking not created: stageId not defined',
                    result: createEvaluationRankingViewModel,
                    error: 'stageId not defined'
                }
            };
        }

        if (!createEvaluationRankingViewModel.applicationIds || createEvaluationRankingViewModel.applicationIds.length < 1) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Ranking not created: requestForApplicationId not defined',
                    result: createEvaluationRankingViewModel,
                    error: 'requestForApplicationId not defined'
                }
            };
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Ranking created',
                result: await this.evaluationRankingService.createEvaluationRanking(createEvaluationRankingViewModel)
            }
        };
    }

    
    async searchEvaluationRanking(searchEvaluationRankingViewModel: SearchEvaluationRankingViewModel) {
        if (!searchEvaluationRankingViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Ranking not found: requestForApplicationId not defined',
                    result: searchEvaluationRankingViewModel,
                    error: 'requestForApplicationId not defined'
                }
            }
        }

        if (!searchEvaluationRankingViewModel.stageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Evaluation Ranking not found: stageId not defined',
                    result: searchEvaluationRankingViewModel,
                    error: 'stageId not defined'
                }
            };
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation ranking',
                result: (await this.evaluationRankingService.searchEvaluationRanking(searchEvaluationRankingViewModel))
            }
        }
    }
}
