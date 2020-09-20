import { Controller, Get, UseGuards, Res, Post, Body } from '@nestjs/common';
import { MessageManagementService } from './message-management.service';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { Request, Response } from 'express';

@Controller('messages')
export class MessagesController {

    constructor(
        private messageManagementService: MessageManagementService
    ){}
    
    @UseGuards(JwtAuthenticationGuard) 
    @Get('')
    async getAllMessages(@Res() res: Response){
        const result = await this.messageManagementService.getAllMessages();
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard) 
    @Post('new')
    async newMessage(@Body() newMessageObject, @Res() res: Response){

        /**
        Sample Object
{
    "description": "5ef7b6e07580780a80175cfc",
    "to": "Testing reply to RFC 1202PM"
}   
         */
        const result = await this.messageManagementService.createHelpMessage(newMessageObject);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard) 
    @Post('respond')
    async respondToMessage(@Body() respondToMessageObject, @Res() res: Response){
                /**
         
         sample Object 
{
"messageId": "5f04619dbdb00927b4a690de",
"response": "responding to 5f04619dbdb00927b4a690de"
}   
         */
        const result = await this.messageManagementService.respondToMessage(respondToMessageObject);
        res.status(result.status).json(result.body);
    }
    
}
