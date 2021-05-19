import { Router, Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import argon2 from "argon2";

export const registerScheme = yup.object({
  id: yup.string().required(),
  password: yup.string().required(),
  nickname: yup.string().required(),
});

async function register(req: Request, res: Response) {
  try {
    const { id, password, nickname } = registerScheme.validateSync(req.body);
    const search = await db("SELECT id FROM user WHERE id=?", [id]);

    const hashPassword = await argon2.hash(password);
    if (!search[0]) {
      const rows = await db(
        "INSERT INTO user(id, password, name, phone, nickname, birth, schoolgrade, schoolclass) VALUES(?,?,?,?,?,?,?,?)",
        [id, hashPassword, nickname]
      );
      res.send({ success: true });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

async function delUser(req: Request, res: Response) {
  try {
    const rows = await db("DELETE FROM user WHERE id=?", [req.session.id]);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

const router = Router();

router.post("/register", register);
router.delete("/delUser", delUser);