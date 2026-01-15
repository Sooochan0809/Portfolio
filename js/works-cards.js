// js/works-cards.js
import {
  INDEX_SHEET_NAME,
  fetchSheetRows,
  parseSheetDate,
  summarizeWorkFromDetailRows,
  escapeHTML,
  escapeAttr,
} from "./works-data.js";

function normalizeDriveImageUrl(url) {
  if (!url) return "";
  const s = String(url).trim();

  let m = s.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  m = s.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  m = s.match(/drive\.google\.com\/uc\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  if (s.includes("drive.google.com/thumbnail?id=")) return s;

  return s;
}

function setActiveMenu(filter) {
  const menu = document.getElementById("worksMenu");
  if (!menu) return;
  menu.querySelectorAll(".works-summary-menu-text").forEach((el) => {
    el.classList.toggle(
      "is-active",
      String(el.dataset.filter) === String(filter)
    );
  });
}

function ensureYearMenuButtons(years) {
  const menu = document.getElementById("worksMenu");
  if (!menu) return;

  const existing = new Set(
    Array.from(menu.querySelectorAll(".works-summary-menu-text")).map((el) =>
      String(el.dataset.filter || "").trim()
    )
  );

  // NEWボタンの直後に年号を差し込む（NEWが無ければ末尾）
  const newBtn = menu.querySelector(
    '.works-summary-menu-text[data-filter="NEW"]'
  );
  let insertPos = newBtn ? newBtn.nextSibling : null;

  years.forEach((y) => {
    const key = String(y).trim();
    if (!key || existing.has(key)) return;

    const btn = document.createElement("div");
    btn.className = "works-summary-menu-text";
    btn.dataset.filter = key;
    btn.textContent = key;

    menu.insertBefore(btn, insertPos);
    existing.add(key);
  });
}

function measureMenuWidthToCSSVar() {
  const menu = document.getElementById("worksMenu");
  if (!menu) return;
  const w = Math.ceil(menu.getBoundingClientRect().width);
  document.documentElement.style.setProperty("--menu-w", `${w}px`);
}

function createSection(filter) {
  const feed = document.getElementById("feed");
  if (!feed) return null;

  const sec = document.createElement("section");
  sec.className = "section works-section";
  sec.id = `works-${encodeURIComponent(filter)}`;
  sec.dataset.filter = filter;

  // 「固定メニュー分の空き + カード領域」を同じ枠で作る
  sec.innerHTML = `
    <div class="works-section-frame">
      <div class="works-menu-spacer" aria-hidden="true"></div>
      <div class="works-cards-space" data-cards></div>
    </div>
  `.trim();

  feed.appendChild(sec);
  return sec;
}

function getCardsContainer(filter) {
  const sec = document.querySelector(
    `.works-section[data-filter="${CSS.escape(String(filter))}"]`
  );
  if (!sec) return null;
  return sec.querySelector("[data-cards]");
}

function updateGridSingleClass(container) {
  if (!container) return;
  const count = container.querySelectorAll(".works-card").length;
  container.classList.toggle("is-single", count === 1);
}

function setupMenuClickScroll() {
  const menu = document.getElementById("worksMenu");
  const feed = document.getElementById("feed");
  if (!menu || !feed) return;

  if (menu.dataset.bound) return;

  menu.addEventListener("click", (e) => {
    const btn = e.target.closest(".works-summary-menu-text");
    if (!btn) return;

    const filter = String(btn.dataset.filter || "NEW");
    const sec = document.querySelector(
      `.works-section[data-filter="${CSS.escape(filter)}"]`
    );
    if (!sec) return;

    // feed の中でスクロールさせたいので scrollIntoView を使う
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveMenu(filter);
  });

  menu.dataset.bound = "1";
}

function setupScrollSyncActiveMenu() {
  const feed = document.getElementById("feed");
  const sections = Array.from(document.querySelectorAll(".works-section"));
  if (!feed || !sections.length) return;

  // すでに observer があれば破棄
  if (feed._worksObserver) {
    feed._worksObserver.disconnect();
    feed._worksObserver = null;
  }

  const io = new IntersectionObserver(
    (entries) => {
      // 一番見えてるやつを active にする
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target) {
        const filter = visible.target.dataset.filter || "NEW";
        setActiveMenu(filter);
      }
    },
    {
      root: feed,
      threshold: [0.35, 0.5, 0.65],
    }
  );

  sections.forEach((sec) => io.observe(sec));
  feed._worksObserver = io;
}

