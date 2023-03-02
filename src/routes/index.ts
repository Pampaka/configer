import { Controllers } from '../controllers'
import { Router } from 'express'

import apiRouter from './api/index.js'

export type ApiOptions = {
	controllers: Controllers
	middlewares: Array<Function>
}

export default function (options: ApiOptions): Router {
	const router = Router()

	router.use(
		'api',
		apiRouter({
			middlewares: options.middlewares,
			controllers: options.controllers.api
		})
	)

	return router
}
