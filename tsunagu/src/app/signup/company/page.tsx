'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [role, setRole] = useState<'job_seeker' | 'company'>('job_seeker')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/company_auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
          role: 'company'
        })
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.errors?.full_messages?.join(', ') || '登録失敗')
      }
      // 登録成功したらログインページへ
      alert('ユーザー登録が完了しました。ログインページへ移動します。')
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>サインアップ</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          メールアドレス
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)} required
          />
        </label>

        <label>
          パスワード
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)} required
          />
        </label>

        <label>
          パスワード（確認）
          <input
            type="password" value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)} required
          />
        </label>

        <label>
          ロール
          <select value={role} onChange={e => setRole(e.target.value as any)}>
            <option value="job_seeker">就活生</option>
            <option value="company">企業</option>
          </select>
        </label>

        <button type="submit">登録する</button>
      </form>
    </div>
  )
}
