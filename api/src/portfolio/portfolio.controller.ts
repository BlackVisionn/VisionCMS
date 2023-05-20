import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
	constructor(private readonly portfolioService: PortfolioService) {}
	@Post('new')
	async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
		const portfolio = await this.portfolioService.create(createPortfolioDto);

		return portfolio;
	}

	@Patch(':id')
	async updatePortfolio(
		@Param('id') id: number,
		@Body() updatePortfolioDto: UpdatePortfolioDto,
	) {
		return await this.portfolioService.update(id, updatePortfolioDto);
	}

	@Delete(':id')
	async deletePortfolio(@Param('id') id: number) {
		return await this.portfolioService.remove(id);
	}

	@Get('/sites/:userId')
	async user(@Param('userId') userId: number) {
		return await this.portfolioService.findByUserId(userId);
	}
}
