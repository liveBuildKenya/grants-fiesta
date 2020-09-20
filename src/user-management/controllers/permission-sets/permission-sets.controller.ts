import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { UserGroupService } from 'src/user-management/services/user-group/user-group.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { Request, Response } from 'express';
import { PermissionSetsService } from 'src/user-management/services/permission-sets/permission-sets.service';
import { PermissionSetModuleNames, PermissionSetActionTypes } from 'src/user-management/models/permission-set';
import { UserModel } from 'src/user-management/models/user.model';
import { prepareResponse } from 'src/shared/util/prepareResponse.util';
import { UserGroupModel } from 'src/user-management/models/userGroups.model';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions Management')
@Controller('user')
export class PermissionSetsController {

    constructor(
        private userGroupService: UserGroupService,
        private permissionsService: PermissionSetsService
    ) { }

    // @UseGuards(JwtAuthenticationGuard)
    @Get('createGlobalAdministrator')
    async createGlobalAdministrator(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<boolean> = await prepareResponse(await this.userGroupService.createGlobalAdminIfNotExists());
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('isGlobalAdministrator')
    async issGlobalAdministrator(@Req() req: Request, @Res() res: Response) {
        const result = await this.userGroupService.isUserGlobalAdmin((req.user as UserModel)._id);
        res.status(200).json(result);
    }


    @UseGuards(JwtAuthenticationGuard)
    @Get('setUserModulePermissions')
    async setUserModulePermissions(@Req() req: Request, @Res() res: Response) {
        const result = await this.permissionsService.setEffectiveUserPermission(
            (req.user as { _id: string })._id,
            PermissionSetModuleNames.RFATEMPLATE,
            PermissionSetActionTypes.OWNER);
        res.status(200).json(result);
    }


    @UseGuards(JwtAuthenticationGuard)
    @Get('getUserModulePermissions')
    async getUserModulePermissions(@Req() req: Request, @Res() res: Response) {
        const result = await this.permissionsService.getEffectiveUserPermission(
            (req.user as { _id: string })._id,
            PermissionSetModuleNames.RFATEMPLATE,
            PermissionSetActionTypes.OWNER
        );
        res.status(200).json(result);
    }

}
