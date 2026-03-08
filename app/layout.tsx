import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dünya Kadınlar Günü | Aşkıma",
  description: "Sevgilime özel romantik mini site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}