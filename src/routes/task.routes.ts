import { Router } from "express";
import {
	claimEcosystemTask,
	performCampaignTask,
	setTimer,
	submitTask,
} from "@/controllers/tasks.controller";

const router = Router();

router
  .post("/claim-ecosystem-task", claimEcosystemTask)
  .post("/eco-timer", setTimer)
	.post("/perform-campaign-task", performCampaignTask)
	.post("/submit-task", submitTask);

export default router;
