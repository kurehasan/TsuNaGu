'use client'

import { useState } from "react";
import Link from "next/link";
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });
const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });


export default function login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロード防止

    try {
      const res = await fetch('http://localhost:3001/student_auth/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:    email,
          password: password
        }),
      });

      if (!res.ok) {
        throw new Error('ログイン失敗');
      }

      const token = res.headers.get('access-token');
      const client = res.headers.get('client');
      const uid = res.headers.get('uid');

      localStorage.setItem('access-token', token || '');
      localStorage.setItem('client', client || '');
      localStorage.setItem('uid', uid || '');

      window.location.href = '/mypage/student';
    } catch (err) {
      alert('ログインに失敗しました');
      console.error(err);
    }
  };

  return (
    <div className="login-div">
      <h1 className={`${SawarabiGothic.className} login-title`}>ログインフォーム</h1>
      <form method="post" className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス" />

        <label htmlFor="password">パスワード</label>
        <input id="password" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード" />
        <button type="submit" className="login-button">ログイン</button>
      </form>
    </div>
  );
}