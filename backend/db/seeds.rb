# ── Student のサンプルデータ ──

# db/seeds.rb

Student.delete_all
Student.create!([
  { email: 'student1@example.com',
    password: 'password',
    password_confirmation: 'password',
    graduation_year: 2025 },
  { email: 'student2@example.com',
    password: 'password',
    password_confirmation: 'password',
    graduation_year: 2026 },
])
puts "Seeded #{Student.count} students."

# ── Company のサンプルデータ ──
Company.delete_all

companies = [
  { email: 'corp1@company.com', password: 'password', password_confirmation: 'password', company_name: '株式会社サンプル1', description: 'サンプル企業1です' },
  { email: 'corp2@company.com', password: 'password', password_confirmation: 'password', company_name: '株式会社サンプル2', description: 'サンプル企業2です' },
]

companies.each do |attrs|
  Company.find_or_create_by!(email: attrs[:email]) do |c|
    c.password              = attrs[:password]
    c.password_confirmation = attrs[:password_confirmation]
    c.company_name          = attrs[:company_name]
    c.description           = attrs[:description]
  end
end

puts "Seeded #{Company.count} companies."
