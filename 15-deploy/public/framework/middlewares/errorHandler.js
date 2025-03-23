"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const errorFactory_1 = require("../../errors/errorFactory");
class ErrorHandler {
    static handle(err, req, res, next) {
        if (err.name === errorFactory_1.NotFoundError.name) {
            ErrorHandler.buildResponse(err.message, 404, res);
        }
        else if (err.name === errorFactory_1.NotModified.name) {
            ErrorHandler.buildResponse(err.message, 304, res);
        }
        else if (err.name === errorFactory_1.BadRequest.name) {
            ErrorHandler.buildResponse(err.message, 400, res);
        }
        else if (err.name === errorFactory_1.ServiceUnavailable.name) {
            ErrorHandler.buildResponse(err.message, 503, res);
        }
        else {
            ErrorHandler.buildResponse(err.message, 500, res);
        }
        next();
    }
    static buildResponse(error, statusCode, res) {
        return res.status(statusCode).send(error);
    }
}
exports.ErrorHandler = ErrorHandler;
