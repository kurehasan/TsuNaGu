'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentSignUpPage() {
  const router = useRouter()
  const [email, setEmail]                 = useState('')
  const [password, setPassword]           = useState('')
  const [passwordConfirmation, setPwConf] = useState('')
  const [graduationYear, setGradYear]     = useState<number>(new Date().getFullYear())
  const [error, setError]                 = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/student_auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
          graduation_year: graduationYear
        }),
      })

      const body = await res.json()
      if (!res.ok) {
        throw new Error(body.errors?.full_messages?.join(', ') || '登録失敗')
      }

      alert('登録完了！ログインページへ移動します。')
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1 className='login-title'>会員登録</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className='login-form'>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          パスワード ※6文字以上
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          パスワード（確認）
          <input
            type="password"
            value={passwordConfirmation}
            onChange={e => setPwConf(e.target.value)}
            required
          />
        </label>

        <label>
          卒業年度
          <input
            type="number"
            value={graduationYear}
            onChange={e => setGradYear(Number(e.target.value))}
            required
          />
        </label>

        <button type="submit">登録する</button>
      </form>
    </div>
  )
}
