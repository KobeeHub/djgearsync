"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "ホーム", href: "/", emoji: "🏠" },
  { label: "チェック", href: "/check", emoji: "🔍" },
  { label: "コミュニティ", href: "/community", emoji: "👥" },
  { label: "MY GEAR", href: "/mygear", emoji: "🎛" },
  { label: "スキャン", href: "/scan", emoji: "📷" },
  { label: "ランキング", href: "/ranking", emoji: "🏆" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <div style={{ height: "72px" }} />
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "#07090f",
          borderTop: "1px solid rgba(0, 200, 240, 0.15)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          height: "72px",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                textDecoration: "none",
                color: isActive ? "#00c8f0" : "rgba(255,255,255,0.45)",
                transition: "color 0.15s ease",
                WebkitTapHighlightColor: "transparent",
                position: "relative",
                paddingTop: "4px",
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "15%",
                    right: "15%",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #00c8f0, transparent)",
                    boxShadow: "0 0 8px #00c8f0",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              )}
              <span
                style={{
                  fontSize: "20px",
                  lineHeight: 1,
                  filter: isActive ? "drop-shadow(0 0 6px rgba(0,200,240,0.8))" : "none",
                  transition: "filter 0.15s ease",
                }}
              >
                {item.emoji}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
