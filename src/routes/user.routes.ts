import { Router } from "express";
import { fetchUser, updateUsername } from "@/controllers/app.controller";
import { claimDailyQuest, claimOneTimeQuest } from "@/controllers/tasks.controller";
import { signUp } from "@/controllers/auth.controller";

const router = Router();

router
  .post("/claim-daily-quest", claimDailyQuest)
  .post("/claim-one-time-quest", claimOneTimeQuest)
  .get("/profile", fetchUser)
  .post("/sign-up", signUp)
	.patch("/update", updateUsername);

export default router;