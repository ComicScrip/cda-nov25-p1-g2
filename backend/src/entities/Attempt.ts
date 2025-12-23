import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Reward } from "./Reward";
import { Quiz } from "./Quiz";
import { User } from "./User";

@ObjectType()
@Entity()
export class Attempt extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	started_at: Date;

	@Field()
	@Column()
	score: number;

	@Field()
	@Column()
	percentage_success: number;

	@Field()
	@Column()
	finished_at: Date;

	@Field()
	@Column()
	duration: number;

	@Field()
	@Column()
	passed: boolean;

	@Field()
	@ManyToOne(() => User)
	user: User;

	@Field()
	@ManyToOne(() => Quiz)
	quiz: Quiz;
}
