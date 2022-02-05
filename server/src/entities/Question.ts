//
// ─MODULES ─────────────────────────────────────────────────────────────────
//
import { IsNotEmpty } from "class-validator";

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import {
  Entity as ToEntity,
  Column,
  Index,
  OneToMany,
  ManyToOne,
} from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Comment from "./Comment";
import User from "./User";

// ────────────────────────────────────────────────────────────────────────────────
//
// ─── ENUMS ──────────────────────────────────────────────────────────────────────
//

export enum Type {
  FIRST = "الأول",
  SECOND = "الثاني",
}
export enum Level {
  BEGINNER = "مبتدئ",
  ADVANCED = "خبير",
}
@ToEntity("questions")
export default class Question extends Entity {
  constructor(question: Partial<Question>) {
    super();
    Object.assign(this, question);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

  // ─── BODY ────────────────────────────────────────────────────────────────
  //

  @Column({
    type: "text",
  })
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  body: string;

  @Column({
    type: "enum",
    enum: Type,
    nullable: true,
  })
  type: Type;

  //
  // ─── LEVEL ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    enum: Level,
    nullable: true,
  })
  level: Level;

  @OneToMany(() => Comment, (comment) => comment.question, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.questions, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;
}
