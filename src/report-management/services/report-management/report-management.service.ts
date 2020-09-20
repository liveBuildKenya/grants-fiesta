import { Injectable, HttpStatus } from '@nestjs/common';
import { ReportAttachmentService } from '../report-attachment/report-attachment.service';
import { CreateReportAttachmentViewModel } from 'src/report-management/models/report-attachment/create-report-attachment-view.model';
import { SearchReportAttachmentViewModel } from 'src/report-management/models/report-attachment/search-report-attachment-view.model';

@Injectable()
export class ReportManagementService {
    constructor(private reportAttachmentService: ReportAttachmentService) {}

    async createReportAttachment(createReportAttachementViewModel: CreateReportAttachmentViewModel) {
        if (!createReportAttachementViewModel.fileId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Report attachment not created: fileId not defined',
                    result: createReportAttachementViewModel,
                    error: "fileId not defined"
                }
            }
        }

        if (!createReportAttachementViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Report attachment not created: requestForApplicationId not defined',
                    result: createReportAttachementViewModel,
                    error: "requestForApplicationId not defined"
                }
            }
        }

        if (!createReportAttachementViewModel.stageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Report attachment not created: stageId not defined',
                    result: createReportAttachementViewModel,
                    error: "stageId not defined"
                }
            }
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Report attachment created',
                result: (await this.reportAttachmentService.createReportAttachment(createReportAttachementViewModel))
            }
        }
    }

    async searchReportAttachment(searchReportAttachmentViewModel: SearchReportAttachmentViewModel) {
        if (!searchReportAttachmentViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Report attachment not found: requestForApplicationId not defined',
                    result: searchReportAttachmentViewModel,
                    error: "requestForApplicationId not defined"
                }
            }
        }

        if (!searchReportAttachmentViewModel.stageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Report attachment not found: stageId not defined',
                    result: searchReportAttachmentViewModel,
                    error: "stageId not defined"
                }
            }
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Report attachment',
                result: (await this.reportAttachmentService.searchReportAttachment(searchReportAttachmentViewModel))
            }
        }
    }
}
