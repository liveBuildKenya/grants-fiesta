export interface CreateCriteriaQuestionTemplateViewModel {
    applicationTemplateId: string;
    applicationStageId: string;
    evaluationCriteriaId: string;
    evaluationSubCriteriaId: string;
    questionText: string;
    questionType: string;
    possibleMarks: number;
    dateCreated: Date;
}