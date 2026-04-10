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

import { FavoritesProvider } from "./context/FavoritesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <FavoritesProvider>
          <Header />
          <main className="main">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
