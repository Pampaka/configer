import { ControllerOptions } from './controller'

import ConfigController from './controllers/config.js'

export type ApiControllers = {
	config: ConfigController
}

export default function (options: ControllerOptions): ApiControllers {
	return {
		config: new ConfigController(options)
	}
}
