import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#556B2F",
};

export const metadata: Metadata = {
  title: "Harsh Industries - Premium Paper Products",
  description: "Manufacturer of Paper Cups, Paper Plate Raw Material, and Table Cover Rolls in Bhusawal MIDC.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Harsh Ind",
  },
};

import Preloader from "@/components/layout/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${outfit.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-on-background">
        <Preloader />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
