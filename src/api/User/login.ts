import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import argon2 from "argon2";
import { LoginClass } from "../../model/login";

const loginScheme = yup.object({
  id: yup.string().required(),
  password: yup.string().required(),
  isHost: yup.boolean().required(),
});

async function login(req: Request, res: Response) {
  try {
    const { id, password, isHost } = loginScheme.validateSync(req.body);
    const user = new LoginClass(id, password, isHost);
    var sql: string;
    if (user.getIsHost() == true) {
      sql = "SELECT * FROM host WHERE id=?";
    } else {
      sql = "SELECT * FROM user WHERE id=?";
    }

    const rows = await db(sql, [user.getId()]);
    if (!rows[0]) res.status(400).send({ success: false });
    else if (await argon2.verify(rows[0].password, user.getPassword())) {
      req.session.userId = user.getId();
      req.session.isHost = isHost;
      req.session.isLogedIn = true;
      res.send({
        success: true, //return boolean
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
