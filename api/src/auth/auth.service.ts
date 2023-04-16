import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly repo: Repository<User>,
	) {}

	async create(data: any): Promise<User> {
		return this.repo.save(data);
	}

	async findOne(condition: any): Promise<User> {
		return this.repo.findOne(condition);
	}	
}
