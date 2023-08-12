import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InformationalHeader } from "@/components/InformationalHeader";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs/app-beta";
import { SignedIn } from "@clerk/nextjs/app-beta/client";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dex - Експресни доставки",
  description: "Express deliveryis using taxies!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="cupcake">
        <body className={inter.className}>
          <SignedOut>
            <InformationalHeader />
          </SignedOut>
          <SignedIn>
            <AuthenticatedHeader />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
