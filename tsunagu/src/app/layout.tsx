'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";
import "./globals.css";

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

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <header>
          <h1 className={`${SawarabiGothic.className} logo-title`}><Link href='/'>TsuNaGu</Link></h1>
          <div className="header-list">
            <ul>
              <li>
                <Link href="*"> Search </Link>
              </li>
              <li>
                <Link href="*">Scout</Link>
              </li>
              <li>
                <Link href="*">Message</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/mypage" className="header-list-mypage">MyPage</Link>
                  </li>
                  <li onClick={handleLogout} className="header-list-last">Logout</li>
                </>
              ) : (
                <li>
                  <Link href="/login" className="header-list-last">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </header>
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
