export interface UpdateEvaluationGroupViewModel {
    requestForApplicationId: string;
    evaluators: { 
        stageId: string;
        customProperty: any;
        custompropertyValueUsers: [
            {
                key: string;
                userIds: Array<string>;
            }
        ] 
        userIds: Array<string>;
    };
    isUsingCustomProperty: boolean
}