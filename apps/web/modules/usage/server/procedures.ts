import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getUsageStatus } from "../utils/usage";

export const usageRouter = createTRPCRouter({
	status: protectedProcedure.query(async () => {
		try {
			const result = await getUsageStatus();
			return result;
		} catch {
			return null;
		}
	}),
});
