import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Portfolio } from './portfolio.entity';
@Entity('portfolio-components')
export class PortfolioComponents {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ default: true })
	useHeader: boolean;
	@Column({ default: true })
	useAbout: boolean;
	@Column({ default: true })
	useProjects: boolean;
	@Column({ default: true })
	useWork: boolean;
	@Column({ default: true })
	useEducation: boolean;
	@Column({ default: true })
	useLanguages: boolean;
	@Column({ default: true })
	useContact: boolean;
	@Column({ default: true })
	useFooter: boolean;

	@OneToOne(() => Portfolio, (portfolio) => portfolio.user)
	portfolios: Portfolio[];
	
}
