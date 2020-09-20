import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks/tasks.service';
import { ApplicationManagementModule } from 'src/application-management/application-management.module';
import { MailingManagementModule } from 'src/mailing-management/mailing-management.module';
import { ConfigModule } from '@nestjs/config';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApplicationManagementModule,
    MailingManagementModule,
    UserManagementModule
  ],
  providers: [TasksService]
})
export class TaskSchedulingModule {}
