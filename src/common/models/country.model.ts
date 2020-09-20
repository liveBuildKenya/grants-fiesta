import { BaseModel } from "src/shared/models/base.model";

export interface CountryModel {
    name: string;
    code: string;
    language: {
        code: string;
        name: string;
    };
}