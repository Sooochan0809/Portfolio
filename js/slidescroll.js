// 横スクロールカード同士の間隔と、最初・最後の余白をCSSで指定
const style = document.createElement('style');
style.innerHTML = `
  .horizontal-scroll {
    display: flex;
    gap: 96px;
    padding-left: 560px;
    padding-right: 560px;
    /* 画面幅に応じて余白を調整したい場合はvwを調整 */
  }
  .scroll-item {
    margin-right: 0 !important;
    border-radius: 0 !important; /* 角を鋭角に */
  }
  .horizontal-scroll .scroll-item:last-child {
    margin-right: 0 !important;
  }
  @media (max-width: 640px) {
    .horizontal-scroll {
      padding-left: 320px;
      padding-right: 80px;
      gap: 48px;
    }
  }
`;
document.head.appendChild(style);

// 2. カードHTML
function cardHTML(w) {
    return `
        <article class="scroll-item group rounded-2xl border overflow-hidden bg-white/60 dark:bg-zinc-950/50 hover:shadow-lg transition">
          <a href="detail.html?slug=${w.slug}" class="block">
            <div class="ratio"><img src="${w.cover}" alt="${w.title}" loading="lazy"/></div>
            <div class="p-4">
              <div class="flex items-center justify-between text-xs text-zinc-500"><span>${w.year}</span><span>${w.tags.join(', ')}</span></div>
              <h3 class="mt-2 text-[#111827] font-semibold group-hover:text-brand">${w.title}</h3>
              <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-200">${w.summary}</p>
            </div>
          </a>
        </article>`;
}

// 横スクロール全体を描画
function renderHorizontalScroll() {
    // 作品・協力を連結
    const allCards = [
        ...works.map(cardHTML),
        // indicatorHTML(),
        ...worksMore.map(cardHTML)
    ].join('');
    document.getElementById('horizontalScroll').innerHTML = allCards;
}
// 必ずDOMContentLoaded後に呼ぶ
document.addEventListener('DOMContentLoaded', renderHorizontalScroll);

// ========== 横スクロールGSAP ==========

document.addEventListener('DOMContentLoaded', function () {
    // GSAP/ScrollTriggerが読み込まれているかチェック
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP or ScrollTrigger is not loaded!");
        return;
    }

    const horizontalSection = document.querySelector('.horizontal-section');
    const horizontalScroll = document.getElementById('horizontalScroll');
    const worksHeader = document.getElementById('worksHeader');
    const cooperationHeader = document.getElementById('cooperationHeader');

    // works, indicator, cooperationのカード数
    const worksCount = works.length;
    const indicatorCount = 1;
    const cooperationCount = worksMore.length;

    // 各カードの幅を取得（gapを考慮）
    function getCardWidth(idx) {
        const item = horizontalScroll.children[idx];
        if (!item) return 0;
        // gapを考慮してwidth + gapを返す（最後のカードはgapなし）
        const style = getComputedStyle(horizontalScroll);
        const gap = parseFloat(style.gap || 0);
        let width = item.getBoundingClientRect().width;
        if (idx < horizontalScroll.children.length - 1) width += gap;
        return width;
    }

    // works+indicatorまでの幅
    function getWorksScrollWidth() {
        let w = 0;
        for (let i = 0; i < worksCount + indicatorCount; ++i) {
            w += getCardWidth(i);
        }
        return w;
    }

    function setupHorizontalScroll() {
        // 既存のScrollTriggerをkill
        ScrollTrigger.getAll().forEach(st => st.kill());

        // 横スクロールセクションの幅を取得
        const sectionRect = horizontalSection.getBoundingClientRect();
        const sectionWidth = sectionRect.width;

        // 横スクロールの最大移動量
        // padding分も考慮してscrollWidth-sectionWidthでOK
        const maxScrollX = Math.max(0, horizontalScroll.scrollWidth - sectionWidth);

        gsap.to(horizontalScroll, {
            x: () => {
                return -maxScrollX;
            },
            ease: "none",
            scrollTrigger: {
                trigger: horizontalSection,
                start: "top top+=120",
                end: () => `+=${maxScrollX}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    // worksとcooperationの切り替え
                    const worksEnd = getWorksScrollWidth() - horizontalSection.offsetWidth * 0.5;
                    const scrollX = -gsap.getProperty(horizontalScroll, "x");
                    if (scrollX < worksEnd) {
                        worksHeader && worksHeader.classList.add('show');
                        worksHeader && worksHeader.classList.remove('fade');
                        cooperationHeader && cooperationHeader.classList.add('fade');
                        cooperationHeader && cooperationHeader.classList.remove('show');
                    } else {
                        worksHeader && worksHeader.classList.remove('show');
                        worksHeader && worksHeader.classList.add('fade');
                        cooperationHeader && cooperationHeader.classList.remove('fade');
                        cooperationHeader && cooperationHeader.classList.add('show');
                    }
                }
            }
        });

        // 各アイテムのフェードインアニメーション
        const scrollItems = horizontalScroll.querySelectorAll('.scroll-item');
        scrollItems.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // ホバー効果（iOSではhoverが効かないのでtouchstartも対応）
        scrollItems.forEach(item => {
            function scaleUp() {
                gsap.to(item, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            function scaleDown() {
                gsap.to(item, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            item.addEventListener('mouseenter', scaleUp);
            item.addEventListener('mouseleave', scaleDown);
            // iOS/touchデバイス用
            item.addEventListener('touchstart', scaleUp);
            item.addEventListener('touchend', scaleDown);
        });

        // スクロール進捗の表示（デバッグ用）
        ScrollTrigger.create({
            trigger: horizontalSection,
            start: "top top+=120",
            end: () => `+=${horizontalScroll.scrollWidth - horizontalSection.offsetWidth}`,
            onUpdate: (self) => {
                // iOSでconsole.logが重い場合はコメントアウト
                // console.log("Scroll Progress:", self.progress);
            }
        });
    }

    // iOS Safariのバグ対策: DOM描画が遅れることがあるのでsetTimeoutを長めに
    setTimeout(setupHorizontalScroll, /iP(ad|hone|od)/.test(navigator.userAgent) ? 600 : 200);

    // リサイズ時に再セットアップ
    window.addEventListener('resize', () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
        setTimeout(setupHorizontalScroll, /iP(ad|hone|od)/.test(navigator.userAgent) ? 600 : 200);
    });
});