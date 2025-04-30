'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";
import "./globals.css";
import Header from '../../components/Header';

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access-token');
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Header />
        <main>
          {children}
        </main>
        <footer>
          <h1 className={`${SawarabiGothic.className} logo-title-footer`}><Link href='/'>TsuNaGu</Link></h1>
        </footer>
      </body>
    </html>
  );
}
