'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

type Message = {
  id: number
  student_id: number
  content: string
  created_at: string
}

export default function CompanyMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token') || '',
          client:         localStorage.getItem('client')        || '',
          uid:            localStorage.getItem('uid')           || '',
          expiry:         localStorage.getItem('expiry')        || '',
          'token-type':   localStorage.getItem('token-type')   || 'Bearer',
        }
        const res = await fetch('http://localhost:3001/api/v1/messages', { headers })
        if (!res.ok) throw new Error('メッセージの取得に失敗しました')
        const data: Message[] = await res.json()
        setMessages(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p className="p-6">読み込み中…</p>
  if (error) return <p className="text-red-500 p-6">{error}</p>

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">送信済みメッセージ一覧</h1>
      {messages.length === 0 ? (
        <p>まだメッセージがありません</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li key={msg.id} className="border p-4 rounded bg-white">
              <p className="text-sm text-gray-600">送信日時: {new Date(msg.created_at).toLocaleString()}</p>
              <p className="mt-2 break-words">{msg.content}</p>
              <Link
                href={`/company/messages/${msg.student_id}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                再度メッセージを送る
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
