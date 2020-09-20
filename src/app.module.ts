import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ApplicationManagementModule } from './application-management/application-management.module';
import { NotificationManagementModule } from './notification-management/notification-management.module';
import { CommentManagementModule } from './comment-management/comment-management.module';
import { EventManagementModule } from './event-management/event-management.module';
import { ClarificationManagementModule } from './clarification-management/clarification-management.module';
import { MailingManagementModule } from './mailing-management/mailing-management.module';
import { UtilModule } from './util/util.module';
import { CommonModule } from './common/common.module';
import { WhistleBlowManagementModule } from './whistle-blow-management/whistle-blow-management.module';
import { EvaluationManagementModule } from './evaluation-management/evaluation-management.module';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { ReportManagementModule } from './report-management/report-management.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DEV_DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}),
    TaskSchedulingModule,
    UserManagementModule,
    ApplicationManagementModule,
    NotificationManagementModule,
    CommentManagementModule,
    EventManagementModule,
    ClarificationManagementModule,
    MailingManagementModule,
    ScheduleModule.forRoot(),
    UtilModule,
    CommonModule,
    WhistleBlowManagementModule,
    EvaluationManagementModule,
    ReportManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
