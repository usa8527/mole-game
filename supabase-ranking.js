/**
 * Supabase ランキング（グローバル TOP10）
 * script.js より前に読み込む
 */
(function () {
  const RANKING_LIMIT = 10;
  const LOCAL_KEY = "moleGameRanking";

  let supabaseClient = null;

  function getConfig() {
    return window.SUPABASE_CONFIG || {};
  }

  function isPlaceholder(value) {
    return /YOUR_PROJECT_ID|YOUR_ANON_KEY/i.test(value);
  }

  function isValidAnonKey(key) {
    if (!key || key.length < 20) return false;
    if (isPlaceholder(key)) return false;
    return (
      key.startsWith("eyJ") ||
      key.startsWith("sb_publishable_") ||
      key.startsWith("sb_")
    );
  }

  function isConfigured() {
    const cfg = getConfig();
    if (!cfg.enabled) return false;
    const url = (cfg.url || "").trim();
    const key = (cfg.anonKey || "").trim();
    if (!url || !key) return false;
    if (isPlaceholder(url) || isPlaceholder(key)) return false;
    return url.startsWith("https://") && url.includes(".supabase.co") && isValidAnonKey(key);
  }

  function getClient() {
    if (!isConfigured()) return null;
    if (supabaseClient) return supabaseClient;
    if (typeof supabase === "undefined" || !supabase.createClient) {
      console.warn("[MoleRanking] Supabase JS が読み込まれていません");
      return null;
    }
    const cfg = getConfig();
    supabaseClient = supabase.createClient(cfg.url.trim(), cfg.anonKey.trim());
    return supabaseClient;
  }

  function getTableName() {
    const name = (getConfig().tableName || "rankings").trim();
    return name || "rankings";
  }

  function normalizeEntry(item) {
    return {
      name: String(item.name || item.player_name || "ゲスト").slice(0, 12),
      score: Number(item.score) || 0,
      date: item.date || item.created_at || new Date().toISOString(),
      difficulty: item.difficulty || "normal",
    };
  }

  function loadLocalRanking() {
    try {
      const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      return Array.isArray(raw) ? raw.map(normalizeEntry) : [];
    } catch {
      return [];
    }
  }

  function saveLocalRanking(list) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list.slice(0, RANKING_LIMIT)));
  }

  function addToLocalRanking(entry) {
    const list = loadLocalRanking();
    list.push(normalizeEntry(entry));
    list.sort((a, b) => b.score - a.score);
    saveLocalRanking(list);
  }

  function mapSupabaseRows(rows) {
    return (rows || []).map((row) =>
      normalizeEntry({
        player_name: row.player_name,
        score: row.score,
        difficulty: row.difficulty,
        created_at: row.created_at,
      })
    );
  }

  async function submitScore(entry) {
    const normalized = normalizeEntry(entry);
    addToLocalRanking(normalized);

    const client = getClient();
    if (!client) {
      return { ok: true, source: "local" };
    }

    try {
      const { error } = await client.from(getTableName()).insert({
        player_name: normalized.name,
        score: normalized.score,
        difficulty: normalized.difficulty,
      });
      if (error) throw error;
      return { ok: true, source: "supabase" };
    } catch (err) {
      const msg = err?.message || err?.details || String(err);
      console.warn("[MoleRanking] Supabase 保存に失敗（端末内は保存済み）:", msg);
      return { ok: false, source: "local", fallback: true, error: err };
    }
  }

  async function fetchTop10() {
    const client = getClient();
    if (!client) {
      return {
        ok: true,
        source: "local",
        list: loadLocalRanking().slice(0, RANKING_LIMIT),
      };
    }

    try {
      const { data, error } = await client
        .from(getTableName())
        .select("player_name, score, difficulty, created_at")
        .order("score", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(RANKING_LIMIT);

      if (error) throw error;
      return {
        ok: true,
        source: "supabase",
        list: mapSupabaseRows(data),
      };
    } catch (err) {
      console.warn("[MoleRanking] 取得に失敗（端末内を表示）", err);
      return {
        ok: true,
        source: "local",
        fallback: true,
        list: loadLocalRanking().slice(0, RANKING_LIMIT),
        error: err,
      };
    }
  }

  window.MoleRanking = {
    isConfigured,
    submitScore,
    fetchTop10,
    loadLocalRanking,
    getConfig,
  };

  if (isConfigured()) {
    console.info("[MoleRanking] Supabase ランキング: 有効");
  } else {
    console.info(
      "[MoleRanking] Supabase ランキング: 無効（supabase-config.js の url / anonKey / enabled を確認）"
    );
  }
})();
