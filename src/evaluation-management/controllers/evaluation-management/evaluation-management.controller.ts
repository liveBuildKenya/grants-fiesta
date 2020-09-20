import { Controller, Body, Req, Res, UseGuards, Post, Get, Param, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { EvaluationManagementService } from 'src/evaluation-management/services/evaluation-management/evaluation-management.service';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { EvaluationManagementPermissions } from 'src/evaluation-management/security/evaluation-management-permissions.model';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { CreateApplicationEvaluationViewModel } from 'src/evaluation-management/models/application-evaluation/create-application-evaluation-view.model';
import { CreateEvaluationGroupViewModel } from 'src/evaluation-management/models/evaluation-group/create-evaluation-group-view.model';
import { EditEvaluationGroupMembersViewModel } from 'src/evaluation-management/models/evaluation-group/edit-evaluation-group-members-view.model';
import { ApiTags } from '@nestjs/swagger';
import { CreateEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/create-evaluation-ranking-view.model';
import { DeleteEvaluationGroupMembersViewModel } from 'src/evaluation-management/models/evaluation-group/delete-evaluation-group-members-view.model';
import { SearchEvaluationRankingViewModel } from 'src/evaluation-management/models/evaluation-ranking/search-evaluation-ranking-view.model';

@ApiTags('Evaluation Management')
@Controller('evaluation')
export class EvaluationManagementController {

    constructor(private evaluationManagementService: EvaluationManagementService) {}
    
    @UseGuards(PermissionsGuard)
    @Permissions(EvaluationManagementPermissions.CANCREATEEVALUATIONGROUP)
    @UseGuards(JwtAuthenticationGuard)
    @Post('group')
    async createEvaluationGroup(@Body() createEvaluationGroupViewModel: CreateEvaluationGroupViewModel, @Req() req: Request, @Res() res: Response){
        const result: ResultViewModel<any> = await this.evaluationManagementService.createEvaluationGroup(createEvaluationGroupViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(EvaluationManagementPermissions.CANEDITEVALUATIONGROUPMEMBERS)
    @UseGuards(JwtAuthenticationGuard)
    @Post('group/members/:evaluationGroupId')
    async editEvaluationGroupMembers(@Param('evaluationGroupId') evaluationGroupId: string, @Body() editEvaluationGroupMembersViewModel: EditEvaluationGroupMembersViewModel, @Req() req: Request, @Res() res: Response){
        const result: ResultViewModel<any> = await this.evaluationManagementService.editEvaluationGroupMembers(evaluationGroupId, editEvaluationGroupMembersViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(EvaluationManagementPermissions.CANDELETEEVALUATIONGROUPMEMBERS)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('group/members/:evaluationGroupId')
    async deleteEvaluationGroupMembers(@Param('evaluationGroupId') evaluationGroupId: string, @Body() deleteEvaluationGroupMembersViewModel: DeleteEvaluationGroupMembersViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.deleteEvaluationGroupMembers(evaluationGroupId, deleteEvaluationGroupMembersViewModel);
        res.status(result.status).json(result.body);
    }

    @Get('groups')
    async getAllEvaluationGroups(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.getAllEvaluationGroups();
        res.status(result.status).json(result.body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(EvaluationManagementPermissions.CANDELETEEVALUATIONGROUP)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('group/:evaluationGroupId')
    async deleteEvaluationGroup(@Param('evaluationGroupId') evaluationGroupId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.deleteEvaluationGroup(evaluationGroupId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('user/evaluationGroup/:requestForApplicationId')
    async getUserEvaluationGroup(@Param('requestForApplicationId') requestForApplicationId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.getUserEvaluationGroup(req.user, requestForApplicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('application')
    async createApplicationEvaluation(@Body() createApplicationEvaluationViewModel: CreateApplicationEvaluationViewModel,@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.createApplicationEvaluation(req.user, createApplicationEvaluationViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('application/:applicationId')
    async getApplicationEvaluationByApplicationId(@Param('applicationId') applicationId: string, @Body() createApplicationEvaluationViewModel: CreateApplicationEvaluationViewModel,@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.evaluationManagementService.getApplicationEvaluationByApplicationId(applicationId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('requestForApplication/ranking')
    async createEvaluationRanking(@Body() createEvaluationRankingViewModel: CreateEvaluationRankingViewModel, @Req() req: Request, @Res() res: Response){
        const result: ResultViewModel<any> = await this.evaluationManagementService.createEvaluationRanking(createEvaluationRankingViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('search/requestForApplication/ranking')
    async searchEvaluationRanking(@Body() searchEvaluationRankingViewModel: SearchEvaluationRankingViewModel, @Req() req: Request, @Res() res: Response){
        const result: ResultViewModel<any> = await this.evaluationManagementService.searchEvaluationRanking(searchEvaluationRankingViewModel);
        res.status(result.status).json(result.body);
    }
}
