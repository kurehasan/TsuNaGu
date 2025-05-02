import Link from "next/link";
import { Noto_Sans_JP, Sawarabi_Gothic } from "next/font/google";
import "./globals.css";
import Header from '../../components/Header'
import type { Metadata } from 'next'

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });
const SawarabiGothic = Sawarabi_Gothic({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = { title: 'TsuNaGu' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />   {/* ここだけが client */}
        <main>{children}</main>
      </body>
    </html>
  );
}
