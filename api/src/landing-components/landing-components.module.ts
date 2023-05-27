import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingComponents } from 'src/entities/landing-components.entity';
import { LandingComponentsController } from './landing-components.controller';
import { LandingComponentsService } from './landing-components.service';


@Module({
	imports: [TypeOrmModule.forFeature([LandingComponents])],
	controllers: [LandingComponentsController],
	providers: [LandingComponentsService],
})
export class LandingComponentsModule {}
