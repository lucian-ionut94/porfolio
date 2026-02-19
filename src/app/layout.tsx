import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { FACEBOOK_PAGE_URL } from "@/lib/constants/socials";

const clashDisplay = localFont({
  src: "../../public/fonts/clash-display.woff2",
  variable: "--font-clash-display",
  display: "swap",
});

const satoshi = localFont({
  src: "../../public/fonts/satoshi.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lucianionut.ro"),
  title: {
    default: "Lucian Ionuț | Full-Stack Web Developer",
    template: "%s | Lucian Ionuț",
  },
  description:
    "Construiesc experiențe web moderne și performante cu React, Next.js, Laravel și WordPress.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Lucian Ionuț",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://lucianionut.ro",
    title: "Lucian Ionuț | Full-Stack Web Developer",
    description:
      "Construiesc experiențe web moderne și performante. De la teme WordPress custom la aplicații React complexe.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lucian Ionuț — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucian Ionuț | Full-Stack Web Developer",
    description:
      "Construiesc experiențe web moderne și performante. De la teme WordPress custom la aplicații React complexe.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://lucianionut.ro",
    languages: {
      "ro": "https://lucianionut.ro/ro",
      "en": "https://lucianionut.ro/en",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Facebook publisher meta */}
        <meta property="article:publisher" content={FACEBOOK_PAGE_URL} />

        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QY89V1JETV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QY89V1JETV');
`,
          }}
        />
      </head>
      <body
        className={`${clashDisplay.variable} ${satoshi.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
