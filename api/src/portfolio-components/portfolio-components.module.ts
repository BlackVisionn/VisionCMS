import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioComponents } from 'src/entities/portfolio-components.entity';
import { PortfolioComponentsController } from './portfolio-components.controller';
import { PortfolioComponentsService } from './portfolio-components.service';

@Module({
	imports: [TypeOrmModule.forFeature([PortfolioComponents])],
	controllers: [PortfolioComponentsController],
	providers: [PortfolioComponentsService],
})
export class PortfolioComponentsModule {}
