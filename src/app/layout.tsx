import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MiniKitContextProvider } from "@/app/providers/MinikitProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GuessQuest",
  description:
    "A blockchain-powered number guessing game built with Next.js, TypeScript, and Solidity",
  icons: {
    icon: "/image.png",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  // Read envs (may be undefined in some environments)
  const URL = process.env.NEXT_PUBLIC_URL;
  const PROJECT_NAME = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME;
  const APP_DESC = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
  const HERO_IMAGE = process.env.NEXT_PUBLIC_APP_HERO_IMAGE;
  const SPLASH_IMAGE = process.env.NEXT_PUBLIC_SPLASH_IMAGE;
  const SPLASH_BACKGROUND_COLOR =
    process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR;

  // Helper: require strict HTTPS for assets per Base docs
  const isHttps = (u?: string) =>
    typeof u === "string" && u.startsWith("https://");

  // Collect issues for clear runtime warnings
  const missing: string[] = [];
  if (!PROJECT_NAME) missing.push("NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME");
  if (!URL) missing.push("NEXT_PUBLIC_URL");
  if (!HERO_IMAGE) missing.push("NEXT_PUBLIC_APP_HERO_IMAGE");
  if (!SPLASH_IMAGE) missing.push("NEXT_PUBLIC_SPLASH_IMAGE");

  const nonHttps: string[] = [];
  if (URL && !isHttps(URL)) nonHttps.push("NEXT_PUBLIC_URL");
  if (HERO_IMAGE && !isHttps(HERO_IMAGE))
    nonHttps.push("NEXT_PUBLIC_APP_HERO_IMAGE");
  if (SPLASH_IMAGE && !isHttps(SPLASH_IMAGE))
    nonHttps.push("NEXT_PUBLIC_SPLASH_IMAGE");

  if (missing.length || nonHttps.length) {
    // Log a clear warning with missing or invalid env keys. We intentionally do
    // not throw so the app continues to work; we simply omit the fc:frame meta
    // which would otherwise produce an invalid embed.
    console.warn(
      `[fc:frame] meta omitted. Missing envs: ${
        missing.join(", ") || "none"
      }. Non-HTTPS values: ${nonHttps.join(", ") || "none"}.`
    );

    return {
      title: PROJECT_NAME || metadata.title,
      description: APP_DESC || metadata.description,
    };
  }

  // All required values present and HTTPS — emit fc:frame metadata
  const frame = {
    version: "next",
    imageUrl: HERO_IMAGE,
    button: {
      title: `Launch ${PROJECT_NAME}`,
      action: {
        type: "launch_frame",
        name: PROJECT_NAME,
        url: URL,
        splashImageUrl: SPLASH_IMAGE,
        splashBackgroundColor: SPLASH_BACKGROUND_COLOR,
      },
    },
  };

  return {
    title: PROJECT_NAME,
    description: APP_DESC || metadata.description,
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MiniKitContextProvider>
          <Providers>{children}</Providers>
        </MiniKitContextProvider>
      </body>
    </html>
  );
}
