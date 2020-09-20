import { Module } from '@nestjs/common';
import { MailingService } from './services/mailing/mailing.service';
import { MailingController } from './controller/mailing/mailing.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [MailingService],
    exports: [MailingService],
    controllers: [MailingController]
})
export class MailingManagementModule {}

// Email: no-reply@gms.eoai-africa.org | b_eb0FeB6-$u

// SSL

// IMAP Port: 993 POP3 Port: 995 | SMTP Port: 465

// NON-SSL

// IMAP Port: 143 POP3 Port: 110 | SMTP Port: 587