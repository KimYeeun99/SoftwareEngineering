import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import { Camp, CampInfo } from "../../model/camp";
import moment from "moment";
import { Room, RoomInfo } from "../../model/roomType";

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

const roomInfoSchema = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  info: yup.string().required(),
});

async function insertRoomInfo(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const { name, price, info } = roomInfoSchema.validateSync(req.body);

    const rows = await db(
      "INSERT INTO room (camp_id, name, price, info) values (?, ?, ?, ?)",
      [camp_id, name, price, info]
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}

async function getRoomInfo(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const room_id = req.params.room_id;
    const rows = await db(
      "select * from room where camp_id=? and room_id = ?",
      [camp_id, room_id]
    );

    if (!rows[0]) {
      res.status(400).send({ success: false });
    } else {
      const read: Room = rows[0];
      const room = new RoomInfo(read);

      res.json({
        success: true,
        data: room,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
    });
  }
}

async function updateRoom(req: Request, res: Response) {
  try {
    const room_id = req.params.room_id;
    const { name, price, info } = roomInfoSchema.validateSync(req.body);
    const search = await db(
      "select (select writer from campInfo where id=room.camp_id) as writer from room where room_id=?",
      [room_id]
    );

    if (!(req.session.userId === search[0].writer)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db(
        "update room set name=?, price=?, info=? where room_id=?",
        [name, price, info, room_id]
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

async function deleteRoom(req: Request, res: Response) {
  try {
    const room_id = req.params.room_id;
    const search = await db(
      "select (select writer from campInfo where id=room.camp_id) as writer from room where room_id=?",
      [room_id]
    );

    if (!(req.session.userId === search[0].writer)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db("delete from room where room_id=?", [room_id]);
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

export { getRoomInfo, insertRoomInfo, updateRoom, deleteRoom };
