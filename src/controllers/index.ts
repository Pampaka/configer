import ConfigController from './controllers/config.js'
import { Models } from '../db'

export type Controllers = {
	config: ConfigController
}

export default function (models: Models): Controllers {
	return {
		config: new ConfigController(models)
	}
}
