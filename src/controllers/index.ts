import { Models } from '../db'
import ConfigsController from './controllers/configs.js'
import AuthController from './controllers/auth.js'

export type Controllers = {
	configs: ConfigsController
	auth: AuthController
}

export default function (models: Models): Controllers {
	return {
		configs: new ConfigsController(models),
		auth: new AuthController(models)
	}
}
