import { Router } from "express";
import {
  getAllCampInfo,
  getOneCampInfo,
  getRoomInfo,
  insertCampInfo,
  insertRoomInfo,
} from "./info";

const router = Router();

router.get("/allCamp", getAllCampInfo);
router.get("/detailCamp/:id", getOneCampInfo);
router.get("/detailCamp/:camp_id/:room_id", getRoomInfo);

router.post("/insertCamp/", insertCampInfo);
router.post("/insertRoom/", insertRoomInfo);

export default router;
