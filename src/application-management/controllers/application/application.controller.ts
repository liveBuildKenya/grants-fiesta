import { Controller, Post, UseGuards, Req, Res, Body, UseInterceptors, UploadedFile, Get, Param, Put, Delete } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { ApplicationManagementService } from 'src/application-management/services/application-management/application-management.service';
import { Response, Request } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/application-management/services/file/file.service';
import { CreateApplicationRequestViewModel } from 'src/application-management/models/application-request/create-application-request-view.model';
import { UpdateApplicationRequestViewModel } from 'src/application-management/models/application-request/update-application-request-view.model';
import { ApplicationRequestInterestViewModel } from 'src/application-management/models/application-request/express-application-request-interest-view.model';
import { SubmitApplicationViewModel } from 'src/application-management/models/application/submit-application-view.model';
import { UploadApplicationFileViewModel } from 'src/file-management/models/upload-application-file-view.model';
import { FormResponseViewModel } from 'src/application-management/models/application/form-response-view.model';
import { UserModel } from 'src/user-management/models/user.model';
import { UploadRequestForApplicationViewModel } from 'src/application-management/models/application-request/upload-request-for-application-view.model';
import { ApplicationModel } from 'src/application-management/models/application/application.model';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { ApplicationManagementPermissions } from 'src/application-management/security/application-management-permissions.model';
import { DeleteRequestForApplicationAttachmentViewModel } from 'src/application-management/models/application-request/delete-request-for-application-attachment-view.model';
import { DeleteApplicationUploadViewModel } from 'src/application-management/models/application/delete-application-upload-view.model';
import { ApplicationSearchFilterViewModel } from 'src/application-management/models/application/application-search-filter-view.model';
import { ApiTags } from '@nestjs/swagger';
import { MoveApplicationToNextStage } from 'src/application-management/models/application/move-application-to-next-stage-view.model';
import { AwardApplicationsGrantViewModel } from 'src/application-management/models/application/award-applications-grant-view.model';
import { ApproveApplicationsGrantViewModel } from 'src/application-management/models/application/approve-applications-grant-view.model';

