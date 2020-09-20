import { Injectable, HttpStatus } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { CreateEventViewModel } from 'src/event-management/models/create-event-view.model';
import { UpdateEventViewModel } from 'src/event-management/models/update-event-view.model';
import { SearchEventViewModel } from 'src/event-management/models/search-event-view.model';

@Injectable()
export class EventManagementService {

    constructor(private eventService: EventService) {}

    async createEvent(currentUser, createEventViewModel: CreateEventViewModel) {
        if (!createEventViewModel.name) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Event not created: name not defined',
                    result: createEventViewModel,
                    error: 'name not defined'
                }
            };
        }

        if (!createEventViewModel.moduleType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Event not created: moduleType not defined',
                    result: createEventViewModel,
                    error: 'moduleType not defined'
                }
            };
        }

        if (!createEventViewModel.moduleItemId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Event not created: moduleItemId not defined',
                    result: createEventViewModel,
                    error: 'moduleItemId not defined'
                }
            };
        }        

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Event created',
                result: (await this.eventService.createEvent(createEventViewModel))
            }
        };
    }

    async getEventById(currentUser, eventId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Event',
                result: (await this.eventService.getEventById(eventId))
            }
        }
    }

    async updateEvent(currentUser, eventId, updateEventViewModel: UpdateEventViewModel) {
        const event = await this.eventService.getEventById(eventId);
        if (updateEventViewModel.name) {
            event.name = updateEventViewModel.name;
        }

        if (updateEventViewModel.description) {
            event.description = updateEventViewModel.description;
        }

        if (updateEventViewModel.moduleItemId) {
            event.moduleItemId = updateEventViewModel.moduleItemId;
        }

        if (updateEventViewModel.moduleType) {
            event.moduleType = updateEventViewModel.moduleType;
        }

        if (updateEventViewModel.remindDate) {
            event.remindDate = updateEventViewModel.remindDate;
        }

        if(updateEventViewModel.endDate) {
            event.endDate = updateEventViewModel.endDate;
        }

        if(updateEventViewModel.startDate) {
            event.startDate = updateEventViewModel.startDate;
        }

        await this.eventService.updateEvent(event);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Event updated',
                result: (await this.eventService.getEventById(eventId))
            }
        }

    }

    async getEvents(currentUser) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Events',
                result: (await this.eventService.getEvents())
            }
        }
    }

    async searchEvents(currentUser, searchEventViewModel: SearchEventViewModel) {
        if (!searchEventViewModel.moduleItemId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Event cant be seached: moduleItemId not defined',
                    result: searchEventViewModel,
                    error: 'moduleItemId not defined'
                }
            };
        }

        if (!searchEventViewModel.moduleType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Event cannot be seached: moduleType not defined',
                    result: searchEventViewModel,
                    error: 'moduleType not defined'
                }
            };
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Events',
                result: (await this.eventService.searchEvent(searchEventViewModel))
            }
        }
    }

    async deleteEvent(currentUser, eventId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Event deleted',
                result: (await this.eventService.deleteEvent(eventId))
            }  
        }
    }
}
