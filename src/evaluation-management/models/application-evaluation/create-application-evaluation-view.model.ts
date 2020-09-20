export interface CreateApplicationEvaluationViewModel {
    dateCreated: Date;
    applicationId: string;
    userId: string;
    stageId: string;
    stageType: string;
    criteriaId: string;
    criteriaName: string;
    questionRatings: [
        {
            subCriteriaId: string;
            questionId: string;
            question: string;
            value: any;
        }
    ];
}