import { Response, Request } from "express";
import Question from "../entities/Question";
import User from "../entities/User";

//?
//? ─── GET QUESTION
//?

const get_question = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({
      where: { id },
      relations: ["user", "comments"],
    });
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL QUESTIONS
//?

const get_all_questions = async (_: Request, res: Response) => {
  try {
    const question = await Question.find({ relations: ["comments", "user"] });
    console.log(question);
    return res.status(200).json(question);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── GET ALL QUESTIONS
//?

const get_my_questions = async (_: Request, res: Response) => {
  try {
    const user = await User.findOne(res.locals.user.id);
    const questions = await Question.find({
      where: { user },
      relations: ["comments", "user"],
    });
    console.log(questions);
    return res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//?
//? ─── CREATE QUESTION
//?

const create_question = async (req: Request, res: Response) => {
  const { body, title } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne(res.locals.user.id);
    const new_question = await Question.create({
      title,
      body,
      user,
    }).save();
    return res.status(200).json(new_question);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//?
//? ─── DELETE QUESTION
//?
const delete_question = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(res.locals.user.id);
    const question = await Question.findOne({
      where: { id },
      relations: ["user"],
    });
    if (
      question?.user.id == res.locals.user.id ||
      user?.role === "admin" ||
      user?.role === "teacher"
    ) {
      console.log("deleting");
      await Question.delete(id);
    }
    return res.status(200).json({ success: "question deleted succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  get_question,
  create_question,
  delete_question,
  get_all_questions,
  get_my_questions
};
