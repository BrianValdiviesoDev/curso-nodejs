import { NextFunction, Request, Response } from "express";
import { BadRequest, NotFoundError, NotModified, ServiceUnavailable } from "../../errors/errorFactory";

export class ErrorHandler{

    static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === NotFoundError.name) {
            ErrorHandler.buildResponse(err.message, 404, res);
        } else if (err.name === NotModified.name) {
            ErrorHandler.buildResponse(err.message, 304, res);
        } else if (err.name === BadRequest.name) {
            ErrorHandler.buildResponse(err.message, 400, res);
        }  else if (err.name === ServiceUnavailable.name) {
            ErrorHandler.buildResponse(err.message, 503, res);
        } else {
            ErrorHandler.buildResponse(err.message, 500, res);
        }
        next();
    }

    static buildResponse(error: string, statusCode: number, res: Response) {
        return res.status(statusCode).send(error);
    }
}