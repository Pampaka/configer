import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './users.model'
import { hash } from 'bcrypt'
import { CreateUserDto } from './dtos/create-user.dto'

@Injectable()
export class UsersService {
	constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
		this.createDefaultUser()
	}

	async createDefaultUser() {
		try {
			const countUsers = await this.userRepository.count()
			if (countUsers) return

			const login = process.env.CONFIGER_USER || 'admin'
			const password = process.env.CONFIGER_PASS || 'admin'
			const hashPassword = await hash(password, 5)

			await this.create({ login, password: hashPassword })
		} catch (e) {
			console.error(`Error create default user: `, e)
		}
	}

	async create(dto: CreateUserDto): Promise<UserModel> {
		return await this.userRepository.create({ login: dto.login, password: dto.password })
	}

	async getByLogin(login: string): Promise<UserModel> {
		return await this.userRepository.findOne({ where: { login } })
	}
}
