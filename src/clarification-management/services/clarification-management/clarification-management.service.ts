import { Injectable, HttpStatus } from '@nestjs/common';
import { ClarificationService } from '../clarification/clarification.service';
import { CreateClarificationModel } from 'src/clarification-management/models/create-clarification.model'
import { GetClarificationByModuleModel, EditClarificationByModuleModel } from 'src/clarification-management/models/get-clarification.model';
import { ClarificationModuleTypes } from 'src/clarification-management/models/clarification-module-set';

@Injectable()
export class ClarificationManagementService {


    constructor(private clarificationService: ClarificationService) { }

    async createClarification(currentUser, createClarificationModel: CreateClarificationModel) {
        if (!createClarificationModel.title) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Clarification not added: title not defined',
                    result: createClarificationModel,
                    error: 'title not defined'
                }
            };
        }

        if (!createClarificationModel.description) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Clarification not added: description not defined',
                    result: createClarificationModel,
                    error: 'description not defined'
                }
            };
        }

        if (!createClarificationModel.moduleType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Clarification not added: moduleType not defined',
                    result: createClarificationModel,
                    error: 'moduleType not defined'
                }
            };

        }
        createClarificationModel.requestedBy = currentUser._id;
        createClarificationModel.moduleType = ClarificationModuleTypes.RFA;
        createClarificationModel.isPublishedRFC = false;
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for clarification added',
                result: (await this.clarificationService.createClarification(createClarificationModel))
            }
        }
    }
    async getClarificationByUser(currentUser) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Get Clarifications by user Id',
                result: (await this.clarificationService.getClarificationByUser(currentUser))
            }
        }
    }

    async getCLarificationByModel(getCLarificationByModuleModel: GetClarificationByModuleModel) {


        /**
         * check that request params moduleType & moduleId have been passed
         * if not deny request
         * if so proceed to process request by calling the appropriate clarification service method 
         * 
         * UNNECESSARY
         * */

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Clarifications',
                result: (await this.clarificationService.getCLarificationByModel(getCLarificationByModuleModel))
            }
        }


    }

    async updateClarification( editClarificationByModule: EditClarificationByModuleModel){

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Clarifications Updated',
                result: (await this.clarificationService.updateRFC(editClarificationByModule))
            }
        }
    }

    async getAllClarifications(){
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Get Clarifications',
                result: (await this.clarificationService.getAllClarifications())
            }
        }
    }

    async addReplyToRFC(currentUser, replyToRFC){
        replyToRFC.repliedBy = currentUser._id;
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for clarification added',
                result: (await this.clarificationService.addReplies(replyToRFC))
            }
        }
    }

    async deleteRepliesToRFC(moduleItemId){
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Replies to Request for clarification deleted',
                result: (await this.clarificationService.removeRepliesFromRFC(moduleItemId))
            }
        }
    }

    async updateReplyToRFC(updateReplyToRFCObject){
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for clarification updated',
                result: (await this.clarificationService.updateReplyToRFC(updateReplyToRFCObject))
            }
        }
    }

    async publishRepliesToRFC(publishRepliesToRFCObject){
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Reply To RFC Published',
                result: (await this.clarificationService.publishRepliesToRFC(publishRepliesToRFCObject))
            }
        }   
    }
    
    async publishRFC(publishRFCObject){
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for clarification added',
                result: (await this.clarificationService.publishRFC(publishRFCObject))
            }
        }   
    }
}

/**
 * 
 *  specify return types for these functions
    specify type/format of parametes
 * 
 */


