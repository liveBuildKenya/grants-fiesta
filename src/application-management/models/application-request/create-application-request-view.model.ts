export interface CreateApplicationRequestViewModel {
    applicationTemplateId: string;
    referenceNumber: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    keyInformation: string;
    published: boolean;
    deadline: Date;
    reviewDeadline: Date;
    owner: string;
    filesToUpload: Array<string>;
    dateCreated: Date;
}