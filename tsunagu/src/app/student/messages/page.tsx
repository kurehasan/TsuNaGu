'use client'

import useSWR from 'swr'
import { useRouter } from 'next/navigation'

const fetcher = (url:string) => fetch(url).then(r=>r.json())

export default function StudentMessagesPage() {
  const router = useRouter()
  const studentId = localStorage.getItem('uid') // ここをStudentのIDに合わせる必要あり
  const { data, error } = useSWR(
    studentId ? `http://localhost:3001/api/v1/messages?student_id=${studentId}` : null,
    fetcher
  )

  if (error) return <p>読み込みエラー</p>
  if (!data) return <p>読み込み中…</p>

  return (
    <div style={{ maxWidth:600, margin:'0 auto', padding:20 }}>
      <h1>受信メッセージ一覧</h1>
      <ul>
        {data.map((msg: any) => (
          <li key={msg.id} style={{ borderBottom:'1px solid #ddd', padding:8 }}>
            <p><strong>From:</strong> {msg.company.company_name || msg.company.email}</p>
            <p>{msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
