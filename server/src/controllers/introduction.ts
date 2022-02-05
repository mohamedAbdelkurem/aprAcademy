import { Response, Request } from "express";
import Course from "../entities/Course";
import Introduction from "../entities/Introduction";

//?
//? ─── GET INTRODUCTION─────────────────────────────────────────────────────────────────────
//?

const get_introduction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const introduction = await Introduction.findOne({
      where: { id },
    });
    return res.status(200).json(introduction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── GET INTRODUCTIONS─────────────────────────────────────────────────────────────────────
//?

const get_introductions = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const introduction = await Introduction.find({
      where: { course },
      relations: ["course"],
    });
    console.log(introduction);
    return res.status(200).json(introduction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL INTRODUCTIONS─────────────────────────────────────────────────────────────────────
//?

const get_all_introductions = async (_: Request, res: Response) => {
  try {
    const introduction = await Introduction.find({ relations: ["course"] });
    console.log(introduction);
    return res.status(200).json(introduction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE INTRODUCTION─────────────────────────────────────────────────────────────────────
//?

const create_introduction = async (req: Request, res: Response) => {
  const { body, title, embededFile } = req.body;
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const new_introduction = await Introduction.create({
      body,
      course,
      title,
      embededFile,
    }).save();
    return res.status(200).json(new_introduction);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── DELETE INTRODUCTION─────────────────────────────────────────────────────────────────────
//?
const delete_introduction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Introduction.delete(id);
    return res.status(200).json({ success: "introduction deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_introduction,
  get_introductions,
  create_introduction,
  delete_introduction,
  get_all_introductions,
};
