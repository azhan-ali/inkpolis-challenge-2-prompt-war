import type { Metadata } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600", "700"],
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-patrick",
  weight: "400",
});

export const metadata: Metadata = {
  title: "InkPolis — Democracy, Drawn for Everyone",
  description:
    "Learn how elections work through an interactive, hand-drawn sketchbook experience. Powered by AI guide VOTA.",
  openGraph: {
    title: "InkPolis — Democracy, Drawn for Everyone",
    description: "Your AI-powered civic education sketchbook.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${patrickHand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
