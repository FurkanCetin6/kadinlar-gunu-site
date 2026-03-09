import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aşkımdan Özür Diliyorum",
  description: "Sevgilime özel hazırlanmış özür ve sevgi mini sitesi",
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