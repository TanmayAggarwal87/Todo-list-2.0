import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js"
import { add, assignTask, deleteTask, displayTask, toggleComplete, toggleStarred } from "../controllers/task.controller.js";



const router = express.Router()

router.post("/add",protectRoute,add)
router.post("/:taskId/toggleComplete",toggleComplete)
router.post("/:taskId/toggleStarred",toggleStarred)
router.delete("/:taskId/delete",protectRoute,deleteTask)
router.post("/:taskId/assignTask",assignTask)
router.get("/displayTask",protectRoute,displayTask)
export default router;