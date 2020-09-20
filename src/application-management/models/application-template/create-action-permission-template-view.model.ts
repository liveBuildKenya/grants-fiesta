export interface CreateActionPermissionTemplateViewModel {
    applicationTemplateId: string;
    applicationStageId: string;
    dateCreated: Date;
    action: string;
    users: Array<string>;
}