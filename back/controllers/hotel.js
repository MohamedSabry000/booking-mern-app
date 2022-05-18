import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

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
    const {min, max, limit, ...others} = req.query
    try {
        const hotels = await Hotel.find({...others, cheapestPrice:{$gt: min || 1, $lt: max || 9999}}).limit(limit)
        res.status(201).json(hotels)
    } catch (error) { next(error) }
}

// TODO::COUNT HOTELS BY CITY CONTROLLER
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => Hotel.countDocuments({ city })))
        res.status(201).json(list)
    } catch (error) { next(error) }
}

// TODO::COUNT HOTELS BY TYPE CONTROLLER
export const countByType = async (req, res, next) => {
    try {    
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const chaletCount = await Hotel.countDocuments({ type: "chalet" })
        res.status(201).json([
            {type: "hotel", count: hotelCount},
            {type: "apartments", count: apartmentCount},
            {type: "resorts", count: resortCount},
            {type: "villas", count: villaCount},
            {type: "chalet", count: chaletCount},
        ])
    } catch (error) { next(error) }
}

// TODO::GET HOTEL ROOMS CONTROLLER
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => Room.findById(room)))
        res.status(201).json(list)
    } catch (error) { next(error) }
}