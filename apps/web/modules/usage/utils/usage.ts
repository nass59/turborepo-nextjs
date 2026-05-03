import { auth } from "@clerk/nextjs/server";
import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "@/lib/database-sql/db";

const FREE_POINTS = 2;
const PRO_POINTS = 5;
const NB_DAYS = 30;
const DURATION = 60 * 60 * 24 * NB_DAYS; // 30 days in seconds
const GENERATION_COST = 1; // each generation costs 1 point

export const getUsageTracker = async () => {
	const { has } = await auth();
	const hasProAccess = has({ plan: "pro" });

	const usageTracker = new RateLimiterPrisma({
		storeClient: prisma,
		tableName: "Usage",
		points: hasProAccess ? PRO_POINTS : FREE_POINTS,
		duration: DURATION,
	});

	return usageTracker;
};

export const consumeCredits = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not authenticated");
	}

	console.log(`[usage] consuming credits for user: ${userId}`);

	const usageTracker = await getUsageTracker();
	const result = await usageTracker.consume(userId, GENERATION_COST);

	return result;
};

export const getUsageStatus = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not authenticated");
	}

	const usageTracker = await getUsageTracker();
	const result = await usageTracker.get(userId);

	return result;
};
