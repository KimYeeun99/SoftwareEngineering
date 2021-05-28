import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import argon2 from "argon2";
import { RegisterCustomerClass, iUser } from "../../model/register";

const registerScheme = yup.object({
  user: yup.object().shape({
    id: yup.string().required(),
    password: yup.string().required(),
    isHost: yup.boolean().required(),
  }),
  nickname: yup.string().required(),
});

async function cusRegister(req: Request, res: Response) {
  try {
    const { user, nickname } = registerScheme.validateSync(req.body);

    const customer: RegisterCustomerClass = new RegisterCustomerClass(
      user as iUser,
      nickname
    );

    const search1 = await db("SELECT id FROM host WHERE id=?", [
      customer.getUserInfo().id,
    ]);
    const search2 = await db("SELECT id FROM user WHERE id=?", [
      customer.getUserInfo().id,
    ]);

    const hashPassword = await argon2.hash(user.password);
    if (!(search1[0] || search2[0])) {
      const rows = await db(
        "INSERT INTO user(id, password, isHost, nickname) VALUES(?,?,?,?)",
        [customer.getUserInfo().id, hashPassword, true, customer.getNickname()]
      );
      res.send({ success: true });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

async function cusDelUser(req: Request, res: Response) {
  try {
    const rows = await db("DELETE FROM user WHERE id=?", [req.session.id]);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

export { cusRegister, cusDelUser };
