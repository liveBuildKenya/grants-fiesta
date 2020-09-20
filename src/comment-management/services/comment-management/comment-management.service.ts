import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateCommentViewModel } from 'src/comment-management/models/create-comment-view.model';
import { CommentService } from 'src/comment-management/services/comment/comment.service';
import { GetCommentsViewModel } from 'src/comment-management/models/get-comments-view.model';

@Injectable()
export class CommentManagementService {

    constructor(private commentService: CommentService) {}

    async createComment(currentUser, createCommentViewModel: CreateCommentViewModel) {
        if (!createCommentViewModel.moduleItemId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Comment not added: moduleItemId not defined',
                    result: createCommentViewModel,
                    error: 'moduleItemId not defined'
                }
            };
        }

        if (!createCommentViewModel.moduleType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Comment not added: moduleType not defined',
                    result: createCommentViewModel,
                    error: 'moduleType not defined'
                }
            };
        }

        if (!createCommentViewModel.commentText) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Comment not added: commentText not defined',
                    result: createCommentViewModel,
                    error: 'commentText not defined'
                }
            };
        }

        createCommentViewModel.user = currentUser._id;

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Comment added',
                result: (await this.commentService.createComment(createCommentViewModel))
            }
        }
    }

    async getComments(currentUser, getCommentsViewModel: GetCommentsViewModel) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Comments',
                result: (await this.commentService.getComments(getCommentsViewModel))
            }
        }
    }
}
