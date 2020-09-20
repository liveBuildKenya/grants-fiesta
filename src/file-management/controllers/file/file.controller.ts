import { Controller, Res, UseGuards, Req, Get, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { FileService } from 'src/file-management/services/file/file.service';
import { FileManagementService } from 'src/file-management/services/file-management/file-management.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File Management')
@Controller()
export class FileController {

    constructor(private fileManagementService: FileManagementService,
                private fileService: FileService) {}


    
    @UseGuards(JwtAuthenticationGuard)
    @Delete('file/:id')
    async deleteFile(@Param('id') fileId, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.fileManagementService.deleteFile(req.user, fileId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('file/details/:id')
    async getFileDetails(@Param('id') fileId, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.fileManagementService.getFileDetails(req.user, fileId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('file/:id')
    async getFile(@Param('id') fileId, @Req() req: Request, @Res() res: Response) {
        const file = await this.fileService.findInfo(fileId)
        const filestream = await this.fileService.readStream(fileId)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res);
    }
}
