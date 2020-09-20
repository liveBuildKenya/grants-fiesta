import { Controller, Post, Body } from '@nestjs/common';
import { MailingService } from 'src/mailing-management/services/mailing/mailing.service';
import { MailingViewModel } from 'src/mailing-management/models/mailing-view.model';

@Controller('mailing')
export class MailingController {
    constructor(private mailingService: MailingService) {}

    // @Post('test')
    // async testMailing(@Body() mailingViewModel: MailingViewModel) {
    //     await this.mailingService.sendMail(mailingViewModel.from, mailingViewModel.to, mailingViewModel.subject, mailingViewModel.text, mailingViewModel.html);
    // }
}
