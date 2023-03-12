import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './users.model'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([UserModel])],
	exports: [UsersService]
})
export class UsersModule {}
