import { ApiError } from "../apiError.ts";

//Bad request error
export class BadRequestError extends ApiError {
    constructor (
        errors: Record<string, string[]> = {},
        message : string = "Bad Request",
    ) {
        super(400, message, errors)
    }
}

// Validation error
export class ValidationError extends ApiError {
    constructor (
        errors: Record<string, string[]> = {},
        message : string = "Validation Error",
    ) {
        super(422, message, errors)
    }
}

// Not found error
export class NotFoundError extends ApiError {
    constructor (
        errors: Record<string, string[]> = {},
        message : string = "Resources Not found",
    ) {
        super(404, message, errors)
    }
}

// Conflict error
export class ConflictError extends ApiError {
    constructor (
        errors: Record<string, string[]> = {},
        message : string = "Conflict",
    ) {
        super(409, message, errors)
    }
}

// Unauthorized Error
export class UnauthorizedError extends ApiError {
 constructor (
        errors: Record<string, string[]> = {},
        message : string = "Unauthorized",
    ) {
        super(401, message, errors)
    }
}

// Forbidden error
export class ForbiddenError extends ApiError {
 constructor (
        errors: Record<string, string[]> = {},
        message : string = "Forbidden",
    ) {
        super(403, message, errors)
    }
}

// Internal Server Error
export class InternalServerError extends ApiError {
 constructor (
        errors: Record<string, string[]> = {},
        message : string = "Internal Server Error",
    ) {
        super(500, message, errors)
    }
}

