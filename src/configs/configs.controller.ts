import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from '@nestjs/common'
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

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	update(@Param('id') id: string, @Body() configDto: CreateConfigDto) {
		return this.configsService.updateConfig(id, configDto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	removeById(@Param('id') id: string) {
		return this.configsService.removeById(id)
	}

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
