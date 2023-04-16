import { BadRequestException, Injectable } from '@nestjs/common';
import { Lending } from '../entities/lending.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLendingDto } from './dto/update-lending.dto';
import { CreateLendingDto } from './dto/create-lending.dto';

@Injectable()
export class LendingService {
	constructor(
		@InjectRepository(Lending) private readonly repo: Repository<Lending>,
	) {}
	async create(createLendingDto: CreateLendingDto): Promise<Lending> {
		return this.repo.save(createLendingDto);
	}

	async update(id: number, updateLendingDto: UpdateLendingDto) {
		const lending = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		if (!lending) {
			throw new BadRequestException('Lending not found');
		}
		Object.assign(lending, updateLendingDto);
		return this.repo.save(lending);
	}

	async remove(id: number) {
		const lending = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		await this.repo.remove(lending);
		return { success: true, lending };
	}

	async findByUserId(userId: number) {
		return await this.repo.find({
			where: {
				userId: userId,
			},
		});
	}
}
