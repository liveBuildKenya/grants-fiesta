import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventModel } from 'src/event-management/models/event.model';
import { Model } from 'mongoose';
import { CreateEventViewModel } from 'src/event-management/models/create-event-view.model';
import { SearchEventViewModel } from 'src/event-management/models/search-event-view.model';

@Injectable()
export class EventService {

    constructor(@InjectModel('Event') private eventModel: Model<EventModel>){}

    async createEvent(createEventViewModel: CreateEventViewModel) {
        createEventViewModel.dateCreated = new Date(Date.now());
        const newEvent = await new this.eventModel(createEventViewModel);
        return await newEvent.save();
    }

    async getEventById(eventId: string) {
        return await (await this.eventModel.findById(eventId));
    }

    async updateEvent(event: EventModel) {
        await this.eventModel.updateOne({_id: event._id}, event);
        return await this.getEventById(event._id);
    }

    async getEvents() {
        return await this.eventModel.find();
    }

    async searchEvent(searchEventViewModel: SearchEventViewModel) {
        return await this.eventModel.find({moduleItemId: searchEventViewModel.moduleItemId, moduleType: searchEventViewModel.moduleType})
    }

    async deleteEvent(eventId: string) {
        return await this.eventModel.deleteOne({_id: eventId});
    }
}
