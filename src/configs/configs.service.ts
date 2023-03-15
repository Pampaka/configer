import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ConfigModel } from './configs.model'
import { CreateConfigDto } from './dtos/create-config.dto'
import { GetConfigDto } from './dtos/get-config.dto'

@Injectable()
export class ConfigsService {
	constructor(@InjectModel(ConfigModel) private configRepository: typeof ConfigModel) {}

	async validateCreateConfig(dto: CreateConfigDto) {
		const { name, env } = dto

		if (!name) throw new BadRequestException({ message: `Name is required` })
		if (!env) throw new BadRequestException({ message: `Env is required` })

		const config = await this.getConfig(dto)
		if (config) {
			throw new BadRequestException({ message: `Config "${name}:${env}" already exists` })
		}
	}

	async validateUpdateConfig(dto: GetConfigDto) {
		const config = await this.getConfig(dto)
		if (!config) {
			throw new BadRequestException({
				message: `Config "${dto.name}:${dto.env}" does not exist`
			})
		}
	}

	async createConfig(dto: CreateConfigDto) {
		await this.validateCreateConfig(dto)

		return await this.configRepository.create(dto)
	}

	async updateConfig(dto: GetConfigDto, data: object) {
		const { name, env } = dto

		await this.validateUpdateConfig(dto)

		return await this.configRepository.update(
			{ data },
			{ where: { name, env }, returning: true }
		)
	}

	async getConfig(dto: GetConfigDto) {
		return await this.configRepository.findOne({
			where: { name: dto.name, env: dto.env }
		})
	}

	async getAll() {
		return await this.configRepository.findAll()
	}
}
