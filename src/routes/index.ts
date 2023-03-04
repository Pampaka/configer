import { Router } from 'express'
import { ApiControllers } from '../controllers'

import configRouter from './api/config.js'

export type ApiOptions = {
	controllers: ApiControllers
	middlewares: Array<Function>
}

export default function (sources: ApiOptions): Router {
	const router = Router()

	router.use(
		'/config',
		configRouter({
			middlewares: sources.middlewares,
			controller: sources.controllers.config
		})
	)

	return router
}
