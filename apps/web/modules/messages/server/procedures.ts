import { z } from "zod";
import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/database-sql/db";
import { consumeCredits } from "@/modules/usage/utils/usage";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

const MAX_VALUE_LENGTH = 10_000;

export const messagesRouter = createTRPCRouter({
	getMany: protectedProcedure
		.input(
			z.object({
				projectId: z.string().min(1, { message: "Project ID is required" }),
			}),
		)
		.query(async ({ input, ctx }) => {
			return await prisma.message.findMany({
				where: {
					projectId: input.projectId,
					project: { userId: ctx.auth.userId },
				},
				include: { fragment: true },
				orderBy: { updatedAt: "asc" },
			});
		}),
	create: protectedProcedure
		.input(
			z.object({
				value: z
					.string()
					.min(1, { message: "Value cannot be empty" })
					.max(MAX_VALUE_LENGTH, { message: "Value is too long" }),
				projectId: z.string().min(1, { message: "Project ID is required" }),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const existingProject = await prisma.project.findUnique({
				where: {
					id: input.projectId,
					userId: ctx.auth.userId,
				},
			});

			if (!existingProject) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Project not found",
				});
			}

			await consumeCredits();

			const createdMessage = await prisma.message.create({
				data: {
					projectId: existingProject.id,
					content: input.value,
					role: "USER",
					type: "RESULT",
				},
			});

			await inngest.send({
				name: "code-agent/run",
				data: {
					value: input.value,
					projectId: existingProject.id,
				},
			});

			return createdMessage;
		}),
});
