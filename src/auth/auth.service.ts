import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { UserModel } from '../users/users.model'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginResDto } from './dto/login-res.dto'

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, private usersService: UsersService) {
	}

	private async generateToken(user: UserModel): Promise<LoginResDto> {
		const payload = { id: user.id, login: user.login }
		return {
			token: this.jwtService.sign(payload)
		}
	}

	private async validateLoginData(loginData: LoginUserDto): Promise<UserModel> {
		if (!loginData.login) {
			throw new UnauthorizedException({ message: 'Invalid login or password' })
		}

		const user = await this.usersService.getByLogin(loginData.login)
		if (!user) throw new UnauthorizedException({ message: 'Invalid login or password' })

		const passwordEquals = await compare(loginData.password, user.password)
		if (!user || !passwordEquals) {
			throw new UnauthorizedException({ message: 'Invalid login or password' })
		}

		return user
	}

	async login(loginData: LoginUserDto): Promise<LoginResDto> {
		const user = await this.validateLoginData(loginData)
		return await this.generateToken(user)
	}
}
