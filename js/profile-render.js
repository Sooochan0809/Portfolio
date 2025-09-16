import { data } from "./profile-data.js";

// util
const el = (tag, cls = "", html = "") => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html) n.innerHTML = html;
  return n;
};

const dotLink = (label, href) => {
  const span = el(
    "span",
    "col-start-2 break-words md:col-start-auto md:min-w-0 md:whitespace-nowrap md:truncate transition duration-200 hover:scale-105 hover:shadow-glow hover:text-brand cursor-pointer",
  );
  span.style.transition = "all .18s cubic-bezier(.4,0,.2,1)";
  span.textContent = `${label}`;
  if (href && href !== "#") {
    span.addEventListener("click", () => window.open(href, "_blank", "noopener"));
    span.setAttribute("role", "link");
    span.tabIndex = 0;
  }
  return span;
};

// ABOUT
(function renderAbout() {
  const root = document.getElementById("about-me-body");
  if (!root) return;

  const figure = el("figure", "mt-[16px] w-[260px] border border-gray-200 shadow-sm lg:hidden");
  figure.appendChild(Object.assign(el("img", "block w-full h-auto"), {
    src: data.profile.portrait,
    alt: "Portrait",
  }));

  const nameWrap = el("div", "mt-[16px] lg:mt-[56px]");
  const nameLine = el("div", "text-[32px] font-bold");
  nameLine.innerHTML = `${data.profile.nameJP} <span class="ml-2 align-baseline text-[16px] font-normal text-gray-500">${data.profile.nameEN}</span>`;
  const title = el("p", "text-[16px] text-gray-600", data.profile.title);
  nameWrap.append(nameLine, title);

  const bio = el(
    "p",
    "mt-[32px] text-[16px] text-[#111827] dark:text-zinc-200 leading-relaxed tracking-wide"
  );
  bio.style.lineHeight = "24px";
  bio.innerHTML = data.profile.bio.map(line => `${line}`).join("<br>");

  root.append(figure, nameWrap, bio);
})();

// WORK EXPERIENCE
(function renderWork() {
  const list = document.getElementById("work-experience-list");
  if (!list) return;

  data.workExperience.forEach(item => {
    const li = el("li", "mb-[32px]");
    const dot = el(
      "span",
      "absolute -left-[6.9px] mt-[4px] h-3 w-3 rounded-full bg-zinc-800 dark:bg-zinc-200"
    );
    li.appendChild(dot);

    const p1 = el("p", "text-sm text-zinc-500", item.period);
    const p2 = el("p", "mt-[2px] mb-[8px] text-[20px]", item.title);
    const p3 = el("p", "text-[16px] text-zinc-600 dark:text-zinc-300");
    p3.innerHTML = item.desc || "";

    li.append(p1, p2, p3);
    list.appendChild(li);
  });
})();

// Research
(function renderResearch() {
  const ul = document.getElementById("research-list");
  if (!ul) return;

  data.research.forEach(r => {
    const li = el(
      "li",
      "mb-2"
    );
    const date = el("span", "whitespace-nowrap md:mr-2", r.date);

    // titleを一行目に
    const titleLine = el("div", "flex items-baseline gap-x-2");
    titleLine.append(date);
    titleLine.append(
      dotLink(
        r.title,
        r.href,
        "break-words md:min-w-0 md:whitespace-nowrap md:truncate"
      )
    );

    // venueは二行目に
    const venueLine = el(
      "div",
      "pl-[4.5em] text-zinc-500 text-sm",
      `[${r.venue}]`
    );

    li.append(titleLine, venueLine);
    ul.appendChild(li);
  });
})();

// Exhibition / Workshop
(function renderExhibitions() {
  const ul = document.getElementById("exhibition-list");
  if (!ul) return;

  data.exhibitions.forEach(ex => {
    const li = el(
      "li",
      "mb-2"
    );
    // 1行目: 日付と会場
    const firstLine = el(
      "div",
      "flex items-baseline gap-x-2"
    );
    const date = el("span", "whitespace-nowrap md:mr-2", ex.date);
    const place = el(
      "span",
      "break-words md:min-w-0 md:whitespace-nowrap md:truncate md:after:content-[''] md:after:ml-1",
      ex.place
    );
    firstLine.append(date, place);

    // 2行目: work
    const secondLine = el(
      "div",
      "pl-[4.5em] break-words md:min-w-0 md:whitespace-nowrap md:truncate text-zinc-600 dark:text-zinc-300",
      ex.work
    );

    li.append(firstLine, secondLine);
    ul.appendChild(li);
  });
})();

// Production / Cooperation
(function renderCooperation() {
  const ul = document.getElementById("cooperation-list");
  if (!ul) return;

  data.cooperation.forEach(co => {
    const li = el(
      "li",
      "mb-2"
    );
    // 1行目: 日付と会場
    const firstLine = el(
      "div",
      "flex items-baseline gap-x-2"
    );
    const date = el("span", "whitespace-nowrap md:mr-2", co.date);
    const place = el(
      "span",
      "break-words md:min-w-0 md:whitespace-nowrap md:truncate md:after:content-[''] md:after:ml-1",
      co.place
    );
    firstLine.append(date, place);

    // 2行目: role
    const secondLine = el(
      "div",
      "pl-[4.5em] break-words md:min-w-0 md:whitespace-nowrap md:truncate text-zinc-600 dark:text-zinc-300",
      co.role
    );

    li.append(firstLine, secondLine);
    ul.appendChild(li);
  });
})();

// Awards
(function renderAwards() {
  const ul = document.getElementById("award-list");
  if (!ul) return;

  data.awards.forEach(a => {
    const li = el(
      "li",
      "grid grid-cols-[auto,1fr] gap-x-2 items-baseline md:flex md:flex-nowrap md:items-baseline md:gap-x-2 md:min-w-0"
    );
    const date = el("span", "whitespace-nowrap md:mr-2", a.date);
    const contest = el(
      "span",
      "break-words md:min-w-0 md:whitespace-nowrap md:truncate md:after:content-[','] md:after:ml-1",
      a.contest
    );
    const prize = el(
      "span",
      "col-start-2 break-words md:col-start-auto md:min-w-0 md:whitespace-nowrap md:truncate",
      a.prize
    );
    li.append(date, contest, prize);
    ul.appendChild(li);
  });
})();

// Skills
(function renderSkills() {
  const box = document.getElementById("skills-body");
  if (!box) return;

  const left = el("div");
  left.append(
    el("div", "text-sm text-gray-500", "License"),
    el("p", "mt-[4px] text-[16px]", data.skills.license),
    el("div", "mt-[16px] text-sm text-gray-500", "Tools"),
    el("p", "mt-[4px] text-[16px]", data.skills.tools),
  );

  const right = el("div");
  right.append(
    el("div", "text-sm text-gray-500", "Coding"),
    el("p", "mt-[4px] text-[16px]", data.skills.coding),
  );

  box.append(left, right);
})();
