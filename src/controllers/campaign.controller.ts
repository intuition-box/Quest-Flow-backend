import logger from "@/config/logger";
import { campaign } from "@/models/campaign.model";
import { OK, INTERNAL_SERVER_ERROR, CREATED } from "@/utils/status.utils";

interface IReward {
  xp: number;
  tTrust: number
}

interface ICreateCampaign {
  nameOfProject: string;
  reward: IReward;
  startDate: string,
  endDate: string;
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
    const { title, description, startDate, endDate, reward, nameOfProject }: ICreateCampaign = req.body;

    /* todo: 
      - validate values (not null)
      - set endDate to Date
    */

    await campaign.create(req.body);

    res.status(CREATED).json({ message: "campaign created!" })
  } catch (error) {
    logger.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "error creating campaign" });
  }
}