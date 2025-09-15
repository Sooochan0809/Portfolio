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
    // 体験の流れを表現できるconst
    // 例: [{ step: "受付", description: "会場で受付を済ませます" }, ...]
    const flow = (...steps) => steps.map(([step, description]) => ({ step, description }));
    // ===== Works =====
    window.works = [
        {
            slug: "syusikennkyu-3", // 目の身体性について
            title: "《みる目/みせる目/みられる目》",
            year: "2025",
            tags: ["修士研究", "ワークショップ", "iOSアプリ"],
            cover: toDriveDirectLink("https://drive.google.com/file/d/1aYsoJG-ZOdz5V1NbbQE7lLi9knfI-oLV/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    youtube("https://youtu.be/MIuBiFRICeM"),
                ),
                sec("概要",
                    p("2025年6月28日、あいちワークショップギャザリングにて、《みる目／みせる目／みられる目》を実施。本ワークショップは、「目」の普段、見過ごされがちな側面に焦点を当を当てたワークショップ。"),
                    p("オリジナルのiOSアプリケーションを用い、アプリケーション中のゲームで遊びながら進行していく。"),
                ),
                sec("目的",
                    p("「目は口ほどに物を言う」ということわざがあるように、目は人と人とのコミュニケーションにおいて豊かな情報源である。"),
                    p("しかし、コロナ禍を経て一般化した遠隔コミュニケーションや、近年のメディア環境の変化の中で、ますます、目を「見る目」としてのみ捉える一元的な見方が広がり、私たちはしばしば「目」の役割を忘れてはいないだろうか。 本ワークショップでは、参加者が楽しみながら“目”に対する一面的な認識を可視化しつつ、「見せる目」「見られる目」を意識することを目的としている")
                ),
                sec("アプリケーション",
                    youtube("https://youtu.be/pVhLlvxYfu8"),
                    p("アプリケーションは「バードウォッチングゲーム」「メインゲーム (全3種）」、「メインゲームの振り返り」の全3パートに分かれている。"),
                    p("＊映像はIAMASOPENHOUSE2024にてワークショップのアーカイブを展示した際のものです。"),
                ),
                sec("ベストショット",
                    img("https://drive.google.com/file/d/179NXrK17mBwrNnmEbMh0LY_zWspeTX3W/view?usp=sharing", "画像", "16/9"),
                    img("https://drive.google.com/file/d/13BjKRoprMOoasfuWtxU9gkVuRDC1ak0b/view?usp=sharing", "画像", "16/9"),
                    p("　"),
                    p("変顔大会になることも．．．＊親御さんへの了承を得て撮影したいものです。")
                ),
                sec("実施協力",
                    p("情報科学芸術大学修士2年　牛尾 日莉")
                ),
                sec("関連",
                    ul([
                        { text: "あいちワークショップギャザリング", href: "https://workshop.ciao.jp/gathering/" },
                    ])
                )
            ]
        },
        {
            slug: "syusikennkyu-2", // め遊びプロジェクト
            title: "め遊び inスイトピアテラス",
            year: "2025",
            tags: ["ワークショップ", "体験"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1SUrosEoXyN-X47j-qiHH5pEi6Sxvxzs6/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://youtu.be/IPXictFjRAM?si=XbtM-9ZBw2SfjPFL", "4/3"),
                ),
                sec("概要",
                    p("2025年5月5日、スイトピアセンターで開催された「スイトピアテラス」にて、《め遊び -目でモノに触ったり、気持ちを伝えたり、いろいろな目の使い方にチャレンジしよう！- 》を実施。 当日は、老若男女さまざまな方々に《め触り》を体験して頂いた。"),
                ),
                sec("《め触り》について",
                    youtube("https://youtu.be/UoMuOlyS8-c"),
                    p("《め触り》は瞼を大きく開けたり、逆に細めたりすることで映像の中のオブジェクトを動かす装置。"),
                    p("今回の展示では、”はこ”と”バネ”の二種類（それぞれ大/中/小の3パターン）のオブジェクトを目で動かして遊ぶことができる。"),
                    p("3パターン、それぞれ異なる質量を持ち、それに応じて挙動のスピードが異なっている。これらの違いが目の開閉運動と連動されることで、手を使わずに「重さ」や「硬さ」を擬似的に知覚できる。"),
                    p("　"),
                    youtube("https://youtu.be/N6ExbDVTBE8"),
                    p("手元には、映像内のオブジェクトを変更する為のスイッチャーがおかれている。これを操作することで、オブジェクトの大/中/小を選ぶ。")
                ),
                sec("関連",
                    ul([
                        { text: "スイトピア", href: "https://www2.og-bunka.or.jp/" },
                        { text: "疑似触覚", href: "https://www.jstage.jst.go.jp/article/isciesci/61/11/61_447/_pdf/-char/ja" }
                    ])
                )
            ]
        },
        {
            slug: "syusikennkyu-1",
            title: "め遊び-びょ～んびょん編-",
            year: "2025",
            tags: ["ワークショップ", "体験"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1s9Q58Q0-wyxCK5ppN7SHriCV2iFyTADI/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    img("https://drive.google.com/file/d/1bW9OuY9yd6IgkjvIm4r7sk1EkzMc9dVR/view?usp=drive_link", "画像", "16/9")
                ),
                sec("概要",
                    p("2025年2月15日、あいちワークショップギャザリングにて、《め遊び ―びょ～んびょん編-》を実施。"),
                    p("本ワークショップでは、本来、手を使って感じる質感や感触（手触り）を目や目元の動きを使って擬似的に再現する体験を作り出し、目や目元の筋肉を意識的に動かす体験を通じて、新たな感覚の共有を試みた。")

                ),
                sec("目的",
                    p("体験者の表情を豊かにすること。"),
                ),
                sec("体験のながれ",
                    img("https://drive.google.com/file/d/1ILeK-U9-ZK7BnHM3y-KYVmE_TNezzZQd/view?usp=sharing", "画像", "16/9")
                ),
                sec("共同実施者",
                    p("牛尾 日莉")
                ),
                sec("関連",
                    ul([
                        { text: "あいちワークショップギャザリング", href: "https://workshop.ciao.jp/gathering/" },
                    ])
                )
            ]
        },
        {
            slug: "ivrc2024-2",
            title: "耳研澄製造工場 -IVRC2024LEAPSTAGE-",
            year: "2024",
            tags: ["作品", "研究", "装置"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1rNQI0kzh4QPWD44srstxefkF4qbpp4ec/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9")
                ),
                sec("概要",
                    p("準備中です💦"),

                ),
                sec("目的",
                    p("準備中です💦"),
                ),
                sec("プロセス",
                    ul(["準備中です💦"])
                ),
                sec("結果・考察",
                    p("準備中です💦")
                )
            ]
        },
        {
            slug: "ivrc-2",
            title: "耳研澄製造工場 -IVRC2024SEEDSTAGE-",
            year: "2025",
            tags: ["作品", "研究", "装置"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/15BX6HCzQ38B8JfMaL9f-YLkYQLyfu3Kg/view?usp=drive_link"),
            summary: "",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://youtu.be/QZ8XvUwAlV0")
                ),
                sec("概要",
                    p("準備中です💦"),

                ),
                sec("目的",
                    p("準備中です💦"),
                ),
                sec("システム",
                    youtube("https://youtu.be/S_l2gkAJwa4"),
                    ul(["テキスト準備中です💦"])
                ),
                sec("表彰",
                    p("準備中です💦")
                ),
                sec("関連",
                    ul([
                        { text: "IVRC(Interverse Virtual Reality Challenge)", href: "https://ivrc.net" },
                        { text: "IVRC HISTORY ARCHIVE", href: "https://ivrc.net/archive/%e8%80%b3%e7%a0%94%e6%be%84%e8%a3%85%e7%bd%ae%e8%a3%bd%e9%80%a0%e5%b7%a5%e5%a0%b42024/" }
                    ])
                )

            ]
        },
        {
            slug: "cim-g",
            title: "Character Input Method by Gasshou ”CIM-G”",
            year: "2024",
            tags: ["作品", "研究", "インターフェース"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1CDRAif-akHv_xQv9xYoHURqCHwlIxQer/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://youtu.be/SGGzU31cSgY")
                ),
                sec("概要",
                    p("スマートフォンの登場により、外出先での連絡やアプリ操作など、デジタルインタラクションの空間的制約が解消された。さらに、HMDのようなウェアラブルデバイスはその自由度を拡張し、私生活への浸透が期待されている。 しかし、これらのデバイスの進化に対し、文字入力のインターフェースはキーボードやフリック入力といった従来の方式に留まっている。このため、直感的な操作が実現されず、入力の速度や精度に課題があり、新しい環境に最適とは言えない。特にHMDを用いた仮想空間では、空間上に浮かぶ仮想キーボードを使う場面が一般的だが、触覚フィードバックが欠如している点が問題として挙げられる。"),

                ),
                sec("目的",
                    p("HMD装着時における新しい文字入力手法として、直感的に操作でき、持ち運びの必要がなく、どこでも文字入力が可能な新しい手法を提案する。"),
                ),
                sec("担当箇所",
                    img("https://drive.google.com/file/d/1P9-82BG87VNTEtI4MYlkJbM5ikOBjeQC/view?usp=sharing"),
                    p("　　　"),
                    p("mediapipeを使用した手のひら検出を使用したインターフェースの試作。")
                ),
                sec("プロジェクトメンバー",
                    p("城戸双汰朗，高岸航平，佐藤杏南")
                )
            ]
        },
        {
            slug: "soturon",
            title: "鍛冶屋町妖怪祭り2023",
            year: "2023",
            tags: ["作品", "卒業研究"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/10wa_FsPwPQhq0sEtdUsLEF02m7PQ2ssF/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://youtu.be/wBFpHJ63ji8")
                ),
                sec("概要",
                    p("卒業研究の一環として、熊本県八代市鍛冶屋町で行われた妖怪祭りにてムービングライトとモバイル型プロジェクターとがインタラクションする装置を出展。老略男女様々な方に体験していただいた。"),

                ),
                sec("目的",
                    youtube("https://youtu.be/OY4mEmUbKzo"),
                    p("ムービングライトに対しての汎用性、および、容易性の高いインタラクションシステムを構築することを目指す。"),
                    p("この実現により、これまでのムービングライトを用いたインタラクティブ作品と比べ、操作の直感性やシステムの汎用性（場所／コンテンツ／対象ユーザの幅）の向上が期待できる。")
                ),
                sec("論文",
                    ul([
                        { text: "モバイル型入出力装置を用いたムービングライトとの新しいインタラクション", href: "https://cir.nii.ac.jp/crid/1050582850003550720" }
                    ])
                )
            ]
        },
        {
            slug: "dousyokubutuen",
            title: "準備中です💦",
            year: "2022",
            tags: ["作品", "研究"],
            cover:
                toDriveDirectLink(""),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://youtu.be/wBFpHJ63ji8")
                ),
                sec("概要",
                    p("卒業研究の一環として、熊本県八代市鍛冶屋町で行われた妖怪祭りにてムービングライトとモバイル型プロジェクターとがインタラクションする装置を出展。老略男女様々な方に体験していただいた。"),

                ),
                sec("目的",
                    youtube("https://youtu.be/OY4mEmUbKzo"),
                    p("ムービングライトに対しての汎用性、および、容易性の高いインタラクションシステムを構築することを目指す。"),
                    p("この実現により、これまでのムービングライトを用いたインタラクティブ作品と比べ、操作の直感性やシステムの汎用性（場所／コンテンツ／対象ユーザの幅）の向上が期待できる。")
                ),
                sec("論文",
                    ul([
                        { text: "モバイル型入出力装置を用いたムービングライトとの新しいインタラクション", href: "https://cir.nii.ac.jp/crid/1050582850003550720" }
                    ])
                )
            ]
        }
    ];

    // ===== Cooperation / More =====
    window.worksMore = [
        {
            slug: "test-more-2025-a",
            title: "準備中です💦",
            year: "2025",
            tags: [],
            cover:
                toDriveDirectLink(""),
            summary: "",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9")
                ),
                sec("概要",
                    p("準備中です💦"),

                ),
                sec("目的",
                    p("準備中です💦"),
                ),
                sec("プロセス",
                    ul(["準備中です💦"])
                ),
                sec("結果・考察",
                    p("準備中です💦")
                )
            ]
        },
        {
            slug: "test-more-2025-b",
            title: "準備中です💦",
            year: "2025",
            tags: [],
            cover:
                toDriveDirectLink(""),
            summary: "",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9")
                ),
                sec("概要",
                    p("準備中です💦"),

                ),
                sec("目的",
                    p("準備中です💦"),
                ),
                sec("プロセス",
                    ul(["準備中です💦"])
                ),
                sec("結果・考察",
                    p("準備中です💦")
                )
            ]
        },
        {
            slug: "test-2021-hci",
            title: "準備中です💦",
            year: "2021",
            tags: [],
            cover:
                toDriveDirectLink(""),
            summary: "",
            role: ["研究", "設計"],
            period: "2025",
            body: [
                // ここから画像専用
                secImg("",
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9"),
                    img("", "画像", "16/9")
                ),
                sec("概要",
                    p("準備中です💦"),

                ),
                sec("目的",
                    p("準備中です💦"),
                ),
                sec("プロセス",
                    ul(["準備中です💦"])
                ),
                sec("結果・考察",
                    p("準備中です💦")
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
