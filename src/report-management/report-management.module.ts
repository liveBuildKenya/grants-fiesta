import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { ReportAttachmentSchema } from './models/report-attachment/report-attachment.model';
import { ReportAttachmentService } from './services/report-attachment/report-attachment.service';
import { ReportManagementService } from './services/report-management/report-management.service';
import { ReportManagementController } from './controller/report-management/report-management.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/file-management/services/grid-fs-multer-config/grid-fs-multer-config.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          { name: 'ReportAttachment', schema: ReportAttachmentSchema}
        ]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
        MulterModule.registerAsync({
          useClass: GridFsMulterConfigService,
          imports: [ConfigModule.forRoot()]
        }),
        UserManagementModule,
    ],
    providers: [
        ReportAttachmentService,
        ReportManagementService
    ],
    controllers: [ReportManagementController]
})
export class ReportManagementModule {}
