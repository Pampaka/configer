import { Router } from 'express'
import { Controllers } from '../controllers'

import configRouter from './api/config.js'
import userRouter from './api/user.js'

export default function (controllers: Controllers): Router {
	const router = Router()

	router.use('/config', configRouter(controllers.config))
	router.use('/user', userRouter(controllers.user))

	return router
}
