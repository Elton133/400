import type { Metadata, Viewport } from "next";
import { Google_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { LastSeen } from "@/components/chrome/LastSeen";
import { Nav } from "@/components/chrome/Nav";
import { TransitionBubble } from "@/components/chrome/TransitionBubble";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

// Display: Valley Sans (variable weight). Body: Google Sans, served as a
// Latin subset by next/font instead of the 4.8 MB file in /public/font.
const valley = localFont({
  variable: "--font-valley",
  src: "../public/font/Cedarville_Cursive,Google_Sans,Valley_Sans/Valley_Sans/ValleySans-VariableFont_wght.ttf",
  weight: "100 900",
  display: "swap",
});
const googleSans = Google_Sans({ variable: "--font-google-sans", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
// The signature face: trotro calls, nicknames, sign-offs.
// LICENCE: Bacalisties is personal-use only. Buy the webfont licence before launch.
const bacalisties = localFont({
  variable: "--font-bacalisties",
  src: "../public/font/bacalisties/Bacalisties.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "400 · Shipped from the group chat", template: "%s · 400" },
  description:
    "400 is a four-person product crew from Accra. We design, build and ship real apps for transport, services, campuses, schools and small businesses.",
};

export const viewport: Viewport = {
  themeColor: "#F4F2EE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="day"
      suppressHydrationWarning
      className={`${valley.variable} ${googleSans.variable} ${jetbrains.variable} ${bacalisties.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-70 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <LastSeen />
        <Suspense fallback={null}>
          <TransitionBubble />
        </Suspense>
      </body>
    </html>
  );
}
