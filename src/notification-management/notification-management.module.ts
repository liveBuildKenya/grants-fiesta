import { Module } from '@nestjs/common';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { NotificationService } from './services/notification/notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './models/notification.model';
import { NotificationManagementService } from './services/notification-management/notification-management.service';
import { NotificationManagementController } from './controllers/notification-management/notification-management.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
        UserManagementModule],
    providers: [NotificationService, NotificationManagementService],
    controllers: [NotificationManagementController],
    exports: [NotificationManagementService]
})
export class NotificationManagementModule {}
