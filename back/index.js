import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
        // console.log(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from mongoDB!")
})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})

app.listen(8800, () => {
    connect()
    console.log("Connected to Backend");
})