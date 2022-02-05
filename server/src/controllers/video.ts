import { Response, Request } from "express";
import Course from "../entities/Course";
import Video from "../entities/Video";

//?
//? ─── GET VIDEO─────────────────────────────────────────────────────────────────────
//?

const get_video = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({
      where: { id },
      relations: ["course"],
    });
    console.log(video)
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── GET VIDEOS─────────────────────────────────────────────────────────────────────
//?

const get_videos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const video = await Video.find({
      where: { course },
      relations: ["course"],
    });
    console.log(video);
    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL VIDEOS─────────────────────────────────────────────────────────────────────
//?

const get_all_videos = async (_: Request, res: Response) => {
  try {
    const video = await Video.find({ relations: ["course"] });
    console.log(video);
    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE VIDEO─────────────────────────────────────────────────────────────────────
//?

const create_video = async (req: Request, res: Response) => {
  const { duration, link, title } = req.body;
  const { id } = req.params;
  try {
    const course = await Course.findOne(id);
    const new_video = await Video.create({
      title,
      course,
      duration,
      link,
    }).save();
    return res.status(200).json(new_video);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── DELETE VIDEO─────────────────────────────────────────────────────────────────────
//?
const delete_video = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Video.delete(id);
    return res.status(200).json({ success: "video deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_video,
  get_videos,
  create_video,
  delete_video,
  get_all_videos,
};
