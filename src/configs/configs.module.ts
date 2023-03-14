import { Module } from '@nestjs/common'
import { ConfigsController } from './configs.controller'
import { ConfigsService } from './configs.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModel } from './configs.model'
import { AuthModule } from '../auth/auth.module'

@Module({
	controllers: [ConfigsController],
	providers: [ConfigsService],
	imports: [
		SequelizeModule.forFeature([ConfigModel]),
		AuthModule
	]
})
export class ConfigsModule {}
