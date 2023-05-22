import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
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
	@Column({ nullable: true })
	portfolioId: number;

	@OneToOne(() => Portfolio, (portfolio) => portfolio.portfolioComponents, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	portfolio: Portfolio;
}
