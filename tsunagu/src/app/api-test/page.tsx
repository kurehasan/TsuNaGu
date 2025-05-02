'use client'

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Users() {
  const { data: users, error } = useSWR<User[]>('http://localhost:3001/api/v1/users', fetcher);

  if (error) return <div>エラー</div>;
  if (!users) return <div>読み込み中…</div>;

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.email}</li>
      ))}
    </ul>
  );
}
