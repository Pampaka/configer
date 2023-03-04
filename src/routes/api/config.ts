import { Router } from 'express'
import ConfigController from '../../controllers/controllers/config'

export type ConfigRouterOptions = {
	middlewares: Array<Function>
	controller: ConfigController
}

export default function ({ controller }: ConfigRouterOptions): Router {
	const router = Router()

	router.get('/:configName', controller.getByName.bind(controller))

	return router
}
