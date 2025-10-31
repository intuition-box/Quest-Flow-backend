import { Router } from "express";
import { claimCampaignRewards, closeCampaign, createCampaign, joinCampaign, updateCampaign } from "@/controllers/campaign.controller";
import { createCampaignTasks, createEcosystemTasks, fetchCampaignTasks } from "@/controllers/tasks.controller";

const router = Router();

router
  .patch("/close-campaign", closeCampaign)
  .post("/complete-campaign", claimCampaignRewards)
  .post("/create-campaign", createCampaign)
  .post("/create-campaign-tasks", createCampaignTasks)
  .post("/create-ecosystem-tasks", createEcosystemTasks)
  .post("/join-campaign", joinCampaign)
  .get("/tasks", fetchCampaignTasks)
	.patch("/update-campaign", updateCampaign);
  

export default router;