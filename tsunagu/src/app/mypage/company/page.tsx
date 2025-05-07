'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CompanyMyPage() {
  const router = useRouter()
  const [company, setCompany] = useState<{
    id: number
    email: string
    company_name: string
    description: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const headers = {
          'access-token': localStorage.getItem('access-token') || '',
          client: localStorage.getItem('client') || '',
          uid: localStorage.getItem('uid') || '',
          expiry: localStorage.getItem('expiry') || '',
          'token-type': localStorage.getItem('token-type') || 'Bearer',
          'Content-Type': 'application/json',
        }
        const res = await fetch('http://localhost:3001/company_auth/validate_token', {
          headers,
        })
        if (!res.ok) throw new Error('プロフィール取得に失敗しました')
        const data = await res.json()
        // DeviseTokenAuth returns data.data
        setCompany({
          id: data.data.id,
          email: data.data.email,
          company_name: data.data.company_name || '',
          description: data.data.description || '',
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <p>読み込み中…</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">企業マイページ</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">プロフィール</h2>
        <p><strong>会社名：</strong> {company?.company_name}</p>
        <p><strong>メール：</strong> {company?.email}</p>
        <p className="mt-2"><strong>説明：</strong></p>
        <p className="whitespace-pre-wrap">{company?.description}</p>
      </section>

      <div className="flex space-x-4">
        <Link href="/company/messages">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            スカウトする
          </button>
        </Link>
        <Link href="/company/profile/edit">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            プロフィール編集
          </button>
        </Link>
      </div>
    </div>
  )
}
