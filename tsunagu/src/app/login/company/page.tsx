// src/app/login/company/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/company_auth/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        // Rails からのエラーメッセージをパースして表示
        const body = await res.json()
        throw new Error(body.errors?.join(', ') || 'ログインに失敗しました')
      }

      // レスポンスヘッダーから認証トークン一式を取得して localStorage に保存
      const accessToken = res.headers.get('access-token')!
      const client      = res.headers.get('client')!
      const uid         = res.headers.get('uid')!
      const expiry      = res.headers.get('expiry')!
      const tokenType   = res.headers.get('token-type')!

      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('client',       client)
      localStorage.setItem('uid',          uid)
      localStorage.setItem('expiry',       expiry)
      localStorage.setItem('token-type',   tokenType)

      // ログイン成功後、企業ダッシュボードへ遷移
      router.push('/company/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-4">
      <h1 className="text-2xl mb-4">企業ログイン</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border px-2 py-1"
          />
        </label>
        <label className="flex flex-col">
          パスワード
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border px-2 py-1"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
