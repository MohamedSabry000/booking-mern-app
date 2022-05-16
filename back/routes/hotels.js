import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel, countByCity, countByType } from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// TODO::CREATE
router.post("/", verifyAdmin, createHotel)

// TODO::UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// TODO::DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

// TODO::GET
router.get("/find/:id", getHotel)

// TODO::GET ALL
router.get("/", getAllHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

export default router