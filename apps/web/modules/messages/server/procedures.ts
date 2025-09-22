import z from 'zod';
import { inngest } from '@/inngest/client';
import { prisma } from '@/lib/database-sql/db';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const messageRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await prisma.message.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: 'Message cannot be empty' }),
      })
    )
    .mutation(async ({ input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.value,
          role: 'USER',
          type: 'RESULT',
        },
      });

      await inngest.send({
        name: 'code-agent/run',
        data: {
          value: input.value,
        },
      });

      return createdMessage;
    }),
});
