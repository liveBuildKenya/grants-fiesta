import { Controller, Post, Body, Req, Res, UseGuards, Get, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserGroupService } from 'src/user-management/services/user-group/user-group.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { UserGroupModel } from 'src/user-management/models/userGroups.model';
import { prepareResponse } from 'src/shared/util/prepareResponse.util';
import { UserModel } from 'src/user-management/models/user.model';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { UserManagementPermissions } from 'src/user-management/security/user-management-permissions.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Group Management')
@Controller('userGroup')
export class UserGroupController {

    constructor(
        private userGroupService: UserGroupService
    ) { }

    @UseGuards(JwtAuthenticationGuard)
    @Get('getAllGroups')
    async getAllGroups(@Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel[]> = await prepareResponse(await this.userGroupService.getAllGroups());
        res.status(result.status).json(result.body);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Get('getGroupsforUser')
    async getGroupsforUser(@Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel[]> = await prepareResponse(await this.userGroupService.getGroupsforUser((req.user as UserModel)._id));
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('getGroupIDsforUser')
    async getGroupIDsforUser(@Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<string[]> = await prepareResponse(await this.userGroupService.getGroupIDsforUser((req.user as UserModel)._id));
        res.status(result.status).json(result.body);
    }
        
    @UseGuards(JwtAuthenticationGuard)
    @Get('getGroupsByName/:groupName')
    async getGroupsByName(@Param('groupName') groupName, @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.getGroupByName(groupName));
        res.status(result.status).json(result.body);
    }   

    @UseGuards(PermissionsGuard)
    @Permissions(UserManagementPermissions.CANCREATEUSERGROUP)        
    @UseGuards(JwtAuthenticationGuard)
    @Post('createGroup')
    async createGroup(
        @Body() body: {
            groupName: string;
            users: string[] ; //| UserModel[];
            dateCreated?: Date;
            dateUpdated?: Date;
            permissions: string[];
        }, 
        @Req() req: Request, 
        @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.createGroup(body));
        res.status(result.status).json(result.body);
    }
          
    @UseGuards(JwtAuthenticationGuard)
    @Get('getGroupByID/:groupID')
    async getGroupByID(@Param('groupID') groupID, @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.getGroupByID(groupID));
        res.status(result.status).json(result.body);
    }    

    @UseGuards(PermissionsGuard)
    @Permissions(UserManagementPermissions.CANADDUSERTOGROUP) 
    @UseGuards(JwtAuthenticationGuard)
    @Post('addUserToGroup/:groupID')
    async addUserToGroup(@Param('groupID') groupID, @Body() body: string, @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.addUserToGroup( body , groupID));
        res.status(result.status).json(result.body);
    }       

    @UseGuards(PermissionsGuard)
    @Permissions(UserManagementPermissions.CANADDUSERSTOGROUP)     
    @UseGuards(JwtAuthenticationGuard)
    @Post('addUsersToGroup/:groupID')
    async addUsersToGroup(@Param('groupID') groupID, @Body() body: string[], @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.addUsersToGroup( body , groupID));
        res.status(result.status).json(result.body);
    }         

    @UseGuards(PermissionsGuard)
    @Permissions(UserManagementPermissions.CANREMOVEUSERFROMGROUP)     
    @UseGuards(JwtAuthenticationGuard)
    @Post('removeUserFromGroup/:groupID')
    async removeUserFromGroup(@Param('groupID') groupID, @Body() body: {userId: string}, @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserGroupModel> = await prepareResponse(await this.userGroupService.removeUserFromGroup(body.userId , groupID));
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('checkIfUserIsGlobalAdmin/:userID')
    async checkIfUserIsGlobalAdmin(@Param('userID') userID, @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<boolean> = await prepareResponse(await this.userGroupService.isUserGlobalAdmin(userID));
        res.status(result.status).json(result.body);
    }
    
    // @UseGuards(JwtAuthenticationGuard)
    // @Get('groups')
    // async getAllUsersGroups(@Req() req: Request, @Res() res: Response) {
    //     const result = await this.userGroupService.testTODELETEAddGroupsforUserC((req.user as { _id: string })._id);
    //     res.status(200).json(result);
    // }

    // @UseGuards(JwtAuthenticationGuard)
    // @Get('setDefaultGroups')
    // async addDefaultUserGroup(@Req() req: Request, @Res() res: Response) {
    //     console.log((req.user as { _id: string }));
    //     const result = await this.userGroupService.testTODELETESetDefaultGroups((req.user as { _id: string })._id);
    //     res.status(200).json(result);
    // }

}
