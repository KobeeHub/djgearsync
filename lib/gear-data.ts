export type GearCategory = "player" | "mixer" | "software" | "pc";

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
  player: string;
  mixer: string;
  software: string;
  pc: string;
  score: number;
}

export const STEPS: { key: GearCategory; label: string }[] = [
  { key: "player", label: "プレイヤー" },
  { key: "mixer", label: "ミキサー" },
  { key: "software", label: "DJソフト" },
  { key: "pc", label: "PC" },
];

export const GEAR_OPTIONS: Record<GearCategory, GearOption[]> = {
  player: [
    { id: "cdj-3000", name: "CDJ-3000", manufacturer: "Pioneer DJ" },
    { id: "cdj-2000nx2", name: "CDJ-2000NX2", manufacturer: "Pioneer DJ" },
    { id: "cdj-2000nxs2", name: "CDJ-2000NXS2", manufacturer: "Pioneer DJ" },
    { id: "sc6000", name: "SC6000 Prime", manufacturer: "Denon DJ" },
    { id: "sc5000", name: "SC5000 Prime", manufacturer: "Denon DJ" },
    { id: "xdj-1000mk2", name: "XDJ-1000MK2", manufacturer: "Pioneer DJ" },
  ],
  mixer: [
    { id: "djm-a9", name: "DJM-A9", manufacturer: "Pioneer DJ" },
    { id: "djm-900nxs2", name: "DJM-900NXS2", manufacturer: "Pioneer DJ" },
    { id: "djm-750mk2", name: "DJM-750MK2", manufacturer: "Pioneer DJ" },
    { id: "prime-4", name: "Prime 4+", manufacturer: "Denon DJ" },
    { id: "xone-96", name: "Xone:96", manufacturer: "Allen & Heath" },
    { id: "djm-v10", name: "DJM-V10", manufacturer: "Pioneer DJ" },
  ],
  software: [
    { id: "rekordbox", name: "rekordbox", manufacturer: "Pioneer DJ" },
    { id: "serato", name: "Serato DJ Pro", manufacturer: "Serato" },
    { id: "traktor", name: "Traktor Pro 3", manufacturer: "Native Instruments" },
    { id: "virtualdj", name: "VirtualDJ", manufacturer: "Atomix" },
    { id: "engine-dj", name: "Engine DJ", manufacturer: "Denon DJ" },
  ],
  pc: [
    { id: "mac-m3", name: "MacBook Pro (M3)", manufacturer: "Apple" },
    { id: "mac-m2", name: "MacBook Pro (M2)", manufacturer: "Apple" },
    { id: "win-intel", name: "Windows PC (Intel)", manufacturer: "Generic" },
    { id: "win-amd", name: "Windows PC (AMD)", manufacturer: "Generic" },
    { id: "mac-m1", name: "MacBook Air (M1)", manufacturer: "Apple" },
  ],
};

export const MY_GEAR_SETS: MyGearSet[] = [
  {
    id: "set-1",
    name: "クラブスタンダード",
    author: "DJ_TAKA",
    player: "cdj-3000",
    mixer: "djm-900nxs2",
    software: "rekordbox",
    pc: "mac-m3",
    score: 98,
  },
  {
    id: "set-2",
    name: "Pioneer最新フルセット",
    author: "club_master",
    player: "cdj-3000",
    mixer: "djm-a9",
    software: "rekordbox",
    pc: "mac-m3",
    score: 99,
  },
  {
    id: "set-3",
    name: "Seratoモバイルセット",
    author: "mobile_dj",
    player: "xdj-1000mk2",
    mixer: "djm-750mk2",
    software: "serato",
    pc: "mac-m2",
    score: 92,
  },
  {
    id: "set-4",
    name: "Denonオールインワン",
    author: "denon_user",
    player: "sc6000",
    mixer: "prime-4",
    software: "engine-dj",
    pc: "win-intel",
    score: 95,
  },
  {
    id: "set-5",
    name: "Traktorセットアップ",
    author: "traktor_fan",
    player: "cdj-2000nx2",
    mixer: "xone-96",
    software: "traktor",
    pc: "win-amd",
    score: 88,
  },
  {
    id: "set-6",
    name: "バジェット入門セット",
    author: "beginner_dj",
    player: "xdj-1000mk2",
    mixer: "djm-750mk2",
    software: "rekordbox",
    pc: "mac-m1",
    score: 90,
  },
];

