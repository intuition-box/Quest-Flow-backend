import cryptoRandomString from "crypto-random-string";
import logger from "@/config/logger";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "@/utils/status.utils";
import { formatDate } from "date-fns";
import { user } from "@/models/user.model";

export const signIn = async (req: GlobalRequest, res: GlobalResponse) => {
	try {
    const { username, referrer }: { username: string, referrer?: string } = req.body;

    if (!username || username.length < 4) {
      res.status(BAD_REQUEST).json({ error: "username cannot be empty or less than 4 characters" });
      return;
    }

    const referrerCode = cryptoRandomString({ length: 8, type: "alphanumeric" });

    const dateJoined = formatDate(new Date(), "MMM, y");

    const referral = {
      code: referrerCode
    }

    const userReferrer = await user.findOne({ referral: { code: referrer } });

    if (!userReferrer) {
      await user.create({ username, referral, dateJoined });
    } else {
      await userReferrer.updateOne({ $inc: { xp: 10, "referral.xp": 10 } });
      await user.create({ username, referral, dateJoined, xp: 10 });
    }

    res.status(CREATED).json({ message: "user created!" })
	} catch (error) {
		logger.error(error);
		res.status(INTERNAL_SERVER_ERROR).json({ error: "Error signing user in" });
	}
};
