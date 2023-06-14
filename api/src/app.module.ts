import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Landing } from './entities/landing.entity';
import { AuthModule } from './auth/auth.module';
import { LandingModule } from './landing/landing.module';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioComponents } from './entities/portfolio-components.entity';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PortfolioComponentsModule } from './portfolio-components/portfolio-components.module';
import { LandingComponents } from './entities/landing-components.entity';
import { LandingComponentsModule } from './landing-components/landing-components.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'admin',
			database: 'vision-cms',
			entities: [User, Landing, LandingComponents, Portfolio, PortfolioComponents],
			synchronize: true,
		}),
		AuthModule,
		LandingModule,
		LandingComponentsModule,
		PortfolioModule,
		PortfolioComponentsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
