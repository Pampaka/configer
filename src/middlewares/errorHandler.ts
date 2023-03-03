import { Response } from 'express'
import { ApiError } from '../error/ApiError.js'

export function errorHandler(err: ApiError | any, res: Response) {
	if (err instanceof ApiError) {
		res.status(err.status).json({
			message: err.message,
			errors: err.errors
		})
	} else {
		res.status(500).json({ message: 'Непредвиденная ошибка' })
	}
}
