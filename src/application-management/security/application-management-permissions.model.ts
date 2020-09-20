import { ModulePermissions } from "src/shared/models/system-permissions.model";

export enum ApplicationManagementPermissions {
    CANLISTALLREQUESTFORAPPLICATIONS = 'CANLISTALLREQUESTFORAPPLICATIONS',
    CANCREATEREQUESTFORAPPLICATION = "CANCREATEREQUESTFORAPPLICATION",
    CANUPDATEREQUESTFORAPPLICATION = "CANUPDATEREQUESTFORAPPLICATION",
    CANPUBLISHREQUESTSFORAPPLICATION = "CANPUBLISHREQUESTSFORAPPLICATION",
    CANUNPUBLISHREQUESTFORAPPLICATION = "CANUNPUBLISHREQUESTFORAPPLICATION",
    CANVIEWAPPLICATIONS = "CANVIEWAPPLICATIONS",
    CANLISTAPPLICATIONS = "CANLISTAPPLICATIONS",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATE = "CANCREATEREQUESTFORAPPLICATIONTEMPLATE",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATE = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATE",
    CANDELETEREQUESTFORAPPLICATIONTEMPLATE = "CANDELETEREQUESTFORAPPLICATIONTEMPLATE",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATEFORM = "CANCREATEREQUESTFORAPPLICATIONTEMPLATEFORM",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATEFORM = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATEFORM",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGE = "CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGE",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGE = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGE",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION",
    CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION = "CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTIES = "CANCREATEREQUESTFORAPPLICATIONCUSTOMPROPERTIES",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTY = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTY",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION = "CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION = "CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEPERMISSION = "CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEPERMISSION",
    CANDELETEREQUESTFORAPPLICATIONTEMPLATEFORM = "CANDELETEREQUESTFORAPPLICATIONTEMPLATEFORM",
    CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA = "CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA",
    CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA = "CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA",
    CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION = "CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION",
    CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION = "CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION",
    CANMOVEAPPLICATIONTONEXTSTAGE = "CANMOVEAPPLICATIONTONEXTSTAGE",
    CANAWARDAPPLICATIONGRANT = "CANAWARDAPPLICATIONGRANT",
    CANCREATEAPPLICATIONREPORTINGTEMPLATE = "CANCREATEAPPLICATIONREPORTINGTEMPLATE",
    CANDELETEAPPLICATIONREPORTINGTEMPLATE = "CANDELETEAPPLICATIONREPORTINGTEMPLATE",
    CANAPPROVEAPPLICATIONGRANT = "CANAPPROVEAPPLICATIONGRANT"
}

export const APPLICATIONMANAGEMENTMODULEPERMISSIONS: Array<ModulePermissions> = [
    {
        systemName: ApplicationManagementPermissions.CANLISTALLREQUESTFORAPPLICATIONS,
        description: 'Can list all requests for application'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATION,
        description: 'Can create request for application'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATION,
        description: 'Can update request for application'
    },
    {
        systemName: ApplicationManagementPermissions.CANPUBLISHREQUESTSFORAPPLICATION,
        description: 'Can publish request for application'
    },
    {
        systemName: ApplicationManagementPermissions.CANUNPUBLISHREQUESTFORAPPLICATION,
        description: 'Can unpublish request for application'
    },
    {
        systemName: ApplicationManagementPermissions.CANVIEWAPPLICATIONS,
        description: 'Can view all applications'
    },
    {
        systemName: ApplicationManagementPermissions.CANLISTAPPLICATIONS,
        description: 'Can list applications'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATE,
        description: 'Can create a request for application template'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATE,
        description: 'Can update a request for application template'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATE,
        description: 'Can delete a request for application template'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATEFORM,
        description: 'Can create request for application form template'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATEFORM,
        description: 'Can update request for application form template'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGE,
        description: 'Can create request for application stage template'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGE,
        description: 'Can update request for application template stage'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
        description: 'Can update request for application stage evaluation'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
        description: 'Can delete request for application stage evaluation'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTIES,
        description: 'Can create request for application template custom property'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATECUSTOMPROPERTY,
        description: 'Can update request for application template custom property'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATION,
        description: 'Can create request for application template stage evaluation'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
        description: 'Can create request for application template stage evaluation criteria question'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEPERMISSION,
        description: 'Can create request for application template stage permission'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATEFORM,
        description: 'Can delete request for application template form'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
        description: 'Can create request for application template stage evaluation sub-criteria'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
        description: 'Can update request for application temolate stage evaluation sub-criteria'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONSUBCRITERIA,
        description: 'Can delete request for application temolate stage evaluation sub-criteria'
    },
    {
        systemName: ApplicationManagementPermissions.CANUPDATEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
        description: 'Can update request for application template stage evaluation sub-criteria question'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEREQUESTFORAPPLICATIONTEMPLATESTAGEEVALUATIONCRITERIAQUESTION,
        description: 'Can delete request for application stage evaluation sub-criteria question'
    },
    {
        systemName: ApplicationManagementPermissions.CANMOVEAPPLICATIONTONEXTSTAGE,
        description: 'Can move applications to the next stage'
    },
    {
        systemName: ApplicationManagementPermissions.CANAWARDAPPLICATIONGRANT,
        description: 'Can award application grant'
    },
    {
        systemName: ApplicationManagementPermissions.CANAPPROVEAPPLICATIONGRANT,
        description: 'Can approve application grant'
    },
    {
        systemName: ApplicationManagementPermissions.CANCREATEAPPLICATIONREPORTINGTEMPLATE,
        description: 'Can create application reporting template'
    },
    {
        systemName: ApplicationManagementPermissions.CANDELETEAPPLICATIONREPORTINGTEMPLATE,
        description: 'Can delete application reporting template'
    }
];