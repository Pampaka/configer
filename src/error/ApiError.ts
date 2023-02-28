class ApiError extends Error {
	status: number
	errors: []

	constructor(status: number, message: string, errors: [] = []) {
		super(message)
		this.status = status
		this.message = message
		this.errors = errors
	}

	static badRequest(message: string, errors: [] = []) {
		return new ApiError(404, message, errors)
	}

	static internal(message: string) {
		return new ApiError(500, message)
	}

	static forbidden(message: string) {
		return new ApiError(403, message)
	}

	static UnAuthorizedError() {
		return new ApiError(401, 'No authorize')
	}
}

module.exports = ApiError
