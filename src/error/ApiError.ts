type Errors = Array<ErrorItem>

interface ErrorItem {
	prop: string
	message: string
}

export class ApiError extends Error {
	status: number
	errors: Errors

	constructor(status: number, message: string, errors: Errors = []) {
		super(message)
		this.status = status
		this.message = message
		this.errors = errors
	}

	static badRequest(message: string, errors: Errors = []) {
		return new ApiError(404, message, errors)
	}

	static internal(message: string) {
		return new ApiError(500, message)
	}

	static forbidden(message: string) {
		return new ApiError(403, message)
	}

	static unAuthorizedError() {
		return new ApiError(401, 'No authorize')
	}
}
