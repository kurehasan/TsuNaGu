'use client'

import Image from "next/image";
import { Sawarabi_Gothic } from "next/font/google";
import Link from "next/link";
import { useState ,useEffect} from "react";

const SaearabiGothicFont = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"]
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('access-token')
      setIsLoggedIn(!!token)})
  
  return (
    <div>
      {/* タイトル */}
      <h1 className={`${SaearabiGothicFont.className} About-title`}>
        就活の<br />
        ハードルを<br />
        下げたい
      </h1>

      {/* スクロールアニメーションバー */}
      <div className="scroll-infinity">
        <div className="scroll-infinity__wrap">
          {[1, 2].map((_, index) => (
            <ul
              key={index}
              className="scroll-infinity__list scroll-infinity__list--left"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="scroll-infinity__item">
                  <img src="/img/sample.png" alt={`sample-${i}`} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* 企業様向けメニュー */}
      <div className="company-div">
        <h1 className={`${SaearabiGothicFont.className} company-title`}>企業様向け</h1>
        <div className="company-button">
          <Link href="/signup/company"><button className="company-signup">掲載希望の<br />企業様</button></Link>
          {isLoggedIn ?
            <>
              <Link href="/mypage/company"><button className="company-mypage">掲載企業<br />マイページ</button></Link>
            </>
            :
            <>
              <Link href="/login/company"><button className="company-mypage">掲載企業<br />ログイン</button></Link>
              </>
          }
            </div>
        </div>
      </div>
      );

}
