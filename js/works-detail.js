import {
  INDEX_SHEET_NAME,
  fetchSheetRows,
  escapeHTML,
  escapeAttr,
  parseSheetDate,
} from "./works-data.js";

(async function () {
  const container = document.getElementById("worksDetail");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const sheetName = params.get("sheet") || "2025-06-28";

  try {
    const rows = await fetchSheetRows(sheetName);
    container.innerHTML = "";

    let subWrap = null;
    const flushSubWrap = () => {
      if (subWrap) {
        container.appendChild(subWrap);
        subWrap = null;
      }
    };

    for (const r of rows) {
      const label = (r.Label || "").trim();
      const data = (r.Data || "").trimEnd();
      if (!label) continue;

      if (label !== "sub-text") flushSubWrap();

      if (label === "title") {
        const h3 = document.createElement("h3");
        h3.className = "title";
        h3.textContent = data;
        container.appendChild(h3);
        continue;
      }

      if (label === "head") {
        const h4 = document.createElement("h4");
        h4.className = "head";
        h4.textContent = data;
        container.appendChild(h4);
        continue;
      }

      if (label === "sub-text") {
        if (!subWrap) {
          subWrap = document.createElement("div");
          subWrap.className = "sub-text-space";
        }
        const div = document.createElement("div");
        div.className = "sub-text";
        div.textContent = data;
        subWrap.appendChild(div);
        continue;
      }

      if (label === "main-text") {
        const p = document.createElement("p");
        p.className = "main-text-space";
        p.innerHTML = formatMainTextHTML(data);
        container.appendChild(p);
        continue;
      }

      if (label === "video") {
        const wrap = document.createElement("div");
        wrap.className = "video-space";
        wrap.innerHTML = renderVideoHTML(data);
        container.appendChild(wrap);
        continue;
      }

      if (label === "img") {
        const wrap = document.createElement("div");
        wrap.className = "img-space";
        const img = document.createElement("img");
        img.src = normalizeDriveImageUrl(data);
        img.alt = "";
        wrap.appendChild(img);
        container.appendChild(wrap);
        continue;
      }
    }
    flushSubWrap();

    await setupPager(sheetName);
  } catch (e) {
    console.error(e);
    container.innerHTML = `<p>データ取得に失敗しました。ページをリロードしてください。</p>`;
  }
})();

async function setupPager(currentSheet) {
  const prevLink = document.querySelector("a.back-work");
  const nextLink = document.querySelector("a.next-work");
  if (!prevLink || !nextLink) return;

  const indexRows = await fetchSheetRows(INDEX_SHEET_NAME);
  const sheetsRaw = indexRows
    .map((r, i) => ({
      sheet: String(r.sheet || r.Sheet || "").trim(),
      i,
    }))
    .filter((x) => x.sheet);

  if (!sheetsRaw.length) return;

  const sheets = sheetsRaw
    .slice()
    .sort((a, b) => {
      const da = parseSheetDate(a.sheet);
      const db = parseSheetDate(b.sheet);
      const ta = da ? da.getTime() : -Infinity;
      const tb = db ? db.getTime() : -Infinity;

      if (da && db) return tb - ta;
      if (da && !db) return -1;
      if (!da && db) return 1;
      return a.i - b.i;
    })
    .map((x) => x.sheet);

  const cur = String(currentSheet).trim();
  const idx = sheets.indexOf(cur);

  if (idx === -1) {
    disableLink(prevLink);
    disableLink(nextLink);
    return;
  }

  const prevSheet = sheets[idx - 1] || null;
  const nextSheet = sheets[idx + 1] || null;

  if (prevSheet) {
    prevLink.href = makeSheetUrl(prevSheet);
    enableLink(prevLink);
  } else {
    disableLink(prevLink);
  }

  if (nextSheet) {
    nextLink.href = makeSheetUrl(nextSheet);
    enableLink(nextLink);
  } else {
    disableLink(nextLink);
  }
}

function makeSheetUrl(sheet) {
  const url = new URL(location.href);
  url.searchParams.set("sheet", sheet);
  return url.toString();
}

function disableLink(a) {
  a.removeAttribute("href");
  a.setAttribute("aria-disabled", "true");
  a.style.opacity = "0.35";
  a.style.pointerEvents = "none";
}

function enableLink(a) {
  a.setAttribute("aria-disabled", "false");
  a.style.opacity = "";
  a.style.pointerEvents = "";
}

function normalizeDriveImageUrl(url) {
  if (!url) return "";
  const s = String(url).trim();

  let m = s.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w2000`;

  m = s.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w2000`;

  m = s.match(/drive\.google\.com\/uc\?id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w2000`;

  if (s.includes("drive.google.com/thumbnail?id=")) return s;

  return s;
}

function formatMainTextHTML(text) {
  const safe = escapeHTML(String(text))
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
  const paras = safe.split(/\n{2,}/).map((p) => p.replace(/\n/g, "<br>\n"));
  return paras.join('\n<span class="spacer"></span>\n');
}

function parseYouTube(url) {
  try {
    const u = new URL(url);

    let id = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    if (!id && u.pathname === "/watch") id = u.searchParams.get("v");
    if (!id) {
      const m = u.pathname.match(/^\/(live|embed|shorts)\/([A-Za-z0-9_-]+)/);
      if (m) id = m[2];
    }

    if (!id) return null;

    let start = u.searchParams.get("start");
    if (start != null) start = Number(start);
    if (!start) {
      const t = u.searchParams.get("t");
      start = t ? parseTimeToSeconds(t) : 0;
    }

    return { id, start: start || 0 };
  } catch {
    return null;
  }
}

function parseTimeToSeconds(t) {
  const s = String(t).trim();
  if (/^\d+$/.test(s)) return Number(s);
  if (/^\d+s$/.test(s)) return Number(s.slice(0, -1));

  let sec = 0;
  const h = s.match(/(\d+)h/);
  const m = s.match(/(\d+)m/);
  const se = s.match(/(\d+)s/);
  if (h) sec += Number(h[1]) * 3600;
  if (m) sec += Number(m[1]) * 60;
  if (se) sec += Number(se[1]);
  return sec;
}

function renderVideoHTML(url) {
  if (!url) return "";

  const yt = parseYouTube(url);
  if (yt) {
    const { id, start } = yt;

    const src =
      start > 0
        ? `https://www.youtube.com/embed/${id}?start=${start}`
        : `https://www.youtube.com/embed/${id}`;

    return `
      <div class="yt">
        <iframe
          src="${src}"
          title="YouTube video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `.trim();
  }

  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return `<video controls src="${escapeAttr(url)}" style="width:100%;"></video>`;
  }

  return `<a href="${escapeAttr(url)}" target="_blank" rel="noopener">動画を開く</a>`;
}