// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Template from "./Template";
import "./globals.css";

import CustomCursor from "../components/CustomCursor";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NAFEYTECH",
  description: "Beautiful Page Transitions with GSAP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Template>
        <CustomCursor />

          {children}</Template>
      </body>
    </html>
  );
}