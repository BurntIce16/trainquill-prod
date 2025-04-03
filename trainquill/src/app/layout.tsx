import type { Metadata } from "next";
import { Monomaniac_One } from "next/font/google";
import "./globals.css";

const monomaniacOne = Monomaniac_One({
  weight: "400",
  variable: "--font-monomaniac-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrainQuill",
  description: "stART ux study app made by team VanGoat for WPI, NUS, and the National Gallery Singapore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monomaniacOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
