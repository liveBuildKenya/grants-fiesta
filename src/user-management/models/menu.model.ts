import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models/base.model';
import { UserGroupModel } from './userGroups.model';


export const MenuSchema = new mongoose.Schema({    
    title: String,
    name: String,
    url: String,
    icon: String,
    children: [
        new mongoose.Schema({    
            title: String,
            name: String,
            url: String,
            icon: String,
            order: { type: Number, default: 0 }
        })
    ],
    order: { type: Number, default: 0 },
    userGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' }],
    isAllowAllAuthenticatedUsers:  { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }
});

export interface MenuModel extends BaseModel {
    title?: string;
    name: string;
    url?: string;
    icon?: string;
    children?: MenuModel[];
    order: number;
    userGroups: UserGroupModel[] | string[];
    isAllowAllAuthenticatedUsers: boolean;
    dateCreated?: Date;
}

// export interface MenuInterface {
//     title?: boolean;
//     name: string;
//     url?: string;
//     icon?: string;
//     children?: MenuInterface[];
//     dateCreated?: Date;
// }