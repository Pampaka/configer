import { Models } from '../db'

export default abstract class Controller {
	protected models: Models

	protected constructor(models: Models) {
		this.models = models
	}
}
