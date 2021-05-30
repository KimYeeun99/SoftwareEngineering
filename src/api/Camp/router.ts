import { Router } from "express";
import {
  getAllCampInfo,
  getOneCampInfo,
  insertCampInfo,
  updateCampInfo,
  deleteCampInfo,
} from "./camp";
import { getRoomInfo, insertRoomInfo, updateRoom, deleteRoom } from "./room";

const router = Router();

router.get("/allCamp", getAllCampInfo);
router.get("/detailCamp/:id", getOneCampInfo);
router.get("/detailCamp/:camp_id/:room_id", getRoomInfo);

router.post("/insertCamp", insertCampInfo);
router.post("/insertRoom/:camp_id", insertRoomInfo);

router.put("/updateCamp/:camp_id", updateCampInfo);
router.put("/updateRoom/:room_id", updateRoom);

router.delete("/deleteCamp/:camp_id", deleteCampInfo);
router.delete("/deleteRoom/:room_id", deleteRoom);

export default router;
