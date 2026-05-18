import type { Metadata } from "next";
import { Manrope, Inter, Cormorant_Garamond, Allison, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";
import CustomToaster from "@/Components/layout/Toaster";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const allison = Allison({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allison",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
});

export const metadata: Metadata = {
  title: "MR Photography - International Editorial & Wedding Photography",
  description: "Get in touch for editorial, architectural, and cinematic projects.",
  icons: {
    icon: "/Images/image-round.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${cormorant.variable} ${allison.variable} ${montserrat.variable} ${pinyon.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans overflow-x-hidden">
        {children}
        <CustomToaster />
      </body>
    </html>
  );
}
