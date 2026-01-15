const WAIT_BEFORE_SPIN = 200; // 回転開始までの時間
const WAIT_BEFORE_ZOOM = 200; // 回転終了→肥大化までの時間

let pageLoaded = false;

// load を待つ（すでに load 済みなら即 resolve）
function waitForFullLoad() {
  return new Promise((resolve) => {
    // 画像など含めた完全ロードが終わっていれば即OK
    if (document.readyState === "complete") return resolve();

    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function buildOverlay() {
  const overlay = document.getElementById("loading");
  const logo = overlay?.querySelector(".loading-logo");
  return { overlay, logo };
}

async function playLoading() {
  const { overlay, logo } = buildOverlay();
  if (!overlay || !logo) return;

  // まず完全ロードを待つ
  await waitForFullLoad();
  pageLoaded = true;

  // ここからアニメ開始
  setTimeout(() => {
    overlay.classList.add("is-rotating");
  }, WAIT_BEFORE_SPIN);

  const onEnd = (e) => {
    // ★ここでフロートイン開始
    document.documentElement.classList.add("is-enter");
    if (e.animationName === "spin-loading-logo") {
      overlay.classList.remove("is-rotating");

      setTimeout(() => {
        overlay.classList.add("is-expanding");
      }, WAIT_BEFORE_ZOOM);
    } else if (e.animationName === "expandOut") {
      // 「ロード完了してる時だけ」進行開始＆overlay除去
      if (pageLoaded) {
        window.S1_SLIDESHOW?.start(1000);
        logo.removeEventListener("animationend", onEnd);
        overlay.remove();
      }
    }
  };

  logo.addEventListener("animationend", onEnd);
}

// 初回ロード：即開始しない（load 後に開始）
playLoading();

// bfcache 復帰（戻る/進むで“瞬時に戻る場合”）では走らせない
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    const existing = document.getElementById("loading");
    if (existing) existing.remove();

    document.documentElement.classList.add("is-enter");

    window.S1_SLIDESHOW?.start(0);
  }
});
