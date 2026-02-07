// memo-data.js（差し替え版）
// - index.json を読む
// - docs/*.json を読む
// - 既存の escapeHTML / cache は流用

export const INDEX_JSON_PATH = "../docs/index.json"; // 配置場所に合わせて変更OK（例: "/index.json"）

// ---------- fetch helpers ----------
async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch failed: ${url} (${res.status})`);
  return await res.json();
}

// index.json を読む: { updatedAt, count, items:[{id,title,updatedAt,path}] }
export async function fetchIndex() {
  return await fetchJson(INDEX_JSON_PATH);
}

export async function fetchIndexItems() {
  const data = await fetchIndex();
  return Array.isArray(data?.items) ? data.items : [];
}

// docs の中身を path から読む
export async function fetchDocByPath(path) {
  // path が "docs/xxx.json" 想定
  return await fetchJson(path);
}

// ---------- escape ----------
export function escapeHTML(str) {
  return String(str).replace(
    /[&<>"']/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        s
      ],
  );
}

// ---------- simple cache (localStorage) ----------
const CACHE_NS = "memo_cache_v1";

function cacheReadRaw() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_NS) || "{}");
  } catch {
    return {};
  }
}

function cacheWriteRaw(obj) {
  try {
    localStorage.setItem(CACHE_NS, JSON.stringify(obj));
  } catch {
    // ignore
  }
}

export function cacheGet(key, ttlMs) {
  const store = cacheReadRaw();
  const v = store[key];
  if (!v || typeof v !== "object") return null;
  const t = Number(v.t || 0);
  if (!t) return null;
  if (Date.now() - t > ttlMs) return null;
  return v.value ?? null;
}

export function cacheSet(key, value) {
  const store = cacheReadRaw();
  store[key] = { t: Date.now(), value };
  cacheWriteRaw(store);
}
