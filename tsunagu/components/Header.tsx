'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";
import { usePathname, useRouter } from 'next/navigation';

const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [role, setRole] = useState<'student' | 'company' | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    setIsLoggedIn(!!token)
    const r = localStorage.getItem('role')
    setRole(r === 'student' || r === 'company' ? r : null)
  }, [pathname])

  const openLogoutModal = () => setShowModal(true)
  const cancelLogout = () => setShowModal(false)

  const confirmLogout = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('client')
    localStorage.removeItem('uid')
    setShowModal(false)
    router.push('/')
  }

  return (
    <>
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
            {isLoggedIn ?
              <>
                {role === 'student' &&
                  <li>
                    <Link href="/conversation/student">Message</Link>
                  </li>}
                {role === 'company' &&
                  <li>
                    <Link href="/conversation/company">Message</Link>
                  </li>}
              </>
              :
              <>
                <li>
                  <Link href="/login/student">Message</Link>
                </li>
              </>
            }
            {isLoggedIn ?
              <>
                {role === 'student' &&
                  <li>
                    <Link href="/mypage/student" className="header-list-last">MyPage</Link>
                  </li>}
                {role === 'company' &&
                  <li>
                    <Link href="/mypage/company" className="header-list-last">MyPage</Link>
                  </li>}

                <li onClick={openLogoutModal} className='header-list-last-second'>
                  <button>Logout</button>
                </li>
              </>
              :
              <>
                <li>
                  <Link href="/login/student" className="header-list-last">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup/student" className="header-list-last-second">
                    Signup
                  </Link>
                </li>
              </>

            }
          </ul>
        </div>

      </header>

      {showModal && (
        <div className='modal-back'>
          <div className='modal'>
            <p className='modal-title'>ログアウトしますか？</p>
            <div>
              <button
                onClick={cancelLogout}
                className='modal-cancel'
              >
                キャンセル
              </button>
              <button
                onClick={confirmLogout}
                className='modal-comfirm'
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

