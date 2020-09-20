import { HttpStatus } from "@nestjs/common";
import { ResultViewModel, ErrorViewModel } from "../models/result-view.model";

export async function prepareResponse<T>(data: T): Promise<ResultViewModel<T>> {
    try{
        return {
            status: HttpStatus.OK,
            body: {
                result: data,
                message: "Success"
            }
        } as ResultViewModel<T>
    } catch(e) {
        console.log(e);
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                message: "Error occured",
                error: e
            }
        } as ErrorViewModel<T>;
    }
}
