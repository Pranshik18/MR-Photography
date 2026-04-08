import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";


import PageLayout from "@/Components/layout/PageLayout";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MR.Photographer - Shivam Sharma",
  description: "Get in touch for editorial, architectural, and cinematic projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans overflow-x-hidden">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
