import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { LenisProvider } from "@/components/LenisProvider";
import SplashCursor from "@/components/SplashCursor";
import { PageTransition } from "@/components/PageTransition";
import { TopLoader } from "@/components/TopLoader";

import { AuroraGradient } from "@/components/AuroraGradient";
import { AudioPlayer } from "@/components/AudioPlayer";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "7to14 | Our Journey",
  description: "A private digital space for our memories.",
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${fredoka.variable} antialiased min-h-screen font-sans`}>
          <TopLoader />
          <AuroraGradient />
          <LenisProvider>
          <PageTransition>
            <main className="pb-24">
              {children}
            </main>
          </PageTransition>
            <Navbar />
            <AudioPlayer />
            <Toaster position="top-center" />

          <VisualEditsMessenger />
            <SplashCursor 
              DYE_RESOLUTION={512} 
              SIM_RESOLUTION={128} 
              PRESSURE_ITERATIONS={10} 
              SPLAT_RADIUS={0.08}
              DENSITY_DISSIPATION={4.5}
              VELOCITY_DISSIPATION={3.0}
            />
        </LenisProvider>
      </body>
    </html>
  );
}
