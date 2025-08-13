// js/timeline-render.js
import { TIMELINE } from "./timeline-data.js";

function render() {
    const list = document.getElementById("timeline");
    if (!list) {
        console.warn("#timeline が見つかりません");
        return;
    }

    if (!Array.isArray(TIMELINE) || TIMELINE.length === 0) {
        list.innerHTML = `<li class="pl-8 py-4 text-sm text-zinc-500">項目がありません</li>`;
        return;
    }

    list.innerHTML = TIMELINE.map(item => {
        const img = item.image
            ? `<figure class="sm:col-start-2">
           <img class="w-28 h-20 object-cover rounded-lg ring-1 ring-zinc-200/70 dark:ring-zinc-800/70"
                src="${item.image}" alt="${item.imageAlt ?? ""}" loading="lazy">
         </figure>`
            : "";

        return `
      <li class="relative pl-8 pb-8">
        <span class="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-brand ring-4 ring-white dark:ring-zinc-950"></span>
        <div class="flex flex-wrap items-baseline gap-x-3">
          <time class="text-xs text-zinc-500">${item.date ?? ""}</time>
          <h4 class="text-base font-semibold">${item.title ?? ""}</h4>
          ${item.meta ? `<span class="text-xs text-zinc-500">${item.meta}</span>` : ""}
        </div>
        <div class="mt-3 grid gap-3 sm:grid-cols-[1fr,auto] sm:items-start">
          ${item.description ? `<p class="text-sm text-zinc-600 dark:text-zinc-300">${item.description}</p>` : ""}
          ${img}
        </div>
      </li>`;
    }).join("");
}

// モジュールはHTML末尾で読み込んでいるが、保険でDOMContentLoadedにも対応
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
} else {
    render();
}
