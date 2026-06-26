"use client";

import { useState } from "react";

const NEON = "#00c8f0";
const GOLD = "#f0a500";
const BG = "#07090f";

const DUMMY_USERS = [
  { rank: 1, name: "DJ_TAKA", points: 12500, tier: "Legend", gear: "CDJ-3000 / DJM-900NXS2" },
  { rank: 2, name: "KOBEE", points: 9800, tier: "Champion", gear: "XDJ-RX3 / rekordbox" },
  { rank: 3, name: "DJ_MASA", points: 8200, tier: "Champion", gear: "CDJ-2000NXS2 / DJM-750MK2" },
  { rank: 4, name: "YUKI_DJ", points: 7650, tier: "Gold", gear: "DDJ-1000 / Serato" },
  { rank: 5, name: "BEAT_KEN", points: 6300, tier: "Gold", gear: "CDJ-3000 / DJM-V10" },
  { rank: 6, name: "DJ_SORA", points: 5100, tier: "Silver", gear: "XDJ-700 / Traktor" },
  { rank: 7, name: "MIKU_DJ", points: 4800, tier: "Silver", gear: "DDJ-400 / rekordbox" },
  { rank: 8, name: "RYU_BEAT", points: 3900, tier: "Club", gear: "CDJ-2000NXS2 / DJM-900NXS2" },
  { rank: 9, name: "DJ_HANA", points: 3200, tier: "Club", gear: "SC6000 / X1850" },
  { rank: 10, name: "TAKESHI_B", points: 2800, tier: "Rookie", gear: "DDJ-200 / rekordbox" },
];

const DUMMY_GEAR = [
  { rank: 1, name: "CDJ-3000", brand: "Pioneer DJ", category: "プレイヤー", users: 3420, share: 34 },
  { rank: 2, name: "DJM-900NXS2", brand: "Pioneer DJ", category: "ミキサー", users: 2980, share: 29 },
  { rank: 3, name: "XDJ-RX3", brand: "Pioneer DJ", category: "一体型", users: 2100, share: 21 },
  { rank: 4, name: "rekordbox", brand: "Pioneer DJ", category: "ソフト", users: 1980, share: 19 },
  { rank: 5, name: "CDJ-2000NXS2", brand: "Pioneer DJ", category: "プレイヤー", users: 1750, share: 17 },
  { rank: 6, name: "DDJ-1000", brand: "Pioneer DJ", category: "コントローラー", users: 1540, share: 15 },
  { rank: 7, name: "DJM-V10", brand: "Pioneer DJ", category: "ミキサー", users: 980, share: 9 },
  { rank: 8, name: "Serato DJ Pro", brand: "Serato", category: "ソフト", users: 870, share: 8 },
  { rank: 9, name: "SC6000", brand: "Denon DJ", category: "プレイヤー", users: 760, share: 7 },
  { rank: 10, name: "Traktor Pro 3", brand: "Native Instruments", category: "ソフト", users: 650, share: 6 },
];

const TIER_COLORS: Record<string, string> = {
  Legend: "#ff6b35",
  Champion: "#a855f7",
  Gold: "#f0a500",
  Silver: "#94a3b8",
  Club: "#00c8f0",
  Rookie: "#22c55e",
};

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span style={{ fontSize: 20 }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: 20 }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: 20 }}>🥉</span>;
  return <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 14 }}>#{rank}</span>;
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<"users" | "gear">("users");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, paddingBottom: 80 }}>
      <header style={{ borderBottom: "1px solid #1e293b", padding: "16px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: NEON, fontWeight: 800, fontSize: 16, letterSpacing: 2 }}>DJ GEAR SYNC</span>
          <span style={{ color: "#94a3b8", fontSize: 12 }}>ランキング</span>
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🏆 グローバルランキング</h1>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>世界中のDJとギアのリアルタイム順位</p>
        </div>

        {/* タブ */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[{ id: "users", label: "👤 ユーザー" }, { id: "gear", label: "🎛️ ギア人気" }].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "users" | "gear")}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid",
                borderColor: activeTab === tab.id ? NEON : "#1e293b",
                backgroundColor: activeTab === tab.id ? `${NEON}22` : "transparent",
                color: activeTab === tab.id ? NEON : "#94a3b8",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ユーザーランキング */}
        {activeTab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DUMMY_USERS.map((user) => (
              <div
                key={user.rank}
                style={{
                  backgroundColor: "#0d1117",
                  border: "1px solid #1e293b",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 32, textAlign: "center" }}>
                  <RankMedal rank={user.rank} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{user.name}</span>
                    <span style={{ color: TIER_COLORS[user.tier], fontSize: 11, fontWeight: 600, backgroundColor: `${TIER_COLORS[user.tier]}22`, padding: "2px 8px", borderRadius: 999 }}>{user.tier}</span>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>{user.gear}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: GOLD, fontWeight: 800, fontSize: 15 }}>{user.points.toLocaleString()}</div>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>pt</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ギア人気ランキング */}
        {activeTab === "gear" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DUMMY_GEAR.map((gear) => (
              <div
                key={gear.rank}
                style={{
                  backgroundColor: "#0d1117",
                  border: "1px solid #1e293b",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 32, textAlign: "center" }}>
                  <RankMedal rank={gear.rank} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{gear.name}</span>
                    <span style={{ color: "#94a3b8", fontSize: 11, backgroundColor: "#1e293b", padding: "2px 8px", borderRadius: 999 }}>{gear.category}</span>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>{gear.brand}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: NEON, fontWeight: 800, fontSize: 15 }}>{gear.share}%</div>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>{gear.users.toLocaleString()}人</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
