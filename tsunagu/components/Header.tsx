'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";

const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('access-token'));
    }
  }, []);

  const handleLogoutClick = () => setIsOpen(true);
  const confirmLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <header>
      <h1 className={`${SawarabiGothic.className} logo-title`}>
        <Link href="/">TsuNaGu</Link>
      </h1>

      {/* nav を div に置き換え */}
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
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/mypage" className="header-list-mypage">
                  MyPage
                </Link>
              </li>
              <li
                onClick={handleLogoutClick}
                className="header-list-last"
              >
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="header-list-last">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      <LogoutModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmLogout}
      />
    </header>
  );
}
