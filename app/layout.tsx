import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const orbitron = localFont({
  src: [
    {
      path: "./fonts/Orbitron-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Orbitron-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Orbitron-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Orbitron-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Orbitron-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Orbitron-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "WhatTheHack - Master the Art of Ethical Hacking",
  description: "Gamified cybersecurity learning platform for ethical hacking education. Interactive challenges, missions, and real-world vulnerability exploitation scenarios.",
  keywords: ["cybersecurity", "ethical hacking", "penetration testing", "security training", "CTF", "hacking challenges"],
  authors: [{ name: "WhatTheHack Team" }],
  openGraph: {
    title: "WhatTheHack - Ethical Hacking Platform",
    description: "Master cybersecurity through interactive challenges and gamified learning",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${orbitron.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

