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
  const [gearSetups, setGearSetups] = useState<UserGearSetup[]>(USER_GEAR_SETUPS);const [showAddForm, setShowAddForm] = useState(false);
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
            <button
          onClick={() => setShowAddForm(true)}
          className="w-full rounded-lg border border-dashed py-4 text-sm font-medium transition-colors hover:opacity-80"
          style={{ borderColor: NEON, color: NEON }}
        >
          ＋ 新規セットアップを追加
        </button>
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
        </div>
      </main>
    </div>
  );

}