async function buildCard(entry, latestSheet) {
  const sheet = entry.sheet;
  const indexThumb = entry.thumb;

  const detailRows = await fetchSheetRows(sheet);
  const { title, thumb: detailThumb } = summarizeWorkFromDetailRows(
    detailRows,
    sheet
  );

  const dt = parseSheetDate(sheet);
  const yFromName = String(sheet).match(/\b(19|20)\d{2}\b/)?.[0] || null;
  const year = dt ? String(dt.getFullYear()) : yFromName || "NEW";
  const filter = latestSheet && sheet === latestSheet ? "NEW" : year;

  const thumbUrl =
    normalizeDriveImageUrl(indexThumb || detailThumb) || "img/ogp.webp";

  const a = document.createElement("a");
  a.className = "works-card transition";
  a.dataset.year = String(filter).trim();
  a.href = `work-detail.html?sheet=${encodeURIComponent(sheet)}`;
  a.innerHTML = `
    <div class="works-card-img">
      <img src="${escapeAttr(thumbUrl)}" alt="">
    </div>
  `.trim();

  // タイトルを出したければここを復活させる
  // a.insertAdjacentHTML("beforeend", `<div class="works-card-text">${escapeHTML(title)}</div>`);

  return { filter, el: a };
}

(async function initWorksSectionsAndCards() {
  const feed = document.getElementById("feed");
  const menu = document.getElementById("worksMenu");
  if (!feed || !menu) return;

  // 先に空にする（プレースホルダ section を使わない方針）
  feed.innerHTML = "";

  try {
    // INDEX取得
    const indexRows = await fetchSheetRows(INDEX_SHEET_NAME);
    const entries = indexRows
      .map((r) => ({
        sheet: String(r.sheet || r.Sheet || "").trim(),
        thumb: String(r.thumb || r.Thumb || "").trim(),
      }))
      .filter((e) => e.sheet);

    if (!entries.length) {
      feed.innerHTML = `<section class="section"><div style="opacity:.7">INDEXにsheetがありません</div></section>`;
      return;
    }

    // 最新sheet特定
    let latestSheet = null;
    let latestTime = -Infinity;
    for (const e of entries) {
      const dt = parseSheetDate(e.sheet);
      if (!dt) continue;
      const t = dt.getTime();
      if (t > latestTime) {
        latestTime = t;
        latestSheet = e.sheet;
      }
    }

    // 年号一覧
    const yearsSet = new Set();
    for (const e of entries) {
      const dt = parseSheetDate(e.sheet);
      const yFromName = String(e.sheet).match(/\b(19|20)\d{2}\b/)?.[0] || null;
      const y = dt ? String(dt.getFullYear()) : yFromName;
      if (y) yearsSet.add(String(y).trim());
    }
    const years = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));

    // メニューに年号を追加
    ensureYearMenuButtons(years);

    // section を NEW + years で作成（この順でスクロールさせたい）
    const filters = ["NEW", ...years];
    filters.forEach((f) => createSection(f));

    // メニュー幅を測って spacer に反映
    measureMenuWidthToCSSVar();
    // 画面リサイズにも追従
    window.addEventListener("resize", measureMenuWidthToCSSVar, {
      passive: true,
    });

    // メニュークリックで該当 section へ
    setupMenuClickScroll();

    // まず NEW を active
    setActiveMenu("NEW");

    // カード生成して section に振り分け
    // NEW（最新）を先に作って体感速度UP
    const latestEntry =
      entries.find((e) => e.sheet === latestSheet) || entries[0];
    {
      const { filter, el } = await buildCard(latestEntry, latestSheet);
      const box = getCardsContainer(filter);
      box?.appendChild(el);
      updateGridSingleClass(box);
    }

    const rest = entries.filter((e) => e !== latestEntry);

    for (const entry of rest) {
      await new Promise((r) => setTimeout(r, 0));
      try {
        const { filter, el } = await buildCard(entry, latestSheet);
        const box = getCardsContainer(filter);
        box?.appendChild(el);
        updateGridSingleClass(box);
      } catch (err) {
        console.warn("カード生成スキップ:", entry.sheet, err);
      }
    }

    // 各年のカードが0枚なら「空表示」を出す（任意）
    filters.forEach((f) => {
      const box = getCardsContainer(f);
      if (!box) return;
      const count = box.querySelectorAll(".works-card").length;
      if (count === 0) {
        box.innerHTML = `<div style="opacity:.6">No works</div>`;
        box.classList.add("is-single");
      }
    });

    // スクロール連動で active 切替
    setupScrollSyncActiveMenu();
  } catch (e) {
    console.error(e);
    feed.innerHTML = `<section class="section"><div style="opacity:.7">ネットワークに接続してください。</div></section>`;
  }
})();