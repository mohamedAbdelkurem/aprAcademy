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

@ToEntity("videos")
export default class Video extends Entity {
  constructor(video: Partial<Video>) {
    super();
    Object.assign(this, video);
  }

  //
  // ─── TITLE ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  title: string;

  //
  // ─── Link ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  link: string;

  //
  // ─── DURATION ─────────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column()
  @IsNotEmpty({ message: "هذا الحقل ضروري" })
  duration: string;

  //
  // ─── Videos BELONGS TO COURSE ─────────────────────────────────────────────────
  //

  @ManyToOne(() => Course, (course) => course.videos, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  course: Course;
}
