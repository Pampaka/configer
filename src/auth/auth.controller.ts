import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '../users/dtos/login-user.dto'

@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() loginData: LoginUserDto) {
		return this.authService.login(loginData)
	}
}
