import { Router } from "express";
import { getAllReview } from "./review";

const router = Router();

router.get("/allReview/:camp_id", getAllReview);

export default router;
