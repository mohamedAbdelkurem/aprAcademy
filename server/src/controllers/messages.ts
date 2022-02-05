import { Response, Request } from "express";
import Message from "../entities/Message";


const get_messages = async (_: Request, res: Response) => {
    try {
      const messages = await Message.find();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(200).json(error);
    }
  };


  const get_message = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const message = await Message.findOne({
        where: { id }
    
      });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(200).json(error);
    }
  };


  const create_message= async (req: Request, res: Response) => {
    const { firstname, email, messageTitle, message  } = req.body;
    try {
      const new_message = await Message.create({
        firstname,
        email,
        message,
        messageTitle
        
      }).save();
      return res.status(200).json(new_message);
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  };

  export const delete_message = async (req: Request, res: Response) => {
    try {
      const message = await Message.delete(req.params.id);
      if (!message) throw new Error("NOT FOUND");
      return res.json({ success: "message deleted succefully." });
    } catch (error) {
      switch (error.message) {
        case "NOT FOUND":
          return res.status(404).json({ error: error.message });
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };


  export default {get_messages, get_message, create_message,delete_message };