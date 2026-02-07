import { fetchIndexItems, escapeHTML } from "./memo-data.js";

function makeDetailUrl(id) {
  const u = new URL(
    "memo-detail.html",
    location.origin + location.pathname.replace(/\/[^/]*$/, "/"),
  );
  u.searchParams.set("id", id); // ← docIdじゃなく index.json の items[].id を渡す
  return u.toString();
}

function formatIsoDate(iso) {
  if (!iso) return "";
  // "2026-02-07T16:03:01.165Z" -> "2026-02-07"
  return String(iso).slice(0, 10);
}

(async function initMemoCards() {
  const container = document.querySelector("[data-cards]");
  if (!container) return;

  container.innerHTML = "";

  try {
    const items = await fetchIndexItems(); // index.json 直読み

    if (!items.length) {
      container.innerHTML = `<div style="opacity:.7">index.json に items がありません</div>`;
      return;
    }

    // updatedAt desc
    items.sort(
      (a, b) =>
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime(),
    );

    for (const it of items) {
      const a = document.createElement("a");
      a.className = "memo-card transition";
      a.href = makeDetailUrl(it.id);
      a.dataset.id = it.id;

      const dateLabel = formatIsoDate(it.updatedAt);

      a.innerHTML = `
        <div class="title">${escapeHTML((it.title || "Untitled").trim())}</div>
        <div class="memo-date">${"更新：" + escapeHTML(dateLabel)}</div>
      `.trim();

      container.appendChild(a);
    }

    // タブtitle（任意）
    const newest = items[0];
    if (newest?.title) {
      document.title = `${newest.title} | memo | 城戸双汰朗 / KidoSotaro`;
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="opacity:.7">データ取得に失敗しました。リロードしてください。</div>`;
  }
})();
