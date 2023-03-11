import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './users.model'
import { hash } from 'bcrypt'

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

			await this.userRepository.create({ login, password: hashPassword })
		} catch (e) {
			console.error(`Error create default user: `, e)
		}
	}
}
