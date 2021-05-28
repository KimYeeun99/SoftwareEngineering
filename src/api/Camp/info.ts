import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import { Camp, CampInfo } from "../../model/camp";
import moment from "moment";
import { Room, RoomInfo } from "../../model/roomType";

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

const campInfoSchema = yup.object({
  name: yup.string().required(),
  contents: yup.string().required(),
});

async function insertCampInfo(req: Request, res: Response) {
  try {
    const { name, contents } = campInfoSchema.validateSync(req.body);

    if (!req.session.isLogedIn) {
      res.status(400).send({
        success: false,
      });
    }
    const writer = req.session.userId;
    console.log(name, writer, contents);
    const rows = await db(
      "insert into campInfo(name, writer, contents) values(?,?,?)",
      [name, writer, contents]
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

async function getAllCampInfo(req: Request, res: Response) {
  try {
    const rows = await db("select * from campInfo order by regdate desc", []);
    const data: Array<CampInfo> = JSON.parse(JSON.stringify(rows));
    const list: Array<Camp> = [];

    data.forEach((value) => {
      const camp = new Camp(value);
      camp.setRegDate(formatDate(value.regDate));
      list.push(camp);
    });

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

async function getOneCampInfo(req: Request, res: Response) {
  try {
    const camp_id = req.params.id;
    const rows1 = await db("select * from campInfo where id = ?", [camp_id]);
    const rows2 = await db("select * from room where camp_id = ?", [camp_id]);

    if (!rows1[0]) {
      res.status(400).send({ success: false });
    } else {
      const read: CampInfo = rows1[0];
      const room: Array<Room> = JSON.parse(JSON.stringify(rows2));

      const detailCamp = new Camp(read);
      detailCamp.setRooms(room);
      detailCamp.setRegDate(formatDate(read.regDate));

      res.json({
        success: true,
        data: detailCamp,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
    });
  }
}

const roomInfoSchema = yup.object({
  camp_id: yup.number().required(),
  name: yup.string().required(),
  price: yup.number().required(),
  info: yup.string().required(),
});

/*
CREATE TABLE `Room` (
	`room_id`	INTEGER AUTO_INCREMENT 	NOT NULL,
    `camp_id` INTEGER,
	`name`	VARCHAR(20) 	NOT NULL,
    `price` INTEGER NOT NULL,
    `info`	Text 	NOT NULL,
	PRIMARY KEY(`room_id`),
    FOREIGN KEY(`camp_id`) REFERENCES CampInfo(`id`) ON DELETE CASCADE
);
*/

async function insertRoomInfo(req: Request, res: Response) {
  try {
    const { camp_id, name, price, info } = roomInfoSchema.validateSync(
      req.body
    );

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

// // async function updateCampInfo(req: Request, res: Response) {
// //   try {
// //     const board_id = Number(req.params.id);
// //     const { title, body } = boardScheme.validateSync(req.body);
// //     const check = await db(
// //       "SELECT user_id FROM board WHERE board_id=? AND user_id=?",
// //       [board_id, req.body.data.id]
// //     );

// //     if (!check[0]) return res.status(401).send({ success: false });

// //     const rows = await db("UPDATE board SET title=?, body=? WHERE board_id=?", [
// //       title,
// //       body,
// //       board_id,
// //     ]);
// //     res.json({
// //       success: true,
// //     });
// //   } catch (error) {
// //     res.status(500).send({
// //       success: false,
// //     });
// //   }
// // }

export {
  getAllCampInfo,
  getOneCampInfo,
  getRoomInfo,
  insertCampInfo,
  insertRoomInfo,
};
