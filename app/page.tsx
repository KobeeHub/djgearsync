import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-[#07090f]">
      <main className="flex flex-col items-center gap-10 text-center">
        <h1
          className="text-4xl font-bold tracking-[0.2em] text-[#00c8f0] sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 0 24px rgba(0, 200, 240, 0.5)" }}
        >
          DJ GEAR SYNC
        </h1>
        <Link
          href="/check"
          className="rounded-full border border-[#00c8f0] bg-[#00c8f0]/10 px-8 py-3 text-sm font-medium tracking-wide text-[#00c8f0] transition-all hover:bg-[#00c8f0]/20 hover:shadow-[0_0_20px_rgba(0,200,240,0.4)] sm:text-base"
        >
          互換性チェックを始める
        </Link>
      </main>
    </div>
  );
}

