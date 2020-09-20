import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionSetModel, PermissionSetModuleNames, PermissionSetActionTypes } from 'src/user-management/models/permission-set';
import { UserGroupService } from '../user-group/user-group.service';
import { BaseModel } from 'src/shared/models/base.model';

@Injectable()
export class PermissionSetsService {

    constructor(
        @InjectModel('PermissionSet') private permissionSetModel: Model<PermissionSetModel>,
        private userGroupService: UserGroupService
    ) { }

    /**
     * A helper function to get a permissionset based on modulename and permission
     * @param moduleName 
     * @param permission 
     */
    async getModuleAndPermission(
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes
    ): Promise<PermissionSetModel> {
        return await this.permissionSetModel.findOne({
            $and: [
                {
                    moduleName: moduleName,
                    permission: permission
                },
                { moduleItemId: { $exists: false } }
            ]
        });
    }

    /**
     * A helper function to get a permissionset based on the modulename, moduleitemid and permission
     * @param moduleName 
     * @param permission 
     * @param moduleItemId 
     */
    async getModuleAndModuleItemIDAndPermission(
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes,
        moduleItemId: string
    ): Promise<PermissionSetModel> {
        return await this.permissionSetModel.findOne({
            $and: [
                {
                    moduleName: moduleName,
                    permission: permission,
                    moduleItemId: moduleItemId
                },
                { moduleItemId: { $exists: true } }
            ]
        });
    }

    /**
     * Returns true if the user exists or is part of a group that exists in the permission set
     * @param userID 
     * @param userObjectPermissionID 
     */
    async getUserExistsInPermissionSet(
        userID: string,
        userObjectPermissionID: string
    ): Promise<PermissionSetModel> {
        // Get the user's groups
        const groupsForUser = (await this.userGroupService.getGroupIDsforUser(userID));

        return await this.permissionSetModel
            .findOne({ _id: userObjectPermissionID })
            .and([
                {
                    $or: [
                        { groupsList: { $in: groupsForUser } },
                        { usersList: userID }
                    ]
                }
            ]);
    }

    async isUserExistsInPermissionSet(
        userID: string,
        userObjectPermissionID: string
    ): Promise<boolean> {
        const val = await this.getUserExistsInPermissionSet(userID, userObjectPermissionID);
        return (val) ? true : false;
    }

    
    async setEffectiveUserPermission(
        userID: string,
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes
    ): Promise<PermissionSetModel> {
        // Find the associated module & permission (for update)
        const result = await this.getModuleAndPermission(moduleName, permission);

        // Perform update if the item was found
        if (result) {
            // Confirm the user doesn't exist in the permission set
            if (!this.isUserExistsInPermissionSet(userID, result._id)) {
                result.usersList.push(userID);
                result.dateUpdated = new Date()
                return await result.save();
            } else {
                return result;
            }
        }
        // Otherwise create a new item with the specific permissions
        else {
            const newUserModulePermission = new this.permissionSetModel({
                moduleName: moduleName,
                usersList: [userID],
                permission: permission
            });
            return await newUserModulePermission.save();
        }

    }

    async setEffectiveUserPermissionItemID(
        userID: string,
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes,
        moduleItemId: string
    ): Promise<PermissionSetModel> {
        // Find the associated module & permission (for update)
        const result = await this.getModuleAndModuleItemIDAndPermission(moduleName, permission, moduleItemId);

        // Perform update if the item was found
        if (result) {
            if (!this.isUserExistsInPermissionSet(userID, result._id)) {
                result.usersList.push(userID);
                result.dateUpdated = new Date()
                return await result.save();
            } else {
                return result;
            }
        }
        // Otherwise create a new item with the specific permissions
        else {
            const newUserModulePermission = new this.permissionSetModel({
                moduleName: moduleName,
                usersList: [userID],
                permission: permission,
                moduleItemId: moduleItemId
            });
            return await newUserModulePermission.save();
        }

    }

    async getEffectiveUserPermission(
        userID: string,
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes
    ): Promise<PermissionSetModel> {
        // Get the user's groups
        const groupsForUser = (await this.userGroupService.getGroupIDsforUser(userID));

        const result = await this.permissionSetModel
            .findOne({ moduleName: moduleName })
            .and([
                {
                    $or: [
                        { groupsList: { $in: groupsForUser } },
                        { usersList: userID }
                    ]
                },
                { moduleItemId: { $exists: false } },
                { permission: permission }
            ]);

        return result;
    }

