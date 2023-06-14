import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
} from '@nestjs/common';
import { LandingService } from './landing.service';
import { CreateLandingDto } from './dto/create-landing.dto';
import { UpdateLandingDto } from './dto/update-landing.dto';


@Controller('landing')
export class LandingController {
	constructor(private readonly landingService:LandingService) {}
	@Post('new')
	async createLanding(@Body() createLandingDto: CreateLandingDto) {
		const landing = await this.landingService.create(createLandingDto);

		return landing;
	}

	@Patch(':id')
	async updateLanding(
		@Param('id') id: number,
		@Body() updateLandingDto: UpdateLandingDto,
	) {
		return await this.landingService.update(id, updateLandingDto);
	}

	@Delete(':id')
	async deleteLanding(@Param('id') id: number) {
		return await this.landingService.remove(id);
	}

	@Get('last-landing/:userId')
	async getLastUserLanding(@Param('userId') userId: number) {
		return await this.landingService.getLastCreatedEntryByUser(userId);
	}

	@Get('/sites/:userId')
	async user(@Param('userId') userId: number) {
		return await this.landingService.findByUserId(userId);
	}
}
