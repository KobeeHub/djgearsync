"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Icon, type IconName } from "@/app/components/GearIcons";

const NEON = "#00c8f0";
const BG = "#07090f";

const FEEDBACK_TYPES: { id: string; icon: IconName; label: string }[] = [
  { id: "good", icon: "smile", label: "良かった点" },
  { id: "bug", icon: "bug", label: "バグ報告" },
  { id: "idea", icon: "idea", label: "改善提案" },
  { id: "gear", icon: "music", label: "機材リクエスト" },
];

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!type) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("feedback").insert([{
      user_id: user?.id ?? null,
      type,
      message: message.trim() || null,
      page: window.location.pathname,
    }]);
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setType(null);
      setMessage("");
    }, 2000);
  }

  return (
    <>
      {/* フローティングボタン */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:opacity-90 sm:bottom-6"
        style={{ backgroundColor: NEON, color: BG, boxShadow: `0 0 20px ${NEON}50` }}
      >
        <Icon name="chat" size={24} />
      </button>

      {/* モーダル */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-t-2xl p-6 sm:rounded-2xl" style={{ backgroundColor: BG, border: "1px solid #1e293b" }}>
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <span style={{ color: "#22c55e", display: "inline-flex" }}><Icon name="checkCircle" size={48} /></span>
                <p className="text-sm font-medium text-white">フィードバックを送信しました！</p>
                <p className="text-xs text-slate-400">ありがとうございます</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">フィードバックを送る</h3>
                  <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><Icon name="close" size={18} /></button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {FEEDBACK_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm transition-all"
                      style={{
                        backgroundColor: type === t.id ? `${NEON}20` : "#0d1117",
                        border: `1px solid ${type === t.id ? NEON : "#1e293b"}`,
                        color: type === t.id ? NEON : "#94a3b8",
                      }}
                    >
                      <Icon name={t.icon} size={22} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="詳細を記入（任意）"
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none mb-4"
                  style={{ backgroundColor: "#0d1117", color: "white", border: "1px solid #1e293b" }}
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!type || loading}
                  className="w-full rounded-full py-3 text-sm font-bold transition-all disabled:opacity-30"
                  style={{ backgroundColor: NEON, color: BG }}
                >
                  {loading ? "送信中..." : "送信する"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
