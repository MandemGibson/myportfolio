import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philip Gibson Cudjoe - Full Stack Developer Portfolio",
  description:
    "Portfolio website showcasing full-stack development skills with modern web technologies. Features both terminal and modern UI interfaces.",
  keywords: [
    "portfolio",
    "full stack developer",
    "react",
    "nextjs",
    "typescript",
    "web development",
  ],
  authors: [{ name: "Philip Gibson Cudjoe" }],
  creator: "Philip Gibson Cudjoe",
  openGraph: {
    title: "Philip Gibson Cudjoe - Full Stack Developer",
    description: "Portfolio website with terminal and modern UI interfaces",
    type: "website",
  },
};

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
        {children}
      </body>
    </html>
  );
}
