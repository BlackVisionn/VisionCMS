import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Lending } from './entities/lending.entity';
import { AuthModule } from './auth/auth.module';
import { LendingModule } from './lending/lending.module';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioComponents } from './entities/portfolio-components.entity';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'admin',
			database: 'vision-cms',
			entities: [User, Lending, Portfolio, PortfolioComponents],
			synchronize: true,
		}),
		AuthModule,
		LendingModule,
		PortfolioModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
