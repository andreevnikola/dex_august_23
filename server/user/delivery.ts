import { z } from "zod";
import { t, authenticatedProcedure, protectedProcedure } from "../trpc";
import { db } from "@/app/_db/prisma";

export const deliveryRouter = t.router({
  requestDelivery: authenticatedProcedure
    .input(
      z.object({
        receiverPhone: z.null().or(z.string().min(9).max(13)),
        type: z.enum(["delivery", "timedDelivery", "shopForMe"]),
        receiverAddress: z.null().or(z.string().min(5).max(250)),
        senderAddress: z.string().min(5).max(250),
        shoppingList: z.null().or(z.string().min(5).max(250)),
        store: z.null().or(z.string().min(3).max(250)),
        receivingTime: z.null().or(z.string().min(3).max(6)),
        sendingTime: z.null().or(z.string().min(3).max(6)),
        packageTitle: z.null().or(z.string().min(3).max(250)),
        packageDescription: z.null().or(z.string().min(5).max(250)),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db.delivery.create({
        data: {
          ...input,
          sender: {
            connect: {
              id: ctx.user!.id,
            },
          },
        },
      });
      return {};
    }),
});
