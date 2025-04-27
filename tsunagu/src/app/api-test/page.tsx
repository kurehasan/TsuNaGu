// pages/api-test.tsx
'use client'

import { useEffect, useState } from 'react'

export default function ApiTest() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/hello')  // Rails 側で用意した適当なルートに
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div>
      <h1>APIテスト</h1>
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  )
}
