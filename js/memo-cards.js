import {
  INDEX_SHEET_NAME,
  fetchSheetRows,
  escapeHTML,
  extractGoogleDocId,
  parseUpdateDate,
  fetchDocTitle,
  cacheGet,
  cacheSet,
} from "./memo-data.js";

function makeDetailUrl(docId) {
  const u = new URL(
    "memo-detail.html",
    location.origin + location.pathname.replace(/\/[^/]*$/, "/"),
  );
  u.searchParams.set("doc", docId);
  return u.toString();
}

function formatDate(dt) {
  if (!dt) return "";
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 同時実行数を絞る（回線/Apps Script混雑対策）
async function mapLimit(items, limit, fn) {
  const ret = new Array(items.length);
  let i = 0;

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (i < items.length) {
        const idx = i++;
        try {
          ret[idx] = await fn(items[idx], idx);
        } catch (e) {
          ret[idx] = e;
        }
      }
    },
  );

  await Promise.all(workers);
  return ret;
}

(async function initMemoCards() {
  const container = document.querySelector("[data-cards]");
  if (!container) return;

  container.innerHTML = "";

  try {
    const rows = await fetchSheetRows(INDEX_SHEET_NAME);

    const entries = rows
      .map((r) => {
        const updateRaw = r.Update ?? r.update ?? r.Updated ?? r.updated ?? "";
        const urlRaw =
          r.ref ??
          r.Ref ??
          r.REF ??
          r.Url ??
          r.URL ??
          r.url ??
          r.Link ??
          r.link ??
          "";
        const dt = parseUpdateDate(updateRaw);
        const docId = extractGoogleDocId(String(urlRaw).trim());
        return { dt, docId, updateRaw };
      })
      .filter((e) => e.docId);

    if (!entries.length) {
      container.innerHTML = `<div style="opacity:.7">index に有効な Google Docs URL がありません</div>`;
      return;
    }

    // Update desc
    entries.sort(
      (a, b) => (b.dt?.getTime() ?? -Infinity) - (a.dt?.getTime() ?? -Infinity),
    );

    // 1) 先にカードを全部描画（仮タイトル or キャッシュタイトル）
    const TITLE_TTL = 1000 * 60 * 60 * 24 * 7; // 7日
    const titleElsByDoc = new Map();

    entries.forEach((e) => {
      const dateLabel = formatDate(e.dt) || String(e.updateRaw || "").trim();

      const cached = cacheGet(`title:${e.docId}`, TITLE_TTL);
      const initialTitle = (cached?.internalTitle || "").trim() || "…";

      const a = document.createElement("a");
      a.className = "memo-card transition";
      a.href = makeDetailUrl(e.docId);
      a.dataset.doc = e.docId;

      a.innerHTML = `
        <div class="title">${escapeHTML(initialTitle)}</div>
        <div class="memo-date">${"更新：" + escapeHTML(dateLabel)}</div>
      `.trim();

      container.appendChild(a);
      titleElsByDoc.set(e.docId, a.querySelector(".title"));
    });

    // 2) タイトル未キャッシュ分だけ取得して差し替え（並列制限）
    const needFetch = entries.filter((e) => {
      const cached = cacheGet(`title:${e.docId}`, TITLE_TTL);
      return !cached?.internalTitle;
    });

    // 取得は5並列くらいが安定
    await mapLimit(needFetch, 5, async (e) => {
      const r = await fetchDocTitle(e.docId); // { internalTitle }
      cacheSet(`title:${e.docId}`, r);

      const el = titleElsByDoc.get(e.docId);
      if (el) el.textContent = (r?.internalTitle || "Untitled").trim();
      return r;
    });

    // タブtitle（任意）：一番上がキャッシュ/取得済みなら反映
    const topDoc = entries[0]?.docId;
    if (topDoc) {
      const top = cacheGet(`title:${topDoc}`, TITLE_TTL);
      const newestTitle = (top?.internalTitle || "").trim();
      document.title = newestTitle
        ? `${newestTitle} | memo | 城戸双汰朗 / KidoSotaro`
        : `memo | 城戸双汰朗 / KidoSotaro`;
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="opacity:.7">データ取得に失敗しました。リロードしてください。</div>`;
  }
})();