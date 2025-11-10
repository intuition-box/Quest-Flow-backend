import { Router } from "express";
import { claimCampaignRewards, closeCampaign, createCampaign, joinCampaign, updateCampaign } from "@/controllers/campaign.controller";
import { createCampaignTasks, createEcosystemTasks, fetchCampaignTasks } from "@/controllers/tasks.controller";
import { authenticateProject, authenticateUser } from "@/middlewares/auth.middleware";

const router = Router();

router
	.patch("/close-campaign", authenticateProject, closeCampaign)
	.post("/complete-campaign", authenticateProject, claimCampaignRewards)
	.post("/create-campaign", authenticateProject, createCampaign)
	.post("/create-campaign-tasks", authenticateProject, createCampaignTasks)
	.post("/create-ecosystem-tasks", authenticateProject, createEcosystemTasks)
	.post("/join-campaign", authenticateUser, joinCampaign)
	.get("/tasks", fetchCampaignTasks)
	.patch("/update-campaign", authenticateProject, updateCampaign);
  

export default router;