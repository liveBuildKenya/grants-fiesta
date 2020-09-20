import { ExceptionFilter, ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { SibasiResponseObject } from "../models/result-view.model";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        
        const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        // console.error(context);

        const error: SibasiResponseObject<{}> = {
          message: exception.message,
          result: {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
            name: exception.name
          },
          error: exception.message
        };
        
        response
        .status(status)
        .json(error);
    }

}