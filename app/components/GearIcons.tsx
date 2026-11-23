// app/components/GearIcons.tsx
// DJ GEAR SYNC オリジナルのラインアイコン(色は親の color を継承)
// 使い方: <Icon name="home" size={24} />  ※色は style={{ color: "#00c8f0" }} などで指定
import type { ReactElement } from "react";

export type IconName =
  | "player"
  | "turntable"
  | "allinone"
  | "controller"
  | "mixer"
  | "home"
  | "search"
  | "community"
  | "camera"
  | "trophy"
  | "settings"
  | "user"
  | "mail"
  | "lock"
  | "shield"
  | "chat"
  | "document"
  | "laptop"
  | "medal"
  | "link"
  | "idea"
  | "phone"
  | "check"
  | "checkCircle"
  | "smile"
  | "bug"
  | "music"
  | "globe"
  | "heart"
  | "pencil"
  | "star"
  | "crown"
  | "wrench"
  | "broadcast"
  | "mic"
  | "flame"
  | "speaker"
  | "headphones"
  | "diamond"
  | "grid"
  | "close"
  | "dot"
  | "lockOpen";

// 互換用(チェック画面で使用)
export type GearCategory = "player" | "turntable" | "allinone" | "controller";

export const GEAR_CATEGORIES: { id: GearCategory; en: string; ja: string }[] = [
  { id: "player", en: "DJ Players", ja: "プレーヤー(CDJ / XDJ)" },
  { id: "turntable", en: "Turntables", ja: "ターンテーブル" },
  { id: "allinone", en: "All-in-one DJ systems", ja: "オールインワン" },
  { id: "controller", en: "DJ Controllers", ja: "コントローラー" },
];

