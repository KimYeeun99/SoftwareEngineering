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

async function updateCampInfo(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const { name, contents } = campInfoSchema.validateSync(req.body);
    const search = await db("select writer from campInfo where id=?", [
      camp_id,
    ]);

    if (!(req.session.userId === search[0].writer)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db(
        "update campInfo set name=?, contents=? where id=?",
        [name, contents, camp_id]
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

async function deleteCampInfo(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const search = await db("select writer from campInfo where id=?", [
      camp_id,
    ]);

    if (!(req.session.userId === search[0].writer)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db("delete from campInfo where id=?", [camp_id]);
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
  getAllCampInfo,
  getOneCampInfo,
  insertCampInfo,
  updateCampInfo,
  deleteCampInfo,
};
