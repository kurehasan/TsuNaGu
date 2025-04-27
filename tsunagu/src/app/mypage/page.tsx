'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const [uid, setUid] = useState<String>('');

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const storedUid = localStorage.getItem('uid');

    if (!token || !client || !storedUid)  {
      alert('ログインしてください');
      router.push('/login');
    } else {
      setUid(storedUid); // ← uidをstateにセットする！！
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
      alert('ログアウトしました');
      router.push('/login'); // ログアウトしたらログイン画面に戻す
    }
  };

  return (
    <div style={{
      maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px',
      textAlign: 'center', backgroundColor: '#f8f8f8'
    }}>
      <h1>マイページ</h1>
      <p>こんにちは、{uid} さん！</p>
      <button onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  );
}