@ApiTags('Application Management')
@Controller()
export class ApplicationController {
    constructor(private applicationManagementService: ApplicationManagementService, private fileService: FileService) {}

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATION)
    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication')
    async createRequestForApplication(@Body() createApplicationRequestViewModel: CreateApplicationRequestViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createRequestForApplication(req.user, createApplicationRequestViewModel);
        res.status(result.status).json(result.body);
    }


    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATION)
    @UseGuards(JwtAuthenticationGuard)
    @Put('requestForApplication/:id')
    async updateRequestForApplication(@Param('id') requestForApplicationId: string, @Body() updateApplicationRequestViewModel: UpdateApplicationRequestViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateRequestForApplication(req.user, requestForApplicationId, updateApplicationRequestViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('requestForApplication/upload/attachement')
    async uploadRequestForApplicationAttachment(@UploadedFile() uploadedFile, @Body() uploadRequestForApplicationViewModel: UploadRequestForApplicationViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.uploadRequestForApplicationAttachement(req.user, uploadedFile.id, uploadRequestForApplicationViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/attachement/delete')
    async deleteRequestForApplicationAttachment(@Body() deleteRequestForApplicationAttachmentViewModel: DeleteRequestForApplicationAttachmentViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteRequestForApplicationAttachement(deleteRequestForApplicationAttachmentViewModel);
        res.status(result.status).json(result.body);
    }    

    // @UseGuards(JwtAuthenticationGuard)
    // @Get('requestForApplication/:id')
    // async getRequestForApplicationById(@Param('id') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
    //     const result: ResultViewModel<any> = await this.applicationManagementService.getRequestForApplicationById(requestForApplicationId);
    //     res.status(result.status).json(result.body);
    // }

    // @UseGuards(PermissionsGuard)
    // @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATION)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('requestForApplication/:id')
    async deleteRequestForApplication(@Param('id') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteRequestForApplication(req.user, requestForApplicationId);
        res.status(result.status).json(result.body);
    }

    
    // @UseGuards(PermissionsGuard)
    // @Permissions(ApplicationManagementPermissions.CANLISTALLREQUESTFORAPPLICATIONS)
    @UseGuards(JwtAuthenticationGuard)
    @Get('requestForApplications')
    async getRequestsForApplication(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getRequestsForApplications(req.user);
        res.status(result.status).json(result.body);
    }

    /**
     * Returns the RFA only, should be distinguished from the other similar route
     * @param applicationRequestId 
     * @param req 
     * @param res 
     */
    @UseGuards(JwtAuthenticationGuard)
    @Get('userRequestForApplication/:id')
    async getUserRequestsForApplicationByID(@Param("id") applicationRequestId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getUserRequestsForApplications((req.user as {_id: string})._id, applicationRequestId);
        res.status(result.status).json(result.body);
    }    
    
    /**
     * Returns the rfa with details including the isExpressInterest and userApplicationID 
     * Added to help reduce the logic on the frontend
     * @param rfaID 
     * @param req 
     * @param res 
     */
    @UseGuards(JwtAuthenticationGuard)
    @Get('requestForApplicationWithHasExpressInterestAndApplication/:rfaID')
    async getRequestForApplicationWithHasExpressInterestAndApplication(@Param("rfaID") rfaID, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService
            .getRequestForApplicationWithHasExpressInterestAndApplication((req.user as UserModel)._id, rfaID);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANPUBLISHREQUESTSFORAPPLICATION)
    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/publish/:id')
    async publishRequestForApplication(@Param('id') applicationRequestId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.publishRequestForApplication(req.user, applicationRequestId);
        res.status(result.status).json(result.body);

    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUNPUBLISHREQUESTFORAPPLICATION)
    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/unpublish/:id')
    async unPublishRequestForApplication(@Param('id') applicationRequestId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.unPublishRequestForApplication(req.user, applicationRequestId);
        res.status(result.status).json(result.body);
    }

    @Get('requestForApplication/public')
    async getPublicRequestsForApplication(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getPublicRequestsForApplications(req.user);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('requestForApplication/interested/:id')
    async getRequestForApplication(@Param('id') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getRequestForApplication(req.user, requestForApplicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/expressInterest')
    async expressRequestForApplicationInterest(@Body() expressApplicationRequestInterestViewModel: ApplicationRequestInterestViewModel,@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.expressRequestForApplicationInterest(req.user, expressApplicationRequestInterestViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/revokeInterest')
    async removeRequestForApplicationInterest(@Body() removeApplicationRequestInterestViewModel: ApplicationRequestInterestViewModel,@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.removeRequestForApplicationInterest(req.user, removeApplicationRequestInterestViewModel);
        res.status(result.status).json(result.body);
    }   

    @UseGuards(JwtAuthenticationGuard)
    @Post('rfaresponse/:rfa_id')
    async getUsersRFAResponse(@Param('rfa_id') rfaID: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.findUserApplicationByRFAID((req.user as UserModel)._id, rfaID);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('application/save')
    async applyForRequestForApplication(@Body() applicationViewModel: ApplicationModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.saveApplicationForRequestForApplication(req.user, applicationViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('canSubmitApplication/:id')
    async canSubmitApplication(@Param('id') applicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.canSubmitApplication(req.user, applicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('application/form/response/:id')
    async saveFormResponse(@Param('id') applicationId: string, @Body() formResponseViewModel: FormResponseViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.saveFormResponse(req.user, applicationId, formResponseViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('application/file/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadApplicationFile(@UploadedFile() uploadedFile, @Body() uploadApplicationFileViewModel: UploadApplicationFileViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.uploadApplicationFile(req.user, uploadedFile.id, uploadApplicationFileViewModel);
        res.status(result.status).json(result.body);
    }

    @Post('application/file/upload/delete')
    async deleteUploadedApplicationFile(@Body() deleteApplicationUploadViewModel: DeleteApplicationUploadViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteUploadedApplicationFile(deleteApplicationUploadViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('application/submit')
    async submitApplication(@Body() submitApplicationViewModel: SubmitApplicationViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.submitApplication(req.user, submitApplicationViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Delete('application/:id')
    async withdrawApplicationSubmission(@Param('id') applicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.withdrawApplication(req.user, applicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('applications/user')
    async getUserApplications(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getUserApplications((req.user as UserModel)._id);
        res.status(result.status).json(result.body);
    }    

    @UseGuards(JwtAuthenticationGuard)
    @Get('application/:id')
    async getApplication(@Param('id') applicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getApplication(req.user, applicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANVIEWAPPLICATIONS)
    @UseGuards(JwtAuthenticationGuard)
    @Get('applications')
    async getAllApplications(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getSubmittedApplications();
        res.status(result.status).json(result.body);
    }

    // @UseGuards(PermissionsGuard)
    // @Permissions(ApplicationManagementPermissions.CANLISTAPPLICATIONS)
    @UseGuards(JwtAuthenticationGuard)
    @Post('applications/search')
    async searchAllApplications(@Body() applicationSearchFilter: ApplicationSearchFilterViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.searchAllApplications(applicationSearchFilter);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('applications/granted/:requestForApplicationId')
    async searchGrantedApplications(@Param('requestForApplicationId') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.searchGrantedApplications(requestForApplicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANMOVEAPPLICATIONTONEXTSTAGE)
    @UseGuards(JwtAuthenticationGuard)
    @Post('applications/moveNextStage')
    async moveApplicationToNextStage(@Body() moveApplicationToNextStage: MoveApplicationToNextStage, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.moveApplicationToNextStage(moveApplicationToNextStage);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANAWARDAPPLICATIONGRANT)
    @UseGuards(JwtAuthenticationGuard)
    @Post('applications/awardGrant')
    async awardApplicationsGrant(@Body() awardApplicationsGrantViewModel: AwardApplicationsGrantViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.awardApplicationsGrant(awardApplicationsGrantViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANAPPROVEAPPLICATIONGRANT)
    @UseGuards(JwtAuthenticationGuard)
    @Post('applications/approveGrant')
    async approveApplicationsGrant(@Body() approveApplicationsGrantViewModel: ApproveApplicationsGrantViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.approveApplicationsGrant(approveApplicationsGrantViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('applications/requestForApplication/:requestForApplicationId')
    async getApplicationsByRequestForApplicationId(@Param('requestForApplicationId') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getApplicationsByRequestForApplicationId(requestForApplicationId);
        res.status(result.status).json(result.body);
    }
}
