import { Sequelize } from 'sequelize'

import initConfigModel, { ConfigModel } from './models/configs.js'
import initUserModel, { UserModel } from './models/user.js'

export type Models = {
	Config: typeof ConfigModel
	User: typeof UserModel
}

export default async function (): Promise<Models> {
	const sequelize = new Sequelize(
		process.env.DB_NAME || 'dbname',
		process.env.DB_USER || 'username',
		process.env.DB_PASSWORD || 'password',
		{
			dialect: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env.DB_PORT) || 5432,
			logging: false
		}
	)

	const models: Models = {
		Config: initConfigModel(sequelize),
		User: initUserModel(sequelize)
	}

	if (process.env.NODE_ENV === 'development') {
		await sequelize.sync({ alter: true })
	} else {
		await sequelize.sync()
	}

	return models
}
