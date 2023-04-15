import { Module } from '@nestjs/common';
import { LendingController } from './lending.controller';
import { LendingService } from './lending.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lending } from '../entities/lending.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Lending])],
	controllers: [LendingController],
	providers: [LendingService],
})
export class LendingModule {}
