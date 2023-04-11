import {
	Body,
	Controller,
	Get,
	Post,
	BadRequestException,
	UnauthorizedException,
	Res,
	Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private jwtService: JwtService,
	) {}

	@Post('register')
	async register(
		@Body('name') name: string,
		@Body('email') email: string,
		@Body('password') password: string,
	) {
		const hashedPass = await bcrypt.hash(password, 12);
		const user = await this.appService.create({
			name,
			email,
			password: hashedPass,
		});
		delete user.password;

		return user;
	}

	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) response: Response,
	) {
		const user = await this.appService.findOne({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new BadRequestException(
				'Неверный адрес электронной почты или пароль!',
			);
		}
		if (!(await bcrypt.compare(password, user.password))) {
			throw new BadRequestException(
				'Неверный адрес электронной почты или пароль!',
			);
		}

		const jwt = await this.jwtService.signAsync({ id: user.id });

		response.cookie('jwt', jwt, { httpOnly: true });

		return {
			message: 'success',
		};
	}

	@Get('user')
	async user(@Req() request: Request) {
		try {
			const cookie = request.cookies['jwt'];

			const data = await this.jwtService.verifyAsync(cookie);

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.appService.findOne({
				where: {
					id: data['id'],
				},
			});

			const { password, ...result } = user;

			return result;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt');

		return {
			message: 'success logout',
		};
	}
}
