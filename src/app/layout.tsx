import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { GlobalHoverScramble } from "@/components/GlobalHoverScramble";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishabh Dapkara — Frontend Engineer",
  description: "Frontend & Fullstack engineer. React, Next.js, TypeScript, AI-assisted development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <CustomCursor />
        <GlobalHoverScramble />
        {children}
      </body>
    </html>
  );
}
