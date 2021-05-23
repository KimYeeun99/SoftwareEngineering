import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import argon2 from "argon2";
import { RegisterHostClass, iUser } from "../../model/register";

const registerScheme = yup.object({
  user: yup.object().shape({
    id: yup.string().required(),
    password: yup.string().required(),
    isHost: yup.boolean().required(),
  }),
  name: yup.string().required(),
  businessNum: yup.string().required(),
});

async function register(req: Request, res: Response) {
  try {
    const { user, name, businessNum } = registerScheme.validateSync(req.body);

    const host: RegisterHostClass = new RegisterHostClass(
      user as iUser,
      name,
      businessNum
    );

    const search1 = await db("SELECT id FROM host WHERE id=?", [
      host.getUserInfo().id,
    ]);
    const search2 = await db("SELECT id FROM user WHERE id=?", [
      host.getUserInfo().id,
    ]);

    const hashPassword = await argon2.hash(user.password);
    if (!(search1[0] || search2[0])) {
      const rows = await db(
        "INSERT INTO host(id, password, isHost, name, businessNum) VALUES(?,?,?,?,?)",
        [
          host.getUserInfo().id,
          hashPassword,
          true,
          host.getName(),
          host.getBusinessNum(),
        ]
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
    const rows = await db("DELETE FROM host WHERE id=?", [req.session.id]);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

export { register, delUser };
