import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';

/**
 * Represents a user
 */
export const UserSchema = new mongoose.Schema({    
    email: String,
    password: String,
    forgotPasswordToken: { token: Number, dateIssued: Date},
    profilePictureId: String,
    emailVerified: Boolean,
    name: String,
    phoneNumber: String,
    postalAddress: String,
    country: String,
    organization: String,
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: Date.now }
});

export interface UserModel extends BaseModel {
    email: string;
    name: string;
    password: string;
    forgotPasswordToken: { token: number, dateIssued: Date}
    profilePictureId: string,
    emailVerified: boolean,
    organization: string;
    phoneNumber: string;
    postalAddress: string;
    country: string;
}