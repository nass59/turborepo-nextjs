import { TRPCError } from "@trpc/server";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/database-sql/db";
import { consumeCredits } from "@/modules/usage/utils/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

const MAX_VALUE_LENGTH = 10_000;

export const projectsRouter = createTRPCRouter({
	getOne: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const existingProject = await prisma.project.findUnique({
				where: {
					id: input.id,
					userId: ctx.auth.userId,
				},
			});

			if (!existingProject) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Project not found",
				});
			}

			return existingProject;
		}),
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const projects = await prisma.project.findMany({
			where: { userId: ctx.auth.userId },
			orderBy: { updatedAt: "desc" },
		});

		const projectsWithMessages = await Promise.all(
			projects.map(async (project) => {
				const messages = await prisma.message.findMany({
					where: { projectId: project.id },
					orderBy: { createdAt: "desc" },
					take: 1,
				});
				return { ...project, latestMessage: messages[0] ?? null };
			}),
		);

		return projectsWithMessages;
	}),
	getMany: protectedProcedure.query(async ({ ctx }) => {
		return await prisma.project.findMany({
			where: { userId: ctx.auth.userId },
			orderBy: { updatedAt: "desc" },
		});
	}),
	create: protectedProcedure
		.input(
			z.object({
				value: z
					.string()
					.min(1, { message: "Value cannot be empty" })
					.max(MAX_VALUE_LENGTH, { message: "Value is too long" }),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				await consumeCredits();
			} catch (error) {
				if (error instanceof Error) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Something went wrong",
					});
				}

				throw new TRPCError({
					code: "TOO_MANY_REQUESTS",
					message: "You have exceeded your usage limits.",
				});
			}

			const createdProject = await prisma.project.create({
				data: {
					userId: ctx.auth.userId,
					name: generateSlug(2, { format: "kebab" }),
					messages: {
						create: {
							content: input.value,
							role: "USER",
							type: "RESULT",
						},
					},
				},
			});

			await inngest.send({
				name: "code-agent/run",
				data: {
					value: input.value,
					projectId: createdProject.id,
				},
			});

			return createdProject;
		}),
});
