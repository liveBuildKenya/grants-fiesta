import { Controller, UseGuards, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthenticationGuard } from 'src/user-management/authentication/guards/local-authuthentication.guard';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { AuthenticationService } from 'src/user-management/services/authentication/authentication.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {}
    
    /**
     * Logs in a user
     * @param userViewModel User view model
     * @param res Response model
     */
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.authenticationService.login(req.user);
        res.status(result.status).json(result.body);
    }
}
