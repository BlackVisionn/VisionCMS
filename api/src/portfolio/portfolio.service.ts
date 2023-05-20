import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from 'src/entities/portfolio.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
	constructor(
		@InjectRepository(Portfolio) private readonly repo: Repository<Portfolio>,
	) {}
	async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
		return this.repo.save(createPortfolioDto);
	}

	async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
		const portfolio = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		if (!portfolio) {
			throw new BadRequestException('Portfolio not found');
		}
		Object.assign(portfolio, updatePortfolioDto);
		return this.repo.save(portfolio);
	}

	async remove(id: number) {
		const portfolio = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		await this.repo.remove(portfolio);
		return { success: true, portfolio };
	}

	async findByUserId(userId: number) {
		return await this.repo.find({
			where: {
				userId: userId,
			},
		});
	}
}
