import { TRPCError } from '@trpc/server';
import { generateSlug } from 'random-word-slugs';
import { z } from 'zod';
import { env } from '@/env.mjs';
import { inngest } from '@/inngest/client';
import { prisma } from '@/lib/database-sql/db';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

const MAX_VALUE_LENGTH = 10_000;

export const projectsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: 'Id is required' }),
      })
    )
    .query(async ({ input }) => {
      const existingProject = await prisma.project.findUnique({
        where: { id: input.id },
      });

      if (!existingProject) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      return existingProject;
    }),
  getAll: baseProcedure.query(async () => {
    return await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }),
  getMany: baseProcedure.query(async () => {
    return await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, { message: 'Value cannot be empty' })
          .max(MAX_VALUE_LENGTH, { message: 'Value is too long' }),
      })
    )
    .mutation(async ({ input }) => {
      if (env.IS_DEMO) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Feature disabled for demo',
        });
      }

      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, { format: 'kebab' }),
          messages: {
            create: {
              content: input.value,
              role: 'USER',
              type: 'RESULT',
            },
          },
        },
      });

      await inngest.send({
        name: 'code-agent/run',
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});
