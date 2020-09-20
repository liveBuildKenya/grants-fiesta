import { Module } from '@nestjs/common';
import { MessageController } from './controller/message/message.controller';
import { MessageService } from './services/message/message.service';
import { CountriesService } from './services/countries/countries.service';
import { CountriesController } from './controller/countries/countries.controller';

@Module({
  controllers: [MessageController, CountriesController],
  providers: [MessageService, CountriesService]
})
export class CommonModule {}
