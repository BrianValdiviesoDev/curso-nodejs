"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailable = exports.BadRequest = exports.NotModified = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class NotModified extends AppError {
    constructor(message = 'Not modified') {
        super(message);
    }
}
exports.NotModified = NotModified;
class BadRequest extends AppError {
    constructor(message = 'Bad request') {
        super(message);
    }
}
exports.BadRequest = BadRequest;
class ServiceUnavailable extends AppError {
    constructor(message = 'Service unavailable') {
        super(message);
    }
}
exports.ServiceUnavailable = ServiceUnavailable;
