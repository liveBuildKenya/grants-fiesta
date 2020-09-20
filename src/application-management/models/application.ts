import * as mongoose from 'mongoose';
import { PerformanceIndicatorSchema } from './performanceIndicators';

/**
 * Represents an application
 */
export const ApplicationSchema = new mongoose.Schema({
    /**
     * Gets or sets the name
     */
    name: String,

    /**
     * Gets or sets the details
     */
    details: String,

    /**
     * Gets or sets the type
     */
    type: String,

    /**
     * Gets or sets the owner
     */
    owner: String,

    /**
     * Gets or sets the country
     */
    country: String,

    /**
     * Gets or sets the stage
     */
    stage: String,

    /**
     * Gets or sets the consortium
     */
    consortium: String,

    /**
     * Gets or sets the status
     */
    status: String,

    /**
     * Gets or sets performance indicators
     */
    performanceIndicators: [PerformanceIndicatorSchema],

    /**
     * Gets or sets the date created
     */
    dateCreated: { type: Date },

    /**
     * Gets or sets the date updated
     */
    dateUpdated: { type: Date, default: Date.now }
});