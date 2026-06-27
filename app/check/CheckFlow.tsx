"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  calculateCompatibility,
  getGearName,
  getOptionsForCategory,
  getSteps,
  SETUP_TYPES,
  type GearCategory,
  type SetupType,
  type CompatibilityError,
  type GearOption,
} from "@/lib/gear-data";

const NEON = "#00c8f0";
const BG = "#07090f";

// ─── メーカーリスト生成 ───────────────────────────────────────
function getManufacturers(options: GearOption[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const o of options) {
    if (o.manufacturer && !seen.has(o.manufacturer)) {
      seen.add(o.manufacturer);
      result.push(o.manufacturer);
    }
  }
  return result;
}

// ─── StepIndicator ───────────────────────────────────────────
function StepIndicator({
  steps,
  currentStep,
  showResult,
}: {
  steps: { key: GearCategory; label: string }[];
  currentStep: number;
  showResult: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {steps.map((step, index) => {
        const isActive = !showResult && index === currentStep;
        const isDone = showResult || index < currentStep;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: isActive || isDone ? `${NEON}20` : "transparent",
                border: `1px solid ${isActive || isDone ? NEON : "#334155"}`,
                color: isActive || isDone ? NEON : "#64748b",
              }}
            >
              {index + 1}
            </div>
            <span className="hidden text-xs sm:inline" style={{ color: isActive ? NEON : "#94a3b8" }}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className="h-px w-3 sm:w-6" style={{ backgroundColor: isDone ? NEON : "#334155" }} />
            )}
          </div>
        );
      })}
      {showResult && (
        <div className="flex items-center gap-1">
          <div className="h-px w-3 sm:w-6" style={{ backgroundColor: NEON }} />
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium"
            style={{ backgroundColor: `${NEON}20`, border: `1px solid ${NEON}`, color: NEON }}
          >
            ✓
          </div>
          <span className="hidden text-xs sm:inline" style={{ color: NEON }}>結果</span>
        </div>
      )}
    </div>
  );
}

// ─── SetupTypeCard ────────────────────────────────────────────
function SetupTypeCard({
  option,
  selected,
  onSelect,
}: {
  option: GearOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const icons: Record<string, string> = {
    "dvs-cdj": "💿",
    "dvs-turntable": "🎵",
    "controller": "🎛️",
    "standalone": "📀",
  };
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-xl p-5 text-left transition-all w-full"
      style={{
        backgroundColor: selected ? `${NEON}15` : "#0d1117",
        border: `1px solid ${selected ? NEON : "#1e293b"}`,
        boxShadow: selected ? `0 0 20px ${NEON}25` : "none",
      }}
    >
      <span className="text-2xl">{icons[option.id] ?? "🎧"}</span>
      <p className="mt-2 text-sm font-semibold text-white">{option.name}</p>
    </button>
  );
}

