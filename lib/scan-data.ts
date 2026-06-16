export type ScanResultType = "high" | "medium" | "low";

export interface ScanCandidate {
  id: string;
  name: string;
  manufacturer: string;
  confidence: number;
}

export const NEON = "#00c8f0";
export const GOLD = "#f5c842";
export const BG = "#07090f";

export const FREE_DAILY_LIMIT = 3;

export const HIGH_RESULT: ScanCandidate = {
  id: "cdj-3000",
  name: "CDJ-3000",
  manufacturer: "Pioneer DJ",
  confidence: 96,
};

export const MEDIUM_CANDIDATES: ScanCandidate[] = [
  { id: "cdj-3000", name: "CDJ-3000", manufacturer: "Pioneer DJ", confidence: 72 },
  { id: "cdj-2000nx2", name: "CDJ-2000NX2", manufacturer: "Pioneer DJ", confidence: 65 },
  { id: "xdj-1000mk2", name: "XDJ-1000MK2", manufacturer: "Pioneer DJ", confidence: 58 },
];

export const LOW_CONFIDENCE = 38;

export const LOW_SCAN_TIPS = [
  "機材全体が画面内に入るように撮影してください",
  "逆光を避け、明るい場所で撮影してください",
  "正面から、歪みなく撮影してください",
  "レンズを拭いてから撮影してください",
];

export const RESULT_CYCLE: ScanResultType[] = ["high", "medium", "low"];
