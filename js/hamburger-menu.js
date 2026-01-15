(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".hamburger-menu");
    const overlay = document.querySelector(".hamburger-menu-overlay");
    if (!btn || !overlay) return;

    const links = overlay.querySelectorAll("a");

    function open() {
      overlay.classList.add("is-open");
      btn.classList.add("active"); // ← ×にする
      document.body.style.overflow = "hidden"; // 背景スクロール停止
    }

    function close() {
      overlay.classList.remove("is-open");
      btn.classList.remove("active"); // ← 戻す
      document.body.style.overflow = ""; // 復帰
    }

    function toggle() {
      overlay.classList.contains("is-open") ? close() : open();
    }

    // ボタンで開閉
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });

    // overlay 背景クリックで閉じる（テキスト部分をクリックしたら閉じない）
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    // リンクを押したら閉じる（クリック直後に×も戻る）
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();

        const href = a.getAttribute("href"); // "#about" など
        if (!href) return;

        // ① メニューを閉じる
        close();

        // ② smooth を一時的に無効化
        const feed = document.getElementById("feed");
        const prevBehavior = feed.style.scrollBehavior;
        feed.style.scrollBehavior = "auto";

        // ③ hash 移動（即ジャンプ）
        location.hash = href;

        // ④ 次フレームで smooth を元に戻す
        requestAnimationFrame(() => {
          feed.style.scrollBehavior = prevBehavior || "";
        });
      });
    });

    // hash が変わったら閉じる（保険）
    window.addEventListener("hashchange", close);

    // 画面幅が広がってPCメニューに戻った時も閉じる（保険）
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) close();
    });
  });
})();
