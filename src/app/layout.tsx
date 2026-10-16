import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, DotGothic16, M_PLUS_Rounded_1c } from "next/font/google";
import { site } from "@/data/site";
import { KioskProvider, kioskBootScript } from "@/components/kiosk";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundShapes } from "@/components/BackgroundShapes";
import { IdleWatcher } from "@/components/IdleWatcher";
import "./globals.css";

const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"], variable: "--font-dela", display: "swap" });
const maru = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-maru",
  display: "swap",
});
const dot = DotGothic16({ weight: "400", subsets: ["latin"], variable: "--font-dot", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.team}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "ja_JP",
    images: [`${site.url}/images/miniverse.webp`],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffd23f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${dela.variable} ${maru.variable} ${dot.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: kioskBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <KioskProvider>
          <a
            href="#main"
            className="sr-only z-[200] rounded-full bg-white px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            本文へスキップ
          </a>
          <BackgroundShapes />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <IdleWatcher />
        </KioskProvider>
      </body>
    </html>
  );
}
