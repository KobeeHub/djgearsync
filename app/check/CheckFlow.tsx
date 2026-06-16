"use client";

import Link from "next/link";
import { useState } from "react";
import {
  calculateCompatibility,
  GEAR_OPTIONS,
  getGearName,
  STEPS,
  type GearCategory,
  type CompatibilityError,
  type MyGearSet,
} from "@/lib/gear-data";

const NEON = "#00c8f0";
const BG = "#07090f";

type Selections = Record<GearCategory, string | null>;

const INITIAL_SELECTIONS: Selections = {
  player: null,
  mixer: null,
  software: null,
  pc: null,
};

function StepIndicator({ currentStep, showResult }: { currentStep: number; showResult: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {STEPS.map((step, index) => {
        const isActive = !showResult && index === currentStep;
        const isDone = showResult || index < currentStep;
        return (
          <div key={step.key} className="flex items-center gap-1 sm:gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors sm:h-8 sm:w-8 sm:text-sm"
              style={{
                backgroundColor: isActive || isDone ? `${NEON}20` : "transparent",
                border: `1px solid ${isActive || isDone ? NEON : "#334155"}`,
                color: isActive || isDone ? NEON : "#64748b",
              }}
            >
              {index + 1}
            </div>
            <span
              className="hidden text-xs sm:inline sm:text-sm"
              style={{ color: isActive ? NEON : "#94a3b8" }}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className="h-px w-4 sm:w-8"
                style={{ backgroundColor: isDone ? NEON : "#334155" }}
              />
            )}
          </div>
        );
      })}
      {showResult && (
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className="h-px w-4 sm:w-8"
            style={{ backgroundColor: NEON }}
          />
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium sm:h-8 sm:w-8 sm:text-sm"
            style={{
              backgroundColor: `${NEON}20`,
              border: `1px solid ${NEON}`,
              color: NEON,
            }}
          >
            ✓
          </div>
          <span className="hidden text-xs sm:inline sm:text-sm" style={{ color: NEON }}>
            結果
          </span>
        </div>
      )}
    </div>
  );
}

function GearCard({
  option,
  selected,
  onSelect,
}: {
  option: { id: string; name: string; manufacturer: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-lg p-4 text-left transition-all"
      style={{
        backgroundColor: selected ? `${NEON}15` : "#0d1117",
        border: `1px solid ${selected ? NEON : "#1e293b"}`,
        boxShadow: selected ? `0 0 16px ${NEON}30` : "none",
      }}
    >
      <p className="text-sm font-medium text-white">{option.name}</p>
      <p className="mt-1 text-xs text-slate-400">{option.manufacturer}</p>
    </button>
  );
}

function ScoreDisplay({ score }: { score: number }) {
  const color =
    score >= 90 ? "#22c55e" : score >= 70 ? NEON : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
        style={{
          border: `3px solid ${color}`,
          boxShadow: `0 0 24px ${color}40`,
        }}
      >
        <span className="text-4xl font-bold sm:text-5xl" style={{ color }}>
          {score}
        </span>
      </div>
      <p className="text-sm text-slate-400">互換性スコア / 100</p>
    </div>
  );
}

function ErrorList({ errors }: { errors: CompatibilityError[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium" style={{ color: NEON }}>
        エラー・警告一覧
      </h3>
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

function MyGearSetCard({ set }: { set: MyGearSet }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-white">{set.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">by {set.author}</p>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${NEON}20`, color: NEON }}
        >
          {set.score}
        </span>
      </div>
      <ul className="mt-3 space-y-1 text-xs text-slate-400">
        <li>プレイヤー: {getGearName("player", set.player)}</li>
        <li>ミキサー: {getGearName("mixer", set.mixer)}</li>
        <li>DJソフト: {getGearName("software", set.software)}</li>
        <li>PC: {getGearName("pc", set.pc)}</li>
      </ul>
    </div>
  );
}

export default function CheckFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    errors: CompatibilityError[];
    matchingSets: MyGearSet[];
  } | null>(null);

  const currentCategory = STEPS[currentStep].key;
  const currentSelection = selections[currentCategory];
  const canProceed = currentSelection !== null;

  function handleSelect(id: string) {
    setSelections((prev) => ({ ...prev, [currentCategory]: id }));
  }

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const fullSelections = selections as Record<GearCategory, string>;
      const compatibility = calculateCompatibility(fullSelections);
      setResult(compatibility);
      setShowResult(true);
    }
  }

  function handleBack() {
    if (showResult) {
      setShowResult(false);
      setResult(null);
      setCurrentStep(STEPS.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }

  function handleReset() {
    setSelections(INITIAL_SELECTIONS);
    setCurrentStep(0);
    setShowResult(false);
    setResult(null);
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
          <span className="text-xs text-slate-500">互換性チェック</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">
        <StepIndicator currentStep={currentStep} showResult={showResult} />

        <div className="mt-8 flex-1">
          {showResult && result ? (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white sm:text-2xl">チェック結果</h2>
                <p className="mt-2 text-sm text-slate-400">
                  選択した機材構成の互換性を分析しました
                </p>
              </div>

              <div className="flex justify-center">
                <ScoreDisplay score={result.score} />
              </div>

              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
              >
                <h3 className="mb-3 text-sm font-medium" style={{ color: NEON }}>
                  選択した構成
                </h3>
                <ul className="grid gap-2 text-sm sm:grid-cols-2">
                  {STEPS.map((step) => (
                    <li key={step.key} className="text-slate-300">
                      <span className="text-slate-500">{step.label}: </span>
                      {getGearName(step.key, selections[step.key]!)}
                    </li>
                  ))}
                </ul>
              </div>

              <ErrorList errors={result.errors} />

              <div className="space-y-3">
                <h3 className="text-sm font-medium" style={{ color: NEON }}>
                  同環境の MY GEAR セット
                </h3>
                {result.matchingSets.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    類似の MY GEAR セットは見つかりませんでした。
                  </p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.matchingSets.map((set) => (
                      <MyGearSetCard key={set.id} set={set} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {STEPS[currentStep].label}を選択
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  ステップ {currentStep + 1} / {STEPS.length}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {GEAR_OPTIONS[currentCategory].map((option) => (
                  <GearCard
                    key={option.id}
                    option={option}
                    selected={currentSelection === option.id}
                    onSelect={() => handleSelect(option.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 && !showResult}
            className="rounded-full px-6 py-2.5 text-sm font-medium transition-all disabled:opacity-30"
            style={{
              border: "1px solid #334155",
              color: "#94a3b8",
            }}
          >
            戻る
          </button>

          {showResult ? (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:opacity-90"
              style={{
                border: `1px solid ${NEON}`,
                backgroundColor: `${NEON}15`,
                color: NEON,
              }}
            >
              最初からやり直す
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-all disabled:opacity-30 hover:opacity-90"
              style={{
                border: `1px solid ${NEON}`,
                backgroundColor: `${NEON}15`,
                color: NEON,
              }}
            >
              {currentStep < STEPS.length - 1 ? "次へ" : "結果を見る"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
