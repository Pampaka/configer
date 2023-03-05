import { Router } from 'express'
import { Controllers } from '../controllers'

import configsRouter from './api/configs.js'
import authRouter from './api/auth.js'

export default function (controllers: Controllers): Router {
	const router = Router()

	router.use('/config', configsRouter(controllers.configs))
	router.use('/auth', authRouter(controllers.auth))

	return router
}
