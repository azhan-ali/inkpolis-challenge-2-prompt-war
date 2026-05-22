import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${fredoka.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
