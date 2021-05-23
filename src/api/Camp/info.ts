// import { Response, Request } from "express";
// import * as yup from "yup";
// import { db } from "../../db/db";
// import { CampInfo } from "../../model/camp";
// import moment from "moment";

// function formatDate(date) {
//   return moment(date).format("YYYY-MM-DD HH:mm:ss");
// }

// const campInfoSchema = yup.object({
//   name: yup.string().required(),
// });

// // async function insertCampInfo(req: Request, res: Response) {
// //   try {
// //     const { id, body } = campInfoSchema.validateSync(req.body);

// //     const user_id = req.body.data.id;

// //     const rows = await db(
// //       "INSERT INTO board (title, body, user_id) values (?, ?, ?)",
// //       [title, body, user_id]
// //     );
// //     res.send({
// //       success: true,
// //     });
// //   } catch (error) {
// //     res.status(500).send({
// //       success: false,
// //     });
// //   }
// // }

// async function getAllCampInfo(req: Request, res: Response) {
//   try {
//     const rows = await db("select * from campInfo order by regdate desc", []);
//     const data: Array<CampInfo> = JSON.parse(JSON.stringify(rows));
//     const list: Array<CampInfo> = [];

//     data.forEach((value) => {
//       value.regDate = formatDate(value.regDate);
//       list.push(value);
//     });

//     res.json({
//       success: true,
//       data: list,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//     });
//   }
// }

// async function getOneCampInfo(req: Request, res: Response) {
//   try {
//     const camp_id = req.params.id;
//     const rows = await db("select * from camp where id = ?", [camp_id]);

//     if (!rows[0]) {
//       res.status(400).send({ success: false });
//     } else {
//       const read: CampInfo = rows[0];
//       read.regDate = formatDate(read.regDate);

//       res.json({
//         success: true,
//         data: read,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//     });
//   }
// }

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

// export { getAllCampInfo };
