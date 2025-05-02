'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";

const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header>
      <h1 className={`${SawarabiGothic.className} logo-title`}>
        <Link href="/">TsuNaGu</Link>
      </h1>

      <div className="header-list">
        <ul>
          <li>
            <Link href="*">Search</Link>
          </li>
          <li>
            <Link href="*">Scout</Link>
          </li>
          <li>
            <Link href="*">Message</Link>
          </li>
          {isLoggedIn ? 
            <>
              <li>
                <Link href="/mypage" className="header-list-last">
                  MyPage
                </Link>
              </li>
            </>
           : 
            <li>
              <Link href="/login" className="header-list-last">
                Login
              </Link>
            </li>
          }
        </ul>
      </div>

    </header>
  );
}
