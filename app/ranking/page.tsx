"use client";
import { useState } from "react";

const DATA: any = {
  global: {
    overall: [
      {rank:1,name:"BeatSurgeon",country:"🇺🇸",tier:"👑",pts:284000,delta:0},
      {rank:2,name:"Selector_Ren",country:"🇰🇷",tier:"🏆",pts:241200,delta:1},
      {rank:3,name:"NightDriver",country:"🇫🇷",tier:"🏆",pts:238900,delta:-1},
      {rank:4,name:"VinylVault_JP",country:"🇯🇵",tier:"🏆",pts:124400,delta:2,you:true},
      {rank:5,name:"DJ_Nexus",country:"🇩🇪",tier:"🎛",pts:98300,delta:0},
    ],
    monthly: [
      {rank:1,name:"NightDriver",country:"🇫🇷",tier:"🏆",pts:18900,delta:5},
      {rank:2,name:"VinylVault_JP",country:"🇯🇵",tier:"🏆",pts:16400,delta:8,you:true},
      {rank:3,name:"BeatSurgeon",country:"🇺🇸",tier:"👑",pts:15200,delta:-1},
      {rank:4,name:"Selector_Ren",country:"🇰🇷",tier:"🏆",pts:11100,delta:-3},
      {rank:5,name:"DJ_Nexus",country:"🇩🇪",tier:"🎛",pts:9400,delta:1},
    ],
  },
  jp: {
    overall: [
      {rank:1,name:"VinylVault_JP",country:"🇯🇵",tier:"🏆",pts:124400,delta:0,you:true},
      {rank:2,name:"KyotoGroove",country:"🇯🇵",tier:"🎛",pts:88200,delta:1},
      {rank:3,name:"OsakaBassHead",country:"🇯🇵",tier:"🎛",pts:76500,delta:-1},
      {rank:4,name:"TechnoRyo",country:"🇯🇵",tier:"🔊",pts:45100,delta:0},
      {rank:5,name:"MidnightSetter",country:"🇯🇵",tier:"🔊",pts:38900,delta:2},
    ],
    monthly: [
      {rank:1,name:"KyotoGroove",country:"🇯🇵",tier:"🎛",pts:9800,delta:3},
      {rank:2,name:"VinylVault_JP",country:"🇯🇵",tier:"🏆",pts:16400,delta:1,you:true},
      {rank:3,name:"MidnightSetter",country:"🇯🇵",tier:"🔊",pts:7100,delta:4},
      {rank:4,name:"OsakaBassHead",country:"🇯🇵",tier:"🎛",pts:6200,delta:-2},
      {rank:5,name:"TechnoRyo",country:"🇯🇵",tier:"🔊",pts:5400,delta:0},
    ],
  },
};

export default function RankingPage() {
  const [scope, setScope] = useState("global");
  const [period, setPeriod] = useState("overall");
  const entries = DATA[scope][period];
  const me = entries.find((e: any) => e.you);

  return (
    <div style={{minHeight:"100vh",background:"#07090f",color:"#b8d4e8",fontFamily:"sans-serif",padding:"18px"}}>
      <div style={{fontSize:9,letterSpacing:2,color:"#4a6a85",fontWeight:700}}>DJ GEAR SYNC</div>
      <div style={{fontSize:18,fontWeight:900,color:"#fff",margin:"4px 0 16px"}}>ランキング</div>
      <div style={{display:"flex",background:"#131c2e",border:"1px solid #1a2840",borderRadius:12,padding:3,marginBottom:10}}>
        {[{k:"global",l:"🌍 グローバル"},{k:"jp",l:"🇯🇵 自国"}].map(o=>(
          <button key={o.k} onClick={()=>setScope(o.k)} style={{flex:1,padding:"10px",borderRadius:9,fontSize:11,fontWeight:800,border:"none",cursor:"pointer",background:scope===o.k?"#00c8f0":"transparent",color:scope===o.k?"#07090f":"#4a6a85"}}>
            {o.l}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16}}>
        {[{k:"monthly",l:"📅 月間"},{k:"overall",l:"🏆 総合"}].map(o=>(
          <button key={o.k} onClick={()=>setPeriod(o.k)} style={{flex:1,padding:"9px",borderRadius:20,fontSize:10,fontWeight:700,border:`1px solid ${period===o.k?"#f5c842":"#1a2840"}`,background:period===o.k?"rgba(245,200,66,0.12)":"transparent",color:period===o.k?"#f5c842":"#4a6a85",cursor:"pointer"}}>
            {o.l}
          </button>
        ))}
      </div>
      {me&&<div style={{background:"rgba(0,200,240,0.12)",border:"1px solid rgba(0,200,240,0.4)",borderRadius:14,padding:16,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:24,fontWeight:900,color:"#00c8f0"}}>#{me.rank}</div>
        <div><div style={{fontSize:9,color:"#4a6a85"}}>あなたの順位</div><div style={{fontSize:11,color:"#00c8f0",fontWeight:700}}>{me.pts.toLocaleString()} pt</div></div>
      </div>}
      <div style={{fontSize:9,letterSpacing:2,color:"#4a6a85",fontWeight:700,marginBottom:10}}>
        {scope==="global"?"🌍 全世界":"🇯🇵 日本"} · {period==="monthly"?"2026年6月 — 毎月1日リセット":"総合ランキング"}
      </div>
      {entries.map((e: any)=>(
        <div key={e.rank} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",marginBottom:6,borderRadius:10,background:e.you?"rgba(0,200,240,0.12)":"#131c2e",border:`1px solid ${e.you?"rgba(0,200,240,0.4)":"#1a2840"}`}}>
          <div style={{width:32,height:32,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:e.rank<=3?16:13,fontWeight:900,color:e.rank===1?"#f5c842":e.rank===2?"#c8d4e0":e.rank===3?"#e0935a":"#4a6a85",flexShrink:0}}>
            {e.rank<=3?["🥇","🥈","🥉"][e.rank-1]:e.rank}
          </div>
          <div style={{fontSize:14,flexShrink:0}}>{e.tier}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:e.you?900:700,color:e.you?"#00c8f0":"#fff"}}>
              {e.name} {e.country}{e.you&&<span style={{fontSize:8,marginLeft:6,color:"#00c8f0"}}>YOU</span>}
            </div>
            <div style={{fontSize:9,color:"#4a6a85"}}>{e.pts.toLocaleString()} pt</div>
          </div>
          <span style={{fontSize:9,fontWeight:700,color:e.delta>0?"#00e89a":e.delta<0?"#ff4060":"#2e4258"}}>
            {e.delta>0?`▲${e.delta}`:e.delta<0?`▼${Math.abs(e.delta)}`:"‒"}
          </span>
        </div>
      ))}
      <div style={{marginTop:16,padding:"12px 14px",borderRadius:10,background:"#131c2e",border:"1px solid #1a2840",fontSize:9,color:"#4a6a85",lineHeight:1.7}}>
        💡 ランキングはエラー報告・解決策投稿・いいね数などの活動ポイントに基づきます。月間ランキングは毎月1日にリセットされます。
      </div>
    </div>
  );
}