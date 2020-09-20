import { Controller, Post, Body, Res, UseGuards, Req, Get, Put, UseInterceptors, UploadedFile, Param, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { UserManagementService } from 'src/user-management/services/user-management/user-management.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { RegisterUserViewModel } from 'src/user-management/models/register-user-view.model';
import { ChangeUserPasswordViewModel } from 'src/user-management/models/change-user-password-view.model';
import { UpdateUserProfileViewModel } from 'src/user-management/models/update-user-profile-view.model';
import { InviteUsersViewModel } from 'src/user-management/models/invite-users-view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { prepareResponse } from 'src/shared/util/prepareResponse.util';
import { UserService } from 'src/user-management/services/user/user.service';
import { UserModel } from 'src/user-management/models/user.model';
import { ChangeForgotPasswordViewModel } from 'src/user-management/models/change-forgot-password-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Management')
@Controller('user')
export class UserController {

    constructor(
        private userManagementService: UserManagementService,
        private userService: UserService
        ) {}
    /**
     * Registers a user
     * @param userViewModel User view model
     * @param res Response model
     */
    @Post('register')
    async register(@Body() registerUserViewModel: RegisterUserViewModel, @Res() res: Response) {   
        const result: ResultViewModel<any> = await this.userManagementService.register(registerUserViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('verify/:id')
    async verifyUser(@Param('id') userId: string, @Req() req: Request, @Res() res: Response){
        const result: ResultViewModel<any> = await this.userManagementService.verifyUser(req.user, userId);
        res.status(result.status).json(result.body);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Get('resend/verification')
    async resendVerification(@Req() req: Request, @Res() res: Response) {
        await this.userManagementService.sendVerificationEmail((req.user as UserModel)._id);
        res.status(HttpStatus.OK).json({body: {
            message: 'Verification email resent',
            result: true
        }});
    }

    /**
     * Gets a user profile
     * @param req Request model
     * @param res Response model
     */
    @UseGuards(JwtAuthenticationGuard)
    @Get('profile')
    async getUserPorfile(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.getUserProfile(req.user);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('profile/:id')
    async getUserPorfileById(@Param('id') userIdentifier: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.getUserProfile(req.user, userIdentifier);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('profile/picture/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(@UploadedFile() uploadedFile, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.uploadProfilePicture(req.user, uploadedFile.id);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('password/change')
    async changeUserPassword(@Req() req: Request, @Res() res: Response, @Body() changeUserPasswordViewModel: ChangeUserPasswordViewModel){
        const result: ResultViewModel<any> = await this.userManagementService.changeUserPassword(req.user, changeUserPasswordViewModel);
        res.status(result.status).json(result.body);
    }    

    @Post('password/forgot')
    async forgotPassword(@Body() body: { email: string }, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.forgotPassword(body.email);
        res.status(result.status).json(result.body);
    }

    @Post('password/reset')
    async changeForgorPassword(@Body() changeForgotPasswordViewModel: ChangeForgotPasswordViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.userManagementService.changeForgotPassword(changeForgotPasswordViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Put('profile')
    async updateUserProfile(@Req() req: Request, @Res() res: Response, @Body() updateUserProfileViewModel: UpdateUserProfileViewModel){
        const result: ResultViewModel<any> = await this.userManagementService.updateUserProfile(req.user, updateUserProfileViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('invite')
    async inviteUsers(@Req() req: Request, @Res() res: Response, @Body() inviteUsersViewModel: InviteUsersViewModel){
        const result: ResultViewModel<any> = await this.userManagementService.inviteUsers(req.user, inviteUsersViewModel);
        res.status(result.status).json(result.body);
    }    

    @UseGuards(JwtAuthenticationGuard)
    @Get('getAllUsers')
    async getGroupIDsforUser(@Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserModel[]> = await prepareResponse(await this.userService.getAllUsers());
        res.status(result.status).json(result.body);
    }      

    @UseGuards(JwtAuthenticationGuard)
    @Get('getUsersByIdsList')
    async getUsersByIdsList(@Body() body: string[], @Req() req: Request, @Res() res: Response) {   
        const result: ResultViewModel<UserModel[]> = await prepareResponse(await this.userService.getUsersByIdsList(body));
        res.status(result.status).json(result.body);
    }
}
