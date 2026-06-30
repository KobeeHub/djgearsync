import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-between min-h-screen bg-[#07090f] py-10">
      <div />

      <main className="flex flex-col items-center gap-3 text-center px-4">
        <p
          className="text-xs font-medium tracking-[0.15em] text-[#00c8f0]/70 sm:text-sm"
        >
          For all DJ&apos;z in the world
        </p>

        <h1
          className="text-4xl font-bold tracking-[0.2em] text-[#00c8f0] sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 0 24px rgba(0, 200, 240, 0.5)" }}
        >
          DJ GEAR SYNC
        </h1>

        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          無料でDJ機材の互換性をチェックする
        </p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Link
            href="/check"
            className="rounded-full border border-[#00c8f0] bg-[#00c8f0]/10 px-10 py-3 text-sm font-medium tracking-wide text-[#00c8f0] transition-all hover:bg-[#00c8f0]/20 hover:shadow-[0_0_20px_rgba(0,200,240,0.4)] sm:text-base"
          >
            チェック
          </Link>

          <Link
            href="/scan"
            className="rounded-full border border-slate-600 bg-slate-800/30 px-10 py-3 text-sm font-medium tracking-wide text-slate-300 transition-all hover:bg-slate-700/40 hover:border-slate-400 sm:text-base"
          >
            スキャン
          </Link>
        </div>
      </main>

      <footer className="text-center">
        <p className="text-xs text-slate-500 tracking-wide">
          Developed by Japan
        </p>
      </footer>
    </div>
  );
}
