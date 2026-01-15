// js/about-data.js
export const SPREADSHEET_ID = "1vcVWaG_bpX9Tm43Ppkofq_86RKsgOpOWrhhAi9Ct2L4";
export const INDEX_SHEET_NAME = "index";

// ===== CSV utils =====
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

export function escapeHTML(str) {
  return String(str).replace(
    /[&<>"']/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        s
      ])
  );
}
export function escapeAttr(str) {
  return escapeHTML(str).replace(/"/g, "&quot;");
}

// ===== fetch =====
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

export async function fetchSheetRows(sheetName) {
  const csv = await fetchSheetCSV(sheetName);
  return parseCSV(csv);
}
