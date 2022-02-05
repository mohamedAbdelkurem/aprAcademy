//
// ─MODULES ─────────────────────────────────────────────────────────────────
//
import { IsNotEmpty } from "class-validator";

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import { Entity as ToEntity, Column, Index, ManyToOne } from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Course from "./Course";

// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("activities")
export default class Activity extends Entity {
  constructor(activity: Partial<Activity>) {
    super();
    Object.assign(this, activity);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

  
  //
  // ─── BODY ────────────────────────────────────────────────────────────────
  //

  @Column({
    type: "text",
  })
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  body: string;
  //
  // ─── LESSON BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Course, (course) => course.activities, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  course: Course;
}
