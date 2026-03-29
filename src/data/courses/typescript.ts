import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'typescript',
  name: 'TypeScript',
  nameJa: 'TypeScript',
  simpleIconSlug: 'typescript',
  color: '#3178C6',
  description: 'JavaScriptに型安全性を加えた言語。大規模開発の必須スキルです。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'Hello TypeScript',
      difficulty: 'beginner',
      description:
        'TypeScript は Microsoft が開発した JavaScript のスーパーセットです。静的型付けを追加することで、大規模プロジェクトの品質と生産性を大幅に向上させます。.ts ファイルに書いたコードは、tsc（TypeScript Compiler）で .js に変換（トランスパイル）してから実行します。console.log() で値を出力できます。正しい JavaScript はすべて有効な TypeScript なので、段階的に移行できるのが強みです。',
      task: 'console.log() を使って1行目に「Hello, TypeScript!」、2行目に「Type-safe JavaScript!」と出力してください。',
      initialCode: '// --- Lesson 1: Hello TypeScript ---\n// console.log() で文字列を出力します\n// TypeScript は JavaScript のスーパーセットです\n\n// 1行目: Hello, TypeScript! を出力\n\n\n// 2行目: Type-safe JavaScript! を出力\n',
      solutionCode: '// --- Lesson 1: Hello TypeScript ---\n// console.log() で文字列を出力します\n// TypeScript は JavaScript のスーパーセットです\n\n// 1行目: Hello, TypeScript! を出力\nconsole.log("Hello, TypeScript!");\n\n// 2行目: Type-safe JavaScript! を出力\nconsole.log("Type-safe JavaScript!");',
      expectedOutput: 'Hello, TypeScript!\nType-safe JavaScript!',
      hints: [
        'console.log() の括弧の中に文字列を入れます',
        '文字列はダブルクォート "" で囲みます',
        'console.log() は JavaScript と同じ出力メソッドです',
        '答え: console.log("Hello, TypeScript!"); と console.log("Type-safe JavaScript!");',
      ],
      explanation:
        'TypeScript のコードは tsc（TypeScript Compiler）で JavaScript に変換されてから実行されます。console.log() は JavaScript と同じ出力メソッドです。TypeScript は JavaScript のスーパーセットなので、正しい JavaScript コードはすべて TypeScript でも動作します。tsconfig.json でコンパイラオプション（target, module, strict 等）を設定します。strict: true を有効にすると、strictNullChecks, noImplicitAny など厳格なチェックが一括で有効になり、バグの早期発見に繋がります。TypeScript は現在、React, Angular, Vue.js, Next.js など主要フレームワークで事実上の標準となっています。',
    },
    {
      id: 2,
      title: '型アノテーション — 基本型',
      difficulty: 'beginner',
      description:
        'TypeScript の最大の特徴は型アノテーション（型注釈）です。変数名の後に : 型名 を付けて型を指定します。基本型（プリミティブ型）は string, number, boolean の3つです。number は整数も小数も含む数値型で、JavaScript の特性を引き継いでいます。型が合わないとコンパイルエラーになり、実行前にバグを発見できます。TypeScript は「型推論」も強力で、初期化時に値があれば自動で型が決定されますが、関数の引数など推論が効かない場面では明示的な型アノテーションが必要です。',
      task: '変数 language に string 型で "TypeScript"、version に number 型で 5.4、isStrict に boolean 型で true を代入し、すべて出力してください。',
      initialCode: '// --- Lesson 2: 型アノテーション ---\n// 変数名: 型名 = 値; で型を指定します\n\n// 文字列型 (string)\nconst language: string = \n\n// 数値型 (number) — 整数も小数も同じ number\nconst version: number = \n\n// 真偽値型 (boolean)\nconst isStrict: boolean = \n\n// 各変数を出力\nconsole.log(language);\nconsole.log(version);\nconsole.log(isStrict);',
      solutionCode: '// --- Lesson 2: 型アノテーション ---\n// 変数名: 型名 = 値; で型を指定します\n\n// 文字列型 (string)\nconst language: string = "TypeScript";\n\n// 数値型 (number) — 整数も小数も同じ number\nconst version: number = 5.4;\n\n// 真偽値型 (boolean)\nconst isStrict: boolean = true;\n\n// 各変数を出力\nconsole.log(language);\nconsole.log(version);\nconsole.log(isStrict);',
      expectedOutput: 'TypeScript\n5.4\ntrue',
      hints: [
        'const language: string = "TypeScript"; のように書きます',
        'number は整数 (5) も小数 (5.4) も含みます',
        'boolean は true または false です',
        '型推論があるため const name = "TS" だけでも string と推論されます',
      ],
      explanation:
        '型アノテーションにより、開発時にコンパイラがエラーを検出します。たとえば const age: number = "abc" はコンパイルエラーになります。TypeScript は「型推論」も強力で、const name = "TypeScript" と書くだけで string 型と推論されます（さらにリテラル型 "TypeScript" として推論）。let で宣言すると string 型に拡大されます。undefined と null は独立した型があり、strictNullChecks を有効にすると、string 型に null を代入できなくなります。基本型以外に、any（型チェックの無効化）、unknown（安全な any）、void、never もあります。',
    },
    {
      id: 3,
      title: '配列とタプル',
      difficulty: 'beginner',
      description:
        '配列は number[] または Array<number> の2通りで型指定できます。number[] の書き方が一般的です。タプルは固定長で各要素の型が決まった配列で、[string, number] のように定義します。配列は同じ型の可変長、タプルは異なる型の固定長という違いがあります。readonly 修飾子を付けると不変な配列/タプルを作れます: readonly number[]。TypeScript 4.0 以降、可変長タプル型（...T[]）もサポートされています。',
      task: 'number 型の配列 scores に [85, 92, 78] を定義し、[string, number, boolean] のタプル profile に ["太郎", 20, true] を定義して、それぞれ出力してください。',
      initialCode: '// --- Lesson 3: 配列とタプル ---\n// 配列: 型[] またタプル: [型1, 型2, ...]\n\n// number 型の配列\nconst scores: number[] = \n\n// 3要素のタプル [名前, 年齢, アクティブ]\nconst profile: [string, number, boolean] = \n\nconsole.log(scores);\nconsole.log(profile);',
      solutionCode: '// --- Lesson 3: 配列とタプル ---\n// 配列: 型[] またタプル: [型1, 型2, ...]\n\n// number 型の配列\nconst scores: number[] = [85, 92, 78];\n\n// 3要素のタプル [名前, 年齢, アクティブ]\nconst profile: [string, number, boolean] = ["太郎", 20, true];\n\nconsole.log(scores);\nconsole.log(profile);',
      expectedOutput: '85,92,78\n太郎,20,true',
      hints: [
        '配列: const scores: number[] = [85, 92, 78];',
        'タプル: const profile: [string, number, boolean] = ["太郎", 20, true];',
        'タプルは要素の順序と型が固定されています',
        'readonly number[] で読み取り専用の配列を定義できます',
      ],
      explanation:
        '配列とタプルの違いは重要です。配列は同じ型の要素を可変長で持ち、push/pop が可能です。タプルは異なる型の要素を固定長で持ち、各位置の型が決まっています。タプルの分割代入も可能: const [name, age] = profile; 。readonly 修飾子: readonly number[] は push/pop 等ができない不変配列になります。TypeScript 4.0 以降、可変長タプル [...T, string] で先頭が任意の型、末尾が string というパターンも表現できます。as const アサーションを付けると、配列がリテラル型のタプルとして推論されます。',
    },
    {
      id: 4,
      title: 'オブジェクト型と interface',
      difficulty: 'beginner',
      description:
        'interface はオブジェクトの形状（shape）を定義する TypeScript の中核概念です。プロパティ名と型を指定し、? を付けるとオプショナル（省略可能）になります。interface は「型の契約」であり、オブジェクトがその形状を持つことを保証します。TypeScript は「構造的型付け」(Structural Typing) を採用しており、同じプロパティを持つオブジェクトは互換性があります。interface は宣言マージ（同名の interface を複数定義するとプロパティが統合される）が可能で、ライブラリの型拡張に利用されます。',
      task: 'name: string、age: number、email?: string（オプショナル）を持つ User interface を定義し、email なしの User オブジェクトを作成して name を出力してください。',
      initialCode: '// --- Lesson 4: interface ---\n// オブジェクトの形状（shape）を定義する\n\n// User interface を定義\n// email はオプショナル（?付き）\n\n\n// email を省略して User オブジェクトを作成\nconst user: User = { name: "太郎", age: 25 };\nconsole.log(user.name);',
      solutionCode: '// --- Lesson 4: interface ---\n// オブジェクトの形状（shape）を定義する\n\n// User interface を定義\n// email はオプショナル（?付き）\ninterface User {\n  name: string;\n  age: number;\n  email?: string;\n}\n\n// email を省略して User オブジェクトを作成\nconst user: User = { name: "太郎", age: 25 };\nconsole.log(user.name);',
      expectedOutput: '太郎',
      hints: [
        'interface User { ... } で定義します',
        'プロパティは name: string; のように書きます',
        '? でオプショナル: email?: string;',
        '構造的型付けにより、同じ形状のオブジェクトは互換性があります',
      ],
      explanation:
        'interface は TypeScript の中核概念で、「構造的型付け」(Structural Typing / Duck Typing) に基づいています。interface と同じプロパティを持つオブジェクトは、明示的に implements しなくても互換性があります。type エイリアスでも同様のことができますが、interface は宣言マージが可能です。一般的にオブジェクトの形状定義には interface、Union型や交差型には type を使い分けます。readonly 修飾子: readonly name: string で読み取り専用プロパティ。extends によるインターフェースの継承: interface Admin extends User { role: string; }。',
    },
    {
      id: 5,
      title: '関数の型付け',
      difficulty: 'beginner',
      description:
        '関数の引数と戻り値に型を付けると、呼び出し側で型の誤りを検出できます。引数: (a: number, b: number)、戻り値: : number で指定します。void は「何も返さない」、never は「絶対にreturnしない」（例外を投げる等）を意味します。デフォルト引数は (name: string = "World") で、オプショナル引数は (name?: string) で定義します。アロー関数でも同様に型付け可能です。関数型はコールバックの型定義でも重要になります。',
      task: '2つの number を受け取り合計を返す add 関数と、メッセージを出力する（何も返さない）greet 関数を定義してください。',
      initialCode: '// --- Lesson 5: 関数の型付け ---\n// 引数と戻り値に型アノテーションを付ける\n\n// 2つの数値を加算する関数\nfunction add(a: number, b: number): number {\n  // ここに処理を書く\n}\n\n// 挨拶を出力する関数（戻り値なし）\nfunction greet(name: string): void {\n  // ここに処理を書く\n}\n\nconsole.log(add(10, 25));\ngreet("TypeScript");',
      solutionCode: '// --- Lesson 5: 関数の型付け ---\n// 引数と戻り値に型アノテーションを付ける\n\n// 2つの数値を加算する関数\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// 挨拶を出力する関数（戻り値なし）\nfunction greet(name: string): void {\n  console.log(`Hello, ${name}!`);\n}\n\nconsole.log(add(10, 25));\ngreet("TypeScript");',
      expectedOutput: '35\nHello, TypeScript!',
      hints: [
        'add は return a + b; で値を返します',
        'greet は console.log() で出力のみ（return なし）',
        'void は「何も返さない」を表す型です',
        'アロー関数: const add = (a: number, b: number): number => a + b;',
      ],
      explanation:
        '関数の戻り値型は省略可能（型推論される）ですが、public な API や複雑な関数では明示的に書くことが推奨されます。void は console.log のような副作用のある関数で使います。never は throw new Error() のように絶対にreturnしない関数で使います。関数型の別名定義: type MathFn = (a: number, b: number) => number。オーバーロード: function parse(input: string): number; function parse(input: number): string; のように複数の呼び出しシグネチャを定義できます。rest パラメータも型付け可能: (...args: number[]) => number。',
    },
    {
      id: 6,
      title: 'Union型とリテラル型',
      difficulty: 'beginner',
      description:
        'Union型 (A | B) は「AまたはB」を表します。リテラル型は特定の値だけを許可する型で、"success" のような具体的な値が型になります。Union型とリテラル型を組み合わせると、許可される値を厳密に制限できます（discriminated union の基礎になる概念）。この組み合わせは enum の代替として広く使われ、より型安全で Tree-Shakeable（未使用コードの除去が容易）です。TypeScript のコアな機能の一つです。',
      task: '"success" | "error" | "loading" の Status 型を定義し、Status 型の変数2つに "success" と "loading" を代入してそれぞれ出力してください。',
      initialCode: '// --- Lesson 6: Union型とリテラル型 ---\n// | で複数の型候補を定義する\n\n// Status 型を定義（3つのリテラル値のUnion）\n\n\n// Status 型の変数を作成\nconst status1: Status = \nconst status2: Status = \n\nconsole.log(status1);\nconsole.log(status2);',
      solutionCode: '// --- Lesson 6: Union型とリテラル型 ---\n// | で複数の型候補を定義する\n\n// Status 型を定義（3つのリテラル値のUnion）\ntype Status = "success" | "error" | "loading";\n\n// Status 型の変数を作成\nconst status1: Status = "success";\nconst status2: Status = "loading";\n\nconsole.log(status1);\nconsole.log(status2);',
      expectedOutput: 'success\nloading',
      hints: [
        'type Status = "success" | "error" | "loading"; と定義します',
        'Union型は | で区切って型を並べます',
        'リテラル型は具体的な値を型として使います',
        '"invalid" は Status 型に含まれないためコンパイルエラーになります',
      ],
      explanation:
        'リテラル型とUnion型の組み合わせは、TypeScriptで最も頻繁に使われるパターンの一つです。文字列リテラルのUnion型は enum の代替として使われ、より型安全で軽量です。API レスポンスのステータスや状態管理に最適です。数値リテラル型 (1 | 2 | 3) やテンプレートリテラル型 (`on${string}`) も可能です。Union型の変数を使う際は、typeof や in 演算子で型を絞り込む「ナローイング」が必要になります（次のレッスンで学びます）。Union型はnull/undefined の表現にも使われ、strictNullChecks下では string | null のように明示する必要があります。',
    },
    {
      id: 7,
      title: 'Type Alias（型エイリアス）',
      difficulty: 'beginner',
      description:
        'type キーワードで型に名前（エイリアス）を付けられます。複雑な型定義に名前を付けることで、コードの可読性と再利用性が大幅に向上します。interface との違いは、Union型やプリミティブ型にも名前を付けられる点です。type は宣言マージができない（同名の再定義はエラー）ため、ライブラリの型拡張には向きませんが、ユーザーランドのコードでは type が好まれることも多いです。',
      task: 'ID 型を string | number のUnion型として定義し、複合型 Coordinate として [number, number] タプルを定義してください。それぞれの変数を作成して出力してください。',
      initialCode: '// --- Lesson 7: Type Alias ---\n// type で型に名前を付ける\n\n// ID はstring か number\ntype ID = \n\n// Coordinate は2要素の数値タプル\ntype Coordinate = \n\nconst userId: ID = 42;\nconst point: Coordinate = [10, 20];\n\nconsole.log(userId);\nconsole.log(point);',
      solutionCode: '// --- Lesson 7: Type Alias ---\n// type で型に名前を付ける\n\n// ID はstring か number\ntype ID = string | number;\n\n// Coordinate は2要素の数値タプル\ntype Coordinate = [number, number];\n\nconst userId: ID = 42;\nconst point: Coordinate = [10, 20];\n\nconsole.log(userId);\nconsole.log(point);',
      expectedOutput: '42\n10,20',
      hints: [
        'type ID = string | number; で Union型のエイリアス',
        'type Coordinate = [number, number]; でタプルのエイリアス',
        'type は Union, タプル, 関数型など何でも名前を付けられます',
        'interface との使い分け: オブジェクト型は interface、それ以外は type',
      ],
      explanation:
        'type alias は宣言マージができない（同名の再定義はエラー）点が interface との違いです。一般的に、オブジェクトの形状定義には interface、Union型やプリミティブの別名、タプルには type を使い分けます。型の命名は PascalCase が慣例です。type は Mapped Types や Conditional Types の結果にも名前を付けられるため、高度な型操作では type が多用されます。type StringOrNumber = string | number のように、長い型定義に短い名前を付けて可読性を高めるのが主な用途です。',
    },
    {
      id: 8,
      title: 'Enum と as const',
      difficulty: 'beginner',
      description:
        'Enum（列挙型）は名前付き定数の集合を定義します。数値 Enum はデフォルトで0から自動連番、文字列 Enum は各値を明示的に指定します。const enum にするとコンパイル時にインライン化されパフォーマンスが向上します。ただし、現代の TypeScript では as const + typeof パターンが Enum の代替として好まれることがあります。as const はオブジェクトを全プロパティ readonly のリテラル型として推論させます。',
      task: '文字列 Enum Direction に Up="UP", Down="DOWN", Left="LEFT", Right="RIGHT" を定義し、Direction.Up と Direction.Right を出力してください。',
      initialCode: '// --- Lesson 8: Enum ---\n// 名前付き定数の集合を定義する\n\n// Direction を文字列 Enum で定義\n\n\nconsole.log(Direction.Up);\nconsole.log(Direction.Right);',
      solutionCode: '// --- Lesson 8: Enum ---\n// 名前付き定数の集合を定義する\n\n// Direction を文字列 Enum で定義\nenum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT",\n}\n\nconsole.log(Direction.Up);\nconsole.log(Direction.Right);',
      expectedOutput: 'UP\nRIGHT',
      hints: [
        'enum Direction { Up = "UP", ... } で文字列 Enum を定義',
        '文字列 Enum は各メンバーに値を明示的に指定する必要があります',
        'Direction.Up で値 "UP" にアクセスします',
        'as const 代替: const Direction = { Up: "UP", ... } as const',
      ],
      explanation:
        '文字列 Enum は値が明確でデバッグしやすいです。しかし、リテラル型のUnion ("UP" | "DOWN" | "LEFT" | "RIGHT") で代替可能です。現代のTypeScriptでは、as const + typeof パターンが好まれます: const Direction = { Up: "UP", Down: "DOWN" } as const; type Direction = typeof Direction[keyof typeof Direction]; 。このパターンは Tree-Shakeable で、JavaScriptの実行時オブジェクトとしてもアクセス可能です。数値 Enum はリバースマッピング（Direction[0] → "Up"）が使えますが、文字列 Enum にはこの機能はありません。',
    },
    {
      id: 9,
      title: 'テンプレートリテラルと型',
      difficulty: 'beginner',
      description:
        'JavaScript のテンプレートリテラル（`${式}`）は TypeScript でも使えます。バッククォートで囲み、${} 内に変数や式を埋め込みます。文字列結合 (+) よりも可読性が高く、複数行の文字列にも対応しています。TypeScript ではさらにテンプレートリテラル「型」も定義でき（TypeScript 4.1+）、文字列パターンの型安全性を確保できます。',
      task: '変数 name, age, city を使って、テンプレートリテラルで「太郎 (25歳) - Tokyo」と出力してください。',
      initialCode: '// --- Lesson 9: テンプレートリテラル ---\n// `${}` で変数や式を文字列に埋め込む\n\nconst name: string = "太郎";\nconst age: number = 25;\nconst city: string = "Tokyo";\n\n// テンプレートリテラルで整形して出力\nconsole.log();',
      solutionCode: '// --- Lesson 9: テンプレートリテラル ---\n// `${}` で変数や式を文字列に埋め込む\n\nconst name: string = "太郎";\nconst age: number = 25;\nconst city: string = "Tokyo";\n\n// テンプレートリテラルで整形して出力\nconsole.log(`${name} (${age}歳) - ${city}`);',
      expectedOutput: '太郎 (25歳) - Tokyo',
      hints: [
        'バッククォート ` で囲みます',
        '変数は ${name} の形で埋め込みます',
        '`${name} (${age}歳) - ${city}` と書きます',
        '${} 内では計算式も使えます: ${age + 1}',
      ],
      explanation:
        'テンプレートリテラルは ES2015(ES6) で導入された機能で、文字列連結 (+) よりも可読性が高いです。複数行の文字列もそのまま書けます。${} の中では任意の式が使えます: ${2 + 3}, ${user.name.toUpperCase()}, ${condition ? "Y" : "N"} など。TypeScript 4.1 以降では型レベルでも活用可能で、type EventName = `on${string}` のようにパターンを型として定義でき、on で始まる文字列だけを受け付ける型が作れます。Tagged Template Literals と組み合わせるとDSLも構築可能です。',
    },
    {
      id: 10,
      title: '型の絞り込み（Narrowing）',
      difficulty: 'beginner',
      description:
        'TypeScript は条件分岐の中で型を自動的に絞り込みます（Narrowing）。typeof, instanceof, in 演算子、=== null チェック等で型を判定すると、そのブランチ内では型が確定します。これにより Union型を安全に扱えます。Narrowing は TypeScript の最も重要な機能の一つで、「型を知らない」状態から「型が確定した」状態への遷移をコンパイラが追跡します。',
      task: 'string | number | boolean 型の引数を受け取り、string なら文字数、number なら2倍、boolean なら "Yes"/"No" を返す関数を作ってください。',
      initialCode: '// --- Lesson 10: 型の絞り込み ---\n// typeof で Union型を安全に処理する\n\nfunction describe(input: string | number | boolean): string {\n  // typeof で型を判定して処理\n  // string → 文字数, number → 2倍, boolean → "Yes"/"No"\n}\n\nconsole.log(describe("hello"));\nconsole.log(describe(21));\nconsole.log(describe(true));',
      solutionCode: '// --- Lesson 10: 型の絞り込み ---\n// typeof で Union型を安全に処理する\n\nfunction describe(input: string | number | boolean): string {\n  if (typeof input === "string") {\n    return `Length: ${input.length}`;\n  } else if (typeof input === "number") {\n    return `Double: ${input * 2}`;\n  } else {\n    return input ? "Yes" : "No";\n  }\n}\n\nconsole.log(describe("hello"));\nconsole.log(describe(21));\nconsole.log(describe(true));',
      expectedOutput: 'Length: 5\nDouble: 42\nYes',
      hints: [
        'typeof input === "string" で string ブランチに入ります',
        'string ブランチでは .length が使えます',
        'else ブランチでは自動的に boolean に絞り込まれます',
        '三項演算子 input ? "Yes" : "No" で boolean を変換',
      ],
      explanation:
        '型の絞り込み（Narrowing）はTypeScriptの最も重要な機能の一つです。typeof は "string", "number", "boolean", "object", "function", "undefined", "bigint", "symbol" を判定できます。instanceof はクラスのインスタンス判定、"prop" in obj はプロパティの存在チェックでナローイングが起きます。else ブランチでは、チェック済みの型が除外された残りの型になります（ここでは boolean）。strictNullChecks 下では value !== null のチェックも重要なナローイングです。カスタム型ガード関数（次のレッスンで詳しく学びます）を使うと、より複雑なナローイングも可能です。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: 'ジェネリクスの基礎',
      difficulty: 'intermediate',
      description:
        'ジェネリクス（Generics）は型をパラメータ化する仕組みで、TypeScript の最重要概念の一つです。<T> で型変数を宣言し、呼び出し時に具体的な型が決定されます（通常は型推論で自動）。any を使うと型安全性が失われますが、ジェネリクスなら型情報を保持したまま汎用的なコードが書けます。Array<T>, Promise<T>, Map<K, V> など多くの標準型がジェネリクスを使っています。',
      task: '任意の型 T の配列の最初の要素を返すジェネリック関数 first<T> を定義し、数値配列と文字列配列で使ってください。空配列の場合は undefined を返してください。',
      initialCode: '// --- Lesson 11: ジェネリクス ---\n// <T> で型をパラメータ化する\n\n// ジェネリック関数 first を定義\n// 配列の最初の要素を返す（空の場合は undefined）\nfunction first<T>(arr: T[]): T | undefined {\n  // ここに処理を書く\n}\n\nconsole.log(first([1, 2, 3]));\nconsole.log(first(["a", "b", "c"]));',
      solutionCode: '// --- Lesson 11: ジェネリクス ---\n// <T> で型をパラメータ化する\n\n// ジェネリック関数 first を定義\n// 配列の最初の要素を返す（空の場合は undefined）\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconsole.log(first([1, 2, 3]));\nconsole.log(first(["a", "b", "c"]));',
      expectedOutput: '1\na',
      hints: [
        'function first<T>(arr: T[]): T | undefined { ... }',
        'arr[0] で最初の要素を返します',
        '<T> が型パラメータで、呼び出し時に自動推論されます',
        'first([1,2,3]) → T=number, first(["a","b"]) → T=string',
      ],
      explanation:
        'ジェネリクスは「型安全なコンテナ/関数」を作る仕組みです。first([1,2,3]) では T=number と推論され、戻り値は number | undefined です。any を使うと型情報が失われますが、ジェネリクスなら入力と出力の型が連動します。型引数は通常 T, U, K, V などの1文字ですが、TItem, TKey のように意味のある名前を付けるとより読みやすくなります。複数の型パラメータも可能: function map<T, U>(arr: T[], fn: (item: T) => U): U[]。React の useState<T> や useMemo<T> もジェネリクスの実例です。',
    },
    {
      id: 12,
      title: 'ジェネリック制約（extends）',
      difficulty: 'intermediate',
      description:
        'ジェネリック型に制約を付けると、特定のプロパティやメソッドを持つ型のみを受け付けられます。<T extends 条件> で制約を定義します。制約がないと T のプロパティにアクセスできません（any と同じ扱いにならないように）。extends は「少なくともその型と互換性がある」ことを要求し、SOLID 原則のリスコフの置換原則にも通じる概念です。',
      task: 'length プロパティ（number型）を持つ任意の型のみを受け付ける getLength 関数と、id プロパティ（number型）を持つ型のみを受け付ける getId 関数を定義してください。',
      initialCode: '// --- Lesson 12: ジェネリック制約 ---\n// <T extends 条件> で型パラメータに制約を付ける\n\n// length を持つ型のみ受け付ける\nfunction getLength<T extends { length: number }>(item: T): number {\n  // ここに処理を書く\n}\n\n// id を持つ型のみ受け付ける\nfunction getId<T extends { id: number }>(item: T): number {\n  // ここに処理を書く\n}\n\nconsole.log(getLength("hello"));\nconsole.log(getLength([1, 2, 3]));\nconsole.log(getId({ id: 42, name: "Test" }));',
      solutionCode: '// --- Lesson 12: ジェネリック制約 ---\n// <T extends 条件> で型パラメータに制約を付ける\n\n// length を持つ型のみ受け付ける\nfunction getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}\n\n// id を持つ型のみ受け付ける\nfunction getId<T extends { id: number }>(item: T): number {\n  return item.id;\n}\n\nconsole.log(getLength("hello"));\nconsole.log(getLength([1, 2, 3]));\nconsole.log(getId({ id: 42, name: "Test" }));',
      expectedOutput: '5\n3\n42',
      hints: [
        '制約: <T extends { length: number }> で length プロパティを要求',
        'item.length が制約により型安全にアクセス可能',
        'string, Array は length を持つので制約を満たします',
        'number には length がないので getLength(42) はコンパイルエラー',
      ],
      explanation:
        'ジェネリック制約は「型の最小要件」を定義します。extends は型パラメータが少なくともその型と互換性があることを要求します。interface と組み合わせて <T extends Printable> のように使うことで、特定の振る舞いを保証できます。keyof T を制約に使うパターンも重要: function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] で任意のオブジェクトからキーを指定してプロパティを安全に取得できます。これは lodash の _.get() を型安全にしたものです。',
    },
    {
      id: 13,
      title: 'ユーティリティ型',
      difficulty: 'intermediate',
      description:
        'TypeScript には型を変換する組み込みユーティリティ型が豊富です。Partial<T>（全プロパティを省略可能に）、Required<T>（全プロパティを必須に）、Pick<T, K>（特定プロパティの抽出）、Omit<T, K>（特定プロパティの除外）、Readonly<T>（全プロパティを読み取り専用に）。これらは Mapped Types で実装されており、DRY な型定義の基盤です。Record<K, V> はキーと値の型を指定したオブジェクト型を作ります。',
      task: 'User interface の全プロパティを省略可能にした PartialUser 型と、name だけを抽出した NameOnly 型を使ってオブジェクトを作り出力してください。',
      initialCode: '// --- Lesson 13: ユーティリティ型 ---\n// 既存の型を変換する「型レベルの関数」\n\ninterface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Partial で全プロパティを省略可能に\nconst partialUser: Partial<User> = { name: "太郎" };\n\n// Pick で name だけの型を抽出\nconst nameOnly: Pick<User, "name"> = { name: "花子" };\n\nconsole.log(partialUser.name);\nconsole.log(nameOnly.name);',
      solutionCode: '// --- Lesson 13: ユーティリティ型 ---\n// 既存の型を変換する「型レベルの関数」\n\ninterface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Partial で全プロパティを省略可能に\nconst partialUser: Partial<User> = { name: "太郎" };\n\n// Pick で name だけの型を抽出\nconst nameOnly: Pick<User, "name"> = { name: "花子" };\n\nconsole.log(partialUser.name);\nconsole.log(nameOnly.name);',
      expectedOutput: '太郎\n花子',
      hints: [
        'Partial<User> は { name?: string; age?: number; email?: string; } と同じ',
        'Pick<User, "name"> は { name: string; } と同じ',
        'Omit<User, "email"> は { name: string; age: number; }',
        'Required<T> は Partial<T> の逆で全プロパティを必須にします',
      ],
      explanation:
        'ユーティリティ型は既存の型を変換する「型レベルの関数」です。主要なユーティリティ型: Partial<T>(全プロパティを省略可能), Required<T>(全プロパティを必須), Readonly<T>(全プロパティを読み取り専用), Pick<T, K>(特定プロパティの抽出), Omit<T, K>(特定プロパティの除外), Record<K, V>(キーと値のマップ), Exclude<U, T>(Union型からの除外), Extract<U, T>(Union型からの抽出), NonNullable<T>(null/undefinedの除外), ReturnType<T>(関数の戻り値型), Parameters<T>(関数の引数型)。これらを組み合わせることで DRY な型定義が実現できます。',
    },
    {
      id: 14,
      title: 'カスタム型ガード',
      difficulty: 'intermediate',
      description:
        'カスタム型ガード関数は戻り値に is キーワードを使って、引数の型を絞り込みます。value is string の形で、「この関数が true を返したら value は string 型」と TypeScript に伝えます。unknown 型（any より安全な「何でもあり」型）のナローイングや、複雑な Union型の処理に不可欠なテクニックです。Zod や io-ts ライブラリのバリデーションも内部的には型ガードの仕組みを使っています。',
      task: 'isString と isNumber の型ガード関数を定義し、unknown 型の値を安全に処理する format 関数を作成してください。',
      initialCode: '// --- Lesson 14: カスタム型ガード ---\n// value is Type で型ガード関数を定義\n\n// string の型ガード\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\n// number の型ガード\nfunction isNumber(value: unknown): value is number {\n  return typeof value === "number";\n}\n\n// unknown 型を安全に処理\nfunction format(value: unknown): string {\n  if (isString(value)) {\n    return value.toUpperCase();\n  }\n  if (isNumber(value)) {\n    return (value * 2).toString();\n  }\n  return "unknown";\n}\n\nconsole.log(format("hello"));\nconsole.log(format(21));\nconsole.log(format(true));',
      solutionCode: '// --- Lesson 14: カスタム型ガード ---\n// value is Type で型ガード関数を定義\n\n// string の型ガード\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\n// number の型ガード\nfunction isNumber(value: unknown): value is number {\n  return typeof value === "number";\n}\n\n// unknown 型を安全に処理\nfunction format(value: unknown): string {\n  if (isString(value)) {\n    return value.toUpperCase();\n  }\n  if (isNumber(value)) {\n    return (value * 2).toString();\n  }\n  return "unknown";\n}\n\nconsole.log(format("hello"));\nconsole.log(format(21));\nconsole.log(format(true));',
      expectedOutput: 'HELLO\n42\nunknown',
      hints: [
        '戻り値の型に value is string と書きます',
        '型ガードが true を返すと、そのブロック内で型が確定します',
        'unknown は any より安全で、明示的な型チェックが必要です',
        '配列の .filter() にも型ガードを渡せます: arr.filter(isString)',
      ],
      explanation:
        'カスタム型ガードは value is Type の形式で、TypeScript に「この関数が true を返したら、引数はこの型」と伝えます。unknown 型（any より安全な「何でもあり」型）をナローイングする際に特に有用です。配列の filter にも適用可能: const strings = arr.filter(isString); で型安全にフィルタリングできます。TypeScript 5.5 では推論された型述語（inferred type predicates）が導入され、シンプルなケースでは自動的に型ガードとして扱われるようになりました。Zod などのバリデーションライブラリは型ガードとランタイムバリデーションを同時に提供します。',
    },
    {
      id: 15,
      title: 'Intersection型とMixin',
      difficulty: 'intermediate',
      description:
        'Intersection型（&）は複数の型を「すべて満たす」型を作ります。Union（|）が「AまたはB」、Intersection（&）は「AかつB」です。オブジェクト型を結合してMixinパターンを実現できます。interface の extends と似ていますが、Intersection型はインラインで使える利点があります。型が矛盾する場合（string & number）は never 型になります。',
      task: 'Timestamped（createdAt: string）と Identifiable（id: number）をIntersection型で結合し、両方のプロパティを持つオブジェクトを作って id と createdAt を出力してください。',
      initialCode: '// --- Lesson 15: Intersection型 ---\n// & で複数の型を結合する（AかつB）\n\ninterface Timestamped {\n  createdAt: string;\n}\n\ninterface Identifiable {\n  id: number;\n}\n\n// Intersection型で両方のプロパティを持つ型\ntype Entity = Timestamped & Identifiable;\n\n// Entity 型のオブジェクトを作成\nconst entity: Entity = {\n  // ここにプロパティを定義\n};\n\nconsole.log(entity.id);\nconsole.log(entity.createdAt);',
      solutionCode: '// --- Lesson 15: Intersection型 ---\n// & で複数の型を結合する（AかつB）\n\ninterface Timestamped {\n  createdAt: string;\n}\n\ninterface Identifiable {\n  id: number;\n}\n\n// Intersection型で両方のプロパティを持つ型\ntype Entity = Timestamped & Identifiable;\n\n// Entity 型のオブジェクトを作成\nconst entity: Entity = {\n  id: 1,\n  createdAt: "2024-01-01",\n};\n\nconsole.log(entity.id);\nconsole.log(entity.createdAt);',
      expectedOutput: '1\n2024-01-01',
      hints: [
        'Entity は id と createdAt の両方が必要です',
        '& で結合した型は全プロパティが必須になります',
        'interface extends と似ていますがインラインで使えます',
        '矛盾する型の & は never（例: string & number → never）',
      ],
      explanation:
        'Intersection型は OOP の多重継承に似ていますが、型レベルの合成です。interface の extends と比べて、Intersection型はインラインで使える利点があります: function process(entity: Timestamped & Identifiable) { ... }。型同士が矛盾する場合（string & number）は never 型になります。Mixinパターン: 複数の独立した機能を持つ型を & で合成し、フラットなオブジェクトを作るのは、深い継承階層の代替として有効です。React の HOC（Higher-Order Component）の props マージにも Intersection型が使われます。',
    },
    {
      id: 16,
      title: 'インデックスシグネチャとRecord',
      difficulty: 'intermediate',
      description:
        'インデックスシグネチャ（{ [key: string]: type }）は任意のキー名を許容するオブジェクト型を定義します。Record<K, V> ユーティリティ型でも同様のことが可能で、よりシンプルに書けます。固定のキーと動的なキーを混在させることもできます。noUncheckedIndexedAccess を有効にすると、インデックスアクセスの戻り値が T | undefined になり安全性が向上します。',
      task: 'Record<string, number> 型の scores オブジェクトに3教科のスコアを定義し、Object.entries() でキーと値を出力してください。',
      initialCode: '// --- Lesson 16: インデックスシグネチャ ---\n// 動的なキーを持つオブジェクトの型定義\n\n// Record<string, number> でスコアを管理\nconst scores: Record<string, number> = {\n  math: 90,\n  english: 85,\n  science: 92,\n};\n\n// Object.entries でキーと値のペアを出力\nfor (const [subject, score] of Object.entries(scores)) {\n  console.log(`${subject}: ${score}`);\n}',
      solutionCode: '// --- Lesson 16: インデックスシグネチャ ---\n// 動的なキーを持つオブジェクトの型定義\n\n// Record<string, number> でスコアを管理\nconst scores: Record<string, number> = {\n  math: 90,\n  english: 85,\n  science: 92,\n};\n\n// Object.entries でキーと値のペアを出力\nfor (const [subject, score] of Object.entries(scores)) {\n  console.log(`${subject}: ${score}`);\n}',
      expectedOutput: 'math: 90\nenglish: 85\nscience: 92',
      hints: [
        'Record<string, number> は { [key: string]: number } と同じ',
        'Object.entries() は [key, value] ペアの配列を返す',
        'for...of で分割代入して反復処理',
        'noUncheckedIndexedAccess で T | undefined の安全な型を取得可能',
      ],
      explanation:
        'Record<K, V> は { [key: K]: V } の糖衣構文です。Record<"math" | "english", number> のようにリテラル型のUnionをキーにすると、いずれのキーも必須になります。Object.entries() は [string, V][] を返し、Object.keys() は string[] を返します。noUncheckedIndexedAccess: tsconfig.json でこのオプションを有効にすると scores["unknown"] の型が number | undefined になり、存在チェックが強制されます。Map<K, V> はオブジェクトよりも型安全な動的キー値ストアです。',
    },
    {
      id: 17,
      title: 'Mapped Types（マップ型）',
      difficulty: 'intermediate',
      description:
        'Mapped Types は既存の型のプロパティを変換して新しい型を作ります。{ [K in keyof T]: 新しい型 } の構文で、全プロパティに変換を適用できます。Partial, Required, Readonly, Pick などの標準ユーティリティ型はすべて Mapped Types で実装されています。修飾子の追加 (+readonly) や除去 (-?) も可能で、柔軟な型変換ができます。',
      task: 'すべてのプロパティを string 型に変換する Stringify<T> Mapped Type と、すべてのプロパティを省略可能にする MyPartial<T> を自作してください。',
      initialCode: '// --- Lesson 17: Mapped Types ---\n// { [K in keyof T]: 新しい型 } で型を変換\n\ninterface Config {\n  port: number;\n  host: string;\n  debug: boolean;\n}\n\n// 全プロパティを string にする Mapped Type\ntype Stringify<T> = {\n  // ここに定義\n};\n\nconst config: Stringify<Config> = {\n  port: "3000",\n  host: "localhost",\n  debug: "true",\n};\n\nconsole.log(config.port);\nconsole.log(config.host);',
      solutionCode: '// --- Lesson 17: Mapped Types ---\n// { [K in keyof T]: 新しい型 } で型を変換\n\ninterface Config {\n  port: number;\n  host: string;\n  debug: boolean;\n}\n\n// 全プロパティを string にする Mapped Type\ntype Stringify<T> = {\n  [K in keyof T]: string;\n};\n\nconst config: Stringify<Config> = {\n  port: "3000",\n  host: "localhost",\n  debug: "true",\n};\n\nconsole.log(config.port);\nconsole.log(config.host);',
      expectedOutput: '3000\nlocalhost',
      hints: [
        '[K in keyof T]: string で各プロパティを string に変換',
        'keyof T は T の全キーのUnion型を取得します',
        'in で各キーに対してマッピングします',
        'Partial<T> は [K in keyof T]?: T[K] で実装されています',
      ],
      explanation:
        'Mapped Types は TypeScript の型システムの核心的な機能です。keyof T で型のキーのUnion型を取得し、[K in ...] で各キーに対する変換を定義します。標準ユーティリティ型の内部実装: Partial<T> = { [K in keyof T]?: T[K] }、Readonly<T> = { readonly [K in keyof T]: T[K] }、Required<T> = { [K in keyof T]-?: T[K] }。修飾子の追加/除去: +readonly（追加）、-readonly（除去）、+?（省略可能追加）、-?（省略可能除去）。as 句（TypeScript 4.1+）でキーのリマッピングも可能: { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }。',
    },
    {
      id: 18,
      title: 'Conditional Types（条件付き型）',
      difficulty: 'intermediate',
      description:
        'Conditional Types は T extends U ? X : Y の形で、型の条件分岐を行います。型レベルの三項演算子のようなもので、ジェネリクスと組み合わせて入力の型に応じた戻り値型を動的に決定できます。Distribution（分配）機能により、Union型の各メンバーに自動的に適用されます。infer キーワードと組み合わせると、型の一部を抽出する強力なパターンマッチングが可能になります。',
      task: '型 T が string を extends するなら "text"、number なら "number"、それ以外なら "other" を返す TypeName<T> 条件付き型を定義してください。',
      initialCode: '// --- Lesson 18: Conditional Types ---\n// T extends U ? X : Y で型の条件分岐\n\n// TypeName 条件付き型を定義\ntype TypeName<T> = T extends string\n  ? "text"\n  : T extends number\n  ? "number"\n  : "other";\n\nconst a: TypeName<string> = "text";\nconst b: TypeName<number> = "number";\nconst c: TypeName<boolean> = "other";\n\nconsole.log(a);\nconsole.log(b);\nconsole.log(c);',
      solutionCode: '// --- Lesson 18: Conditional Types ---\n// T extends U ? X : Y で型の条件分岐\n\n// TypeName 条件付き型を定義\ntype TypeName<T> = T extends string\n  ? "text"\n  : T extends number\n  ? "number"\n  : "other";\n\nconst a: TypeName<string> = "text";\nconst b: TypeName<number> = "number";\nconst c: TypeName<boolean> = "other";\n\nconsole.log(a);\nconsole.log(b);\nconsole.log(c);',
      expectedOutput: 'text\nnumber\nother',
      hints: [
        '条件付き型はネストできます（if-else if-else のように）',
        'T extends string ? "text" : (次の条件) の形です',
        '分配: TypeName<string | number> → "text" | "number"',
        'infer と組み合わせて型の一部を抽出できます',
      ],
      explanation:
        'Conditional Types は型レベルの if 文です。ネスト可能で、複数の条件を連鎖できます。分配（Distribution）: TypeName<string | number> は TypeName<string> | TypeName<number> = "text" | "number" として評価されます。分配を防ぐには [T] extends [string] のようにタプルで囲みます。infer チーワード: T extends Promise<infer U> ? U : T で Promise の中身の型を抽出できます（Awaited<T>と同等）。Exclude<U, T> = U extends T ? never : U、Extract<U, T> = U extends T ? U : never はCondtional Typesで実装されています。',
    },
    {
      id: 19,
      title: 'クラスとアクセス修飾子',
      difficulty: 'intermediate',
      description:
        'TypeScript のクラスには public, private, protected の3つのアクセス修飾子があります。private はクラス内のみ、protected は子クラスからもアクセス可能、public はどこからでもアクセス可能（デフォルト）です。constructor のパラメータに修飾子を付けると、宣言と代入を1行で行えるパラメータプロパティが使えます。TypeScript の private はコンパイル時の制約で、JavaScript の # プライベートフィールド（ES2022）は実行時にも強制されます。',
      task: 'name (public) と balance (private) を持つ BankAccount クラスを定義し、deposit(), getBalance() メソッドで残高を操作・取得してください。',
      initialCode: '// --- Lesson 19: クラスとアクセス修飾子 ---\n// public, private, protected でアクセスを制御\n\nclass BankAccount {\n  // パラメータプロパティ で宣言と代入を同時に\n  constructor(\n    public name: string,\n    private balance: number\n  ) {}\n\n  // 入金メソッド\n  deposit(amount: number): void {\n    // ここに処理を書く\n  }\n\n  // 残高取得メソッド\n  getBalance(): number {\n    // ここに処理を書く\n  }\n}\n\nconst account = new BankAccount("太郎", 1000);\naccount.deposit(500);\nconsole.log(account.getBalance());',
      solutionCode: '// --- Lesson 19: クラスとアクセス修飾子 ---\n// public, private, protected でアクセスを制御\n\nclass BankAccount {\n  // パラメータプロパティ で宣言と代入を同時に\n  constructor(\n    public name: string,\n    private balance: number\n  ) {}\n\n  // 入金メソッド\n  deposit(amount: number): void {\n    this.balance += amount;\n  }\n\n  // 残高取得メソッド\n  getBalance(): number {\n    return this.balance;\n  }\n}\n\nconst account = new BankAccount("太郎", 1000);\naccount.deposit(500);\nconsole.log(account.getBalance());',
      expectedOutput: '1500',
      hints: [
        'this.balance += amount; で残高を加算',
        'return this.balance; で残高を返却',
        'private なので account.balance は外部からアクセス不可',
        'パラメータプロパティ: constructor(private x: number) で宣言と代入を同時に',
      ],
      explanation:
        'アクセス修飾子はカプセル化（Encapsulation）を実現します。balance を private にすることで、外部から直接変更できなくなり、deposit/withdraw メソッドを通じてのみ操作可能になります。パラメータプロパティは TypeScript の便利な糖衣構文で、constructor(private balance: number) は this.balance = balance を自動で行います。TypeScript の private はコンパイル時の制約（JavaScript に変換すると消える）で、ES2022 の #privateField は実行時にも強制されます。abstract クラス、implements interface、getter/setter (@property) もクラスの重要な機能です。',
    },
    {
      id: 20,
      title: '抽象クラスとimplements',
      difficulty: 'intermediate',
      description:
        '抽象クラス（abstract class）はインスタンス化できないクラスで、抽象メソッド（実装のないメソッド）を定義できます。子クラスは必ず抽象メソッドを実装する必要があります。interface とクラスの中間的な存在で、共通の実装を持ちながら「穴埋め部分」を子クラスに委譲する Template Method パターンに最適です。implements で interface を実装することもできます。',
      task: 'abstract メソッド area() と describe() 具象メソッドを持つ Shape 抽象クラスを作り、Circle で実装してください。radius=5 で面積と説明を出力してください。',
      initialCode: '// --- Lesson 20: 抽象クラス ---\n// abstract class で「穴埋め」部分を子クラスに委譲\n\nabstract class Shape {\n  abstract area(): number;\n\n  // 具象メソッド（共通処理）\n  describe(): string {\n    return `Area: ${this.area().toFixed(2)}`;\n  }\n}\n\n// Circle クラスを定義（Shape を継承）\nclass Circle extends Shape {\n  constructor(private radius: number) {\n    super();\n  }\n\n  area(): number {\n    // ここに処理を書く\n  }\n}\n\nconst circle = new Circle(5);\nconsole.log(circle.area());\nconsole.log(circle.describe());',
      solutionCode: '// --- Lesson 20: 抽象クラス ---\n// abstract class で「穴埋め」部分を子クラスに委譲\n\nabstract class Shape {\n  abstract area(): number;\n\n  // 具象メソッド（共通処理）\n  describe(): string {\n    return `Area: ${this.area().toFixed(2)}`;\n  }\n}\n\n// Circle クラスを定義（Shape を継承）\nclass Circle extends Shape {\n  constructor(private radius: number) {\n    super();\n  }\n\n  area(): number {\n    return Math.PI * this.radius ** 2;\n  }\n}\n\nconst circle = new Circle(5);\nconsole.log(circle.area());\nconsole.log(circle.describe());',
      expectedOutput: '78.53981633974483\nArea: 78.54',
      hints: [
        'area() は Math.PI * this.radius ** 2 を返す',
        'super() でコンストラクタの最初に親クラスを初期化',
        'describe() は親クラスで実装済み（area() を呼ぶ）',
        'new Shape() はコンパイルエラー（抽象クラスはインスタンス化不可）',
      ],
      explanation:
        '抽象クラスは「部分的な実装を持つインターフェース」です。abstract メソッドを実装しないとコンパイルエラーになります。describe() は area() をコールする Template Method パターンです。interface vs abstract class: interface は複数実装可能（implements A, B）だが実装は持てない。abstract class は1つのみ継承（extends A）だが共通の実装を提供可能。TypeScript では implements で interface の実装も強制可能: class Circle implements Drawable, Serializable { ... }。SOLID の DIP（依存関係逆転）: 具象クラスではなく抽象に依存することでテスタビリティが向上します。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'infer キーワード',
      difficulty: 'advanced',
      description:
        'infer は Conditional Types 内で型の一部を「推論して抽出」するキーワードです。型のパターンマッチングを可能にし、関数の戻り値型（ReturnType<T>）、引数の型（Parameters<T>）、Promise のアンラップ（Awaited<T>）、配列の要素型の抽出などに使われます。TypeScript の標準ユーティリティ型の多くが infer で実装されており、高度な型操作には必須の概念です。',
      task: '関数型から戻り値の型を抽出する MyReturnType<T> と、Promise の中身を取り出す Unwrap<T> を定義して使用してください。',
      initialCode: '// --- Lesson 21: infer ---\n// Conditional Types 内で型を推論して抽出する\n\n// 関数の戻り値型を抽出\ntype MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;\n\n// Promise の中身を抽出\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\n\n// テスト\ntype Fn = () => string;\ntype Result = MyReturnType<Fn>;\nconst a: Result = "hello";\n\ntype Promised = Promise<number>;\ntype Resolved = Unwrap<Promised>;\nconst b: Resolved = 42;\n\nconsole.log(a);\nconsole.log(b);',
      solutionCode: '// --- Lesson 21: infer ---\n// Conditional Types 内で型を推論して抽出する\n\n// 関数の戻り値型を抽出\ntype MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;\n\n// Promise の中身を抽出\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\n\n// テスト\ntype Fn = () => string;\ntype Result = MyReturnType<Fn>;\nconst a: Result = "hello";\n\ntype Promised = Promise<number>;\ntype Resolved = Unwrap<Promised>;\nconst b: Resolved = 42;\n\nconsole.log(a);\nconsole.log(b);',
      expectedOutput: 'hello\n42',
      hints: [
        'infer R で戻り値の型を R に「キャプチャ」します',
        'T extends (...args: unknown[]) => infer R で関数パターンにマッチ',
        'T extends Promise<infer U> で Promise の中身を U に抽出',
        'パターンにマッチしない場合は ? の後の分岐（never）になります',
      ],
      explanation:
        'infer はパターンマッチの型版で、TypeScript の型システムの最も強力な機能の一つです。ReturnType<T>, Parameters<T>, ConstructorParameters<T>, InstanceType<T> はすべて infer で実装されています。応用例: 配列の要素型抽出 T extends (infer U)[] ? U : T、タプルの先頭 T extends [infer H, ...unknown[]] ? H : never、文字列のパース T extends `${infer A}.${infer B}` ? [A, B] : never。再帰的な infer: DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T でネストされた Promise を完全にアンラップ可能。',
    },
    {
      id: 22,
      title: 'テンプレートリテラル型の応用',
      difficulty: 'advanced',
      description:
        'テンプレートリテラル型は `${A}${B}` の形で文字列パターンの型を定義します。Union型と組み合わせると全パターンが自動生成される分配動作が起きます。Capitalize, Lowercase, Uppercase, Uncapitalize の組み込み型変換と組み合わせて、型安全なイベント名や API パースの型を構築できます。TypeScript 4.1 で導入されたこの機能は、型安全な文字列操作を可能にしました。',
      task: '"get" | "set" と "Name" | "Age" を組み合わせた Method 型を定義し、さらに "on" + Capitalize<イベント名> の型も定義してください。',
      initialCode: '// --- Lesson 22: テンプレートリテラル型の応用 ---\n// 型レベルで文字列パターンを組み合わせる\n\ntype Verb = "get" | "set";\ntype Prop = "Name" | "Age";\n\n// getter/setter メソッド名の型を生成\ntype Methods = `${Verb}${Prop}`;\n\nconst m1: Methods = "getName";\nconst m2: Methods = "setAge";\n\n// イベントハンドラ名の型\ntype EventName = "click" | "focus" | "blur";\ntype Handler = `on${Capitalize<EventName>}`;\n\nconst h: Handler = "onClick";\n\nconsole.log(m1);\nconsole.log(m2);\nconsole.log(h);',
      solutionCode: '// --- Lesson 22: テンプレートリテラル型の応用 ---\n// 型レベルで文字列パターンを組み合わせる\n\ntype Verb = "get" | "set";\ntype Prop = "Name" | "Age";\n\n// getter/setter メソッド名の型を生成\ntype Methods = `${Verb}${Prop}`;\n\nconst m1: Methods = "getName";\nconst m2: Methods = "setAge";\n\n// イベントハンドラ名の型\ntype EventName = "click" | "focus" | "blur";\ntype Handler = `on${Capitalize<EventName>}`;\n\nconst h: Handler = "onClick";\n\nconsole.log(m1);\nconsole.log(m2);\nconsole.log(h);',
      expectedOutput: 'getName\nsetAge\nonClick',
      hints: [
        '`${Verb}${Prop}` で Union型の全組み合わせが生成されます',
        'Methods = "getName" | "getAge" | "setName" | "setAge"',
        'Capitalize<"click"> → "Click" で先頭大文字化',
        'Handler = "onClick" | "onFocus" | "onBlur"',
      ],
      explanation:
        'テンプレートリテラル型は Union型と組み合わせると、すべての組み合わせを自動生成します（分配動作）。Methods は 2×2=4 パターン、Handler は 3 パターン自動生成されます。組み込みの型変換: Uppercase<T>（全大文字）, Lowercase<T>（全小文字）, Capitalize<T>（先頭大文字）, Uncapitalize<T>（先頭小文字）。infer と組み合わせて文字列の解析も可能: type ParseRoute<T> = T extends `/${infer Seg}/${infer Rest}` ? [Seg, ...ParseRoute<`/${Rest}`>] : [] のような再帰的パースも実現可能です。',
    },
    {
      id: 23,
      title: 'Discriminated Union（判別共用体）',
      difficulty: 'advanced',
      description:
        'Discriminated Union は共通のリテラル型プロパティ（判別子/discriminant）を持つ Union型です。switch 文で判別子を分岐すると、各 case 内で型が自動的にナローイングされます。TypeScript で最も推奨されるパターンの一つで、Redux のアクション、React の状態管理、API レスポンスなどに広く使われます。網羅性チェック（exhaustiveness check）で、新しい variant 追加時のハンドリング漏れを防止できます。',
      task: 'type フィールドを判別子とする Circle, Square, Triangle の Discriminated Union を作り、面積を計算する area 関数を定義してください。網羅性チェック（default: never）も実装してください。',
      initialCode: '// --- Lesson 23: Discriminated Union ---\n// 共通の判別子で型を安全に分岐する\n\ninterface Circle { type: "circle"; radius: number; }\ninterface Square { type: "square"; side: number; }\ninterface Triangle { type: "triangle"; base: number; height: number; }\n\ntype Shape = Circle | Square | Triangle;\n\nfunction area(shape: Shape): number {\n  switch (shape.type) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "square":\n      // ここに処理\n    case "triangle":\n      // ここに処理\n    default:\n      // 網羅性チェック\n      const _exhaustive: never = shape;\n      return _exhaustive;\n  }\n}\n\nconsole.log(area({ type: "circle", radius: 5 }).toFixed(2));\nconsole.log(area({ type: "square", side: 4 }));\nconsole.log(area({ type: "triangle", base: 6, height: 3 }));',
      solutionCode: '// --- Lesson 23: Discriminated Union ---\n// 共通の判別子で型を安全に分岐する\n\ninterface Circle { type: "circle"; radius: number; }\ninterface Square { type: "square"; side: number; }\ninterface Triangle { type: "triangle"; base: number; height: number; }\n\ntype Shape = Circle | Square | Triangle;\n\nfunction area(shape: Shape): number {\n  switch (shape.type) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "square":\n      return shape.side ** 2;\n    case "triangle":\n      return (shape.base * shape.height) / 2;\n    default:\n      const _exhaustive: never = shape;\n      return _exhaustive;\n  }\n}\n\nconsole.log(area({ type: "circle", radius: 5 }).toFixed(2));\nconsole.log(area({ type: "square", side: 4 }));\nconsole.log(area({ type: "triangle", base: 6, height: 3 }));',
      expectedOutput: '78.54\n16\n9',
      hints: [
        'square: return shape.side ** 2',
        'triangle: return (shape.base * shape.height) / 2',
        'default の never はすべてのケースが処理されたことを保証',
        '新しい Shape を追加すると default でコンパイルエラーになる',
      ],
      explanation:
        'Discriminated Union は「代数的データ型」(Algebraic Data Type, ADT) の TypeScript 版で、関数型プログラミングの影響を受けています。網羅性チェック: default: never に shape を代入すると、未処理の case があればコンパイルエラーになります。新しい variant（例: Pentagon）を追加した時に、自動的にハンドリング漏れを検出できます。Redux の Action: type Action = { type: "INCREMENT" } | { type: "SET"; payload: number }。React の useState の型安全な状態管理にも Discriminated Union が使われます。',
    },
    {
      id: 24,
      title: 'モジュールと名前空間',
      difficulty: 'advanced',
      description:
        'TypeScript/JavaScript の ES Modules では import/export でモジュール間の依存関係を管理します。名前付きエクスポート（export { }）とデフォルトエクスポート（export default）があります。Tree-Shaking（未使用コードの除去）の観点から名前付きエクスポートが推奨されます。barrel ファイル (index.ts) で再エクスポートし、API の表面積を制御するのが一般的です。',
      task: '関数 greet とオブジェクト config をモジュールとして定義したと仮定して、それぞれ出力してください。',
      initialCode: '// --- Lesson 24: モジュールシステム ---\n// import/export で依存関係を管理する\n\n// 実際には export function greet(name: string) { ... }\n// import { greet } from "./utils";\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\n// 実際には export const config = { ... }\nconst config = {\n  version: "1.0.0",\n  env: "production",\n};\n\nconsole.log(greet("World"));\nconsole.log(`${config.version} (${config.env})`);',
      solutionCode: '// --- Lesson 24: モジュールシステム ---\n// import/export で依存関係を管理する\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconst config = {\n  version: "1.0.0",\n  env: "production",\n};\n\nconsole.log(greet("World"));\nconsole.log(`${config.version} (${config.env})`);',
      expectedOutput: 'Hello, World!\n1.0.0 (production)',
      hints: [
        'export function greet(...) で名前付きエクスポート',
        'import { greet } from "./module" で名前付きインポート',
        'export default はファイルごとに1つだけ',
        'barrel: index.ts で export { greet } from "./utils";',
      ],
      explanation:
        'ES Modules は JavaScript の標準モジュールシステムで、Tree-Shaking が可能です。名前付きエクスポートが推奨され、デフォルトエクスポートはリファクタリング時にリネームの追跡が困難という問題があります。barrel ファイル（index.ts で再エクスポート）は API の表面積を制御するのに有用ですが、大きなバンドルサイズの原因にもなり得ます。TypeScript 固有: export type { User } で型のみエクスポート、import type { User } で型のみインポートが可能で、バンドルサイズの最適化に寄与します。',
    },
    {
      id: 25,
      title: '宣言ファイルと型拡張',
      difficulty: 'advanced',
      description:
        '.d.ts ファイルは型情報だけを記述した宣言ファイルです。JavaScript ライブラリに型を付けるために使われ、DefinitelyTyped (@types/xxx) は世界最大の型定義リポジトリです。declare キーワードで外部の変数や関数の型を宣言し、declare module で既存モジュールの型を拡張（モジュール拡張）できます。declare global でグローバルスコープの型を拡張することも可能です。',
      task: '.d.ts の概念を理解するため、ExtendedString interface でString型にisEmail()メソッドを「型レベルで追加する」概念を学び、通常の実装で同等の関数を出力してください。',
      initialCode: '// --- Lesson 25: 宣言ファイルと型拡張 ---\n// .d.ts で型情報を定義、declare で型を拡張\n\n// 概念: declare global で String を拡張する場合\n// declare global {\n//   interface String {\n//     isEmail(): boolean;\n//   }\n// }\n\n// 通常の関数として実装\nfunction isEmail(str: string): boolean {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str);\n}\n\nconsole.log(isEmail("user@example.com"));\nconsole.log(isEmail("invalid-email"));',
      solutionCode: '// --- Lesson 25: 宣言ファイルと型拡張 ---\n// .d.ts で型情報を定義、declare で型を拡張\n\nfunction isEmail(str: string): boolean {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str);\n}\n\nconsole.log(isEmail("user@example.com"));\nconsole.log(isEmail("invalid-email"));',
      expectedOutput: 'true\nfalse',
      hints: [
        'declare は「この変数/関数が存在する」と型レベルで宣言',
        '@types/node, @types/react は DefinitelyTyped の型定義',
        'declare module "xxx" で既存モジュールの型を拡張可能',
        '正規表現の test() で文字列のパターンマッチを検証',
      ],
      explanation:
        '.d.ts ファイルは TypeScript エコシステムの基盤です。DefinitelyTyped（@types/xxx）は多くの JavaScript ライブラリの型を提供しています。declare module で既存モジュールの型を拡張（例: Express の Request にカスタムプロパティを追加）できます。declare global でグローバル型を拡張（Window, NodeJS.ProcessEnv など）も可能です。TypeScript 5.0 以降、@types/node は ESM 向けの型も提供しています。自作ライブラリの型定義は package.json の "types" フィールドで指定します。',
    },
    {
      id: 26,
      title: 'デコレータパターン',
      difficulty: 'advanced',
      description:
        'デコレータはクラスやメソッドにメタデータや振る舞いを追加する構文です。TC39 Stage 3 のデコレータ提案が TypeScript 5.0 で正式サポートされました。NestJS, Angular など主要フレームワークがデコレータを活用しています。高階関数による関数のラッピングは、デコレータの本質的な概念で、ログ、キャッシュ、認証、バリデーションなどの横断的関心事に使われます。',
      task: 'メソッドの実行前後にログを出力する withLog 高階関数と、実行時間を計測する withTiming 高階関数を作成し、それぞれ適用して出力してください。',
      initialCode: '// --- Lesson 26: デコレータパターン ---\n// 高階関数で関数の振る舞いを拡張する\n\n// ログデコレータ\nfunction withLog<T extends (...args: unknown[]) => unknown>(fn: T, name: string) {\n  return function(...args: unknown[]) {\n    console.log(`[LOG] Calling ${name}`);\n    const result = fn(...args);\n    console.log(`[LOG] ${name} returned: ${result}`);\n    return result;\n  };\n}\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconst loggedAdd = withLog(add, "add");\nloggedAdd(3, 5);',
      solutionCode: '// --- Lesson 26: デコレータパターン ---\n// 高階関数で関数の振る舞いを拡張する\n\n// ログデコレータ\nfunction withLog<T extends (...args: unknown[]) => unknown>(fn: T, name: string) {\n  return function(...args: unknown[]) {\n    console.log(`[LOG] Calling ${name}`);\n    const result = fn(...args);\n    console.log(`[LOG] ${name} returned: ${result}`);\n    return result;\n  };\n}\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconst loggedAdd = withLog(add, "add");\nloggedAdd(3, 5);',
      expectedOutput: '[LOG] Calling add\n[LOG] add returned: 8',
      hints: [
        '高階関数: 関数を受け取り、拡張した関数を返す',
        'fn(...args) で元の関数を実行し結果を取得',
        '@decorator 構文はこの概念のシンタックスシュガー',
        'TypeScript 5.0 以降の新デコレータは ECMAScript 標準に準拠',
      ],
      explanation:
        'デコレータは AOP（アスペクト指向プログラミング）をTypeScript で実現する手段です。高階関数パターン: 関数を受け取り、前後に処理を追加した新しい関数を返します。@decorator 構文はこのパターンのシンタックスシュガーです。TypeScript 5.0 の新デコレータは ECMAScript 標準に準拠しており、旧 experimentalDecorators とは仕様が異なります。NestJS は @Controller, @Get, @Injectable などのデコレータでDIとルーティングを実現。Angular も @Component, @Service でデコレータを多用しています。',
    },
    {
      id: 27,
      title: '再帰型とJSON型',
      difficulty: 'advanced',
      description:
        '再帰型は自身を参照する型定義で、ツリー構造、ネストされたオブジェクト、JSON などの再帰的なデータ構造を表現します。TypeScript では interface と type alias の両方で再帰型を定義できます。JSON型の定義は再帰型の典型的な例です。型の深さに制限はありますが、実用上問題になることは稀です。',
      task: 'JSON の全型を表現する JsonValue 再帰型と、ネストされたファイルシステムを表す FileNode 再帰型を定義してください。',
      initialCode: '// --- Lesson 27: 再帰型 ---\n// 自身を参照する型でツリー構造を表現\n\n// JSON の全型を再帰的に定義\ntype JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };\n\n// ファイルシステムの再帰型\ninterface FileNode {\n  name: string;\n  children: FileNode[];\n}\n\n// テスト: JSON\nconst data: JsonValue = {\n  name: "Alice",\n  scores: [90, 85, 92],\n  active: true,\n};\nconsole.log(typeof data);\n\n// テスト: ファイルツリー\nconst root: FileNode = {\n  name: "src",\n  children: [\n    { name: "index.ts", children: [] },\n    { name: "utils", children: [\n      { name: "helper.ts", children: [] },\n    ]},\n  ],\n};\nconsole.log(root.name);\nconsole.log(root.children.length);',
      solutionCode: '// --- Lesson 27: 再帰型 ---\n// 自身を参照する型でツリー構造を表現\n\n// JSON の全型を再帰的に定義\ntype JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };\n\n// ファイルシステムの再帰型\ninterface FileNode {\n  name: string;\n  children: FileNode[];\n}\n\n// テスト: JSON\nconst data: JsonValue = {\n  name: "Alice",\n  scores: [90, 85, 92],\n  active: true,\n};\nconsole.log(typeof data);\n\n// テスト: ファイルツリー\nconst root: FileNode = {\n  name: "src",\n  children: [\n    { name: "index.ts", children: [] },\n    { name: "utils", children: [\n      { name: "helper.ts", children: [] },\n    ]},\n  ],\n};\nconsole.log(root.name);\nconsole.log(root.children.length);',
      expectedOutput: 'object\nsrc\n2',
      hints: [
        'JsonValue は自身を値に持つオブジェクトや配列を含む再帰型',
        'FileNode の children が FileNode[] で再帰参照',
        '再帰型はどれだけ深いネストでも型安全です',
        'LinkedList, BinaryTree, AST なども再帰型で表現可能',
      ],
      explanation:
        '再帰型はツリー構造（ファイルシステム、DOM、AST、JSON）の型定義に不可欠です。JsonValue 型は JSON.parse() の戻り値として使え、any より型安全です。interface と type alias のどちらでも再帰型を定義できますが、相互参照が必要な場合は interface が便利です。応用例: LinkedList<T> = { value: T; next: LinkedList<T> | null }、BinaryTree<T> = { value: T; left: BinaryTree<T> | null; right: BinaryTree<T> | null }。型の再帰深度に制限はありますが（TS は約 50 レベル）、実用上問題になることは稀です。',
    },
    {
      id: 28,
      title: 'パターンマッチング型',
      difficulty: 'advanced',
      description:
        '高度な型操作として、Conditional Types と infer、可変長タプルを組み合わせたパターンマッチングがあります。タプルの先頭/末尾の抽出、配列の要素型取得、関数の引数解析など、型レベルの「データ操作」が可能です。Type Challenges（型パズル問題集）でこれらのテクニックを練習すると、TypeScript の型システムへの理解が深まります。',
      task: '配列の最初の要素型を取得する Head<T> と最後の要素型を取得する Last<T> を定義して使用してください。',
      initialCode: '// --- Lesson 28: パターンマッチング型 ---\n// infer + 可変長タプルで型を分解する\n\n// 配列の最初の要素の型\ntype Head<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;\n\n// 配列の最後の要素の型\ntype Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;\n\n// テスト\ntype A = Head<[string, number, boolean]>;\nconst a: A = "hello";\n\ntype B = Last<[string, number, boolean]>;\nconst b: B = true;\n\nconsole.log(a);\nconsole.log(b);',
      solutionCode: '// --- Lesson 28: パターンマッチング型 ---\n// infer + 可変長タプルで型を分解する\n\n// 配列の最初の要素の型\ntype Head<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;\n\n// 配列の最後の要素の型\ntype Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;\n\n// テスト\ntype A = Head<[string, number, boolean]>;\nconst a: A = "hello";\n\ntype B = Last<[string, number, boolean]>;\nconst b: B = true;\n\nconsole.log(a);\nconsole.log(b);',
      expectedOutput: 'hello\ntrue',
      hints: [
        '[infer First, ...unknown[]] で先頭要素をキャプチャ',
        '[...unknown[], infer L] で末尾要素をキャプチャ',
        '可変長タプル ...T[] が残りの要素を「吸収」します',
        'Tail<T>: T extends [unknown, ...infer Rest] ? Rest : never',
      ],
      explanation:
        '可変長タプルの型操作（TypeScript 4.0+）により、型レベルでのリスト操作が可能になりました。Head, Last, Tail（先頭を除いた残り）、Push（末尾に追加）など、関数型プログラミングのリスト操作を型レベルで再現できます。再帰的な型操作と組み合わせて: Length<T> = T extends { length: infer L } ? L : never、Concat<A, B> = [...A, ...B]、Reverse<T> も構築可能。Type Challenges (https://github.com/type-challenges/type-challenges) で Easy → Medium → Hard と段階的に練習するのが効果的です。',
    },
    {
      id: 29,
      title: 'Result型パターン',
      difficulty: 'advanced',
      description:
        'Result 型パターン（成功/失敗を型で表現）は、throw/catch ではなく戻り値でエラーを返すアプローチです。Discriminated Union を使い、成功時は { ok: true; value: T }、失敗時は { ok: false; error: E } を返します。Rust の Result<T, E> や Haskell の Either に由来し、エラーハンドリングの漏れを型レベルで防止できます。neverthrow, ts-results ライブラリがこのパターンを実装しています。',
      task: 'Result<T, E> 型を定義し、安全な除算関数 safeDivide と JSON パース関数 safeJsonParse を実装してください。',
      initialCode: '// --- Lesson 29: Result型パターン ---\n// 成功/失敗を戻り値の型で表現する\n\ntype Result<T, E = Error> =\n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\n// 成功/失敗のヘルパー関数\nfunction ok<T>(value: T): Result<T, never> {\n  return { ok: true, value };\n}\nfunction err<E>(error: E): Result<never, E> {\n  return { ok: false, error };\n}\n\n// 安全な除算\nfunction safeDivide(a: number, b: number): Result<number, string> {\n  if (b === 0) return err("Division by zero");\n  return ok(a / b);\n}\n\n// テスト\nconst r1 = safeDivide(10, 3);\nif (r1.ok) console.log(r1.value.toFixed(2));\n\nconst r2 = safeDivide(10, 0);\nif (!r2.ok) console.log(r2.error);',
      solutionCode: '// --- Lesson 29: Result型パターン ---\n// 成功/失敗を戻り値の型で表現する\n\ntype Result<T, E = Error> =\n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\nfunction ok<T>(value: T): Result<T, never> {\n  return { ok: true, value };\n}\nfunction err<E>(error: E): Result<never, E> {\n  return { ok: false, error };\n}\n\nfunction safeDivide(a: number, b: number): Result<number, string> {\n  if (b === 0) return err("Division by zero");\n  return ok(a / b);\n}\n\nconst r1 = safeDivide(10, 3);\nif (r1.ok) console.log(r1.value.toFixed(2));\n\nconst r2 = safeDivide(10, 0);\nif (!r2.ok) console.log(r2.error);',
      expectedOutput: '3.33\nDivision by zero',
      hints: [
        'ok() は { ok: true, value } を返すヘルパー',
        'err() は { ok: false, error } を返すヘルパー',
        'r1.ok が true のとき、r1.value の型が T に絞り込まれる',
        'throw/catch と違い、エラーが型に含まれるため無視できない',
      ],
      explanation:
        'Result 型は関数型プログラミングの Either モナドに由来し、Rust の Result<T, E> と同じ概念です。throw/catch との違い: throw はエラーが型に現れないため「無視」が可能ですが、Result はエラーが戻り値の型に含まれるため、呼び出し側が必ず ok/err をチェックする必要があります。Discriminated Union なので、ok ブランチでは value、err ブランチでは error のみアクセス可能（型安全）。neverthrow, ts-results ライブラリは .map(), .flatMap(), .unwrapOr() などのメソッドチェーン API も提供しています。Error Boundaries（React）やグローバルエラーハンドラとの組み合わせも考慮すべきです。',
    },
    {
      id: 30,
      title: 'DeepReadonly — 型の総合問題',
      difficulty: 'advanced',
      description:
        '総合問題として、ネストされたオブジェクトの全プロパティを再帰的に readonly にする DeepReadonly<T> 型を実装します。Mapped Types, Conditional Types, 再帰型の知識を統合する実践的な型チャレンジです。実務では ts-essentials, type-fest などのライブラリが同様のユーティリティ型を提供しています。イミュータビリティは React の props や Redux の state でバグを防ぐための基本原則です。',
      task: 'DeepReadonly<T> 型を定義し、ネストされた Config オブジェクトの全プロパティを再帰的に readonly にしてください。値を出力して動作を確認してください。',
      initialCode: '// --- Lesson 30: DeepReadonly 型チャレンジ ---\n// Mapped Types + Conditional Types + 再帰型の集大成\n\n// DeepReadonly: ネストされた全プロパティを readonly に\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? T[K] extends Function\n      ? T[K]  // 関数はそのまま\n      : DeepReadonly<T[K]>  // オブジェクトは再帰\n    : T[K];  // プリミティブはそのまま\n};\n\ninterface Config {\n  db: {\n    host: string;\n    port: number;\n    credentials: {\n      user: string;\n      password: string;\n    };\n  };\n  debug: boolean;\n}\n\nconst config: DeepReadonly<Config> = {\n  db: {\n    host: "localhost",\n    port: 5432,\n    credentials: { user: "admin", password: "secret" },\n  },\n  debug: false,\n};\n\nconsole.log(config.db.host);\nconsole.log(config.db.credentials.user);\nconsole.log(config.debug);',
      solutionCode: '// --- Lesson 30: DeepReadonly 型チャレンジ ---\n// Mapped Types + Conditional Types + 再帰型の集大成\n\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? T[K] extends Function\n      ? T[K]\n      : DeepReadonly<T[K]>\n    : T[K];\n};\n\ninterface Config {\n  db: {\n    host: string;\n    port: number;\n    credentials: {\n      user: string;\n      password: string;\n    };\n  };\n  debug: boolean;\n}\n\nconst config: DeepReadonly<Config> = {\n  db: {\n    host: "localhost",\n    port: 5432,\n    credentials: { user: "admin", password: "secret" },\n  },\n  debug: false,\n};\n\nconsole.log(config.db.host);\nconsole.log(config.db.credentials.user);\nconsole.log(config.debug);',
      expectedOutput: 'localhost\nadmin\nfalse',
      hints: [
        'Mapped Types: { readonly [K in keyof T]: ... } で全プロパティに readonly を付与',
        'T[K] extends object で オブジェクト型を判定して再帰',
        'Function は object を extends するので除外が必要',
        'config.db.host = "x" はコンパイルエラー（readonly）',
      ],
      explanation:
        'DeepReadonly は Mapped Types, Conditional Types, 再帰型の集大成です。ポイント: Function も object を extends するため、T[K] extends Function で除外しないとメソッドが壊れます。配列も考慮する場合: T[K] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepReadonly<U>> : ... とします。実務では ts-essentials や type-fest が DeepReadonly, DeepPartial, DeepRequired などを提供しています。イミュータビリティは React の props や Redux の state でバグを防ぐための基本原則で、Immer ライブラリは DeepReadonly + producer パターンで安全な状態更新を提供しています。TypeScript の型システムはチューリング完全であり、理論上はどんな計算も型レベルで表現可能です。',
    },
  ],
};

export default course;
