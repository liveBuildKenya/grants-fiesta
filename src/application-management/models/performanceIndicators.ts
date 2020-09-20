import * as mongoose from 'mongoose';

/**
 * Represents a performance indicator
 */
export const PerformanceIndicatorSchema = new mongoose.Schema({
    /**
     * Gets or sets the name
     */
    name: String,
    /**
     * Gets or sets the target performance
     */
    target: { value: String || Number, date: Date , budget: Number },
    /**
     * Gets or sets the actual performance
     */
    actual: { value: String || Number, date: Date , budget: Number },

    /**
     * Gets or sets the comments
     */
    comments: [{ text: String, owner: String, date: Date}],

    /**
     * Gets or sets the date created
     */
    dateCreated: { type: Date },

    /**
     * Gets or sets the date updated
     */
    dateUpdated: { type: Date, default: Date.now }
});