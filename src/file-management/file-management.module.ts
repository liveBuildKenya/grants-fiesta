import { Module } from '@nestjs/common';
import { GridFsMulterConfigService } from './services/grid-fs-multer-config/grid-fs-multer-config.service';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './services/file/file.service';
import { FileController } from './controllers/file/file.controller';
import { FileManagementService } from './services/file-management/file-management.service';

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    providers: [GridFsMulterConfigService, FileService, FileManagementService],
    controllers: [FileController],
    exports: [GridFsMulterConfigService, FileService, FileManagementService]
})
export class FileManagementModule {}
