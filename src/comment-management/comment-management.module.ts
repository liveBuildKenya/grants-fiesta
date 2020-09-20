import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment/comment.controller';
import { CommentService } from './services/comment/comment.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/comment-management/models/comment.model';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { CommentManagementService } from './services/comment-management/comment-management.service';
import { UserSchema } from 'src/user-management/models/user.model';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema},
      { name: 'User', schema: UserSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserManagementModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentManagementService]
})
export class CommentManagementModule {}
