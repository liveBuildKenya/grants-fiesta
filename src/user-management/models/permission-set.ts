import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

export const PermissionSetSchema = new mongoose.Schema({    
    moduleName: { type: String, required: true},
    moduleItemId: { type: String, required: false},
    usersList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    permission: { type: String, required: true},
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

export interface PermissionSetModel extends BaseModel {
    moduleName: string; // PermissionSetModuleNames
    moduleItemId: string;
    usersList: [string];
    groupsList: [string];
    permission: PermissionSetActionTypes; // PermissionSetActionTypes
    dateCreated: Date;
    dateUpdated: Date;
}

export enum PermissionSetModuleNames {
    MENU = "MENU",
    RFATEMPLATE = "RFATEMPLATE",
} 

/**
 * Permissions types in order of levels
 * Owner is the most permissive,
 */
export enum PermissionSetActionTypes {
    OWNER = "OWNER", // Can delete or give other users permissions on the same
    EDIT = "EDIT", // Can modify but can't edit or give other ppermissions
    READ = "READ", // E.g. Publish gives everyone READ permission
    ALLAUTHENTICATEDUSERS = "ALLAUTHENTICATEDUSERS",    
    ALLUSERSINCLUDINGGUESTS = "ALLUSERSINCLUDINGGUESTS"
}


// Permission Levels
// 1. Global Admin - Has access to everything
// 2. Item has AllAuthenticatedUsers - Returns true if UserId is provided
// 3. Item has AllUsersIncludingGuests - All users can access the item
// 4. User exists in the group
// 5. By default - Reject
// 6. A user shouldn't have 2 sets of permissions for the same item, if that happens, use the higher permissions


// Scenarios Handled
// 1. User creates a new application - Can give others permission to work on or modify the application
// 2. User is managing all applications (view only)
// 3. User is evaluating the application
