"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  BG,
  FREE_DAILY_LIMIT,
  GOLD,
  HIGH_RESULT,
  LOW_CONFIDENCE,
  LOW_SCAN_TIPS,
  MEDIUM_CANDIDATES,
  NEON,
  RESULT_CYCLE,
  type ScanCandidate,
  type ScanResultType,
} from "@/lib/scan-data";

const IS_PRO_USER = false;
const SCAN_DURATION_MS = 2200;

type ScanPhase = "idle" | "scanning" | "result";

function ScanCountBar({ used, limit }: { used: number; limit: number }) {
  const pct = IS_PRO_USER ? 100 : (used / limit) * 100;

  return (
    <div
      className="rounded-lg p-3"
      style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">本日のスキャン回数</span>
        {IS_PRO_USER ? (
          <span style={{ color: GOLD }}>PRO · 無制限</span>
        ) : (
          <span style={{ color: used >= limit ? "#ef4444" : NEON }}>
            {used} / {limit} 回
          </span>
        )}
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: IS_PRO_USER ? "100%" : `${Math.min(pct, 100)}%`,
            background: used >= limit && !IS_PRO_USER
              ? "#ef4444"
              : `linear-gradient(90deg, ${NEON}, ${GOLD})`,
          }}
        />
      </div>
      {!IS_PRO_USER && used >= limit && (
        <p className="mt-2 text-xs text-slate-500">
          本日の無料スキャン上限に達しました。
          <span style={{ color: GOLD }}> PRO</span> で無制限スキャン
        </p>
      )}
    </div>
  );
}

function GearSilhouette() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="h-20 w-32 opacity-30 sm:h-24 sm:w-40"
      fill="none"
      stroke={NEON}
      strokeWidth="1.5"
    >
      <rect x="8" y="12" width="104" height="56" rx="4" />
      <rect x="16" y="20" width="40" height="28" rx="2" strokeDasharray="3 2" />
      <circle cx="72" cy="34" r="14" />
      <circle cx="72" cy="34" r="6" />
      <line x1="16" y1="56" x2="104" y2="56" />
      <rect x="20" y="58" width="12" height="4" rx="1" fill={NEON} stroke="none" opacity="0.5" />
      <rect x="36" y="58" width="12" height="4" rx="1" fill={NEON} stroke="none" opacity="0.5" />
      <rect x="52" y="58" width="12" height="4" rx="1" fill={NEON} stroke="none" opacity="0.5" />
    </svg>
  );
}

