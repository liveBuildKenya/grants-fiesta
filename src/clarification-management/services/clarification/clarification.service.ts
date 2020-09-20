import { Injectable, HttpStatus } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ReplyToRFCModel, ClarificationModel } from 'src/clarification-management/models/clarification.model';



import { CreateClarificationModel } from 'src/clarification-management/models/create-clarification.model';
import { GetClarificationByModuleModel, EditClarificationByModuleModel } from 'src/clarification-management/models/get-clarification.model';
import { GetClarificationByUserModel } from 'src/clarification-management/models/get-clarification.model';

@Injectable()
export class ClarificationService {


    constructor(
        @InjectModel('Clarification') private clarificationModel: Model<ClarificationModel>
    ) { }

    async createClarification(createClarificationModel: CreateClarificationModel): Promise<ClarificationModel> {
        createClarificationModel.dateCreated = new Date(Date.now());
        const newClarification = new this.clarificationModel(createClarificationModel);

        return await newClarification.save();
    }
    async getClarificationByUser(_requestedBy: GetClarificationByUserModel) {
        const requestedBy = _requestedBy._id;
        return await this.clarificationModel.find({
                    requestedBy
                })
    }

    async updateRFC(editClarificationByModule: EditClarificationByModuleModel){
        return await this.clarificationModel.findByIdAndUpdate(editClarificationByModule.moduleItemId, editClarificationByModule.update);

    }

    async getCLarificationByModel(getClarificationByModuleModel: GetClarificationByModuleModel) {
        return await this.clarificationModel.find({
                    moduleItemId: getClarificationByModuleModel.moduleItemId,
                    moduleType: getClarificationByModuleModel.moduleType
                })
    }

    async getAllClarifications() {
        return await this.clarificationModel.find().exec();
    }

    async addReplies(replyToRFC) {
        /**
         * recieve modelItemId and UserId
         * Query DB for rfc by moduleItemId
         * append reply:ClarificationReplyModel to replies array of rfc
        */

        // eslint-disable-next-line prefer-const
        let _ = await this.clarificationModel.findOne({ _id: replyToRFC.moduleItemId });

        _.replies.push({
            reply: replyToRFC.reply,
            isPublished: false,
            rfcId: replyToRFC.rfcId

        })
        _.dateUpdated = new Date(Date.now());
        const _updated = await _.save();
        return  _updated
    }

    async removeRepliesFromRFC(_moduleItemId) {
        /**
         * 
         * Remove replies array of specific rfc
         * find rfc by moduleid and delete its array of replies
         * 
         */
        // eslint-disable-next-line prefer-const
        let _ = await this.clarificationModel.findOne({ _id: _moduleItemId });
        _.replies.splice(0, _.replies.length)
        _.dateUpdated = new Date(Date.now());
        const _postDelete = await _.save();
        return  _postDelete
        
    }
    /**
     * DOES NOT UPDATE, REMOVES REPLY INSTEAD
     */
    async updateReplyToRFC(updateReplyToRFCModel){
        /**
         * 
         * fetch RFC by id, in some places referred to as moduleItemId
         * for each element of the replies array, find the one whose id matches the submitted one
         * update its reply to the one submitted
         hence request body = {
             "moduleItemId" = "",
             "replyId" = "",
             "replyUpdate" = ""
        } 
         */
        // eslint-disable-next-line prefer-const
        let _ = await this.clarificationModel.findOne({ _id: updateReplyToRFCModel.moduleItemId });
        
        _.replies.map(x =>{
            console.log(x);
            if(x._id == updateReplyToRFCModel.replyId){
                x.reply = updateReplyToRFCModel.reply;
            }
            else{
                console.log(`MIssing reply with the id ${updateReplyToRFCModel.replyId}`)
            }
            return x
        });
        _.dateUpdated = new Date(Date.now());
        console.log(_.replies);
        const _updated = await _.save();
        return  _updated

    }

    async publishRFC(publishRFCObject) {
        /**
         * recieve modelItemId
         * Query DB for rfc by moduleItemId
         * Update boolean in isPublishedRFC to true
         * Update rfc on DB
         */
        // eslint-disable-next-line prefer-const
        let _ = await this.clarificationModel.findOne({ _id: publishRFCObject.moduleItemId });
        
        _.isPublished = true;
        _.dateUpdated = new Date(Date.now());
        const _updated = await _.save();
        return _updated;
    }

    async publishRepliesToRFC(publishObjectToRFCObject) {
        /**
         * recieve modelItemId
         * Query DB for rfc by moduleItemId
         * Update boolean in replies array for specific response search by id isPublishedReply to true
         * Update rfc on DB
         */
        // eslint-disable-next-line prefer-const
        let _ = await this.clarificationModel.findOne({ _id:  publishObjectToRFCObject.moduleItemId });
        _.replies.map(x =>{
            console.log(x);
            if(x._id == publishObjectToRFCObject.replyId){
                x.isPublished = true;
            }
            else{
                console.log(`MIssing reply with the id ${publishObjectToRFCObject.replyId}`)
            }
            return x
        });
        _.dateUpdated = new Date(Date.now());
        console.log(_.replies);
        const _updated = await _.save();
        return  _updated;
            
    }

}
