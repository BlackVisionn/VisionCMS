import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLandingComponentsDto } from './dto/create-landing-components.dto';
import { LandingComponents } from 'src/entities/landing-components.entity';
import { UpdateLandingComponentsDto } from './dto/update-landing-components.dto';

@Injectable()
export class LandingComponentsService {
	constructor(
		@InjectRepository(LandingComponents)
		private readonly repo: Repository<LandingComponents>,
	) {}
	async create(
		createLandingComponentsDto: CreateLandingComponentsDto,
	): Promise<LandingComponents> {
		return this.repo.save(createLandingComponentsDto);
	}

	async update(
		id: number,
		updateLandingComponentsDto: UpdateLandingComponentsDto,
	) {
		const landingComponents = await this.repo.findOne({
			where: {
				id: id,
			},
		});
		if (!landingComponents) {
			throw new BadRequestException('LandingComponents not found');
		}
		Object.assign(landingComponents, updateLandingComponentsDto);
		return this.repo.save(landingComponents);
	}

	async findComponentsByLandingId(landingId: number) {
		const landingComponents = await this.repo.findOne({
			where: {
				landingId: landingId,
			},
		});

		return landingComponents;
	}
	async findLanding(landingId: number) {
		const landingComponents = await this.repo
			.createQueryBuilder('landingComponents')
			.leftJoinAndSelect('landingComponents.landing', 'landing')
			.where('landingComponents.landingId = :landingId', { landingId })
			.getOne();

		return landingComponents;
	}
}
