import {
  INDEX_SHEET_NAME,
  fetchSheetRows,
  escapeHTML,
  escapeAttr,
} from "./about-data.js";

const ABOUT_SHEET_NAME = "about";

const SHEET_MAP = {};

function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

/** Google Driveの共有URLなどを thumbnail URL に正規化 */
function normalizeDriveImageUrl(url) {
  if (!url) return "";
  const s = String(url).trim();

  // /file/d/FILEID/
  let m = s.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  // open?id=FILEID
  m = s.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  // uc?id=FILEID
  m = s.match(/drive\.google\.com\/uc\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;

  // すでにthumbnail
  if (s.includes("drive.google.com/thumbnail?id=")) return s;

  return s;
}

/** http(s) が無いURLは補う（sample.com など） */
function normalizeUrl(url) {
  const s = String(url || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return "https://" + s;
}

async function renderAboutSummary() {
  const imgEl = document.getElementById("aboutSummaryImg");
  const textEl = document.getElementById("aboutSummaryMainText");
  if (!imgEl || !textEl) return;

  const rows = await fetchSheetRows(ABOUT_SHEET_NAME);
  const first = rows[0] || {};

  const text = pick(first, ["Text", "text"]);
  const img = pick(first, ["Img", "img", "Image", "image"]);

  textEl.textContent = text;

  const normalizedImg = normalizeDriveImageUrl(img);
  if (normalizedImg) imgEl.src = normalizedImg;
}

async function renderAboutDetails() {
  const mount = document.getElementById("aboutDetailSpace");
  if (!mount) return;

  const indexRows = await fetchSheetRows(INDEX_SHEET_NAME);

  // index: title / subtitle だけ
  const sections = indexRows
    .map((r) => {
      const title = pick(r, ["title", "Title"]);
      const subtitle = pick(r, [
        "subtitle",
        "Subtitle",
        "sub-title",
        "SubTitle",
      ]);
      const sheetName = SHEET_MAP[title] || title; // titleとタブ名が同じならそのまま
      return { title, subtitle, sheetName };
    })
    .filter((s) => s.title && s.sheetName);

  mount.innerHTML = "";

  for (const sec of sections) {
    let detailRows = [];
    try {
      detailRows = await fetchSheetRows(sec.sheetName);
    } catch (e) {
      console.warn(`detail sheet fetch failed: ${sec.sheetName}`, e);
      detailRows = [];
    }

    const content = document.createElement("div");
    content.className = "about-detail-content";

    content.innerHTML = `
        <div class="title-row-space">
          <h2 class="title">${escapeHTML(sec.title)}</h2>
          <div class="sub-title">${escapeHTML(sec.subtitle)}</div>
        </div>
      `;

    for (const r of detailRows) {
      // あなたの詳細タブ: Time / Text / Link
      const time = pick(r, ["Time", "time"]);
      const text = pick(r, ["Text", "text"]);
      const link = pick(r, ["Link", "link", "URL", "url"]);

      if (!time && !text) continue;

      const href = normalizeUrl(link);
      const mainEl = href
        ? `<a class="main-text" href="${escapeAttr(
            href
          )}" target="_blank" rel="noopener noreferrer">${escapeHTML(text)}</a>`
        : `<span class="main-text">${escapeHTML(text)}</span>`;

      const row = document.createElement("div");
      row.className = "text-row-space";
      row.innerHTML = `
          <p class="time-text">${escapeHTML(time)}</p>
          ${mainEl}
        `;
      content.appendChild(row);
    }

    mount.appendChild(content);
  }
}

(async function () {
  await renderAboutSummary();
  await renderAboutDetails();
})().catch(console.error);
