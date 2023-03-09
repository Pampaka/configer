import { Module } from '@nestjs/common'
import { ConfigsController } from './configs.controller'
import { ConfigsService } from './configs.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModel } from './configs.model'

@Module({
	controllers: [ConfigsController],
	providers: [ConfigsService],
	imports: [SequelizeModule.forFeature([ConfigModel])]
})
export class ConfigsModule {}
