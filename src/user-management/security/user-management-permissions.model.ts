import { ModulePermissions } from "src/shared/models/system-permissions.model";

export enum UserManagementPermissions {
    CANCREATEUSERGROUP = "CANCREATEUSERGROUP",
    CANADDUSERTOGROUP = "CANADDUSERTOGROUP",
    CANADDUSERSTOGROUP = "CANADDUSERSTOGROUP",
    CANREMOVEUSERFROMGROUP = "CANREMOVEUSERFROMGROUP"
}

export const USERMANAGEMENTMODULEPERMISSIONS: Array<ModulePermissions> = [
    {
        systemName: UserManagementPermissions.CANCREATEUSERGROUP,
        description: 'Can create user group'
    },
    {
        systemName: UserManagementPermissions.CANADDUSERTOGROUP,
        description: 'Can add user to group'
    },
    {
        systemName: UserManagementPermissions.CANADDUSERSTOGROUP,
        description: 'Can add users to group'
    },
    {
        systemName: UserManagementPermissions.CANREMOVEUSERFROMGROUP,
        description: 'Can remove user from group'
    }
];