import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationModel } from 'src/notification-management/models/notification.model';
import { NotificationViewModel } from 'src/notification-management/models/notification-view.model';

@Injectable()
export class NotificationService {

    constructor(@InjectModel('Notification') private notificationModel: Model<NotificationModel>) {}

    async create(notificationViewModel: NotificationViewModel) {
        const newNotification = new this.notificationModel(notificationViewModel);
        return await newNotification.save();
    }

    async updateNotification(notification: NotificationModel) {
        await this.notificationModel.update({_id: notification._id}, notification);
    }

    async getNotificationsByUserId(userId: string) {
        return await this.notificationModel.find({ userId: userId });
    }

    async getNotificationsById(notificationId: string) {
        return await this.notificationModel.findById(notificationId);
    }
}
