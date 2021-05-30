import { Router } from "express";
import {
  getAllReview,
  getOneReview,
  postReview,
  updateReview,
  deleteReview,
} from "./review";

const router = Router();

router.get("/allReview/:camp_id", getAllReview);
router.get("/allReview/:camp_id/:review_id", getOneReview);
router.post("/insertReview", postReview);
router.put("/updateReview/:review_id", updateReview);
router.delete("/deleteReview/:review_id", deleteReview);

export default router;
