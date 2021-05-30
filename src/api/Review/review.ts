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

const reviewSchema = yup.object({
  camp_id: yup.number().required(),
  rating: yup.number().required(),
  title: yup.string().required(),
  body: yup.string().required(),
});

async function postReview(req: Request, res: Response) {
  try {
    const { camp_id, rating, title, body } = reviewSchema.validateSync(
      req.body
    );
    const rows = await db(
      "insert into review(camp_id, user_id, rating, title, body) values(?,?,?,?,?)",
      [camp_id, req.session.userId, rating, title, body]
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}

async function updateReview(req: Request, res: Response) {
  try {
    const review_id = req.params.review_id;
    const { camp_id, rating, title, body } = reviewSchema.validateSync(
      req.body
    );
    const search = await db("select user_id from review where review_id=?", [
      review_id,
    ]);

    if (!(req.session.userId === search[0].user_id)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db(
        "update review set camp_id=?, rating=?, title=?, body=? where review_id=?",
        [camp_id, rating, title, body, review_id]
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

async function getOneReview(req: Request, res: Response) {
  try {
    const camp_id = req.params.camp_id;
    const review_id = req.params.review_id;
    const rows = await db(
      "select * from review where review_id=? and camp_id=?",
      [review_id, camp_id]
    );

    const data: ReviewInterface = rows[0] as ReviewInterface;

    data.regDate = formatDate(data.regDate);

    const result: Review = new Review(data);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}

async function deleteReview(req: Request, res: Response) {
  try {
    const review_id = req.params.review_id;
    const search = await db("select user_id from review where review_id=?", [
      review_id,
    ]);

    if (!(req.session.userId === search[0].user_id)) {
      console.log("asd");
      res.status(400).send({
        success: false,
      });
    } else {
      console.log(search[0], req.session.userId);

      const rows = await db("delete from review where review_id=?", [
        review_id,
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

export { getAllReview, getOneReview, postReview, updateReview, deleteReview };
