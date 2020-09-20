export interface CreateEvaluationGroupViewModel {
    requestForApplicationId: string;
    evaluators: { 
        stageId: string;
        customProperty: any;
        userIds: Array<string>;
    };
    isUsingCustomProperty: boolean;
    dateCreated: Date;
}