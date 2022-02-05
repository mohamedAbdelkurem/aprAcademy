
//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import { Entity as ToEntity, Column, Index, ManyToOne } from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Lesson from "./Lesson";
import Lessona from "./Lessona";
import Question from "./Question";
import User from "./User";

// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("comments")
export default class Comment extends Entity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  //
  // ─── DURATION ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column({ type: "text",nullable:false })
  body: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lesson: Lesson;

  @ManyToOne(() => Lessona, (lessona) => lessona.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lessona: Lessona;

  @ManyToOne(() => User, (user) => user.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Question, (question) => question.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  question: Question;
}
