import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { Landing } from './landing.entity';
import { Portfolio } from './portfolio.entity';
@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column({ unique: true })
	email: string;
	@Column()
	password: string;

	@OneToOne(() => Landing, (landing) => landing.user)
	landings: Landing[];

	@OneToMany(() => Portfolio, (portfolio) => portfolio.user)
	portfolios: Portfolio[];
}
