'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

type Student = {
  id: number
  email: string
  graduation_year: number
}

export default function CompanyMessagesComposePage() {
  const { studentId } = useParams()
  const router        = useRouter()

  const [student, setStudent] = useState<Student | null>(null)
  const [content, setContent] = useState('')
  const [step, setStep]       = useState<'edit' | 'confirm'>('edit')
  const [error, setError]     = useState<string | null>(null)

  // 学生情報を取得
  useEffect(() => {
    ;(async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token') || '',
          client:         localStorage.getItem('client')       || '',
          uid:            localStorage.getItem('uid')          || '',
          expiry:         localStorage.getItem('expiry')       || '',
          'token-type':   localStorage.getItem('token-type')   || 'Bearer',
        }
        const res = await fetch(
          `http://localhost:3001/api/v1/students/${studentId}`,
          { headers }
        )
        if (!res.ok) throw new Error('学生情報の取得に失敗しました')
        setStudent(await res.json())
      } catch (err: any) {
        setError(err.message)
      }
    })()
  }, [studentId])

  // メッセージ送信
  const sendMessage = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token') || '',
        client:         localStorage.getItem('client')       || '',
        uid:            localStorage.getItem('uid')          || '',
        expiry:         localStorage.getItem('expiry')       || '',
        'token-type':   localStorage.getItem('token-type')   || 'Bearer',
      }
      const res = await fetch('http://localhost:3001/api/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: { student_id: Number(studentId), content }
        })
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.errors?.join(', ') || '送信に失敗しました')
      }
      router.push('/conversation/company')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (error)  return <p className="text-red-500 p-6">{error}</p>
  if (!student) return <p className="p-6">読み込み中…</p>

  return (
    <div className="max-w-lg mx-auto p-6">
      {step === 'edit' ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {student.email} へメッセージ作成
          </h1>
          <textarea
            className="w-full h-40 p-2 border"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="ここにメッセージを入力"
          />
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => router.back()}
            >
              戻る
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep('confirm')}
            >
              次へ
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">送信確認</h1>
          <p>
            <strong>宛先：</strong> {student.email} （卒業年度:
            {student.graduation_year}）
          </p>
          <div className="mt-2 p-4 border bg-gray-50 whitespace-pre-wrap">
            {content}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setStep('edit')}
            >
              編集に戻る
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={sendMessage}
            >
              送信する
            </button>
          </div>
        </>
      )}
    </div>
  )
}
