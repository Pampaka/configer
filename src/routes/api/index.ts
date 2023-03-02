import { Router } from 'express'
import { ApiControllers } from '../../controllers/api'

import configRouter from './routers/config.js'

export type ApiRouterOptions = {
	controllers: ApiControllers
	middlewares: Array<Function>
}

export default function (sources: ApiRouterOptions): Router {
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
