import { db } from "@/app/_db/prisma";
import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpc from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";

export const createContext = async ({
  req,
  res,
}: trpc.CreateExpressContextOptions) => {
  const clientToken = req.headers.authorization?.split(" ")[0];

  const decoded = clientToken
    ? jwt.verify(clientToken, process.env.PEM_PUBLIC_KEY!)
    : null;

  return {
    user: decoded
      ? await db.user.findUnique({
          where: {
            id: decoded?.sub as string,
          },
        })
      : null,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const puclicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(isAuthed);
