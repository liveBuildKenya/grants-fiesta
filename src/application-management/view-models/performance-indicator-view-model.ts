import { BaseModel } from "src/shared/models/base.model";


export interface AddPerformanceIndicatorViewModel extends BaseModel {
    /**
     * Gets or sets the applications identifier
     */
    applicationId: string;
    
    /**
     * Gets or sets the name
     */
    name: string;

    /**
     * Gets or sets the target
     */
    target: { value: string | number, date: Date , budget: number };
}