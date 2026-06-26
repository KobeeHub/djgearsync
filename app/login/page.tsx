"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const NEON = "#00c8f0";
const BG = "#07090f";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://djgearsync.vercel.app/mygear" },
    });
  };
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("確認メールを送信しました。メールを確認してください。");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = "/mygear";
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ color: NEON, fontSize: "20px", fontWeight: 800, letterSpacing: 2 }}>DJ GEAR SYNC</div>
          <div style={{ color: "#8899aa", fontSize: "14px", marginTop: "8px" }}>
            {isSignUp ? "アカウントを作成" : "ログイン"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "12px", backgroundColor: "#111827", border: `1px solid ${NEON}33`, borderRadius: "8px", color: "white", fontSize: "14px", outline: "none" }}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px", backgroundColor: "#111827", border: `1px solid ${NEON}33`, borderRadius: "8px", color: "white", fontSize: "14px", outline: "none" }}
          />

          {message && (
            <div style={{ color: NEON, fontSize: "13px", textAlign: "center" }}>{message}</div>
          )}

          <button
            onClick={handleAuth}
            disabled={loading}
            style={{ padding: "12px", backgroundColor: NEON, color: "#000", fontWeight: 700, borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "15px" }}
          >
            {loading ? "処理中..." : isSignUp ? "アカウント作成" : "ログイン"}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ padding: "8px", backgroundColor: "transparent", color: "#8899aa", border: "none", cursor: "pointer", fontSize: "13px" }}
          >
            {isSignUp ? "すでにアカウントをお持ちの方はこちら" : "アカウントをお持ちでない方はこちら"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#1e293b" }} />
          <span style={{ color: "#8899aa", fontSize: "12px" }}>または</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#1e293b" }} />
        </div>
        <button
          onClick={handleGoogleLogin}
          style={{ padding: "12px", backgroundColor: "white", color: "#000", fontWeight: 700, borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "15px" }}
        >
          Googleでログイン
        </button></div>
      </div>
    </div>
  );
}