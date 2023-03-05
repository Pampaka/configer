import { Router } from 'express'
import ConfigController from '../../controllers/controllers/config'

import checkConfigParams from '../../middlewares/checkConfigParams.js'

export default function (controller: ConfigController): Router {
	const router = Router()

	router.get('/:name/:env', controller.getByName.bind(controller))

	router.post('/', ...checkConfigParams, controller.create.bind(controller))

	router.put('/', ...checkConfigParams, controller.update.bind(controller))

	return router
}
