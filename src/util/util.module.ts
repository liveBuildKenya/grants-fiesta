import { Module } from '@nestjs/common';
import { MessageManagementService } from './messages/message-management.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesSchema } from './messages/message.model';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          { name: 'Messages', schema: MessagesSchema}
        ]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
        UserManagementModule
      ],
      controllers: [
        MessagesController
        ],
      providers: [
        MessageManagementService,
        MessagesService    
    ]
})
export class UtilModule {}
