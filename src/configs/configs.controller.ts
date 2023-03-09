import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ConfigsService } from './configs.service'
import { CreateConfigDto } from './dtos/create-config.dto'
import { GetConfigDto } from './dtos/get-config.dto'

@Controller('api/configs')
export class ConfigsController {
	constructor(private configsService: ConfigsService) {}

	@Post()
	create(@Body() configDto: CreateConfigDto) {
		return this.configsService.createConfig(configDto)
	}

	@Put(':name/:env')
	update(@Param() params: GetConfigDto, @Body("data") data: object) {
		return this.configsService.updateConfig(params, data)
	}

	@Get(':name/:env')
	getConfig(@Param() params: GetConfigDto) {
		return this.configsService.getConfig(params)
	}
}
