import Hotel from "../models/Hotel.js"

// TODO::CREATE HOTEL CONTROLLER
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(201).json(savedHotel)
    } catch (error) { next(error) }
}

// TODO::UPDATE HOTEL CONTROLLER
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(201).json(updatedHotel)
    } catch (error) { next(error) }
}

// TODO::DELETE HOTEL CONTROLLER
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(201).json("Hotel has been deleted!")
    } catch (error) { next(error) }
}

// TODO::GET HOTEL CONTROLLER
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(201).json(hotel)
    } catch (error) { next(error) }
}

// TODO::GET ALL HOTEL CONTROLLER
export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(201).json(hotels)
    } catch (error) { next(error) }
}