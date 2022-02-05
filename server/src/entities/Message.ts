import { IsEmail, IsNotEmpty } from "class-validator";

import { Entity as ToEntity, Column, Index } from "typeorm";
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";

@ToEntity("messages")
export default class Message extends Entity {
  constructor(message: Partial<Message>) {
    super();
    Object.assign(this, message);
  }




  //
  // ─── FIRSTNAME ──────────────────────────────────────────────────────────────────
  //
  @Column()
  @IsNotEmpty({ message: "this field is required." })
  firstname: string;



  //
  // ─── EMAIL ──────────────────────────────────────────────────────────────────────
  //
  @Index()
  @IsEmail({}, { message: "invalid email." })
  @Column()
  email: string;

 
  //
  // ─── Message Titkle ──────────────────────────────────────────────────────────────────
  //
  @Column()
  @IsNotEmpty({ message: "this field is required." })
  messageTitle: string;

   //
  // ─── Message Titkle ──────────────────────────────────────────────────────────────────
  //
  @Column()
  @IsNotEmpty({ message: "this field is required." })
  message: string;



 


}
