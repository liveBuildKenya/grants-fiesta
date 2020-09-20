import * as mongoose from 'mongoose';

/**
 * Represents a file
 */
export const FileSchema = new mongoose.Schema({
    
    /**
     * Gets or sets the module id
     */
    moduleId: String,
    
    /**
     * The file type as determined by the user
     */
    fileTypeByUser: String,

    /**
     * Gets or sets the original name
     */
    originalname: String,

    /**
     * Gets or sets the module type
     */
    moduleType: String,

    /**
     * Gets or sets the encoding
     */
    encoding: String,

    /**
     * Gets or sets the mimeType
     */
    mimetype: String,

    /**
     * Gets or sets the actual file 
     */
    buffer: Buffer,


    /**
     * Gets or sets the size
     */
    size: Number,

    /**
     * Gets or sets the date created
     */
    dateCreated: { type: Date },

    /**
     * Gets or sets the date updated
     */
    dateUpdated: { type: Date, default: Date.now }
});
