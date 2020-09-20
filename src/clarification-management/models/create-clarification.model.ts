export interface CreateClarificationModel {
    requestedBy: string;
    title: string;
    description: string;
    moduleType: string;
    dateCreated: Date
    relatedModuleItemID?:string,
    isPublishedRFC?: boolean,
}