const SHAPES: Record<IconName, ReactElement> = {
  player: (
    <>
      <rect x="14" y="6" width="36" height="52" rx="5" />
      <rect x="20" y="12" width="24" height="12" rx="2" />
      <circle cx="32" cy="41" r="11" />
      <circle cx="32" cy="41" r="3" />
      <line x1="20" y1="29" x2="26" y2="29" />
      <line x1="38" y1="29" x2="44" y2="29" />
    </>
  ),
  turntable: (
    <>
      <rect x="5" y="10" width="54" height="44" rx="5" />
      <circle cx="27" cy="32" r="15" />
      <circle cx="27" cy="32" r="5" />
      <circle cx="50" cy="18" r="3" />
      <path d="M50 21 L44 40 L40 42" />
      <line x1="52" y1="34" x2="52" y2="48" />
    </>
  ),
  allinone: (
    <>
      <rect x="5" y="26" width="54" height="30" rx="5" />
      <rect x="19" y="8" width="26" height="14" rx="2" />
      <circle cx="18" cy="42" r="8" />
      <circle cx="46" cy="42" r="8" />
      <line x1="30" y1="33" x2="30" y2="50" />
      <line x1="34" y1="33" x2="34" y2="50" />
    </>
  ),
  controller: (
    <>
      <rect x="3" y="16" width="58" height="34" rx="5" />
      <circle cx="17" cy="33" r="9" />
      <circle cx="47" cy="33" r="9" />
      <circle cx="17" cy="33" r="2" />
      <circle cx="47" cy="33" r="2" />
      <line x1="29" y1="24" x2="29" y2="42" />
      <line x1="35" y1="24" x2="35" y2="42" />
      <line x1="26" y1="45" x2="38" y2="45" />
    </>
  ),
  mixer: (
    <>
      <rect x="11" y="6" width="42" height="52" rx="5" />
      <circle cx="21" cy="15" r="3" />
      <circle cx="32" cy="15" r="3" />
      <circle cx="43" cy="15" r="3" />
      <line x1="21" y1="24" x2="21" y2="44" />
      <line x1="32" y1="24" x2="32" y2="44" />
      <line x1="43" y1="24" x2="43" y2="44" />
      <rect x="18" y="30" width="6" height="4" rx="1" />
      <rect x="29" y="36" width="6" height="4" rx="1" />
      <rect x="40" y="27" width="6" height="4" rx="1" />
      <line x1="20" y1="51" x2="44" y2="51" />
    </>
  ),
  home: (
    <>
      <path d="M8 30 L32 9 L56 30" />
      <path d="M14 26 V54 H50 V26" />
      <path d="M26 54 V38 H38 V54" />
    </>
  ),
  search: (
    <>
      <circle cx="27" cy="27" r="17" />
      <line x1="40" y1="40" x2="56" y2="56" />
    </>
  ),
  community: (
    <>
      <circle cx="23" cy="22" r="9" />
      <path d="M6 54 C6 42 14 36 23 36 C32 36 40 42 40 54" />
      <circle cx="45" cy="26" r="6" />
      <path d="M45 38 C53 38 58 43 58 52" />
    </>
  ),
  camera: (
    <>
      <rect x="5" y="18" width="54" height="38" rx="6" />
      <path d="M21 18 L26 9 H38 L43 18" />
      <circle cx="32" cy="37" r="11" />
    </>
  ),
  trophy: (
    <>
      <path d="M20 8 H44 V26 C44 34 38 40 32 40 C26 40 20 34 20 26 Z" />
      <path d="M20 14 H9 C9 24 13 28 20 29" />
      <path d="M44 14 H55 C55 24 51 28 44 29" />
      <line x1="32" y1="40" x2="32" y2="50" />
      <path d="M22 57 H42" />
      <path d="M26 50 H38 L40 57 H24 Z" />
    </>
  ),
  settings: (
    <>
      <circle cx="32" cy="32" r="9" />
      <circle cx="32" cy="32" r="19" />
      <line x1="51.0" y1="32.0" x2="57.0" y2="32.0" />
      <line x1="45.4" y1="45.4" x2="49.7" y2="49.7" />
      <line x1="32.0" y1="51.0" x2="32.0" y2="57.0" />
      <line x1="18.6" y1="45.4" x2="14.3" y2="49.7" />
      <line x1="13.0" y1="32.0" x2="7.0" y2="32.0" />
      <line x1="18.6" y1="18.6" x2="14.3" y2="14.3" />
      <line x1="32.0" y1="13.0" x2="32.0" y2="7.0" />
      <line x1="45.4" y1="18.6" x2="49.7" y2="14.3" />
    </>
  ),
  user: (
    <>
      <circle cx="32" cy="21" r="11" />
      <path d="M10 57 C10 44 20 36 32 36 C44 36 54 44 54 57" />
    </>
  ),
  mail: (
    <>
      <rect x="5" y="14" width="54" height="36" rx="5" />
      <path d="M8 18 L32 36 L56 18" />
    </>
  ),
  lock: (
    <>
      <rect x="13" y="28" width="38" height="27" rx="5" />
      <path d="M21 28 V20 C21 13 26 9 32 9 C38 9 43 13 43 20 V28" />
      <circle cx="32" cy="41" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M32 6 L52 14 V30 C52 44 43 53 32 58 C21 53 12 44 12 30 V14 Z" />
      <rect x="24" y="29" width="16" height="12" rx="2" />
      <path d="M27 29 V25 C27 22 29 20 32 20 C35 20 37 22 37 25 V29" />
    </>
  ),
  chat: (
    <>
      <path d="M10 11 H54 C57 11 58 13 58 16 V38 C58 41 57 43 54 43 H31 L19 54 V43 H10 C7 43 6 41 6 38 V16 C6 13 7 11 10 11 Z" />
      <line x1="18" y1="22" x2="46" y2="22" />
      <line x1="18" y1="31" x2="36" y2="31" />
    </>
  ),
  document: (
    <>
      <path d="M15 6 H38 L50 18 V57 H15 Z" />
      <path d="M38 6 V18 H50" />
      <line x1="23" y1="32" x2="43" y2="32" />
      <line x1="23" y1="42" x2="43" y2="42" />
    </>
  ),
  laptop: (
    <>
      <rect x="12" y="11" width="40" height="29" rx="3" />
      <path d="M5 46 H59 V49 C59 52 57 53 54 53 H10 C7 53 5 52 5 49 Z" />
    </>
  ),
  medal: (
    <>
      <circle cx="32" cy="40" r="15" />
      <path d="M21 7 L28 27" />
      <path d="M43 7 L36 27" />
      <circle cx="32" cy="40" r="6" />
    </>
  ),
  link: (
    <>
      <path d="M26 38 L38 26" />
      <path d="M30 19 L34 15 C38 11 44 11 49 16 C53 20 53 26 49 30 L45 34" />
      <path d="M34 45 L30 49 C26 53 20 53 15 48 C11 44 11 38 15 34 L19 30" />
    </>
  ),
  idea: (
    <>
      <path d="M32 6 C21 6 14 14 14 24 C14 31 18 36 22 40 C24 42 24 45 24 47 H40 C40 45 40 42 42 40 C46 36 50 31 50 24 C50 14 43 6 32 6 Z" />
      <line x1="25" y1="53" x2="39" y2="53" />
      <line x1="28" y1="58" x2="36" y2="58" />
    </>
  ),
  phone: (
    <>
      <rect x="17" y="5" width="30" height="54" rx="6" />
      <line x1="28" y1="51" x2="36" y2="51" />
    </>
  ),
  check: (
    <>
      <path d="M11 34 L26 49 L53 16" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M20 33 L29 42 L45 24" />
    </>
  ),
  smile: (
    <>
      <circle cx="32" cy="32" r="24" />
      <circle cx="24" cy="26" r="2" />
      <circle cx="40" cy="26" r="2" />
      <path d="M20 38 C24 47 40 47 44 38" />
    </>
  ),
  bug: (
    <>
      <ellipse cx="32" cy="38" rx="12" ry="16" />
      <circle cx="32" cy="17" r="6" />
      <line x1="32" y1="24" x2="32" y2="54" />
      <line x1="20" y1="32" x2="8" y2="32" />
      <line x1="20" y1="44" x2="8" y2="44" />
      <line x1="44" y1="32" x2="56" y2="32" />
      <line x1="44" y1="44" x2="56" y2="44" />
      <line x1="27" y1="12" x2="22" y2="6" />
      <line x1="37" y1="12" x2="42" y2="6" />
    </>
  ),
  music: (
    <>
      <path d="M24 46 V14 L50 8 V40" />
      <circle cx="18" cy="48" r="6" />
      <circle cx="44" cy="42" r="6" />
    </>
  ),
  globe: (
    <>
      <circle cx="32" cy="32" r="24" />
      <ellipse cx="32" cy="32" rx="10" ry="24" />
      <line x1="8" y1="32" x2="56" y2="32" />
      <path d="M13 19 H51" />
      <path d="M13 45 H51" />
    </>
  ),
  heart: (
    <>
      <path d="M32 54 C10 38 8 26 14 18 C20 10 30 12 32 20 C34 12 44 10 50 18 C56 26 54 38 32 54 Z" />
    </>
  ),
  pencil: (
    <>
      <path d="M9 55 L13 40 L42 11 L53 22 L24 51 Z" />
      <path d="M36 17 L47 28" />
    </>
  ),
  star: (
    <>
      <path d="M32 6 L40 24 L58 26 L44 38 L48 57 L32 47 L16 57 L20 38 L6 26 L24 24 Z" />
    </>
  ),
  crown: (
    <>
      <path d="M7 46 L11 18 L24 32 L32 13 L40 32 L53 18 L57 46 Z" />
      <path d="M10 55 H54" />
    </>
  ),
  wrench: (
    <>
      <path d="M40 10 C32 10 27 17 29 24 L10 43 C7 46 7 51 10 54 C13 57 18 57 21 54 L40 35 C47 37 54 32 54 25 L46 31 L38 28 L36 20 L43 13 C42 11 41 10 40 10 Z" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="32" cy="32" r="4" />
      <path d="M21 21 C15 27 15 37 21 43" />
      <path d="M43 21 C49 27 49 37 43 43" />
      <path d="M12 13 C2 25 2 39 12 51" />
      <path d="M52 13 C62 25 62 39 52 51" />
      <line x1="32" y1="36" x2="32" y2="58" />
    </>
  ),
  mic: (
    <>
      <rect x="23" y="5" width="18" height="30" rx="9" />
      <path d="M15 28 C15 39 22 45 32 45 C42 45 49 39 49 28" />
      <line x1="32" y1="45" x2="32" y2="57" />
      <line x1="23" y1="57" x2="41" y2="57" />
    </>
  ),
  flame: (
    <>
      <path d="M32 6 C34 18 48 24 48 38 C48 48 41 58 32 58 C23 58 16 50 16 40 C16 32 22 28 24 22 C28 26 28 30 30 30 C32 24 30 14 32 6 Z" />
    </>
  ),
  speaker: (
    <>
      <path d="M7 24 H19 L34 11 V53 L19 40 H7 Z" />
      <path d="M42 24 C46 28 46 36 42 40" />
      <path d="M48 17 C56 26 56 38 48 47" />
    </>
  ),
  headphones: (
    <>
      <path d="M10 38 V32 C10 18 20 8 32 8 C44 8 54 18 54 32 V38" />
      <rect x="7" y="36" width="11" height="17" rx="4" />
      <rect x="46" y="36" width="11" height="17" rx="4" />
    </>
  ),
  diamond: (
    <>
      <path d="M32 58 L5 24 L16 8 H48 L59 24 Z" />
      <line x1="5" y1="24" x2="59" y2="24" />
      <path d="M22 8 L27 24 L32 58 L37 24 L42 8" />
    </>
  ),
  grid: (
    <>
      <rect x="8" y="8" width="20" height="20" rx="5" />
      <rect x="36" y="8" width="20" height="20" rx="5" />
      <rect x="8" y="36" width="20" height="20" rx="5" />
      <rect x="36" y="36" width="20" height="20" rx="5" />
    </>
  ),
  close: (
    <>
      <line x1="14" y1="14" x2="50" y2="50" />
      <line x1="50" y1="14" x2="14" y2="50" />
    </>
  ),
  dot: (
    <>
      <circle cx="32" cy="32" r="14" fill="currentColor" />
    </>
  ),
  lockOpen: (
    <>
      <rect x="13" y="28" width="38" height="27" rx="5" />
      <path d="M21 28 V20 C21 13 26 9 32 9 C38 9 43 13 43 20" />
      <circle cx="32" cy="41" r="3" />
    </>
  ),
};

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {SHAPES[name]}
    </svg>
  );
}

// 互換用
export function GearIcon({ type, size = 48 }: { type: GearCategory; size?: number }) {
  return <Icon name={type} size={size} />;
}

// 国旗の代わりに使う国コードのバッジ(例: JP, US)
export function CountryBadge({ code }: { code: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        minWidth: 26,
        padding: "1px 5px",
        border: "1px solid currentColor",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 700,
        lineHeight: "14px",
        textAlign: "center",
        letterSpacing: 0.5,
      }}
    >
      {code}
    </span>
  );
}
