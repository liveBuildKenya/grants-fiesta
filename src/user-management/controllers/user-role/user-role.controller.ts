import { Controller, Get, Res } from '@nestjs/common';
import { UserManagementService } from 'src/user-management/services/user-management/user-management.service';
import { Response } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Roles')
@Controller()
export class UserRoleController {

    constructor(private userManagementService: UserManagementService){}

    @Get('permissions')
    async getSystemPermissions(@Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.getSystemPermissions();
        res.status(result.status).json(result.body);
    }
}
