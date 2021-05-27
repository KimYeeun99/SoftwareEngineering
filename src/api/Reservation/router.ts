import { Router } from "express";
import { getReservation } from "./reservation";

const router = Router();

router.get("/userReservation", getReservation);

export default router;
