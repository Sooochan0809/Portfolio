// js/skills-tools-render.js
import { TOOLS, Lang } from "./skills-data.js";

function buildCard(item, { showDescription = false } = {}) {
    const p = Math.max(0, Math.min(100, Number(item.percent) || 0));
    const descCol = showDescription && item.description
        ? `<div class="flex flex-col justify-end h-40 pl-2">
         <div class="text-xs text-zinc-500 text-left">${item.description}</div>
       </div>`
        : "";

    return `
    <div class="p-6 rounded-2xl flex flex-col items-center"
         data-percent="${p}" aria-label="${item.name}">
      <div class="flex items-end gap-4 w-full">
        <div class="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 160 160" class="w-40 h-40">
            <circle cx="80" cy="80" r="64" fill="none"
              class="stroke-zinc-200/70 dark:stroke-zinc-800/70" stroke-width="14" />
            <circle cx="80" cy="80" r="64" fill="none" class="bar stroke-brand"
              stroke="currentColor" stroke-width="14" stroke-linecap="round"
              style="transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)"
              transform="rotate(-90 80 80)"/>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-bold text-brand text-lg">${item.name}</span>
          </div>
        </div>
        ${descCol}
      </div>
    </div>
  `;
}

function applyStroke(scopeEl) {
    scopeEl.querySelectorAll("[data-percent]").forEach(card => {
        const p = Math.max(0, Math.min(100, Number(card.dataset.percent) || 0));
        const bar = card.querySelector("circle.bar");
        if (!bar) return;
        const r = Number(bar.getAttribute("r")) || 64;
        const c = 2 * Math.PI * r;
        bar.style.strokeDasharray = String(c);
        bar.style.strokeDashoffset = String(c * (1 - p / 100));
    });
}

function renderSection(containerId, items, opts) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    if (!Array.isArray(items) || items.length === 0) {
        wrap.innerHTML = `<div class="text-sm text-zinc-500">項目がありません</div>`;
        return;
    }
    wrap.innerHTML = items.map(i => buildCard(i, opts)).join("");
    applyStroke(wrap);
}

function renderAll() {
    // ツール：説明あり
    renderSection("skills-tools", TOOLS, { showDescription: true });
    // プログラム言語：説明なし（円と名称のみ）
    renderSection("skills-langs", Lang, { showDescription: false });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
} else {
    renderAll();
}