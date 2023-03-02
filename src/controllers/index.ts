import { ControllerOptions } from './controller'

import apiControllers, { ApiControllers } from './api/index.js'

export type Controllers = {
	api: ApiControllers
}

export default function (options: ControllerOptions): Controllers {
	return {
		api: apiControllers(options)
	}
}
