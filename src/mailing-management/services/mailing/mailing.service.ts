import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

@Injectable()
export class MailingService {

    constructor(private configService: ConfigService) {}

    async sendMail(sendMailViewModel: {from: string; to: Array<string>;  subject: string; text?: string; html?: string;}) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(new SMTPTransport({
            name: this.configService.get<string>('SERVER_NAME'),
            host: this.configService.get<string>('SMTP_SERVER_NO_SSL'),
            port: parseInt(this.configService.get<string>('SMTP_NO_SSL')),
            secure: false, // true for 465, false for other ports,
            auth: {
                user: this.configService.get<string>('DEFAULT_USER'), 
                pass: this.configService.get<string>('DEFAULT_PASSWORD'),
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        }));

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: sendMailViewModel.from, // sender address
            to: sendMailViewModel.to, // list of receivers
            subject: sendMailViewModel.subject, // Subject line
            text: sendMailViewModel.text, // plain text body
            html: sendMailViewModel.html, // html body
        });
    }
}
