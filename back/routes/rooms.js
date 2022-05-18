import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// TODO::CREATE
router.post("/:hotelId", verifyAdmin, createRoom)

// TODO::UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

// TODO::DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

// TODO::GET
router.get("/:id", getRoom)

// TODO::GET ALL
router.get("/", getAllRooms)

export default router