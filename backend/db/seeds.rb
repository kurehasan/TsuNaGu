# backend/db/seeds.rb

# 既存の Student をいったんクリア（開発環境のみで使う場合）
Student.delete_all

# サンプル Student レコードを作成
students = [
  { email: 'alice@student.com', password: 'password', password_confirmation: 'password', graduation_year: 2025 },
  { email: 'bob@student.com',   password: 'password', password_confirmation: 'password', graduation_year: 2026 },
  { email: 'carol@student.com', password: 'password', password_confirmation: 'password', graduation_year: 2027 },
  { email: 'test@test.com',     password: 'testpass', password_confirmation: 'testpass', graduation_year: 2027 }
]

students.each do |attrs|
  Student.create!(attrs)
end

puts "Seeded #{Student.count} students."
