import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioComponents } from 'src/entities/portfolio-components.entity';
import { Repository } from 'typeorm';
import { CreatePortfolioComponentsDto } from './dto/create-portfolio-components.dto';
import { UpdatePortfolioComponentsDto } from './dto/update-portfolio-components.dto';

@Injectable()
export class PortfolioComponentsService {
	constructor(
		@InjectRepository(PortfolioComponents)
		private readonly repo: Repository<PortfolioComponents>,
	) {}
	async create(
		createPortfolioComponentsDto: CreatePortfolioComponentsDto,
	): Promise<PortfolioComponents> {
		return this.repo.save(createPortfolioComponentsDto);
	}

	async update(
		id: number,
		updatePortfolioComponentsDto: UpdatePortfolioComponentsDto,
	) {
		const portfolioComponents = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		if (!portfolioComponents) {
			throw new BadRequestException('PortfolioComponents not found');
		}
		Object.assign(portfolioComponents, updatePortfolioComponentsDto);
		return this.repo.save(portfolioComponents);
	}

	async findComponentsByPortfolioId(portfolioId: number) {
		const portfolioComponents = await this.repo.findOne({
			where: {
				portfolioId: portfolioId,
			},
		});

		return portfolioComponents;
	}
	async findPortfolio(portfolioId: number) {
		const portfolioComponents = await this.repo
			.createQueryBuilder('portfolioComponents')
			.leftJoinAndSelect('portfolioComponents.portfolio', 'portfolio')
			.where('portfolioComponents.portfolioId = :portfolioId', { portfolioId })
			.getOne();

		return portfolioComponents;
	}
}
