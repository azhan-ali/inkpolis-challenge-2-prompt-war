import type { Metadata } from "next";
import { Gochi_Hand, Kalam } from "next/font/google";
import "./globals.css";

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  variable: "--font-gochi",
  weight: "400",
});

const kalam = Kalam({
  subsets: ["latin"],
  variable: "--font-kalam",
  weight: ["400", "700"],
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
    <html lang="en" className={`${gochiHand.variable} ${kalam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
