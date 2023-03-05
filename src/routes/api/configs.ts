import { Router } from 'express'
import ConfigsController from '../../controllers/controllers/configs'

import checkConfigParams from '../../middlewares/checkConfigParams.js'

export default function (controller: ConfigsController): Router {
	const router = Router()

	router.get('/:name/:env', controller.getByName.bind(controller))

	router.post('/', ...checkConfigParams, controller.create.bind(controller))

	router.put('/', ...checkConfigParams, controller.update.bind(controller))

	return router
}
