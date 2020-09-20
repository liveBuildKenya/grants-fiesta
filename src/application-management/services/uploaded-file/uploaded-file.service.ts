import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedFileModel } from 'src/application-management/models/application/uploaded-file.model';
import { CreateUploadedFileModel } from 'src/application-management/models/application/create-uploaded-file-view.model';

@Injectable()
export class UploadedFileService {
    constructor(@InjectModel('UploadedFile') private uploadedFileModel: Model<UploadedFileModel>){}

    async createUploadedFile(createUploadedFileModel: CreateUploadedFileModel) {
        return new this.uploadedFileModel(createUploadedFileModel);   
    }
}
