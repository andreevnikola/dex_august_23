import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs/app-beta";
import { SignedIn } from "@clerk/nextjs/app-beta/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AuthenticatedHeader, InformationalHeader } from "@/components/Headers";
import { Suspense } from "react";
import PageLoading from "./loading";
import Footer from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dex - Експресни доставки",
  description: "Express deliveryis using taxies!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
          <ClerkLoading>
            <PageLoading />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <InformationalHeader />
            </SignedOut>
            <SignedIn>
              <AuthenticatedHeader />
            </SignedIn>
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
            <Footer />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
