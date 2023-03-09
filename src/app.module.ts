import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ConfigsModule } from './configs/configs.module'
import { ConfigModel } from './configs/configs.model'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env.DB_PORT) || 5432,
			username: process.env.DB_USER || 'mi-life',
			password: process.env.DB_PASS || 'root',
			database: process.env.DB_NAME || 'mi-life',
			models: [ConfigModel],
			autoLoadModels: true,
			logging: false /* TODO change to loglevel */
		}),
		ConfigsModule
	]
})
export class AppModule {}
