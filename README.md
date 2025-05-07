# インターン生と企業をつなぐアプリ「TsuNaGu」

## 🛠️ 前提・依存関係

Ruby 3.1.2 以上、Rails 7.0.x

Node.js 18.x 以上、Next.js 最新版

PostgreSQL（または MySQL）

バージョン管理ツール（rbenv / rvm, nvm / volta）おすすめ

## ⚙️ セットアップ手順

### リポジトリをクローン
git clone git@github.com:your-org/your-app.git
cd your-app

### ■ バックエンド (Rails)
cd backend
bundle install
rails db:create db:migrate db:seed

### ■ フロントエンド (Next.js)
cd ../tsunagu
npm install

## 🔑 環境変数

バックエンド（.env/credentials.yml.enc）、
フロントエンド（.env.local）に以下を設定してください。

### Rails
DEVISE_SECRET_KEY=
DATABASE_URL=

### Next.js
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
FRONTEND_BASE_URL=http://localhost:3000

## 🚀 起動方法

### バックエンド
debugger# Rails サーバー
cd backend
rails server -p 3001

### フロントエンド
cd ../tsunagu
npm run dev

## 🎓 マイグレーション・シード管理

新しいモデル追加 → rails db:migrate

ダミーデータ → db/seeds.rb

## 📂 .gitignore

/log
/tmp
/vendor/bundle
/node_modules
/.env*
/frontend/.next

## ‼️ 機能
・企業側から学生にスカウトが送れる  
・学生と企業がそれぞれログインできる  
・会員登録ができる  
