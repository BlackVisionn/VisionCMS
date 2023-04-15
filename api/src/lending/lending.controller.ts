import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	BadRequestException,
	UnauthorizedException,
	Res,
	Req,
	Param,
} from '@nestjs/common';
import { LendingService } from './lending.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { CreateLendingDto } from './dto/create-lending.dto';
import { UpdateLendingDto } from './dto/update-lending.dto';

@Controller('lending')
export class LendingController {
	constructor(
		private readonly lendingService: LendingService, // private jwtService: JwtService,
	) {}
	@Post('new')
	async createLending(@Body() createLendingDto: CreateLendingDto) {
		const lending = await this.lendingService.create(createLendingDto);

		return lending;
	}

	@Patch(':id')
	async updateLending(
		@Param('id') id: number,
		@Body() updateLendingDto: UpdateLendingDto,
	) {
		return await this.lendingService.update(id, updateLendingDto);
	}

	@Delete(':id')
	async deleteLending(@Param('id') id: number) {
		return await this.lendingService.remove(id);
	}
}
