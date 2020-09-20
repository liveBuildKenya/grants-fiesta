import { Module } from '@nestjs/common';
import { EventController } from './controller/event/event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './models/event.model';
import { EventService } from './services/event/event.service';
import { EventManagementService } from './services/event-management/event-management.service';
import { ApplicationRequestSchema } from 'src/application-management/models/application-request/application-request.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'ApplicationRequest', schema: ApplicationRequestSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserManagementModule
  ],
  controllers: [EventController],
  providers: [EventService, EventManagementService]
})
export class EventManagementModule {}
