import { Models } from '../../db'
import { NextFunction, Request, Response } from 'express'
import { badRequest } from '../../error/apiError.js'
import { UserModel } from '../../db/models/user'
import bcrypt from 'bcrypt'

class AuthController {
	protected userModel: typeof UserModel

	constructor(models: Models) {
		this.userModel = models.User
	}

	async login(
		req: Request<{}, {}, { login: string; password: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { login, password } = req.body

			if (!login) return next(badRequest('Enter login'))

			const user = await this.userModel.findOne({ where: { login } })
			if (!user) return next(badRequest('Wrong login or password'))

			const isPassEquals = await bcrypt.compare(password, user.password)
			if (!isPassEquals) return next(badRequest('Wrong login or password'))

			// plug
			res.json(true)
		} catch (e) {
			console.debug('Login error: ', e)
			next(e)
		}
	}
}

export default AuthController
