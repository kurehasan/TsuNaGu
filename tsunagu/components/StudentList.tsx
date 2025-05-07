// src/components/StudentList.tsx
'use client'

import { useState, useEffect } from 'react'

type Student = {
  id: number
  email: string
  graduation_year: number
}

type StudentListProps = {
  onSelect: (id: number) => void
}

export default function StudentList({ onSelect }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token') || '',
          client:         localStorage.getItem('client')       || '',
          uid:            localStorage.getItem('uid')          || '',
          expiry:         localStorage.getItem('expiry')       || '',
          'token-type':   localStorage.getItem('token-type')   || 'Bearer',
        }
        const res = await fetch('http://localhost:3001/api/v1/students', { headers })
        if (!res.ok) throw new Error('学生一覧の取得に失敗しました')
        const data: Student[] = await res.json()
        setStudents(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  if (loading) return <p>学生情報読み込み中…</p>
  if (error)   return <p className="text-red-500">{error}</p>

  return (
    <ul className="space-y-2">
      {students.map(s => (
        <li key={s.id}>
          <button
            className="w-full text-left p-4 border rounded hover:bg-gray-100"
            onClick={() => onSelect(s.id)}
          >
            ID: {s.id} | メール: {s.email} | 卒業年度: {s.graduation_year}
          </button>
        </li>
      ))}
    </ul>
  )
}
