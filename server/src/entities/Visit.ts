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

@ToEntity("visits")
export default class Visit extends Entity {
  constructor(visit: Partial<Visit>) {
    super();
    Object.assign(this, visit);
  }
  @Column()
  userId: string;

  @Column()
  date: string;
  // ─── LESSON BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Lesson, (lesson) => lesson.visits, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lesson: Lesson;
  // ─── LESSONABELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Lessona, (lessona) => lessona.visits, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lessona: Lessona;
  // ─── RESULTS BELONGS TO USER ─────────────────────────────────────────────────
  //

  @ManyToOne(() => User, (user) => user.visits, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;
}