function isPioneer(id: string): boolean {
  return GEAR_OPTIONS.player.some((g) => g.id === id && g.manufacturer === "Pioneer DJ") ||
    GEAR_OPTIONS.mixer.some((g) => g.id === id && g.manufacturer === "Pioneer DJ");
}

function isDenon(id: string): boolean {
  return GEAR_OPTIONS.player.some((g) => g.id === id && g.manufacturer === "Denon DJ") ||
    GEAR_OPTIONS.mixer.some((g) => g.id === id && g.manufacturer === "Denon DJ");
}

export function calculateCompatibility(
  selections: Record<GearCategory, string>
): { score: number; errors: CompatibilityError[]; matchingSets: MyGearSet[] } {
  const errors: CompatibilityError[] = [];
  let score = 100;

  const { player, mixer, software, pc } = selections;

  if (software === "rekordbox" && isDenon(player)) {
    errors.push({
      type: "warning",
      title: "rekordbox × Denon プレイヤー",
      description:
        "rekordboxはPioneer DJ機材との連携が最適化されています。Denonプレイヤーでは一部機能が制限される場合があります。",
    });
    score -= 15;
  }

  if (software === "engine-dj" && isPioneer(player)) {
    errors.push({
      type: "warning",
      title: "Engine DJ × Pioneer プレイヤー",
      description:
        "Engine DJはDenon DJ機材専用ソフトです。Pioneerプレイヤーでは正常に動作しません。",
    });
    score -= 30;
  }

  if (software === "rekordbox" && isPioneer(player) && isPioneer(mixer)) {
    score = Math.min(score + 5, 100);
  }

  if (software === "serato" && mixer === "djm-v10") {
    errors.push({
      type: "warning",
      title: "Serato × DJM-V10",
      description: "DJM-V10はSerato DJ Proの公式サポート対象外です。DVSモードでの利用を検討してください。",
    });
    score -= 10;
  }

  if (software === "traktor" && isPioneer(player)) {
    errors.push({
      type: "warning",
      title: "Traktor × Pioneer プレイヤー",
      description:
        "Traktor Pro 3はPioneer CDJとのHID連携が限定的です。MIDIマッピングが必要になる場合があります。",
    });
    score -= 12;
  }

  if (pc === "mac-m1" && software === "virtualdj") {
    errors.push({
      type: "warning",
      title: "VirtualDJ × M1 Mac",
      description: "M1チップ搭載MacではVirtualDJの一部ビデオ機能が制限される場合があります。",
    });
    score -= 8;
  }

  if (pc === "win-amd" && software === "serato") {
    errors.push({
      type: "warning",
      title: "Serato × AMD Windows",
      description:
        "AMD搭載Windows PCではSerato DJ Proの動作が不安定になる報告があります。Intel搭載を推奨します。",
    });
    score -= 10;
  }

  if (player.startsWith("cdj-") && mixer.startsWith("djm-") && software === "rekordbox") {
    // ideal Pioneer stack — no penalty
  } else if (isDenon(player) && software === "engine-dj") {
    score = Math.min(score + 3, 100);
  }

  score = Math.max(0, Math.min(100, score));

  const matchingSets = MY_GEAR_SETS
    .filter((set) => {
      let matchCount = 0;
      if (set.player === player) matchCount++;
      if (set.mixer === mixer) matchCount++;
      if (set.software === software) matchCount++;
      if (set.pc === pc) matchCount++;
      return matchCount >= 2;
    })
    .sort((a, b) => b.score - a.score);

  if (errors.length === 0 && score >= 95) {
    errors.push({
      type: "warning",
      title: "互換性良好",
      description: "選択された機材構成に大きな問題は検出されませんでした。",
    });
  }

  return { score, errors, matchingSets };
}

export function getGearName(category: GearCategory, id: string): string {
  const option = GEAR_OPTIONS[category].find((g) => g.id === id);
  return option ? option.name : id;
}
