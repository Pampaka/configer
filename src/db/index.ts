import { Sequelize } from 'sequelize'

import initConfigModel, { Config } from './models/config.js'

export type Models = {
	Config: typeof Config
}

export type DataBaseSource = {
	sequelize: Sequelize
	models: Models
}

export default async function () {
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

	await sequelize.sync()

	return { sequelize, models } as DataBaseSource
}