// ─── GearSelector（メーカー絞り込み + 直入力）────────────────
function GearSelector({
  options,
  selected,
  onSelect,
  customValue,
  onCustomChange,
  useCustom,
  onToggleCustom,
}: {
  options: GearOption[];
  selected: string | null;
  onSelect: (id: string) => void;
  customValue: string;
  onCustomChange: (v: string) => void;
  useCustom: boolean;
  onToggleCustom: () => void;
}) {
  const manufacturers = useMemo(() => getManufacturers(options), [options]);
  const [selectedMfr, setSelectedMfr] = useState<string | null>(null);

  const filtered = selectedMfr
    ? options.filter((o) => o.manufacturer === selectedMfr)
    : options;

  return (
    <div className="space-y-4">
      {/* メーカーフィルター */}
      {manufacturers.length > 1 && !useCustom && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedMfr(null)}
            className="rounded-full px-3 py-1 text-xs font-medium transition-all"
            style={{
              backgroundColor: selectedMfr === null ? `${NEON}20` : "transparent",
              border: `1px solid ${selectedMfr === null ? NEON : "#334155"}`,
              color: selectedMfr === null ? NEON : "#94a3b8",
            }}
          >
            すべて
          </button>
          {manufacturers.map((mfr) => (
            <button
              key={mfr}
              type="button"
              onClick={() => setSelectedMfr(mfr)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={{
                backgroundColor: selectedMfr === mfr ? `${NEON}20` : "transparent",
                border: `1px solid ${selectedMfr === mfr ? NEON : "#334155"}`,
                color: selectedMfr === mfr ? NEON : "#94a3b8",
              }}
            >
              {mfr}
            </button>
          ))}
        </div>
      )}

      {/* 機材カード一覧 */}
      {!useCustom && (
        <div className="grid gap-2 sm:grid-cols-2">
          {filtered.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="rounded-lg p-3 text-left transition-all"
              style={{
                backgroundColor: selected === option.id ? `${NEON}15` : "#0d1117",
                border: `1px solid ${selected === option.id ? NEON : "#1e293b"}`,
                boxShadow: selected === option.id ? `0 0 16px ${NEON}30` : "none",
              }}
            >
              <p className="text-sm font-medium text-white">{option.name}</p>
              {option.manufacturer && (
                <p className="mt-0.5 text-xs text-slate-400">{option.manufacturer}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 直入力フォーム */}
      {useCustom && (
        <div className="rounded-lg p-4" style={{ backgroundColor: "#0d1117", border: `1px solid ${NEON}40` }}>
          <p className="mb-2 text-xs text-slate-400">機材名を直接入力してください</p>
          <input
            type="text"
            value={customValue}
            onChange={(e) => onCustomChange(e.target.value)}
            placeholder="例: CDJ-3000, Xone:96 ..."
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            style={{ border: `1px solid ${customValue ? NEON : "#334155"}` }}
          />
        </div>
      )}

      {/* 直入力トグル */}
      <button
        type="button"
        onClick={onToggleCustom}
        className="text-xs transition-colors"
        style={{ color: useCustom ? "#94a3b8" : NEON }}
      >
        {useCustom ? "← リストから選択する" : "リストにない機材を直入力する →"}
      </button>
    </div>
  );
}

// ─── ScoreDisplay ─────────────────────────────────────────────
function ScoreDisplay({ score }: { score: number }) {
  const color =
    score >= 90 ? "#22c55e" : score >= 70 ? NEON : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
        style={{ border: `3px solid ${color}`, boxShadow: `0 0 24px ${color}40` }}
      >
        <span className="text-4xl font-bold sm:text-5xl" style={{ color }}>{score}</span>
      </div>
      <p className="text-sm text-slate-400">互換性スコア / 100</p>
    </div>
  );
}

// ─── ErrorList ────────────────────────────────────────────────
function ErrorList({ errors }: { errors: CompatibilityError[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium" style={{ color: NEON }}>エラー・警告一覧</h3>
      {errors.length === 0 ? (
        <p className="text-sm text-slate-400">問題は検出されませんでした。</p>
      ) : (
        <ul className="space-y-2">
          {errors.map((error, i) => (
            <li
              key={i}
              className="rounded-lg p-3"
              style={{
                backgroundColor: "#0d1117",
                border: `1px solid ${error.type === "error" ? "#ef444440" : "#f59e0b40"}`,
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 text-xs font-medium uppercase"
                  style={{ color: error.type === "error" ? "#ef4444" : "#f59e0b" }}
                >
                  {error.type === "error" ? "ERROR" : "WARN"}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{error.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{error.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── DEEPバナー（有料コンテンツ）────────────────────────────
function DeepBanner() {
  return (
    <div
      className="rounded-xl p-5 text-center"
      style={{
        background: `linear-gradient(135deg, #0d1117 0%, ${NEON}10 100%)`,
        border: `1px solid ${NEON}40`,
      }}
    >
      <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: NEON }}>
        💎 DEEP — PRO限定コンテンツ
      </div>
      <p className="text-sm font-semibold text-white">より深い互換性情報を見る</p>
      <ul className="mt-3 space-y-1 text-xs text-slate-400 text-left max-w-xs mx-auto">
        <li>• ソフトver × OSバージョン互換性マトリクス</li>
        <li>• USB / ハブ / LANケーブル種別の注意点</li>
        <li>• HID接続 vs PRO DJ LINK 詳細解説</li>
        <li>• 音質・フォーマット（WAV/FLAC/AAC）深堀り</li>
        <li>• Phase使用時の詳細設定ガイド</li>
      </ul>
      <button
        type="button"
        className="mt-4 rounded-full px-6 py-2 text-xs font-bold transition-all hover:opacity-90"
        style={{ backgroundColor: NEON, color: BG }}
      >
        PROプランで解放する
      </button>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────────
export default function CheckFlow() {
  const [setupType, setSetupType] = useState<SetupType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Partial<Record<GearCategory, string>>>({});
  const [customValues, setCustomValues] = useState<Partial<Record<GearCategory, string>>>({});
  const [useCustom, setUseCustom] = useState<Partial<Record<GearCategory, boolean>>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    errors: CompatibilityError[];
    matchingSets: never[];
  } | null>(null);

  const steps = setupType ? getSteps(setupType) : [];
  const currentCategory = steps[currentStep]?.key;
  const currentOptions = currentCategory ? getOptionsForCategory(currentCategory) : [];
  const currentSelection = currentCategory ? selections[currentCategory] : null;
  const isUsingCustom = currentCategory ? !!useCustom[currentCategory] : false;
  const currentCustom = currentCategory ? customValues[currentCategory] ?? "" : "";
  const canProceed = isUsingCustom ? currentCustom.trim().length > 0 : currentSelection !== null;

  function handleSetupSelect(id: SetupType) {
    setSetupType(id);
    setCurrentStep(0);
    setSelections({});
    setCustomValues({});
    setUseCustom({});
    setShowResult(false);
    setResult(null);
  }

  function handleSelect(id: string) {
    if (!currentCategory) return;
    setSelections((prev) => ({ ...prev, [currentCategory]: id }));
  }

  function handleCustomChange(v: string) {
    if (!currentCategory) return;
    setCustomValues((prev) => ({ ...prev, [currentCategory]: v }));
    setSelections((prev) => ({ ...prev, [currentCategory]: `custom:${v}` }));
  }

  function handleToggleCustom() {
    if (!currentCategory) return;
    setUseCustom((prev) => ({ ...prev, [currentCategory]: !prev[currentCategory] }));
    setSelections((prev) => ({ ...prev, [currentCategory]: null as unknown as string }));
    setCustomValues((prev) => ({ ...prev, [currentCategory]: "" }));
  }

  function handleNext() {
    if (!setupType) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const compatibility = calculateCompatibility(setupType, selections);
      setResult(compatibility);
      setShowResult(true);
    }
  }

  function handleBack() {
    if (showResult) {
      setShowResult(false);
      setResult(null);
      setCurrentStep(steps.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    } else {
      setSetupType(null);
    }
  }

  function handleReset() {
    setSetupType(null);
    setSelections({});
    setCustomValues({});
    setUseCustom({});
    setCurrentStep(0);
    setShowResult(false);
    setResult(null);
  }

  function getDisplayName(category: GearCategory, id: string | undefined): string {
    if (!id) return "未選択";
    if (id.startsWith("custom:")) return id.replace("custom:", "");
    return getGearName(category, id);
  }

  return (
    <div className="flex flex-1 flex-col" style={{ backgroundColor: BG }}>
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: NEON }}>
            DJ GEAR SYNC
          </Link>
          <span className="text-xs text-slate-500">互換性チェック</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">

        {/* ── セットアップタイプ選択 ── */}
        {!setupType && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white sm:text-2xl">セットアップタイプを選択</h2>
              <p className="mt-2 text-sm text-slate-400">あなたのDJスタイルに合ったタイプを選んでください</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SETUP_TYPES.map((option) => (
                <SetupTypeCard
                  key={option.id}
                  option={option}
                  selected={false}
                  onSelect={() => handleSetupSelect(option.id as SetupType)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── ステップUI ── */}
        {setupType && (
          <>
            <StepIndicator steps={steps} currentStep={currentStep} showResult={showResult} />

            <div className="mt-8 flex-1">
              {showResult && result ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">チェック結果</h2>
                    <p className="mt-2 text-sm text-slate-400">選択した機材構成の互換性を分析しました</p>
                  </div>

                  <div className="flex justify-center">
                    <ScoreDisplay score={result.score} />
                  </div>

                  {/* 選択構成サマリー */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
                  >
                    <h3 className="mb-3 text-sm font-medium" style={{ color: NEON }}>選択した構成</h3>
                    <ul className="grid gap-2 text-sm sm:grid-cols-2">
                      {steps.map((step) => (
                        <li key={step.key} className="text-slate-300">
                          <span className="text-slate-500">{step.label}: </span>
                          {getDisplayName(step.key, selections[step.key])}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ErrorList errors={result.errors} />
                  <DeepBanner />
                </div>
              ) : currentCategory ? (
                <div>
                  <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {steps[currentStep].label}を選択
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      ステップ {currentStep + 1} / {steps.length}
                    </p>
                  </div>

                  <GearSelector
                    options={currentOptions}
                    selected={currentSelection ?? null}
                    onSelect={handleSelect}
                    customValue={currentCustom}
                    onCustomChange={handleCustomChange}
                    useCustom={isUsingCustom}
                    onToggleCustom={handleToggleCustom}
                  />
                </div>
              ) : null}
            </div>

            {/* ナビゲーションボタン */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-800 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full px-6 py-2.5 text-sm font-medium transition-all"
                style={{ border: "1px solid #334155", color: "#94a3b8" }}
              >
                {!showResult && currentStep === 0 ? "タイプ選択に戻る" : "戻る"}
              </button>

              {showResult ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:opacity-90"
                  style={{ border: `1px solid ${NEON}`, backgroundColor: `${NEON}15`, color: NEON }}
                >
                  最初からやり直す
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all disabled:opacity-30 hover:opacity-90"
                  style={{ border: `1px solid ${NEON}`, backgroundColor: `${NEON}15`, color: NEON }}
                >
                  {currentStep < steps.length - 1 ? "次へ" : "結果を見る"}
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
