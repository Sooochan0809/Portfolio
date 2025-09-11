// js/work-data.js
// 一覧ページは `works/worksMore` を参照、詳細は `window.works/window.worksMore` も参照可。
// ←このファイルだけで小見出しと本文を編集できるよう、ヘルパーを用意。

(function () {
    // ---- 本文ヘルパー（編集がラクになります） --------------------------
    const sec = (title, ...content) => ({ type: "section", title, content });   // 小見出しセクション
    const p = (text) => ({ type: "p", text });             // 段落
    const img = (src, alt = "", ratio = "16/9") => ({ type: "img", src, alt, ratio }); // 画像（比率可）
    const secImg = (title, ...images) => ({ type: "gallery", title, images });
    const video = (src, poster = "", ratio = "16/9") => ({ type: "video", src, poster, ratio }); // 動画
    const ul = (items) => ({ type: "ul", items });            // 箇条書き
    // ★ 追加：画像専用セクション（ギャラリー）
    // ※ MD風にまとめて書きたい場合は  { type:"md", text:`[概要] ... [目的] ...` } も使えます

    // ===== Works =====
    window.works = [
        {
            slug: "syusikennkyu-3", // 目の身体性について
            title: "《みる目/みせる目/みられる目》",
            year: "2025",
            tags: ["修士研究", "ワークショップ", "表情"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "あいちワークショップギャザリング（2025/6/28）にて出展。",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    video("https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop",
                        "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p(""),

                ),
                sec("目的",
                    p("「目は口ほどに物を言う」ということわざがあるように、目は人と人とのコミュニケーションにおいて豊かな情報源である。しかし、コロナ禍を経て一般化した遠隔コミュニケーションや、近年のメディア環境の変化の中で、ますます、目を「見るもの＝センサー」としてのみ捉える一元的な見方が広がり、私たちはしばしば「目」の役割を忘れてはいないだろうか。。 本ワークショップでは、このような一面的な認識を可視化と、目が持つ“伝える力”を改めて認識することを目的とする。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("実施協力",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                { label: "協力", value: "牛尾 日莉" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "syusikennkyu-2", // め遊びプロジェクト
            title: "め遊び-スイトピアテラス-",
            year: "2025",
            tags: ["ワークショップ"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "スイトピアテラス（2025/5/5）にて出展。",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p(""),

                ),
                sec("目的",
                    p(""),
                ),
                sec("プロセス",
                    ul([""])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "test-2025-a",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "test-2025-b",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "test-2025-c",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        }
    ];

    // ===== Cooperation / More =====
    window.worksMore = [
        {
            slug: "test-more-2025-a",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "test-more-2025-b",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        },
        {
            slug: "test-2021-hci",
            title: "テスト",
            year: "2021",
            tags: ["Research", "HCI"],
            cover:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "デモ画像", "16/9")
                ),
                sec("概要",
                    p("プロジェクトの背景テキスト（仮）。ここに要点（対象・手法・成果のサマリ）を2〜3文で。"),

                ),
                sec("目的",
                    p("ねらいの説明（仮）。何を明らかにしたいか／解決したい課題は何か。"),
                ),
                sec("プロセス",
                    ul(["調査・要件整理", "プロトタイピング（v1→v2）", "ユーザテスト／考察"])
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("参照",
                    ul([
                        { text: "め遊びプロジェクトホームページ", href: "https://measobi.com/" },
                        { text: "関連資料", href: "https://example.com" }
                    ])
                )
            ],
            credits: [
                // { label: "指導", value: "鈴木 先生" },
                // { label: "撮影", value: "鶴目 さん" }
            ]
        }
    ];

    // 一覧ページの既存コード互換（const 参照用）
    try { window.works ?? (window.works = window.works); } catch { }
    try { window.worksMore ?? (window.worksMore = window.worksMore); } catch { }

    // 既存の一覧JSが `const works/worksMore` を読む想定ならエイリアスを用意
    // （二重定義エラーが出たら下の2行は削除してください）
    // eslint-disable-next-line no-redeclare
    const works = window.works;
    // eslint-disable-next-line no-redeclare
    const worksMore = window.worksMore;
})();
