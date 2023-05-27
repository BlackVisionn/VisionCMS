import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Landing } from './landing.entity';
@Entity('landing-components')
export class LandingComponents {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ default: true })
	useHeader: boolean;
	@Column({ default: true })
	useFeatures: boolean;
	@Column({ default: true })
	useAbout: boolean;
	@Column({ default: true })
	useServices: boolean;
	@Column({ default: true })
	usePortfolio: boolean;
	@Column({ default: true })
	useTeam: boolean;
	@Column({ default: true })
	useContact: boolean;
	@Column({ default: true })
	useFooter: boolean;

	@Column({ nullable: true })
	landingId: number;

	@OneToOne(() => Landing, (landing) => landing.landingComponents, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	landing: Landing;
}
