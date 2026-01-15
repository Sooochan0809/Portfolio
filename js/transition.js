let isTransitioning = false;

function ensureOverlay() {
  let overlay = document.getElementById("loading");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "loading-overlay";
    overlay.id = "loading";

    const logo = document.createElement("div");
    logo.className = "loading-logo svg anim-spin";
    overlay.appendChild(logo);

    document.body.appendChild(overlay);
  }

  const logo = overlay.querySelector(".loading-logo");
  return { overlay, logo };
}

function playReverseLoading(thenGoUrl) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    location.href = thenGoUrl;
    return;
  }

  if (isTransitioning) return;
  isTransitioning = true;

  const { overlay, logo } = ensureOverlay();

  // logo が見つからないケースも安全に遷移（＋フラグ戻す）
  if (!logo) {
    isTransitioning = false;
    location.href = thenGoUrl;
    return;
  }

  overlay.classList.remove(
    "is-expanding",
    "is-rotating",
    "is-collapsing",
    "is-reverse"
  );
  overlay.style.opacity = "";
  overlay.style.display = "";

  logo.style.transform = "rotate(360deg) scale(400)";
  overlay.classList.add("is-reverse");

  requestAnimationFrame(() => {
    overlay.classList.add("is-collapsing");
  });

  const onEnd = (e) => {
    if (e.animationName === "collapseIn") {
      logo.removeEventListener("animationend", onEnd);
      location.href = thenGoUrl;
    }
  };
  logo.addEventListener("animationend", onEnd);
}

function bindTransitions() {
  document.querySelectorAll("a.transition").forEach((el) => {
    if (el.dataset.transitionBound === "1") return;
    el.dataset.transitionBound = "1";

    el.addEventListener("click", (e) => {
      // 新規タブ系は止めない
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (el.target === "_blank") return;

      e.preventDefault();
      playReverseLoading(el.href);
    });
  });
}

// ✅ 後から増える a.transition も拾える（イベント委譲）
document.addEventListener("click", (e) => {
  const a = e.target.closest("a.transition");
  if (!a) return;

  // 新規タブ系は止めない
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (a.target === "_blank") return;

  // href が無い a は無視（保険）
  if (!a.href) return;

  e.preventDefault();
  playReverseLoading(a.href);
});

// BFCache対策は残してOK（isTransitioningの復帰など）
window.addEventListener("pageshow", () => {
  isTransitioning = false;

  const overlay = document.getElementById("loading");
  if (overlay) {
    overlay.classList.remove(
      "is-expanding",
      "is-rotating",
      "is-collapsing",
      "is-reverse"
    );
    overlay.style.opacity = "";
    overlay.style.display = "";
  }
});
window.addEventListener("pagehide", () => {
  isTransitioning = false;
});

// 初回
document.addEventListener("DOMContentLoaded", bindTransitions);

// ★戻る（BFCache）対応：状態を必ず戻して再バインド
window.addEventListener("pageshow", () => {
  isTransitioning = false;

  const overlay = document.getElementById("loading");
  if (overlay) {
    overlay.classList.remove(
      "is-expanding",
      "is-rotating",
      "is-collapsing",
      "is-reverse"
    );
    overlay.style.opacity = "";
    overlay.style.display = "";
  }

  bindTransitions();
});

// 任意：遷移途中に戻ったときの保険
window.addEventListener("pagehide", () => {
  isTransitioning = false;
});
