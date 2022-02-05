import { Response, Request } from "express";
import { getConnection } from "typeorm";
import Course from "../entities/Course";
import Lesson from "../entities/Lesson";
import User from "../entities/User";
import Visit from "../entities/Visit";

//?
//? ─── GET LESSON─────────────────────────────────────────────────────────────────────
//?

const get_lesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let lesson = await getConnection()
      .createQueryBuilder()
      .select("lesson")
      .from(Lesson, "lesson")
      .select(["lesson", "course", "course"])
      .leftJoin("lesson.course", "course")
      .leftJoin("lesson.comments", "comments")
      .leftJoinAndSelect(
        "lesson.results",
        "results",
        "results.userId=:userId",
        { userId: res.locals.user.id }
      )
      .leftJoinAndSelect("lesson.visits", "visits", "visits.userId=:userId", {
        userId: res.locals.user.id,
      })
      .where("lesson.id = :id", { id: id })
      .getOne();
    return res.status(200).json(lesson);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create_visit = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lesson = await Lesson.findOne(id);
    const user = await User.findOne(res.locals.user.id);

    const visit = await Visit.findOne({ where: { lesson, user } });
    if (!visit) {
      await new Visit({ lesson, user, date: new Date().toISOString() }).save();
    } else {
      await Visit.update(visit.id, {
        date: new Date().toISOString(),
      });
    }
    return res.status(200).json({success:"visit created succefully"});
  } catch (error) {
    return res.status(500).json(error);
  }
};
//?
//? ─── GET LESSONS─────────────────────────────────────────────────────────────────────
//?

const get_lessons = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    //const course = await Course.findOne(id);
    // const lesson = await Lesson.find({
    //   where: { course },
    // });
    let lesson = await getConnection()
      .createQueryBuilder()
      .select("lesson")
      .from(Lesson, "lesson")
      .select(["lesson", "course", "course"])
      .leftJoin("lesson.course", "course")
      .leftJoinAndSelect(
        "lesson.results",
        "results",
        "results.userId=:userId",
        { userId: res.locals.user.id }
      )
      .where("course.id = :id", { id: id })
      .orderBy("lesson.createdAt", "ASC")
      .getMany();
    return res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL LESSONS─────────────────────────────────────────────────────────────────────
//?

const get_all_lessons = async (_: Request, res: Response) => {
  try {
    const lesson = await Lesson.find({
      relations: ["course"],
      order: { createdAt: "ASC" },
      where: {},
    });
    console.log(lesson);
    return res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE LESSON─────────────────────────────────────────────────────────────────────
//?

const create_lesson = async (req: Request, res: Response) => {
  const { title, description, body, color, quiz, quizType, embededFile } =
    req.body;
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const new_lesson = await Lesson.create({
      title,
      description,
      color,
      quiz,
      body,
      course,
      quizType,
      embededFile,
    }).save();
    return res.status(200).json(new_lesson);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── CREATE LESSON─────────────────────────────────────────────────────────────────────
//?

const update_lesson = async (req: Request, res: Response) => {
  const { title, description, body, color } = req.body;
  const { id } = req.params;
  try {
    const lesson = await Lesson.findOne(id);
    if (!lesson) throw new Error("no lesson was found");
    const new_lesson = await Lesson.update(id, {
      title,
      description,
      body,
      color,
    });
    return res.status(200).json(new_lesson);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── DELETE LESSON─────────────────────────────────────────────────────────────────────
//?
const delete_lesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Lesson.delete(id);
    return res.status(200).json({ success: "lesson deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_lesson,
  get_lessons,
  create_lesson,
  delete_lesson,
  get_all_lessons,
  update_lesson,
  create_visit,
};
