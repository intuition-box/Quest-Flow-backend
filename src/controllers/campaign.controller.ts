import logger from "@/config/logger";
import { campaign, campaignCompleted } from "@/models/campaign.model";
import { project } from "@/models/projects.model";
import { user } from "@/models/user.model";
import { OK, INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, NOT_FOUND, FORBIDDEN, UNAUTHORIZED } from "@/utils/status.utils";
import { validateCampaignData } from "@/utils/utils";

interface IReward {
  xp: number;
  tTrust: number
}

interface ICreateCampaign {
  nameOfProject: string;
  reward: IReward;
  startDate: string;
  logo: string;
  projectCoverImage: string;
  creator: string;
  endDate: Date;
  title: string;
  description: string;
}

export const fetchCampaigns = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const campaigns = await campaign.find();

    res.status(OK).json({ message: "campaigns fetched!", campaigns });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error fetching campaigns" });
  }
}

export const createCampaign = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const requestData: ICreateCampaign = req.body;

    const projectUserId = req.id;

    const campaignCreator = await project.findById(projectUserId);
    if (!campaignCreator) {
      res.status(NOT_FOUND).json({ error: "id associated with user is invalid" });
      return;
    }
    
    const xpAllocated = campaignCreator.xpAllocated;
    if (xpAllocated === 0) {
      res.status(FORBIDDEN).json({ error: "contact nexura team to recieve xp allocation" });
      return;
    }

    const { success } = validateCampaignData(requestData);
    if (!success) {
      res.status(BAD_REQUEST).json({ error: "send the correct data required to create a campaign" });
      return;
    }

    const endDate = new Date(requestData.endDate);

    requestData.endDate = endDate;

    requestData.creator = projectUserId as string;

    requestData.projectCoverImage = "";

    requestData.logo = "";

    const newCampaign = new campaign(requestData);

    newCampaign.totalXpAvailable = xpAllocated;    

    campaignCreator.campaignsCreated += 1;
    campaignCreator.xpAllocated = 0;

    await newCampaign.save();
    await campaignCreator.save();

    res.status(CREATED).json({ message: "campaign created!" });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error creating campaign!" });
  }
}

export const joinCampaign = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const id = req.query.id;

    const userId = req.id;
    if (!userId) {
      res.status(UNAUTHORIZED).json({ error: "kindly login or sign up" });
      return;
    }

    const campaignToJoin = await campaign.findById(id);
    if (!campaignToJoin) {
      res.status(NOT_FOUND).json({ error: "id associated with campaign is invalid" });
      return;
    }

    const completedCampaign = await campaignCompleted.findOne({ user: userId, campaign: id });
    if (!completedCampaign) {
      await campaignCompleted.create({ user: userId, campaign: id });

      campaignToJoin.participants += 1;

      await campaignToJoin.save();

      res.status(OK).json({ message: "campaign joined" });
      return;      
    }

    res.status(BAD_REQUEST).json({ error: "already joined campaign" });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error joining campaign!" });
  }
}

export const updateCampaign = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    // todo: get logo and project cover image

    const { id } = req.body;
    const campaignUpdateData: Record<string, unknown> = {};

    for (const field of ["description", "title", "endDate", "reward"]) {
      const value = req.body[field];
      if (field !== "endDate") {
        campaignUpdateData[field] = value;
      } else {
        const endDate = new Date(value)
        campaignUpdateData[field] = endDate;
      }
    }

    if (Object.keys(campaignUpdateData).length === 0) {
      res.status(BAD_REQUEST).json({ error: "No valid fields provided for update" });
      return;
    }

    await campaign.findByIdAndUpdate(id, campaignUpdateData);

    res.status(OK).json({ message: "campaign updated!" });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error updating campaign!" });
  }
}

export const closeCampaign = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const id = req.query.id as string;

    const foundCampaign = await campaign.findById(id);
    if (!foundCampaign) {
      res.status(NOT_FOUND).json({ error: "campaign id is invalid" });
      return;
    }

    if (foundCampaign.status === "Ended") {
      res.status(FORBIDDEN).json({ error: "campaign has already ended" });
			return;
    }

    foundCampaign.status = "Ended";
    await foundCampaign.save();

    res.status(OK).json({ message: "campaign closed!" });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error closing campaign!" });
  }
}

export const claimCampaignRewards = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const campaignId = req.query.id;

    const userToReward = await user.findById(req.id);
    if (!userToReward) {
      res.status(NOT_FOUND).json({ error: "id associated wit user is invalid" });
      return;
    }

    const campaignToClaimRewards = await campaign.findById(campaignId);
    if (!campaignToClaimRewards) {
      res.status(NOT_FOUND).json({ error: "id associated with campaign is invalid" });
      return;
    }

    const completedCampaign = await campaignCompleted.findOne({ campaign: campaignId });
    if (!completedCampaign) {
      res.status(FORBIDDEN).json({ error: "this operation cannot be performed" });
			return;
    }

    if (!completedCampaign.tasksCompleted) {
      res.status(FORBIDDEN).json({ error: "all tasks must be completed before rewards can be claimed" });
      return;
    }

    if (!completedCampaign.campaignCompleted) {
      res.status(FORBIDDEN).json({ error: "campaign reward has been claimed" });
      return;
    }

    const xp = campaignToClaimRewards.reward?.xp as number;
    const tTrustTokens = campaignToClaimRewards.reward?.tokenPerUser as number;

    userToReward.xp += xp;
    userToReward.tTrustEarned += tTrustTokens;
    userToReward.campaignsCompleted += 1;

    campaignToClaimRewards.xpClaimed += xp;
    campaignToClaimRewards.tTrustClaimed += tTrustTokens;

    completedCampaign.campaignCompleted = true;

    await completedCampaign.save();
    await campaignToClaimRewards.save();
    await userToReward.save();

    res.status(OK).json({ message: "campaign completed" });
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error claiming campaign task" });
  }
}
