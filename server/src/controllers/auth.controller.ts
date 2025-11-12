import cryptoRandomString from "crypto-random-string";
import logger from "@/config/logger";
import {
	BAD_REQUEST,
	CREATED,
	INTERNAL_SERVER_ERROR,
} from "@/utils/status.utils";
import { formatDate } from "date-fns";
import { user } from "@/models/user.model";
import { getRefreshToken, JWT, validateProjectData } from "@/utils/utils";
import { project } from "@/models/project.model";
import { uploadImg } from "@/utils/img.utils";
import { referrer } from "@/models/referrer.model";

export const signUp = async (req: GlobalRequest, res: GlobalResponse) => {
	try {
		const { username, referrer: referrerCode }: { username: string; referrer?: string } =
			req.body;

		if (!username || username.length < 4) {
			res
				.status(BAD_REQUEST)
				.json({ error: "username cannot be empty or less than 4 characters" });
			return;
		}

		const userReferrerCode = cryptoRandomString({
			length: 8,
			type: "alphanumeric",
		});

		const dateJoined = formatDate(new Date(), "MMM, y");

		const referral = {
			code: userReferrerCode,
		};

		const userReferrer = await user.findOne({ referral: { code: referrerCode } });

		const newUser = new user({ username, referral, dateJoined });

		if (userReferrer) {
			await userReferrer.updateOne({ $inc: { xp: 10, "referral.xp": 10 } });
			newUser.xp = 10;

			await referrer.create({ user: userReferrer._id, referrerCode, username: newUser.username });
			await newUser.save();
		}

		const id = newUser._id;

		const accessToken = JWT.sign({ id, status: "user" });
		const refreshToken = getRefreshToken(id);

		req.id = id as unknown as string;

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 30 * 24 * 60 * 60,
		});

		res.status(CREATED).json({ message: "user created!", accessToken });
	} catch (error) {
		logger.error(error);
		res.status(INTERNAL_SERVER_ERROR).json({ error: "Error signing user up" });
	}
};

export const projectSignUp = async (
	req: GlobalRequest,
	res: GlobalResponse
) => {
	try {
		const projectLogoAsFile = req.file?.buffer;
		if (!projectLogoAsFile) {
			res.status(BAD_REQUEST).json({ error: "project logo is required" });
			return;
		}

		const { success } = validateProjectData(req.body);
		if (!success) {
			res
				.status(BAD_REQUEST)
				.json({ error: "send the correct data required to create a project" });
			return;
		}

		const projectLogoUrl = await uploadImg({
			file: projectLogoAsFile,
			filename: req.file?.originalname as string,
			folder: "project-logo",
		});

		req.body.logo = projectLogoUrl;

		const projectUser = await project.create(req.body);

		const id = projectUser._id;

		const accessToken = JWT.sign({ id, status: "project" });
		const refreshToken = getRefreshToken(id);

		req.id = id as unknown as string;

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 30 * 24 * 60 * 60,
		});

		res.status(CREATED).json({ message: "project created!", accessToken });
	} catch (error) {
		logger.error(error);
		res
			.status(INTERNAL_SERVER_ERROR)
			.json({ error: "Error signing project up" });
	}
};
