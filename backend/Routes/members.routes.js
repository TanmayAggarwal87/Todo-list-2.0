import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import User from "../models/user.models.js"

import { addMember, listMembers, removeMember } from "../controllers/member.controller.js"


const router = express.Router()

router.post("/add",protectRoute,addMember)
router.post("/remove",protectRoute,removeMember)
router.get("/list",protectRoute,listMembers)




export default router