    async getEffectiveUserPermissionItemID(
        userID: string,
        moduleName: PermissionSetModuleNames,
        permission: PermissionSetActionTypes,
        moduleItemId: string
    ): Promise<PermissionSetModel> {
        // Get the user's groups
        const groupsForUser = (await this.userGroupService.getGroupIDsforUser(userID));

        // Get the user permissions
        const result = await this.permissionSetModel
            .findOne({ moduleName: moduleName })
            .and([
                {
                    $or: [
                        { groupsList: { $in: groupsForUser } },
                        { usersList: userID }
                    ]
                },
                { moduleItemId: { $exists: true } },
                { permission: permission },
                { moduleItemId: moduleItemId }
            ]);

        return result;
    }

    
    async getEffectiveUserPermissionItemIDs(
        userID: string,
        moduleName: PermissionSetModuleNames,
        moduleItemId: string[]
    ): Promise<PermissionSetModel[]> {
        // Get the user's groups
        const groupsForUser = (await this.userGroupService.getGroupIDsforUser(userID));

        // Get the user permissions
        const result = await this.permissionSetModel
            .find({ moduleName: moduleName })
            .and([
                {
                    $or: [
                        { groupsList: { $in: groupsForUser } },
                        { usersList: userID }
                    ]
                },
                { moduleItemId: { $exists: true } },
                { moduleItemId: { $in: moduleItemId } }
            ]);

        return result;
    }

    // TODO: Function needs to be optimized speed of loading
    async checkPermissionsForItemIDs<T extends BaseModel>(
        itemIDs: T[], 
        modulename: PermissionSetModuleNames, 
        userID: string
    ):  Promise<T[]>{
        // Is user a Global Admin? If yes, he/she should see everything
        if(userID) {
            if(await this.userGroupService.isUserGlobalAdmin(userID)) {
                return itemIDs;
            }
        } 

        const ids: string[] = itemIDs.map(v => v._id);

        const permissionsFromDB = await this.getEffectiveUserPermissionItemIDs(
            userID,
            modulename,
            ids
        );

        // If item has ALLAUTHENTICATEDUSERS permission, return true if a valid userID was provided

        // If item has ALLUSERSINCLUDINGGUESTS permission, return true for all requests

        // Otherwise, block the request i.e. the item won't be included in the result
        
        for (let index = 0; index < itemIDs.length; index++) {

            for (let j = 0; j < permissionsFromDB.length; j++) {
                const elementPermission = permissionsFromDB[j];
                
                // Loop through all the permissionItems to ensure if higher permissions were defined for the user those are used as the effective permissions
                if(itemIDs[index]._id === elementPermission.moduleItemId) {
                    itemIDs[index].permission = this.compareEffectivePermission(itemIDs[index].permission, elementPermission.permission);
                }
                
            }
            
        }

        // Only return items where permission is not empty
        return itemIDs.filter(v => v.permission);

    }

    public compareEffectivePermission(prev: PermissionSetActionTypes, comparedTo: PermissionSetActionTypes): PermissionSetActionTypes {
        switch(comparedTo) {
            case PermissionSetActionTypes.OWNER:
                return PermissionSetActionTypes.OWNER;
            case PermissionSetActionTypes.EDIT:
                if(prev !== PermissionSetActionTypes.OWNER) {
                    return PermissionSetActionTypes.EDIT
                } 
                break;
            case PermissionSetActionTypes.READ:
                if(prev !== PermissionSetActionTypes.OWNER && prev !== PermissionSetActionTypes.EDIT) {
                    return PermissionSetActionTypes.READ
                } 
                break;
            case PermissionSetActionTypes.ALLAUTHENTICATEDUSERS:
                if(prev !== PermissionSetActionTypes.OWNER && prev !== PermissionSetActionTypes.EDIT && prev !== PermissionSetActionTypes.READ) {
                    return PermissionSetActionTypes.ALLAUTHENTICATEDUSERS
                } 
                break;
            case PermissionSetActionTypes.ALLUSERSINCLUDINGGUESTS:
                if(prev !== PermissionSetActionTypes.OWNER && prev !== PermissionSetActionTypes.EDIT && prev !== PermissionSetActionTypes.READ && prev !== PermissionSetActionTypes.ALLAUTHENTICATEDUSERS) {
                    return PermissionSetActionTypes.ALLUSERSINCLUDINGGUESTS
                } 
                break;
            default:
                return prev;                                       
        }
    }

}
