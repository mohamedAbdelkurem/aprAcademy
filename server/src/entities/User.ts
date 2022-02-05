//
// ─MODULES ─────────────────────────────────────────────────────────────────
//
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Exclude } from "class-transformer";
import bcrypt from "bcrypt";

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import {
  Entity as ToEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import Result from "./Result";
import Comment from "./Comment";
import Certificate from "./Certificate";
import Visit from "./Visit";
import Question from "./Question";

//
// ─── ENUMS ──────────────────────────────────────────────────────────────────────
//
export enum Role {
  ADMIN = "admin",
  USER = "user",
  TEACHER ="teacher"
}
export enum Type {
  FIRST = "الأول",
  SECOND = "الثاني",
}
export enum Level {
  BEGINNER = "مبتدئ",
  ADVANCED = "خبير",
}
// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  //
  // ─── USERNAME ───────────────────────────────────────────────────────────────────
  //
  @Index()
  @Column({ unique: true })
  @Length(3, 255, {
    message: "اسم المستخدم يجب أن يحتوي على ثلاث حروف على الأقل",
  })
  @IsNotEmpty({ message: "ضروري" })
  username: string;

  //
  // ─── FIRSTNAME ──────────────────────────────────────────────────────────────────
  //
  @Column()
  @IsNotEmpty({ message: "ضروري" })
  firstname: string;

  //
  // ─── LASTNAME ───────────────────────────────────────────────────────────────────
  //
  @Column()
  @IsNotEmpty({ message: "ضروري" })
  lastname: string;

  //
  // ─── EMAIL ──────────────────────────────────────────────────────────────────────
  //
  @Index()
  @IsEmail({}, { message: "البريد الإلكتروني غير صالح" })
  @Column({ unique: true })
  email: string;

  //
  // ─── PROGRESS ──────────────────────────────────────────────────────────────────────
  //
  @Column({ default: 1 })
  progress: number;
  //
  // ─── GRADUATED ──────────────────────────────────────────────────────────────────────
  //
  @Column({ default: false })
  graduated: boolean;
  //
  // ─── PASSWORD ───────────────────────────────────────────────────────────────────
  //
  @Exclude()
  @Length(6, 255, {
    message: "يجب أن تحتوي كلمة المرور على ست حروف على الأقل",
  })
  @Column()
  password: string;

  //
  // ─── ROLE ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    default: Role.USER,
    enum: Role,
  })
  role: Role;

  //
  // ─── LEVEL ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    enum: Level,
    nullable: true,
  })
  level: Level;

  //
  // ─── LEVEL ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    nullable: true,
  })
  grade: number;

  //
  // ─── STARTED ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    nullable: true,
  })
  startedAt: string;
  //
  // ─── FINISHEDAT ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    nullable: true,
  })
  finishedAt: string;

  //
  // ─── TIMESPENT ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    nullable: true,
  })
  timespent: number;
  //
  // ─── TYPE ───────────────────────────────────────────────────────────────────────
  //
  @Column({
    type: "enum",
    enum: Type,
    nullable: true,
  })
  type: Type;
  //
  // ─── USER HAVE MANY COMMENTS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Comment, (comment) => comment.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  comments: Comment[];
  //
  //
  // ─── USER HAVE MANY QUESITONS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Question, (question) => question.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  questions: Question[];
  // ─── USER HAVE MANY RESULTS ───────────────────────────────────────────────────
  //
  @OneToMany(() => Result, (result) => result.user, {
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
  //
  // ─── USER HAVE MANY CERTIFICATES ───────────────────────────────────────────────────
  //
  @OneToMany(() => Certificate, (certificate) => certificate.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  certificates: Certificate[];
  //
  // ─── HASH PASSWORD BEFORE INSERT INTO DATABASE ──────────────────────────────────
  //
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
