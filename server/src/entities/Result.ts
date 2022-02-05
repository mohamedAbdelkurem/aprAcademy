//

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import { Entity as ToEntity, Column, ManyToOne } from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Lesson from "./Lesson";
import Lessona from "./Lessona";
import User from "./User";

// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("results")
export default class Result extends Entity {
  constructor(result: Partial<Result>) {
    super();
    Object.assign(this, result);
  }
  @Column()
  userId: string;

  //
  // ─── Time ─────────────────────────────────────────────────────────────────────
  //
  @Column()
  passed: boolean;
  // ─── LESSON BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Lesson, (lesson) => lesson.results, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lesson: Lesson;
  // ─── LESSONABELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Lessona, (lessona) => lessona.results, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lessona: Lessona;
  // ─── RESULTS BELONGS TO USER ─────────────────────────────────────────────────
  //

  @ManyToOne(() => User, (user) => user.results, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;
}
