import { Injectable } from '@nestjs/common';
import { UserGroupModel } from 'src/user-management/models/userGroups.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { isNullOrUndefined } from 'util';
import { ApplicationManagementPermissions } from 'src/application-management/security/application-management-permissions.model';
import { UserManagementPermissions } from 'src/user-management/security/user-management-permissions.model';
import { EvaluationManagementPermissions } from 'src/evaluation-management/security/evaluation-management-permissions.model';

@Injectable()
export class UserGroupService {

    constructor(
        @InjectModel('UserGroup') private userGroupModel: Model<UserGroupModel>,
        private userService: UserService
    ) { }

    async getGroupsforUser(userID: string): Promise<UserGroupModel[]> {
        return await this.userGroupModel.find({ users: userID });
    }

    async getGroupIDsforUser(userID: string): Promise<string[]> {
        return await this.userGroupModel.find({ users: userID })
            .select('_id')
            .map(v => v["_id"]);
    }
    

    async getGroupByName(name: string): Promise<UserGroupModel> {
        return await this.userGroupModel.findOne({ groupName: name });
    }

    async getAllGroups(): Promise<UserGroupModel[]> {
        return await this.userGroupModel.find({});
    }
    
    async getGroupByID(groupID: string): Promise<UserGroupModel> {
        return await this.userGroupModel.findById(groupID);
    }

    async createGroup (userGroup: {
        groupName: string;
        users: string[] ; //| UserModel[];
        permissions: string[];
        dateCreated?: Date;
        dateUpdated?: Date;
    }): Promise<UserGroupModel> {
        return await this.userGroupModel.create(userGroup);
    }

    async addUserToGroup(userID: string, groupID: string): Promise<UserGroupModel> {
        const item = await this.getGroupByID(groupID);
        item.users.push(userID);
        return await item.save();
    }

    async addUsersToGroup(userIDs: string[], groupID: string): Promise<UserGroupModel> {
        const item = await this.getGroupByID(groupID);
        item.users.push(...userIDs);
        return await item.save();
    }

    async removeUserFromGroup(userID: string, groupID: string): Promise<UserGroupModel> {
        const userGroup = await this.getGroupByID(groupID);
        userGroup.users.splice(userGroup.users.indexOf(userID), 1)
        return await userGroup.save();
    }

    
    // Permission Set Step 1. Create the Global Administrator group (with a default user if none exists)
    async createGlobalAdminIfNotExists(): Promise<boolean> {
        const globalAdminGroup = await this.getGroupByName("GlobalAdministrator");
        const permissions = [
            UserManagementPermissions.CANCREATEUSERGROUP,
            UserManagementPermissions.CANADDUSERSTOGROUP,
            UserManagementPermissions.CANADDUSERTOGROUP,
            UserManagementPermissions.CANREMOVEUSERFROMGROUP,
            ApplicationManagementPermissions.CANLISTALLREQUESTFORAPPLICATIONS,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATION,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATION,
            ApplicationManagementPermissions.CANPUBLISHREQUESTSFORAPPLICATION,
            ApplicationManagementPermissions.CANUNPUBLISHREQUESTFORAPPLICATION,
            ApplicationManagementPermissions.CANVIEWAPPLICATIONS,
            ApplicationManagementPermissions.CANLISTAPPLICATIONS,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATE,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATE,
            ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATE,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATEFORM,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATEFORM,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGE,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGE,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTIES,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTY,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
            ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEPERMISSION,
            ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATEFORM,
            ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
            ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
            ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
            ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
            ApplicationManagementPermissions.CANMOVEAPPLICATIONTONEXTSTAGE,
            ApplicationManagementPermissions.CANAWARDAPPLICATIONGRANT,
            ApplicationManagementPermissions.CANAPPROVEAPPLICATIONGRANT,
            ApplicationManagementPermissions.CANCREATEAPPLICATIONREPORTINGTEMPLATE,
            ApplicationManagementPermissions.CANDELETEAPPLICATIONREPORTINGTEMPLATE,
            EvaluationManagementPermissions.CANCREATEEVALUATIONGROUP,
            EvaluationManagementPermissions.CANUPDATEEVALUATIONGROUP,
            EvaluationManagementPermissions.CANDELETEEVALUATIONGROUP,
            EvaluationManagementPermissions.CANEDITEVALUATIONGROUPMEMBERS,
            EvaluationManagementPermissions.CANDELETEEVALUATIONGROUPMEMBERS
        ];

        if(globalAdminGroup) {
            if (globalAdminGroup.users && globalAdminGroup.users.length > 0) {
                // Check if this user actually exists
                const defaultAdminUser = await this.userService
                    .getUsersByIdsList(globalAdminGroup.users);
                if(defaultAdminUser.length > 0) {
                    globalAdminGroup.permissions = permissions;
                    await globalAdminGroup.save();
                    return true;
                } else {
                    const defaultAdminUser = await this.userService.createDefaultGlobalAdminUser();
                    globalAdminGroup.users.push(defaultAdminUser._id);
                    globalAdminGroup.permissions = permissions;
                    await globalAdminGroup.save();
                    return true;
                }
            } else {
                // Check if default admin already exists
                let defaultAdminUser = await this.userService.getUserByEmail("gms_admin@sibasi.com");

                // Create a default user
                if (!defaultAdminUser) {
                    defaultAdminUser = await this.userService.createDefaultGlobalAdminUser();
                }

                // Add the adminUser to group
                globalAdminGroup.users.push(defaultAdminUser._id);
                globalAdminGroup.permissions = permissions;
                await globalAdminGroup.save();
                return true;
            }
        } else {
            // Check if default admin already exists
            let defaultAdminUser = await this.userService.getUserByEmail("gms_admin@sibasi.com");

            // Create a default user
            if (!defaultAdminUser) {
                defaultAdminUser = await this.userService.createDefaultGlobalAdminUser();
            }
            await this.createGroup({
                groupName: "GlobalAdministrator",
                users: [defaultAdminUser._id],
                permissions: permissions
            });

            return true;
        }


    }
    
    // Permission Set Step 2. Check if user is Global Admin
    async isUserGlobalAdmin(userID: string): Promise<boolean> {
        const val = (await this.userGroupModel
            .findOne({
                $and: [
                     { groupName: "GlobalAdministrator"}, 
                     { users: userID} 
                    ]
                }));
        return isNullOrUndefined(val) ? false : true;        
    }

    // async testTODELETEAddGroupsforUserCOLDER(userID: string): Promise<UserGroupModel[]> {
    //     return await this.userGroupModel.find()
    //     .and([
    //         {
    //             $or: [
    //                 { "users": { $in: ["5ef8d659a78ff51df876e904"]} },
    //                 { groupName: "Test Group 2" }
    //             ]
    //         },
    //         { "dateCreated": "2020-06-28T17:41:45.553Z" }
    //     ])
    //     ;
    // }

    
    // async testTODELETESetDefaultGroupsOLDER(userID: string): Promise<UserGroupModel> {
    //     const newUserGroup = new this.userGroupModel({
    //         groupName: "Test Group 2",
    //         users: [userID]
    //     });
    //     return await newUserGroup.save();
    // }

}
