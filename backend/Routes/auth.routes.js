import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
const app = express()
const router = express.Router()
import { signup, login,logout,updateProfile, check} from "../controllers/auth.controller.js";

router.post("/signup",signup);
router.post("/login",login);

router.post("/logout",logout)


router.put("/update-profile",protectRoute,updateProfile)

router.get("/check",protectRoute,check)
export default router;