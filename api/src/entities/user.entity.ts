import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lending } from './lending.entity';
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

	@OneToMany(() => Lending, (lending) => lending.user)
	lendings: Lending[];

	@OneToMany(() => Portfolio, (portfolio) => portfolio.user)
	portfolios: Portfolio[];
}
