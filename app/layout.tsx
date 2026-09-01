import type { Metadata } from "next";
import MotionProvider from "@/components/ui/motion/MotionProvider";
import { display, sans, script } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gomaq Studios — Your Book, Ready to Publish",
  description:
    "Cover design, interior layout, print- and eBook-ready formatting, author branding and video editing for independent authors. KDP, IngramSpark and Lulu ready.",
  openGraph: {
    title: "Gomaq Studios — Your Book, Ready to Publish",
    description:
      "Cover design, interior layout, formatting, branding and video editing for independent authors.",
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
