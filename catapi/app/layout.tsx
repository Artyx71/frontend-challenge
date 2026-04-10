import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cat API",
  description: "Cat API App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Header />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
