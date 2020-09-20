import { Module } from '@nestjs/common';
import { EvaluationManagementController } from './controllers/evaluation-management/evaluation-management.controller';
import { EvaluationManagementService } from './services/evaluation-management/evaluation-management.service';
import { EvaluationGroupService } from './services/evaluation-group/evaluation-group.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationEvaluationService } from './services/application-evaluation/application-evaluation.service';
import { EvaluationGroupSchema } from './models/evaluation-group/evaluation-group.model';
import { ApplicationEvaluationSchema } from './models/application-evaluation/application-evaluation.model';
import { ApplicationRequestSchema } from 'src/application-management/models/application-request/application-request.model';
import { EvaluationRankingService } from './services/evaluation-ranking/evaluation-ranking.service';
import { EvaluationRankingSchema } from './models/evaluation-ranking/evaluation-ranking.model';
import { ApplicationManagementModule } from 'src/application-management/application-management.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'EvaluationGroup', schema: EvaluationGroupSchema },
      { name: 'EvaluationRanking', schema: EvaluationRankingSchema },
      { name: 'ApplicationEvaluation', schema: ApplicationEvaluationSchema },
      { name: 'ApplicationRequest', schema: ApplicationRequestSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserManagementModule,
    ApplicationManagementModule
  ],
  controllers: [EvaluationManagementController],
  providers: [
    EvaluationManagementService,
    EvaluationGroupService,
    ApplicationEvaluationService,
    EvaluationRankingService
  ]
})
export class EvaluationManagementModule {}
