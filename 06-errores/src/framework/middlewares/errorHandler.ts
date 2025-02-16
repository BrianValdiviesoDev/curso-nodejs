import { NextFunction, Request, Response } from "express";
import { BadParametersError, NotFoundError } from "../../errors/errorFactory";

export class ErrorHandler{
    static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === BadParametersError.name) {
            ErrorHandler.buildResponse(err.message, 400, res)
        } else if (err.name === NotFoundError.name) {
            ErrorHandler.buildResponse(err.message, 404, res)
        } else {
            ErrorHandler.buildResponse(err.message, 500, res)
        }
    }

    static buildResponse(error: string, statusCode: number, res: Response) {
        return res.status(statusCode).send(error)
    }
}