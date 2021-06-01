import { Router } from "express";
import {
  getReservation,
  postReservation,
  updateReservation,
  deleteReservation,
  hostReservation,
} from "./reservation";

const router = Router();

router.get("/userReservation", getReservation);
router.post("/insertReservation", postReservation);
router.put("/updateReservation/:reserve_id", updateReservation);
router.delete("/deleteReservation/:reserve_id", deleteReservation);
router.get("/hostReservation", hostReservation);

export default router;
