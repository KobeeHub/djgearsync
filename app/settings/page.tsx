"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Icon, type IconName } from "@/app/components/GearIcons";

const NEON = "#00c8f0";
const GOLD = "#f0a500";
const BG = "#07090f";

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ja");
  const [theme, setTheme] = useState("dark");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex flex-1 flex-col" style={{ backgroundColor: BG }}>
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-sm font-medium hover:opacity-80" style={{ color: NEON }}>
            DJ GEAR SYNC
          </Link>
          <span className="text-xs text-slate-500">設定</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 space-y-6 pb-24">

        {/* アカウント */}
        <section>
          <h2 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">アカウント</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
            {([
              { label: "プロフィール編集", icon: "user", href: "/mygear" },
              { label: "メールアドレス変更", icon: "mail", href: "#" },
              { label: "パスワード変更", icon: "lock", href: "#" },
            ] as { label: string; icon: IconName; href: string }[]).map((item, i, arr) => (
              <Link key={item.label} href={item.href}
                className="flex items-center justify-between px-4 py-4 transition-colors hover:bg-slate-800/30"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #1e293b" : "none" }}>
                <div className="flex items-center gap-3">
                  <span style={{ color: NEON, display: "inline-flex" }}><Icon name={item.icon} size={20} /></span>
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <span className="text-slate-500">›</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 通知 */}
        <section>
          <h2 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">通知</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm text-white">プッシュ通知</p>
                <p className="text-xs text-slate-500">DMや返信の通知を受け取る</p>
              </div>
              <button type="button" onClick={() => setNotifications(!notifications)}
                className="relative h-6 w-11 rounded-full transition-colors"
                style={{ backgroundColor: notifications ? NEON : "#334155" }}>
                <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                  style={{ transform: notifications ? "translateX(20px)" : "translateX(2px)" }} />
              </button>
            </div>
          </div>
        </section>

        {/* 言語 */}
        <section>
          <h2 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">言語 / Language</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
            {[{ id: "ja", label: "🇯🇵 日本語" }, { id: "en", label: "🇺🇸 English" }].map((lang, i, arr) => (
              <button key={lang.id} type="button" onClick={() => setLanguage(lang.id)}
                className="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-slate-800/30"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #1e293b" : "none" }}>
                <span className="text-sm text-white">{lang.label}</span>
                {language === lang.id && <span style={{ color: NEON, display: "inline-flex" }}><Icon name="check" size={18} /></span>}
              </button>
            ))}
          </div>
        </section>

        {/* プラン */}
        <section>
          <h2 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">プラン</h2>
          <div className="rounded-xl p-4" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">FREE プラン</p>
                <p className="text-xs text-slate-500">現在のプラン</p>
              </div>
              <button type="button" className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ backgroundColor: `${GOLD}20`, border: `1px solid ${GOLD}50`, color: GOLD }}>
                PROにアップグレード
              </button>
            </div>
          </div>
        </section>

        {/* フィードバック */}
        <section>
          <h2 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">サポート</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
            {([
              { label: "フィードバックを送る", icon: "chat" },
              { label: "利用規約", icon: "document" },
              { label: "プライバシーポリシー", icon: "shield" },
            ] as { label: string; icon: IconName }[]).map((item, i, arr) => (
              <button key={item.label} type="button"
                className="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-slate-800/30"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #1e293b" : "none" }}>
                <div className="flex items-center gap-3">
                  <span style={{ color: NEON, display: "inline-flex" }}><Icon name={item.icon} size={20} /></span>
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <span className="text-slate-500">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* ログアウト */}
        <button type="button" onClick={handleLogout}
          className="w-full rounded-full py-3 text-sm font-bold transition-all hover:opacity-80"
          style={{ border: "1px solid #ef444440", color: "#ef4444", backgroundColor: "#ef444410" }}>
          ログアウト
        </button>

        <p className="text-center text-xs text-slate-600">DJ GEAR SYNC v1.0.0</p>
      </main>
    </div>
  );
}
