"use client";

import { useState } from "react";

export default function ScanPage() {
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleScan = () => {
    setScanned(true);
    setResult("Pioneer CDJ-3000");
    setConfidence(92);
  };

  const reset = () => {
    setScanned(false);
    setResult(null);
    setConfidence(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07090f", display: "flex", flexDirection: "column" }}>

      <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
        <div style={{ color: "#00c8f0", fontSize: 20, fontWeight: 800, letterSpacing: 2 }}>
          DJ GEAR SYNC
        </div>
        <div style={{ color: "#4a6a85", fontSize: 13, marginTop: 4 }}>
          📷 AIギアスキャン
        </div>
      </div>

      <div style={{ margin: "0 16px 8px", backgroundColor: "#0d1a10", borderLeft: "3px solid #00e89a", borderRadius: 8, padding: "10px 14px" }}>
        <span style={{ color: "#00e89a", fontSize: 12 }}>
          💡 1機材ずつ映すと認識精度が上がります
        </span>
      </div>

      <div style={{ flex: 1, margin: "0 16px", borderRadius: 16, overflow: "hidden", backgroundColor: "#0d1117", position: "relative", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 240, height: 240 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: "3px solid #00c8f0", borderLeft: "3px solid #00c8f0" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 24, height: 24, borderTop: "3px solid #00c8f0", borderRight: "3px solid #00c8f0" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 24, height: 24, borderBottom: "3px solid #00c8f0", borderLeft: "3px solid #00c8f0" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderBottom: "3px solid #00c8f0", borderRight: "3px solid #00c8f0" }} />
          <div style={{ position: "absolute", bottom: -28, left: 0, right: 0, textAlign: "center", color: "#4a6a85", fontSize: 11 }}>
            機材を枠内に収めてください
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 12, color: "#4a6a85", fontSize: 11, textAlign: "center" }}>
          📱 カメラ機能はアプリ版で利用できます
        </div>
      </div>{scanned && result ? (
        <div style={{ backgroundColor: "#0d1117", margin: 16, borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ color: "#4a6a85", fontSize: 12 }}>AI信頼度: {confidence}%</span>
          <div style={{ height: 6, backgroundColor: "#131c2e", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: 6, borderRadius: 3, width: `${confidence}%`, backgroundColor: "#00c8f0" }} />
          </div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>{result}</div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ flex: 1, backgroundColor: "#00c8f0", padding: 14, borderRadius: 12, border: "none", color: "#07090f", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              MY GEARに追加
            </button>
            <button onClick={reset} style={{ flex: 1, backgroundColor: "transparent", padding: 14, borderRadius: 12, border: "1px solid #00c8f0", color: "#00c8f0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              再スキャン
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
          <button onClick={handleScan} style={{ backgroundColor: "#00c8f0", padding: "16px 56px", borderRadius: 50, border: "none", color: "#07090f", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
            スキャン
          </button>
        </div>
      )}
    </div>
  );
}