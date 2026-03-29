import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'html-css',
  name: 'HTML/CSS',
  nameJa: 'HTML/CSS',
  simpleIconSlug: 'html5',
  color: '#E34F26',
  description: 'Webページの構造とデザインの基礎。すべてのWeb開発者に必須のスキルです。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'はじめてのHTML — 見出しと段落',
      difficulty: 'beginner',
      description:
        'HTML (HyperText Markup Language) はWebページの「骨格」を作る言語です。タグ (< >) で要素を囲み、文書の構造を定義します。<h1>〜<h6> は見出し（h1が最大）、<p> は段落を表します。すべてのHTMLドキュメントは <!DOCTYPE html> 宣言から始まり、<html>, <head>, <body> の3層構造を持ちます。ブラウザはHTMLを上から下へ解釈して画面にレンダリングします。HTMLは1993年にティム・バーナーズ＝リーによって公開され、現在のHTML5は2014年にW3Cが勧告しました。',
      task: '<h1> タグで「Hello HTML」、<p> タグで「HTMLは Web の基礎です。」と表示してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>Lesson 1</title>\n</head>\n<body>\n  <!-- h1 タグで見出しを追加 -->\n\n  <!-- p タグで段落を追加 -->\n\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>Lesson 1</title>\n</head>\n<body>\n  <h1>Hello HTML</h1>\n  <p>HTMLは Web の基礎です。</p>\n</body>\n</html>',
      expectedOutput: 'Hello HTML\nHTMLは Web の基礎です。',
      hints: [
        '<h1>テキスト</h1> で見出しを作ります',
        '<p>テキスト</p> で段落を作ります',
        'タグは必ず開始タグと終了タグをセットで書きます',
        '<!DOCTYPE html> はHTML5文書であることを宣言します',
      ],
      explanation:
        'HTMLの要素は開始タグ <tag>、コンテンツ、終了タグ </tag> の3部分で構成されます。<h1>〜<h6> は見出しレベルを表し、SEO（検索エンジン最適化）においても重要です。1ページに <h1> は1つが推奨されます。<p> は段落（paragraph）を表すブロック要素で、前後に自動的にマージンが入ります。HTMLは「構造」を、CSSは「見た目」を、JavaScriptは「動作」を担当するというWeb開発の三本柱の考え方を覚えておきましょう。',
    },
    {
      id: 2,
      title: 'テキスト装飾タグ',
      difficulty: 'beginner',
      description:
        'HTMLにはテキストを装飾・強調するためのインライン要素があります。<strong> は重要なテキスト（太字）、<em> は強調（イタリック）、<br> は改行、<hr> は水平線を表します。<b> と <strong> は見た目が似ていますが、<strong> は意味的に「重要」であることを示すセマンティック要素です。スクリーンリーダー等のアクセシビリティツールは <strong> を特別に扱います。<mark> はハイライト、<del> は取り消し線、<sub>/<sup> は下付き/上付き文字を表現できます。',
      task: '<strong> で「重要」、<em> で「強調」という文字を含む文を書き、その間に <br> で改行を入れてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 2</title></head>\n<body>\n  <p>\n    <!-- strong タグで重要テキスト -->\n    <!-- br タグで改行 -->\n    <!-- em タグで強調テキスト -->\n  </p>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 2</title></head>\n<body>\n  <p>\n    これは<strong>重要</strong>な情報です。<br>\n    こちらは<em>強調</em>したい部分です。\n  </p>\n</body>\n</html>',
      expectedOutput: 'これは重要な情報です。\nこちらは強調したい部分です。',
      hints: [
        '<strong>テキスト</strong> で太字（重要）',
        '<em>テキスト</em> でイタリック（強調）',
        '<br> は閉じタグ不要の空要素です',
        '<strong> は意味的な重要性、<b> は見た目だけの太字です',
      ],
      explanation:
        'HTMLのテキスト装飾タグはセマンティクス（意味）とプレゼンテーション（見た目）の2種類に分かれます。セマンティック: <strong>(重要), <em>(強調), <mark>(ハイライト), <cite>(引用元)。プレゼンテーション: <b>(太字), <i>(斜体), <u>(下線)。アクセシビリティとSEOの観点から、セマンティックタグの使用が推奨されます。<br> と <hr> は閉じタグが不要な「空要素（void element）」です。XHTML では <br /> のように自己閉じタグにしますが、HTML5では <br> で十分です。',
    },
    {
      id: 3,
      title: 'リスト — 箇条書きと番号付きリスト',
      difficulty: 'beginner',
      description:
        '<ul>（unordered list）は順序なしリスト（箇条書き）、<ol>（ordered list）は順序付きリストを作ります。各項目は <li>（list item）タグで囲みます。リストはネスト（入れ子）にすることも可能です。<ol> には type 属性（"1","a","A","i","I"）で番号の種類を、start 属性で開始番号を指定できます。<dl>（定義リスト）は <dt>（用語）と <dd>（定義）のペアで辞書的な表現にも使えます。ナビゲーションメニューも <ul> + <li> で構築するのがセマンティックに正しい方法です。',
      task: '<ul> で「HTML」「CSS」「JavaScript」の箇条書きリストを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 3</title></head>\n<body>\n  <h2>Web技術一覧</h2>\n  <!-- ul と li でリストを作成 -->\n\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 3</title></head>\n<body>\n  <h2>Web技術一覧</h2>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n  </ul>\n</body>\n</html>',
      expectedOutput: 'Web技術一覧\n・HTML\n・CSS\n・JavaScript',
      hints: [
        '<ul> の中に <li>項目</li> を並べます',
        '<ol> に変えると番号付きリストになります',
        'リストの中にリストを入れるとネスト(入れ子)になります',
        '<dl><dt>用語</dt><dd>定義</dd></dl> で定義リストが作れます',
      ],
      explanation:
        'リスト要素はWebページで頻繁に使われる基本構造です。ナビゲーションメニューは <nav><ul><li><a>...</a></li></ul></nav> の構造が標準的です。CSSの list-style-type でマーカーの種類（disc, circle, square, decimal 等）を変更でき、list-style: none; でマーカーを非表示にできます。<ol> は reversed 属性で逆順にもできます。アクセシビリティ上、リスト構造を使うことでスクリーンリーダーが「3項目のリスト」と読み上げてくれます。',
    },
    {
      id: 4,
      title: 'リンクと画像',
      difficulty: 'beginner',
      description:
        '<a>（anchor）タグはハイパーリンクを作成し、href 属性でリンク先URLを指定します。target="_blank" で新しいタブで開けます。<img> タグは画像を埋め込む空要素で、src 属性に画像パス、alt 属性に代替テキストを指定します。alt 属性は画像が表示できない場合やスクリーンリーダーで読み上げられるため、アクセシビリティ上必須です。相対パス（./images/photo.jpg）と絶対パス（https://example.com/photo.jpg）の違いも理解しておきましょう。',
      task: '<a> で「Google」へのリンクと、<img> で任意の画像（alt属性付き）を表示してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 4</title></head>\n<body>\n  <!-- a タグでリンク -->\n\n  <!-- img タグで画像（alt属性必須） -->\n\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 4</title></head>\n<body>\n  <a href="https://www.google.com" target="_blank">Google</a>\n  <img src="https://via.placeholder.com/150" alt="サンプル画像">\n</body>\n</html>',
      expectedOutput: 'Google (リンク)\n[サンプル画像]',
      hints: [
        '<a href="URL">テキスト</a> でリンクを作ります',
        'target="_blank" で新しいタブで開きます',
        '<img src="画像パス" alt="説明"> で画像を埋め込みます',
        'alt 属性はアクセシビリティとSEOに重要です',
      ],
      explanation:
        '<a> タグの href にはURL、メールアドレス（mailto:）、電話番号（tel:）、ページ内リンク（#id）が指定できます。target="_blank" を使う場合、セキュリティ上 rel="noopener noreferrer" を付けることが推奨されます（window.opener を悪用したフィッシング攻撃を防止）。<img> の alt 属性は空にしても良いですが（装飾画像の場合 alt=""）、省略は不可です。loading="lazy" 属性で遅延読み込みを有効にすると、ページの初期読み込み速度が向上します。width/height 属性を指定するとCLS（Cumulative Layout Shift）を防げます。',
    },
    {
      id: 5,
      title: 'テーブル（表）',
      difficulty: 'beginner',
      description:
        '<table> タグで表を作成します。<tr>（table row）で行、<th>（table header）で見出しセル、<td>（table data）でデータセルを定義します。<thead>, <tbody>, <tfoot> でテーブルの論理的なセクションを分けると、アクセシビリティが向上し、CSSでのスタイリングも容易になります。colspan 属性でセルを横方向に結合、rowspan 属性で縦方向に結合できます。かつてはテーブルをレイアウトに使用していましたが、現在はFlexboxやGridを使うのが標準です。',
      task: '名前・年齢・職業の3列、2人分のデータを持つテーブルを作成してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 5</title></head>\n<body>\n  <table>\n    <thead>\n      <tr>\n        <!-- th でヘッダーセルを3つ -->\n      </tr>\n    </thead>\n    <tbody>\n      <!-- tr と td でデータ行を2つ -->\n    </tbody>\n  </table>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 5</title></head>\n<body>\n  <table>\n    <thead>\n      <tr>\n        <th>名前</th>\n        <th>年齢</th>\n        <th>職業</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>田中</td>\n        <td>28</td>\n        <td>エンジニア</td>\n      </tr>\n      <tr>\n        <td>鈴木</td>\n        <td>35</td>\n        <td>デザイナー</td>\n      </tr>\n    </tbody>\n  </table>\n</body>\n</html>',
      expectedOutput: '名前 | 年齢 | 職業\n田中 | 28   | エンジニア\n鈴木 | 35   | デザイナー',
      hints: [
        '<tr> の中に <th> や <td> を並べます',
        '<th> は見出し、<td> はデータセルです',
        '<thead> と <tbody> でセクション分けしましょう',
        'colspan="2" でセルを2列分結合できます',
      ],
      explanation:
        'テーブルの構造: <table> > <thead>/<tbody>/<tfoot> > <tr> > <th>/<td>。<th> には scope 属性（"col" or "row"）を付けるとスクリーンリーダーがどの見出しに対応するデータかを正しく読み上げます。CSSでは border-collapse: collapse; で枠線を重ねて表示、nth-child(even) でゼブラストライプ（交互背景色）にするのが一般的です。<caption> タグでテーブルのタイトルを付けられます。データテーブルのスタイリングにはCSSのみを使い、style属性のインライン記述は避けましょう。',
    },
    {
      id: 6,
      title: 'フォーム入力 — input と button',
      difficulty: 'beginner',
      description:
        '<form> タグはユーザー入力を受け付ける領域を定義します。<input> は汎用的な入力要素で、type 属性で種類（text, email, password, number, checkbox, radio 等）を切り替えます。<label> タグを <input> に紐付けることで、アクセシビリティが向上します（for 属性と id を一致させる）。<button type="submit"> で送信ボタンを作ります。HTML5では required, pattern, min, max 等のバリデーション属性が追加され、JavaScript なしで基本的な入力チェックが可能になりました。',
      task: '名前（テキスト）とメールアドレスの入力欄と送信ボタンを持つフォームを作成してください。各入力には <label> を付けてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 6</title></head>\n<body>\n  <form>\n    <!-- label + input (text) で名前 -->\n\n    <!-- label + input (email) でメール -->\n\n    <!-- 送信ボタン -->\n\n  </form>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 6</title></head>\n<body>\n  <form>\n    <label for="name">名前:</label>\n    <input type="text" id="name" name="name" required>\n    <br>\n    <label for="email">メール:</label>\n    <input type="email" id="email" name="email" required>\n    <br>\n    <button type="submit">送信</button>\n  </form>\n</body>\n</html>',
      expectedOutput: '名前: [入力欄]\nメール: [入力欄]\n[送信ボタン]',
      hints: [
        '<label for="id名"> で入力欄と紐付けます',
        '<input type="email"> でメール形式をチェックできます',
        'required 属性で必須入力にできます',
        'name 属性はサーバーへのデータ送信時のキー名になります',
      ],
      explanation:
        'フォーム要素まとめ: <input type="text/email/password/number/date/file/checkbox/radio/range/color">、<textarea>(複数行テキスト)、<select><option>(ドロップダウン)。<label> の for 属性と <input> の id を一致させると、ラベルクリックでフォーカスが移動し、UXとアクセシビリティが向上します。HTML5のバリデーション属性: required(必須), pattern(正規表現), minlength/maxlength(文字数), min/max(数値範囲), step(刻み)。<form> の action 属性で送信先URL、method 属性で HTTP メソッド(GET/POST)を指定します。',
    },
    {
      id: 7,
      title: 'セマンティックHTML',
      difficulty: 'beginner',
      description:
        'セマンティック（意味的）HTMLタグは、ページの構造に意味を与えます。<header>(ヘッダー)、<nav>(ナビゲーション)、<main>(メインコンテンツ)、<article>(独立した記事)、<section>(セクション)、<aside>(サイドバー)、<footer>(フッター)。これらは <div> の代わりに使うことで、SEO向上、アクセシビリティ向上、コードの可読性向上の3つのメリットがあります。スクリーンリーダーはセマンティックタグを活用してページの構造をユーザーに伝えます。',
      task: '<header>, <nav>, <main>, <footer> を使ってページの基本構造を作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 7</title></head>\n<body>\n  <!-- header: サイトタイトル -->\n\n  <!-- nav: ナビゲーション -->\n\n  <!-- main: メインコンテンツ -->\n\n  <!-- footer: フッター -->\n\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head><meta charset="UTF-8"><title>Lesson 7</title></head>\n<body>\n  <header>\n    <h1>My Website</h1>\n  </header>\n  <nav>\n    <ul>\n      <li><a href="/">ホーム</a></li>\n      <li><a href="/about">概要</a></li>\n    </ul>\n  </nav>\n  <main>\n    <article>\n      <h2>記事タイトル</h2>\n      <p>記事の内容です。</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2024 My Website</p>\n  </footer>\n</body>\n</html>',
      expectedOutput: 'My Website\nホーム | 概要\n記事タイトル\n記事の内容です。\n© 2024 My Website',
      hints: [
        '<header> にはサイトのロゴやタイトルを配置',
        '<nav> にはナビゲーションリンクを配置',
        '<main> はページのメインコンテンツ（1ページに1つ）',
        '<footer> にはコピーライトや連絡先を配置',
      ],
      explanation:
        'セマンティックHTML5タグの使い分け: <header> はページやセクションの導入部。<nav> は主要なナビゲーションリンク。<main> はページの中心コンテンツ（1ページに1つだけ）。<article> は独立した記事コンテンツ（ブログ記事、ニュース等）。<section> はテーマ別のセクション分け。<aside> はサイドバーや補足情報。<footer> はフッター情報。divitis（div の乱用）を避け、適切なセマンティックタグを使うことで、機械（検索エンジン、支援技術）がページの構造を理解しやすくなります。WAI-ARIA の landmark role が暗黙的に付与されます。',
    },
    {
      id: 8,
      title: 'CSSの基礎 — セレクタとプロパティ',
      difficulty: 'beginner',
      description:
        'CSS (Cascading Style Sheets) はHTMLの「見た目」を制御する言語です。セレクタ { プロパティ: 値; } の形式で記述します。要素セレクタ(h1)、クラスセレクタ(.class)、IDセレクタ(#id) の3つが基本です。CSSの適用方法は3つ: インライン(style属性)、内部(<style>タグ)、外部(別ファイル.css)。外部ファイルが推奨されます。セレクタの詳細度(specificity)で競合時の優先順位が決まります: インライン > ID > クラス > 要素。',
      task: '<style> タグ内でh1の色を赤に、.highlight クラスの背景を黄色にしてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<title>Lesson 8</title>\n<style>\n  /* h1 の色を赤 (#e74c3c) に */\n\n  /* .highlight の背景を黄色 (#f1c40f) に */\n\n</style>\n</head>\n<body>\n  <h1>CSSの基礎</h1>\n  <p class="highlight">この行はハイライトされます。</p>\n  <p>この行は通常の段落です。</p>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<title>Lesson 8</title>\n<style>\n  h1 {\n    color: #e74c3c;\n  }\n  .highlight {\n    background-color: #f1c40f;\n  }\n</style>\n</head>\n<body>\n  <h1>CSSの基礎</h1>\n  <p class="highlight">この行はハイライトされます。</p>\n  <p>この行は通常の段落です。</p>\n</body>\n</html>',
      expectedOutput: '[赤色] CSSの基礎\n[黄色背景] この行はハイライトされます。\nこの行は通常の段落です。',
      hints: [
        '要素名 { プロパティ: 値; } で要素を選択',
        '.クラス名 { } でクラスセレクタ',
        'color はテキスト色、background-color は背景色',
        '色はカラーコード (#e74c3c)、色名 (red)、rgb() で指定可能',
      ],
      explanation:
        'CSSセレクタの詳細度(specificity)計算: !important > インラインstyle(1000) > ID(100) > クラス/属性/擬似クラス(10) > 要素/擬似要素(1)。複合セレクタ: div.card(div要素かつcardクラス)、.card p(カード内のp)、.card > p(直接の子のp)、.card + p(隣接兄弟)、.card ~ p(一般兄弟)。CSSをHTMLとは別ファイル(.css)にし、<link rel="stylesheet" href="style.css"> で読み込むのがベストプラクティスです。これにより関心の分離、キャッシュ効率、保守性が向上します。',
    },
    {
      id: 9,
      title: 'ボックスモデル',
      difficulty: 'beginner',
      description:
        'すべてのHTML要素は「ボックス」で表現されます。ボックスは4層構造: content（内容）→ padding（内余白）→ border（境界線）→ margin（外余白）。デフォルトでは width/height は content のサイズを指定しますが、box-sizing: border-box; を設定すると padding と border を含んだサイズになり、レイアウトが予測しやすくなります。margin は隣接要素間で「相殺（margin collapsing）」が発生し、大きい方のマージンが適用されます。これはCSSの重要な特性の一つです。',
      task: 'box-sizing: border-box を使い、width: 300px, padding: 20px, border: 2px solid のボックスを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  * {\n    box-sizing: border-box;\n  }\n  .box {\n    /* 幅300px, パディング20px, ボーダー2px */\n\n    background-color: #ecf0f1;\n  }\n</style>\n</head>\n<body>\n  <div class="box">ボックスモデルの例</div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  * {\n    box-sizing: border-box;\n  }\n  .box {\n    width: 300px;\n    padding: 20px;\n    border: 2px solid #333;\n    margin: 10px;\n    background-color: #ecf0f1;\n  }\n</style>\n</head>\n<body>\n  <div class="box">ボックスモデルの例</div>\n</body>\n</html>',
      expectedOutput: '[300px幅ボックス] ボックスモデルの例',
      hints: [
        'box-sizing: border-box; で padding と border を幅に含める',
        'padding: 20px; で上下左右に20pxの内余白',
        'border: 太さ 種類 色; の短縮記法で指定',
        'margin は外側の余白で、隣接要素との間隔を作ります',
      ],
      explanation:
        'ボックスモデルの計算: content-box(デフォルト)では 実際の幅 = width + padding*2 + border*2。border-box では 実際の幅 = width（padding と border を含む）。* { box-sizing: border-box; } をリセットCSSに含めるのが現代的なベストプラクティスです。padding の短縮記法: padding: 10px(全方向), padding: 10px 20px(上下 左右), padding: 10px 20px 30px(上 左右 下), padding: 10px 20px 30px 40px(上 右 下 左=時計回り)。margin: 0 auto; は要素の水平中央寄せのテクニックです。',
    },
    {
      id: 10,
      title: 'display プロパティ',
      difficulty: 'beginner',
      description:
        'display プロパティは要素の表示形式を制御します。block（ブロック: 横幅いっぱい、改行あり）、inline（インライン: 内容分の幅、改行なし）、inline-block（インラインだが幅と高さを指定可能）、none（非表示）が基本値です。HTML要素にはデフォルトの display 値があり、<div>, <p>, <h1> は block、<span>, <a>, <strong> は inline です。visibility: hidden は非表示にしますがスペースを占有し、display: none はスペースもなくなる点が異なります。',
      task: 'inline-block を使って、3つのボックスを横並びに表示してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .item {\n    /* inline-block で横並び */\n    width: 100px;\n    height: 100px;\n    margin: 5px;\n    text-align: center;\n    line-height: 100px;\n    color: white;\n  }\n  .red { background: #e74c3c; }\n  .blue { background: #3498db; }\n  .green { background: #2ecc71; }\n</style>\n</head>\n<body>\n  <div class="item red">1</div>\n  <div class="item blue">2</div>\n  <div class="item green">3</div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .item {\n    display: inline-block;\n    width: 100px;\n    height: 100px;\n    margin: 5px;\n    text-align: center;\n    line-height: 100px;\n    color: white;\n  }\n  .red { background: #e74c3c; }\n  .blue { background: #3498db; }\n  .green { background: #2ecc71; }\n</style>\n</head>\n<body>\n  <div class="item red">1</div>\n  <div class="item blue">2</div>\n  <div class="item green">3</div>\n</body>\n</html>',
      expectedOutput: '[赤1] [青2] [緑3] ← 横並び',
      hints: [
        'display: inline-block; で横並びかつ幅・高さ指定可能',
        'line-height を height と同じにすると垂直中央配置',
        'block 要素は width: 100% で改行される',
        'Flexbox や Grid の方が現代的なレイアウト手法です',
      ],
      explanation:
        'display 値の比較: block は幅いっぱいに広がり前後に改行。inline はコンテンツ幅で改行なし、width/height/margin-top/bottom が効かない。inline-block はインライン配置でサイズ指定可能。現代のレイアウトでは Flexbox (display: flex) や CSS Grid (display: grid) が主流で、inline-block は単純な横並び程度に使います。display: contents は要素自体を消し子要素をそのまま表示する特殊な値です。display: flow-root は BFC（Block Formatting Context）を作り float のクリアに使えます。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: 'Flexbox レイアウト',
      difficulty: 'intermediate',
      description:
        'Flexbox（Flexible Box Layout）は1次元レイアウトの強力なツールです。親要素に display: flex を指定するだけで、子要素が柔軟に配置されます。主軸(main axis)方向を flex-direction で、主軸上の配置を justify-content で、交差軸上の配置を align-items で制御します。flex-wrap: wrap で折り返しが可能で、flex-grow / flex-shrink / flex-basis で子要素の伸縮比率を細かく調整できます。ナビゲーション、カードレイアウト、中央寄せなど、多くのUI パターンに対応できます。',
      task: 'Flexbox で3つのカードを横並びにし、justify-content: space-between で均等配置してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .container {\n    /* Flexbox で横並び、均等配置 */\n\n    gap: 16px;\n  }\n  .card {\n    flex: 1;\n    padding: 20px;\n    background: #f8f9fa;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    text-align: center;\n  }\n</style>\n</head>\n<body>\n  <div class="container">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .container {\n    display: flex;\n    justify-content: space-between;\n    gap: 16px;\n  }\n  .card {\n    flex: 1;\n    padding: 20px;\n    background: #f8f9fa;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    text-align: center;\n  }\n</style>\n</head>\n<body>\n  <div class="container">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[Card 1]    [Card 2]    [Card 3]',
      hints: [
        'display: flex; を親要素に指定',
        'justify-content: space-between で左右に余白を分散',
        'flex: 1 は子要素を均等幅に伸縮',
        'gap: 16px; でアイテム間のスペースを指定（marginの代替）',
      ],
      explanation:
        'Flexbox の主要プロパティ:\n【コンテナ(親)】display: flex, flex-direction(row/column), flex-wrap(nowrap/wrap), justify-content(flex-start/center/space-between/space-around/space-evenly), align-items(stretch/center/flex-start/flex-end), gap\n【アイテム(子)】flex-grow(伸びる比率), flex-shrink(縮む比率), flex-basis(初期サイズ), align-self(個別の交差軸配置), order(表示順序)\nflex: 1 は flex: 1 1 0% の短縮形で「均等に伸びる」を意味します。完全中央寄せ: display:flex; justify-content:center; align-items:center; のパターンは頻出です。',
    },
    {
      id: 12,
      title: 'CSS Grid レイアウト',
      difficulty: 'intermediate',
      description:
        'CSS Grid は2次元レイアウト（行と列の同時制御）が可能な強力なシステムです。display: grid を親に設定し、grid-template-columns / grid-template-rows でグリッドの構造を定義します。fr 単位は利用可能なスペースの「割合」を指定でき、repeat() 関数で繰り返しパターンを簡潔に書けます。grid-column / grid-row でアイテムの配置を細かく制御でき、grid-template-areas で名前付きエリアを使った直感的なレイアウトも可能です。Flexbox が1次元なら Grid は2次元のレイアウトに適しています。',
      task: 'CSS Grid でヘッダー・サイドバー・メイン・フッターの4エリアレイアウトを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .layout {\n    display: grid;\n    /* グリッドテンプレートエリアを定義 */\n\n    gap: 10px;\n    min-height: 300px;\n  }\n  .header  { grid-area: header;  background: #3498db; padding: 10px; color: white; }\n  .sidebar { grid-area: sidebar; background: #2ecc71; padding: 10px; }\n  .main    { grid-area: main;    background: #ecf0f1; padding: 10px; }\n  .footer  { grid-area: footer;  background: #95a5a6; padding: 10px; color: white; }\n</style>\n</head>\n<body>\n  <div class="layout">\n    <div class="header">Header</div>\n    <div class="sidebar">Sidebar</div>\n    <div class="main">Main Content</div>\n    <div class="footer">Footer</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .layout {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    grid-template-rows: auto 1fr auto;\n    grid-template-areas:\n      "header  header"\n      "sidebar main"\n      "footer  footer";\n    gap: 10px;\n    min-height: 300px;\n  }\n  .header  { grid-area: header;  background: #3498db; padding: 10px; color: white; }\n  .sidebar { grid-area: sidebar; background: #2ecc71; padding: 10px; }\n  .main    { grid-area: main;    background: #ecf0f1; padding: 10px; }\n  .footer  { grid-area: footer;  background: #95a5a6; padding: 10px; color: white; }\n</style>\n</head>\n<body>\n  <div class="layout">\n    <div class="header">Header</div>\n    <div class="sidebar">Sidebar</div>\n    <div class="main">Main Content</div>\n    <div class="footer">Footer</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[Header                    ]\n[Sidebar] [Main Content    ]\n[Footer                    ]',
      hints: [
        'grid-template-areas で名前付きエリアを定義',
        'grid-area: header; で子要素をエリアに配置',
        '1fr は残りの空間を埋める可変単位',
        'grid-template-columns: 200px 1fr; でサイドバー＋メイン',
      ],
      explanation:
        'CSS Grid の核心的プロパティ:\n【コンテナ】grid-template-columns/rows(トラックサイズ), grid-template-areas(名前付き配置), gap, justify-items/align-items(セル内配置), grid-auto-rows(暗黙的行のサイズ)\n【アイテム】grid-column: 1 / 3(列1から3まで), grid-row: span 2(2行分), grid-area\n便利なパターン: repeat(3, 1fr) で3等分、repeat(auto-fill, minmax(250px, 1fr)) でレスポンシブカードグリッド、minmax(200px, 300px) で最小/最大サイズ指定。Flexbox は1軸配列向き、Grid は2軸レイアウト向きと使い分けましょう。',
    },
    {
      id: 13,
      title: 'レスポンシブデザイン — メディアクエリ',
      difficulty: 'intermediate',
      description:
        'レスポンシブデザインは画面サイズに応じてレイアウトを調整する手法です。@media クエリでブレークポイントを設定し、スマホ・タブレット・PCそれぞれに適したスタイルを適用します。<meta name="viewport"> タグが必須で、width=device-width でデバイス幅に合わせます。モバイルファーストアプローチ（小さい画面のスタイルを基本に、min-width で大画面を上書き）が推奨されます。一般的なブレークポイント: 480px(モバイル)、768px(タブレット)、1024px(デスクトップ)。',
      task: '@media クエリで、768px 未満の画面幅ではカードを縦並びに変更してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<style>\n  .cards {\n    display: flex;\n    gap: 16px;\n  }\n  .card {\n    flex: 1;\n    padding: 20px;\n    background: #f0f0f0;\n    border-radius: 8px;\n  }\n  /* 768px 未満でカードを縦並びに */\n\n</style>\n</head>\n<body>\n  <div class="cards">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<style>\n  .cards {\n    display: flex;\n    gap: 16px;\n  }\n  .card {\n    flex: 1;\n    padding: 20px;\n    background: #f0f0f0;\n    border-radius: 8px;\n  }\n  @media (max-width: 767px) {\n    .cards {\n      flex-direction: column;\n    }\n  }\n</style>\n</head>\n<body>\n  <div class="cards">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n  </div>\n</body>\n</html>',
      expectedOutput: 'PC: [Card1] [Card2] [Card3]\nモバイル:\n[Card 1]\n[Card 2]\n[Card 3]',
      hints: [
        '@media (max-width: 767px) { } でモバイル向けスタイル',
        'flex-direction: column; で縦並びに切り替え',
        'viewport meta タグがないとスマホで縮小表示される',
        'モバイルファースト: 基本を縦並びにし min-width で横並びにする手法もある',
      ],
      explanation:
        'レスポンシブデザインの3本柱: 1.メディアクエリ(@media) 2.相対単位(%, vw, vh, rem, em) 3.柔軟な画像(max-width: 100%)。モバイルファースト: 基本スタイルはモバイル向け、@media (min-width: 768px) で拡張。@media は画面幅以外にも prefers-color-scheme (ダークモード)、prefers-reduced-motion (アニメーション制御)、print (印刷用) など多様な条件に対応しています。Container Queries (@container) はCSS最新機能で、親コンテナのサイズに基づくレスポンシブ設計が可能になります。',
    },
    {
      id: 14,
      title: 'CSS変数 (カスタムプロパティ)',
      difficulty: 'intermediate',
      description:
        'CSS変数（カスタムプロパティ）は --名前 で定義し var(--名前) で参照します。:root に定義するとグローバル変数になり、テーマカラーの一括管理、ダークモード対応、メディアクエリでの値変更に活用できます。JavaScriptから動的に変更も可能です。フォールバック値 var(--color, #333) も指定でき、未定義時のデフォルトとして機能します。calc() 関数と組み合わせて動的な計算も行えます。Sass等のプリプロセッサ変数と異なり、実行時に値が解決されるランタイム変数です。',
      task: 'CSS変数でメインカラーとサブカラーを定義し、複数の要素で再利用してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    /* CSS変数を定義 */\n\n  }\n  .header {\n    /* メインカラーを背景に */\n    color: white;\n    padding: 16px;\n  }\n  .btn {\n    /* サブカラーを背景に */\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n</style>\n</head>\n<body>\n  <div class="header">Header</div>\n  <button class="btn">Button</button>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    --color-primary: #3498db;\n    --color-secondary: #2ecc71;\n    --spacing: 16px;\n  }\n  .header {\n    background-color: var(--color-primary);\n    color: white;\n    padding: var(--spacing);\n  }\n  .btn {\n    background-color: var(--color-secondary);\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n</style>\n</head>\n<body>\n  <div class="header">Header</div>\n  <button class="btn">Button</button>\n</body>\n</html>',
      expectedOutput: '[青背景] Header\n[緑背景ボタン] Button',
      hints: [
        '--変数名: 値; で定義、var(--変数名) で使用',
        ':root に定義するとページ全体で使える',
        'var(--color, #fallback) でフォールバック値指定',
        'JavaScript で document.documentElement.style.setProperty() で動的変更可能',
      ],
      explanation:
        'CSS変数の活用パターン:\n1. テーマカラー管理: :root { --primary: blue; }\n2. ダークモード: @media (prefers-color-scheme: dark) { :root { --bg: #1a1a2e; } }\n3. コンポーネントスコープ: .card { --card-bg: white; background: var(--card-bg); }\n4. calc() との組合せ: width: calc(100% - var(--sidebar-width));\n5. JSとの連携: el.style.setProperty("--x", mouseX + "px");\nCSS変数はカスケード（継承）するため、子要素で上書きしてスコープを限定できます。Sass変数はコンパイル時に解決されますが、CSS変数はブラウザ実行時に解決される点が大きな違いです。',
    },
    {
      id: 15,
      title: 'トランジションとアニメーション',
      difficulty: 'intermediate',
      description:
        'CSS transition はプロパティの変化を滑らかにし、animation / @keyframes で複雑なアニメーションを定義できます。transition は hover 等のトリガーが必要ですが、animation は自動的に再生できます。transition: プロパティ 時間 イージング関数 遅延; の形式で、ease(デフォルト), ease-in, ease-out, ease-in-out, cubic-bezier() のイージング関数で動きの曲線を調整できます。transform と合わせて使うと GPU アクセラレーションが効くので、スムーズなアニメーションが実現できます。',
      task: 'hover でボタンが拡大し色が変わるトランジションと、ローディングスピナーのアニメーションを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .btn {\n    padding: 12px 24px;\n    background: #3498db;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    /* トランジションを設定 */\n\n  }\n  .btn:hover {\n    /* hover時のスタイル */\n\n  }\n  .spinner {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #eee;\n    border-top: 4px solid #3498db;\n    border-radius: 50%;\n    margin-top: 20px;\n    /* 回転アニメーション */\n\n  }\n  /* @keyframes を定義 */\n\n</style>\n</head>\n<body>\n  <button class="btn">Hover Me</button>\n  <div class="spinner"></div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .btn {\n    padding: 12px 24px;\n    background: #3498db;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n  }\n  .btn:hover {\n    background: #2980b9;\n    transform: scale(1.1);\n    box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n  }\n  .spinner {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #eee;\n    border-top: 4px solid #3498db;\n    border-radius: 50%;\n    margin-top: 20px;\n    animation: spin 1s linear infinite;\n  }\n  @keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n</style>\n</head>\n<body>\n  <button class="btn">Hover Me</button>\n  <div class="spinner"></div>\n</body>\n</html>',
      expectedOutput: '[ボタン: hover で拡大・色変化]\n[スピナー: 回転アニメーション]',
      hints: [
        'transition: all 0.3s ease; でプロパティ変化を滑らかに',
        'transform: scale(1.1) で1.1倍に拡大',
        '@keyframes 名前 { 0% { } 100% { } } でアニメーション定義',
        'animation: 名前 時間 イージング 繰り返し;',
      ],
      explanation:
        'パフォーマンスの良いアニメーション: transform と opacity の変更は「コンポジターレイヤー」で処理されGPUアクセラレーションが効きます。一方、width, height, top, left の変更はレイアウト再計算（リフロー）を引き起こし重くなります。will-change: transform; でブラウザにアニメーション予定を伝えるとさらに最適化されます。Web Animations API (element.animate()) を使うとJSからもアニメーションを宣言的に制御でき、Intersection Observer と組み合わせてスクロール連動アニメーションも実装できます。prefers-reduced-motion メディアクエリでアニメーション無効化への対応も忘れずに。',
    },
    {
      id: 16,
      title: '擬似クラスと擬似要素',
      difficulty: 'intermediate',
      description:
        '擬似クラス(:)は要素の「状態」を、擬似要素(::)は要素の「一部」を選択します。擬似クラス: :hover(マウスオーバー)、:focus(フォーカス)、:first-child、:nth-child()、:not() など。擬似要素: ::before / ::after(要素の前後にコンテンツ追加)、::first-line(最初の行)、::placeholder(プレースホルダー)。content プロパティで擬似要素にコンテンツを挿入でき、装飾やバッジ、ツールチップの実装に活用されます。',
      task: '::before と ::after でリンクの前後にアイコン的な装飾を付け、:nth-child(even) でリストの偶数行に背景色を付けてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .link {\n    text-decoration: none;\n    color: #3498db;\n  }\n  /* ::before と ::after で装飾 */\n\n  .list li {\n    padding: 8px;\n  }\n  /* :nth-child(even) で偶数行に背景 */\n\n</style>\n</head>\n<body>\n  <a href="#" class="link">外部リンク</a>\n  <ul class="list">\n    <li>項目 1</li>\n    <li>項目 2</li>\n    <li>項目 3</li>\n    <li>項目 4</li>\n  </ul>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .link {\n    text-decoration: none;\n    color: #3498db;\n  }\n  .link::before {\n    content: "🔗 ";\n  }\n  .link::after {\n    content: " ↗";\n  }\n  .list li {\n    padding: 8px;\n  }\n  .list li:nth-child(even) {\n    background-color: #f0f0f0;\n  }\n</style>\n</head>\n<body>\n  <a href="#" class="link">外部リンク</a>\n  <ul class="list">\n    <li>項目 1</li>\n    <li>項目 2</li>\n    <li>項目 3</li>\n    <li>項目 4</li>\n  </ul>\n</body>\n</html>',
      expectedOutput: '🔗 外部リンク ↗\n項目 1\n[灰背景] 項目 2\n項目 3\n[灰背景] 項目 4',
      hints: [
        '::before / ::after には content プロパティが必須',
        ':nth-child(even) で偶数番目、:nth-child(odd) で奇数番目',
        ':nth-child(3n) で3の倍数番目を選択',
        ':not(.special) で除外条件を指定',
      ],
      explanation:
        '便利な擬似クラス: :first-child / :last-child (最初/最後の子), :nth-child(an+b) (n番目), :nth-of-type() (同タイプのn番目), :focus-visible (キーボードフォーカスのみ), :empty (空要素), :is() / :where() (セレクタリストの簡略化), :has() (親セレクタ — CSS4最新機能)。::before と ::after は装飾目的に限定し、重要なコンテンツはHTMLに書くべきです。::selection でテキスト選択時のスタイル、::marker でリストマーカーをカスタマイズできます。',
    },
    {
      id: 17,
      title: 'positioning — 要素の配置制御',
      difficulty: 'intermediate',
      description:
        'position プロパティで要素の配置方法を制御します。static(デフォルト: 通常フロー)、relative(自身の元位置からのオフセット)、absolute(最寄りの positioned 祖先からの絶対位置)、fixed(ビューポート基準の固定位置)、sticky(スクロールで固定化)。z-index は位置指定された要素の重なり順序を制御します。スタッキングコンテキスト（重なりの文脈）の理解が重要で、transform や opacity を指定した要素は新しいスタッキングコンテキストを作ります。',
      task: 'fixed でヘッダーを画面上部に固定し、absolute でバッジを右上に配置してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; padding-top: 60px; }\n  .fixed-header {\n    /* 画面上部に固定 */\n    background: #2c3e50;\n    color: white;\n    padding: 16px;\n    width: 100%;\n    z-index: 100;\n  }\n  .card {\n    /* relative で基準に */\n    margin: 20px;\n    padding: 20px;\n    background: #ecf0f1;\n    border-radius: 8px;\n  }\n  .badge {\n    /* absolute で右上に配置 */\n    background: #e74c3c;\n    color: white;\n    padding: 4px 8px;\n    border-radius: 50%;\n    font-size: 12px;\n  }\n</style>\n</head>\n<body>\n  <div class="fixed-header">Fixed Header</div>\n  <div class="card">\n    カードの内容\n    <span class="badge">3</span>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; padding-top: 60px; }\n  .fixed-header {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: #2c3e50;\n    color: white;\n    padding: 16px;\n    width: 100%;\n    z-index: 100;\n  }\n  .card {\n    position: relative;\n    margin: 20px;\n    padding: 20px;\n    background: #ecf0f1;\n    border-radius: 8px;\n  }\n  .badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    background: #e74c3c;\n    color: white;\n    padding: 4px 8px;\n    border-radius: 50%;\n    font-size: 12px;\n  }\n</style>\n</head>\n<body>\n  <div class="fixed-header">Fixed Header</div>\n  <div class="card">\n    カードの内容\n    <span class="badge">3</span>\n  </div>\n</body>\n</html>',
      expectedOutput: '[固定ヘッダー]\n[カード] [バッジ3 (右上)]',
      hints: [
        'position: fixed + top: 0 でヘッダー固定',
        'absolute の基準は最寄りの position: relative 祖先',
        'z-index は positioned 要素にのみ有効',
        'position: sticky; top: 0; でスクロール追従型固定',
      ],
      explanation:
        'position の値: static(通常フロー), relative(自分を基準にオフセット、子の absolute 基準になる), absolute(positioned 祖先を基準), fixed(ビューポート基準、スクロールに追従しない), sticky(スクロール位置で fixed/static 切替)。absolute 要素は「最寄りの position が static でない祖先」を基準にします。なければ <html> が基準。z-index は同じスタッキングコンテキスト内でのみ比較されるため、異なるコンテキスト間では z-index: 9999 でも負けることがあります。inset: 0 は top:0; right:0; bottom:0; left:0 の短縮形です。',
    },
    {
      id: 18,
      title: 'CSSフィルターとブレンドモード',
      difficulty: 'intermediate',
      description:
        'CSS filter プロパティで画像や要素にフィルター効果を適用できます。blur(ぼかし), brightness(明るさ), contrast(コントラスト), grayscale(グレースケール), saturate(彩度), hue-rotate(色相回転), drop-shadow(影) など。backdrop-filter はガラスモーフィズムに使う背景ぼかしです。mix-blend-mode / background-blend-mode で画像の合成モードも変更でき、Photoshop のレイヤーブレンドに似た効果を CSS だけで実現できます。',
      task: 'filter で画像をグレースケールにし、hover でカラーに戻す効果と、backdrop-filter でガラス風パネルを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .image {\n    width: 200px;\n    /* グレースケールフィルター */\n    /* hover でカラーに戻すトランジション */\n  }\n  .image:hover {\n    /* フィルター解除 */\n  }\n  .glass-panel {\n    /* ガラスモーフィズム */\n    padding: 20px;\n    border-radius: 16px;\n    color: white;\n  }\n</style>\n</head>\n<body>\n  <img class="image" src="https://via.placeholder.com/200" alt="Sample">\n  <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px;">\n    <div class="glass-panel">Glass Panel</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .image {\n    width: 200px;\n    filter: grayscale(100%);\n    transition: filter 0.5s ease;\n  }\n  .image:hover {\n    filter: grayscale(0%);\n  }\n  .glass-panel {\n    backdrop-filter: blur(12px);\n    background: rgba(255, 255, 255, 0.15);\n    padding: 20px;\n    border-radius: 16px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    color: white;\n  }\n</style>\n</head>\n<body>\n  <img class="image" src="https://via.placeholder.com/200" alt="Sample">\n  <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px;">\n    <div class="glass-panel">Glass Panel</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[グレー画像 → hoverでカラーに]\n[ガラス風パネル]',
      hints: [
        'filter: grayscale(100%) で完全グレースケール',
        'backdrop-filter: blur(12px) で背景ぼかし',
        'background: rgba(255,255,255,0.15) で半透明背景',
        'filter は複数指定可能: filter: blur(2px) brightness(1.2);',
      ],
      explanation:
        'filter の種類: blur(px), brightness(%), contrast(%), grayscale(%), hue-rotate(deg), invert(%), opacity(%), saturate(%), sepia(%), drop-shadow(x y blur color)。drop-shadow は box-shadow と違い要素の形状に沿った影を付けます（PNG の透過部分を認識）。backdrop-filter はガラスモーフィズム(glassmorphism)の中心技術で、背景をぼかして半透明パネルを作ります。パフォーマンス注意: filter と backdrop-filter はGPUを使用するため、多用するとモバイルでパフォーマンスが落ちる場合があります。@supports (backdrop-filter: blur(1px)) でサポート検出も可能です。',
    },
    {
      id: 19,
      title: 'CSS Nesting と @layer',
      difficulty: 'intermediate',
      description:
        'CSS Nesting は2023年に主要ブラウザに実装された機能で、SassライクなネストをネイティブCSSで書けます。& で親セレクタを参照します。@layer はカスケードレイヤーを定義し、CSSの詳細度(specificity)とは独立した優先順位を設定できます。これにより、フレームワークCSS、ベーススタイル、コンポーネントCSS、ユーティリティCSSの優先順位を明示的に管理でき、!important の乱用を避けられます。',
      task: 'CSS Nesting でカードコンポーネントのスタイルを書き、@layer でベースとコンポーネントの優先順位を定義してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  /* @layer でレイヤー順序を宣言 */\n\n  /* CSS Nesting でカードスタイル */\n  .card {\n    padding: 20px;\n    border-radius: 12px;\n    background: white;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n    /* & でネスト */\n  }\n</style>\n</head>\n<body>\n  <div class="card">\n    <h3 class="card-title">タイトル</h3>\n    <p class="card-body">本文テキスト</p>\n    <button class="card-btn">詳細</button>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  @layer base, components, utilities;\n\n  @layer base {\n    * { margin: 0; box-sizing: border-box; }\n    body { font-family: sans-serif; padding: 20px; background: #f5f5f5; }\n  }\n\n  @layer components {\n    .card {\n      padding: 20px;\n      border-radius: 12px;\n      background: white;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n      max-width: 400px;\n\n      & .card-title {\n        font-size: 1.2rem;\n        color: #2c3e50;\n        margin-bottom: 8px;\n      }\n\n      & .card-body {\n        color: #666;\n        line-height: 1.6;\n        margin-bottom: 16px;\n      }\n\n      & .card-btn {\n        background: #3498db;\n        color: white;\n        border: none;\n        padding: 8px 20px;\n        border-radius: 6px;\n        cursor: pointer;\n\n        &:hover {\n          background: #2980b9;\n        }\n      }\n    }\n  }\n</style>\n</head>\n<body>\n  <div class="card">\n    <h3 class="card-title">タイトル</h3>\n    <p class="card-body">本文テキスト</p>\n    <button class="card-btn">詳細</button>\n  </div>\n</body>\n</html>',
      expectedOutput: '[カード]\nタイトル\n本文テキスト\n[詳細ボタン]',
      hints: [
        '& は親セレクタの参照: .card { & .title { } } = .card .title',
        '@layer base, components, utilities; でレイヤー順を宣言',
        '後に宣言したレイヤーが高優先',
        '&:hover で自分自身の hover 状態',
      ],
      explanation:
        'CSS Nesting: & は親セレクタ。& .child = 子孫、& > .child = 直接の子、&:hover = 自身の状態、&.modifier = 自身に追加クラス。@media も入れ子可能。@layer のカスケード: unlayered CSS > 最後の layer > ... > 最初の layer。つまり ! important なしでは、layerに入っていないCSSが最優先。Tailwind CSS は @layer utilities にユーティリティクラスを配置しています。これらは Sass/PostCSS なしでネイティブCSSだけで利用でき、ビルドステップが不要になる流れを加速しています。',
    },
    {
      id: 20,
      title: 'ダークモード対応',
      difficulty: 'intermediate',
      description:
        'prefers-color-scheme メディアクエリでOSのダークモード設定を検出し、CSS変数で配色を切り替えます。手動切替を JavaScript で実装する場合は、data-theme 属性やクラス切り替えを使います。ダークモードでは背景を暗く、テキストを明るくしますが、純黒 (#000) よりダークグレー (#1a1a2e) の方が目に優しいとされています。画像も filter: brightness(0.8) で明るさを抑えると統一感が出ます。',
      task: 'CSS変数とprefers-color-schemeでライト/ダーク両対応のページを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    /* ライトモードのCSS変数 */\n  }\n  @media (prefers-color-scheme: dark) {\n    :root {\n      /* ダークモードのCSS変数 */\n    }\n  }\n  body {\n    /* CSS変数を使ったスタイル */\n    font-family: sans-serif;\n    padding: 20px;\n    transition: background-color 0.3s, color 0.3s;\n  }\n  .card {\n    padding: 20px;\n    border-radius: 12px;\n    margin-top: 16px;\n  }\n</style>\n</head>\n<body>\n  <h1>ダークモード対応</h1>\n  <div class="card">\n    <p>このページはOSの設定に連動します。</p>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    --bg: #ffffff;\n    --text: #1a1a2e;\n    --card-bg: #f0f0f0;\n    --card-border: #ddd;\n  }\n  @media (prefers-color-scheme: dark) {\n    :root {\n      --bg: #1a1a2e;\n      --text: #e0e0e0;\n      --card-bg: #16213e;\n      --card-border: #334155;\n    }\n  }\n  body {\n    background-color: var(--bg);\n    color: var(--text);\n    font-family: sans-serif;\n    padding: 20px;\n    transition: background-color 0.3s, color 0.3s;\n  }\n  .card {\n    background-color: var(--card-bg);\n    border: 1px solid var(--card-border);\n    padding: 20px;\n    border-radius: 12px;\n    margin-top: 16px;\n  }\n</style>\n</head>\n<body>\n  <h1>ダークモード対応</h1>\n  <div class="card">\n    <p>このページはOSの設定に連動します。</p>\n  </div>\n</body>\n</html>',
      expectedOutput: 'ライト: 白背景 / ダーク: 暗青背景',
      hints: [
        '@media (prefers-color-scheme: dark) でダークモード検出',
        'CSS変数をメディアクエリ内で上書きする',
        'transition でモード切替をスムーズに',
        '純黒 #000 より #1a1a2e の方が読みやすい',
      ],
      explanation:
        'ダークモード実装パターン:\n1. OS連動: @media (prefers-color-scheme: dark) でCSS変数を切替\n2. 手動トグル: html[data-theme="dark"] { --bg: #1a1a2e; } + JSでdata-theme属性を切替\n3. 併用: OS設定をデフォルトにし、手動でオーバーライド可能に\ncolor-scheme: light dark; をmetaタグやCSSに指定すると、フォーム要素やスクロールバーもOSのダークモードに追従します。画像の調整: img { filter: brightness(0.8); } やpictureタグでダーク用画像を用意する方法もあります。localStorage にユーザーの選択を保存してリロード後も維持するのが定番です。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'Container Queries',
      difficulty: 'advanced',
      description:
        'Container Queries（@container）は親コンテナのサイズに基づいてスタイルを変更する CSS の最新機能です。従来の @media がビューポート全体の幅を見ていたのに対し、@container は特定のコンテナ要素の幅を見ます。これにより、同じコンポーネントがサイドバーに置かれた時とメインエリアに置かれた時で自動的にレイアウトが変わる、真のコンポーネント指向レスポンシブデザインが可能になります。container-type: inline-size を親に設定し、@container (min-width: ...) でスタイルを分岐します。',
      task: 'Container Queries でカードコンポーネントがコンテナ幅 400px 以上で横並びレイアウトに切り替わるようにしてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .wide, .narrow {\n    /* container-type を設定 */\n    border: 2px dashed #ccc;\n    padding: 16px;\n    margin: 16px 0;\n  }\n  .wide { width: 600px; }\n  .narrow { width: 300px; }\n  .card {\n    background: #f8f9fa;\n    border-radius: 8px;\n    overflow: hidden;\n  }\n  .card-image { width: 100%; height: 120px; background: #3498db; }\n  .card-content { padding: 16px; }\n  /* @container で横並びに切替 */\n\n</style>\n</head>\n<body>\n  <div class="wide">\n    <div class="card"><div class="card-image"></div><div class="card-content"><h3>Wide</h3><p>広いコンテナ</p></div></div>\n  </div>\n  <div class="narrow">\n    <div class="card"><div class="card-image"></div><div class="card-content"><h3>Narrow</h3><p>狭いコンテナ</p></div></div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .wide, .narrow {\n    container-type: inline-size;\n    border: 2px dashed #ccc;\n    padding: 16px;\n    margin: 16px 0;\n  }\n  .wide { width: 600px; }\n  .narrow { width: 300px; }\n  .card {\n    background: #f8f9fa;\n    border-radius: 8px;\n    overflow: hidden;\n  }\n  .card-image { width: 100%; height: 120px; background: #3498db; }\n  .card-content { padding: 16px; }\n  @container (min-width: 400px) {\n    .card {\n      display: flex;\n    }\n    .card-image {\n      width: 200px;\n      height: auto;\n      min-height: 120px;\n    }\n  }\n</style>\n</head>\n<body>\n  <div class="wide">\n    <div class="card"><div class="card-image"></div><div class="card-content"><h3>Wide</h3><p>広いコンテナ</p></div></div>\n  </div>\n  <div class="narrow">\n    <div class="card"><div class="card-image"></div><div class="card-content"><h3>Narrow</h3><p>狭いコンテナ</p></div></div>\n  </div>\n</body>\n</html>',
      expectedOutput: 'Wide: [画像 | テキスト] 横並び\nNarrow: [画像] [テキスト] 縦並び',
      hints: [
        'container-type: inline-size; を親コンテナに設定',
        '@container (min-width: 400px) { } でコンテナ幅が400px以上の時のスタイル',
        'container-name で名前を付けて特定のコンテナを参照可能',
        '@media はビューポート幅、@container はコンテナ幅を見る',
      ],
      explanation:
        'Container Queries は「コンポーネント指向」のCSS設計を革命的に改善します。@media はページ全体の幅しか見ないため、同じカードでもサイドバーとメインで異なるブレークポイントが必要でした。@container なら配置場所に応じて自動的に最適化されます。container-type: inline-size(幅のみ) / size(幅と高さ) / normal(無効)。container-name: sidebar; + @container sidebar (min-width: 300px) で名前付きコンテナも参照可能。コンテナクエリ単位 cqw(コンテナ幅の1%), cqh(高さの1%) も利用可能です。2023年以降全主要ブラウザ対応済みです。',
    },
    {
      id: 22,
      title: 'CSS Grid 高度なテクニック',
      difficulty: 'advanced',
      description:
        'CSS Grid の高度なテクニック: subgrid（子グリッドが親のトラックラインを継承）、auto-fill / auto-fit + minmax() によるレスポンシブ自動折り返しグリッド、grid-auto-flow: dense による密なパッキング、名前付きライン、repeat(auto-fit, minmax(250px, 1fr)) パターン。subgrid はネストされたGridアイテムの列揃えを容易にし、デザインシステムの実装で非常に有用です。',
      task: 'auto-fit + minmax() でカードが自動的に折り返すレスポンシブグリッドを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .grid {\n    display: grid;\n    /* auto-fit + minmax でレスポンシブグリッド */\n    gap: 16px;\n    padding: 16px;\n  }\n  .card {\n    background: white;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    padding: 20px;\n    text-align: center;\n  }\n</style>\n</head>\n<body>\n  <div class="grid">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n    <div class="card">Card 4</div>\n    <div class="card">Card 5</div>\n    <div class="card">Card 6</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 16px;\n    padding: 16px;\n  }\n  .card {\n    background: white;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    padding: 20px;\n    text-align: center;\n  }\n</style>\n</head>\n<body>\n  <div class="grid">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n    <div class="card">Card 4</div>\n    <div class="card">Card 5</div>\n    <div class="card">Card 6</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '広い画面: [1][2][3]\n         [4][5][6]\n狭い画面: [1][2]\n         [3][4]\n         [5][6]',
      hints: [
        'repeat(auto-fit, minmax(250px, 1fr)) で自動折り返し',
        'auto-fill は空トラックも保持、auto-fit は空トラックを0に縮小',
        'minmax(最小, 最大) でカードの幅範囲を指定',
        '@media なしでレスポンシブが実現できる',
      ],
      explanation:
        'auto-fit vs auto-fill: auto-fill はアイテムが足りない場合も空のトラックを生成（グリッド末にスペースが残る）。auto-fit は空トラックを0frに縮小しアイテムが引き伸ばされる。通常は auto-fit が望ましい。subgrid: grid-template-columns: subgrid; で親グリッドのトラックラインを子が継承。フォーム要素のラベルとインプットの幅揃えに便利。grid-auto-flow: dense; は前方の空きスペースに小さいアイテムを詰め込むパッキングアルゴリズム。Masonry レイアウトも将来的にはCSS Gridだけで可能になる予定です（grid-template-rows: masonry 提案中）。',
    },
    {
      id: 23,
      title: 'アクセシビリティ (a11y)',
      difficulty: 'advanced',
      description:
        'Webアクセシビリティ（a11y = accessibility の a と y の間の11文字）は、障がいのある人を含むすべてのユーザーがWebを利用できるようにする取り組みです。WCAG (Web Content Accessibility Guidelines) が国際標準で、A, AA, AAA の3レベルがあり、多くの法律はAAレベルを要求します。セマンティックHTML、キーボード操作、色のコントラスト比、ARIAロール、スクリーンリーダー対応が主要な領域です。',
      task: 'aria-label、role 属性、キーボードナビゲーションを考慮したアクセシブルなナビゲーションを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .nav { display: flex; gap: 8px; background: #2c3e50; padding: 12px; }\n  .nav-link {\n    color: white;\n    text-decoration: none;\n    padding: 8px 16px;\n    border-radius: 4px;\n  }\n  /* フォーカススタイルを追加 */\n\n  .sr-only {\n    /* スクリーンリーダー専用（視覚的に非表示） */\n  }\n</style>\n</head>\n<body>\n  <!-- アクセシブルなナビゲーション -->\n\n  <main>\n    <h1>アクセシブルなページ</h1>\n  </main>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .nav { display: flex; gap: 8px; background: #2c3e50; padding: 12px; }\n  .nav-link {\n    color: white;\n    text-decoration: none;\n    padding: 8px 16px;\n    border-radius: 4px;\n    transition: background 0.2s;\n  }\n  .nav-link:hover,\n  .nav-link:focus-visible {\n    background: rgba(255,255,255,0.2);\n    outline: 2px solid #3498db;\n    outline-offset: 2px;\n  }\n  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0,0,0,0);\n    white-space: nowrap;\n    border-width: 0;\n  }\n</style>\n</head>\n<body>\n  <a href="#main" class="sr-only">メインコンテンツにスキップ</a>\n  <nav aria-label="メインナビゲーション">\n    <div class="nav" role="menubar">\n      <a href="/" class="nav-link" role="menuitem">ホーム</a>\n      <a href="/about" class="nav-link" role="menuitem">概要</a>\n      <a href="/contact" class="nav-link" role="menuitem">問い合わせ</a>\n    </div>\n  </nav>\n  <main id="main">\n    <h1>アクセシブルなページ</h1>\n  </main>\n</body>\n</html>',
      expectedOutput: '[ナビゲーション: ホーム | 概要 | 問い合わせ]\nアクセシブルなページ',
      hints: [
        'aria-label でナビに名前を付ける',
        ':focus-visible でキーボードフォーカス時のスタイル',
        '.sr-only でスクリーンリーダー専用テキスト',
        'スキップリンクでキーボードユーザーの便宜を図る',
      ],
      explanation:
        'a11y チェックリスト:\n1. セマンティックHTML: div乱用を避け、nav, main, article 等を使用\n2. 色のコントラスト比: テキスト/背景で4.5:1以上（WCAG AA）\n3. キーボード操作: Tab, Enter, Escape で全要素が操作可能\n4. :focus-visible でフォーカスリングを見やすく（outline を消さない）\n5. alt属性: 装飾画像は alt=""、情報画像は適切な説明\n6. ARIA: aria-label, aria-expanded, aria-hidden, role 等\n7. スキップリンク: キーボードユーザーがナビを飛ばしてメインへ\n8. 動的コンテンツ: aria-live="polite" で変更を通知\nLighthouse の Accessibility スコアやaxe DevTools でチェックできます。',
    },
    {
      id: 24,
      title: 'Scroll Snap とスクロール制御',
      difficulty: 'advanced',
      description:
        'CSS Scroll Snap はスクロール位置をスナップポイントに吸着させる機能で、カルーセルやフルページスクロールをJSなしで実装できます。scroll-snap-type でスナップの方向と強制度を指定し、scroll-snap-align で各子要素の吸着位置を定義します。scroll-behavior: smooth でスムーズスクロール、overscroll-behavior でバウンス防止も可能です。scrollbar-gutter でスクロールバー分のレイアウトシフトを防止できます。',
      task: 'Scroll Snap で横にスワイプできるカルーセルを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .carousel {\n    display: flex;\n    overflow-x: auto;\n    /* Scroll Snap 設定 */\n    gap: 16px;\n    padding: 16px;\n  }\n  .slide {\n    min-width: 300px;\n    height: 200px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 24px;\n    font-weight: bold;\n    flex-shrink: 0;\n    /* スナップ位置 */\n  }\n  .slide:nth-child(1) { background: #e74c3c; }\n  .slide:nth-child(2) { background: #3498db; }\n  .slide:nth-child(3) { background: #2ecc71; }\n  .slide:nth-child(4) { background: #f39c12; }\n</style>\n</head>\n<body>\n  <div class="carousel">\n    <div class="slide">Slide 1</div>\n    <div class="slide">Slide 2</div>\n    <div class="slide">Slide 3</div>\n    <div class="slide">Slide 4</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .carousel {\n    display: flex;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n    scroll-behavior: smooth;\n    gap: 16px;\n    padding: 16px;\n    -webkit-overflow-scrolling: touch;\n  }\n  .slide {\n    min-width: 300px;\n    height: 200px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 24px;\n    font-weight: bold;\n    flex-shrink: 0;\n    scroll-snap-align: start;\n  }\n  .slide:nth-child(1) { background: #e74c3c; }\n  .slide:nth-child(2) { background: #3498db; }\n  .slide:nth-child(3) { background: #2ecc71; }\n  .slide:nth-child(4) { background: #f39c12; }\n</style>\n</head>\n<body>\n  <div class="carousel">\n    <div class="slide">Slide 1</div>\n    <div class="slide">Slide 2</div>\n    <div class="slide">Slide 3</div>\n    <div class="slide">Slide 4</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[スライド1] → スクロールでスナップ → [スライド2] → ...',
      hints: [
        'scroll-snap-type: x mandatory; で横方向に強制スナップ',
        'scroll-snap-align: start; で各スライドの先頭にスナップ',
        'scroll-behavior: smooth; でスムーズスクロール',
        '-webkit-overflow-scrolling: touch; でiOSの慣性スクロール',
      ],
      explanation:
        'Scroll Snap プロパティ:\n【コンテナ】scroll-snap-type: x/y/both mandatory/proximity（mandatory=強制スナップ, proximity=近い時のみ）, scroll-padding: 値（スナップ位置のオフセット、固定ヘッダー分ずらす等）\n【子要素】scroll-snap-align: start/center/end, scroll-snap-stop: normal/always\nその他のスクロール系CSS: scroll-behavior: smooth(アンカーリンクのスムーズスクロール), overscroll-behavior: contain(バウンス/チェーンスクロール防止), scrollbar-width: thin/none, scrollbar-gutter: stable(スクロールバーのレイアウトシフト防止)。JSの Intersection Observer と組み合わせてスクロール連動UIも実装できます。',
    },
    {
      id: 25,
      title: 'View Transitions API',
      difficulty: 'advanced',
      description:
        'View Transitions API はページ遷移やDOM変更時のアニメーションを宣言的に制御するブラウザAPI+CSSの組み合わせです。document.startViewTransition() でDOMの変更前後のスナップショットを取り、CSSの ::view-transition-old / ::view-transition-new 擬似要素でアニメーションを定義します。view-transition-name で特定要素に名前を付けると、そのの要素がページ間で「移動」するような演出が可能です。SPA (React/Vue等) でもMPA (SSR) でも利用できます。',
      task: 'view-transition-name を使って、タブ切り替え時に要素がフェードで遷移するUIを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .tabs { display: flex; gap: 8px; margin-bottom: 16px; }\n  .tab {\n    padding: 8px 16px;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    background: #e0e0e0;\n  }\n  .tab.active { background: #3498db; color: white; }\n  .content {\n    padding: 20px;\n    border-radius: 8px;\n    background: #f8f9fa;\n    min-height: 100px;\n    /* view-transition-name を設定 */\n  }\n  /* View Transition のCSS */\n\n</style>\n</head>\n<body>\n  <div class="tabs">\n    <button class="tab active" onclick="switchTab(1)">Tab 1</button>\n    <button class="tab" onclick="switchTab(2)">Tab 2</button>\n  </div>\n  <div class="content" id="content">Tab 1 の内容です。</div>\n  <script>\n    function switchTab(num) {\n      // View Transition で切替\n    }\n  </script>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .tabs { display: flex; gap: 8px; margin-bottom: 16px; }\n  .tab {\n    padding: 8px 16px;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    background: #e0e0e0;\n  }\n  .tab.active { background: #3498db; color: white; }\n  .content {\n    padding: 20px;\n    border-radius: 8px;\n    background: #f8f9fa;\n    min-height: 100px;\n    view-transition-name: content-panel;\n  }\n  ::view-transition-old(content-panel) {\n    animation: fadeOut 0.3s ease;\n  }\n  ::view-transition-new(content-panel) {\n    animation: fadeIn 0.3s ease;\n  }\n  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }\n  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n</style>\n</head>\n<body>\n  <div class="tabs">\n    <button class="tab active" onclick="switchTab(1)">Tab 1</button>\n    <button class="tab" onclick="switchTab(2)">Tab 2</button>\n  </div>\n  <div class="content" id="content">Tab 1 の内容です。</div>\n  <script>\n    const data = { 1: "Tab 1 の内容です。", 2: "Tab 2 の内容です。" };\n    function switchTab(num) {\n      document.querySelectorAll(".tab").forEach((t, i) => t.classList.toggle("active", i === num - 1));\n      if (document.startViewTransition) {\n        document.startViewTransition(() => { document.getElementById("content").textContent = data[num]; });\n      } else {\n        document.getElementById("content").textContent = data[num];\n      }\n    }\n  </script>\n</body>\n</html>',
      expectedOutput: '[Tab 1 (active)] [Tab 2]\n[フェードアニメーション付きコンテンツ切替]',
      hints: [
        'view-transition-name: 名前; でアニメーション対象を指定',
        'document.startViewTransition(() => { DOM変更 }) で遷移開始',
        '::view-transition-old / ::view-transition-new でアニメーション定義',
        'API未対応ブラウザのフォールバックも忘れずに',
      ],
      explanation:
        'View Transitions API の仕組み:\n1. startViewTransition(callback) を呼ぶ\n2. ブラウザが現在の画面をスクリーンショット（old state）\n3. callback 内でDOMを更新\n4. ブラウザが新しい画面をスクリーンショット（new state）\n5. ::view-transition-old と ::view-transition-new でクロスフェード\nデフォルトはフェード（crossfade）ですが、CSSで自由にカスタマイズ可能です。view-transition-name を複数の要素に付けると、それぞれ独立してアニメーションします。MPA（マルチページアプリケーション）対応も @view-transition { navigation: auto; } で記述でき、ページ遷移時のシームレスなアニメーションが実現できます。',
    },
    {
      id: 26,
      title: 'CSS で 3D トランスフォーム',
      difficulty: 'advanced',
      description:
        'CSS の3D変換: perspective で奥行きを設定し、rotateX/Y/Z, translateZ, scale3d 等で3D空間上の変換を行います。transform-style: preserve-3d; で子要素を3D空間に配置し、backface-visibility: hidden; で裏面を非表示にします。カードフリップ、3Dキューブ、パララックスなどの3D演出がCSSだけで可能です。GPU アクセラレーションが効くため、パフォーマンスも良好です。',
      task: 'hover でカードが Y 軸回りに180度回転し裏面が表示される、カードフリップアニメーションを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .flip-container {\n    width: 250px;\n    height: 150px;\n    /* 3D perspective */\n    cursor: pointer;\n  }\n  .flipper {\n    width: 100%;\n    height: 100%;\n    /* 3D 設定 + トランジション */\n    position: relative;\n  }\n  .flip-container:hover .flipper {\n    /* 180度回転 */\n  }\n  .front, .back {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 20px;\n    color: white;\n    /* 裏面非表示 */\n  }\n  .front { background: #3498db; }\n  .back  { background: #e74c3c; /* 初期状態で裏返し */ }\n</style>\n</head>\n<body>\n  <div class="flip-container">\n    <div class="flipper">\n      <div class="front">表面</div>\n      <div class="back">裏面</div>\n    </div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .flip-container {\n    width: 250px;\n    height: 150px;\n    perspective: 1000px;\n    cursor: pointer;\n  }\n  .flipper {\n    width: 100%;\n    height: 100%;\n    transform-style: preserve-3d;\n    transition: transform 0.6s ease;\n    position: relative;\n  }\n  .flip-container:hover .flipper {\n    transform: rotateY(180deg);\n  }\n  .front, .back {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 20px;\n    color: white;\n    backface-visibility: hidden;\n  }\n  .front { background: #3498db; }\n  .back  { background: #e74c3c; transform: rotateY(180deg); }\n</style>\n</head>\n<body>\n  <div class="flip-container">\n    <div class="flipper">\n      <div class="front">表面</div>\n      <div class="back">裏面</div>\n    </div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[青: 表面] → hover → [赤: 裏面]',
      hints: [
        'perspective: 1000px; で奥行き感を設定',
        'transform-style: preserve-3d; で3D空間を維持',
        'backface-visibility: hidden; で裏面を非表示',
        'back は初期状態で rotateY(180deg) にしておく',
      ],
      explanation:
        '3D CSS のキープロパティ:\n- perspective: 値が小さいほど遠近感が強い（500px=近い, 2000px=遠い）\n- perspective-origin: 消失点の位置(デフォルト center)\n- transform-style: preserve-3d(子要素を3D空間に配置) / flat(2Dに平坦化)\n- backface-visibility: hidden(裏面を非表示)\n- transform: rotateX/Y/Z(角度), translateZ(奥行き移動), scale3d\nパフォーマンス: transform と opacity の変更はコンポジターレイヤーで処理されGPUアクセラレーションが効きます。will-change: transform でさらに最適化。ただし過度なレイヤー生成はメモリ消費が増えます。',
    },
    {
      id: 27,
      title: 'CSS Shapes と clip-path',
      difficulty: 'advanced',
      description:
        'clip-path はCSS要素を円、多角形、楕円などの図形で切り抜きます。clip-path: circle(), ellipse(), polygon(), inset(), path() が使えます。shape-outside は float 要素の周りにテキストを回り込ませる形状を定義します。これらを transition や animation と組み合わせるとクリエイティブなUIが作れます。SVGのpath データもそのまま使用できるため、複雑な形状も対応可能です。',
      task: 'clip-path で円形プロフィール画像と、polygon で斜めカットのヒーローセクションを作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .avatar {\n    width: 150px;\n    height: 150px;\n    background: #3498db;\n    /* 円形にクリップ */\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 48px;\n  }\n  .hero {\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: white;\n    padding: 60px 20px;\n    text-align: center;\n    /* 下部を斜めにカット */\n  }\n</style>\n</head>\n<body>\n  <div class="avatar">A</div>\n  <div class="hero">\n    <h1>Hero Section</h1>\n    <p>斜めカットのヒーロー</p>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  .avatar {\n    width: 150px;\n    height: 150px;\n    background: #3498db;\n    clip-path: circle(50%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 48px;\n  }\n  .hero {\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: white;\n    padding: 60px 20px 80px;\n    text-align: center;\n    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);\n  }\n</style>\n</head>\n<body>\n  <div class="avatar">A</div>\n  <div class="hero">\n    <h1>Hero Section</h1>\n    <p>斜めカットのヒーロー</p>\n  </div>\n</body>\n</html>',
      expectedOutput: '[丸いアバター: A]\n[Hero Section — 下部が斜めにカット]',
      hints: [
        'clip-path: circle(50%) で正円に切り抜き',
        'clip-path: polygon(x1 y1, x2 y2, ...) で多角形',
        'polygon の座標は % で指定（左上が 0 0、右下が 100% 100%）',
        'transition: clip-path 0.3s; でアニメーション可能',
      ],
      explanation:
        'clip-path の形状関数:\n- circle(半径 at 中心X 中心Y): 円\n- ellipse(横半径 横半径 at 中心X 中心Y): 楕円\n- polygon(x1 y1, x2 y2, ...): 多角形（任意の頂点数）\n- inset(上 右 下 左 round 角丸): 矩形切り抜き\n- path("SVG path データ"): SVGパスで複雑な形状\nクリエイティブな活用: hover でpolygon の頂点をアニメーションして形状モーフィング、スクロール連動で clip-path を変化させるリビール効果。Clippy (bennettfeely.com/clippy/) というツールでpolygonを視覚的に生成できます。shape-outside: circle(); と float を組み合わせると、テキストが円形に回り込むデザインも可能です。',
    },
    {
      id: 28,
      title: 'CSS パフォーマンス最適化',
      difficulty: 'advanced',
      description:
        'CSSパフォーマンスはレンダリング速度、ファイルサイズ、アニメーションの滑らかさに影響します。ブラウザのレンダリングパイプライン（Style → Layout → Paint → Composite）を理解し、どのプロパティ変更がどのステップを再実行させるかを知ることが重要です。transform/opacity はComposite のみ、width/height は Layout から再計算されます。Core Web Vitals（LCP, FID, CLS）のスコア改善にもCSS最適化が寄与します。',
      task: 'パフォーマンスを考慮したアニメーション（GPU加速対応）とクリティカルCSSの概念を示すコードを書いてください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  /* クリティカルCSS: ファーストビューに必要な最小限のスタイル */\n\n  .animate-good {\n    /* パフォーマンスの良いアニメーション */\n  }\n  .animate-bad {\n    /* パフォーマンスの悪いアニメーション */\n  }\n</style>\n</head>\n<body>\n  <div class="animate-good">Good Animation</div>\n  <div class="animate-bad">Bad Animation</div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: sans-serif; padding: 20px; }\n\n  .animate-good {\n    padding: 20px;\n    background: #2ecc71;\n    color: white;\n    border-radius: 8px;\n    margin-bottom: 16px;\n    will-change: transform;\n    transition: transform 0.3s ease, opacity 0.3s ease;\n  }\n  .animate-good:hover {\n    transform: translateX(20px) scale(1.02);\n    opacity: 0.9;\n  }\n\n  .animate-bad {\n    padding: 20px;\n    background: #e74c3c;\n    color: white;\n    border-radius: 8px;\n    width: 300px;\n    transition: width 0.3s ease, margin-left 0.3s ease;\n  }\n  .animate-bad:hover {\n    width: 350px;\n    margin-left: 20px;\n  }\n\n  .content-visibility {\n    content-visibility: auto;\n    contain-intrinsic-size: 0 500px;\n  }\n</style>\n</head>\n<body>\n  <div class="animate-good">Good: transform + opacity (GPU)</div>\n  <div class="animate-bad">Bad: width + margin (Layout再計算)</div>\n  <div class="content-visibility">\n    <p>content-visibility: auto でオフスクリーンのレンダリングを遅延</p>\n  </div>\n</body>\n</html>',
      expectedOutput: '[緑] Good: transform + opacity (GPU) — スムーズ\n[赤] Bad: width + margin — Layout再計算で重い',
      hints: [
        'transform と opacity はComposite層のみでGPU加速',
        'width, height, top, left はLayout再計算を引き起こす',
        'will-change: transform でブラウザにヒント',
        'content-visibility: auto で画面外要素のレンダリングを遅延',
      ],
      explanation:
        'レンダリングパイプライン:\n1. Style: CSSルールの計算\n2. Layout: 要素のサイズ・位置を計算（リフロー）\n3. Paint: ピクセルの描画（リペイント）\n4. Composite: レイヤーの合成\nパフォーマンス良: transform, opacity → Compositeのみ\nパフォーマンス中: color, background → Paint+Composite\nパフォーマンス悪: width, height, margin, padding → Layout+Paint+Composite\n最適化テクニック: 1. contain: layout style paint; でレンダリング境界を設定 2. content-visibility: auto でオフスクリーン要素のレンダリング遅延 3. @font-face の font-display: swap でFOIT防止 4. クリティカルCSSをインライン化し残りを非同期ロード 5. CSSセレクタは右から左に評価されるため、末尾の具体性が重要。',
    },
    {
      id: 29,
      title: 'CSS のモダンカラー関数',
      difficulty: 'advanced',
      description:
        'CSSのモダンカラー関数: oklch() は人間の知覚に基づいた色空間で、明度(lightness)・彩度(chroma)・色相(hue)を直感的に制御できます。color-mix() で2色を任意の比率で混合でき、relative color syntax で既存の色を基にバリエーションを生成できます。従来の rgb()/hsl() より広い色域(P3)をサポートし、@media (color-gamut: p3) で広色域ディスプレイを検出できます。デザインシステムの色管理が大幅に改善されます。',
      task: 'oklch() と color-mix() を使って、統一感のあるカラーパレットを生成してください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    /* oklch() でベースカラーを定義 */\n\n    /* color-mix() でバリエーション生成 */\n\n  }\n  .palette {\n    display: flex;\n    gap: 8px;\n    padding: 16px;\n  }\n  .swatch {\n    width: 100px;\n    height: 100px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 12px;\n  }\n</style>\n</head>\n<body>\n  <div class="palette">\n    <div class="swatch" style="background: var(--color-light)">Light</div>\n    <div class="swatch" style="background: var(--color-base)">Base</div>\n    <div class="swatch" style="background: var(--color-dark)">Dark</div>\n    <div class="swatch" style="background: var(--color-mixed)">Mixed</div>\n  </div>\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    --color-base: oklch(0.6 0.2 250);\n    --color-light: oklch(0.8 0.15 250);\n    --color-dark: oklch(0.4 0.2 250);\n    --color-accent: oklch(0.65 0.25 30);\n    --color-mixed: color-mix(in oklch, var(--color-base) 60%, var(--color-accent) 40%);\n  }\n  .palette {\n    display: flex;\n    gap: 8px;\n    padding: 16px;\n    flex-wrap: wrap;\n  }\n  .swatch {\n    width: 100px;\n    height: 100px;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 12px;\n    font-weight: bold;\n  }\n</style>\n</head>\n<body>\n  <div class="palette">\n    <div class="swatch" style="background: var(--color-light)">Light</div>\n    <div class="swatch" style="background: var(--color-base)">Base</div>\n    <div class="swatch" style="background: var(--color-dark)">Dark</div>\n    <div class="swatch" style="background: var(--color-accent)">Accent</div>\n    <div class="swatch" style="background: var(--color-mixed)">Mixed</div>\n  </div>\n</body>\n</html>',
      expectedOutput: '[Light] [Base] [Dark] [Accent] [Mixed] — 統一感のある5色パレット',
      hints: [
        'oklch(明度 彩度 色相): 明度0-1, 彩度0-0.4, 色相0-360',
        'color-mix(in oklch, 色A 割合, 色B 割合) で2色を混合',
        '同じ色相・彩度で明度だけ変えるとトーン違いが生成できる',
        'oklch は知覚的に均一な色空間',
      ],
      explanation:
        'モダンカラー関数の利点:\n- oklch(): 知覚的に均一。同じ chroma 値なら異なる hue でも同程度の鮮やかさに見える（hsl の saturation は色相により知覚が異なる）。L=明度(0=黒,1=白), C=彩度(0=無彩色), H=色相(角度)\n- color-mix(in oklch, blue 60%, red 40%): 指定色空間で混色。in srgb, in oklch, in lab 等\n- relative color syntax: oklch(from var(--base) calc(l + 0.2) c h) で既存色から派生（まだ一部ブラウザ対応中）\n- @color-profile, color(): Display P3等の広色域対応\nデザインシステムでは oklch ベースでカラーパレットを構築し、CSS変数で管理するのが最新のベストプラクティスです。',
    },
    {
      id: 30,
      title: 'HTML/CSS 総合演習 — ランディングページ',
      difficulty: 'advanced',
      description:
        '本レッスンはこれまで学んだ全技術を統合する総合演習です。セマンティックHTML、Flexbox/Grid レイアウト、レスポンシブデザイン、CSS変数、トランジション、ダークモード対応などを組み合わせて、実践的なランディングページの骨格を作ります。コンポーネント思考でCSSを構造化し、保守性の高いコードを目指します。実際の開発では、このような設計を基にフレームワーク(Tailwind CSS, CSS Modules)やビルドツール(PostCSS, Lightning CSS)を活用します。',
      task: 'セマンティックHTML、CSS変数、Grid/Flexbox、レスポンシブデザインを使ったランディングページの骨格を作ってください。',
      initialCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<style>\n  /* CSS変数、リセット、レイアウト、レスポンシブ を統合 */\n\n</style>\n</head>\n<body>\n  <!-- header, hero, features(Grid), CTA, footer -->\n\n</body>\n</html>',
      solutionCode: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<style>\n  :root {\n    --primary: oklch(0.6 0.2 250);\n    --bg: #ffffff;\n    --text: #1a1a2e;\n    --card-bg: #f8f9fa;\n    --max-width: 1100px;\n  }\n  @media (prefers-color-scheme: dark) {\n    :root { --bg: #1a1a2e; --text: #e0e0e0; --card-bg: #16213e; }\n  }\n  * { margin: 0; box-sizing: border-box; }\n  body { font-family: sans-serif; background: var(--bg); color: var(--text); }\n  .container { max-width: var(--max-width); margin: 0 auto; padding: 0 20px; }\n\n  header { padding: 16px 0; }\n  header .container { display: flex; justify-content: space-between; align-items: center; }\n  nav a { margin-left: 20px; text-decoration: none; color: var(--text); }\n\n  .hero {\n    text-align: center;\n    padding: 80px 20px;\n    background: linear-gradient(135deg, oklch(0.3 0.1 250), oklch(0.2 0.15 280));\n    color: white;\n  }\n  .hero h1 { font-size: 2.5rem; margin-bottom: 16px; }\n  .hero .btn {\n    display: inline-block;\n    padding: 12px 32px;\n    background: var(--primary);\n    color: white;\n    border-radius: 8px;\n    text-decoration: none;\n    margin-top: 20px;\n    transition: transform 0.2s;\n  }\n  .hero .btn:hover { transform: translateY(-2px); }\n\n  .features {\n    padding: 60px 0;\n  }\n  .features-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 24px;\n  }\n  .feature-card {\n    background: var(--card-bg);\n    padding: 24px;\n    border-radius: 12px;\n    text-align: center;\n  }\n  .feature-card h3 { margin-bottom: 8px; }\n\n  footer {\n    text-align: center;\n    padding: 24px;\n    border-top: 1px solid var(--card-bg);\n    font-size: 14px;\n  }\n</style>\n</head>\n<body>\n  <header>\n    <div class="container">\n      <strong>Brand</strong>\n      <nav><a href="#">Home</a><a href="#">Features</a><a href="#">Contact</a></nav>\n    </div>\n  </header>\n  <section class="hero">\n    <div class="container">\n      <h1>Build Something Great</h1>\n      <p>HTML/CSS の全技術を統合したランディングページ</p>\n      <a href="#" class="btn">Get Started</a>\n    </div>\n  </section>\n  <section class="features">\n    <div class="container">\n      <div class="features-grid">\n        <div class="feature-card"><h3>Semantic</h3><p>意味的なHTMLで構造化</p></div>\n        <div class="feature-card"><h3>Responsive</h3><p>全デバイスに対応</p></div>\n        <div class="feature-card"><h3>Modern CSS</h3><p>変数・Grid・oklch</p></div>\n      </div>\n    </div>\n  </section>\n  <footer><p>&copy; 2024 Brand. All rights reserved.</p></footer>\n</body>\n</html>',
      expectedOutput: '[Header: Brand | Home Features Contact]\n[Hero: Build Something Great + ボタン]\n[Features: 3カードGrid]\n[Footer]',
      hints: [
        'CSS変数で色を一元管理',
        'Grid の auto-fit + minmax でレスポンシブカード',
        'セマンティックタグ(header, section, footer)を使う',
        'prefers-color-scheme でダークモード対応',
      ],
      explanation:
        'ランディングページ設計のポイント:\n1. セマンティックHTML で構造を明確に\n2. CSS変数でデザイントークン管理（色、間隔、最大幅）\n3. モバイルファーストレスポンシブ（auto-fit Grid でブレークポイント不要）\n4. ダークモード対応（色変数の切替）\n5. パフォーマンス（transform アニメーション、content-visibility）\n6. アクセシビリティ（コントラスト、フォーカス、セマンティクス）\n\n実際の開発フロー: デザイン(Figma) → HTML構造 → CSS基本スタイル → レスポンシブ → インタラクション → テスト(Lighthouse) → 最適化。フレームワーク(Tailwind CSS, Chakra UI)はこの基礎の上に構築されています。',
    },
  ],
};

export default course;
