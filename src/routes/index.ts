import { Router } from 'express'
import { Controllers } from '../controllers'

import configRouter from './api/config.js'

export default function (controllers: Controllers): Router {
	const router = Router()

	router.use('/config', configRouter(controllers.config))

	return router
}
