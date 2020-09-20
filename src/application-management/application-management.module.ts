import { Module } from '@nestjs/common';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { ApplicationController } from './controllers/application/application.controller';
import { ApplicationManagementService } from './services/application-management/application-management.service';
import { ApplicationService } from './services/application/application.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from 'src/application-management/models/application/application.model';
import { JwtModule } from '@nestjs/jwt';
import { FileSchema } from './models/file';
import { FileService } from './services/file/file.service';
import { CommentService } from './services/comment/comment.service';
import { PerformanceIndicatorSchema } from './models/performanceIndicators';
import { NotificationManagementModule } from 'src/notification-management/notification-management.module';
import { ApplicationTemplateController } from './controllers/application-template/application-template.controller';
import { ApplicationTemplateService } from './services/application-template/application-template.service';
import { ApplicationTemplateSchema } from './models/application-template/application-template.model';
import { ApplicationStageService } from './services/application-stage/application-stage.service';
import { ApplicationStageTemplateSchema } from './models/application-template/application-stage-template.model';
import { EvaluationCriteriaTemplateSchema } from './models/application-template/evaluation-criteria-template.model';
import { EvaluationCriteriaService } from './services/evaluation-criteria/evaluation-criteria.service';
import { CriteriaQuestionTemplateSchema } from './models/application-template/criteria-question-template.model';
import { CriteriaQuestionService } from './services/criteria-question/criteria-question.service';
import { ApplicationRequestSchema } from './models/application-request/application-request.model';
import { ApplicationRequestService } from './services/application-request/application-request.service';
import { ActionPermissionService } from './services/action-permission/action-permission.service';
import { ActionPermissionTemplateSchema } from './models/application-template/action-permission-template.model';
import { ApplicationFormTemplateSchema } from './models/application-template/application-form.model';
import { ApplicationFormTemplateService } from './services/application-form-template/application-form-template.service';
import { UploadedFileSchema } from './models/application/uploaded-file.model';
import { UploadedFileService } from './services/uploaded-file/uploaded-file.service';
import { FileManagementModule } from 'src/file-management/file-management.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/file-management/services/grid-fs-multer-config/grid-fs-multer-config.service';
import { TemplateCustomPropertiesService } from './services/template-custom-properties/template-custom-properties.service';
import { TemplateCustomPropertySchema } from './models/application-template/custom-properties-template.model';
import { RequestForApplicationFormResponseService } from './services/request-for-application-form-response/request-for-application-form-response.service';
import { RequestForApplicationFormsResponseSchema } from './models/application/request-for-application-forms-response.model';
import { MailingManagementModule } from 'src/mailing-management/mailing-management.module';
import { EvaluationSubCriteriaService } from './services/evaluation-sub-criteria/evaluation-sub-criteria.service';
import { EvaluationSubCriteriaTemplateSchema } from './models/application-template/evaluation-sub-criteria-template.model';
import { ReportingTemplateSchema } from './models/application-template/application-reporting-template.model';
import { ReportingTemplateService } from './services/reporting-template/reporting-template.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileManagementModule,
    MongooseModule.forFeature([
      { name: 'ApplicationTemplate', schema: ApplicationTemplateSchema},
      { name: 'ApplicationFormTemplate', schema: ApplicationFormTemplateSchema },
      { name: 'ApplicationStage', schema: ApplicationStageTemplateSchema },
      { name: 'EvaluationCriteria', schema: EvaluationCriteriaTemplateSchema },
      { name: 'EvaluationSubCriteria', schema: EvaluationSubCriteriaTemplateSchema},
      { name: 'CriteriaQuestion', schema: CriteriaQuestionTemplateSchema },
      { name: 'ActionPermission', schema: ActionPermissionTemplateSchema },
      { name: 'Application', schema: ApplicationSchema },
      { name: 'RequestForApplicationFormResponse', schema: RequestForApplicationFormsResponseSchema },
      { name: 'UploadedFile', schema: UploadedFileSchema },
      { name: 'TemplateCustomProperty', schema: TemplateCustomPropertySchema },
      { name: 'File', schema: FileSchema },
      { name: 'PerformanceIndicator', schema: PerformanceIndicatorSchema },
      { name: 'ApplicationRequest', schema: ApplicationRequestSchema },
      { name: 'ReportingTemplate', schema: ReportingTemplateSchema}
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
    NotificationManagementModule,
    MailingManagementModule
  ],
  controllers: [
    ApplicationController, 
    ApplicationTemplateController
  ],
  providers: [
    ApplicationManagementService, 
    ApplicationService, 
    FileService, 
    CommentService, 
    ApplicationTemplateService, 
    ApplicationStageService, 
    EvaluationCriteriaService, 
    CriteriaQuestionService, 
    ApplicationRequestService,
    ActionPermissionService,
    ApplicationFormTemplateService,
    UploadedFileService,
    TemplateCustomPropertiesService,
    RequestForApplicationFormResponseService,
    EvaluationSubCriteriaService,
    ReportingTemplateService
  ],
  exports: [
    ApplicationTemplateService,
    ApplicationRequestService,
    ApplicationService,
    UploadedFileService
  ]
})
export class ApplicationManagementModule {
}
