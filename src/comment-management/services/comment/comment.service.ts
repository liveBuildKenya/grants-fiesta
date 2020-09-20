import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from 'src/comment-management/models/comment.model';
import { CreateCommentViewModel } from 'src/comment-management/models/create-comment-view.model';
import { Model } from 'mongoose';
import { GetCommentsViewModel } from 'src/comment-management/models/get-comments-view.model';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private commentModel: Model<CommentModel>) {}

    async createComment(createCommentViewModel: CreateCommentViewModel) {
        createCommentViewModel.dateCreated = new Date(Date.now());
        const newComment = new this.commentModel(createCommentViewModel);
        return await newComment.save();
    }

    async getComments(getCommentsViewModel: GetCommentsViewModel) {
        return await this.commentModel.find({
            moduleItemId: getCommentsViewModel.moduleItemId,
            moduleType: getCommentsViewModel.moduleType,
            stageId: getCommentsViewModel.stageId,
            customProperty: getCommentsViewModel.customProperty
        }).populate('user', 'email name organization country postalAddress' )
    }
}
