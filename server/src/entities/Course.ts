//
// ─MODULES ─────────────────────────────────────────────────────────────────
//
import { IsNotEmpty } from "class-validator";

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import { Entity as ToEntity, Column, Index, OneToMany } from "typeorm";
import Activity from "./Activity";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Lesson from "./Lesson";
import Lessona from "./Lessona";
import Introduction from "./Introduction";
import Video from "./Video";

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
// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("courses")
export default class Course extends Entity {
  constructor(course: Partial<Course>) {
    super();
    Object.assign(this, course);
  }

  //
  // ─── TITLE ───────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column({ unique: true })
  @IsNotEmpty({ message: "this field is required." })
  title: string;

  //
  // ─── DESCRIPTION ────────────────────────────────────────────────────────────────
  //

  @Column()
  @IsNotEmpty({ message: "this field is required." })
  description: string;

  //
  // ─── DETAILLS ───────────────────────────────────────────────────────────────────
  //
  @Column({ nullable: true })
  details: string;

  //
  // ─── IMAGE ───────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column({ default: "default_course_thumb.jpg" })
  imageUrn: string;

  //
  // ─── PREVIEW ───────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column({ default: "default_course_thumb.jpg" })
  preview: string;

  //
  // ─── LEVEL ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    enum: Level,
  })
  level: Level;

  //
  // ─── TYPE ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    enum: Type,
  })
  type: Type;

  //
  // ─── RELATIONS ──────────────────────────────────────────────────────────────────
  //

  //
  // ─── COURSE HAVE MANY LESSONS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Lessona, (lessona) => lessona.course, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lessonsa: Lessona[];

  @OneToMany(() => Lesson, (lesson) => lesson.course, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  lessons: Lesson[];

  //
  // ─── COURSE HAVE MANY ACTIVITIES ───────────────────────────────────────────────────
  //
  @OneToMany(() => Activity, (activity) => activity.course, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  activities: Activity[];

  //
  // ─── COURSE HAVE MANY VIDEOS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Video, (video) => video.course, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  videos: Video[];

  //
  // ─── COURSE HAVE MANY INTRODUCTIONS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Introduction, (introduction) => introduction.course, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  introductions: Introduction[];
}
