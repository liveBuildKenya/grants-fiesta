import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { ResultViewModel } from 'src/shared/models/result-view.model';

@Controller('message')
export class MessageController {}
