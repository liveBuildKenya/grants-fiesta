import { Module } from '@nestjs/common';
import { FileManagementModule } from 'src/file-management/file-management.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/file-management/services/grid-fs-multer-config/grid-fs-multer-config.service';
import { ConfigModule } from '@nestjs/config';
import { WhistleBlowController } from './controllers/whistle-blow/whistle-blow.controller';
import { WhistleBlowService } from './services/whistle-blow/whistle-blow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WhistleBlowSchema } from './models/whistle-blow.model';
import { WhistleBlowManagementService } from './services/whistle-blow-management/whistle-blow-management.service';

@Module({
    imports: [
        FileManagementModule,
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
            imports: [ConfigModule.forRoot()]
        }),
        MongooseModule.forFeature([
            { name: 'WhistleBlow', schema: WhistleBlowSchema }
        ])
    ],
    controllers: [WhistleBlowController],
    providers: [WhistleBlowService, WhistleBlowManagementService]
})
export class WhistleBlowManagementModule {}
