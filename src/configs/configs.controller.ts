import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ConfigsService } from './configs.service'
import { CreateConfigDto } from './dtos/create-config.dto'
import { GetConfigDto } from './dtos/get-config.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('api/configs')
export class ConfigsController {
	constructor(private configsService: ConfigsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() configDto: CreateConfigDto) {
		return this.configsService.createConfig(configDto)
	}

	@Put(':name/:env')
	@UseGuards(JwtAuthGuard)
	update(@Param() params: GetConfigDto, @Body('data') data: object) {
		return this.configsService.updateConfig(params, data)
	}

	// will be removed when rabbitmq/redis is connected
	@Get(':name/:env')
	getConfig(@Param() params: GetConfigDto) {
		return this.configsService.getConfig(params)
	}

	@Get('all')
	@UseGuards(JwtAuthGuard)
	getAll() {
		return this.configsService.getAll()
	}
}
