import { NextFunction, Request, Response } from 'express'
import { badRequest } from '../error/apiError.js'

import { check, validationResult } from 'express-validator'

function isValid(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(badRequest('Invalid parameters', errors.array()))
	}
	next()
}

export default [
	check('name', 'Parameter "name" required').notEmpty(),
	check('env', 'Parameter "env" required').notEmpty(),
	check('data').custom((value: string) => {
		if (value !== undefined) {
			try {
				JSON.parse(value)
			} catch (e) {
				throw new Error(
					`Error parsing json "data"${e instanceof Error && `: ${e.message}`}`
				)
			}
		}
		return true
	}),
	isValid
]
