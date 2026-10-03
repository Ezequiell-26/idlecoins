import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IdleCoins — Build. Grow. Unlock.",
  description: "Web-first incremental game with a separate rewards layer."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
