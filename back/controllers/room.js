import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// TODO::CREATE ROOM CONTROLLER
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const { title, price, maxPeople, description, roomNumbers } = req.body;
    const room = new Room({
        title,
        price,
        maxPeople,
        description,
        roomNumbers
    });

    try {
        const savedRoom = await room.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (error) { next(error); }
        res.status(201).json({ message: 'Room saved successfully' });
    } catch (error) { next(error); }

}

// TODO::UPDATE ROOM CONTROLLER
export const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(201).json(updatedRoom)
    } catch (error) { next(error) }
}

// TODO::DELETE ROOM CONTROLLER
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (error) { next(error); }
        res.status(201).json("Room has been deleted!")
    } catch (error) { next(error) }
}

// TODO::GET ROOM CONTROLLER
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(201).json(room)
    } catch (error) { next(error) }
}

// TODO::GET ALL ROOM CONTROLLER
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(201).json(rooms)
    } catch (error) { next(error) }
}