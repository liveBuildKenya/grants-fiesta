import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileViewModel } from 'src/application-management/view-models/file-view-model';

@Injectable()
export class FileService {
    constructor(@InjectModel('File') private fileModel: Model<FileViewModel>) {}

    async create(fileViewModel: FileViewModel) {

        console.log(fileViewModel);
        const newFile = new this.fileModel(fileViewModel);
        return await newFile.save();
    }

    async getFileById(id: string) {
        return await this.fileModel.findById(id);
    }
}
