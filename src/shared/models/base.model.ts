import { Document } from 'mongoose';
import { PermissionSetActionTypes } from 'src/user-management/models/permission-set';

export interface BaseModel extends Document {
    /**
     * Gets or sets the id
     */
    id?: string;

    /**
     * Gets or sets the date created
     */
    dateCreated?: Date;

    /**
     * Gets or sets the date updated
     */
    dateUpdated?: Date;

    /**
     * Sets the Permission Type for the Object based on the Permission-Set Module
     * This value is not actually stored in the database, but is added on runtime
     */
    permission?: PermissionSetActionTypes;
}