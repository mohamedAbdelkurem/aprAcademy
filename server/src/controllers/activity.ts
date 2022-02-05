import { Response, Request } from "express";
import Course from "../entities/Course";
import Activity from "../entities/Activity";

//?
//? ─── GET ACTIVITY─────────────────────────────────────────────────────────────────────
//?

const get_activity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findOne({
      where: { id },relations:["course"]
    });
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json(error);

  }
};

//?
//? ─── GET ACTIVITYS─────────────────────────────────────────────────────────────────────
//?

const get_activities = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const activity = await Activity.find({
      where: { course },
    });
    console.log(activity);
    return res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);

  }
};

//?
//? ─── GET ALL ACTIVITYS─────────────────────────────────────────────────────────────────────
//?

const get_all_activities = async (_: Request, res: Response) => {
  try {
    const activity = await Activity.find({ relations: ["course"] });
    console.log(activity);
    return res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);

  }
};
//?
//? ─── CREATE ACTIVITY─────────────────────────────────────────────────────────────────────
//?

const create_activity = async (req: Request, res: Response) => {
  const { body, title } = req.body;
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    if (!course) throw new Error("activity not found");
    const new_activity = await Activity.create({
      body,
      course,
      title,
    }).save();
    return res.status(200).json(new_activity);
  } catch (error) {
    console.log(error);
    if (error.message === "activity not found") {
      return res.status(404).json(error);
    }
    {
      return res.status(500).json(error);
    }
  }
};

//?
//? ─── DELETE ACTIVITY─────────────────────────────────────────────────────────────────────
//?
const delete_activity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Activity.delete(id);
    return res.status(200).json({ success: "activity deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);

  }
};

export default {
  get_activity,
  get_activities,
  create_activity,
  delete_activity,
  get_all_activities,
};
