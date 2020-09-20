export interface CreateEvaluationSubCriteriaTemplateViewModel {
    dateCreated: Date;
    applicationTemplateId: string;
    applicationStageId: string;
    evaluationCriteriaId: string;
    displayOrder: number;
    isCalculated: boolean;
    allowComments: boolean;
    name: string;
}