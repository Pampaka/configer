import { ValidationError } from 'express-validator'

export interface ErrorItem {
	[key: string]: string
}

export type Errors = ErrorItem[] | ValidationError[]

export class ApiError extends Error {
	status: number
	errors: Errors

	constructor(status: number, message: string, errors: Errors = []) {
		super(message)
		this.status = status
		this.message = message
		this.errors = errors
	}
}

export function badRequest(message: string, errors: Errors = []): ApiError {
	return new ApiError(400, message, errors)
}

export function internal(message: string = 'Unexpected error'): ApiError {
	return new ApiError(500, message)
}

export function forbidden(message: string = 'Access denied'): ApiError {
	return new ApiError(403, message)
}

export function unAuthorizedError(): ApiError {
	return new ApiError(401, 'No authorize')
}
