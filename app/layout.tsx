import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gamified RPG Life Tracker",
  description: "Track your life goals with RPG mechanics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
