import { BaseModel } from "src/shared/models/base.model";

export interface FileViewModel extends BaseModel {

    /**
     * Gets or sets the module id
     */
    moduleId: string,

    /**
     * The file type as determined by the user
     */
    fileTypeByUser: string,

    /**
     * Gets or sets the original name
     */
    originalname: string,

    /**
     * Gets or sets the module type
     */
    moduleType: string

    /**
     * Gets or sets the encoding
     */
    encoding: string,

    /**
     * Gets or sets the mimeType
     */
    mimetype: string,

    /**
     * Gets or sets the data 
     */
    buffer: Buffer,

    /**
     * Gets or sets the size
     */
    size: number,
}


/**
 * This represents the body of the upload file object received from the frontend
 */
export interface FileUploadBody {
    /**
     * Specific module 
     * e.g. Proposals module or Projects module
     */
    moduleType: string;
    /**
     * ID of the specific module item
     * e.g. the _id in the Application collection
     */
    moduleId: string;
    /**
     * The specific user-defined type of the file 
     * e.g. a file can be a CV for the Applications OR Proposals module
     */
    type: string;
}

export interface FileReturnBody {
    _id: string;
    dateCreated: string;
    dateUpdated: string;
    mimetype: string;
    originalname: string;
    encoding?: string;
    size: number;
    /**
     * User defined type e.g. CV etc
     */
    fileTypeByUser: string;
    /**
     * Defines which system module the file was created at or belongs to
     */
    moduleType: string;
    /**
     * The specific ID of the module the file is attached to
     */
    moduleId: string;
}