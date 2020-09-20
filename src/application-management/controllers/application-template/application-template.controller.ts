import { Controller, UseGuards, Post, Body, Req, Res, Get, Put, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { CreateRequestForApplicationTemplateViewModel } from 'src/application-management/models/application-template/create-request-for-application-template-view.model';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { ApplicationManagementService } from 'src/application-management/services/application-management/application-management.service';
import { CreateApplicationStageTemplateViewModel } from 'src/application-management/models/application-template/create-application-stage-template-view.model';
import { CreateEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-criteria-template-view.model';
import { CreateCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/create-criteria-questions-template-view.model';
import { UpdateApplicationTemplateViewModel } from 'src/application-management/models/application-template/update-application-template-view.model';
import { UpdateApplicationStageTemplateViewModel } from 'src/application-management/models/application-template/update-application-stage-template-view.model';
import { CreateApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/create-application-template-form-view.model';
import { UpdateApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/update-application-form-template-view.model';
import { CreateTemplateCustomPropertyViewModel } from 'src/application-management/models/application-template/create-template-custom-properties-view.model';
import { UpdateTemplateCustomPropertyViewModel } from 'src/application-management/models/application-template/update-template-custom-property-view.model';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { ApplicationManagementPermissions } from 'src/application-management/security/application-management-permissions.model';
import { DeleteApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/delete-application-form-template-view.model';
import { CreateEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-sub-criteria-template-view.model';
import { UpdateCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/update-criteria-question-template-view.model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/update-evaluation-criteria-template-view.model';
import { UpdateEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/update-evaluation-sub-criteria-template-view.model';
import { DeleteCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/delete-criteria-question-template-view.model';
import { DeleteEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/delete-evaluation-sub-criteria-template-view.model';
import { DeleteEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/delete-evaluation-criteria-template-view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReportingTemplateViewModel } from 'src/application-management/models/application-template/create-reporting-template-view.model';
import { DeleteReportingTemplateViewModel } from 'src/application-management/models/application-template/delete-reporting-template-view.model';

@ApiTags('Application Template Management')
@Controller('rfa')
export class ApplicationTemplateController {
    
    constructor(private applicationManagementService: ApplicationManagementService) {}

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATE)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template')
    async createRequestForApplicationTemplate(@Body() createApplicationTemplateViewModel: CreateRequestForApplicationTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createRequestForApplicationTemplate(req.user, createApplicationTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATE)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/:id')
    async updateApplicationTemplate(@Param('id') applicationTemplateId: string, @Body() updateApplicationTemplateViewModel: UpdateApplicationTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateApplicationTemplate(req.user, applicationTemplateId, updateApplicationTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATE)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('template/:id')
    async deleteApplicationTemplate(@Param('id') applicationTemplateId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteApplicationTemplate(req.user, applicationTemplateId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('template/:id')
    async getApplicationTemplateById(@Param('id') applicationTemplateId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getApplicationTemplateById(applicationTemplateId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('templates')
    async getApplicationTemplates(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.getApplicationTemplates(req.user);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATEFORM)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/form')
    async createApplicationFormTemplate(@Body() createApplicationFormTemplateViewModel: CreateApplicationFormTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createApplicationFormTemplate(req.user, createApplicationFormTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATEFORM)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/form/:id')
    async updateApplicationFormTemplate(@Param('id') applicationFormTemplateId: string, @Body() updateApplicationFormTemplateViewModel: UpdateApplicationFormTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateApplicationFormTemplate(req.user, applicationFormTemplateId, updateApplicationFormTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATEFORM)
    @UseGuards(JwtAuthenticationGuard)
    @Post('delete/template/form/:id')
    async deleteApplicationFormTemplate(@Param('id') applicationFormTemplateId: string, @Body() deleteApplicationFormTemplateViewModel: DeleteApplicationFormTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteApplicationFormTemplate(applicationFormTemplateId, deleteApplicationFormTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGE)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/stage')
    async createApplicationStage(@Body() createApplicationStageTemplateViewModel: CreateApplicationStageTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createApplicationStageTemplate(req.user, createApplicationStageTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGE)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/stage/:id')
    async updateApplicationStage(@Param('id') applicationStageTemplateId: string, @Body() updateApplicationStageTemplateViewModel: UpdateApplicationStageTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateApplicationStageTemplate(req.user, applicationStageTemplateId, updateApplicationStageTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTIES)    
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/customProperties')
    async createTemplateCustomProperties(@Body() createTemplateCustomPropertiesViewModel: CreateTemplateCustomPropertyViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createTemplateCustomProperties(req.user, createTemplateCustomPropertiesViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTY)      
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/customProperties/:id')
    async updateTemplateCustomProperties(@Param('id') customPropertyId: string, @Body() updateTemplateCustomPropertiesViewModel: UpdateTemplateCustomPropertyViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateTemplateCustomProperties(req.user, customPropertyId, updateTemplateCustomPropertiesViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/stage/evaluation/criteria')
    async createEvaluationCriteria(@Body() createEvaluationCriteriaTemplateViewModel: CreateEvaluationCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createEvaluationCriteria(req.user, createEvaluationCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/stage/evaluation/criteria/:criteriaId')
    async updateEvaluationCriteria(@Param('criteriaId') criteriaId: string, @Body() updateEvaluationCriteriaTemplateViewModel: UpdateEvaluationCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateEvaluationCriteria(criteriaId, updateEvaluationCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('template/stage/evaluation/criteria/:criteriaId')
    async deleteEvaluationCriteria(@Param('criteriaId') criteriaId: string, @Body() deleteEvaluationCriteriaTemplateViewModel: DeleteEvaluationCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteEvaluationCriteria(criteriaId, deleteEvaluationCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/stage/evaluation/subCriteria')
    async createEvaluationSubCriteria(@Body() createEvaluationSubCriteriaTemplateViewModel: CreateEvaluationSubCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createEvaluationSubCriteria(req.user, createEvaluationSubCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/stage/evaluation/subCriteria/:subCriteriaId')
    async updateEvaluationSubCriteria(@Param('subCriteriaId') subCriteriaId: string, @Body() updateEvaluationSubCriteriaTemplateViewModel: UpdateEvaluationSubCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateEvaluationSubCriteria(subCriteriaId, updateEvaluationSubCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('template/stage/evaluation/subCriteria/:subCriteriaId')
    async deleteEvaluationSubCriteria(@Param('subCriteriaId') subCriteriaId: string, @Body() deleteEvaluationSubCriteriaTemplateViewModel: DeleteEvaluationSubCriteriaTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteEvaluationSubCriteria(subCriteriaId, deleteEvaluationSubCriteriaTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/stage/evaluation/subCriteria/question')
    async createCriteriaQuestion(@Body() createCriteriaQuestionTemplateViewModel: CreateCriteriaQuestionTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createCriteriaQuestion(req.user, createCriteriaQuestionTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION)
    @UseGuards(JwtAuthenticationGuard)
    @Put('template/stage/evaluation/subCriteria/question/:criteriaQuestionId')
    async updateCriteriaQuestion(@Param('criteriaQuestionId') criteriaQuestionId: string, @Body() updateCriteriaQuestionTemplateViewModel: UpdateCriteriaQuestionTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.updateCriteriaQuestion(criteriaQuestionId, updateCriteriaQuestionTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('template/stage/evaluation/subCriteria/question/:criteriaQuestionId')
    async deleteCriteriaQuestion(@Param('criteriaQuestionId') criteriaQuestionId: string, @Body() deleteCriteriaQuestionTemplateViewModel: DeleteCriteriaQuestionTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteCriteriaQuestion(criteriaQuestionId, deleteCriteriaQuestionTemplateViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANCREATEAPPLICATIONREPORTINGTEMPLATE)
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('template/reportingTemplate')
    async createReportingTemplate(@UploadedFile() uploadedFile,@Body() createReportingTemplateViewModel: CreateReportingTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.createApplicationReportingTemplate({
            fileId: uploadedFile.id,
            requestForApplicationTemplateId: createReportingTemplateViewModel.requestForApplicationTemplateId,
            dateCreated: new Date(Date.now())
        });
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(ApplicationManagementPermissions.CANDELETEAPPLICATIONREPORTINGTEMPLATE)
    @UseGuards(JwtAuthenticationGuard)
    @Post('template/delete/reportingTemplate')
    async deleteReportingTemplate(@Body() deleteReportingTemplateViewModel: DeleteReportingTemplateViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.applicationManagementService.deleteApplicationReportingTemplate(deleteReportingTemplateViewModel);
        res.status(result.status).json(result.body);
    }
}
