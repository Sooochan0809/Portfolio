import { fetchSheetRows, escapeHTML, escapeAttr } from "./works-data.js";

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
  } catch (e) {
    console.error(e);
    container.innerHTML = `<p>データ取得に失敗しました（Console見て）</p>`;
  }
})();

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

function renderVideoHTML(url) {
  if (!url) return "";

  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]+)/
  );
  if (yt) {
    const id = yt[1];
    return `
      <iframe
        src="https://www.youtube.com/embed/${id}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width:100%;height:100%;"
      ></iframe>
    `.trim();
  }

  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return `<video controls src="${escapeAttr(
      url
    )}" style="width:100%;height:100%;"></video>`;
  }

  return `<a href="${escapeAttr(
    url
  )}" target="_blank" rel="noopener">動画を開く</a>`;
}
