import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Landing } from 'src/entities/landing.entity';
import { Repository } from 'typeorm';
import { CreateLandingDto } from './dto/create-landing.dto';
import { UpdateLandingDto } from './dto/update-landing.dto';

@Injectable()
export class LandingService {
	constructor(
		@InjectRepository(Landing) private readonly repo: Repository<Landing>,
	) {}
	async create(createLandingDto: CreateLandingDto): Promise<Landing> {
		return this.repo.save(createLandingDto);
	}

	async update(id: number, updateLandingDto: UpdateLandingDto) {
		const landing = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		if (!landing) {
			throw new BadRequestException('Landing not found');
		}
		Object.assign(landing, updateLandingDto);
		return this.repo.save(landing);
	}

	async remove(id: number) {
		const landing = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		await this.repo.remove(landing);
		return { success: true, landing };
	}

	async findByUserId(userId: number) {
		return await this.repo.find({
			where: {
				userId: userId,
			},
		});
	}

	async getLastCreatedEntryByUser(userId: number) {
		const entry = await this.repo.find({
			where: {
				userId,
			},
			order: { id: 'DESC' },
			take: 1,
		});
		if (entry.length > 0) {
			return entry[0].id;
		}
		return null;
	}
}
