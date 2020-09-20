import { ModulePermissions } from "src/shared/models/system-permissions.model";

export enum EvaluationManagementPermissions {
    CANCREATEEVALUATIONGROUP = 'CANCREATEEVALUATIONGROUP',
    CANUPDATEEVALUATIONGROUP = "CANUPDATEEVALUATIONGROUP",
    CANDELETEEVALUATIONGROUP = "CANDELETEEVALUATIONGROUP",
    CANEDITEVALUATIONGROUPMEMBERS = "CANEDITEVALUATIONGROUPMEMBERS",
    CANDELETEEVALUATIONGROUPMEMBERS = "CANDELETEEVALUATIONGROUPMEMBERS"
}

export const EVALUATIONMANAGEMENTPERMISSIONS: Array<ModulePermissions> = [
    {
        systemName: EvaluationManagementPermissions.CANCREATEEVALUATIONGROUP,
        description: 'Can create evaluation group'
    },
    {
        systemName: EvaluationManagementPermissions.CANUPDATEEVALUATIONGROUP,
        description: 'Can update evaluation group'
    },
    {
        systemName: EvaluationManagementPermissions.CANDELETEEVALUATIONGROUP,
        description: 'Can delete evaluation group'
    },
    {
        systemName: EvaluationManagementPermissions.CANEDITEVALUATIONGROUPMEMBERS,
        description: 'Can edit evaluation group members'
    },
    {
        systemName: EvaluationManagementPermissions.CANDELETEEVALUATIONGROUPMEMBERS,
        description: 'Can delete evaluation group members'
    }
];