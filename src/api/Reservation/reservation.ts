import { Response, Request } from "express";
import moment from "moment";
import * as yup from "yup";
import { db } from "../../db/db";
import { iUser } from "../../model/register";
import { Reservation, ReserveInterface } from "../../model/reservation";
import { Room } from "../../model/roomType";

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const registerScheme = yup.object({
  user: yup.object().shape({
    id: yup.string().required(),
    password: yup.string().required(),
    isHost: yup.boolean().required(),
  }),
  name: yup.string().required(),
  businessNum: yup.string().required(),
});

async function getReservation(req: Request, res: Response) {
  try {
    const rows = await db(
      "select * from reservation where user_id =? order by startDate desc",
      [req.body.id]
    );

    const data: Array<ReserveInterface> = JSON.parse(JSON.stringify(rows));
    const list: Array<Reservation> = [];

    data.forEach(async (value) => {
      const detailRoom = await db("select * from room where room_id=?", [
        value.room_id,
      ]);
      const detailUser = await db("select * from user where id=?", [
        req.body.id,
      ]);

      const room: Room = detailRoom[0];
      const user: iUser = detailUser[0];

      value.room = room;
      value.customer = user;

      const reservation = new Reservation(value);

      reservation.setStartDate(formatDate(value.startDate));
      reservation.setEndDate(formatDate(value.endDate));

      list.push(reservation);
    });

    await delay(300);

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}

export { getReservation };