function Viewfinder({ scanning }: { scanning: boolean }) {
  const bracket = "absolute h-6 w-6 sm:h-8 sm:w-8";
  const bracketStyle = { borderColor: NEON };

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
      style={{ backgroundColor: "#0a0e14" }}
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(${NEON}40 1px, transparent 1px),
            linear-gradient(90deg, ${NEON}40 1px, transparent 1px)
          `,
          backgroundSize: "33.33% 33.33%",
        }}
      />

      <div
        className={`${bracket} top-3 left-3 border-t-2 border-l-2 sm:top-4 sm:left-4`}
        style={bracketStyle}
      />
      <div
        className={`${bracket} top-3 right-3 border-t-2 border-r-2 sm:top-4 sm:right-4`}
        style={bracketStyle}
      />
      <div
        className={`${bracket} bottom-3 left-3 border-b-2 border-l-2 sm:bottom-4 sm:left-4`}
        style={bracketStyle}
      />
      <div
        className={`${bracket} bottom-3 right-3 border-b-2 border-r-2 sm:bottom-4 sm:right-4`}
        style={bracketStyle}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <GearSilhouette />
      </div>

      <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-slate-500 sm:text-xs">
        機材を中央に合わせてください
      </p>

      {scanning && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="scan-line absolute left-0 right-0 h-0.5" style={{ backgroundColor: NEON, boxShadow: `0 0 12px ${NEON}, 0 0 24px ${NEON}` }} />
        </div>
      )}

      <style jsx>{`
        .scan-line {
          animation: scanMove 1.8s ease-in-out infinite;
        }
        @keyframes scanMove {
          0%, 100% { top: 10%; opacity: 0.6; }
          50% { top: 85%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ConfidenceMeter({ value, color }: { value: number; color: string }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="112" height="112" className="-rotate-90">
          <circle cx="56" cy="56" r={radius} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="56"
            cy="56"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
        </div>
      </div>
      <span className="text-xs text-slate-400">信頼度</span>
    </div>
  );
}

function HighResultView({ gear, onConfirm, onReset }: { gear: ScanCandidate; onConfirm: () => void; onReset: () => void }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e50" }}
        >
          高精度マッチ
        </span>
        <h3 className="mt-3 text-lg font-bold text-white">{gear.name}</h3>
        <p className="text-sm text-slate-400">{gear.manufacturer}</p>
      </div>

      <div className="flex justify-center">
        <ConfidenceMeter value={gear.confidence} color="#22c55e" />
      </div>

      <p className="text-center text-sm text-slate-400">
        機材を自動で確定しました
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full py-2.5 text-sm"
          style={{ border: "1px solid #334155", color: "#94a3b8" }}
        >
          再スキャン
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-full py-2.5 text-sm font-medium"
          style={{ border: `1px solid #22c55e`, backgroundColor: "#22c55e20", color: "#22c55e" }}
        >
          確定する
        </button>
      </div>
    </div>
  );
}

function MediumResultView({
  candidates,
  selectedId,
  onSelect,
  onConfirm,
  onReset,
}: {
  candidates: ScanCandidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: `${NEON}20`, color: NEON, border: `1px solid ${NEON}50` }}
        >
          中精度マッチ
        </span>
        <h3 className="mt-3 text-sm font-medium text-white">候補から機材を選択してください</h3>
        <p className="mt-1 text-xs text-slate-400">信頼度 {candidates[0].confidence}% — タップして確定</p>
      </div>

      <div className="space-y-2">
        {candidates.map((candidate) => {
          const selected = selectedId === candidate.id;
          return (
            <button
              key={candidate.id}
              type="button"
              onClick={() => onSelect(candidate.id)}
              className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-all"
              style={{
                backgroundColor: selected ? `${NEON}15` : "#0d1117",
                border: `1px solid ${selected ? NEON : "#1e293b"}`,
                boxShadow: selected ? `0 0 12px ${NEON}30` : "none",
              }}
            >
              <div>
                <p className="text-sm font-medium text-white">{candidate.name}</p>
                <p className="text-xs text-slate-400">{candidate.manufacturer}</p>
              </div>
              <span className="text-sm font-medium" style={{ color: NEON }}>
                {candidate.confidence}%
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full py-2.5 text-sm"
          style={{ border: "1px solid #334155", color: "#94a3b8" }}
        >
          再スキャン
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!selectedId}
          className="flex-1 rounded-full py-2.5 text-sm font-medium disabled:opacity-30"
          style={{ border: `1px solid ${NEON}`, backgroundColor: `${NEON}15`, color: NEON }}
        >
          選択して確定
        </button>
      </div>
    </div>
  );
}

function LowResultView({ onReset }: { onReset: () => void }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: "#ef444420", color: "#ef4444", border: "1px solid #ef444450" }}
        >
          低精度 — 識別失敗
        </span>
        <h3 className="mt-3 text-sm font-medium text-white">機材を特定できませんでした</h3>
      </div>

      <div className="flex justify-center">
        <ConfidenceMeter value={LOW_CONFIDENCE} color="#ef4444" />
      </div>

      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
      >
        <p className="text-xs font-medium text-slate-300">撮影のヒント</p>
        <ul className="mt-2 space-y-1.5">
          {LOW_SCAN_TIPS.map((tip) => (
            <li key={tip} className="text-xs text-slate-500">• {tip}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-full py-2.5 text-sm font-medium"
          style={{ border: `1px solid ${NEON}`, backgroundColor: `${NEON}15`, color: NEON }}
        >
          再撮影してスキャン
        </button>
        <Link
          href="/check"
          className="w-full rounded-full py-2.5 text-center text-sm"
          style={{ border: "1px solid #334155", color: "#94a3b8" }}
        >
          手動で機材を選択する
        </Link>
      </div>
    </div>
  );
}

function ConfirmedView({ gearName, onReset }: { gearName: string; onReset: () => void }) {
  return (
    <div className="space-y-4 text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl"
        style={{ backgroundColor: "#22c55e20", border: "2px solid #22c55e" }}
      >
        ✓
      </div>
      <h3 className="text-lg font-bold text-white">確定完了</h3>
      <p className="text-sm text-slate-400">
        <span style={{ color: NEON }}>{gearName}</span> を MY GEAR に追加しました
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full py-2.5 text-sm"
          style={{ border: `1px solid ${NEON}`, backgroundColor: `${NEON}15`, color: NEON }}
        >
          続けてスキャン
        </button>
        <Link
          href="/mygear"
          className="flex-1 rounded-full py-2.5 text-center text-sm font-medium"
          style={{ border: `1px solid ${GOLD}`, backgroundColor: `${GOLD}15`, color: GOLD }}
        >
          MY GEAR を見る
        </Link>
      </div>
    </div>
  );
}

export default function ScanPage() {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [scansUsed, setScansUsed] = useState(0);
  const [resultType, setResultType] = useState<ScanResultType>("high");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [confirmedGearName, setConfirmedGearName] = useState<string | null>(null);
  const [scanIndex, setScanIndex] = useState(0);

  const canScan = IS_PRO_USER || scansUsed < FREE_DAILY_LIMIT;

  const startScan = useCallback(() => {
    if (!canScan) return;

    const nextResult = RESULT_CYCLE[scanIndex % RESULT_CYCLE.length];
    setResultType(nextResult);
    setSelectedCandidateId(null);
    setConfirmedGearName(null);
    setPhase("scanning");

    setTimeout(() => {
      setPhase("result");
      setScansUsed((n) => n + 1);
      setScanIndex((n) => n + 1);
    }, SCAN_DURATION_MS);
  }, [canScan, scanIndex]);

  const resetScan = () => {
    setPhase("idle");
    setSelectedCandidateId(null);
    setConfirmedGearName(null);
  };

  const confirmHigh = () => {
    setConfirmedGearName(HIGH_RESULT.name);
  };

  const confirmMedium = () => {
    const selected = MEDIUM_CANDIDATES.find((c) => c.id === selectedCandidateId);
    if (selected) setConfirmedGearName(selected.name);
  };

  return (
    <div className="flex flex-1 flex-col" style={{ backgroundColor: BG }}>
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-sm font-medium hover:opacity-80" style={{ color: NEON }}>
            DJ GEAR SYNC
          </Link>
          <span className="text-xs text-slate-500">AI スキャン</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
        <ScanCountBar used={scansUsed} limit={FREE_DAILY_LIMIT} />

        <div className="mt-6">
          {phase !== "result" || confirmedGearName ? (
            <Viewfinder scanning={phase === "scanning"} />
          ) : null}

          <div className="mt-6">
            {confirmedGearName ? (
              <ConfirmedView gearName={confirmedGearName} onReset={resetScan} />
            ) : phase === "idle" ? (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={startScan}
                  disabled={!canScan}
                  className="w-full rounded-full py-3 text-sm font-medium transition-all disabled:opacity-30 hover:opacity-90 sm:text-base"
                  style={{
                    border: `1px solid ${NEON}`,
                    backgroundColor: `${NEON}15`,
                    color: NEON,
                    boxShadow: canScan ? `0 0 20px ${NEON}20` : "none",
                  }}
                >
                  撮影してスキャン開始
                </button>
                {!canScan && (
                  <button
                    type="button"
                    className="w-full rounded-full py-2.5 text-sm font-medium"
                    style={{
                      border: `1px solid ${GOLD}`,
                      backgroundColor: `${GOLD}15`,
                      color: GOLD,
                    }}
                  >
                    PROにアップグレード（無制限スキャン）
                  </button>
                )}
              </div>
            ) : phase === "scanning" ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div
                  className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                  style={{ borderColor: NEON, borderTopColor: "transparent" }}
                />
                <p className="text-sm" style={{ color: NEON }}>AI が機材を解析中...</p>
              </div>
            ) : resultType === "high" ? (
              <HighResultView gear={HIGH_RESULT} onConfirm={confirmHigh} onReset={resetScan} />
            ) : resultType === "medium" ? (
              <MediumResultView
                candidates={MEDIUM_CANDIDATES}
                selectedId={selectedCandidateId}
                onSelect={setSelectedCandidateId}
                onConfirm={confirmMedium}
                onReset={resetScan}
              />
            ) : (
              <LowResultView onReset={resetScan} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
