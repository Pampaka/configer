import { Models } from '../db'

export type ControllerOptions = {
	models: Models
}

export default class Controller {
	protected models: Models

	constructor(options: ControllerOptions) {
		this.models = options.models
	}
}
