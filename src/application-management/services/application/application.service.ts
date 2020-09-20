import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationModel } from 'src/application-management/models/application/application.model';
import { ApplicationSearchFilterViewModel } from 'src/application-management/models/application/application-search-filter-view.model';


@Injectable()
export class ApplicationService {
    
    constructor(@InjectModel('Application') private applicationModel: Model<ApplicationModel>) {}
    
    async createApplication(applicationModel: ApplicationModel): Promise<ApplicationModel> {
        const newApplication = new this.applicationModel(applicationModel);
        return await newApplication.save();
    }

    async getApplicationById(applicationId: string) {
        return await this.applicationModel.findById(applicationId).populate('user', 'email name organization country postalAddress');
    }

    async getApplicationsByIds(applicationIds: Array<string>) {
        let applications: Array<ApplicationModel> = [];

        for (const applicationId of applicationIds) {
            applications = [...applications, (await this.getApplicationById(applicationId))]
        }

        return applications;
    }
  

    async getApplicationByUserAndRFAID(userID: string, rfaID: string) {
        return await this.applicationModel.findOne({
            requestForApplication: rfaID,
            user: userID
        }).populate('user', 'email name organization country postalAddress');
    }

    async getApplicationsByRequestForApplicationId(requestForApplicationId: string) {
        return await this.applicationModel.find({
            requestForApplication: requestForApplicationId
        }).populate('user', 'email name organization country postalAddress');
    }

    async update(application){
        await this.applicationModel.updateOne({ _id: application._id }, application);
        return await this.getApplicationById(application._id);
    }

    async deleteApplication(applicationId: string) {
        return await this.applicationModel.deleteOne({_id: applicationId});
    }

    async getApplications() {
        return await this.applicationModel.find().populate('user', 'email name organization country postalAddress');
    }  
    
    async getSubmittedApplications() {
        return await this.applicationModel.find({submitted: true}).populate('user', 'email name organization country postalAddress');
    } 

    async getSubmittedApplicationsByFilter(applicationSearchFilter: ApplicationSearchFilterViewModel) {
        return await this.applicationModel.find({
            submitted: true,
            customProperties: applicationSearchFilter.customProperty,
            requestForApplication: applicationSearchFilter.requestForApplicationId
        })
        .populate('user', 'email name organization country postalAddress');
    }

    /**
     * @returns Array of ids of applications/submissions for a given rfa
     * @param rfaID 
     */
    async getApplicationsForAnRFA(rfaID: string): Promise<string[]> {
        return (await this.applicationModel.find({
            requestForApplication : rfaID
        }).select("_id")).map(x => x._id);
    } 

    async getUserApplications(userID: string) {
        return await this.applicationModel.find({
            user: userID
        })
        .populate('user', 'email name organization country postalAddress')
        .populate('requestForApplication');
    }

    async getGrantedApplications(requestForApplicationId: string) {
        return await this.applicationModel.find({
            requestForApplication: requestForApplicationId,
            granted: true
        });
    }
}
