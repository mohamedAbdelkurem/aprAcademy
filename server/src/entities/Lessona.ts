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
  ManyToOne,
  OneToMany,
} from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Course from "./Course";
import Result from "./Result";
import Comment from "./Comment";
import Visit from "./Visit";

// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("lessonsa")
export default class Lessona extends Entity {
  constructor(lessona: Partial<Lessona>) {
    super();
    Object.assign(this, lessona);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

  @Column()
  order: number;
  //
  // ─── DESCRIPTION ────────────────────────────────────────────────────────────────
  //

  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  description: string;

  //
  // ─── COLOR ────────────────────────────────────────────────────────────────
  //
  @Column()
  color: string;
  //
  // ─── QUIZ ────────────────────────────────────────────────────────────────
  //

  @Column({ nullable: true })
  quiz: string;
  //
  // ─── EMBDEDED FILE ──────────────────────────────────────────────────────────
  //

  @Column({ nullable: true })
  embededFile: string;
  //
  // ─── QUIZTYPE ────────────────────────────────────────────────────────────────
  //

  @Column({ nullable: true })
  quizType: string;
  //
  // ─── BODY ────────────────────────────────────────────────────────────────
  //

  @Column({
    type: "text",
  })
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  body: string;

  //
  // ─── lesosn a HAVE MANY Results ───────────────────────────────────────────────────
  //
  @OneToMany(() => Result, (result) => result.lessona, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  results: Result[];

  //
  // ─── LESSONA HAVE MANY VISITS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Visit, (visit) => visit.lesson, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  visits: Visit[];

  //
  // ─── LESSON BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Course, (course) => course.lessonsa, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  course: Course;

  @OneToMany(() => Comment, (comment) => comment.lessona, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
