import { getGearName } from "@/lib/gear-data";

export type TierBadgeId = "rookie" | "club" | "sound" | "studio" | "champion" | "legend";

export interface TierBadge {
  id: TierBadgeId;
  icon: string;
  label: string;
  minPoints: number;
}

export interface UserGearSetup {
  id: string;
  name: string;
  isMain: boolean;
  starRating: number;
  player: string;
  mixer: string;
  software: string;
  pc: string;
  score: number;
  headerGradient: [string, string];
}

export interface Achievement {
  id: string;
  icon: string;
  label: string;
  earned: boolean;
}

export interface GrowthDataPoint {
  month: string;
  points: number;
}

export interface ProNotification {
  id: string;
  level: "error" | "warning" | "success";
  message: string;
  time: string;
}

export const NEON = "#00c8f0";
export const GOLD = "#f5c842";
export const BG = "#07090f";

export const TIER_BADGES: TierBadge[] = [
  { id: "rookie", icon: "🎧", label: "Rookie", minPoints: 0 },
  { id: "digger", icon: "🎵", label: "Digger", minPoints: 500 },
  { id: "prodj", icon: "🔊", label: "ProDJ", minPoints: 2000 },
  { id: "master", icon: "🎛️", label: "Master", minPoints: 5000 },
  { id: "champion", icon: "🏆", label: "Champion", minPoints: 8000 },
  { id: "legend", icon: "👑", label: "Legend", minPoints: 12000 },
];

export const USER_PROFILE = {
  username: "DJ_TAKA",
  initials: "DT",
  rank: "master" as const,
  rankLabel: "Master",
  points: 7650,
  nextTier: "Champion",
  nextTierPoints: 10000,
  coverGradient: ["#0a1628", "#1a3a5c"] as [string, string],
  avatarGradient: ["#00c8f0", "#0066aa"] as [string, string],
};

export const USER_GEAR_SETUPS: UserGearSetup[] = [
  {
    id: "setup-1",
    name: "クラブスタンダード",
    isMain: true,
    starRating: 5,
    player: "cdj-3000",
    mixer: "djm-900nxs2",
    software: "rekordbox",
    pc: "mac-m3",
    score: 98,
    headerGradient: ["#1a3a5c", "#00c8f0"],
  },
  {
    id: "setup-2",
    name: "ホーム練習セット",
    isMain: false,
    starRating: 4,
    player: "xdj-1000mk2",
    mixer: "djm-750mk2",
    software: "rekordbox",
    pc: "mac-m1",
    score: 90,
    headerGradient: ["#2d1f4e", "#a855f7"],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", icon: "🎵", label: "初投稿", earned: true },
  { id: "a2", icon: "💡", label: "TIPマスター", earned: true },
  { id: "a3", icon: "🔧", label: "解決者", earned: true },
  { id: "a4", icon: "❤️", label: "100いいね", earned: true },
  { id: "a5", icon: "🌐", label: "グローバルDJ", earned: false },
  { id: "a6", icon: "📡", label: "LINK連携", earned: false },
  { id: "a7", icon: "🎤", label: "ライブ実績", earned: false },
  { id: "a8", icon: "🔥", label: "連続投稿30日", earned: false },
];

export const GROWTH_DATA: GrowthDataPoint[] = [
  { month: "1月", points: 320 },
  { month: "2月", points: 580 },
  { month: "3月", points: 890 },
  { month: "4月", points: 1200 },
  { month: "5月", points: 1580 },
  { month: "6月", points: 2100 },
];

export const PRO_NOTIFICATIONS: ProNotification[] = [
  {
    id: "n1",
    level: "error",
    message: "CDJ-3000のファームウェア更新が利用可能です",
    time: "2時間前",
  },
  {
    id: "n2",
    level: "warning",
    message: "rekordboxライブラリの同期が遅延しています",
    time: "5時間前",
  },
  {
    id: "n3",
    level: "success",
    message: "クラブスタンダードセットの互換性スコアが更新されました",
    time: "1日前",
  },
  {
    id: "n4",
    level: "warning",
    message: "コミュニティで新しい回答がつきました",
    time: "2日前",
  },
];

export function getEarnedTierBadges(points: number): TierBadgeId[] {
  return TIER_BADGES.filter((badge) => points >= badge.minPoints).map((b) => b.id);
}

export function formatGearSetupGear(setup: UserGearSetup) {
  return [
    { label: "プレイヤー", value: getGearName("player", setup.player) },
    { label: "ミキサー", value: getGearName("mixer", setup.mixer) },
    { label: "DJソフト", value: getGearName("software", setup.software) },
    { label: "PC", value: getGearName("pc", setup.pc) },
  ];
}

export const NOTIFICATION_DOTS: Record<ProNotification["level"], string> = {
  error: "🔴",
  warning: "🟡",
  success: "🟢",
};
