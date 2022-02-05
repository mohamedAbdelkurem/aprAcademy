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

@ToEntity("introductions")
export default class Introduction extends Entity {
  constructor(introduction: Partial<Introduction>) {
    super();
    Object.assign(this, introduction);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

  //
  // ─── embededFile ─────────────────────────────────────────────────────────────────────
  //
  @Column({nullable:true})
  embededFile: string;
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

  @ManyToOne(() => Course, (course) => course.introductions, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  course: Course;
}
