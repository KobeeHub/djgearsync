export type PostType =
  | "error_report"
  | "verified_fix"
  | "deep_answer"
  | "tip"
  | "question";

export type FilterTab = "all" | PostType;

export type RankTier = "bronze" | "silver" | "gold" | "pro" | "legend";

export interface CommunityPost {
  id: string;
  type: PostType;
  title: string;
  body: string;
  author: string;
  countryCode: string;
  rank: RankTier;
  likes: number;
  comments: number;
  gearSet?: string;
  translated?: boolean;
}

export interface RankingEntry {
  position: number;
  author: string;
  countryCode: string;
  rank: RankTier;
  points: number;
}

export const POST_TYPE_LABELS: Record<PostType, string> = {
  error_report: "ERROR REPORT",
  verified_fix: "VERIFIED FIX",
  deep_answer: "DEEP ANSWER",
  tip: "TIP",
  question: "QUESTION",
};

export const POST_TYPE_COLORS: Record<PostType, string> = {
  error_report: "#ef4444",
  verified_fix: "#22c55e",
  deep_answer: "#a855f7",
  tip: "#f59e0b",
  question: "#3b82f6",
};

export const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "error_report", label: "エラー" },
  { key: "verified_fix", label: "解決策" },
  { key: "deep_answer", label: "DEEP" },
  { key: "tip", label: "TIP" },
  { key: "question", label: "質問" },
];

export const RANK_ICONS: Record<RankTier, string> = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
  pro: "⭐",
  legend: "👑",
};

export const RANK_LABELS: Record<RankTier, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  pro: "PRO",
  legend: "Legend",
};

export function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e5 + char.charCodeAt(0) - 65))
    .join("");
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    type: "error_report",
    title: "CDJ-3000 + rekordbox で波形が表示されない",
    body: "CDJ-3000を2台接続してrekordboxでリンクすると、片方の波形が表示されなくなります。DJM-900NXS2経由で接続しています。",
    author: "DJ_TAKA",
    countryCode: "JP",
    rank: "gold",
    likes: 42,
    comments: 18,
    gearSet: "クラブスタンダード",
    translated: true,
  },
  {
    id: "post-2",
    type: "verified_fix",
    title: "Serato DJ Pro クラッシュ問題の解決方法",
    body: "Windows PCでSerato起動時にクラッシュする場合、グラフィックドライバを最新版に更新し、Seratoの設定でハードウェアアクセラレーションを無効にしてください。",
    author: "fix_master",
    countryCode: "US",
    rank: "pro",
    likes: 89,
    comments: 31,
    gearSet: "Seratoモバイルセット",
  },
  {
    id: "post-3",
    type: "deep_answer",
    title: "Pioneer LINK vs HID モードの詳細比較",
    body: "Pioneer LINKモードではrekordboxがCDJのライブラリを直接読み取り、波形・プレイリスト・ビートグリッドを同期します。HIDモードはMIDIコントローラーとして動作し、ソフトウェア側で全管理が必要です。LINKは低レイテンシで安定、HIDは柔軟性が高いが設定が複雑...",
    author: "tech_dj",
    countryCode: "DE",
    rank: "legend",
    likes: 156,
    comments: 47,
    gearSet: "Pioneer最新フルセット",
    translated: true,
  },
  {
    id: "post-4",
    type: "tip",
    title: "ミキサーのゲイン設定のコツ",
    body: "各チャンネルのゲインを調整する際は、ピーク時に-6dB程度を目安に。マスターゲインは0dB付近で固定し、音量調整はPA側で行うのがベストプラクティスです。",
    author: "sound_guru",
    countryCode: "GB",
    rank: "silver",
    likes: 67,
    comments: 12,
  },
  {
    id: "post-5",
    type: "question",
    title: "Denon SC6000でTraktorは使えますか？",
    body: "SC6000 Primeを購入予定ですが、普段Traktor Pro 3を使っています。Denonプレイヤーとの互換性について教えてください。",
    author: "beginner_dj",
    countryCode: "JP",
    rank: "bronze",
    likes: 15,
    comments: 24,
    gearSet: "バジェット入門セット",
    translated: true,
  },
  {
    id: "post-6",
    type: "deep_answer",
    title: "DJM-A9のイコライザーカーブの数学的背景",
    body: "DJM-A9の3バンドEQは、ロー帯域はシェルビングフィルター、ミッド・ハイはピーキングフィルターとして設計されています。クロスポイントは80Hz/1kHz/10kHzで、各帯域のQ値は...",
    author: "eq_wizard",
    countryCode: "FR",
    rank: "pro",
    likes: 98,
    comments: 19,
    translated: true,
  },
  {
    id: "post-7",
    type: "verified_fix",
    title: "Engine DJでライブラリ同期が遅い問題",
    body: "SC6000のライブラリ同期が遅い場合、Wi-Fiではなく有線LAN接続に切り替え、Engine DJの設定で同期対象フォルダを最小限に絞ることで大幅に改善します。",
    author: "denon_user",
    countryCode: "NL",
    rank: "gold",
    likes: 53,
    comments: 14,
    gearSet: "Denonオールインワン",
  },
  {
    id: "post-8",
    type: "tip",
    title: "USBケーブルの品質が音質に影響する",
    body: "DJ機材間のUSB接続には短く高品質なケーブルを使用してください。特にCDJ↔PC間はデータ転送量が大きいため、安価なケーブルは接続不安定の原因になります。",
    author: "cable_pro",
    countryCode: "US",
    rank: "pro",
    likes: 74,
    comments: 8,
  },
];

export const GLOBAL_RANKING: RankingEntry[] = [
  { position: 1, author: "tech_dj", countryCode: "DE", rank: "legend", points: 12450 },
  { position: 2, author: "fix_master", countryCode: "US", rank: "pro", points: 9870 },
  { position: 3, author: "eq_wizard", countryCode: "FR", rank: "pro", points: 8920 },
  { position: 4, author: "DJ_TAKA", countryCode: "JP", rank: "gold", points: 7650 },
  { position: 5, author: "cable_pro", countryCode: "US", rank: "pro", points: 6780 },
  { position: 6, author: "sound_guru", countryCode: "GB", rank: "silver", points: 5420 },
  { position: 7, author: "denon_user", countryCode: "NL", rank: "gold", points: 4890 },
  { position: 8, author: "beginner_dj", countryCode: "JP", rank: "bronze", points: 1230 },
];
