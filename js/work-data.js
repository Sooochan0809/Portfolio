// js/work-data.js
// 一覧ページは `works/worksMore` を参照、詳細は `window.works/window.worksMore` も参照可。
// ←このファイルだけで小見出しと本文を編集できるよう、ヘルパーを用意。

(function () {
    // ---- 本文ヘルパー（編集がラクになります） --------------------------
    const sec = (title, ...content) => ({ type: "section", title, content });   // 小見出しセクション
    const p = (text) => ({ type: "p", text });             // 段落
    //const img = (src, alt = "", ratio = "16/9") => ({ type: "img", src, alt, ratio }); // 画像（比率可）
    // Google Drive の共有URLを lh3 形式に変換するヘルパー
    function toDriveDirectLink(url, size = 1200) {
        // /d/FILE_ID/ を抽出
        const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (m) {
            return `https://lh3.googleusercontent.com/d/${m[1]}=s${size}`;
        }
        return url; // 通常のURLはそのまま返す
    }

    // 画像用のヘルパー
    // 画像比率の変換を使いたい場合は、ratio引数に希望の比率（例: "4/3", "1/1" など）を指定してください。
    // 例: img("url", "説明", "4/3") で4:3比率の画像枠になります。
    // force169をtrueにすると、どんな比率でも16:9枠に収めて表示します。
    // force169は引数でTrueにする？→ 必要なときだけtrueを明示的に渡す形にする（デフォルトはfalse）
    const img = (src, alt = "", ratio = "16/9") => ({
        type: "img",
        src: toDriveDirectLink(src),
        alt,
        ratio,
    });
    const secImg = (title, ...images) => ({ type: "gallery", title, images });
    const video = (src, poster = "", ratio = "16/9") => ({ type: "video", src, poster, ratio });
    const ul = (items) => ({ type: "ul", items });            // 箇条書き
    // ★ YouTube埋め込み用ヘルパーを追加
    const youtube = (idOrUrl, ratio = "16/9") => {
        // フルURLが渡ってきてもIDだけ抜き出す
        let videoId = idOrUrl;
        const match = idOrUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match) videoId = match[1];

        return { type: "youtube", id: videoId, ratio };
    };
    // ===== Works =====
    window.works = [
        {
            slug: "syusikennkyu-3", // 目の身体性について
            title: "《みる目/みせる目/みられる目》",
            year: "2025",
            tags: ["修士研究", "ワークショップ", "表情"],
            cover: toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "《みる目／みせる目／みられる目》は、主に子どもを対象としたワークショップ。タイトルが示すとおり、「目」が持つ多様なあり方に注目し、普段、見過ごされがちな側面に焦点を当てた内容をオリジナルのiOSアプリケーションを使い、遊びを交えながら進める。　．．．",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing", "画像", "16/9"),
                    video("https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop",
                        "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
                ),
                sec("概要",
                    p("《みる目／みせる目／みられる目》は、主に子どもを対象としたワークショップ。"),
                    p("タイトルが示すとおり、「目」が持つ多様なあり方に注目し、普段、見過ごされがちな側面に焦点を当てた内容をオリジナルのiOSアプリケーションを使い、遊びを交えながら進める。"),
                ),
                sec("目的",
                    p("「目は口ほどに物を言う」ということわざがあるように、目は人と人とのコミュニケーションにおいて豊かな情報源である。しかし、コロナ禍を経て一般化した遠隔コミュニケーションや、近年のメディア環境の変化の中で、ますます、目を「見るもの＝センサー」としてのみ捉える一元的な見方が広がり、私たちはしばしば「目」の役割を忘れてはいないだろうか。。 本ワークショップでは、このような一面的な認識を可視化と、目が持つ“伝える力”を改めて認識することを目的とする。"),
                ),
                sec("アプリケーション",
                    youtube("https://youtu.be/pVhLlvxYfu8"),
                    p("アプリケーションは「バードウォッチングゲーム」「メインゲーム (全3種）」、「メインゲームの振り返り」の全3パートに分かれている。"),
                    p("＊映像はIAMASOPENHOUSE2024にてワークショップのアーカイブを展示した際のものです。"),
                ),
                sec("結果・考察",
                    p("得られた示唆や次のステップ（今後の改善点・適用可能性）など。")
                ),
                sec("実施協力",
                    p("情報科学芸術大学修士2年　牛尾 日莉")
                )
            ]
        },
        {
            slug: "syusikennkyu-2", // め遊びプロジェクト
            title: "め遊び-スイトピアテラス-",
            year: "2025",
            tags: ["ワークショップ"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "スイトピアテラス（2025/5/5）にて出展。",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
            ]
        },
        {
            slug: "test-2025-a",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
            ]
        },
        {
            slug: "test-2025-b",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
            ]
        },
        {
            slug: "test-2025-c",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
            ]
        },
        {
            slug: "test-more-2025-b",
            title: "テスト",
            year: "2025",
            tags: ["Workshop", "Expression", "Education"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
            ]
        },
        {
            slug: "test-2021-hci",
            title: "テスト",
            year: "2021",
            tags: ["Research", "HCI"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "テスト",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9"),
                    img("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", "画像", "16/9")
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
