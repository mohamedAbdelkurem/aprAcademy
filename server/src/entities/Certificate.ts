//
// ─MODULES ─────────────────────────────────────────────────────────────────
//

//
// ─── TYPEORM DECORATORS ─────────────────────────────────────────────────────────
//
import { Entity as ToEntity,ManyToOne } from "typeorm";

//
// ─── ENTITIES ───────────────────────────────────────────────────────────────────
//
import Entity from "./Entity";
import User from "./User";

// ────────────────────────────────────────────────────────────────────────────────

@ToEntity("certificates")
export default class Certificate extends Entity {
  constructor(certificate: Partial<Certificate>) {
    super();
    Object.assign(this, certificate);
  }



  @ManyToOne(() => User, (user) => user.certificates, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;
}
