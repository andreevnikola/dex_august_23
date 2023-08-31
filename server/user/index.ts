import { t } from "../trpc";
import { deliveryRouter } from "./delivery";

export const userRouter = t.router({
  delivery: deliveryRouter,
});
