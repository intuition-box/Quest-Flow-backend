import { Router } from "express";
import { fetchUser, getLeaderboard, referralInfo, updateUsername } from "@/controllers/app.controller";
import { claimDailyQuest, claimOneTimeQuest } from "@/controllers/tasks.controller";
import { signIn, signUp } from "@/controllers/auth.controller";
import { authenticateUser } from "@/middlewares/auth.middleware";

const router = Router();

router
	.post("/claim-daily-quest", authenticateUser, claimDailyQuest)
	.get("/leaderboard", getLeaderboard)
	.post("/claim-one-time-quest", authenticateUser, claimOneTimeQuest)
	.get("/profile", authenticateUser, fetchUser)
	.get("/referrerInfo", authenticateUser, referralInfo)
	.post("/sign-up", signUp)
	.post("/sign-in", signIn)
	.patch("/update", authenticateUser, updateUsername);

export default router;