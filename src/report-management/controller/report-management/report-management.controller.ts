import { Controller, UseGuards, Post, Body, UseInterceptors, UploadedFile, Req, Res } from '@nestjs/common';
import { ReportManagementService } from 'src/report-management/services/report-management/report-management.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { CreateReportAttachmentViewModel } from 'src/report-management/models/report-attachment/create-report-attachment-view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import {Request, Response} from 'express';
import { SearchReportAttachmentViewModel } from 'src/report-management/models/report-attachment/search-report-attachment-view.model';

@Controller('report-management')
export class ReportManagementController {
    constructor(private reportManagementService: ReportManagementService) {}

    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('report/attachment')
    async createReportAttachment(@UploadedFile() uploadedFile, @Body() createReportAttachmentViewModel: CreateReportAttachmentViewModel, @Req() req: Request, @Res() res: Response) {

        const result: ResultViewModel<any> = await this.reportManagementService.createReportAttachment({
            fileId: uploadedFile.id,
            requestForApplicationId: createReportAttachmentViewModel.requestForApplicationId,
            stageId: createReportAttachmentViewModel.stageId,
            dateCreated: new Date(Date.now())
        });
        
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('search/report/attachments')
    async searchReportAttachment(@Body() searchReportAttachmentViewModel: SearchReportAttachmentViewModel, @Req() req: Request, @Res() res: Response) {

        const result: ResultViewModel<any> = await this.reportManagementService.searchReportAttachment(searchReportAttachmentViewModel);
        res.status(result.status).json(result.body);
    }
}
