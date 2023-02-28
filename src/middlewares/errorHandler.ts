import { Response, Request } from 'express'
const ApiError = require("../error/ApiError")

module.exports = function errorHandler(
	err: typeof ApiError,
	req: Request,
	res: Response
) {
	if (err instanceof ApiError) {
		res.status(err.status).json({
			message: err.message,
			errors: err.errors
		})
	} else {
		res.status(500).json({ message: 'Непредвиденная ошибка' })
	}
}
