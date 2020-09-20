import { Injectable, HttpStatus } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class FileManagementService {

    constructor(private fileService: FileService){}

    async deleteFile(currentUser, fileId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'File Deleted',
                result: (await this.fileService.deleteFile(fileId))
            }
        }
    }

    async getFileDetails(currentUser, fileId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'File details',
                result: (await this.fileService.findInfo(fileId))
            }
        }
    }    
}
