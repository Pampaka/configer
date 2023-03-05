import { Router } from 'express'
import UserController from '../../controllers/controllers/user'

export default function (controller: UserController): Router {
	const router = Router()

	return router
}
