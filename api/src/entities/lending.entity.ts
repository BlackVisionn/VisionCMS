import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
@Entity('lendings')
export class Lending {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ default: 'Your lending name' })
	headerName: string;
	@Column({ default: 'Your lending description' })
	headerDescription: string;
	@Column({ default: 'Your lending mainIMG' })
	mainImg: string;
	@Column({ default: 'Introduction' })
	navIntroduction: string;
	@Column({ default: 'Your Introduction title' })
	introductionTitle: string;
	@Column({ default: 'Your Introduction description' })
	introductionDescription: string;
	@Column({ default: 'About' })
	navAbout: string;
	@Column({ default: 'Your About title' })
	aboutTitle: string;
	@Column({ default: 'Your About description' })
	aboutDescription: string;
	@Column({ default: 'Contact' })
	navContact: string;
	@Column({ default: 'Your Contact title' })
	contactTitle: string;
	@Column({ default: 'Your Contact description' })
	contactDescription: string;
	@Column({ default: 'Copyright © 2023 Your Company' })
	footerCompany: string;

	@Column({ default: true })
	useHeader: boolean;
	@Column({ default: true })
	useMainImg: boolean;
	@Column({ default: true })
	useNavIntroduction: boolean;
	@Column({ default: true })
	useNavAbout: boolean;
	@Column({ default: true })
	useNavContact: boolean;
	@Column({ default: true })
	useFooter: boolean;

	@Column({ default: null })
	userId: number;

	@ManyToOne(() => User, (user) => user.lendings, { eager: true })
	@JoinColumn({
		name: 'userId',
		referencedColumnName: 'id',
	})
	user: User;
}
