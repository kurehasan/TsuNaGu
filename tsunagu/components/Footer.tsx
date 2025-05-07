'use client';

import Link from 'next/link';
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";

const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export default function Footer() {
  return (
    <footer>
      <h1 className={`${SawarabiGothic.className} logo-title-footer`}>
        <Link href="/">TsuNaGu</Link>
      </h1>
      <ul className='login-list'>
        <li className='footer-company-login'><Link href="/login/company">企業様ログイン</Link></li>
        <li className='footer-student-login'><Link href="/login/student">学生ログイン</Link></li>
      </ul>
    </footer>
  )
}
