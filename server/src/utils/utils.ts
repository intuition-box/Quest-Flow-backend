import { z } from "zod";

export const validateCampaignData = (reqData: any) => {
  const campaignSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    nameOfProject: z.string().trim(),
    startDate: z.string().trim(),
    endDate: z.string().trim(),
    reward: z.object({
      xp: z.number(),
      tTrust: z.number()
    }),
    totaltTrustAvailable: z.number(),
    contractAddress: z.string().optional()
  });

  const parseData = campaignSchema.safeParse(reqData);

  return parseData;
};

export const validateQuestData = (reqData: any) => {
  const questSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    category: z.enum(["one-time", "daily"]),
    reward: z.object({
      xp: z.number(),
      tTrust: z.number()
    })
  });

  const parseData = questSchema.safeParse(reqData);

  return parseData;
};

export const validateTaskData = (reqData: any) => {
  const taskSchema = z.object({
    task: z.string().trim(),
    link: z.string().trim().optional(),
    campaign: z.string().trim(),
    xp: z.number(),
  });

  const parseData = taskSchema.safeParse(reqData);

  return parseData;
};

export const validateEcosystemTaskData = (reqData: any) => {
	const ecosystemSchema = z.object({
		title: z.string().trim(),
		description: z.string().trim(),
		timer: z.string().trim(),
		link: z.string().trim(),
		tags: z.enum([
			"defi",
			"lending-protocols",
			"prediction-markets",
			"nft",
			"social",
			"gaming",
			"portal",
			"domain-name",
			"launchpads",
		]),
		rewards: z.object({
			xp: z.number(),
			tTrust: z.number(),
		}),
	});

	const parseData = ecosystemSchema.safeParse(reqData);

	return parseData;
};
