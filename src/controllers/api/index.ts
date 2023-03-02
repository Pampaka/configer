import { ControllerOptions } from '../controller'

import ConfigController from './config.js'

export type ApiControllers = {
	config: ConfigController
}

export default function (options: ControllerOptions): ApiControllers {
	return {
		config: new ConfigController(options)
	}
}
