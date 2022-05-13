import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello First Request!")
})
router.get("/register", (req, res) => {
    res.send("Hello, this is Register Request!")
})

export default router