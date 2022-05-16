import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.status(200).json("hello user, you are Authenticated!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.status(200).json("hello user, you are Authenticated, and you can delete your account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.status(200).json("hello admin, you are Authenticated, and you can delete all accounts!")
// })

// TODO::UPDATE
router.put("/:id", verifyUser, updateUser)

// TODO::DELETE
router.delete("/:id", verifyUser, deleteUser)

// TODO::GET
router.get("/:id", verifyUser, getUser)

// TODO::GET ALL
router.get("/", verifyAdmin, getAllUsers)

export default router