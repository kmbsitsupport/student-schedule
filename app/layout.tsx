import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kmbs — розклад",
  description: "Розклад програм Kyiv-Mohyla Business School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
