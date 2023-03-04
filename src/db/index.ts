import { Sequelize } from 'sequelize'
import initConfigModel, { ConfigModel } from './models/config.js'

export type Models = {
	Config: typeof ConfigModel
}

export type DataBaseSource = {
	sequelize: Sequelize
	models: Models
}

export default async function (): Promise<DataBaseSource> {
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
		Config: initConfigModel(sequelize)
	}

	if (process.env.NODE_ENV === 'development') {
		await sequelize.sync({ alter: true })
	} else {
		await sequelize.sync()
	}

	return { sequelize, models }
}
