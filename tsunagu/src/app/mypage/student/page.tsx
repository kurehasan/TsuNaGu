'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const [uid, setUid] = useState<String>('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const storedUid = localStorage.getItem('uid');

    if (!token || !client || !storedUid) {
      alert('ログインしてください');
      router.push('/login/student');
    } else {
      setUid(storedUid); // ← uidをstateにセットする！！
    }
  }, []);

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
      <div style={{
        maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px',
        textAlign: 'center', backgroundColor: '#f8f8f8'
      }}>
        <h1>マイページ</h1>
        <p>こんにちは、{uid} さん！</p>
        <button onClick={openLogoutModal}>
          ログアウト
        </button>
      </div>

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
  );
}
