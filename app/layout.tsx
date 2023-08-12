import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InformationalHeader } from "@/components/InformationalHeader";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs/app-beta";
import { SignedIn } from "@clerk/nextjs/app-beta/client";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

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
        <body className={inter.className + " bg-base-100"}>
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
