import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/apiError.js'

export default function errorHandler(
	err: ApiError | any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.debug(`Error handler: `, err)
	if (err instanceof ApiError) {
		res.status(err.status).json({
			message: err.message,
			errors: err.errors
		})
	} else {
		res.status(500).json({ message: 'Unexpected error' })
	}
}
