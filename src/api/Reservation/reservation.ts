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

async function getReservation(req: Request, res: Response) {
  try {
    const rows = await db(
      "select * from reservation where user_id =? order by startDate desc",
      [req.session.userId]
    );

    const data: Array<ReserveInterface> = JSON.parse(JSON.stringify(rows));
    const list: Array<Reservation> = [];

    data.forEach(async (value) => {
      const detailRoom = await db("select * from room where room_id=?", [
        value.room_id,
      ]);
      const detailUser = await db("select * from user where id=?", [
        req.session.userId,
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

const reservationSchema = yup.object({
  room_id: yup.number().required(),
  //user_id: yup.string().required(),
  people: yup.number().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  price: yup.number().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

async function postReservation(req: Request, res: Response) {
  try {
    const { room_id, people, name, phone, price, startDate, endDate } =
      reservationSchema.validateSync(req.body);
    const rows = await db(
      "insert into reservation(room_id, user_id, people, name, phone, price, startDate, endDate) values(?,?,?,?,?,?,?,?)",
      [
        room_id,
        req.session.userId,
        people,
        name,
        phone,
        price,
        startDate,
        endDate,
      ]
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
}

async function updateReservation(req: Request, res: Response) {
  try {
    const reserve_id = req.params.reserve_id;
    const { room_id, people, name, phone, price, startDate, endDate } =
      reservationSchema.validateSync(req.body);
    const search = await db(
      "select user_id from reservation where reserve_id=?",
      [reserve_id]
    );

    if (!(req.session.userId === search[0].user_id)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db(
        "update reservation set room_id=?, people=?, name=?, phone=?, price=?, startDate=?, endDate=? where reserve_id=?",
        [room_id, people, name, phone, price, startDate, endDate, reserve_id]
      );
      res.send({
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: error,
    });
  }
}

async function deleteReservation(req: Request, res: Response) {
  try {
    const reserve_id = req.params.reserve_id;
    const search = await db(
      "select user_id from reservation where reserve_id=?",
      [reserve_id]
    );

    if (!(req.session.userId === search[0].user_id)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db("delete from reservation where reserve_id=?", [
        reserve_id,
      ]);
      res.send({
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: error,
    });
  }
}

export {
  getReservation,
  postReservation,
  updateReservation,
  deleteReservation,
};
