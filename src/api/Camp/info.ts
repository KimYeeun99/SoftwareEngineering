import { Router, Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";

// async function getAllCampList(req: Request, res: Response) {
//   try {
//     const rows = await db("select * from camp", []);
//     const data: Array<Board> = JSON.parse(JSON.stringify(rows));
//     const list: Array<Board> = [];

//     data.forEach((value) => {
//       value.regdate = formatDate(value.regdate);
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
