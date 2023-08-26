import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/:locale/sign-in",
    "/:locale/sign-up",
    "/informational",
    "/informational/pricing",
    "/informational/aboutus",
    "/informational/howitworks",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)", "/api/webhooks/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
