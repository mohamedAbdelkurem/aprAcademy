import { Response, Request } from "express";
import { getConnection } from "typeorm";
import Course from "../entities/Course";
import Lessona from "../entities/Lessona";

//?
//? ─── GET LESSON TYPE A─────────────────────────────────────────────────────────────────────
//?

const get_lessona = async (req: Request, res: Response) => {
  const { order,courseId } = req.params;
  try {
    let lessona = await getConnection()
    .createQueryBuilder()
    .select("lessona")
    .from(Lessona, "lessona")
    .select(["lessona", "course", "course"])
    .leftJoin("lessona.course", "course")
    .leftJoin("lessona.comments", "comments")
    .leftJoinAndSelect(
      "lessona.results",
      "results",
      "results.userId=:userId",
      { userId: res.locals.user.id }
    )
    .where("lessona.order = :order", { order })
    .andWhere("course.id = :courseId", { courseId })
    .orderBy("lessona.order","ASC")
    .getOne();
    return res.status(200).json(lessona);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── GET LESSON TYPE AS─────────────────────────────────────────────────────────────────────
//?

const get_lessonsa = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    //const course = await Course.findOne(id);
    // const lessona = await Lessona.find({
    //   where: { course },
    // });
    let lessona = await getConnection()
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
    return res.status(200).json(lessona);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL LESSON TYPE AS─────────────────────────────────────────────────────────────────────
//?

const get_all_lessonsa = async (_: Request, res: Response) => {
  try {
    let lessona = await getConnection()
    .createQueryBuilder()
    .select("lessona")
    .from(Lessona, "lessona")
    .select(["lessona", "course", "course"])
    .leftJoin("lessona.course", "course")
    .where("course.type = :type", { type: "الأول" })
    .andWhere("course.level = :level", { level: "خبير" })
    .orderBy("lessona.order", "ASC")
    .getMany();
    // const lessona = await Lessona.find({
    //   relations: ["course"],
    //   order: { order: "ASC" },
    // });
    console.log(lessona);
    return res.status(200).json(lessona);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE LESSON TYPE A─────────────────────────────────────────────────────────────────────
//?

const create_lessona = async (req: Request, res: Response) => {
  const {
    title,
    description,
    body,
    color,
    quiz,
    quizType,
    embededFile,
    order,
  } = req.body;
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const new_lessona = await Lessona.create({
      title,
      description,
      color,
      quiz,
      body,
      course,
      quizType,
      order,
      embededFile,
    }).save();
    return res.status(200).json(new_lessona);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── CREATE LESSON TYPE A─────────────────────────────────────────────────────────────────────
//?

const update_lessona = async (req: Request, res: Response) => {
  const { title, description, body, color } = req.body;
  const { id } = req.params;
  try {
    const lessona = await Lessona.findOne(id);
    if (!lessona) throw new Error("no lessona was found");
    const new_lessona = await Lessona.update(id, {
      title,
      description,
      body,
      color,
    });
    return res.status(200).json(new_lessona);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── DELETE LESSON TYPE A─────────────────────────────────────────────────────────────────────
//?
const delete_lessona = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Lessona.delete(id);
    return res.status(200).json({ success: "lessona deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_lessona,
  get_lessonsa,
  create_lessona,
  delete_lessona,
  get_all_lessonsa,
  update_lessona,
};
