import { Module } from '@nestjs/common';
import { ClarificationController } from './controllers/clarification/clarification.controller';
import { ClarificationService } from './services/clarification/clarification.service';
import { ClarificationManagementService } from './services/clarification-management/clarification-management.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClarificationSchema } from 'src/clarification-management/models/clarification.model';
import { UserSchema } from 'src/user-management/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Clarification', schema: ClarificationSchema},
      { name: 'User', schema: UserSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserManagementModule
  ],
  controllers: [
      ClarificationController],
  providers: [ClarificationService, ClarificationManagementService]
})
export class ClarificationManagementModule {}
