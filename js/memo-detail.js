import {
  escapeHTML,
  fetchIndexItems,
  fetchDocByPath,
  cacheGet,
  cacheSet,
} from "./memo-data.js";

/** =========================
 * Pager（前へ / 次へ）
 * ========================= */
function enableLink(a, href) {
  a.href = href;
  a.dataset.go = href;
  a.setAttribute("aria-disabled", "false");
  a.style.pointerEvents = "";
  a.style.opacity = "";
}

function disableLink(a) {
  a.removeAttribute("href");
  a.dataset.go = "";
  a.setAttribute("aria-disabled", "true");
  a.style.pointerEvents = "none";
  a.style.opacity = "0.35";
}

// 一覧と同じ並び（updatedAt desc）で前後リンクを作る
function setPagerLinks(currentId, items) {
  const prevA = document.querySelector(".back-work");
  const nextA = document.querySelector(".next-work");
  if (!prevA || !nextA) return;

  const sorted = [...items].sort(
    (a, b) =>
      new Date(b.updatedAt || 0).getTime() -
      new Date(a.updatedAt || 0).getTime(),
  );

  const i = sorted.findIndex((x) => x.id === currentId);

  if (i < 0) {
    disableLink(prevA);
    disableLink(nextA);
    return;
  }

  // “前へ”＝古い方へ（インデックス+1）
  // “次へ”＝新しい方へ（インデックス-1）
  const prev = sorted[i + 1] || null;
  const next = sorted[i - 1] || null;

  if (prev)
    enableLink(prevA, `memo-detail.html?id=${encodeURIComponent(prev.id)}`);
  else disableLink(prevA);

  if (next)
    enableLink(nextA, `memo-detail.html?id=${encodeURIComponent(next.id)}`);
  else disableLink(nextA);
}

/** =========================
 * Rendering
 * ========================= */
function headingTag(headingName) {
  const s = String(headingName || "");
  if (s.includes("HEADING1")) return "h1";
  if (s.includes("HEADING2")) return "h2";
  if (s.includes("HEADING3")) return "h3";
  if (s.includes("HEADING4")) return "h4";
  return "p";
}

function renderBlocksChunk(blocks, startIndex, chunkSize, usedTitleRef, frag) {
  let currentList = null;
  const flushList = () => {
    if (currentList) {
      frag.appendChild(currentList);
      currentList = null;
    }
  };

  for (
    let i = startIndex;
    i < Math.min(blocks.length, startIndex + chunkSize);
    i++
  ) {
    const b = blocks[i];

    if (b.type === "listItem") {
      if (!currentList) currentList = document.createElement("ul");
      const li = document.createElement("li");
      li.textContent = b.text || "";
      li.className = `nest-${Number(b.nesting ?? 0)}`;
      currentList.appendChild(li);
      continue;
    }

    flushList();

    if (b.type === "paragraph") {
      const textTrim = String(b.text || "").trim();
      const isTitle = !usedTitleRef.used && textTrim.length > 0;

      if (isTitle) {
        usedTitleRef.used = true;
        const el = document.createElement("h1");
        el.className = "title";
        el.innerHTML = escapeHTML(String(b.text || "")).replace(/\n/g, "<br>");
        frag.appendChild(el);
        continue;
      }

      const tag = headingTag(b.heading);
      const el = document.createElement(tag);
      el.className = tag === "p" ? "memo-p" : `memo-${tag}`;
      el.innerHTML = escapeHTML(String(b.text || "")).replace(/\n/g, "<br>");
      frag.appendChild(el);
      continue;
    }

    if (b.type === "table") {
      const table = document.createElement("table");
      table.className = "memo-table";
      for (const row of b.rows || []) {
        const tr = document.createElement("tr");
        for (const cell of row) {
          const td = document.createElement("td");
          td.innerHTML = escapeHTML(String(cell ?? "")).replace(/\n/g, "<br>");
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      frag.appendChild(table);
    }
  }

  flushList();
}

async function renderBlocksIncremental(container, blocks) {
  container.innerHTML = "";

  const usedTitleRef = { used: false };
  let idx = 0;
  const CHUNK = 60;

  return new Promise((resolve) => {
    const step = () => {
      const frag = document.createDocumentFragment();
      renderBlocksChunk(blocks || [], idx, CHUNK, usedTitleRef, frag);
      container.appendChild(frag);

      idx += CHUNK;
      if (idx < (blocks || []).length) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

/** =========================
 * Main
 * ========================= */
(async function initMemoDetail() {
  const container = document.getElementById("memoDetail");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = `<p style="opacity:.7">id パラメータがありません</p>`;
    return;
  }

  // index.json を読む（path 取得 + ページャ設定で使い回す）
  let items = [];
  let path = null;

  try {
    items = await fetchIndexItems();
    const hit = items.find((x) => x.id === id);
    path = hit?.path || null;

    // ★ここで前へ/次へを設定
    setPagerLinks(id, items);
  } catch (e) {
    console.error(e);
  }

  if (!path) {
    container.innerHTML = `<p style="opacity:.7">該当する path が見つかりません</p>`;
    return;
  }

  const CONTENT_TTL = 1000 * 60 * 60 * 24; // 24h
  const cacheKey = `content:${id}`;

  // 1) キャッシュ即表示
  const cached = cacheGet(cacheKey, CONTENT_TTL);
  if (cached?.blocks?.length) {
    const t = (cached?.title || "").trim();
    document.title = t ? `${t} | memo` : "memo";
    await renderBlocksIncremental(container, cached.blocks);
  } else {
    container.innerHTML = `<p style="opacity:.7">読み込み中…</p>`;
  }

  // 2) 最新を取得
  try {
    const fresh = await fetchDocByPath(path);

    const t = (fresh?.title || "").trim();
    document.title = t ? `${t} | memo` : "memo";

    const cb = cached?.blocks || [];
    const fb = fresh?.blocks || [];
    const same =
      cb.length === fb.length &&
      String(cb[0]?.text || "") === String(fb[0]?.text || "") &&
      String(cb[cb.length - 1]?.text || "") ===
        String(fb[fb.length - 1]?.text || "");

    cacheSet(cacheKey, fresh);

    if (!cached?.blocks?.length || !same) {
      await renderBlocksIncremental(container, fb);
    }
  } catch (err) {
    console.error(err);
    if (!cached?.blocks?.length) {
      container.innerHTML = `<p>読み込みに失敗しました。リロードしてください。</p>`;
    }
  }
})();