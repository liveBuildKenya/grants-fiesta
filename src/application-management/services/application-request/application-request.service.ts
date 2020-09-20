import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationRequestModel } from 'src/application-management/models/application-request/application-request.model';
import { Model } from 'mongoose';
import { CreateApplicationRequestViewModel } from 'src/application-management/models/application-request/create-application-request-view.model';

@Injectable()
export class ApplicationRequestService {

    constructor(@InjectModel('ApplicationRequest') private applicationRequestModel: Model<ApplicationRequestModel>) {}

    async getUserApplicationRequestsWithExpressedInterest(userID: string, rfaID: string): Promise<ApplicationRequestModel> {
        return await this.applicationRequestModel.findOne({
            interestExpressed: userID,
            _id: rfaID 
        });
    }

    async isUserExpressedInterestOnApplication(userID: string, rfaID: string): Promise<boolean> {
        return (await this.applicationRequestModel.findOne({
            interestExpressed: userID,
            _id: rfaID 
        })) ? true : false;
    }

    async getApplicationRequests(published?: boolean) {
        if (published) {
            return await this.applicationRequestModel.find({published: true}).populate('interestExpressed', 'email name organization country postalAddress');
        }
        return await this.applicationRequestModel.find().populate('interestExpressed', 'email name organization country postalAddress');
    }

    async getRequestForApplicationById(applicationRequestId: string) {
        return await this.applicationRequestModel.findById(applicationRequestId);
    }   

    /**
     * @returns IDs of RFAs that are created based on a given template
     * @param rfaTemplateID RFA Template ID
     */
    async getRFAsForATemplateByID(rfaTemplateID: string): Promise<string[]> {
        return (await this.applicationRequestModel.find({
            applicationTemplateId: rfaTemplateID
        }).select("_id")).map(x => x._id);
    }

    async createApplicationRequest(createApplicationRequestViewModel: CreateApplicationRequestViewModel) {
        createApplicationRequestViewModel.dateCreated = new Date(Date.now());
        createApplicationRequestViewModel.published = false;
        return await this.applicationRequestModel.create(createApplicationRequestViewModel);
    }

    async deleteApplicationRequest(requestForApplicationId: string) {
        return await this.applicationRequestModel.deleteOne({_id: requestForApplicationId});
    }

    async getApplicationRequestByReferenceNumber(referenceNumber: string): Promise<ApplicationRequestModel> {
        // let applicationRequest: any = 
        // applicationRequest = applicationRequest.map((value) => {
        //     return {
        //         _id: value._id,
        //         applicationTemplateId: value.applicationTemplateId,
        //         referenceNumber: value.referenceNumber,
        //         title: value.title,
        //         shortDescription: value.shortDescription,
        //         longDescription: value.longDescription,
        //         keyInformation: value.keyInformation
        //     };
        // });

        return await this.applicationRequestModel.findOne({referenceNumber: referenceNumber});
    }

    async updateApplicationRequest(applicationRequest: any) {
        await this.applicationRequestModel.updateOne({_id: applicationRequest._id}, applicationRequest);
        return await this.getRequestForApplicationById(applicationRequest._id);
    }
}
