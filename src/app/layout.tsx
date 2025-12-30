import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { VisualEditsMessenger } from "orchids-visual-edits";

export const metadata: Metadata = {
  title: "Our Space | Pushkar & Tanu",
  description: "A private digital space for our memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <main className="pb-24">
          {children}
        </main>
        <Navbar />
        <Toaster position="top-center" />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
