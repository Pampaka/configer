import { Router } from 'express'
import AuthController from '../../controllers/controllers/auth'

export default function (controller: AuthController): Router {
	const router = Router()

	router.post('/login', controller.login.bind(controller))

	return router
}
