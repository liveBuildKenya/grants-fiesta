import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestForApplicationFormsResponseModel } from 'src/application-management/models/application/request-for-application-forms-response.model';
import { FormResponseViewModel } from 'src/application-management/models/application/form-response-view.model';
import { ApplicationModel } from 'src/application-management/models/application/application.model';

@Injectable()
export class RequestForApplicationFormResponseService {

    constructor(@InjectModel('RequestForApplicationFormResponse') private requestForApplicationResponseModel: Model<RequestForApplicationFormsResponseModel>){}

    async createRequestForApplicationFormResponse(formResponseViewModel: FormResponseViewModel) {
        formResponseViewModel.dateCreated = new Date(Date.now());
        return await new this.requestForApplicationResponseModel(formResponseViewModel);
    }

    checkFormResponseExists(application: ApplicationModel, formResponseViewModel: FormResponseViewModel) {
        let exists = false;

        for (const applicationFormResponse of application.requestForApplicationFormsResponse) {
            if (applicationFormResponse.requestForApplicationFormId == formResponseViewModel.requestForApplicationFormId) {
                exists = true;
                break;
            }
        }

        return exists;
    }
}
