import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InformationalHeader } from "@/components/InformationalHeader";
import { ClerkProvider } from "@clerk/nextjs";

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
          <InformationalHeader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
