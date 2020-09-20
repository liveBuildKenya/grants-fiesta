import { Controller, UseGuards, Post, Body, Req, Res, Get, Param, Put, Delete } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { Request, Response } from 'express';
import { CreateEventViewModel } from 'src/event-management/models/create-event-view.model';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { EventManagementService } from 'src/event-management/services/event-management/event-management.service';
import { UpdateEventViewModel } from 'src/event-management/models/update-event-view.model';
import { SearchEventViewModel } from 'src/event-management/models/search-event-view.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Event Management')
@Controller()
export class EventController {

    constructor(private eventManagementService: EventManagementService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Post('event')
    async createEvent(@Body() createEventViewModel: CreateEventViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.createEvent(req.user, createEventViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('events')
    async getEvents(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.getEvents(req.user);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('event/:id')
    async getEventById(@Param('id') eventId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.getEventById(req.user, eventId);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('events')
    async searchEvents(@Body() searchEventViewModel: SearchEventViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.searchEvents(req.user, searchEventViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Put('event/:id')
    async updateEvent(@Param('id') eventId: string, @Body() updateEventViewModel: UpdateEventViewModel, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.updateEvent(req.user, eventId, updateEventViewModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Delete('event/:id')
    async deleteEvent(@Param('id') eventId: string, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<any> = await this.eventManagementService.deleteEvent(req.user, eventId);
        res.status(result.status).json(result.body);
    }

}
