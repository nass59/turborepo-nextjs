import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { env } from '@/env.mjs';
import { inngest } from '@/inngest/client';
import { prisma } from '@/lib/database-sql/db';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

const MAX_VALUE_LENGTH = 10_000;

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, { message: 'Project ID is required' }),
      })
    )
    .query(async ({ input }) => {
      return await prisma.message.findMany({
        where: { projectId: input.projectId },
        include: { fragment: true },
        orderBy: { updatedAt: 'asc' },
      });
    }),
  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, { message: 'Value cannot be empty' })
          .max(MAX_VALUE_LENGTH, { message: 'Value is too long' }),
        projectId: z.string().min(1, { message: 'Project ID is required' }),
      })
    )
    .mutation(async ({ input }) => {
      if (env.IS_DEMO) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Feature disabled for demo',
        });
      }

      const createdMessage = await prisma.message.create({
        data: {
          projectId: input.projectId,
          content: input.value,
          role: 'USER',
          type: 'RESULT',
        },
      });

      await inngest.send({
        name: 'code-agent/run',
        data: {
          value: input.value,
          projectId: input.projectId,
        },
      });

      return createdMessage;
    }),
});
