"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "game" | "missions" | "earn" | "wallet";

type Building = {
  id: string;
  name: string;
  baseCost: number;
  production: number;
  unlockLevel: number;
};

type Mission = {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: number;
  type: "clicks" | "coins" | "buildings";
};

type SaveState = {
  coins: number;
  clicks: number;
  clickPower: number;
  buildings: Record<string, number>;
  claimed: string[];
  boostUntil: number;
  lastSavedAt: number;
};

const BUILDINGS: Building[] = [
  { id: "tap-hub", name: "Tap Hub", baseCost: 20, production: 1, unlockLevel: 1 },
  { id: "micro-generator", name: "Micro Generator", baseCost: 100, production: 5, unlockLevel: 1 },
  { id: "coin-press", name: "Coin Press", baseCost: 750, production: 30, unlockLevel: 3 },
  { id: "assembly-line", name: "Assembly Line", baseCost: 3500, production: 130, unlockLevel: 4 },
  { id: "fusion-reactor", name: "Fusion Reactor", baseCost: 18000, production: 800, unlockLevel: 8 },
  { id: "mega-factory", name: "Mega Factory", baseCost: 85000, production: 4200, unlockLevel: 10 }
];

const MISSIONS: Mission[] = [
  { id: "click-25", title: "Warm Up", description: "Generate 25 clicks.", target: 25, reward: 75, type: "clicks" },
  { id: "click-100", title: "Keep Tapping", description: "Generate 100 clicks.", target: 100, reward: 300, type: "clicks" },
  { id: "coins-1000", title: "First Thousand", description: "Reach 1,000 Coins.", target: 1000, reward: 500, type: "coins" },
  { id: "buildings-3", title: "Build Momentum", description: "Own 3 buildings.", target: 3, reward: 1200, type: "buildings" }
];

function fmt(value: number): string {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return Math.floor(value).toLocaleString();
}

function loadState(): SaveState | null {
  try {
    const raw = window.localStorage.getItem("idlecoins-mvp");
    return raw ? (JSON.parse(raw) as SaveState) : null;
  } catch {
    return null;
  }
}

