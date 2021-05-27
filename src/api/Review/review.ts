import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import { Camp, CampInfo } from "../../model/camp";
import moment from "moment";
import { Review, ReviewInterface } from "../../model/review";

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

async function getAllReview(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const rows = await db("select * from review where camp_id=?", [camp_id]);

    const list: Array<ReviewInterface> = JSON.parse(JSON.stringify(rows));
    const data: Array<Review> = [];

    list.forEach((value) => {
      value.regDate = formatDate(value.regDate);
      const review = new Review(value);
      data.push(review);
    });

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}

export { getAllReview };
