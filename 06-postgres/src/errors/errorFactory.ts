export class AppError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	    Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Not found') {
		super(message);
	}
}

export class NotModified extends AppError {
	constructor(message: string = 'Not modified') {
		super(message);
	}
}

export class BadRequest extends AppError {
	constructor(message: string = 'Bad request') {
		super(message);
	}
}

export class ServiceUnavailable extends AppError {
	constructor(message: string = 'Service unavailable') {
		super(message);
	}
}

