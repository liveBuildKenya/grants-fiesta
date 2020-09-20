import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

/**
 * Represents a notification
 */
export const NotificationSchema = new mongoose.Schema({
    status: String,
    /**
     * Gets or sets the message
     */
    message: String,

    /**
     * Gets or sets who the notification is for
     */
    userId: String,
    
    /**
     * Gets or sets the date created
     */
    dateCreated: { type: Date },

    /**
     * Gets or sets the date updated
     */
    dateUpdated: { type: Date, default: Date.now }
});


export interface NotificationModel extends BaseModel {
    status: string;
    message: string;
    userId: string;
}