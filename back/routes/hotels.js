import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js"

const router = express.Router()

// TODO::CREATE
router.post("/", createHotel)

// TODO::UPDATE
router.put("/:id", updateHotel)

// TODO::DELETE
router.delete("/:id", deleteHotel)

// TODO::GET
router.get("/:id", getHotel)

// TODO::GET ALL
router.get("/", getAllHotels)

export default router