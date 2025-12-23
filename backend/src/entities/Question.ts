import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	// CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	// UpdateDateColumn,
} from "typeorm";
import { Choice } from "./Choice";
import { Quiz } from "./Quiz";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: "text", nullable: false })
	title: string;

	@Field()
	@OneToMany(
		() => Choice,
		(choice) => choice.question,
	)
	choices: Choice[];

	@Field()
	@ManyToOne(
		() => Quiz,
		(quiz) => quiz.questions,
	)
	quiz: Quiz;
}
