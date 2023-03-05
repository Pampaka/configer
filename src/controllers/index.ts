import { Models } from '../db'
import ConfigController from './controllers/config.js'
import UserController from './controllers/user.js'

export type Controllers = {
	config: ConfigController
	user: UserController
}

export default function (models: Models): Controllers {
	return {
		config: new ConfigController(models),
		user: new UserController(models)
	}
}
