import { Router } from 'express'
import ConfigController from '../../controllers/controllers/config'
import checkConfigParams from '../../middlewares/checkConfigParams.js'

export type ConfigRouterOptions = {
	controller: ConfigController
}

export default function ({ controller }: ConfigRouterOptions): Router {
	const router = Router()

	router.get('/:name', controller.getByName.bind(controller))

	router.post('/', ...checkConfigParams, controller.create.bind(controller))

	return router
}