export default function GameClient() {
  const [tab, setTab] = useState<Tab>("game");
  const [coins, setCoins] = useState(25);
  const [clicks, setClicks] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [buildings, setBuildings] = useState<Record<string, number>>({});
  const [claimed, setClaimed] = useState<string[]>([]);
  const [boostUntil, setBoostUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [feed, setFeed] = useState<Array<{ id: number; label: string; value: string }>>([
    { id: 1, label: "Welcome bonus", value: "+25 Coins" }
  ]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      const elapsed = Math.max(0, Math.floor((Date.now() - saved.lastSavedAt) / 1000));
      const savedProduction = BUILDINGS.reduce(
        (sum, b) => sum + (saved.buildings[b.id] ?? 0) * b.production,
        0
      );
      const offlineGain = Math.min(elapsed, 86400) * savedProduction;
      setCoins(saved.coins + offlineGain);
      setClicks(saved.clicks);
      setClickPower(saved.clickPower);
      setBuildings(saved.buildings);
      setClaimed(saved.claimed);
      setBoostUntil(saved.boostUntil);
      if (offlineGain > 0) {
        setFeed([{ id: Date.now(), label: "Offline production", value: "+" + fmt(offlineGain) + " Coins" }]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const production = useMemo(
    () => BUILDINGS.reduce((sum, b) => sum + (buildings[b.id] ?? 0) * b.production, 0),
    [buildings]
  );
  const multiplier = boostUntil > now ? 2 : 1;
  const effectiveProduction = production * multiplier;
  const level = 1 + Math.floor(clicks / 25);
  const totalBuildings = Object.values(buildings).reduce((sum, x) => sum + x, 0);
  const nextBuilding =
    BUILDINGS.find((b) => level >= b.unlockLevel && (buildings[b.id] ?? 0) < 3) ??
    BUILDINGS.find((b) => level >= b.unlockLevel) ??
    BUILDINGS[0];
  const nextLevel = buildings[nextBuilding.id] ?? 0;
  const nextCost = Math.ceil(nextBuilding.baseCost * Math.pow(1.15, nextLevel));

  useEffect(() => {
    if (!hydrated) return;
    const interval = window.setInterval(() => {
      if (effectiveProduction <= 0) return;
      setCoins((value) => value + effectiveProduction);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [effectiveProduction, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const interval = window.setInterval(() => {
      const payload: SaveState = {
        coins,
        clicks,
        clickPower,
        buildings,
        claimed,
        boostUntil,
        lastSavedAt: Date.now()
      };
      window.localStorage.setItem("idlecoins-mvp", JSON.stringify(payload));
    }, 2000);
    return () => window.clearInterval(interval);
  }, [coins, clicks, clickPower, buildings, claimed, boostUntil, hydrated]);

  function addFeed(label: string, value: string) {
    setFeed((items) => [{ id: Date.now(), label, value }, ...items].slice(0, 6));
  }

  function handleClick() {
    const gained = clickPower * multiplier;
    setCoins((value) => value + gained);
    setClicks((value) => value + 1);
    if ((clicks + 1) % 10 === 0) addFeed("Manual production", "+" + gained + " Coins");
  }

  function buyBuilding(building: Building) {
    if (level < building.unlockLevel) return;
    const current = buildings[building.id] ?? 0;
    const cost = Math.ceil(building.baseCost * Math.pow(1.15, current));
    if (coins < cost) return;
    setCoins((value) => value - cost);
    setBuildings((value) => ({ ...value, [building.id]: current + 1 }));
    addFeed(building.name, "Level " + (current + 1));
  }

  function claimMission(mission: Mission) {
    if (claimed.includes(mission.id)) return;
    let progress = 0;
    if (mission.type === "clicks") progress = clicks;
    if (mission.type === "coins") progress = coins;
    if (mission.type === "buildings") progress = totalBuildings;
    if (progress < mission.target) return;
    setClaimed((value) => [...value, mission.id]);
    setCoins((value) => value + mission.reward);
    addFeed("Mission: " + mission.title, "+" + mission.reward + " Coins");
  }

  function activateBoost() {
    setBoostUntil(Date.now() + 5 * 60_000);
    addFeed("Production Rush", "x2 for 5 minutes");
  }

  const milestoneTarget = 1000;
  const milestoneProgress = Math.min(100, (coins / milestoneTarget) * 100);
  const nextGoalProgress = Math.min(100, (coins / Math.max(1, nextCost)) * 100);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">IDLE<b>COINS</b></div>
        <div className="nav">
          {([
            ["game", "Game"],
            ["missions", "Missions"],
            ["earn", "Earn"],
            ["wallet", "Wallet"]
          ] as const).map(([key, label]) => (
            <button className={tab === key ? "active" : ""} key={key} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="status">
          <div className="eyebrow">Next unlock</div>
          <div style={{ marginTop: 6, fontWeight: 850 }}>
            {level >= 10 ? "Mega Factory" : level >= 8 ? "Factory" : level >= 3 ? "Workshop" : "Automation"}
          </div>
          <div className="muted" style={{ marginTop: 5 }}>Your next layer should always be visible.</div>
        </div>
      </aside>

      <main className="main">
        <div className="top">
          <div>
            <div className="eyebrow">IdleCoins web MVP</div>
            <div className="title">Build. Grow. Unlock.</div>
          </div>
          <div className="status"><span className="muted">Player level </span><strong>{level}</strong></div>
        </div>

        {tab === "game" && (
          <div className="grid">
            <div className="hero">
              <section className="panel">
                <div className="eyebrow">Game Coins</div>
                <div className="coins">{fmt(coins)}</div>
                <div className="rate">+{fmt(effectiveProduction)}/sec</div>

                <div className="click-zone">
                  <button className="click" onClick={handleClick}>GENERATE</button>
                  <div className="muted" style={{ marginTop: 9 }}>
                    +{fmt(clickPower * multiplier)} per click
                  </div>
                </div>

                <div className="stats">
                  <div className="stat"><small>Clicks</small><strong>{fmt(clicks)}</strong></div>
                  <div className="stat"><small>Buildings</small><strong>{totalBuildings}</strong></div>
                  <div className="stat"><small>Next cost</small><strong>{fmt(nextCost)}</strong></div>
                </div>
              </section>

              <section className="panel goal">
                <div className="row">
                  <div>
                    <div className="eyebrow">Primary goal</div>
                    <h2>Reach {fmt(milestoneTarget)} Coins</h2>
                  </div>
                  <strong style={{ color: "var(--accent)" }}>+500</strong>
                </div>
                <div className="muted">Get the next milestone, then use the new production layer to accelerate the next one.</div>
                <div className="progress"><div style={{ width: milestoneProgress + "%" }} /></div>
                <div className="row"><span className="muted">{fmt(coins)} / {fmt(milestoneTarget)}</span><span className="muted">{Math.floor(milestoneProgress)}%</span></div>

                <div className="card">
                  <div className="eyebrow">Best next move</div>
                  <h3>{nextBuilding.name} Lv.{nextLevel + 1}</h3>
                  <div className="muted">+{fmt(nextBuilding.production)}/sec at a cost of {fmt(nextCost)} Coins.</div>
                  <div className="progress"><div style={{ width: nextGoalProgress + "%" }} /></div>
                  <button className="action" disabled={coins < nextCost} onClick={() => buyBuilding(nextBuilding)}>
                    {coins >= nextCost ? "Buy upgrade" : "Keep generating"}
                  </button>
                </div>

                <button className="action" onClick={activateBoost}>
                  {boostUntil > now ? "Refresh Production Rush" : "Activate free x2 gameplay boost"}
                </button>
                {boostUntil > now && <div className="muted">Boost active for {Math.ceil((boostUntil - now) / 1000)}s.</div>}
              </section>
            </div>

            <section>
              <div className="section-head">
                <div><h2>Production</h2><div className="muted">Every level changes your ability to reach the next goal.</div></div>
              </div>
              <div className="cards">
                {BUILDINGS.map((building) => {
                  const current = buildings[building.id] ?? 0;
                  const locked = level < building.unlockLevel;
                  const cost = Math.ceil(building.baseCost * Math.pow(1.15, current));
                  return (
                    <article className="card" key={building.id}>
                      <div className="row"><h3>{building.name}</h3><span className="muted">Lv.{current}</span></div>
                      <div className="muted">{locked ? "Unlocks at player level " + building.unlockLevel : "+" + fmt(building.production) + "/sec each"}</div>
                      <div className="row"><span className="muted">Next cost</span><strong>{locked ? "—" : fmt(cost)}</strong></div>
                      <button className="action" disabled={locked || coins < cost} onClick={() => buyBuilding(building)}>
                        {locked ? "Locked" : "Buy level " + (current + 1)}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="section-head"><div><h2>Recent wins</h2><div className="muted">The game keeps progress legible instead of hiding it.</div></div></div>
              <div className="panel feed">
                {feed.map((item) => <div className="feed-item" key={item.id}><span>{item.label}</span><span>{item.value}</span></div>)}
              </div>
            </section>
          </div>
        )}

        {tab === "missions" && (
          <section className="panel">
            <div className="section-head"><div><h2>Missions</h2><div className="muted">Short goals create another achievable win.</div></div></div>
            <div className="cards">
              {MISSIONS.map((mission) => {
                let progress = 0;
                if (mission.type === "clicks") progress = clicks;
                if (mission.type === "coins") progress = coins;
                if (mission.type === "buildings") progress = totalBuildings;
                const value = Math.min(progress, mission.target);
                const done = value >= mission.target;
                const isClaimed = claimed.includes(mission.id);
                return (
                  <article className="card" key={mission.id}>
                    <h3>{mission.title}</h3>
                    <div className="muted">{mission.description}</div>
                    <div className="progress"><div style={{ width: Math.min(100, (value / mission.target) * 100) + "%" }} /></div>
                    <div className="row"><span className="muted">{Math.floor(value)} / {mission.target}</span><strong>+{mission.reward}</strong></div>
                    <button className="action" disabled={!done || isClaimed} onClick={() => claimMission(mission)}>
                      {isClaimed ? "Claimed" : done ? "Claim reward" : "In progress"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {tab === "earn" && (
          <section className="panel">
            <h2>Earn</h2>
            <div className="notice" style={{ marginTop: 12 }}>
              The real-money rewards layer is intentionally not simulated here. When activated, tasks and offers will require verified provider callbacks before funds become withdrawable.
            </div>
            <div className="cards" style={{ marginTop: 14 }}>
              {["Surveys", "Offers", "Sponsored tasks", "Rewarded video"].map((name) => (
                <article className="card" key={name}>
                  <h3>{name}</h3>
                  <div className="muted">Provider integration pending.</div>
                  <button className="action" disabled>Rewards phase</button>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === "wallet" && (
          <section className="panel">
            <h2>Wallet</h2>
            <div className="cards" style={{ marginTop: 14 }}>
              <div className="stat"><small>Game Coins</small><strong>{fmt(coins)}</strong></div>
              <div className="stat"><small>Pending</small><strong>$0.00</strong></div>
              <div className="stat"><small>Available</small><strong>$0.00</strong></div>
            </div>
            <div className="notice" style={{ marginTop: 14 }}>
              Game Coins are not cash. Withdrawable balance will only come from verified eligible reward events.
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
