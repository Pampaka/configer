import { Models } from '../db'

export type ControllerOptions = {
	models: Models
}

export default abstract class Controller {
	protected models: ControllerOptions['models']

	protected constructor(options: ControllerOptions) {
		this.models = options.models
	}
}
