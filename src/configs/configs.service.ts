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

	async createConfig(dto: CreateConfigDto) {
		await this.validateCreateConfig(dto)

		return await this.configRepository.create(dto)
	}

	async updateConfig(id: string, dto: CreateConfigDto): Promise<ConfigModel | null> {
		const res = await this.configRepository.update(dto, { where: { id }, returning: true })
		if (res?.[1]?.length !== 1) return null
		return res[1][0]
	}

	async removeById(id: string) {
		return await this.configRepository.destroy({ where: { id } })
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
