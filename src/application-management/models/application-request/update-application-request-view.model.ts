export interface UpdateApplicationRequestViewModel {
    currentStage: string;
    filesToUpload: Array<string>;
    applicationTemplateId: string;
    referenceNumber: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    keyInformation: string;
    deadline: Date;
    reviewDeadline: Date;
}