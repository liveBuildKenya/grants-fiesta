import { SystemPermissions } from "../models/system-permissions.model";
import { APPLICATIONMANAGEMENTMODULEPERMISSIONS } from "src/application-management/security/application-management-permissions.model";
import { USERMANAGEMENTMODULEPERMISSIONS } from "src/user-management/security/user-management-permissions.model";
import { EVALUATIONMANAGEMENTPERMISSIONS } from "src/evaluation-management/security/evaluation-management-permissions.model";

export const SYSTEMPERMISSIONS: Array<SystemPermissions> = [
    {
        ModuleName: 'Application Management',
        Permissions: APPLICATIONMANAGEMENTMODULEPERMISSIONS
    },
    {
        ModuleName: 'User Management',
        Permissions: USERMANAGEMENTMODULEPERMISSIONS
    },
    {
        ModuleName: 'Evaluation Management',
        Permissions: EVALUATIONMANAGEMENTPERMISSIONS
    }
]