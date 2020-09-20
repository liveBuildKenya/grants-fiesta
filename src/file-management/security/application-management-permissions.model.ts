import { ModulePermissions } from "src/shared/models/system-permissions.model";

export enum FileManagementPermissions {
    CANDELETEFILE = 'CANDELETEFILE',
}

export const FILEMANAGEMENTMODULEPERMISSIONS: Array<ModulePermissions> = [
    {
        systemName: FileManagementPermissions.CANDELETEFILE,
        description: 'Can list all requests for application'
    }
];