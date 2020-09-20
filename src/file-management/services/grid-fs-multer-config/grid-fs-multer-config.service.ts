import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {

    gridFsStorage: GridFsStorage;

    constructor(private configService: ConfigService) {
        this.gridFsStorage = new GridFsStorage({
            url: this.configService.get<string>('DEV_DATABASE'),
            file: (req, file) => {
                return new Promise((resolve) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}
