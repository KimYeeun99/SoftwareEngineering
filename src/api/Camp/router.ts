import { Router } from "express";
import { getAllCampInfo, getOneCampInfo, getRoomInfo } from "./info";

const router = Router();

router.get("/allCamp", getAllCampInfo);
router.get("/detailCamp/:id", getOneCampInfo);
router.get("/detailCamp/:camp_id/:room_id", getRoomInfo);

export default router;
