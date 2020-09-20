import { Injectable, HttpStatus } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { UserService } from 'src/user-management/services/user/user.service';
import { NotificationViewModel } from 'src/notification-management/models/notification-view.model';
import { NotificationStatus } from 'src/notification-management/enums/notification-status.enum';

@Injectable()
export class NotificationManagementService {

    constructor(private notificationService: NotificationService,
        private userService: UserService) {}

    async createNotification(notificationViewModel: NotificationViewModel) {
        if (!notificationViewModel.userId) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    message: "could process that",
                    result: notificationViewModel,
                    error: "userId not defined"
                }
            }
        }

        const newNotification: any = {
            status: NotificationStatus.NOT_READ,
            message: notificationViewModel.message,
            userId: notificationViewModel.userId,
            dateCreated: Date.now()
        };

        await this.notificationService.create(newNotification);
    }

    async getUserNotifications(currentUser: any) {
        return {
            status: HttpStatus.OK,
            body: {
                message: "Users notifications",
                result: (await this.notificationService.getNotificationsByUserId(currentUser._id))
            }
        }
    }

    async setNotificationAsRead(currentUser, notificationId: string) {
        const notification = await this.notificationService.getNotificationsById(notificationId);
        notification.status = NotificationStatus.READ;

        await this.notificationService.updateNotification(notification);

        return {
            status: HttpStatus.OK,
            body: {
                message: "User notifications",
                result: (await this.notificationService.getNotificationsByUserId(currentUser._id))
            }
        }
    }
}
