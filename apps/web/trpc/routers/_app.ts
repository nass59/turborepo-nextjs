import { messageRouter } from '@/modules/messages/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  messages: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
