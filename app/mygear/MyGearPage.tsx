"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ACHIEVEMENTS,
  BG,
  GOLD,
  GROWTH_DATA,
  NEON,
  NOTIFICATION_DOTS,
  PRO_NOTIFICATIONS,
  TIER_BADGES,
  USER_GEAR_SETUPS,
  USER_PROFILE,
  formatGearSetupGear,
  getEarnedTierBadges,
  type GrowthDataPoint,
  type ProNotification,
  type UserGearSetup,
} from "@/lib/mygear-data";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
const IS_PRO_USER = false;
const FREE_LIMIT = 1;
const PRO_LIMIT = 4;
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i < rating ? GOLD : "#334155" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CoverArea() {
  return (
    <div
      className="group relative h-32 sm:h-40"
      style={{
        background: `linear-gradient(135deg, ${USER_PROFILE.coverGradient[0]}, ${USER_PROFILE.coverGradient[1]})`,
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: "rgba(7, 9, 15, 0.5)" }}
      >
        <span className="text-sm text-white">📷 カバー写真を変更</span>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white ring-4 ring-[#07090f] sm:h-24 sm:w-24 sm:text-3xl"
      style={{
        background: `linear-gradient(135deg, ${USER_PROFILE.avatarGradient[0]}, ${USER_PROFILE.avatarGradient[1]})`,
        boxShadow: `0 0 20px ${NEON}30`,
      }}
    >
      {USER_PROFILE.initials}
    </div>
  );
}

function RankProgressBar() {
  const progress =
    ((USER_PROFILE.points - 5000) / (USER_PROFILE.nextTierPoints - 5000)) * 100;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{USER_PROFILE.rankLabel}</span>
        <span>{USER_PROFILE.nextTier}</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${clampedProgress}%`,
            background: `linear-gradient(90deg, ${NEON}, ${GOLD})`,
            boxShadow: `0 0 8px ${NEON}50`,
          }}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {USER_PROFILE.points.toLocaleString()} / {USER_PROFILE.nextTierPoints.toLocaleString()} pt
      </p>
    </div>
  );
}

function TierBadgeRow() {
  const earned = getEarnedTierBadges(USER_PROFILE.points);

  return (
    <div className="mt-6 flex justify-between gap-1">
      {TIER_BADGES.map((badge) => {
        const isEarned = earned.includes(badge.id);
        return (
          <div key={badge.id} className="flex flex-col items-center gap-1">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all sm:h-12 sm:w-12 sm:text-xl"
              style={{
                backgroundColor: isEarned ? `${NEON}15` : "#1e293b",
                border: `1px solid ${isEarned ? NEON : "#334155"}`,
                boxShadow: isEarned ? `0 0 12px ${NEON}40` : "none",
                opacity: isEarned ? 1 : 0.4,
                filter: isEarned ? "none" : "grayscale(1)",
              }}
            >
              {badge.icon}
            </div>
            <span
              className="text-[10px] sm:text-xs"
              style={{ color: isEarned ? NEON : "#64748b" }}
            >
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function GearSetupCard({ setup }: { setup: UserGearSetup }) {
  const gearList = formatGearSetupGear(setup);

  return (
    <article
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
    >
      <div
        className="relative h-24 sm:h-28"
        style={{
          background: `linear-gradient(135deg, ${setup.headerGradient[0]}, ${setup.headerGradient[1]})`,
        }}
      >
        {setup.isMain && (
          <span
            className="absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{ backgroundColor: `${GOLD}30`, color: GOLD, border: `1px solid ${GOLD}50` }}
          >
            MAIN
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <h3 className="text-sm font-semibold text-white sm:text-base">{setup.name}</h3>
          <StarRating rating={setup.starRating} />
        </div>
        <span
          className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${NEON}20`, color: NEON }}
        >
          {setup.score}
        </span>
      </div>

      <ul className="space-y-2 p-4">
        {gearList.map((item) => (
          <li key={item.label} className="flex justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{item.label}</span>
            <span className="text-slate-300">{item.value}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          className="w-full rounded-full py-2 text-xs font-medium transition-opacity hover:opacity-90 sm:text-sm"
          style={{
            border: `1px solid ${setup.isMain ? GOLD : NEON}`,
            backgroundColor: setup.isMain ? `${GOLD}15` : `${NEON}10`,
            color: setup.isMain ? GOLD : NEON,
          }}
        >
          {setup.isMain ? "メイン設定済み" : "メインに設定"}
        </button>
      </div>
    </article>
  );
}

function AchievementGrid() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
      {ACHIEVEMENTS.map((achievement) => (
        <div
          key={achievement.id}
          className="flex flex-col items-center gap-1.5 rounded-lg p-3"
          style={{
            backgroundColor: "#0d1117",
            border: `1px solid ${achievement.earned ? `${GOLD}40` : "#1e293b"}`,
            opacity: achievement.earned ? 1 : 0.5,
          }}
        >
          <span className="text-2xl">
            {achievement.earned ? achievement.icon : "🔒"}
          </span>
          <span
            className="text-center text-[10px] leading-tight sm:text-xs"
            style={{ color: achievement.earned ? GOLD : "#64748b" }}
          >
            {achievement.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function GrowthChart({ data, locked }: { data: GrowthDataPoint[]; locked: boolean }) {
  const maxPoints = Math.max(...data.map((d) => d.points));

  return (
    <div className="relative">
      <div className={locked ? "select-none blur-sm" : ""}>
        <div className="flex items-end justify-between gap-2 h-32 sm:h-40">
          {data.map((point) => {
            const height = (point.points / maxPoints) * 100;
            return (
              <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center" style={{ height: "100%" }}>
                  <div
                    className="w-full max-w-8 rounded-t transition-all"
                    style={{
                      height: `${height}%`,
                      minHeight: "4px",
                      background: `linear-gradient(180deg, ${NEON}, ${NEON}40)`,
                      boxShadow: `0 0 8px ${NEON}30`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 sm:text-xs">{point.month}</span>
              </div>
            );
          })}
        </div>
      </div>
      {locked && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(7, 9, 15, 0.7)" }}
        >
          <span className="text-xs font-bold tracking-wider" style={{ color: GOLD }}>
            PRO限定
          </span>
          <button
            type="button"
            className="mt-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              border: `1px solid ${GOLD}`,
              backgroundColor: `${GOLD}20`,
              color: GOLD,
            }}
          >
            PROにアップグレード
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationArea({ notifications, locked }: { notifications: ProNotification[]; locked: boolean }) {
  return (
    <div className="relative">
      <div className={locked ? "select-none blur-sm" : ""}>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex items-start gap-3 rounded-lg p-3"
              style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
            >
              <span className="text-sm">{NOTIFICATION_DOTS[notification.level]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300">{notification.message}</p>
                <p className="mt-1 text-xs text-slate-500">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {locked && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(7, 9, 15, 0.7)" }}
        >
          <span className="text-xs font-bold tracking-wider" style={{ color: GOLD }}>
            PRO限定
          </span>
          <button
            type="button"
            className="mt-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              border: `1px solid ${GOLD}`,
              backgroundColor: `${GOLD}20`,
              color: GOLD,
            }}
          >
            PROにアップグレード
          </button>
        </div>
      )}
    </div>
  );
}

const COUNTRIES: { code: string; flag: string; name: string }[] = [
  { code: "JP", flag: "🇯🇵", name: "日本" },
  { code: "US", flag: "🇺🇸", name: "アメリカ" },
  { code: "GB", flag: "🇬🇧", name: "イギリス" },
  { code: "DE", flag: "🇩🇪", name: "ドイツ" },
  { code: "FR", flag: "🇫🇷", name: "フランス" },
  { code: "KR", flag: "🇰🇷", name: "韓国" },
  { code: "CN", flag: "🇨🇳", name: "中国" },
  { code: "AU", flag: "🇦🇺", name: "オーストラリア" },
  { code: "BR", flag: "🇧🇷", name: "ブラジル" },
  { code: "MX", flag: "🇲🇽", name: "メキシコ" },
  { code: "ES", flag: "🇪🇸", name: "スペイン" },
  { code: "IT", flag: "🇮🇹", name: "イタリア" },
  { code: "NL", flag: "🇳🇱", name: "オランダ" },
  { code: "TH", flag: "🇹🇭", name: "タイ" },
  { code: "SG", flag: "🇸🇬", name: "シンガポール" },
  { code: "ID", flag: "🇮🇩", name: "インドネシア" },
  { code: "PH", flag: "🇵🇭", name: "フィリピン" },
  { code: "ZA", flag: "🇿🇦", name: "南アフリカ" },
  { code: "CA", flag: "🇨🇦", name: "カナダ" },
  { code: "AR", flag: "🇦🇷", name: "アルゼンチン" },
];

function getFlag(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.flag ?? "🏳️";
}

function CountryEditor({
  basedCountry, setBasedCountry, playedCountries, setPlayedCountries, onClose,
}: {
  basedCountry: string;
  setBasedCountry: (v: string) => void;
  playedCountries: string[];
  setPlayedCountries: (v: string[]) => void;
  onClose: () => void;
}) {
  function togglePlayed(code: string) {
    if (playedCountries.includes(code)) {
      setPlayedCountries(playedCountries.filter((c) => c !== code));
    } else if (playedCountries.length < 10) {
      setPlayedCountries([...playedCountries, code]);
    }
  }
  return (
    <div className="rounded-lg p-4 space-y-4" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: NEON }}>BASED（拠点国）</p>
        <select value={basedCountry} onChange={(e) => setBasedCountry(e.target.value)}
          className="w-full rounded px-3 py-2 text-sm"
          style={{ backgroundColor: "#131c2e", color: "white", border: "1px solid #1e293b" }}>
          {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
        </select>
      </div>
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: NEON }}>PLAYED（最大10カ国）{playedCountries.length}/10</p>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => {
            const selected = playedCountries.includes(c.code);
            return (
              <button key={c.code} type="button" onClick={() => togglePlayed(c.code)}
                className="rounded-full px-2 py-1 text-xs transition-all"
                style={{
                  backgroundColor: selected ? `${NEON}20` : "transparent",
                  border: `1px solid ${selected ? NEON : "#334155"}`,
                  color: selected ? NEON : "#94a3b8",
                  opacity: !selected && playedCountries.length >= 10 ? 0.4 : 1,
                }}>
                {c.flag} {c.name}
              </button>
            );
          })}
        </div>
      </div>
      <button type="button" onClick={onClose} className="w-full rounded-full py-2 text-sm font-bold"
        style={{ backgroundColor: NEON, color: "#07090f" }}>
        保存する
      </button>
    </div>
  );
}

function StatsRow({ isProUser }: { isProUser: boolean }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {[
        { label: "フォロー", value: "128", pro: false },
        { label: "フォロワー", value: "342", pro: false },
        { label: "MY いいね", value: "1.2k", pro: false },
        { label: "MY投稿数", value: "47", pro: false },
        { label: "MY LINK", value: "設定する", pro: true },
        { label: "MY EVENT", value: "設定する", pro: true },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col items-center rounded-lg py-3 px-2 text-center"
          style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
          {stat.pro && !isProUser ? (
            <>
              <span className="text-base font-bold" style={{ color: "#475569" }}>🔒</span>
              <span className="mt-1 text-[10px]" style={{ color: "#475569" }}>{stat.label}</span>
              <span className="text-[9px] font-bold" style={{ color: GOLD }}>PRO</span>
            </>
          ) : (
            <>
              <span className="text-base font-bold text-white">{stat.value}</span>
              <span className="mt-1 text-[10px] text-slate-400">{stat.label}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function DMSection() {
  const [activeTab, setActiveTab] = useState<"inbox" | "requests">("inbox");
  const [messageText, setMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const dummyMessages = [
    { id: "1", from: "DJ_TAKA", text: "セットアップ最高ですね！", time: "2分前", read: false },
    { id: "2", from: "BEAT_KEN", text: "CDJ-3000どうですか？", time: "1時間前", read: true },
    { id: "3", from: "DJ_SORA", text: "今度一緒にやりましょう！", time: "昨日", read: true },
  ];

  const dummyRequests = [
    { id: "r1", from: "MIKU_DJ", text: "はじめまして！フォローさせてください", time: "3時間前" },
    { id: "r2", from: "RYU_BEAT", text: "機材について聞きたいです", time: "2日前" },
  ];

  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
      {/* タブ */}
      <div className="flex border-b border-slate-800">
        {[{ id: "inbox", label: "受信" }, { id: "requests", label: `リクエスト ${dummyRequests.length}` }].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as "inbox" | "requests")}
            className="flex-1 py-3 text-xs font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? NEON : "#94a3b8",
              borderBottom: activeTab === tab.id ? `2px solid ${NEON}` : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* メッセージリスト */}
      <div className="divide-y divide-slate-800">
        {activeTab === "inbox" && dummyMessages.map((msg) => (
          <button
            key={msg.id}
            type="button"
            onClick={() => setSelectedUser(selectedUser === msg.from ? null : msg.from)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-800/30"
          >
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${NEON}, #0066aa)` }}
            >
              {msg.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{msg.from}</span>
                <span className="text-[10px] text-slate-500">{msg.time}</span>
              </div>
              <p className="text-xs text-slate-400 truncate">{msg.text}</p>
            </div>
            {!msg.read && (
              <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: NEON }} />
            )}
          </button>
        ))}

        {activeTab === "requests" && dummyRequests.map((req) => (
          <div key={req.id} className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              >
                {req.from[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{req.from}</span>
                  <span className="text-[10px] text-slate-500">{req.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{req.text}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2 pl-12">
              <button type="button" className="flex-1 rounded-full py-1.5 text-xs font-medium"
                style={{ backgroundColor: `${NEON}20`, border: `1px solid ${NEON}`, color: NEON }}>
                承認
              </button>
              <button type="button" className="flex-1 rounded-full py-1.5 text-xs font-medium"
                style={{ backgroundColor: "transparent", border: "1px solid #334155", color: "#94a3b8" }}>
                拒否
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 返信エリア */}
      {selectedUser && activeTab === "inbox" && (
        <div className="border-t border-slate-800 p-3">
          <p className="text-xs text-slate-500 mb-2">{selectedUser} に返信</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "#131c2e", color: "white", border: "1px solid #1e293b" }}
            />
            <button
              type="button"
              disabled={!messageText.trim()}
              className="rounded-lg px-4 py-2 text-xs font-bold disabled:opacity-30"
              style={{ backgroundColor: NEON, color: "#07090f" }}
            >
              送信
            </button>
          </div>
        </div>
      )}

      {/* 新規DM */}
      <div className="border-t border-slate-800 p-3">
        <button
          type="button"
          className="w-full rounded-full py-2 text-xs font-medium transition-all hover:opacity-80"
          style={{ border: `1px solid ${NEON}50`, color: NEON }}
        >
          ✉️ 新しいメッセージを送る
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children, pro }: { children: React.ReactNode; pro?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h2 className="text-sm font-medium" style={{ color: NEON }}>
        {children}
      </h2>
      {pro && (
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-bold"
          style={{ backgroundColor: `${GOLD}20`, color: GOLD }}
        >
          PRO
        </span>
      )}
    </div>
  );
}

export default function MyGearPage() {
  const [gearSetups, setGearSetups] = useState<UserGearSetup[]>(USER_GEAR_SETUPS);
  const [basedCountry, setBasedCountry] = useState<string>("JP");
  const [playedCountries, setPlayedCountries] = useState<string[]>(["US", "GB"]);
  const [showCountryEditor, setShowCountryEditor] = useState(false);const [showAddForm, setShowAddForm] = useState(false);
  const [newSetupName, setNewSetupName] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = "/login";
    });
    async function fetchGearProfiles() {
      const { data, error } = await supabase
        .from("my_gear_profiles")
        .select("*");

      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }

      if (data && data.length > 0) {
        const mapped: UserGearSetup[] = data.map((row: any) => ({
          id: row.id,
          name: row.profile_name ?? "未設定のセットアップ",
          isMain: true,
          starRating: 3,
          player: "未設定",
          mixer: "未設定",
          software: "未設定",
          pc: "未設定",
          score: 0,
          headerGradient: ["#00c8f0", "#0d1117"],
        }));
        setGearSetups(mapped);
      }
    }

    fetchGearProfiles();
  }, []);
  async function handleSaveSetup() {
    if (!newSetupName.trim()) {
      alert("セットアップ名を入力してください");
      return;
    }

    const { data, error } = await supabase
      .from("my_gear_profiles")
      .insert([{ profile_name: newSetupName, user_id: (await supabase.auth.getUser()).data.user?.id }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      alert("保存に失敗しました");
      return;
    }

    if (data && data.length > 0) {
      const newSetup: UserGearSetup = {
        id: data[0].id,
        name: data[0].profile_name,
        isMain: false,
        starRating: 3,
        player: "未設定",
        mixer: "未設定",
        software: "未設定",
        pc: "未設定",
        score: 0,
        headerGradient: ["#00c8f0", "#0d1117"],
      };
      setGearSetups([...gearSetups, newSetup]
      );
      setShowAddForm(false);
      setNewSetupName("");
    }
  }
    return (
    <div className="flex flex-1 flex-col" style={{ backgroundColor: BG }}>
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: NEON }}
          >
            DJ GEAR SYNC
          </Link>
          <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">MY GEAR</span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1 rounded border"
                style={{ borderColor: "#1e293b", color: "#94a3b8" }}
              >
                ログアウト
              </button>
            </div>
          </div>
        </header>

      <main className="mx-auto w-full max-w-3xl">
        <CoverArea />

        <div className="relative px-4 sm:px-6">
          <div className="-mt-12 sm:-mt-14">
            <Avatar />
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                {USER_PROFILE.username}
              </h1>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{
                  backgroundColor: `${GOLD}20`,
                  color: GOLD,
                  border: `1px solid ${GOLD}50`,
                }}
              >
                🥇 {USER_PROFILE.rankLabel}
              </span>
              <span className="text-sm font-medium" style={{ color: NEON }}>
                {USER_PROFILE.points.toLocaleString()} pt
              </span>
            </div>

            {/* 国旗エリア */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-500">BASED</span>
                <span className="text-xl">{getFlag(basedCountry)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-500">PLAYED</span>
                <div className="flex gap-0.5 flex-wrap">
                  {playedCountries.map((code) => (
                    <span key={code} className="text-lg">{getFlag(code)}</span>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setShowCountryEditor(!showCountryEditor)}
                className="text-[10px] px-2 py-0.5 rounded-full transition-all"
                style={{ border: `1px solid ${NEON}50`, color: NEON }}>
                ✏️ 編集
              </button>
            </div>

            {showCountryEditor && (
              <div className="mt-3">
                <CountryEditor
                  basedCountry={basedCountry}
                  setBasedCountry={setBasedCountry}
                  playedCountries={playedCountries}
                  setPlayedCountries={setPlayedCountries}
                  onClose={() => setShowCountryEditor(false)}
                />
              </div>
            )}

            <StatsRow isProUser={IS_PRO_USER} />
            <RankProgressBar />
            <TierBadgeRow />
          </div>
        </div>

        <div className="mt-8 space-y-8 px-4 pb-8 sm:px-6">
          <section>
            <SectionTitle>MY GEAR セットアップ</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {gearSetups.map((setup) => (
                <GearSetupCard key={setup.id} setup={setup} />
              ))}
            </div>
            {(() => {
        const limit = IS_PRO_USER ? PRO_LIMIT : FREE_LIMIT;
        const canAdd = gearSetups.length < limit;
        return canAdd ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full rounded-lg border-dashed py-4 text-sm font-medium transition-colors hover:opacity-80"
            style={{ borderColor: NEON, color: NEON }}
          >
            + 新規セットアップを追加
          </button>
        ) : (
          <div
            className="w-full rounded-lg border-dashed py-4 text-sm font-medium text-center"
            style={{ borderColor: "#1e293b", color: "#475569", border: "1px dashed" }}
          >
            {IS_PRO_USER ? `上限${PRO_LIMIT}件に達しました` : `FREEプランは${FREE_LIMIT}件まで（PROにアップグレードで${PRO_LIMIT}件）`}
          </div>
        );
      })()}
        {showAddForm && (
          <div
            className="rounded-lg border p-4 space-y-3"
            style={{ borderColor: "#1e293b", backgroundColor: "#0d1117" }}
          >
            <input
              type="text"
              value={newSetupName}
              onChange={(e) => setNewSetupName(e.target.value)}
              placeholder="セットアップ名を入力（例：自宅練習用）"
              className="w-full rounded px-3 py-2 text-sm"
              style={{ backgroundColor: "#131c2e", color: "white", border: "1px solid #1e293b" }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveSetup}
                className="flex-1 rounded py-2 text-sm font-bold"
                style={{ backgroundColor: NEON, color: "#07090f" }}
              >
                保存する
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewSetupName("");
                }}
                className="flex-1 rounded py-2 text-sm font-medium border"
                style={{ borderColor: "#1e293b", color: "#94a3b8" }}
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
          </section>

          <section>
            <SectionTitle>実績バッジ</SectionTitle>
            <AchievementGrid />
          </section>

          <section>
            <SectionTitle pro>成長グラフ</SectionTitle>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
            >
              <GrowthChart data={GROWTH_DATA} locked={!IS_PRO_USER} />
            </div>
          </section>

          <section>
            <SectionTitle pro>通知</SectionTitle>
            <NotificationArea notifications={PRO_NOTIFICATIONS} locked={!IS_PRO_USER} />
          </section>

          <section>
            <SectionTitle>💬 ダイレクトメッセージ</SectionTitle>
            <DMSection />
          </section>
        </div>
      </main>
    </div>
  );

}

