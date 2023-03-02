import { Models } from '../db'

export type ControllerOptions = {
	models: Models
}

export default class Controller {
	#models: ControllerOptions['models']

	constructor(options: ControllerOptions) {
		this.#models = options.models
	}
}
