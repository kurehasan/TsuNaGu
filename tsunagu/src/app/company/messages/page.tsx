'use client'

import { useRouter } from 'next/navigation'
import StudentList from '../../../../components/StudentList'
import React from 'react'

export default function CompanyMessagesSelectPage() {
  const router = useRouter()

  const handleSelect = (studentId: number) => {
    router.push(`/company/messages/${studentId}`)
  }
  
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">メッセージを送る学生を選択</h1>
      <StudentList onSelect={handleSelect} />
    </div>
  )
}
