"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  COMMUNITY_POSTS,
  FILTER_TABS,
  GLOBAL_RANKING,
  POST_TYPE_COLORS,
  POST_TYPE_LABELS,
  RANK_LABELS,
  countryFlag,
  type CommunityPost,
  type FilterTab,
  type PostType,
} from "@/lib/community-data";
import { Icon, type IconName } from "@/app/components/GearIcons";

const NEON = "#00c8f0";
const BG = "#07090f";

const IS_PRO_USER = false;

// ランクのアイコンと色(絵文字ではなく新デザインのアイコンで表示)
const RANK_VISUALS: Record<string, { icon: IconName; color: string }> = {
  bronze: { icon: "medal", color: "#cd7f32" },
  silver: { icon: "medal", color: "#c0c8d4" },
  gold: { icon: "medal", color: "#f0c030" },
  pro: { icon: "star", color: "#f0c030" },
  legend: { icon: "crown", color: "#ff6b35" },
};

function RankIcon({ rank, size = 16 }: { rank: string; size?: number }) {
  const v = RANK_VISUALS[rank] ?? { icon: "medal" as IconName, color: "#94a3b8" };
  return (
    <span style={{ color: v.color, display: "inline-flex", verticalAlign: "middle" }}>
      <Icon name={v.icon} size={size} />
    </span>
  );
}

function PostTypeBadge({ type }: { type: PostType }) {
  const color = POST_TYPE_COLORS[type];
  return (
    <span
      className="rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
      style={{
        backgroundColor: `${color}20`,
        color,
        border: `1px solid ${color}50`,
      }}
    >
      {POST_TYPE_LABELS[type]}
    </span>
  );
}

function TranslatedBadge() {
  return (
    <span
      className="rounded px-2 py-0.5 text-[10px] font-medium"
      style={{ backgroundColor: "#1e293b", color: "#94a3b8" }}
    >
      <span className="inline-flex items-center gap-1">
        <Icon name="globe" size={12} />
        Translated by AI
      </span>
    </span>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const isDeepLocked = post.type === "deep_answer" && !IS_PRO_USER;

  return (
    <article
      className="rounded-lg p-4 transition-colors"
      style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <PostTypeBadge type={post.type} />
        {post.translated && <TranslatedBadge />}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">{post.title}</h3>

      <div className="relative mt-2">
        <p
          className={`text-sm text-slate-400 leading-relaxed ${isDeepLocked ? "select-none blur-sm" : ""}`}
        >
          {post.body}
        </p>
        {isDeepLocked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: "rgba(7, 9, 15, 0.6)" }}
          >
            <span className="text-xs font-bold tracking-wider" style={{ color: "#a855f7" }}>
              PRO限定コンテンツ
            </span>
            <button
              type="button"
              className="mt-2 rounded-full px-4 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
              style={{
                border: "1px solid #a855f7",
                backgroundColor: "#a855f720",
                color: "#a855f7",
              }}
            >
              PROにアップグレード
            </button>
          </div>
        )}
      </div>

      {post.gearSet && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs" style={{ color: NEON }}>
          <Icon name="link" size={14} />
          {post.gearSet}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{post.author}</span>
          <span className="text-sm">{countryFlag(post.countryCode)}</span>
          <span className="text-xs" title={RANK_LABELS[post.rank]}>
            <RankIcon rank={post.rank} size={16} />
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><Icon name="heart" size={14} /> {post.likes}</span>
          <span className="inline-flex items-center gap-1"><Icon name="chat" size={14} /> {post.comments}</span>
        </div>
      </div>
    </article>
  );
}

function GlobalRanking() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-sm font-medium" style={{ color: NEON }}>
        グローバルランキング
      </h2>
      <div
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-500">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">ユーザー</th>
              <th className="px-4 py-3 text-left">ランク</th>
              <th className="px-4 py-3 text-right">ポイント</th>
            </tr>
          </thead>
          <tbody>
            {GLOBAL_RANKING.map((entry) => (
              <tr
                key={entry.position}
                className="border-b border-slate-800/50 last:border-0"
              >
                <td className="px-4 py-3 font-medium" style={{ color: entry.position <= 3 ? NEON : "#94a3b8" }}>
                  {entry.position}
                </td>
                <td className="px-4 py-3">
                  <span className="text-white">{entry.author}</span>
                  <span className="ml-2">{countryFlag(entry.countryCode)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5" title={RANK_LABELS[entry.rank]}>
                    <RankIcon rank={entry.rank} size={16} />
                    {RANK_LABELS[entry.rank]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium text-white">
                  {entry.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [postInput, setPostInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = activeFilter === "all" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((p) => p.type === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || (p.gearSet ?? "").toLowerCase().includes(q));
    }
    return posts;
  }, [activeFilter, searchQuery]);

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
          <span className="text-xs text-slate-500">コミュニティ</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
        <div
          className="flex items-center gap-3 rounded-lg p-3"
          style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}
        >
          <span className="text-slate-500"><Icon name="pencil" size={20} /></span>
          <input
            type="text"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            placeholder="投稿を作成..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
          <button
            type="button"
            disabled={!postInput.trim()}
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-all disabled:opacity-30 hover:opacity-90"
            style={{
              border: `1px solid ${NEON}`,
              backgroundColor: `${NEON}15`,
              color: NEON,
            }}
          >
            投稿
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0d1117", border: "1px solid #1e293b" }}>
          <span className="text-slate-500"><Icon name="search" size={18} /></span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="機材名・投稿内容を検索..." className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none" />
          {searchQuery && (<button type="button" onClick={() => setSearchQuery("")} className="text-slate-500 hover:text-white"><Icon name="close" size={16} /></button>)}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  backgroundColor: isActive ? `${NEON}20` : "transparent",
                  border: `1px solid ${isActive ? NEON : "#334155"}`,
                  color: isActive ? NEON : "#94a3b8",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-4">
          {filteredPosts.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              該当する投稿がありません
            </p>
          ) : (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>

        {activeFilter === "all" && <GlobalRanking />}
      </main>
    </div>
  );
}
