export class AppError extends Error{
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadParametersError extends AppError{
    constructor(message: string = "Bad parameters") {
        super(message)
    }
}

export class NotFoundError extends AppError{
    constructor(message: string = "Not found") {
        super(message)
    }
}

export class NoContentError extends AppError { 
    constructor(message: string = "No content") {
        super(message)
    } 
}