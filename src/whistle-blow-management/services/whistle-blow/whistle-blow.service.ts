import { Injectable } from '@nestjs/common';
import { UploadWhistleBlowAttachmentViewModel } from 'src/whistle-blow-management/models/upload-whistle-blow-attachment-view.model';
import { InjectModel } from '@nestjs/mongoose';
import { WhistleBlowModel } from 'src/whistle-blow-management/models/whistle-blow.model';
import { Model } from 'mongoose';

@Injectable()
export class WhistleBlowService {

    constructor(@InjectModel('WhistleBlow') private whistleBlowModel: Model<WhistleBlowModel>){}

    async createWhistleBlow(uploadWhistleBlowingAttachmentViewModel: UploadWhistleBlowAttachmentViewModel) {
        const newWhistleBlow = new this.whistleBlowModel(uploadWhistleBlowingAttachmentViewModel);

        return await newWhistleBlow.save();
    }

    async getAllBlownWhistles() {
        return await this.whistleBlowModel.find();
    }
}
