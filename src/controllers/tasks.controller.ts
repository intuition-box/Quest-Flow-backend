import logger from "@/config/logger";
import { campaignTask, ecosystemTask, quest } from "@/models/tasks.model";
import { INTERNAL_SERVER_ERROR, OK, CREATED, BAD_REQUEST } from "@/utils/status.utils";

export const fetchEcosystemDapps = async (req: GlobalRequest, res: GlobalResponse) => {
	try {
		const ecosystemTasks = await ecosystemTask.find();

		res.status(OK).json({ message: "tasks fetched!", ecosystemTasks });
	} catch (error) {
		logger.error(error);
		res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching tasks" });
	}
};

export const fetchQuests = async (req: GlobalRequest, res: GlobalResponse) => {
	try {
		const oneTimeQuests = await quest.find({ category: "one-time" });

		const dailyQuests = await quest.find({ category: "daily" });

		res.status(OK).json({ message: "quests fetched!", oneTimeQuests, dailyQuests });
	} catch (error) {
		logger.error(error);
		res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching " });
	}
}

export const fetchCampaignTasks = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const id = req.query.id as string;

    const tasks = await campaignTask.find({ campaign: id });

    res.status(OK).json({ message: "tasks fetched!", tasks });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching tasks for campaign" });
  }
}

// export const fetchCampaignTasks = async (req: GlobalRequest, res: GlobalResponse) => {
// 	try {
		
// 	} catch (error) {
		// logger.error(error);
		// res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching " });
// 	}
// }

// export const fetchCampaignTasks = async (req: GlobalRequest, res: GlobalResponse) => {
// 	try {
		
// 	} catch (error) {
		// logger.error(error);
		// res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching " });
// 	}
// }

// export const fetchCampaignTasks = async (req: GlobalRequest, res: GlobalResponse) => {
// 	try {
		
// 	} catch (error) {
		// logger.error(error);
		// res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching " });
// 	}
// }

// export const fetchCampaignTasks = async (req: GlobalRequest, res: GlobalResponse) => {
// 	try {
		
// 	} catch (error) {
		// logger.error(error);
		// res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching " });
// 	}
// }
