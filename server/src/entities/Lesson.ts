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

@ToEntity("lessons")
export default class Lesson extends Entity {
  constructor(lesson: Partial<Lesson>) {
    super();
    Object.assign(this, lesson);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

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
  // ─── COURSE HAVE MANY Results ───────────────────────────────────────────────────
  //
  @OneToMany(() => Result, (result) => result.lesson, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  results: Result[];


   //
  // ─── COURSE HAVE MANY VISITS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Visit, (visit) => visit.lesson, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  visits: Visit[];


  @OneToMany(() => Comment, (comment) => comment.lesson, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  comments: Comment[];
  //
  // ─── LESSON BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Course, (course) => course.lessons, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  course: Course;


}
