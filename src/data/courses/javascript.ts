import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'javascript',
  name: 'JavaScript',
  nameJa: 'JavaScript',
  simpleIconSlug: 'javascript',
  color: '#F7DF1E',
  description: 'Webの共通言語。フロントエンド・バックエンド両方で活躍する万能言語です。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'Hello World — console.log',
      difficulty: 'beginner',
      description:
        'JavaScriptでは console.log() を使って値をコンソールに出力します。文字列はシングルクォート(\'\')またはダブルクォート("")で囲みます。ブラウザの開発者ツール（F12）やNode.jsのターミナルに表示されます。console にはログレベルごとのメソッド（log, warn, error, info, debug）があり、開発時のデバッグに欠かせない機能です。alert() と違い、ユーザーの操作をブロックしません。',
      task: 'console.log を使って1行目に "Hello, JavaScript!" 、2行目に "Let\'s start coding!" と出力してください。',
      initialCode: '// --- Lesson 1: Hello World ---\n// console.log() で文字列を出力する\n\n// 1行目: Hello, JavaScript! を出力\n\n\n// 2行目: Let\'s start coding! を出力\n',
      solutionCode: '// --- Lesson 1: Hello World ---\n// console.log() で文字列を出力する\n\n// 1行目: Hello, JavaScript! を出力\nconsole.log("Hello, JavaScript!");\n\n// 2行目: Let\'s start coding! を出力\nconsole.log("Let\'s start coding!");',
      expectedOutput: 'Hello, JavaScript!\nLet\'s start coding!',
      hints: [
        'console.log() の括弧の中に文字列を入れます',
        '文字列はダブルクォート "" で囲みます',
        'アポストロフィを含む文字列はダブルクォートで囲むと簡単です',
        '答え: console.log("Hello, JavaScript!"); console.log("Let\'s start coding!");',
      ],
      explanation:
        'console.log() はブラウザの開発者ツール（DevTools）やNode.jsのコンソールに値を出力する最も基本的な関数です。デバッグ時に変数の値を確認するために頻繁に使います。console.warn() で警告（黄色）、console.error() でエラー（赤色）、console.table() で配列/オブジェクトを表形式で表示できます。console.time() / console.timeEnd() でパフォーマンス計測も可能です。本番環境では不要な console.log を削除するのがベストプラクティスです。',
    },
    {
      id: 2,
      title: '変数宣言 — let と const',
      difficulty: 'beginner',
      description:
        'JavaScriptでは const（再代入不可）と let（再代入可能）で変数を宣言します。var は古い書き方で、関数スコープやホイスティングの問題があるため原則使いません。const はブロックスコープで、宣言と同時に初期化が必要です。let もブロックスコープですが、後から値を変更できます。原則として const を優先し、値を変更する必要がある場合にのみ let を使うのがモダンJavaScriptのベストプラクティスです。',
      task: 'const で name に "miruky" を、let で age に 25 を代入し、両方を出力してください。',
      initialCode: '// --- Lesson 2: 変数宣言 ---\n// const: 再代入不可, let: 再代入可能\n\n// const で name を宣言（再代入不可）\n\n\n// let で age を宣言（再代入可能）\n\n\n// 両方を出力\nconsole.log(name);\nconsole.log(age);',
      solutionCode: '// --- Lesson 2: 変数宣言 ---\n// const: 再代入不可, let: 再代入可能\n\n// const で name を宣言（再代入不可）\nconst name = "miruky";\n\n// let で age を宣言（再代入可能）\nlet age = 25;\n\n// 両方を出力\nconsole.log(name);\nconsole.log(age);',
      expectedOutput: 'miruky\n25',
      hints: [
        'const name = "miruky"; で文字列を代入',
        'let age = 25; で数値を代入',
        'const は再代入不可だが、オブジェクトの中身は変更可能',
        'var はスコープの問題があるため使いません',
      ],
      explanation:
        'const は定数（再代入不可）、let は変数（再代入可能）です。重要: const はオブジェクトの再代入を禁止しますが、プロパティの変更は可能です（const obj = {}; obj.name = "OK"）。完全な不変性には Object.freeze() が必要です。var は関数スコープでホイスティング（宣言が先頭に巻き上げ）されるため、意図しないバグの原因になります。Temporal Dead Zone (TDZ): let/const は宣言前にアクセスするとReferenceErrorが発生します（var はundefined）。ESLint の no-var ルールで var の使用を禁止できます。',
    },
    {
      id: 3,
      title: 'データ型 — typeof で確認',
      difficulty: 'beginner',
      description:
        'JavaScriptの基本型（プリミティブ）は7種類: string, number, boolean, undefined, null, symbol, bigint です。typeof 演算子で型を文字列として取得できます。number は整数も小数も含み、IEEE 754 の浮動小数点数です。JavaScript は動的型付け言語なので、変数の型は実行時に決まり、途中で変わることもあります。型変換は暗黙的（強制変換）と明示的（Number(), String() 等）があります。',
      task: '文字列 "hello"、数値 42、真偽値 true の型をそれぞれ typeof で出力してください。',
      initialCode: '// --- Lesson 3: データ型 ---\n// typeof 演算子で型を確認する\n\n// 文字列の型\nconsole.log(typeof "hello");\n\n// 数値の型\n\n\n// 真偽値の型\n',
      solutionCode: '// --- Lesson 3: データ型 ---\n// typeof 演算子で型を確認する\n\n// 文字列の型\nconsole.log(typeof "hello");\n\n// 数値の型\nconsole.log(typeof 42);\n\n// 真偽値の型\nconsole.log(typeof true);',
      expectedOutput: 'string\nnumber\nboolean',
      hints: [
        'typeof 42 で "number" が返ります',
        'typeof true で "boolean" が返ります',
        'typeof の結果は文字列で返されます',
        '注意: typeof null は "object" を返す（歴史的バグ）',
      ],
      explanation:
        'JavaScriptは動的型付け言語で、変数の型は実行時に決まります。typeof は値の型を文字列で返しますが、有名なバグがあります: typeof null === "object"（歴史的な仕様のミス）。typeof undefined === "undefined" です。NaN (Not a Number) は typeof NaN === "number" ですが Number.isNaN() で判定可能です。BigInt（2020年追加）は typeof 100n === "bigint" です。Symbol はユニークな識別子を作る型で、typeof Symbol() === "symbol" です。',
    },
    {
      id: 4,
      title: 'テンプレートリテラル',
      difficulty: 'beginner',
      description:
        'バッククォート(`)で囲むテンプレートリテラルは、${} で変数や式を埋め込めます。文字列結合（+）より読みやすく、複数行の文字列もそのまま書けます。ES2015(ES6) で導入された機能で、モダンJavaScriptでは文字列連結の代わりにテンプレートリテラルを使うのが標準です。Tagged Template Literals を使うと、文字列のカスタム処理も可能です。',
      task: 'const lang = "JavaScript", year = 2024 を定義し、テンプレートリテラルで "I love JavaScript since 2024!" と出力してください。',
      initialCode: '// --- Lesson 4: テンプレートリテラル ---\n// バッククォート ` と ${} で変数を埋め込む\n\nconst lang = "JavaScript";\nconst year = 2024;\n\n// テンプレートリテラルで出力\n// 「I love JavaScript since 2024!」となるように\nconsole.log();',
      solutionCode: '// --- Lesson 4: テンプレートリテラル ---\n// バッククォート ` と ${} で変数を埋め込む\n\nconst lang = "JavaScript";\nconst year = 2024;\n\n// テンプレートリテラルで出力\nconsole.log(`I love ${lang} since ${year}!`);',
      expectedOutput: 'I love JavaScript since 2024!',
      hints: [
        'バッククォート ` で全体を囲みます',
        '${lang} で変数を埋め込みます',
        '${year} も同様に埋め込みます',
        '${} 内では計算式も使えます: ${year + 1}',
      ],
      explanation:
        'テンプレートリテラルはES2015(ES6)で導入された機能で、文字列連結(+)より可読性が大幅に向上します。複数行の文字列もそのまま書けるため、HTMLテンプレートの生成にも便利です。${} の中では任意の式が使えます: ${2 + 3}, ${user.name.toUpperCase()}, ${condition ? "Y" : "N"} など。Tagged Template Literals: html`<h1>${title}</h1>` のようにタグ関数を付けると、リテラルを加工できます。styled-components や lit-html がこの機能を活用しています。',
    },
    {
      id: 5,
      title: '配列の基本',
      difficulty: 'beginner',
      description:
        '配列は複数の値を順序付きで格納するデータ構造です。[] で作成し、インデックス（0始まり）でアクセスします。.length で要素数を取得でき、push/pop で末尾、unshift/shift で先頭への追加・削除が可能です。配列は Object の一種で、typeof [] === "object" です。Array.isArray() で配列かどうかを判定できます。',
      task: '配列 fruits に "apple", "banana", "cherry" を入れ、要素数と2番目の要素（インデックス1）を出力してください。',
      initialCode: '// --- Lesson 5: 配列の基本 ---\n// [] で配列を作成、[index] でアクセス\n\n// 3つの果物を持つ配列\nconst fruits = [];\n\n// 要素数を出力\nconsole.log(fruits.length);\n\n// 2番目の要素（インデックス1）を出力\nconsole.log(fruits[1]);',
      solutionCode: '// --- Lesson 5: 配列の基本 ---\n// [] で配列を作成、[index] でアクセス\n\n// 3つの果物を持つ配列\nconst fruits = ["apple", "banana", "cherry"];\n\n// 要素数を出力\nconsole.log(fruits.length);\n\n// 2番目の要素（インデックス1）を出力\nconsole.log(fruits[1]);',
      expectedOutput: '3\nbanana',
      hints: [
        '配列は ["apple", "banana", "cherry"] のように書きます',
        '.length で要素数を取得します',
        'インデックスは0から始まるので [1] は2番目',
        'Array.isArray(fruits) で配列判定できます',
      ],
      explanation:
        '配列のインデックスは0から始まります（0-indexed）。.length プロパティで要素数を取得できます。破壊的メソッド: push/pop（末尾追加/削除）、unshift/shift（先頭追加/削除）、splice（任意位置の操作）は元の配列を変更します。非破壊的メソッド: map, filter, concat, slice は新しい配列を返します。const で宣言した配列は再代入できませんが、中身（push等）の変更は可能です。完全な不変性には Object.freeze() や structuredClone() が必要です。',
    },
    {
      id: 6,
      title: 'オブジェクトの基本',
      difficulty: 'beginner',
      description:
        'オブジェクトはキーと値のペア（プロパティ）を格納するデータ構造で、JavaScriptの最も重要な概念の一つです。{} で作成し、ドット記法（obj.key）やブラケット記法（obj["key"]）でアクセスします。プロパティの追加・削除が動的に行えます。ES2015 以降、プロパティの短縮記法やComputedプロパティ名([式]: 値)も利用可能です。',
      task: 'name: "miruky", role: "engineer" を持つオブジェクト user を作り、両方のプロパティを出力してください。',
      initialCode: '// --- Lesson 6: オブジェクトの基本 ---\n// { key: value } でオブジェクトを作成\n\n// user オブジェクトを作成\nconst user = {\n  // ここにプロパティを定義\n};\n\n// ドット記法でアクセスして出力\nconsole.log(user.name);\nconsole.log(user.role);',
      solutionCode: '// --- Lesson 6: オブジェクトの基本 ---\n// { key: value } でオブジェクトを作成\n\n// user オブジェクトを作成\nconst user = {\n  name: "miruky",\n  role: "engineer",\n};\n\n// ドット記法でアクセスして出力\nconsole.log(user.name);\nconsole.log(user.role);',
      expectedOutput: 'miruky\nengineer',
      hints: [
        'const user = { name: "miruky", role: "engineer" };',
        'ドット記法: user.name でアクセス',
        'ブラケット記法: user["name"] でも同じ',
        '動的なキーにはブラケット記法を使います',
      ],
      explanation:
        'オブジェクトはJavaScriptの核心的なデータ構造で、ほぼすべてのものがオブジェクトです（配列、関数、Date等）。ドット記法が基本ですが、キーが変数の場合やハイフンを含む場合はブラケット記法を使います。ES2015+の便利な構文: プロパティ短縮記法 { name }（{ name: name } の短縮）、メソッド短縮 { greet() {} }、Computed Property Names { [key]: value }。Object.keys(obj) でキーの配列、Object.values(obj) で値の配列、Object.entries(obj) で [key, value] ペアの配列を取得できます。',
    },
    {
      id: 7,
      title: 'if / else 条件分岐',
      difficulty: 'beginner',
      description:
        '条件分岐は if / else if / else で記述します。条件式が truthy（真と評価される値）なら実行されます。JavaScriptでは 0, "", null, undefined, NaN, false が falsy で、それ以外はすべて truthy です。=== は厳密等価（型も比較）、== は抽象等価（型変換あり）で、常に === を使うのがベストプラクティスです。',
      task: 'const score = 85 を定義し、80以上なら "Great"、60以上なら "Good"、それ以外は "Keep going" を出力してください。',
      initialCode: '// --- Lesson 7: 条件分岐 ---\n// if / else if / else で処理を分岐\n\nconst score = 85;\n\n// スコアに応じてメッセージを出力\nif (score >= 80) {\n  // "Great" を出力\n} else if (score >= 60) {\n  // "Good" を出力\n} else {\n  // "Keep going" を出力\n}',
      solutionCode: '// --- Lesson 7: 条件分岐 ---\n// if / else if / else で処理を分岐\n\nconst score = 85;\n\n// スコアに応じてメッセージを出力\nif (score >= 80) {\n  console.log("Great");\n} else if (score >= 60) {\n  console.log("Good");\n} else {\n  console.log("Keep going");\n}',
      expectedOutput: 'Great',
      hints: [
        'if (score >= 80) console.log("Great"); と書きます',
        'else if で追加条件を指定',
        '条件は上から順に評価され、最初に一致したブロックのみ実行',
        '=== を使い == は使わない（厳密等価）',
      ],
      explanation:
        'JavaScriptの truthy/falsy は重要な概念です。falsy な値: false, 0, -0, 0n, "", null, undefined, NaN。それ以外はすべて truthy（空配列 [] や空オブジェクト {} も truthy）です。=== は厳密等価（型と値の両方を比較）、== は抽象等価（型変換してから比較）です。"1" == 1 は true ですが "1" === 1 は false です。常に === を使うことで型強制のバグを防げます。三項演算子 condition ? a : b も条件分岐の一種です。Nullish Coalescing (??) は null/undefined の場合のみデフォルト値を使います。',
    },
    {
      id: 8,
      title: 'for ループと反復処理',
      difficulty: 'beginner',
      description:
        'for ループは初期化・条件・更新の3部分で構成されます。配列の反復には for...of（値を取得）、オブジェクトには for...in（キーを取得）が使えます。forEach メソッドも配列の反復に広く使われます。while, do...while も利用可能です。break でループを中断、continue で次のイテレーションにスキップできます。',
      task: 'for 文で1から5までの数字を1行ずつ出力してください。',
      initialCode: '// --- Lesson 8: for ループ ---\n// for (初期化; 条件; 更新) { 処理 }\n\n// 1 から 5 を1行ずつ出力\nfor (let i = 1; i <= 5; i++) {\n  // ここに処理を書く\n}',
      solutionCode: '// --- Lesson 8: for ループ ---\n// for (初期化; 条件; 更新) { 処理 }\n\n// 1 から 5 を1行ずつ出力\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
      expectedOutput: '1\n2\n3\n4\n5',
      hints: [
        'for (let i = 1; i <= 5; i++) でループを定義',
        'ループ内で console.log(i) を実行',
        'i++ は i = i + 1 の短縮形',
        'for...of で配列の値、for...in でオブジェクトのキーを取得',
      ],
      explanation:
        'for文の構造: for (初期化; 条件; 更新) { 処理 }。配列の反復方法は複数あります: for...of（推奨: 値を取得）、forEach（コールバック形式）、for...in（オブジェクトのキー列挙用、配列には非推奨）、通常の for（インデックスが必要な場合）。forEach は break が使えないため、中断が必要な場合は for...of を使います。while は条件が真の間ループ、do...while は最低1回実行してから条件チェック。パフォーマンスが重要な場合は通常の for ループが最速です。',
    },
    {
      id: 9,
      title: '関数宣言とアロー関数',
      difficulty: 'beginner',
      description:
        '関数は function キーワードまたはアロー関数（=>）で定義します。モダンJavaScriptではアロー関数が主流です。関数宣言はホイスティングされ、アロー関数（関数式）はされません。アロー関数は this を束縛しない（レキシカルスコープ）点が function と異なる重要な特性です。デフォルト引数、残余引数（...args）もサポートされています。',
      task: '2つの数値を受け取って合計を返すアロー関数 add を作り、add(3, 7) の結果を出力してください。',
      initialCode: '// --- Lesson 9: 関数 ---\n// アロー関数: (引数) => 式\n\n// アロー関数 add を定義\n// 2つの数値を受け取り、合計を返す\nconst add = \n\n// 結果を出力\nconsole.log(add(3, 7));',
      solutionCode: '// --- Lesson 9: 関数 ---\n// アロー関数: (引数) => 式\n\n// アロー関数 add を定義\n// 2つの数値を受け取り、合計を返す\nconst add = (a, b) => a + b;\n\n// 結果を出力\nconsole.log(add(3, 7));',
      expectedOutput: '10',
      hints: [
        'const add = (a, b) => a + b;',
        '1行の場合は {} と return を省略できます',
        '複数行は const add = (a, b) => { return a + b; }',
        'アロー関数は this を束縛しません（レキシカルスコープ）',
      ],
      explanation:
        'アロー関数は (引数) => 式 の形で書きます。1行の式なら {} と return を省略可能（暗黙のreturn）。複数行の場合は {} で囲み、明示的に return を書きます。重要な違い: function は自身の this を持ちますが、アロー関数は外側のスコープの this を継承します（レキシカルスコープ）。このため、イベントハンドラやコールバックで this の問題が起きにくくなります。デフォルト引数: (name = "World") => ... で引数省略時のデフォルト値を設定。残余引数: (...args) => args.reduce(...) で可変長引数を配列として受け取れます。',
    },
    {
      id: 10,
      title: '配列メソッド — map / filter',
      difficulty: 'beginner',
      description:
        'map は各要素を変換した新配列を、filter は条件に合う要素だけの新配列を返します。どちらも元の配列を変更しないイミュータブルな操作です。メソッドチェーンで組み合わせることで、宣言的で読みやすいデータ処理コードが書けます。map/filter/reduce は JavaScript の関数型プログラミングの三本柱と呼ばれています。',
      task: 'const nums = [1, 2, 3, 4, 5] から偶数だけを filter し、それぞれ2倍にした配列を出力してください。',
      initialCode: '// --- Lesson 10: map / filter ---\n// 配列を変換・フィルタする非破壊メソッド\n\nconst nums = [1, 2, 3, 4, 5];\n\n// 偶数を抽出し、それぞれ2倍にする\n// filter → map のチェーン\nconst result = nums\n  .filter()  // 偶数のみ\n  .map();    // 2倍に\n\nconsole.log(result);',
      solutionCode: '// --- Lesson 10: map / filter ---\n// 配列を変換・フィルタする非破壊メソッド\n\nconst nums = [1, 2, 3, 4, 5];\n\n// 偶数を抽出し、それぞれ2倍にする\nconst result = nums\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2);\n\nconsole.log(result);',
      expectedOutput: '4,8',
      hints: [
        'filter(n => n % 2 === 0) で偶数を抽出',
        '.map(n => n * 2) で各要素を2倍に',
        'メソッドチェーンで .filter().map() と繋げる',
        '元の配列 nums は変更されません（イミュータブル）',
      ],
      explanation:
        'map, filter, reduce はJavaScript関数型プログラミングの三本柱です。map(fn): 各要素に fn を適用した新配列。filter(fn): fn が true を返す要素のみの新配列。メソッドチェーンで組み合わせることで、宣言的で副作用のないコードが書けます。find(fn) は条件に合う最初の要素を返す（配列ではなく値）。some(fn) は1つでも条件に合えば true、every(fn) は全て合えば true。flatMap(fn) は map + flat を同時に行います。パフォーマンスが求められる場合は for ループの方が高速ですが、可読性は map/filter が優れます。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: '分割代入 (Destructuring)',
      difficulty: 'intermediate',
      description:
        '分割代入は配列やオブジェクトから値を取り出して変数に代入する構文です。コードの簡潔さと可読性が大幅に向上します。オブジェクトは { プロパティ名 }、配列は [要素1, 要素2] の形で書きます。デフォルト値、リネーム、ネストされた分割代入も可能です。関数の引数でも分割代入が使え、Reactのpropsの受け取りでは必須テクニックです。',
      task: 'const user = { name: "miruky", age: 25, city: "Tokyo" } から分割代入で取り出し、"miruky is 25 in Tokyo" と出力してください。',
      initialCode: '// --- Lesson 11: 分割代入 ---\n// オブジェクトから { } で値を抽出\n\nconst user = { name: "miruky", age: 25, city: "Tokyo" };\n\n// 分割代入で name, age, city を取り出す\nconst {  } = user;\n\n// テンプレートリテラルで出力\nconsole.log(`${name} is ${age} in ${city}`);',
      solutionCode: '// --- Lesson 11: 分割代入 ---\n// オブジェクトから { } で値を抽出\n\nconst user = { name: "miruky", age: 25, city: "Tokyo" };\n\n// 分割代入で name, age, city を取り出す\nconst { name, age, city } = user;\n\n// テンプレートリテラルで出力\nconsole.log(`${name} is ${age} in ${city}`);',
      expectedOutput: 'miruky is 25 in Tokyo',
      hints: [
        'const { name, age, city } = user; で取り出す',
        'プロパティ名と同じ変数名で取り出されます',
        'リネーム: const { name: userName } = user;',
        'デフォルト値: const { name = "unknown" } = user;',
      ],
      explanation:
        '分割代入はES2015(ES6)の革新的な機能で、コードの可読性を大幅に向上させます。オブジェクト: const { a, b } = obj、配列: const [x, y] = arr。リネーム: const { name: userName } = user で name を userName として取り出せます。デフォルト値: const { name = "unknown" } = {} でプロパティがない場合の初期値。ネスト: const { address: { city } } = user で深い階層も取得可能。関数の引数: function greet({ name, age }) { ... }。React でよく使うパターン: const { useState, useEffect } = React。配列の分割代入では要素のスキップも可能: const [, second] = arr。',
    },
    {
      id: 12,
      title: 'スプレッド構文と Rest パラメータ',
      difficulty: 'intermediate',
      description:
        '... はスプレッド（展開）とレスト（残余）の2つの使い方があります。スプレッドは配列やオブジェクトを「展開」し、コピーやマージに使います。Rest パラメータは残りの引数を配列として受け取ります。どちらも浅いコピー（shallow copy）であることに注意が必要です。イミュータブルなデータ操作の基盤となる重要な構文です。',
      task: '配列 a = [1, 2] と b = [3, 4] をスプレッド構文で結合し、結果を出力してください。',
      initialCode: '// --- Lesson 12: スプレッド構文 ---\n// ... で配列/オブジェクトを展開\n\nconst a = [1, 2];\nconst b = [3, 4];\n\n// スプレッド構文で2つの配列を結合\nconst merged = ;\n\nconsole.log(merged);',
      solutionCode: '// --- Lesson 12: スプレッド構文 ---\n// ... で配列/オブジェクトを展開\n\nconst a = [1, 2];\nconst b = [3, 4];\n\n// スプレッド構文で2つの配列を結合\nconst merged = [...a, ...b];\n\nconsole.log(merged);',
      expectedOutput: '1,2,3,4',
      hints: [
        '[...a, ...b] で2つの配列を展開して結合',
        'オブジェクトでも { ...obj1, ...obj2 } が使えます',
        'スプレッドは浅いコピー（ネストされたオブジェクトは参照共有）',
        'Rest パラメータ: function(...args) で可変長引数を受け取る',
      ],
      explanation:
        'スプレッド構文は配列/オブジェクトを「展開」し、浅いコピーやマージを簡潔に書けます。配列のコピー: const copy = [...arr]。オブジェクトのマージ: const merged = { ...obj1, ...obj2 }（後のプロパティが優先）。重要: スプレッドは浅いコピー（shallow copy）のため、ネストされたオブジェクトは参照が共有されます。深いコピーには structuredClone() や JSON.parse(JSON.stringify(obj))（関数や特殊オブジェクトは不可）を使います。Rest パラメータ: function sum(...nums) { return nums.reduce((a, b) => a + b); } で可変長引数を配列として受け取れます。React の props 転送: <Child {...props} /> でも使われます。',
    },
    {
      id: 13,
      title: 'Promise と非同期処理',
      difficulty: 'intermediate',
      description:
        'JavaScriptはシングルスレッドですが、Promise で非同期処理を扱います。Promise は「未来の値」を表すオブジェクトで、pending（待機）→ fulfilled（成功）or rejected（失敗）の3状態を持ちます。resolve で成功値、reject で失敗理由を返します。.then() で成功処理、.catch() でエラー処理、.finally() で最終処理をチェーンします。コールバック地獄を解消するために導入されました。',
      task: '即座に "Done!" を resolve する Promise を作り、.then() で結果を出力してください。',
      initialCode: '// --- Lesson 13: Promise ---\n// 非同期処理の結果を表すオブジェクト\n\n// Promise を作成（即座に resolve）\nconst promise = new Promise((resolve) => {\n  // resolve に成功値を渡す\n});\n\n// .then で成功時の処理を記述\npromise.then((result) => {\n  console.log(result);\n});',
      solutionCode: '// --- Lesson 13: Promise ---\n// 非同期処理の結果を表すオブジェクト\n\n// Promise を作成（即座に resolve）\nconst promise = new Promise((resolve) => {\n  resolve("Done!");\n});\n\n// .then で成功時の処理を記述\npromise.then((result) => {\n  console.log(result);\n});',
      expectedOutput: 'Done!',
      hints: [
        'resolve("Done!") で成功値を渡します',
        '.then((result) => console.log(result)) で結果を受け取る',
        '.catch((err) => ...) でエラーをキャッチ',
        'Promise.resolve("Done!") は短縮形で同じ結果',
      ],
      explanation:
        'Promise は非同期処理の結果を表すオブジェクトで、ES2015(ES6)で導入されました。状態遷移: pending → fulfilled（resolve時）or rejected（reject時）。状態は一度確定すると変更できません。.then(onFulfilled, onRejected) でコールバックを登録し、Promise チェーンで複数の非内容処理を連結できます。エラーハンドリング: .catch(err => ...) で rejected をキャッチ。.finally(() => ...) は成功/失敗に関わらず実行（クリーンアップ処理など）。Promise.resolve(value) と Promise.reject(reason) は即座に確定した Promise を作る便利メソッドです。',
    },
    {
      id: 14,
      title: 'async / await',
      difficulty: 'intermediate',
      description:
        'async/await は Promise をより読みやすく書くための構文糖衣（シンタックスシュガー）です。async 関数内で await を使うと、Promise の解決を同期的に記述できます。try/catch でエラーハンドリングも直感的に行えます。async 関数は常に Promise を返すため、呼び出し側でも .then() が使えます。トップレベル await は ESM で利用可能です。',
      task: '"Hello" を返す async 関数 greet を作り、await で結果を取得して出力してください。',
      initialCode: '// --- Lesson 14: async / await ---\n// Promise を同期的に書ける構文糖衣\n\n// async 関数を定義\nasync function greet() {\n  // "Hello" を返す（自動的に Promise になる）\n}\n\n// 即時実行 async 関数で await して出力\nasync function main() {\n  const msg = await greet();\n  console.log(msg);\n}\nmain();',
      solutionCode: '// --- Lesson 14: async / await ---\n// Promise を同期的に書ける構文糖衣\n\nasync function greet() {\n  return "Hello";\n}\n\nasync function main() {\n  const msg = await greet();\n  console.log(msg);\n}\nmain();',
      expectedOutput: 'Hello',
      hints: [
        'return "Hello" は resolve("Hello") と同等',
        'async 関数は自動的に Promise を返します',
        'await は Promise が解決されるまで待機します',
        'エラーハンドリングは try/catch で行います',
      ],
      explanation:
        'async関数は常にPromiseを返します。return "Hello" は Promise.resolve("Hello") と同等です。await は Promise が解決されるまで待機し、結果を値として返します。エラーハンドリング: try { const data = await fetch(url); } catch (err) { ... }。複数の非同期処理: const [a, b] = await Promise.all([fetchA(), fetchB()]) で並列実行。逐次実行: for await (const item of asyncIterable) { ... }。トップレベル await は ES Modules で利用可能です。async/await は内部的に Promise を使っているため、Promise の理解は依然として重要です。',
    },
    {
      id: 15,
      title: 'クラスの基本',
      difficulty: 'intermediate',
      description:
        'ES2015(ES6) のクラス構文でオブジェクト指向プログラミングができます。constructor でインスタンスを初期化し、メソッドを定義できます。extends で継承、super で親クラスを呼び出します。内部的にはプロトタイプベースの継承のシンタックスシュガーです。ES2022 では # を使ったプライベートフィールドや static フィールドも正式サポートされています。',
      task: 'name と age を持つ Person クラスを作り、greet() メソッドで "I am miruky, age 25" と出力してください。',
      initialCode: '// --- Lesson 15: クラス ---\n// ES6 のクラス構文でオブジェクト指向\n\nclass Person {\n  // constructor で初期化\n  constructor(name, age) {\n    // this で初期化\n  }\n\n  // greet メソッドを定義\n  greet() {\n    // テンプレートリテラルで出力\n  }\n}\n\nconst p = new Person("miruky", 25);\np.greet();',
      solutionCode: '// --- Lesson 15: クラス ---\n// ES6 のクラス構文でオブジェクト指向\n\nclass Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    console.log(`I am ${this.name}, age ${this.age}`);\n  }\n}\n\nconst p = new Person("miruky", 25);\np.greet();',
      expectedOutput: 'I am miruky, age 25',
      hints: [
        'this.name = name; で初期化',
        'console.log(`I am ${this.name}, age ${this.age}`);',
        'class 構文はプロトタイプの糖衣構文です',
        '#privateField で真のプライベートフィールド（ES2022）',
      ],
      explanation:
        'JavaScriptのクラスは内部的にはプロトタイプベースの継承のシンタックスシュガーです。constructor は new で呼ばれる初期化メソッドで、this でインスタンスのプロパティを設定します。extends で継承: class Student extends Person { ... }、super() で親コンストラクタを呼び出します。ES2022+ の機能: #name でプライベートフィールド（外部からアクセス不可）、static メソッド/フィールド、static { } 静的初期化ブロック。getter/setter: get fullName() { ... }、set fullName(v) { ... } でプロパティのアクセスをカスタマイズ可能。',
    },
    {
      id: 16,
      title: 'クロージャ',
      difficulty: 'intermediate',
      description:
        'クロージャ（Closure）は関数が定義された時点のスコープを「記憶」する仕組みです。内側の関数が外側の変数を参照し続けることで、状態を保持できます。カプセル化（プライベート変数の実現）やファクトリパターンに使われ、JavaScript の最も強力な機能の一つです。React の useState や useEffect の内部実装もクロージャに基づいています。',
      task: '呼び出すたびにカウントが1ずつ増えるカウンター関数を作り、3回呼び出して結果を出力してください。',
      initialCode: '// --- Lesson 16: クロージャ ---\n// 関数がスコープを記憶する仕組み\n\nfunction createCounter() {\n  // 外側のスコープに状態を保持\n  let count = 0;\n\n  // 内側の関数がcountを参照し続ける\n  return () => {\n    // count をインクリメントして返す\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());\nconsole.log(counter());',
      solutionCode: '// --- Lesson 16: クロージャ ---\n// 関数がスコープを記憶する仕組み\n\nfunction createCounter() {\n  let count = 0;\n  return () => {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());\nconsole.log(counter());',
      expectedOutput: '1\n2\n3',
      hints: [
        '外側の関数で let count = 0 を定義',
        '内側の関数で count++ して return count',
        'count は外部から直接アクセスできない（カプセル化）',
        'React の useState の内部仕組みもクロージャです',
      ],
      explanation:
        'クロージャは関数が外側スコープの変数を参照し続ける仕組みです。createCounter() を呼ぶたびに独立したスコープが作られるため、const a = createCounter(); const b = createCounter(); は別々のカウントを持ちます。カプセル化: count は外部から直接変更できないプライベート変数として機能します。モジュールパターン: IIFE + クロージャでモジュールを作る古いパターン。React Hooks: useState, useEffect, useCallback はすべてクロージャの仕組みに基づいています。注意: ループ内のクロージャでは変数のキャプチャタイミングに注意が必要です（let ではなく var を使うと意図しない動作になる）。',
    },
    {
      id: 17,
      title: 'reduce で集計処理',
      difficulty: 'intermediate',
      description:
        'reduce は配列を1つの値に畳み込む（fold/accumulate）メソッドです。合計値、最大値、グルーピング、オブジェクト構築など多用途に使えます。reduce(callback, initialValue) の形で、callback は (累積値, 現在値, インデックス, 配列) を受け取ります。初期値は明示的に指定するのがベストプラクティスです。',
      task: 'const prices = [100, 200, 300, 400, 500] の合計を reduce で計算して出力してください。',
      initialCode: '// --- Lesson 17: reduce ---\n// 配列を1つの値に畳み込む\n\nconst prices = [100, 200, 300, 400, 500];\n\n// reduce で合計を計算（初期値 0）\nconst total = prices.reduce();\n\nconsole.log(total);',
      solutionCode: '// --- Lesson 17: reduce ---\n// 配列を1つの値に畳み込む\n\nconst prices = [100, 200, 300, 400, 500];\n\n// reduce で合計を計算（初期値 0）\nconst total = prices.reduce((sum, price) => sum + price, 0);\n\nconsole.log(total);',
      expectedOutput: '1500',
      hints: [
        'reduce((sum, price) => sum + price, 0)',
        '第1引数: コールバック (累積値, 現在値) => 新しい累積値',
        '第2引数: 初期値 0',
        '初期値を省略すると配列の最初の要素が使われます',
      ],
      explanation:
        'reduce(callback, initialValue) は左から順にcallbackを実行し、累積値を返します。初期値を省略すると配列の最初の要素が使われますが、空配列でエラーになるため明示的に指定するのがベストプラクティスです。応用例: 最大値 nums.reduce((max, n) => Math.max(max, n), -Infinity)、グルーピング、オブジェクト構築。map や filter も reduce で実装可能ですが、用途に合ったメソッドを使う方がリーダブルです。reduceRight は右から畳み込みます。パフォーマンス: 大きな配列では for ループの方が高速ですが、可読性とのトレードオフです。',
    },
    {
      id: 18,
      title: 'Map と Set',
      difficulty: 'intermediate',
      description:
        'Map はキーに任意の型を使えるコレクション、Set は重複のないユニークな値のコレクションです。Object との違いは、キーの型制限がなく（Object は文字列/Symbol のみ）、挿入順序が保証され、size プロパティで要素数を取得できる点です。WeakMap / WeakSet はキーへの弱参照を持ち、GCを妨げません。',
      task: 'const arr = [1, 2, 2, 3, 3, 3] から Set で重複を除去し、ユニークな要素数を出力してください。',
      initialCode: '// --- Lesson 18: Map と Set ---\n// Set: 重複のないコレクション\n\nconst arr = [1, 2, 2, 3, 3, 3];\n\n// Set で重複を除去\nconst unique = new Set(arr);\n\n// ユニークな要素数を出力\nconsole.log(unique.size);',
      solutionCode: '// --- Lesson 18: Map と Set ---\n// Set: 重複のないコレクション\n\nconst arr = [1, 2, 2, 3, 3, 3];\n\n// Set で重複を除去\nconst unique = new Set(arr);\n\n// ユニークな要素数を出力\nconsole.log(unique.size);',
      expectedOutput: '3',
      hints: [
        'new Set(arr) で重複が自動除去されます',
        '.size でサイズを取得（.length ではない）',
        '配列に戻すには [...unique] や Array.from(unique)',
        'Map: new Map([["key", "value"]]) でキー値ペアを管理',
      ],
      explanation:
        'Set は重複を許さないコレクションで、has(), add(), delete(), clear() メソッドを持ちます。配列の重複除去: [...new Set(arr)] が最も簡潔なパターンです。Map は任意の型をキーにでき、挿入順序が保証されます。Object との違い: キーの型制限なし、size プロパティ、for...of で反復可能、プロトタイプの汚染リスクなし。WeakMap/WeakSet はキーへの弱参照で、GC対象になります。DOMノードのメタデータ管理やプライベートデータの紐付けに使われます。',
    },
    {
      id: 19,
      title: 'エラーハンドリング — try/catch',
      difficulty: 'intermediate',
      description:
        'try/catch は実行時エラー（例外）を捕捉して、プログラムのクラッシュを防ぎます。try ブロックでエラーが発生すると catch ブロックに制御が移ります。finally は成功・失敗に関わらず常に実行されます。throw new Error("message") で意図的にエラーを投げることも可能です。カスタムエラークラスで独自の例外を定義するパターンも重要です。',
      task: 'JSON.parse を try/catch で囲み、不正なJSONを渡した場合に "Parse error" と出力してください。',
      initialCode: '// --- Lesson 19: try/catch ---\n// エラーを捕捉してクラッシュを防ぐ\n\nconst badJson = "{ invalid }";\n\n// try/catch でパースを試みる\ntry {\n  // JSON.parse を実行\n} catch (e) {\n  // エラー時のメッセージを出力\n}',
      solutionCode: '// --- Lesson 19: try/catch ---\n// エラーを捕捉してクラッシュを防ぐ\n\nconst badJson = "{ invalid }";\n\ntry {\n  JSON.parse(badJson);\n} catch (e) {\n  console.log("Parse error");\n}',
      expectedOutput: 'Parse error',
      hints: [
        'try { JSON.parse(badJson); } で実行を試みる',
        'catch (e) { console.log("Parse error"); } でエラーをキャッチ',
        'e.message でエラーメッセージが取得可能',
        'finally { ... } は常に実行されるクリーンアップ処理',
      ],
      explanation:
        'try/catch は同期コードのエラーハンドリングに使います。catch(e) の e はErrorオブジェクトで、e.message でメッセージ、e.stack でスタックトレースを取得できます。async/await と組み合わせて非同期エラーもキャッチ可能: try { await fetch(url); } catch (e) { ... }。throw new Error("custom") でカスタムエラーを投げ、class ValidationError extends Error { ... } でカスタムエラークラスを定義できます。finally はファイルのクローズやローディングUIの解除などのクリーンアップ処理に使います。Promise の .catch() はthen チェーンでのエラーハンドリングです。',
    },
    {
      id: 20,
      title: 'モジュール — import / export',
      difficulty: 'intermediate',
      description:
        'ES Modules (ESM) でコードを分割・再利用します。export で公開、import で取り込みます。名前付きエクスポート（export { a, b }）は1ファイルに複数、デフォルトエクスポート（export default）は1つだけ定義できます。Tree-Shaking（未使用コードの除去）の観点から名前付きエクスポートが推奨されます。Node.js では CommonJS (require/module.exports) もありますが、ESMに移行が進んでいます。',
      task: 'add と multiply の関数を定義し、それぞれ呼び出して結果を出力してください。',
      initialCode: '// --- Lesson 20: モジュール ---\n// import / export でコードを分割\n// 実際のプロジェクトでは別ファイルに分割します\n\n// export function add(a, b) { return a + b; }\nfunction add(a, b) {\n  return a + b;\n}\n\n// export function multiply(a, b) { return a * b; }\nfunction multiply(a, b) {\n  return a * b;\n}\n\n// import { add, multiply } from "./math";\nconsole.log(add(2, 3));\nconsole.log(multiply(4, 5));',
      solutionCode: '// --- Lesson 20: モジュール ---\nfunction add(a, b) {\n  return a + b;\n}\n\nfunction multiply(a, b) {\n  return a * b;\n}\n\nconsole.log(add(2, 3));\nconsole.log(multiply(4, 5));',
      expectedOutput: '5\n20',
      hints: [
        'export function add(a, b) で名前付きエクスポート',
        'import { add } from "./module" でインポート',
        'export default は1ファイル1つだけ',
        'import * as math from "./math" で全てインポート',
      ],
      explanation:
        'ES Modules は JavaScript の標準モジュールシステムで、静的インポート（ビルド時に解析可能）が特徴です。名前付きエクスポート: export { add, multiply }、インポート: import { add } from "./math"。デフォルトエクスポート: export default class App { }、インポート: import App from "./App"。動的インポート: const module = await import("./heavy") で遅延読み込み（コード分割）。Re-export: export { default as Button } from "./Button" で barrel ファイルを作成。CommonJS (require) と ESM (import) の互換性には注意が必要で、Node.js では package.json の "type": "module" で ESM を有効にします。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'ジェネレータ関数',
      difficulty: 'advanced',
      description:
        'function* で定義するジェネレータは yield で値を1つずつ返す遅延評価の仕組みです。イテレータプロトコル（next() メソッドを持つオブジェクト）を実装し、for...of で反復できます。無限シーケンスやストリーム処理、コルーチン（非同期処理の制御フロー）に使われます。Redux-Saga は副作用管理にジェネレータを活用しています。',
      task: '1, 2, 3 を yield するジェネレータ関数を作り、3つの値を順に出力してください。',
      initialCode: '// --- Lesson 21: ジェネレータ ---\n// function* で遅延評価シーケンスを作る\n\nfunction* numbers() {\n  // yield で値を1つずつ返す\n}\n\n// next() で値を取得\nconst gen = numbers();\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);',
      solutionCode: '// --- Lesson 21: ジェネレータ ---\n// function* で遅延評価シーケンスを作る\n\nfunction* numbers() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = numbers();\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);',
      expectedOutput: '1\n2\n3',
      hints: [
        'yield 1; yield 2; yield 3; で値を返す',
        '.next() で { value, done } を取得',
        '.value で値、.done で完了状態を確認',
        'for (const n of numbers()) { } でも反復可能',
      ],
      explanation:
        'ジェネレータは遅延評価（lazy evaluation）を実現する機能です。yield で実行を一時停止し、next() で再開します。next() は { value, done } を返し、done: true で完了を示します。無限シーケンス: function* naturals() { let n = 1; while (true) yield n++; } で無限の自然数列が作れます（必要な分だけ取得）。yield* で別のイテラブルに委譲: yield* [1, 2, 3]。next(value) で値をジェネレータに送り込むことも可能。async ジェネレータ（async function*）は非同期ストリームの処理に使われます。Redux-Saga はジェネレータで副作用（API 呼び出し等）を管理します。',
    },
    {
      id: 22,
      title: 'Proxy と Reflect',
      difficulty: 'advanced',
      description:
        'Proxy はオブジェクトの基本操作（get, set, has, delete 等）をインターセプトするメタプログラミング機能です。Reflect は Proxy のトラップに対応するメソッドを持ち、元の操作を安全に実行できます。バリデーション、ロギング、リアクティブシステム（Vue.js 3 のリアクティビティ）などに使われます。handler（トラップ）には13種類の操作があります。',
      task: 'プロパティ取得時にログを出力するProxyを作り、user.name にアクセスして "Getting name" の後に "miruky" を出力してください。',
      initialCode: '// --- Lesson 22: Proxy ---\n// オブジェクトの操作をインターセプト\n\nconst user = { name: "miruky" };\n\n// get トラップでログを出力\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    // ログを出力してから値を返す\n    // Reflect.get で元の操作を実行\n  }\n});\n\nconsole.log(proxy.name);',
      solutionCode: '// --- Lesson 22: Proxy ---\n// オブジェクトの操作をインターセプト\n\nconst user = { name: "miruky" };\n\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    console.log(`Getting ${String(prop)}`);\n    return Reflect.get(target, prop);\n  }\n});\n\nconsole.log(proxy.name);',
      expectedOutput: 'Getting name\nmiruky',
      hints: [
        'get(target, prop) でプロパティアクセスをインターセプト',
        'Reflect.get(target, prop) で元の値を取得',
        'console.log(`Getting ${String(prop)}`); でログ出力',
        'set トラップでバリデーションも実装可能',
      ],
      explanation:
        'Proxy は13種類のトラップを提供: get, set, has (in演算子), deleteProperty, apply (関数呼び出し), construct (new), getPrototypeOf, setPrototypeOf, isExtensible, preventExtensions, getOwnPropertyDescriptor, defineProperty, ownKeys。Reflect は対応するメソッドを持ち、デフォルトの操作を安全に実行します。Vue.js 3 のリアクティビティシステムは Proxy の get/set トラップで依存関係を追跡し、変更を検知します。MobX もProxyを活用。バリデーション: set トラップで値の妥当性を検証してから代入を許可できます。',
    },
    {
      id: 23,
      title: 'WeakMap とプライベートデータ',
      difficulty: 'advanced',
      description:
        'WeakMap はキーがGC対象になれる弱参照のMapです。キーはオブジェクトのみで、列挙不可能です。オブジェクトにメタデータを紐付けつつ、メモリリークを防ぐのに最適です。クラスのプライベートデータ管理、DOMノードへのデータ紐付け、キャッシュの実装に使われます。ES2022 の # プライベートフィールドが使える環境では代替手段もあります。',
      task: 'WeakMap を使ってオブジェクトにプライベートデータ(count: 0)を紐付け、カウントを1に更新して出力してください。',
      initialCode: '// --- Lesson 23: WeakMap ---\n// オブジェクトをキーにした弱参照マップ\n\nconst privateData = new WeakMap();\n\nconst obj = {};\n\n// obj にプライベートデータ {count: 0} を紐付け\nprivateData.set(obj, { count: 0 });\n\n// count を 1 に更新して出力\nprivateData.get(obj).count = 1;\nconsole.log(privateData.get(obj).count);',
      solutionCode: '// --- Lesson 23: WeakMap ---\n// オブジェクトをキーにした弱参照マップ\n\nconst privateData = new WeakMap();\n\nconst obj = {};\nprivateData.set(obj, { count: 0 });\nprivateData.get(obj).count = 1;\nconsole.log(privateData.get(obj).count);',
      expectedOutput: '1',
      hints: [
        'privateData.set(obj, { count: 0 }) で紐付け',
        'privateData.get(obj).count で値を取得/更新',
        'キーへの参照がなくなるとGCされてメモリリーク防止',
        'WeakMap は列挙不可（size, keys, values がない）',
      ],
      explanation:
        'WeakMap のキーはオブジェクトのみで、GCの弱参照です。キーとなるオブジェクトへの参照が全てなくなると、エントリは自動的にGCされます。Map との違い: WeakMap は列挙不可（size, keys(), values(), entries() がない）。用途: DOMノードへのメタデータ紐付け、クラスのプライベートデータ管理（ES2022の #field 導入前の手法）、メモ化/キャッシュ。WeakSet も同様で、オブジェクトの「所属」を判定するのに使えます。WeakRef（ES2021）は個別のオブジェクトへの弱参照を保持し、FinalizationRegistry でGC時のコールバックを登録できます。',
    },
    {
      id: 24,
      title: 'イベントループの理解',
      difficulty: 'advanced',
      description:
        'JavaScriptのイベントループは、シングルスレッドで非同期処理を実現する核心的な仕組みです。実行順序: ①コールスタック（同期コード）→ ②マイクロタスクキュー(Promise.then, queueMicrotask) → ③マクロタスク(setTimeout, setInterval)。マイクロタスクはマクロタスクより優先され、キューが空になるまで連続実行されます。この理解はJavaScriptの非同期処理の根幹です。',
      task: '以下のコードの実行順序を確認してください: 同期 → Promise → setTimeout の順で出力されます。',
      initialCode: '// --- Lesson 24: イベントループ ---\n// コールスタック → マイクロタスク → マクロタスク\n\n// ① 同期処理（最初に実行）\nconsole.log("1: sync");\n\n// ③ マクロタスク（最後に実行）\nsetTimeout(() => {\n  console.log("3: timeout");\n}, 0);\n\n// ② マイクロタスク（同期の後、マクロの前）\nPromise.resolve().then(() => {\n  console.log("2: promise");\n});',
      solutionCode: '// --- Lesson 24: イベントループ ---\nconsole.log("1: sync");\n\nsetTimeout(() => {\n  console.log("3: timeout");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("2: promise");\n});',
      expectedOutput: '1: sync\n2: promise\n3: timeout',
      hints: [
        '同期コード（console.log）が最初に実行される',
        'Promise.then はマイクロタスクキューに入る',
        'setTimeout はマクロタスクキューに入る',
        'マイクロタスクはマクロタスクより先に実行される',
      ],
      explanation:
        'イベントループの実行順序: ①コールスタック上の同期コードを全て実行 → ②マイクロタスクキュー（Promise.then, queueMicrotask, MutationObserver）を空になるまで全て実行 → ③マクロタスクキュー（setTimeout, setInterval, requestAnimationFrame, I/O）を1つ実行 → ②に戻る。setTimeout(fn, 0) でも、マイクロタスクの後になります。注意: マイクロタスクの無限ループはUIをブロックします。Node.js では process.nextTick がマイクロタスクより先に実行されます。requestAnimationFrame は描画前に実行されるため、アニメーションに適しています。',
    },
    {
      id: 25,
      title: 'カリー化と部分適用',
      difficulty: 'advanced',
      description:
        'カリー化（Currying）は複数引数の関数を、1引数ずつ受け取る関数のチェーンに変換する技法です。部分適用（Partial Application）は一部の引数を固定して新しい関数を作ります。関数の再利用性が大幅に向上し、関数合成（composition）との組み合わせが強力です。ramda, lodash/fp などの関数型ライブラリで多用されるパターンです。',
      task: 'カリー化された add 関数を作り、add(2)(3) が 5 を返すようにして出力してください。',
      initialCode: '// --- Lesson 25: カリー化 ---\n// 複数引数の関数を1引数ずつの連鎖に変換\n\n// カリー化された add 関数\n// add(2)(3) で 5 を返す\nconst add = \n\nconsole.log(add(2)(3));',
      solutionCode: '// --- Lesson 25: カリー化 ---\nconst add = (a) => (b) => a + b;\n\nconsole.log(add(2)(3));',
      expectedOutput: '5',
      hints: [
        'const add = (a) => (b) => a + b;',
        '関数を返す関数です（高階関数）',
        'const add2 = add(2); で部分適用（2を固定）',
        'add2(3) → 5, add2(10) → 12',
      ],
      explanation:
        'カリー化は関数型プログラミングの重要な概念です。add(2)(3) は add(2) が (b) => 2 + b を返し、それに 3 を渡して 5 が得られます。部分適用: const add2 = add(2) で「2を足す関数」が作れます。汎用カリー化関数: const curry = (fn) => fn.length === 0 ? fn() : (...args) => curry(fn.bind(null, ...args)) で任意の関数をカリー化可能。ポイントフリースタイル: const double = map(x => x * 2) のように引数を明示しない記述。ramda のR.curry, lodash/fp の _.curry が代表的な実装。React のイベントハンドラでもカリー化パターンが使われます: onClick={handleClick(id)}。',
    },
    {
      id: 26,
      title: 'デザインパターン — Observer',
      difficulty: 'advanced',
      description:
        'Observer パターンはあるオブジェクト（Subject）の状態変化を複数のオブジェクト（Observer）に通知する仕組みです。イベント駆動アーキテクチャの基盤で、疎結合なシステムを構築できます。Node.js の EventEmitter、ブラウザの addEventListener、React の状態管理（Redux, Zustand）など、JavaScriptのあらゆる場面で使われています。Pub/Sub パターンとも密接に関連しています。',
      task: 'subscribe/notify メソッドを持つ EventEmitter クラスを作り、"hello" イベントで "World" と出力してください。',
      initialCode: '// --- Lesson 26: Observer パターン ---\n// 状態変化を複数のリスナーに通知\n\nclass EventEmitter {\n  constructor() {\n    this.listeners = {};\n  }\n\n  // イベントにリスナーを登録\n  subscribe(event, fn) {\n    // ここに処理を書く\n  }\n\n  // イベントを発火して全リスナーに通知\n  notify(event, data) {\n    // ここに処理を書く\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.subscribe("hello", (data) => console.log(data));\nemitter.notify("hello", "World");',
      solutionCode: '// --- Lesson 26: Observer パターン ---\nclass EventEmitter {\n  constructor() {\n    this.listeners = {};\n  }\n\n  subscribe(event, fn) {\n    if (!this.listeners[event]) this.listeners[event] = [];\n    this.listeners[event].push(fn);\n  }\n\n  notify(event, data) {\n    if (this.listeners[event]) {\n      this.listeners[event].forEach(fn => fn(data));\n    }\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.subscribe("hello", (data) => console.log(data));\nemitter.notify("hello", "World");',
      expectedOutput: 'World',
      hints: [
        'subscribe: this.listeners[event] に fn を push',
        'notify: this.listeners[event].forEach(fn => fn(data))',
        'リスナーがなければ初期化: if (!this.listeners[event]) this.listeners[event] = []',
        'unsubscribe も実装すると完全なパターンになります',
      ],
      explanation:
        'Observer パターンは疎結合な通知システムを実現するGoFデザインパターンです。Subject（発行者）は Observer（購読者）の具体的な実装を知る必要がなく、依存関係が逆転します。Node.js の EventEmitter は on/emit メソッドで同じパターンを提供。ブラウザの addEventListener/removeEventListener も Observer パターン。Redux: subscribe/dispatch で状態変化を通知。RxJS の Observable はObserverパターンの強力な拡張で、ストリーム処理を可能にします。unsubscribe（購読解除）を忘れるとメモリリークの原因になります。',
    },
    {
      id: 27,
      title: 'Symbol とイテレータプロトコル',
      difficulty: 'advanced',
      description:
        'Symbol はユニークで不変な値を作るプリミティブ型です。プロパティキーの衝突を防ぎ、メタプログラミングの基盤となります。Symbol.iterator を実装すると for...of で反復可能なオブジェクト（イテラブル）を作れます。Well-known Symbols（Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance 等）は言語の振る舞いをカスタマイズする手段です。',
      task: '1〜3を返すカスタムイテラブルオブジェクトを作り、for...of で値を出力してください。',
      initialCode: '// --- Lesson 27: Symbol とイテレータ ---\n// Symbol.iterator でカスタムイテラブルを作る\n\nconst range = {\n  [Symbol.iterator]() {\n    let current = 1;\n    return {\n      next() {\n        // current が 3 以下なら値を返す\n        // 4 以上なら done: true\n      }\n    };\n  }\n};\n\nfor (const n of range) {\n  console.log(n);\n}',
      solutionCode: '// --- Lesson 27: Symbol とイテレータ ---\nconst range = {\n  [Symbol.iterator]() {\n    let current = 1;\n    return {\n      next() {\n        if (current <= 3) {\n          return { value: current++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n\nfor (const n of range) {\n  console.log(n);\n}',
      expectedOutput: '1\n2\n3',
      hints: [
        '{ value: current++, done: false } で値を返す',
        '{ value: undefined, done: true } で反復終了',
        'イテラブル: Symbol.iterator メソッドを持つオブジェクト',
        'Array, Map, Set, String はすべてイテラブル',
      ],
      explanation:
        'イテレータプロトコル: next() メソッドが { value, done } を返すオブジェクト。イテラブルプロトコル: Symbol.iterator メソッドがイテレータを返すオブジェクト。for...of, スプレッド構文, 分割代入, Promise.all 等がイテラブルを消費します。Array, Map, Set, String は全てイテラブルです。Well-known Symbols: Symbol.toPrimitive で型変換をカスタマイズ、Symbol.hasInstance で instanceof をカスタマイズ。ジェネレータ (function*) は自動的にイテレータプロトコルを実装するため、カスタムイテラブルをより簡潔に書けます。',
    },
    {
      id: 28,
      title: 'Promise.allSettled と並行処理',
      difficulty: 'advanced',
      description:
        'Promise の並行処理メソッドは用途に応じて使い分けます。Promise.all: 全て成功で解決、1つ失敗で即reject。Promise.allSettled: 全完了を待ち、各結果の status を返す。Promise.race: 最初に解決/拒否されたもの。Promise.any: 最初に成功したもの（全失敗で AggregateError）。それぞれ複数のAPI呼び出しの制御に使われます。',
      task: '成功する Promise と失敗する Promise を allSettled で処理し、各結果の status を出力してください。',
      initialCode: '// --- Lesson 28: Promise.allSettled ---\n// 全ての Promise の結果を取得する\n\nconst p1 = Promise.resolve("OK");\nconst p2 = Promise.reject("Error");\n\n// allSettled で全結果を取得\nPromise.allSettled([p1, p2]).then((results) => {\n  // 各結果の status を出力\n  results.forEach(r => console.log(r.status));\n});',
      solutionCode: '// --- Lesson 28: Promise.allSettled ---\nconst p1 = Promise.resolve("OK");\nconst p2 = Promise.reject("Error");\n\nPromise.allSettled([p1, p2]).then((results) => {\n  results.forEach(r => console.log(r.status));\n});',
      expectedOutput: 'fulfilled\nrejected',
      hints: [
        'Promise.allSettled は全て完了を待つ',
        '成功: { status: "fulfilled", value: "OK" }',
        '失敗: { status: "rejected", reason: "Error" }',
        'Promise.all は1つでも失敗すると即 reject',
      ],
      explanation:
        'Promise.allSettled は全ての Promise が確定（fulfilled or rejected）するまで待ちます。結果は { status, value/reason } の配列で、成功/失敗を個別に処理できます。Promise.all: 1つでも失敗すると即 reject。全成功が前提の場合に使用（例: 必須データの並列取得）。Promise.race: 最初に決着したもの（タイムアウト実装: Promise.race([fetch(url), timeout(5000)])）。Promise.any: 最初に成功したもの（フォールバック: ミラーサーバー等）。全失敗で AggregateError。実務では並列API呼び出しの制御に頻繁に使われます。',
    },
    {
      id: 29,
      title: 'メモ化関数の実装',
      difficulty: 'advanced',
      description:
        'メモ化（Memoization）は同じ引数での関数呼び出し結果をキャッシュし、再計算を省略するパフォーマンス最適化手法です。純粋関数（同じ入力に対して常に同じ出力を返す関数）にのみ適用可能です。フィボナッチ数列の計算、APIレスポンスのキャッシュなどに有用です。React の useMemo, useCallback もメモ化の一種です。',
      task: '汎用メモ化関数 memoize を実装し、2回目の呼び出しで "computing..." が出力されないことを確認してください。',
      initialCode: '// --- Lesson 29: メモ化 ---\n// 同じ引数の結果をキャッシュする高階関数\n\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    // キャッシュにあればそれを返す\n    // なければ計算してキャッシュに保存\n  };\n}\n\nconst double = memoize((n) => {\n  console.log("computing...");\n  return n * 2;\n});\n\nconsole.log(double(5));\nconsole.log(double(5));',
      solutionCode: '// --- Lesson 29: メモ化 ---\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst double = memoize((n) => {\n  console.log("computing...");\n  return n * 2;\n});\n\nconsole.log(double(5));\nconsole.log(double(5));',
      expectedOutput: 'computing...\n10\n10',
      hints: [
        'cache.has(key) でキャッシュの存在を確認',
        '存在すれば cache.get(key) を返す',
        'なければ fn(...args) を実行し cache.set で保存',
        'JSON.stringify(args) を Map のキーに使う',
      ],
      explanation:
        'メモ化は「同じ計算を2度しない」ための最適化テクニックです。純粋関数にのみ適用可能（副作用がある関数には不適切）。キャッシュキー: JSON.stringify(args) はシンプルですが、オブジェクト引数の順序に依存する制限があります。キャッシュの肥大化対策: LRU（Least Recently Used）キャッシュの導入を検討。React の useMemo(fn, deps) は依存配列が変わった時のみ再計算するメモ化。useCallback(fn, deps) は関数オブジェクトのメモ化。lodash の _.memoize、WeakMap ベースのオブジェクトキャッシュなど、用途に応じた実装があります。',
    },
    {
      id: 30,
      title: '関数型パイプラインの構築',
      difficulty: 'advanced',
      description:
        '小さな純粋関数を組み合わせてデータを変換するパイプライン（pipe）は、関数型プログラミングの真髄です。各関数が単一責任で、テスト可能、再利用可能な部品として機能します。TC39 の Pipeline Operator（|>）提案（Stage 2）が正式採用されれば、さらに読みやすくなります。Unix のパイプ（ls | grep | sort）と同じ哲学です。',
      task: 'pipe 関数を実装し、数値を2倍 → 3を足す → 文字列化するパイプラインを作って 5 に適用してください。',
      initialCode: '// --- Lesson 30: 関数型パイプライン ---\n// 小さな関数を合成してデータを変換\n\n// pipe: 関数を左から順に適用する合成関数\nconst pipe = (...fns) => {\n  // reduce で関数を左から順に適用\n};\n\n// 各ステップの関数\nconst double = (n) => n * 2;\nconst addThree = (n) => n + 3;\nconst toString = (n) => `Result: ${n}`;\n\n// パイプラインを構築\nconst transform = pipe(double, addThree, toString);\nconsole.log(transform(5));',
      solutionCode: '// --- Lesson 30: 関数型パイプライン ---\nconst pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);\n\nconst double = (n) => n * 2;\nconst addThree = (n) => n + 3;\nconst toString = (n) => `Result: ${n}`;\n\nconst transform = pipe(double, addThree, toString);\nconsole.log(transform(5));',
      expectedOutput: 'Result: 13',
      hints: [
        '(x) => fns.reduce((v, fn) => fn(v), x)',
        'reduce で左から順に関数を適用',
        '5 → double(5)=10 → addThree(10)=13 → toString(13)="Result: 13"',
        'compose は右から適用: (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x)',
      ],
      explanation:
        'pipe は関数合成の基本パターンで、データを左から右に変換します。5 → double(5)=10 → addThree(10)=13 → toString(13)="Result: 13"。compose は逆順（右から左）で、数学の関数合成 f∘g に対応します。単一責任の小さな関数を組み合わせることで、テストしやすく可読性の高いコードが書けます（SRP: Single Responsibility Principle）。TC39 Pipeline Operator 提案: x |> double |> addThree |> toString という記法が検討中。ramda の R.pipe, R.compose、lodash/fp の _.flow が代表的な実装。関数型リアクティブプログラミング（FRP）の RxJS でも pipe が核心的なAPIです。',
    },
  ],
};

export default course;
