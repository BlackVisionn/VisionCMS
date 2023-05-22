import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
} from '@nestjs/common';
import { PortfolioComponentsService } from './portfolio-components.service';
import { CreatePortfolioComponentsDto } from './dto/create-portfolio-components.dto';

@Controller('portfolio-components')
export class PortfolioComponentsController {
	constructor(
		private readonly portfolioComponentsService: PortfolioComponentsService,
	) {}
	@Post('new')
	async createPortfolioComponents(
		@Body() createPortfolioComponentsDto: CreatePortfolioComponentsDto,
	) {
		const portfolioComponents = await this.portfolioComponentsService.create(
			createPortfolioComponentsDto,
		);

		return portfolioComponents;
	}

	@Get(':portfolioId')
	async findComponentsForPortfolio(@Param('portfolioId') portfolioId: number) {
		return await this.portfolioComponentsService.findComponentsByPortfolioId(
			portfolioId,
		);
	}
}
