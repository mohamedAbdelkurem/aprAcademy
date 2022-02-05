import { Response, Request } from "express";
import User from "../entities/User";
import Certificate from "../entities/Certificate";

const get_certificate = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const certificate = await Certificate.findOne({where:{id},relations:["user"]});
    return res.status(200).json(certificate);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create_certificate = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findOne(id);
    const new_certificate = await Certificate.create({
      user,
    }).save();
    return res.status(200).json(new_certificate);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const delete_certificate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Certificate.delete(id);
    return res.status(200).json({ success: "course deleted succefully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default {
  get_certificate,
  create_certificate,
  delete_certificate,
};
