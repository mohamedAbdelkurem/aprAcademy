import dayjs from "dayjs";
import { Response, Request } from "express";
import { getConnection } from "typeorm";
import Course from "../entities/Course";
import Lesson from "../entities/Lesson";
import Lessona from "../entities/Lessona";
import Result from "../entities/Result";
import User from "../entities/User";

//?
//? ─── GET RESULT─────────────────────────────────────────────────────────────────────
//?

const get_result = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lesson = await Lesson.findOne(id);
    const user = await User.findOne(res.locals.user.id);
    const result = await Result.findOne({
      where: { lesson, user },
    });
    if (!result)
      res.status(404).json({ error: "لم تقم بتجاوز هذا الإختبار من قبل" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── GET RESULTS─────────────────────────────────────────────────────────────────────
//?

const get_results = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Lesson.findOne(id);
    const result = await Result.find({
      where: { course },
    });
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL RESULTS─────────────────────────────────────────────────────────────────────
//?

const get_all_results = async (_: Request, res: Response) => {
  try {
    const result = await Result.find({ relations: ["course"] });
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE RESULT─────────────────────────────────────────────────────────────────────
//?

const create_result_lessona = async (req: Request, res: Response) => {
  const { passed, score } = req.body;
  console.log(score);
  const { id } = req.params;
  try {
    const lessona = await Lessona.findOne(id);
    const user = await User.findOne(res.locals.user.id);
    if (!user) return res.status(404).json({ error: "user not found" });

    if (Number(score) < 100) {
      return res.status(400).json({ error: " score not enough" });
    } else {
      const new_result = await Result.create({
        lessona,
        passed,
        user,
      }).save();
      await User.update(user?.id, {
        progress: user?.progress + 1,
      });
      return res.status(200).json(new_result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const create_result_lesson = async (req: Request, res: Response) => {
  const { passed, score } = req.body;
  const { id } = req.params;
  try {
    const lesson = await Lesson.findOne(id);
    const user = await User.findOne(res.locals.user.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    const result = await Result.findOne({ where: { lesson, user } });
    if (result) throw new Error("already exist");
    if (score < 100) {
      return res.status(400).json({ error: " score not enough" });
    } else {
      const new_result = await Result.create({
        lesson,
        passed,
        user,
      }).save();
      return res.status(200).json(new_result);
    }
  } catch (error) {
    console.log(error);
    if (error.message === "already exist")
      return res.status(400).json({ error: "result already exist" });
    return res.status(500).json(error);
  }
};
//?
//? ─── DELETE RESULT─────────────────────────────────────────────────────────────────────
//?
const delete_result = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Result.delete(id);
    return res.status(200).json({ success: "result deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── CHECK USER FOR FINAL QUIZ ─────────────────────────────────────────────────────────────────
//?
const check_user = async (_: Request, res: Response) => {
  const { id } = res.locals.user;
  try {
    const user = await User.findOne(id);
    let courses;
    let lessonsCount = 0;
    console.log(user);
    if (user?.type === "الثاني") {
      courses = await Course.find({
        where: {
          type: user?.type,
          level: user?.level,
        },
        relations: ["lessons"],
      });
      courses.forEach((c) => (lessonsCount = lessonsCount + c.lessons.length));
    } else {
      courses = await Course.find({
        where: {
          type: user?.type,
          level: user?.level,
        },
        relations: ["lessonsa"],
      });
      courses.forEach((c) => (lessonsCount = lessonsCount + c.lessonsa.length));
    }
    const user_results = await User.findOne({
      where: { id: res.locals.user.id },
      relations: ["results"],
    });
    return res
      .status(200)
      .json({ lessonsCount, results: user_results?.results?.length });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const graduateUser = async (_: Request, res: Response) => {
  const { id } = res.locals.user;
  try {
    const user = await User.findOne(id);
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        graduated: true,
        finishedAt: new Date().toISOString(),
        timespent: dayjs(new Date().toISOString()).diff(
          dayjs(user?.startedAt),
          "second"
        ),
      })
      .where("id = :id", { id })
      .execute();
    return res.status(200).json({ success: "user graduated succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_result,
  get_results,
  create_result_lessona,
  create_result_lesson,
  delete_result,
  get_all_results,
  check_user,
  graduateUser,
};
