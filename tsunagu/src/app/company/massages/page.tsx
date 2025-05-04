'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyMessagesPage() {
  const router = useRouter()
  const [studentId, setStudentId] = useState('')
  const [content, setContent]     = useState('')
  const [error, setError]         = useState<string| null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const token = localStorage.getItem('access-token')
      const client= localStorage.getItem('client')
      const uid   = localStorage.getItem('uid')

      const res = await fetch('http://localhost:3001/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token!,
          client: client!,
          uid: uid!
        },
        body: JSON.stringify({ message: { student_id: studentId, content } })
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.errors?.join(', ') || '送信失敗')
      alert('メッセージを送信しました')
      setContent('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>インターン生にメッセージを送信</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <label>
          宛先 Student ID
          <input value={studentId} onChange={e=>setStudentId(e.target.value)} required/>
        </label>
        <label>
          内容
          <textarea value={content} onChange={e=>setContent(e.target.value)} required/>
        </label>
        <button type="submit">送信</button>
      </form>
    </div>
  )
}
