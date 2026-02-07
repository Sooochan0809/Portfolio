// memo-data.js
export const SPREADSHEET_ID = "1Xe23zMfOtYxXmMDOPLyFf0iApTOmuPVVIEDMHWsCpDM";
export const INDEX_SHEET_NAME = "index";

export const DOC_PROXY_BASE =
  "https://script.google.com/macros/s/AKfycbyx-NeLyzU29_o6g0jVbdX7gmbdN7NmlejjMkrUsLM/dev";

// ---------- JSONP ----------
export function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = "__cb_" + Math.random().toString(36).slice(2);
    const u = new URL(url);
    u.searchParams.set("callback", cb);

    const s = document.createElement("script");
    s.src = u.toString();
    s.async = true;

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP timeout"));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[cb];
      s.remove();
    }

    window[cb] = (data) => {
      cleanup();
      resolve(data);
    };

    s.onerror = () => {
      cleanup();
      reject(new Error("JSONP load error"));
    };

    document.head.appendChild(s);
  });
}

// ---------- Google Docs helpers ----------
export function extractGoogleDocId(url) {
  const s = String(url || "").trim();
  if (!s) return null;

  // https://docs.google.com/document/d/<ID>/...
  let m = s.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return m[1];

  // open?id=...
  m = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return m[1];

  return null;
}

export function parseUpdateDate(v) {
  const s = String(v || "").trim();
  if (!s) return null;

  const m = s.match(/^(\d{4})[-/_\.](\d{1,2})[-/_\.](\d{1,2})/);
  if (!m) return null;

  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);

  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d)
    return null;
  return dt;
}

// 軽量：本文先頭タイトルだけ
export async function fetchDocTitle(docId) {
  const u = new URL(DOC_PROXY_BASE);
  u.searchParams.set("mode", "title");
  u.searchParams.set("docId", docId);
  // => { internalTitle: "..." }
  return await jsonp(u.toString());
}

// （必要なら残す：詳細ページ用）
export async function fetchDocContent(docId) {
  const u = new URL(DOC_PROXY_BASE);
  u.searchParams.set("mode", "content");
  u.searchParams.set("docId", docId);
  return await jsonp(u.toString());
}

// ---------- Spreadsheet CSV ----------
export function gvizCsvUrl(sheetName) {
  return (
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=` +
    encodeURIComponent(sheetName)
  );
}

export async function fetchSheetCSV(sheetName) {
  const res = await fetch(gvizCsvUrl(sheetName), { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch failed: ${sheetName} (${res.status})`);
  return (await res.text()).replace(/^\uFEFF/, "");
}

export function parseCSV(text) {
  const out = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];

    if (c === '"') {
      if (inQuotes && n === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && c === ",") {
      row.push(cur);
      cur = "";
      continue;
    }
    if (!inQuotes && (c === "\n" || c === "\r")) {
      if (c === "\r" && n === "\n") i++;
      row.push(cur);
      out.push(row);
      row = [];
      cur = "";
      continue;
    }
    cur += c;
  }
  if (cur.length || row.length) {
    row.push(cur);
    out.push(row);
  }

  const headers = (out.shift() || []).map((h) => (h || "").trim());
  return out
    .filter((cols) => cols.some((v) => (v ?? "").trim() !== ""))
    .map((cols) => {
      const obj = {};
      headers.forEach((h, idx) => (obj[h] = cols[idx] ?? ""));
      return obj;
    });
}

export async function fetchSheetRows(sheetName) {
  const csv = await fetchSheetCSV(sheetName);
  return parseCSV(csv);
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
    // storage full etc: ignore
  }
}

/**
 * @param {string} key
 * @param {number} ttlMs
 * @returns {any|null}
 */
export function cacheGet(key, ttlMs) {
  const store = cacheReadRaw();
  const v = store[key];
  if (!v || typeof v !== "object") return null;
  const t = Number(v.t || 0);
  if (!t) return null;
  if (Date.now() - t > ttlMs) return null;
  return v.value ?? null;
}

/**
 * @param {string} key
 * @param {any} value
 */
export function cacheSet(key, value) {
  const store = cacheReadRaw();
  store[key] = { t: Date.now(), value };
  cacheWriteRaw(store);
}