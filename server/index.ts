import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [{}, {}, {}, {}];
  }),
});

export type AppRouter = typeof appRouter;
