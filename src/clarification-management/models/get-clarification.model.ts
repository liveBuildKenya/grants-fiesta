import { CreateClarificationModel } from './create-clarification.model';
export interface GetClarificationByModuleModel {
    moduleType: string;
    moduleItemId: string;
}

export interface GetClarificationByUserModel {
    [x: string]: any;
    requestedBy: {
        _id: string
    };
}

export interface EditClarificationByModuleModel {
    moduleType?: string;
    moduleItemId: string;
    update: CreateClarificationModel
} 