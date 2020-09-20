import { BaseModel } from "src/shared/models/base.model";

/**
 * Represents a performance indicator view model
 */
export interface CommentPerformanceIndicatorViewModel extends BaseModel{
    /**
     * Gets or sets the application identifier
     */
    applicationId: string;

    /**
     * Gets or sets the performance indicator
     */
    performanceIndicatorId: string;

    /**
     * Gets or sets the comment 
     */
    comment: string;
}