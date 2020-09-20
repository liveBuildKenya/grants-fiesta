import { HttpStatus } from "@nestjs/common";

export interface SibasiResponseObject<T> {
    result?: T,
    message: string,
    error?: string
}

/**
 * Represents a result view model
 */
export interface ResultViewModel<T> {
    
    /**
     * Gets or sets the status
     */
    status: number;

    /**
     * Gets or sets the body
     */
    body: SibasiResponseObject<T>;
}

export interface ErrorViewModel<T> extends ResultViewModel<T> {
    
    /**
     * Gets or sets the status
     */
    status: HttpStatus.METHOD_NOT_ALLOWED | HttpStatus.FORBIDDEN | HttpStatus.BAD_REQUEST | HttpStatus.UNAUTHORIZED | HttpStatus.TOO_MANY_REQUESTS | HttpStatus.SERVICE_UNAVAILABLE | HttpStatus.INTERNAL_SERVER_ERROR  | HttpStatus.NOT_FOUND;

    /**
     * Gets or sets the body
     */
    body: {
        result: null,
        message: string,
        error: any
    };
}