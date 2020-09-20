import { Controller, UseGuards, Get, Req, Res, Put, Param, Body, Post } from '@nestjs/common';
import { NotificationManagementService } from 'src/notification-management/services/notification-management/notification-management.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { Request, Response } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification Management')
@Controller()
export class NotificationManagementController {
    
    constructor(private notificationManagementService: NotificationManagementService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get('notifications')
    async getUserNotifications(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.notificationManagementService.getUserNotifications(req.user);
        res.status(result.status).json(result.body);
    }

    // @UseGuards(JwtAuthenticationGuard)
    // @Post('notification')
    // async createUserNotification(@Param('id') notificationId: string, notificationViewModel: NotificationViewModel, @Req() req: Request, @Res() res: Response) {
    //     const result: ResultViewModel<any> = await this.notificationManagementService.createNotification(notificationViewModel);
    //     res.status(result.status).json(result.body);
    // }

    @UseGuards(JwtAuthenticationGuard)
    @Put('notification/:id')
    async setNotificationAsRead(@Param('id') notificationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.notificationManagementService.setNotificationAsRead(req.user, notificationId);
        res.status(result.status).json(result.body);
    }
}
