import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApplicationRequestService } from 'src/application-management/services/application-request/application-request.service';
import { ApplicationTemplateService } from 'src/application-management/services/application-template/application-template.service';
import { find } from 'lodash';
import { ObjectId } from 'mongodb';
import { Period } from 'src/shared/models/period.enum';
import { ApplicationRequestModel } from 'src/application-management/models/application-request/application-request.model';
import { ApplicationTemplateModel } from 'src/application-management/models/application-template/application-template.model';
import { MailingService } from 'src/mailing-management/services/mailing/mailing.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user-management/services/user/user.service';
import { UserGroupService } from 'src/user-management/services/user-group/user-group.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private applicationRequestService: ApplicationRequestService,
        private applicationTemplateService: ApplicationTemplateService,
        private mailingService: MailingService,
        private configService: ConfigService,
        private userService: UserService,
        private userGroupService: UserGroupService) {}

    // @Cron(CronExpression.EVERY_5_SECONDS)
    // async changeRequestForApplicationStage() {

    //     const applicationRequests = await this.applicationRequestService.getApplicationRequests();
    //     applicationRequests.map(async (applicationRequest) => {
    //         const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(applicationRequest.applicationTemplateId[0]);
    //         if (applicationRequest.currentStage == null || applicationRequest.currentStage == undefined) {
    //             const firstTemplateStage = find(applicationTemplate.stages, {displayOrder: 0});
    //             applicationRequest.currentStage = firstTemplateStage._id;

    //             await this.applicationRequestService.updateApplicationRequest(applicationRequest);
    //         }
    //         else {
    //             await this.remindAdministratorToMoveApplicationToTheNextStage(applicationRequest, applicationTemplate);
    //         }
    //     });
    //     this.logger.debug('Check move request for application to the next stage');
    // }

    async remindAdministratorToMoveApplicationToTheNextStage(applicationRequest: ApplicationRequestModel, applicationTemplate: ApplicationTemplateModel) {
        const currentDate = new Date();
        const applicationRequestDeadlineDate = new Date(applicationRequest.deadline);
        let applicationRequestStageEndDate: Date;

        const currentApplicationRequestStage = find(applicationTemplate.stages, {_id: new ObjectId(`${applicationRequest.currentStage}`)});

        if (currentApplicationRequestStage.durationType == Period.DAYS) {
            applicationRequestStageEndDate = new Date((new Date(applicationRequest.deadline).setDate(applicationRequestDeadlineDate.getDate() + currentApplicationRequestStage.targetDuration)));
        }

        if (currentApplicationRequestStage.durationType == Period.MINUTES) {
            applicationRequestStageEndDate = new Date(applicationRequestDeadlineDate.getTime() + currentApplicationRequestStage.targetDuration * 60000);
        }
        
        if (currentDate.getTime() < applicationRequestStageEndDate.getTime()) {
            const nextDisplayOrder = currentApplicationRequestStage.displayOrder + 1;

            if (applicationTemplate.stages.length - 1 >= nextDisplayOrder) {
                const nextApplicationRequestStage = find(applicationTemplate.stages, {displayOrder: nextDisplayOrder});
                const administrativeUserIds = (await this.userGroupService.getGroupByName('GlobalAdministrator')).users;

                administrativeUserIds.map(async (administrativeUserId)=>{
                    const currentAdministrativeUser = await this.userService.getUserById(administrativeUserId);

                    await this.mailingService.sendMail({
                        from: this.configService.get<string>('DEFAULT_USER'),
                        to: [currentAdministrativeUser.email],
                        subject: `${applicationRequest.title}`,
                        text: ``,
                        html: `<p>Dear ${currentAdministrativeUser.name},</p>
                        <p>The deadline of the current stage; ${currentApplicationRequestStage.name} for the call for application “${applicationRequest.title}” in the frame of ${applicationRequest.referenceNumber} has elapsed, kindly move the application to the stage ${nextApplicationRequestStage.name}</p>
                        <p>If you have any questions, please send an email to gms@eoai-africa.org</p>
                        <p>Best Regards,<br/>EOA Initiative Project Management Unit <br/>Biovision Africa Trust</p>
                        `
                    });
                });
            }
        }
    }

    // @Cron(CronExpression.EVERY_5_SECONDS)
    // async changeRequestForApplicationStage() {

    //     const applicationRequests = await this.applicationRequestService.getApplicationRequests();
    //     applicationRequests.map(async (applicationRequest) => {
    //         const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(applicationRequest.applicationTemplateId[0]);
            
    //         if (applicationRequest.currentStage == null || applicationRequest.currentStage == undefined) {
    //             const firstTemplateStage = find(applicationTemplate.stages, {displayOrder: 0});
    //             applicationRequest.currentStage = firstTemplateStage._id;

    //             await this.applicationRequestService.updateApplicationRequest(applicationRequest);
    //         }
    //         else {
    //             const currentApplicationRequestStage = find(applicationTemplate.stages, {_id: new ObjectId(`${applicationRequest.currentStage}`)});

    //             await this.updateRequestForApplicationStage(currentApplicationRequestStage, applicationRequest, applicationTemplate);
    //         }
    //     });
    //     this.logger.debug('Check move request for application to the next stage');
    // }

    // async updateRequestForApplicationStage(currentApplicationRequestStage: ApplicationStageTemplateModel, applicationRequest: ApplicationRequestModel, applicationTemplate: ApplicationTemplateModel){
    //     const currentDate = new Date();
    //     const applicationRequestDeadlineDate = new Date(applicationRequest.deadline);
    //     let applicationRequestStageEndDate: Date;

    //     if (currentApplicationRequestStage.durationType == Period.DAYS) {
    //         applicationRequestStageEndDate = new Date((new Date(applicationRequest.deadline).setDate(applicationRequestDeadlineDate.getDate() + currentApplicationRequestStage.targetDuration)));
    //     }

    //     if (currentApplicationRequestStage.durationType == Period.MINUTES) {
    //         applicationRequestStageEndDate = new Date(applicationRequestDeadlineDate.getTime() + currentApplicationRequestStage.targetDuration * 60000);
    //     }
        
    //     if (currentDate.getTime() > applicationRequestStageEndDate.getTime()) {
    //         const nextDisplayOrder = currentApplicationRequestStage.displayOrder + 1;

    //         if (applicationTemplate.stages.length - 1 >= nextDisplayOrder) {
    //             const nextApplicationRequestStage = find(applicationTemplate.stages, {displayOrder: nextDisplayOrder});
    //             applicationRequest.currentStage = nextApplicationRequestStage._id;

    //             await this.applicationRequestService.updateApplicationRequest(applicationRequest);

    //             currentApplicationRequestStage = find(applicationTemplate.stages, {_id: new ObjectId(`${applicationRequest.currentStage}`)});
    //         }
    //     }
    // }
}
