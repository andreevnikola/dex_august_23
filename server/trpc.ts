import { db } from "@/app/_db/prisma";
import {
  SignedInAuthObject,
  SignedOutAuthObject,
  getAuth,
} from "@clerk/nextjs/server";
import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createInnerTRPCContext = ({ auth }: AuthContext) => {
  return {
    auth,
  };
};

export const createContext = async ({ req, res }: any) => {
  const { auth } = createInnerTRPCContext({ auth: getAuth(req) });
  if (!auth) return { auth: null };
  return {
    auth,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const getUserData = t.middleware(async ({ ctx, next }) => {
  return next({
    ctx: {
      auth: ctx.auth,
      user: await db.user.findUnique({
        where: {
          id: ctx.auth!.userId!,
        },
      }),
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const authenticatedProcedure = t.procedure
  .use(isAuthed)
  .use(getUserData);
