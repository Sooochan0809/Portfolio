import {
  escapeHTML,
  fetchDocContent,
  cacheGet,
  cacheSet,
} from "./memo-data.js";

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
      continue;
    }
  }

  flushList();
}

async function renderBlocksIncremental(container, blocks) {
  container.innerHTML = "";

  const usedTitleRef = { used: false };
  let idx = 0;
  const CHUNK = 60; // 1フレームあたりのブロック数（環境で調整）

  return new Promise((resolve) => {
    const step = () => {
      const frag = document.createDocumentFragment();
      renderBlocksChunk(blocks || [], idx, CHUNK, usedTitleRef, frag);
      container.appendChild(frag);

      idx += CHUNK;
      if (idx < (blocks || []).length) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

(async function initMemoDetail() {
  const container = document.getElementById("memoDetail");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const docId = params.get("doc");

  if (!docId) {
    container.innerHTML = `<p style="opacity:.7">doc パラメータがありません</p>`;
    return;
  }

  const CONTENT_TTL = 1000 * 60 * 60 * 24; // 24時間（好みで）
  const cacheKey = `content:${docId}`;

  // 1) まずキャッシュがあれば即表示（体感最重要）
  const cached = cacheGet(cacheKey, CONTENT_TTL);
  if (cached?.blocks?.length) {
    const t = (cached?.title || "").trim();
    document.title = t ? `${t} | memo` : "memo";
    await renderBlocksIncremental(container, cached.blocks);
  } else {
    container.innerHTML = `<p style="opacity:.7">読み込み中…</p>`;
  }

  // 2) 裏で最新版を取得 → 必要なら差し替え（キャッシュ更新）
  try {
    const fresh = await fetchDocContent(docId);

    // title更新
    const t = (fresh?.title || "").trim();
    document.title = t ? `${t} | memo` : "memo";

    // 簡易差分判定（blocks長＋末尾テキスト）で無駄な再描画を減らす
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