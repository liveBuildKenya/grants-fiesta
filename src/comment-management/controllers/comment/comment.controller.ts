import { Controller, UseGuards, Post, Body, Req, Res } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { CreateCommentViewModel } from 'src/comment-management/models/create-comment-view.model';
import { Request, Response } from 'express';
import { CommentManagementService } from 'src/comment-management/services/comment-management/comment-management.service';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { GetCommentsViewModel } from 'src/comment-management/models/get-comments-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment Management')
@Controller('')
export class CommentController {
    constructor(private commentManagementService: CommentManagementService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Post('comment')
    async createComment(@Body() createCommentViewModel: CreateCommentViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.commentManagementService.createComment(req.user, createCommentViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('comments')
    async getComments(@Body() getCommentsViewModel: GetCommentsViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.commentManagementService.getComments(req.user, getCommentsViewModel);
        res.status(result.status).json(result.body);
    }
}
