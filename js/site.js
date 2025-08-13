// ダークテーマ
(function () {
    // localStorageが'dark'のときだけダーク
    const hasDark = localStorage.getItem('theme') === 'dark';
    if (hasDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeToggle');
        const sun = document.getElementById('iconSun');
        const moon = document.getElementById('iconMoon');
        if (!btn) return;
        if (document.documentElement.classList.contains('dark')) { sun?.classList.remove('hidden'); moon?.classList.add('hidden'); }
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            sun?.classList.toggle('hidden'); moon?.classList.toggle('hidden');
        });
    });
})();

// モバイルメニュー
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('mobileNav');
    btn?.addEventListener('click', () => nav?.classList.toggle('hidden'));
});

// 現在ページのアクティブ表示
window.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(a => {
        const target = a.getAttribute('href');
        if (!target) return;
        const t = target.replace('./', '');
        if ((path === '' && t === 'index.html') || path === t || (path === 'index.html' && t === './')) {
            a.classList.add('text-brand', 'font-semibold');
        }
    });
});