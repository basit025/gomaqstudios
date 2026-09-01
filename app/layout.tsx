import type { Metadata } from "next";
import MotionProvider from "@/components/ui/motion/MotionProvider";
import { display, sans, script } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gomaq Studios — Book Design, Branding & Video for Authors",
  description:
    "One studio for independent authors: cover and interior design, upload-ready formatting for KDP, IngramSpark and Lulu, complete author branding, and video editing for trailers and reels.",
  openGraph: {
    title: "Gomaq Studios — Book Design, Branding & Video for Authors",
    description:
      "Cover and interior design, store-ready formatting, author branding and video editing — for independent authors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
