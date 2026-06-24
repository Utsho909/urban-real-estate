import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urbana Real Estate Ltd | Luxury Living",
  description: "Experience the pinnacle of modern luxury living with Urbana Real Estate Ltd.",
};

import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Footer from "@/components/Footer";
import { MenuProvider } from "@/components/MenuContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${inter.variable} ${playfair.variable} antialiased scroll-smooth`}>
      <body suppressHydrationWarning className="flex flex-col font-sans text-foreground bg-background selection:bg-copper/30 selection:text-champagne">
        <MenuProvider>
          <Navbar />
          <SmoothScrollProvider>
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
