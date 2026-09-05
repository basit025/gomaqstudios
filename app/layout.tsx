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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Sets the theme class BEFORE first paint, so a dark-mode visitor never
          sees a white flash. This has to be a blocking inline script: anything
          that waits for React would run after the browser has already painted.
          Wrapped in try/catch because localStorage throws in some privacy
          modes — falling back to the OS setting is the right behaviour there.
          Keep the storage key in step with components/ui/ThemeToggle.tsx.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=localStorage.getItem('gomaq-theme');var d=c==='dark'||((!c||c==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
