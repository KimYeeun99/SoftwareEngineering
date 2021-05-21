import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import argon2 from "argon2";

export const loginScheme = yup.object({
  id: yup.string().required(),
  password: yup.string().required(),
});

async function login(req: Request, res: Response) {
  try {
    const { id, password } = loginScheme.validateSync(req.body);

    const rows = await db("SELECT * FROM user WHERE id=?", [id]);
    if (!rows[0]) res.status(400).send({ success: false });
    else if (await argon2.verify(rows[0].password, password)) {
      req.session.userId = id;
      req.session.password = password;
      req.session.isHost = rows[0].isHost;
      req.session.isLogedIn = true;

      res.send({
        success: true,
      });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

async function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) throw err;
  });
  res.send({ success: true });
}

export { login, logout };
