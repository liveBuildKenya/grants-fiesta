import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReportAttachementModel } from 'src/report-management/models/report-attachment/report-attachment.model';
import { Model } from 'mongoose';
import { CreateReportAttachmentViewModel } from 'src/report-management/models/report-attachment/create-report-attachment-view.model';
import { SearchReportAttachmentViewModel } from 'src/report-management/models/report-attachment/search-report-attachment-view.model';

@Injectable()
export class ReportAttachmentService {
    constructor(@InjectModel('ReportAttachment') private reportAttachmentModel: Model<ReportAttachementModel>) {}

    async createReportAttachment(createReportAttachmentViewModel: CreateReportAttachmentViewModel) {
        const newReportAttachment = await new this.reportAttachmentModel(createReportAttachmentViewModel);
        return newReportAttachment.save();
    }

    async searchReportAttachment(searchReportAttachmentViewModel: SearchReportAttachmentViewModel) {
        return await this.reportAttachmentModel.find({
            requestForApplicationId: searchReportAttachmentViewModel.requestForApplicationId,
            stageId: searchReportAttachmentViewModel.stageId
        });
    }
}
