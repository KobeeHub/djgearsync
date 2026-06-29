// ============================================================
// DJ GEAR SYNC — gear-data.ts (v2)
// ============================================================

// ─── カテゴリー型 ───────────────────────────────────────────
export type SetupType = "dvs-cdj" | "dvs-turntable" | "controller" | "standalone";

export type GearCategory =
  | "setupType"
  | "player"
  | "turntable"
  | "phase"
  | "mixer"
  | "software"
  | "device"
  | "controller" | "pc";

// ─── 基本型 ─────────────────────────────────────────────────
export interface GearOption {
  id: string;
  name: string;
  manufacturer: string;
}

export interface CompatibilityError {
  type: "error" | "warning";
  title: string;
  description: string;
}

export interface MyGearSet {
  id: string;
  name: string;
  author: string;
  player?: string;
  turntable?: string;
  phase?: string;
  mixer?: string;
  software?: string;
  device?: string;
  controller?: string;
  score: number;
}

// ─── セットアップタイプ ──────────────────────────────────────
export const SETUP_TYPES: GearOption[] = [
  { id: "dvs-cdj",       name: "CDJ / マルチプレイヤー",           manufacturer: "" },
  { id: "dvs-turntable", name: "ターンテーブル",                    manufacturer: "" },
  { id: "controller",    name: "DJコントローラー（オールインワン）", manufacturer: "" },
];

