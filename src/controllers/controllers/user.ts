import Controller from '../controller.js'
import { Models } from '../../db'
import { NextFunction, Request, Response } from 'express'
import { ConfigModel } from '../../db/models/config'
import { badRequest } from '../../error/apiError.js'
import { UserModel } from '../../db/models/user'

class UserController extends Controller {
	protected userModel: typeof UserModel

	constructor(models: Models) {
		super(models)
		this.userModel = this.models.User
	}
}

export default UserController
