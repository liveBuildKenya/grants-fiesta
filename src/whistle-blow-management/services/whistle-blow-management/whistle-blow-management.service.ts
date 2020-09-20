import { Injectable, HttpStatus } from '@nestjs/common';
import { UploadWhistleBlowAttachmentViewModel } from 'src/whistle-blow-management/models/upload-whistle-blow-attachment-view.model';
import { WhistleBlowService } from '../whistle-blow/whistle-blow.service';

@Injectable()
export class WhistleBlowManagementService {
    constructor(private whistleBlowService: WhistleBlowService) {}

    async createWhistleBlow(fileId: string, uploadWhistleBlowingAttachmentViewModel: UploadWhistleBlowAttachmentViewModel) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Received',
                result: (await this.whistleBlowService.createWhistleBlow({
                    title: uploadWhistleBlowingAttachmentViewModel.title,
                    message: uploadWhistleBlowingAttachmentViewModel.message,
                    email: uploadWhistleBlowingAttachmentViewModel.email,
                    fileId: fileId
                }))
            }
        }
    }

    async getAllBlownWhistles() {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'All blows whistles',
                result: (await this.whistleBlowService.getAllBlownWhistles())
            }
        }
    }
}
