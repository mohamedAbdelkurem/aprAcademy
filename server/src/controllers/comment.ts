import { Response, Request } from "express";
import User from "../entities/User";
import Lesson from "../entities/Lesson";
import Lessona from "../entities/Lessona";
import Comment from "../entities/Comment";
import Question from "../entities/Question";
const get_comments_l = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findOne(req.params.lessonId);
    console.log(lesson);
    const comments = await Comment.find({
      where: { lesson },
      relations: ["user"],
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const get_comments_q = async (req: Request, res: Response) => {
  try {
    const question = await Question.findOne(req.params.questionId);
    const comments = await Comment.find({
      where: { question },
      relations: ["user"],
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const get_comments_la = async (req: Request, res: Response) => {
  try {
    const lessona = await Lessona.findOne({
      where: { order: req.params.order },
    });
    console.log(lessona);
    const comments = await Comment.find({
      where: { lessona },
      relations: ["user"],
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const create_comment_lesson = async (req: Request, res: Response) => {
  const { body } = req.body;
  const errors: any = {};
  try {
    if (body.trim().length === 0) errors.body = "لا يمكن ترك هذا الحقل فارغ";
    if (Object.keys(errors).length > 0) throw new Error("validation errors");
    const user = await User.findOne(res.locals.user.id);
    const lesson = await Lesson.findOne(req.params.lessonId);
    const new_comment = await Comment.create({
      body,
      user,
      lesson,
    }).save();
    return res.status(200).json(new_comment);
  } catch (error) {
    switch (error.message) {
      case "validation errors":
        return res.status(500).json(errors);
      default:
        return res.status(500).json(error);
    }
  }
};
const create_comment_lessona = async (req: Request, res: Response) => {
  const { body } = req.body;
  const errors: any = {};
  
  try {
    if (body.trim().length === 0) errors.body = "لا يمكن ترك هذا الحقل فارغ";
    if (Object.keys(errors).length > 0) throw new Error("validation errors");
    const user = await User.findOne(res.locals.user.id);
    const lessona = await Lessona.findOne({
      where: { order: req.params.order },
    });
    const new_comment = await Comment.create({
      body,
      user,
      lessona,
    }).save();
    return res.status(200).json(new_comment);
  } catch (error) {
    switch (error.message) {
      case "validation errors":
        return res.status(500).json(errors);
      default:
        return res.status(500).json(error);
    }
  }
};

const create_comment_question = async (req: Request, res: Response) => {
  const { body } = req.body;
  const errors: any = {};

  try {
    if (body.trim().length === 0) errors.body = "لا يمكن ترك هذا الحقل فارغ";
    if (Object.keys(errors).length > 0) throw new Error("validation errors");
    const user = await User.findOne(res.locals.user.id);
    const question = await Question.findOne({
      where: { id: req.params.questionId },
    });
    const new_comment = await Comment.create({
      body,
      user,
      question,
    }).save();
    return res.status(200).json(new_comment);
  } catch (error) {
    switch (error.message) {
      case "validation errors":
        return res.status(500).json(errors);
      default:
        return res.status(500).json(error);
    }
  }
};
const delete_comment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(res.locals.user.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    const comment = await Comment.findOne({ where: { id, user } });
    if (!comment) return res.status(200).json({ error: "comment not found" });
    await Comment.delete(id);
    return res.status(200).json({ success: "comment deleted succefully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const delete_comment_q = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(res.locals.user.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    const comment = await Comment.findOne({ where: { id, user } });
    if (!comment) return res.status(200).json({ error: "comment not found" });
    await Comment.delete(id);
    return res.status(200).json({ success: "comment deleted succefully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default {
  get_comments_l,
  get_comments_la,
  get_comments_q,
  delete_comment,
  delete_comment_q,
  create_comment_lesson,
  create_comment_lessona,
  create_comment_question,
};
