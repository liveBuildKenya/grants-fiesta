import { BaseModel } from "src/shared/models/base.model";

/**
 * Represents a comment
 */
export interface CommentViewModel extends BaseModel {
    /**
     * Gets or sets the application identifier
     */
    applicationId: string,

    /**
     * Gets or sets the comment
     */
    comment: string
}