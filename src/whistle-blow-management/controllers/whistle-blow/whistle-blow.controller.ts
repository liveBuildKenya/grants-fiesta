import { Controller, UseInterceptors, Post, UploadedFile, Body, Req, Res, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { UploadWhistleBlowAttachmentViewModel } from 'src/whistle-blow-management/models/upload-whistle-blow-attachment-view.model';
import { WhistleBlowManagementService } from 'src/whistle-blow-management/services/whistle-blow-management/whistle-blow-management.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Whistleblow Management')
@Controller('whistle-blow')
export class WhistleBlowController {

    constructor(private whistleBlowServiceManagement: WhistleBlowManagementService) {}

    @UseInterceptors(FileInterceptor('attachment'))
    @Post()
    async uploadRequestForApplicationAttachment(@UploadedFile() uploadedFile, @Body() uploadWhistleBlowingAttachmentViewModel: UploadWhistleBlowAttachmentViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.whistleBlowServiceManagement.createWhistleBlow(uploadedFile?.id, uploadWhistleBlowingAttachmentViewModel);
        res.status(result.status).json(result.body);
    }

    @Get('all')
    async getAllBlownWhistles(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.whistleBlowServiceManagement.getAllBlownWhistles();
        res.status(result.status).json(result.body);
    }
}
