import { Router } from "express";
import { fetchUser, referralInfo, updateUsername } from "@/controllers/app.controller";
import { claimDailyQuest, claimOneTimeQuest } from "@/controllers/tasks.controller";
import { signUp } from "@/controllers/auth.controller";
import { authenticateUser } from "@/middlewares/auth.middleware";

const router = Router();

router
	.post("/claim-daily-quest", authenticateUser, claimDailyQuest)
	.post("/claim-one-time-quest", authenticateUser, claimOneTimeQuest)
	.get("/profile", authenticateUser, fetchUser)
	.get("/referrerInfo", authenticateUser, referralInfo)
	.post("/sign-up", signUp)
	.patch("/update", authenticateUser, updateUsername);

export default router;