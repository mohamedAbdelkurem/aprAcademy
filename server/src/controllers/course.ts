import { Response, Request } from "express";
import Course from "../entities/Course";
import User from "../entities/User";
import Lesson from "../entities/Lesson";
import Lessona from "../entities/Lessona";
import { getConnection } from "typeorm";

const get_courses = async (_: Request, res: Response) => {
  try {
    const courses = await Course.find({ order: { createdAt: "ASC" } });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const get_courses_match = async (_: Request, res: Response) => {
  try {
    const user: User = res.locals.user;
    const courses = await Course.find({
      where: { level: user.level, type: user.type },
      order: { createdAt: "ASC" },
    });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const get_course = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user;
  try {
    const course = await Course.findOne({
      where: { id },
    });
    let lessons;
    if (user.type === "الثاني") {
      lessons = await getConnection()
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
        .leftJoinAndSelect("lesson.visits", "visits", "visits.userId=:userId", {
          userId: res.locals.user.id,
        })
        .where("course.id = :id", { id: id })
        .orderBy("lesson.createdAt", "ASC")
        .getMany();
    } else {
      lessons = await getConnection()
        .createQueryBuilder()
        .select("lessona")
        .from(Lessona, "lessona")
        .select(["lessona", "course", "course"])
        .leftJoin("lessona.course", "course")
        .leftJoinAndSelect(
          "lessona.results",
          "results",
          "results.userId=:userId",
          { userId: res.locals.user.id }
        )
        .where("course.id = :id", { id: id })
        .orderBy("lessona.order", "ASC")
        .getMany();
    }

    return res.status(200).json({ ...course, lessons: lessons });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const create_course = async (req: Request, res: Response) => {
  const { title, description, details, preview, level, type } = req.body;
  try {
    const new_course = await Course.create({
      title,
      description,
      details,
      preview,
      level,
      type,
    }).save();
    return res.status(200).json(new_course);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const delete_course = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const affected = await Course.delete(id);
    console.log(affected);
    return res.status(200).json({ success: "course deleted succefully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default {
  get_course,
  get_courses,
  create_course,
  delete_course,
  get_courses_match,
};
