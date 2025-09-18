// js/work-data.js
// 一覧ページは `works/worksMore` を参照、詳細は `window.works/window.worksMore` も参照可。

(function () {
    // ---- 本文ヘルパー--------------------------
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
                    p("《みる目／みせる目／みられる目》は、コロナ禍以降の「見る」を中心としたメディア環境に対抗して、目が持つ“感情や意思を伝える力”を再発見する体験型のワークショップです。参加者は、目の動きでバネを縮めたり岩を持ち上げたりするゲームに挑戦し、自分の目の動きが生む印象を映像で振り返る。最後に「目を使うこと」の意味を考え、目が視覚だけでなく表情・コミュニケーションの重要な要素であることに気づくことを目指す。"),
                ),
                sec("流れ",
                    p("1.アイスブレイク"),
                    p("動体視力を使った自己紹介ゲーム「バードウォッチングゲーム」にチャレンジ！"),
                    p("2.メインゲーム（全3種類）"),
                    p("“念力”を試す3つのゲームにチャレンジ！"),
                    p("3.リフレクション"),
                    p("自分の体験映像を見返し、表情から読み取れる印象を選ぶ。"),
                    p("4.ラップアップ"),
                    p("“念力”って何だろう？を考える。/ ワークショップの総括。"),
                ),
                sec("問い / 問題意識",
                    p("「目」には、少なくとも以下の3つの側面があると考える。"),
                    p("　　　"),
                    p("　・見る目：視覚器官として情報を受け取り、世界を知覚する側面"),
                    p("　・見せる目：コミュニケーションにおいて、意図的に感情や意思を表し、相手に伝える側面"),
                    p("　・見られる目：他者の視点から自分がどのように見られているのかを意識する側面"),
                    p("　　　"),
                    p("しかしながら、TikTok・YouTubeShortsのようなショート動画の普及により、視覚的情報を次々と消費する行為が日常化し、さらに、コロナ禍以降、非対面コミュニケーションの一般化している現代では、「見る目」が娯楽やコミュニケーションの中心になり、「見せる目」「見られる目」は、相対的に置き去りにされているのではないかと考える。"),
                ),
                sec("目的",
                    p("目を意識的に動かす体験を通して、現代社会において希薄化しつつある「見せる目」「見られる目」への意識を活性化させること。")
                ),
                sec("アプリケーション",
                    youtube("https://youtu.be/pVhLlvxYfu8"),
                    p("アプリケーションは、「バードウォッチングゲーム」「メインゲーム (全3種）」、「メインゲームの振り返り」の全3パートに分かれている。")
                ),
                sec("ベストショット集",
                    img("https://drive.google.com/file/d/179NXrK17mBwrNnmEbMh0LY_zWspeTX3W/view?usp=sharing", "画像", "16/9"),
                    img("https://drive.google.com/file/d/13BjKRoprMOoasfuWtxU9gkVuRDC1ak0b/view?usp=sharing", "画像", "16/9"),
                    p("　"),
                    p("一生懸命にゲームに取り組んだ結果、変顔大会になることも..."),
                    p("＊写真は親御さんへの了承を得て撮影したものです。")
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
            slug: "ivrc2024-leap",
            title: "耳研澄製造工場 -IVRC2024LEAPSTAGE-",
            year: "2024",
            tags: ["作品", "研究", "装置"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1rNQI0kzh4QPWD44srstxefkF4qbpp4ec/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    img("https://drive.google.com/file/d/1rNQI0kzh4QPWD44srstxefkF4qbpp4ec/view?usp=sharing", "画像", "16/9")
                ),
                sec("概要",
                    p("この作品では、そうした水中の音環境を、アクティブノイズキャンセリング(ANC)イヤフォンを使って再現します。ANCは、イヤフォンで音楽を聴くときに周囲の騒音を打ち消す技術です。本作品では、そのノイズキャンセリングの強さを調整できるようにし、水中と陸上の聞こえ方の違いを再現します。"),
                    p("さらに、胸付近にあたる布による触覚提示を同期させることで、水中にいるような感覚をより強調します。"),
                    p("これにより、音と触覚の変化によって、陸上と水中の間を行き来する体験を作り出します。")

                ),
                sec("関連",
                    ul([
                        { text: "IVRC(Interverse Virtual Reality Challenge)", href: "https://ivrc.net" },
                        { text: "IVRC HISTORY ARCHIVE", href: "https://ivrc.net/archive/%e8%80%b3%e7%a0%94%e6%be%84%e8%a3%85%e7%bd%ae%e8%a3%bd%e9%80%a0%e5%b7%a5%e5%a0%b42024/" }
                    ])
                ),
                sec("メンバー",
                    p("城戸双汰朗/佐野風史/鶴目佳蓮")
                )
            ]
        },
        {
            slug: "ivrc2024-seed",
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
                    p("誰もが一度は海や川、プールなどで水中に潜り、水中と陸上との音の乖離を経験したことがあるのではないだろうか。それは、音が、空気よりも密度の高い水を伝達することで、陸上の全ての音が遠くに聞こえ、普段とは異なる音の聞こえ方になるためである。"),
                    p("　　　"),
                    p("本作品では、アクティブノイズキャンセリング（ANC）イヤフォンを使い、実際には存在しない「水中」を体験させます。ANCは本来、周囲の騒音を打ち消すために使われますが、この作品ではON/OFFを切り替えることで、水中と陸上の聞こえ方の違いを再現します。"),
                    p("　　　"),
                    p("空間の中でしゃがむと音が遠のき、立ち上がると鮮明に聞こえる。水の音を流していなくても、ノイズキャンセリングによる静寂がまるで鼓膜にかかる水圧のように感じられます。まるで水中に潜ったかのような感覚を立ち上げ、現実には存在しない水中世界へと体験者を導きます。"),

                ),
                sec("システム",
                    youtube("https://youtu.be/S_l2gkAJwa4"),
                ),
                sec("表彰",
                    p("LEAPSTAGE選出"),
                    p("ヤマハ株式会社賞"),
                    p("CRI・ミドルウェア賞")
                ),
                sec("メンバー",
                    p("城戸双汰朗/佐野風史/鶴目佳蓮")
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
            slug: "ui",
            title: "NxPC.Lab vol.69",
            year: "2024",
            tags: ["WEB", "実装"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1w0sE5A-m7ezZz0k5iqcT1qayjJ_Snwif/view?usp=drive_link"),
            summary: "",
            period: "2024",
            body: [
                // ここから画像専用
                sec("",
                    img("https://drive.google.com/file/d/1w0sE5A-m7ezZz0k5iqcT1qayjJ_Snwif/view?usp=drive_link", "画像", "16/9")
                ),
                sec("概要",
                    p("NxPC.Lab （新次元多層メディア的クラブ体験研究室）のライブvol.69のウェブサイトの実装を担当しました。"),
                ),
                sec("ウェブサイト",
                    ul([
                        { text: "NxPCLive vol.69", href: "https://nxpclab.info/vol.69/" },
                        { text: "NxPCLab", href: "https://nxpclab.info" }
                    ])
                ),
                sec("共同制作者",
                    p("京谷 りょうた")
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
                    p("本研究は、モバイル型入出力装置を用いた新しいムービングライトとのインタラクション体験を提案し、操作の直感性・容易性とコンテンツの汎用性を両立したシステムを実現を試みた。実証実験で高いエンターテインメント性と操作性が評価され、今後の応用可能性が示唆された。"),
                    p("　　　"),
                    p("※映像は、実証実験の一環として熊本県人吉市鍛冶屋町で開催された「妖怪祭り」で撮影されたものです。")
                ),
                sec("背景/問題意識",
                    p("ムービングライトはライブステージや大型施設で光の演出に広く用いられているが、インタラクション性のある作品としても仕様事例があった。しかし、従来の事例では以下の課題が見受けられた。"),
                    p("　　　"),
                    p("・ユーザ層が限定的（特定の年齢層に限られがち）"),
                    p("・操作が難しいため、初心者や子どもには体験しづらい"),
                    p("・ゲームフローが欠如しており、継続的な体験設計が弱い"),
                    p("　　　"),
                    p("本研究では、UIの改善、ゲームフローの導入、システムのコンパクト化によって、操作の容易性と汎用性を高めることを目指した。"),
                ),
                sec("目的",
                    p("誰でも直感的に楽しめる汎用的で容易なインタラクションシステムを構築し、ムービングライトを使った体験を多様な場面・ユーザ層に拡張することです。これにより、従来よりも広い対象に向けた新しいエンターテイメント体験を実現すること。"),
                ),
                sec("システム",
                    youtube("https://youtu.be/OY4mEmUbKzo")
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
            title: "観察力と表現力の向上を目的としたKinectによる動物動作のものまねシステム",
            year: "2022",
            tags: ["作品", "研究"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1QpBfbi2wXTeEryYJMxZ3IFtnshFIrocD/view?usp=sharing"),
            summary: "",
            body: [
                // ここから画像専用
                sec("",
                    img("https://drive.google.com/file/d/1QpBfbi2wXTeEryYJMxZ3IFtnshFIrocD/view?usp=sharing"),
                ),
                sec("概要",
                    p("すみません！準備中です💦"),

                ),
                sec("目的",
                    p("すみません！準備中です💦"),
                ),
                sec("論文",
                    ul([
                        { text: "観察力と表現力の向上を目的としたKinectによる動物動作のものまねシステム...", href: "https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202302244734543912" }
                    ])
                )
            ]
        }
    ];

    // ===== Cooperation / More =====
    window.worksMore = [
        {
            slug: "pantagurahu",
            title: "パンタグラフ 美術ワークショップ 「光の雨アニメーション」",
            year: "2025",
            tags: ["撮影","動画編集"],
            cover:
                toDriveDirectLink("https://drive.google.com/file/d/1Mjg4a9EYKcwRjoIRxhyQcvsL90OL0f2F/view?usp=sharing"),
            summary: "",
            period: "2025",
            body: [
                // ここから画像専用
                sec("",
                    youtube("https://www.youtube.com/watch?v=YrRA9ISHKZ8", "", "16/9"),
                ),
                sec("概要",
                    p("準備中です💦"),
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