// ─── CDJ / マルチプレイヤー ──────────────────────────────────
export const PLAYER_OPTIONS: GearOption[] = [
  // AlphaTheta / Pioneer DJ
  { id: "cdj-3000",      name: "CDJ-3000",        manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "cdj-2000nxs2",  name: "CDJ-2000NXS2",    manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "cdj-2000nx2",   name: "CDJ-2000NX2",     manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "xdj-1000mk2",   name: "XDJ-1000MK2",     manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "xdj-700",       name: "XDJ-700",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  // Denon DJ
  { id: "sc6000m",       name: "SC6000M Prime",    manufacturer: "Denon DJ" },
  { id: "sc6000",        name: "SC6000 Prime",     manufacturer: "Denon DJ" },
  { id: "sc5000m",       name: "SC5000M Prime",    manufacturer: "Denon DJ" },
  { id: "sc5000",        name: "SC5000 Prime",     manufacturer: "Denon DJ" },
  // Rane
  { id: "rane-twelve",   name: "Rane Twelve MKII", manufacturer: "Rane" },
];

// ─── ターンテーブル ──────────────────────────────────────────
export const TURNTABLE_OPTIONS: GearOption[] = [
  { id: "sl-1200mk7",    name: "SL-1200MK7",       manufacturer: "Technics" },
  { id: "sl-1200gr",     name: "SL-1200GR",        manufacturer: "Technics" },
  { id: "sl-1200gae",    name: "SL-1200GAE",       manufacturer: "Technics" },
  { id: "sl-1210mk2",    name: "SL-1210MK2",       manufacturer: "Technics" },
  { id: "tt-1000",       name: "TT-1000",           manufacturer: "Reloop" },
  { id: "rp-8000mk2",    name: "RP-8000 MK2",      manufacturer: "Reloop" },
  { id: "rane-twelve",   name: "Rane Twelve MKII", manufacturer: "Rane" },
  { id: "stanton-str8",  name: "STR8-150 MK2",     manufacturer: "Stanton" },
];

// ─── Phase ──────────────────────────────────────────────────
export const PHASE_OPTIONS: GearOption[] = [
  { id: "none",            name: "使用しない",           manufacturer: "" },
  { id: "phase-essential", name: "Phase Essential",     manufacturer: "MWM" },
  { id: "phase-expert",    name: "Phase Expert",        manufacturer: "MWM" },
];

// ─── ミキサー ────────────────────────────────────────────────
export const MIXER_OPTIONS: GearOption[] = [
  // AlphaTheta / Pioneer DJ — DJM
  { id: "djm-a9",        name: "DJM-A9",           manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "djm-v10",       name: "DJM-V10",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "djm-900nxs2",   name: "DJM-900NXS2",      manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "djm-750mk2",    name: "DJM-750MK2",       manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "djm-450",       name: "DJM-450",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "djm-250mk2",    name: "DJM-250MK2",       manufacturer: "AlphaTheta (Pioneer DJ)" },
  // Allen & Heath
  { id: "xone-96",       name: "Xone:96",          manufacturer: "Allen & Heath" },
  { id: "xone-92",       name: "Xone:92",          manufacturer: "Allen & Heath" },
  { id: "xone-43",       name: "Xone:43",          manufacturer: "Allen & Heath" },
  { id: "xone-pb2",      name: "Xone:PB2",         manufacturer: "Allen & Heath" },
  // Rane
  { id: "rane-seventy",  name: "SEVENTY",          manufacturer: "Rane" },
  { id: "rane-seventy2", name: "SEVENTY-TWO MKII", manufacturer: "Rane" },
  // Denon DJ
  { id: "x1850",         name: "X1850 Prime",      manufacturer: "Denon DJ" },
  { id: "x1800",         name: "X1800 Prime",      manufacturer: "Denon DJ" },
  // Roland
  { id: "dj-707m",       name: "DJ-707M",          manufacturer: "Roland" },
  { id: "dj-505",        name: "DJ-505",            manufacturer: "Roland" },
  // Ecler
  { id: "ecler-warm2",   name: "WARM2",            manufacturer: "Ecler" },
  { id: "ecler-nuo4",    name: "NUO4",             manufacturer: "Ecler" },
];

// ─── DJソフト ────────────────────────────────────────────────
export const SOFTWARE_OPTIONS: GearOption[] = [
  { id: "rekordbox",   name: "rekordbox DJ",    manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "serato",      name: "Serato DJ Pro",   manufacturer: "Serato" },
  { id: "traktor",     name: "Traktor Pro 3",   manufacturer: "Native Instruments" },
  { id: "virtualdj",  name: "VirtualDJ",        manufacturer: "Atomix" },
  { id: "engine-dj",  name: "Engine DJ",        manufacturer: "Denon DJ" },
  { id: "djay-pro",   name: "djay Pro AI",      manufacturer: "Algoriddim" },
];

// ─── デバイス（PC / タブレット / スマートフォン）─────────────
export const DEVICE_OPTIONS: GearOption[] = [
  // Mac
  { id: "mac-m4",        name: "MacBook Pro (M4)",   manufacturer: "Apple" },
  { id: "mac-m3",        name: "MacBook Pro (M3)",   manufacturer: "Apple" },
  { id: "mac-m2",        name: "MacBook Pro (M2)",   manufacturer: "Apple" },
  { id: "mac-m1",        name: "MacBook Air (M1)",   manufacturer: "Apple" },
  // Windows
  { id: "win-intel",     name: "Windows (Intel)",    manufacturer: "Windows PC" },
  { id: "win-amd",       name: "Windows (AMD)",      manufacturer: "Windows PC" },
  // iPad
  { id: "ipad-pro-m4",   name: "iPad Pro (M4)",      manufacturer: "Apple" },
  { id: "ipad-pro-m2",   name: "iPad Pro (M2)",      manufacturer: "Apple" },
  { id: "ipad-air-m2",   name: "iPad Air (M2)",      manufacturer: "Apple" },
  { id: "ipad-air-m1",   name: "iPad Air (M1)",      manufacturer: "Apple" },
  // iPhone
  { id: "iphone-16pro",  name: "iPhone 16 Pro",      manufacturer: "Apple" },
  { id: "iphone-15pro",  name: "iPhone 15 Pro",      manufacturer: "Apple" },
  { id: "iphone-15",     name: "iPhone 15",          manufacturer: "Apple" },
];

// ─── DJコントローラー ────────────────────────────────────────
export const CONTROLLER_OPTIONS: GearOption[] = [
  // AlphaTheta / Pioneer DJ — DDJ
  { id: "ddj-flx10",    name: "DDJ-FLX10",        manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-rev7",     name: "DDJ-REV7",         manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-rev5",     name: "DDJ-REV5",         manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-1000srt",  name: "DDJ-1000SRT",      manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-1000",     name: "DDJ-1000",         manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-800",      name: "DDJ-800",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-400",      name: "DDJ-400",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  { id: "ddj-200",      name: "DDJ-200",          manufacturer: "AlphaTheta (Pioneer DJ)" },
  // Denon DJ
  { id: "prime4plus",   name: "Prime 4+",         manufacturer: "Denon DJ" },
  { id: "prime2",       name: "Prime 2",          manufacturer: "Denon DJ" },
  { id: "mcx8000",      name: "MCX8000",          manufacturer: "Denon DJ" },
  { id: "sc-live4",     name: "SC LIVE 4",        manufacturer: "Denon DJ" },
  // Native Instruments
  { id: "traktor-s4mk3", name: "Traktor S4 MK3",  manufacturer: "Native Instruments" },
  { id: "traktor-s2mk3", name: "Traktor S2 MK3",  manufacturer: "Native Instruments" },
  { id: "traktor-s3",    name: "Traktor S3",       manufacturer: "Native Instruments" },
  // Numark
  { id: "numark-mixstream", name: "Mixstream Pro+", manufacturer: "Numark" },
  { id: "numark-party2",   name: "Party Mix II",    manufacturer: "Numark" },
  // Hercules
  { id: "hercules-inpulse500", name: "Inpulse 500",    manufacturer: "Hercules" },
  { id: "hercules-inpulse300", name: "Inpulse 300 MK2", manufacturer: "Hercules" },
  // Rane
  { id: "rane-one",     name: "Rane ONE",         manufacturer: "Rane" },
  { id: "rane-four",    name: "Rane FOUR",        manufacturer: "Rane" },
  // Roland
  { id: "roland-dj707m", name: "DJ-707M",         manufacturer: "Roland" },
];

// ─── GEAR_OPTIONS（後方互換・ステップ参照用）────────────────
export const GEAR_OPTIONS: Partial<Record<GearCategory, GearOption[]>> = {
  player:     PLAYER_OPTIONS,
  turntable:  TURNTABLE_OPTIONS,
  phase:      PHASE_OPTIONS,
  mixer:      MIXER_OPTIONS,
  software:   SOFTWARE_OPTIONS,
  device:     DEVICE_OPTIONS,
  controller: CONTROLLER_OPTIONS,
};

// ─── ステップ定義（セットアップタイプ別）────────────────────
export const STEPS_DVS_CDJ: { key: GearCategory; label: string }[] = [
  { key: "player",   label: "CDJ/プレイヤー" },
  { key: "mixer",    label: "ミキサー" },
  { key: "software", label: "DJソフト" },
  { key: "device",   label: "デバイス" },
];

export const STEPS_DVS_TURNTABLE: { key: GearCategory; label: string }[] = [
  { key: "turntable", label: "ターンテーブル" },
  { key: "phase",     label: "Phase" },
  { key: "mixer",     label: "ミキサー" },
  { key: "software",  label: "DJソフト" },
  { key: "device",    label: "デバイス" },
];

export const STEPS_CONTROLLER: { key: GearCategory; label: string }[] = [
  { key: "controller", label: "コントローラー" },
  { key: "software",   label: "DJソフト" },
  { key: "device",     label: "デバイス" },
];

export const STEPS_STANDALONE: { key: GearCategory; label: string }[] = [
  { key: "player",  label: "CDJ/プレイヤー" },
  { key: "mixer",   label: "ミキサー" },
];

// 後方互換
export const STEPS = STEPS_DVS_CDJ;

// ─── ユーティリティ ──────────────────────────────────────────
export function getSteps(setupType: SetupType): { key: GearCategory; label: string }[] {
  switch (setupType) {
    case "dvs-cdj":        return STEPS_DVS_CDJ;
    case "dvs-turntable":  return STEPS_DVS_TURNTABLE;
    case "controller":     return STEPS_CONTROLLER;
    default:               return STEPS_DVS_CDJ;

  }
}

export function getOptionsForCategory(category: GearCategory): GearOption[] {
  return GEAR_OPTIONS[category] ?? [];
}

export function getGearName(category: GearCategory, id: string): string {
  const all = [
    ...PLAYER_OPTIONS, ...TURNTABLE_OPTIONS, ...PHASE_OPTIONS,
    ...MIXER_OPTIONS, ...SOFTWARE_OPTIONS, ...DEVICE_OPTIONS,
    ...CONTROLLER_OPTIONS,
  ];
  return all.find((g) => g.id === id)?.name ?? id;
}

// ─── 互換性チェックロジック ──────────────────────────────────
export function calculateCompatibility(
  setupType: SetupType,
  selections: Partial<Record<GearCategory, string>>
): { score: number; errors: CompatibilityError[]; matchingSets: MyGearSet[] } {
  const errors: CompatibilityError[] = [];
  let score = 100;

  const { player, mixer, software, device, controller, phase } = selections;

  // Pioneer CDJ + rekordbox = 最強スタック
  if (player?.startsWith("cdj-") && software === "rekordbox") {
    score = Math.min(score + 3, 100);
  }

  // Engine DJ × Pioneer プレイヤー
  if (software === "engine-dj" && (player?.startsWith("cdj-") || player?.startsWith("xdj-"))) {
    errors.push({
      type: "error",
      title: "Engine DJ × Pioneer プレイヤー",
      description: "Engine DJはDenon DJ専用ソフトです。Pioneerプレイヤーでは動作しません。",
    });
    score -= 30;
  }

  // rekordbox × Denon プレイヤー
  if (software === "rekordbox" && (player?.startsWith("sc") || player === "prime4plus")) {
    errors.push({
      type: "warning",
      title: "rekordbox × Denon プレイヤー",
      description: "Denonプレイヤーではrekordboxの一部機能（PRO DJ LINK等）が使えません。",
    });
    score -= 15;
  }

  // Serato × DJM-V10（非対応）
  if (software === "serato" && mixer === "djm-v10") {
    errors.push({
      type: "warning",
      title: "Serato × DJM-V10",
      description: "DJM-V10はSerato DJ Proの公式サポート対象外です。DVSモード利用を検討してください。",
    });
    score -= 10;
  }

  // Traktor × Pioneer CDJ（HID制限）
  if (software === "traktor" && player?.startsWith("cdj-")) {
    errors.push({
      type: "warning",
      title: "Traktor × Pioneer CDJ",
      description: "Traktor Pro 3とPioneer CDJのHID連携は限定的です。MIDIマッピングが必要な場合があります。",
    });
    score -= 12;
  }

  // iPad/iPhone × Serato/Traktor（非対応）
  if ((device === "ipad-pro-m4" || device?.startsWith("iphone")) && software === "serato") {
    errors.push({
      type: "warning",
      title: "Serato DJ Pro × iOS",
      description: "Serato DJ ProはiPad/iPhoneに対応していません。djay Pro AIを検討してください。",
    });
    score -= 20;
  }

  // iPad × djay Pro（相性良い）
  if (device?.startsWith("ipad") && software === "djay-pro") {
    score = Math.min(score + 5, 100);
  }

  // Phase × ソフト互換性チェック
  if (phase && phase !== "none" && software === "engine-dj") {
    errors.push({
      type: "warning",
      title: "Phase × Engine DJ",
      description: "PhaseはEngine DJとの連携に制限がある場合があります。設定を確認してください。",
    });
    score -= 8;
  }

  // AMD Windows × Serato
  if (device === "win-amd" && software === "serato") {
    errors.push({
      type: "warning",
      title: "Serato × AMD Windows",
      description: "AMD搭載WindowsではSerato DJ Proの動作が不安定になる報告があります。Intel推奨。",
    });
    score -= 10;
  }

  score = Math.max(0, Math.min(100, score));

  if (errors.length === 0) {
    errors.push({
      type: "warning",
      title: "互換性良好",
      description: "選択された機材構成に大きな問題は検出されませんでした。",
    });
  }

  return { score, errors, matchingSets: [] };
}
