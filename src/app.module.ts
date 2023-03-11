import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigsModule } from './configs/configs.module'
import { UserModel } from './users/users.model'
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
			models: [ConfigModel, UserModel],
			autoLoadModels: true,
			logging: false /* TODO change to loglevel */
		}),
		UsersModule,
		ConfigsModule
	]
})
export class AppModule {}
