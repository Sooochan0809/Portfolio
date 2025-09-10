// スクロール進捗に応じて文字と色・グラデーションを変化させる
(function () {
    // 進捗に応じて表示するテキスト（PC用）
    const progressTexts = [
        { threshold: 0.0, label: "PROFILE", ja: "プロフィール" },
        { threshold: 0.5, label: "WORKS", ja: "研究/作品" },
        { threshold: 0.7, label: "CORPORATION", ja: "制作協力" },
        { threshold: 0.9, label: "CONTACT", ja: "ご連絡" },
        { threshold: 1.0, label: "CONTACT", ja: "ご連絡" }
    ];

    // 進捗に応じて表示するテキスト（モバイル用）
    const mobileProgressTexts = [
        { threshold: 0.0, label: "PROFILE", ja: "プロフィール" },
        { threshold: 0.21, label: "", ja: "" },
        { threshold: 0.48, label: "WORKS", ja: "研究/作品" },
        { threshold: 0.7, label: "CORPORATION", ja: "制作協力" },
        { threshold: 0.9, label: "CONTACT", ja: "ご連絡" },
        { threshold: 1.0, label: "CONTACT", ja: "ご連絡" }
    ];

    function lerpColor(a, b, t) {
        return Math.round(a + (b - a) * t);
    }
    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
    function getProgressText(progress, arr) {
        for (let i = arr.length - 1; i >= 0; --i) {
            if (progress >= arr[i].threshold) {
                return arr[i];
            }
        }
        return arr[0];
    }
    function isMobileScreen() {
        // 640px未満をモバイルとみなす（Tailwind sm: breakpoint）
        return window.innerWidth < 1024;
    }

    function updatePortfolioProgressSafe() {
        const wrapper = document.getElementById('portfolio-progress');
        if (!wrapper) return;
        const text = wrapper.querySelector('.portfolio-text');
        const grad = wrapper.querySelector('.portfolio-gradient');
        const ja = document.getElementById('portfolio-progress-ja');
        if (!text || !grad) return;

        // スクロール進捗
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        let progress = docHeight > 0 ? scrollTop / docHeight : 0;
        progress = clamp(progress, 0, 1);

        // 画面サイズによってテキスト配列を切り替え
        const useMobile = isMobileScreen();
        const arr = useMobile ? mobileProgressTexts : progressTexts;
        const progressText = getProgressText(progress, arr);
        const newText = progressText.label;
        const newJa = progressText.ja;
        if (text.textContent !== newText) {
            text.textContent = newText;
            grad.textContent = newText;
        }
        if (ja && ja.textContent !== newJa) {
            ja.textContent = newJa;
        }

        // 黒 (#000) から むらさき (#8000ff) への色変化
        const start = { r: 0, g: 0, b: 0 };
        const end = { r: 128, g: 0, b: 255 };
        const r = lerpColor(start.r, end.r, progress);
        const g = lerpColor(start.g, end.g, progress);
        const b = lerpColor(start.b, end.b, progress);
        text.style.color = `rgb(${r},${g},${b})`;

        // 下から上にたまるグラデーション
        const percent = Math.round(progress * 100);
        grad.style.background = `linear-gradient(to top, #81c7d7 0%, #81c7d7 ${percent}%, transparent ${percent}%, transparent 100%)`;
        grad.style.webkitBackgroundClip = "text";
        grad.style.backgroundClip = "text";
        grad.style.webkitTextFillColor = "transparent";
        grad.style.textFillColor = "transparent";
        grad.style.opacity = percent > 0 ? 1 : 0;

        // 進捗100%で黒文字を消す
        text.style.opacity = (progress < 1) ? 1 : 0;
    }

    // iOS Safariのバグ対策: scrollイベントの挙動が遅延することがあるためrequestAnimationFrameでラップ
    let ticking = false;
    function onScrollOrResize() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updatePortfolioProgressSafe();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('DOMContentLoaded', updatePortfolioProgressSafe);
})();