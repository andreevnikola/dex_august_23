import Actions from "@/components/Actions";
import LandingPage from "@/components/LandingPage";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const user = auth();
  if (user.userId) return <Actions />;
  return <LandingPage />;
}
