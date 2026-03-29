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
        'TypeScript は JavaScript に静的型付けを追加した言語です。.ts ファイルに書いたコードは、コンパイルして .js に変換してから実行します。まずは console.log() で出力してみましょう。',
      task: 'console.log() で「Hello, TypeScript!」と出力してください。',
      initialCode: '// ここにコードを書いてください\n',
      solutionCode: 'console.log("Hello, TypeScript!");',
      expectedOutput: 'Hello, TypeScript!',
      hints: [
        'console.log() の括弧の中に文字列を入れます',
        '文字列はダブルクォートで囲みます',
        'console.log("Hello, TypeScript!");',
      ],
      explanation:
        'TypeScript のコードは tsc（TypeScript Compiler）で JavaScript に変換されます。console.log() は JavaScript と同じ出力メソッドです。TypeScript は JavaScript のスーパーセットなので、正しい JavaScript コードはすべて TypeScript でも動作します。',
    },
    {
      id: 2,
      title: '型アノテーション — 基本型',
      difficulty: 'beginner',
      description:
        'TypeScript の最大の特徴は型アノテーション（型注釈）です。変数名の後に : 型名 を付けて型を指定します。基本型は string, number, boolean です。型が合わないとコンパイルエラーになります。',
      task: '変数 name に string 型で "TypeScript"、age に number 型で 12 を代入し、両方を出力してください。',
      initialCode: '// 型アノテーション付きで変数を定義\nconst name: \nconst age: \n\nconsole.log(name);\nconsole.log(age);',
      solutionCode: 'const name: string = "TypeScript";\nconst age: number = 12;\n\nconsole.log(name);\nconsole.log(age);',
      expectedOutput: 'TypeScript\n12',
      hints: [
        'const name: string = "TypeScript"; のように書きます',
        'number は整数も小数も含みます',
        'const age: number = 12; です',
      ],
      explanation:
        '型アノテーションにより、開発時にエラーを早期発見できます。TypeScript は「型推論」も強力で、const name = "TypeScript" と書くだけで string 型と推論されます。ただし、関数の引数など推論が効かない場面では明示的な型アノテーションが必要です。',
    },
    {
      id: 3,
      title: '配列とタプル',
      difficulty: 'beginner',
      description:
        '配列は number[] または Array<number> で型指定します。タプルは固定長で各要素の型が異なる配列で、[string, number] のように定義します。',
      task: 'number 型の配列 scores に [85, 92, 78] を代入し、string と number のタプル person に ["太郎", 20] を代入して出力してください。',
      initialCode: '// 配列とタプルを定義\nconst scores: number[] = \nconst person: [string, number] = \n\nconsole.log(scores);\nconsole.log(person);',
      solutionCode: 'const scores: number[] = [85, 92, 78];\nconst person: [string, number] = ["太郎", 20];\n\nconsole.log(scores);\nconsole.log(person);',
      expectedOutput: '85,92,78\n太郎,20',
      hints: [
        '配列: const scores: number[] = [85, 92, 78];',
        'タプル: const person: [string, number] = ["太郎", 20];',
        'タプルは要素の順序と型が固定されています',
      ],
      explanation:
        '配列とタプルの違いは重要です。配列は同じ型の要素を可変長で持ち、タプルは異なる型の要素を固定長で持ちます。readonly 修飾子を付けると不変な配列/タプルを作れます（readonly number[]）。TypeScript 4.0以降、可変長タプルも使えるようになりました。',
    },
    {
      id: 4,
      title: 'オブジェクト型と interface',
      difficulty: 'beginner',
      description:
        'interface はオブジェクトの形状（shape）を定義します。プロパティ名と型を指定し、? を付けるとオプショナル（省略可能）になります。interface はクラスではなく「型の契約」です。',
      task: 'name: string と age: number を持つ User interface を定義し、User 型のオブジェクトを作って name を出力してください。',
      initialCode: '// User interface を定義\n\n\nconst user: User = { name: "太郎", age: 25 };\nconsole.log(user.name);',
      solutionCode: 'interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = { name: "太郎", age: 25 };\nconsole.log(user.name);',
      expectedOutput: '太郎',
      hints: [
        'interface User { ... } で定義します',
        'プロパティは name: string; のように書きます',
        'オブジェクトが interface に合致しないとエラーになります',
      ],
      explanation:
        'interface は TypeScript の中核概念で、「構造的型付け」に基づいています。オブジェクトが interface と同じプロパティを持っていれば互換性があります（Duck Typing）。type エイリアスでも同様のことができますが、interface は宣言マージ（同名 interface の自動結合）が可能です。API の型定義には interface が推奨されます。',
    },
    {
      id: 5,
      title: '関数の型付け',
      difficulty: 'beginner',
      description:
        '関数の引数と戻り値に型を付けると、呼び出し側で型の誤りを検出できます。引数: (a: number, b: number)、戻り値: : number で指定します。void は「何も返さない」を意味します。',
      task: '2つの number を受け取り、大きい方を返す関数 max を定義して結果を出力してください。',
      initialCode: '// 型付き関数 max を定義\n\n\nconsole.log(max(10, 25));',
      solutionCode: 'function max(a: number, b: number): number {\n  return a > b ? a : b;\n}\n\nconsole.log(max(10, 25));',
      expectedOutput: '25',
      hints: [
        'function max(a: number, b: number): number { ... }',
        '三項演算子: a > b ? a : b',
        '戻り値の型は : number で指定します',
      ],
      explanation:
        '関数の戻り値型は省略可能（型推論される）ですが、public な API や複雑な関数では明示的に書くことが推奨されます。アロー関数でも型付け可能: const max = (a: number, b: number): number => a > b ? a : b; 。void は返り値なし、never は絶対にreturnしない（例外を投げるなど）を表します。',
    },
    {
      id: 6,
      title: 'Union型とリテラル型',
      difficulty: 'beginner',
      description:
        'Union型 (A | B) は「AまたはB」を表します。リテラル型は特定の値だけを許可する型です。組み合わせると強力な制約を表現できます（例: "success" | "error"）。',
      task: '"success" | "error" の Status 型を定義し、Status 型の変数 status に "success" を代入して出力してください。',
      initialCode: '// Status 型を定義\n\n\nconst status: Status = "success";\nconsole.log(status);',
      solutionCode: 'type Status = "success" | "error";\n\nconst status: Status = "success";\nconsole.log(status);',
      expectedOutput: 'success',
      hints: [
        'type Status = "success" | "error"; と定義します',
        'Union型は | で区切ります',
        'リテラル型は具体的な値を型として使います',
      ],
      explanation:
        'リテラル型とUnion型の組み合わせは、TypeScriptで最も頻繁に使われるパターンの一つです。文字列リテラルのUnion型は enum の代替として使われ、より型安全で軽量です。"success" | "error" のような型は、API のレスポンスステータスの表現に最適です。',
    },
    {
      id: 7,
      title: 'Type Alias（型エイリアス）',
      difficulty: 'beginner',
      description:
        'type キーワードで既存の型に別名を付けられます。複雑な型定義に名前を付けることで、コードの可読性が大幅に向上します。interface との違いは、Union型やプリミティブ型にも名前を付けられる点です。',
      task: 'ID 型を string | number のUnion型として定義し、ID 型の変数に 42 と "abc" をそれぞれ代入して出力してください。',
      initialCode: '// ID 型を定義\n\n\nconst id1: ID = 42;\nconst id2: ID = "abc";\nconsole.log(id1);\nconsole.log(id2);',
      solutionCode: 'type ID = string | number;\n\nconst id1: ID = 42;\nconst id2: ID = "abc";\nconsole.log(id1);\nconsole.log(id2);',
      expectedOutput: '42\nabc',
      hints: [
        'type ID = string | number; と定義します',
        'ID 型は string でも number でも代入可能です',
        'type は複雑な型に名前を付ける構文です',
      ],
      explanation:
        'type alias は宣言マージができない（同名の再定義はエラー）点が interface との違いです。一般的に、オブジェクトの形状を定義するには interface、Union型やプリミティブの別名には type を使い分けます。型の命名は PascalCase が慣例です。',
    },
    {
      id: 8,
      title: 'Enum（列挙型）',
      difficulty: 'beginner',
      description:
        'Enum は名前付き定数の集合を定義します。数値 Enum はデフォルトで0から自動連番、文字列 Enum は各値を明示的に指定します。const enum にするとコンパイル時にインライン化され、パフォーマンスが向上します。',
      task: '文字列 Enum Direction に Up="UP", Down="DOWN" を定義し、Direction.Up を出力してください。',
      initialCode: '// Direction Enum を定義\n\n\nconsole.log(Direction.Up);',
      solutionCode: 'enum Direction {\n  Up = "UP",\n  Down = "DOWN",\n}\n\nconsole.log(Direction.Up);',
      expectedOutput: 'UP',
      hints: [
        'enum Direction { ... } で定義します',
        '文字列 Enum は Up = "UP" のように値を明示します',
        'Direction.Up で値にアクセスします',
      ],
      explanation:
        '文字列 Enum は値が明確でデバッグしやすい反面、リテラル型のUnion ("UP" | "DOWN") で代替可能です。現代のTypeScriptでは、Enum よりも as const + typeof パターンが好まれることもあります。ただし、Enum はリバースマッピング（値→名前）が使える利点があります。',
    },
    {
      id: 9,
      title: 'テンプレートリテラル型',
      difficulty: 'beginner',
      description:
        'JavaScript のテンプレートリテラル（`${変数}`）は TypeScript でも使えます。さらに TypeScript ではテンプレートリテラル「型」も定義でき、文字列パターンの型安全性を確保できます。',
      task: '変数 name と age を使って、テンプレートリテラルで「Name: 太郎, Age: 25」と出力してください。',
      initialCode: 'const name: string = "太郎";\nconst age: number = 25;\n\n// テンプレートリテラルで出力\nconsole.log();',
      solutionCode: 'const name: string = "太郎";\nconst age: number = 25;\n\nconsole.log(`Name: ${name}, Age: ${age}`);',
      expectedOutput: 'Name: 太郎, Age: 25',
      hints: [
        'バッククォート ` で囲みます',
        '変数は ${name} の形で埋め込みます',
        '`Name: ${name}, Age: ${age}` と書きます',
      ],
      explanation:
        'テンプレートリテラルはES2015(ES6)で導入された機能で、文字列連結 (+) よりも可読性が高いです。TypeScriptでは型レベルでも活用でき、type EventName = `on${string}` のようにパターンを型として定義できます（TypeScript 4.1+）。',
    },
    {
      id: 10,
      title: '制御フロー — 型ガードの基礎',
      difficulty: 'beginner',
      description:
        'TypeScript は条件分岐の中で型を自動的に絞り込みます（型の絞り込み / Narrowing）。typeof, instanceof, in 演算子で型を判定すると、そのブランチ内では型が確定します。',
      task: 'string | number 型の input に "hello" を代入し、typeof で型を判定して string なら大文字に変換、number なら2倍にして出力してください。',
      initialCode: 'const input: string | number = "hello";\n\n// typeof で型を判定して処理\n',
      solutionCode: 'const input: string | number = "hello";\n\nif (typeof input === "string") {\n  console.log(input.toUpperCase());\n} else {\n  console.log(input * 2);\n}',
      expectedOutput: 'HELLO',
      hints: [
        'typeof input === "string" で型を判定します',
        'string ブランチでは .toUpperCase() が使えます',
        'else ブランチでは自動的に number に絞り込まれます',
      ],
      explanation:
        '型の絞り込み（Narrowing）はTypeScriptの最も重要な機能の一つです。typeof, instanceof, in, === null などのチェック後、TypeScriptは自動的に型を狭めます。これにより、Union型を安全に扱えます。カスタム型ガード関数（is 述語）を定義すると、独自のナローイングも可能です。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: 'ジェネリクスの基礎',
      difficulty: 'intermediate',
      description:
        'ジェネリクス（Generics）は型をパラメータ化する仕組みです。<T> で型変数を定義し、呼び出し時に具体的な型を渡します。コードの再利用性と型安全性を両立させる最重要概念です。',
      task: '任意の型 T の配列の最初の要素を返すジェネリック関数 first<T> を定義し、数値配列と文字列配列で使ってください。',
      initialCode: '// ジェネリック関数 first を定義\n\n\nconsole.log(first([1, 2, 3]));\nconsole.log(first(["a", "b", "c"]));',
      solutionCode: 'function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconsole.log(first([1, 2, 3]));\nconsole.log(first(["a", "b", "c"]));',
      expectedOutput: '1\na',
      hints: [
        'function first<T>(arr: T[]): T | undefined { ... }',
        '<T> が型パラメータで、呼び出し時に推論されます',
        '空配列の場合のため undefined も返せるようにします',
      ],
      explanation:
        'ジェネリクスは「型安全なコンテナ」を作る仕組みです。any を使うと型安全性が失われますが、ジェネリクスなら型情報を保持したまま汎用的なコードが書けます。型引数は通常 T, U, K, V などの1文字ですが、意味のある名前（TItem, TKey）を使うとより読みやすくなります。',
    },
    {
      id: 12,
      title: 'ジェネリック制約（extends）',
      difficulty: 'intermediate',
      description:
        'ジェネリック型に制約を付けると、特定のプロパティやメソッドを持つ型のみを受け付けられます。<T extends 条件> で制約を定義します。',
      task: 'length プロパティを持つ型のみを受け付け、その長さを返すジェネリック関数 getLength を定義してください。',
      initialCode: '// getLength 関数を定義（length を持つ型のみ受付）\n\n\nconsole.log(getLength("hello"));\nconsole.log(getLength([1, 2, 3]));',
      solutionCode: 'function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}\n\nconsole.log(getLength("hello"));\nconsole.log(getLength([1, 2, 3]));',
      expectedOutput: '5\n3',
      hints: [
        '<T extends { length: number }> で制約を付けます',
        'string も配列も length プロパティを持ちます',
        '制約を満たさない型（number など）はコンパイルエラーになります',
      ],
      explanation:
        'ジェネリック制約は「型の最小要件」を定義します。extends は型パラメータが少なくともその型と互換性があることを要求します。interface と組み合わせて <T extends Printable> のように使うことで、特定の振る舞いを保証できます。これは SOLID 原則のリスコフの置換原則（LSP）にも通じます。',
    },
    {
      id: 13,
      title: 'ユーティリティ型',
      difficulty: 'intermediate',
      description:
        'TypeScript には便利な組み込みユーティリティ型があります。Partial<T> は全プロパティを省略可能に、Required<T> は全プロパティを必須に、Pick<T, K> は特定のプロパティだけを抽出、Omit<T, K> は特定のプロパティを除外します。',
      task: 'User interface から name だけを持つ型を Pick で作り、オブジェクトを出力してください。',
      initialCode: 'interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Pick で name だけの型を作成\n\nconsole.log(nameOnly);',
      solutionCode: 'interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\nconst nameOnly: Pick<User, "name"> = { name: "太郎" };\nconsole.log(nameOnly);',
      expectedOutput: '[object Object]',
      hints: [
        'Pick<User, "name"> で name プロパティだけの型になります',
        'const nameOnly: Pick<User, "name"> = { name: "太郎" };',
        '複数選択は Pick<User, "name" | "age"> のようにします',
      ],
      explanation:
        'ユーティリティ型は既存の型を変換する「型レベルの関数」です。Readonly<T>（全プロパティを読み取り専用）、Record<K, V>（キーと値の型を指定したオブジェクト）、Exclude/Extract（Union型の操作）なども頻繁に使われます。これらを組み合わせることで、DRY（Don\'t Repeat Yourself）な型定義が実現できます。',
    },
    {
      id: 14,
      title: '型ガードとナローイング',
      difficulty: 'intermediate',
      description:
        'カスタム型ガード関数は戻り値に is キーワードを使って、引数の型を絞り込みます。複雑なUnion型を安全に扱うための重要なテクニックです。',
      task: 'isString 型ガード関数を定義し、string | number の値を安全に処理してください。',
      initialCode: '// isString 型ガード関数を定義\n\n\nfunction process(value: string | number): string {\n  if (isString(value)) {\n    return value.toUpperCase();\n  }\n  return String(value * 2);\n}\n\nconsole.log(process("hello"));\nconsole.log(process(21));',
      solutionCode: 'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction process(value: string | number): string {\n  if (isString(value)) {\n    return value.toUpperCase();\n  }\n  return String(value * 2);\n}\n\nconsole.log(process("hello"));\nconsole.log(process(21));',
      expectedOutput: 'HELLO\n42',
      hints: [
        '戻り値の型に value is string と書きます',
        'typeof value === "string" で判定します',
        '型ガードにより、if ブランチ内では string として扱えます',
      ],
      explanation:
        'カスタム型ガードは value is Type の形式で、TypeScriptに「この関数がtrueを返したら、引数はこの型」と伝えます。unknown 型（any より安全な「何でもあり」型）をナローイングする際に特に有用です。ライブラリでは z.string()（Zod）のようなバリデーション兼型ガードが人気です。',
    },
    {
      id: 15,
      title: 'Intersection型',
      difficulty: 'intermediate',
      description:
        'Intersection型（&）は複数の型を「すべて満たす」型を作ります。Union（|）が「AまたはB」なのに対し、Intersection（&）は「AかつB」です。Mixin パターンの実現に使われます。',
      task: 'Timestamped と Serializable の2つの interface を & で結合した型のオブジェクトを作って出力してください。',
      initialCode: 'interface Timestamped {\n  createdAt: string;\n}\n\ninterface Serializable {\n  serialize(): string;\n}\n\n// Intersection型のオブジェクトを作成\n\nconsole.log(obj.serialize());',
      solutionCode: 'interface Timestamped {\n  createdAt: string;\n}\n\ninterface Serializable {\n  serialize(): string;\n}\n\nconst obj: Timestamped & Serializable = {\n  createdAt: "2024-01-01",\n  serialize() {\n    return JSON.stringify({ createdAt: this.createdAt });\n  },\n};\n\nconsole.log(obj.serialize());',
      expectedOutput: '{"createdAt":"2024-01-01"}',
      hints: [
        'Timestamped & Serializable で両方のプロパティを持つ型になります',
        'オブジェクトは createdAt と serialize() の両方を持つ必要があります',
        'JSON.stringify でシリアライズします',
      ],
      explanation:
        'Intersection型はOOPの多重継承に似ていますが、型レベルの合成です。interface の extends と似ていますが、Intersection型はインラインで使える利点があります。型同士が矛盾する場合（string & number）、never 型になります。',
    },
    {
      id: 16,
      title: 'インデックスシグネチャ',
      difficulty: 'intermediate',
      description:
        'インデックスシグネチャ（{ [key: string]: type }）は、任意のキー名を許容するオブジェクト型を定義します。Record<K, V> ユーティリティ型でも同様のことが可能です。',
      task: '文字列キーと数値のインデックスシグネチャを持つ型 Scores を定義し、教科のスコアを格納して出力してください。',
      initialCode: '// Scores 型を定義\n\n\nconst scores: Scores = {\n  math: 90,\n  english: 85,\n  science: 92,\n};\n\nconsole.log(scores["math"]);',
      solutionCode: 'interface Scores {\n  [subject: string]: number;\n}\n\nconst scores: Scores = {\n  math: 90,\n  english: 85,\n  science: 92,\n};\n\nconsole.log(scores["math"]);',
      expectedOutput: '90',
      hints: [
        '[subject: string]: number で任意の文字列キーと数値の型を定義',
        'Record<string, number> でも同じことができます',
        'Object.keys() でキー一覧を取得できます',
      ],
      explanation:
        'インデックスシグネチャはマップ的なデータ構造の型定義に使います。ただし、存在しないキーへのアクセスも型エラーにならないため注意が必要です。noUncheckedIndexedAccess オプションを有効にすると、戻り値が T | undefined になり安全性が向上します。',
    },
    {
      id: 17,
      title: 'Mapped Types（マップ型）',
      difficulty: 'intermediate',
      description:
        'Mapped Types は既存の型のプロパティを変換して新しい型を作ります。{ [K in keyof T]: 新しい型 } の構文で、全プロパティに変換を適用できます。Partial, Required, Readonly などはすべて Mapped Types で実装されています。',
      task: 'すべてのプロパティを string 型に変換する Stringify<T> 型を定義して使用してください。',
      initialCode: 'interface Config {\n  port: number;\n  host: string;\n  debug: boolean;\n}\n\n// Stringify 型を定義\n\n\nconst config: Stringify<Config> = {\n  port: "3000",\n  host: "localhost",\n  debug: "true",\n};\n\nconsole.log(config.port);',
      solutionCode: 'interface Config {\n  port: number;\n  host: string;\n  debug: boolean;\n}\n\ntype Stringify<T> = {\n  [K in keyof T]: string;\n};\n\nconst config: Stringify<Config> = {\n  port: "3000",\n  host: "localhost",\n  debug: "true",\n};\n\nconsole.log(config.port);',
      expectedOutput: '3000',
      hints: [
        'type Stringify<T> = { [K in keyof T]: string };',
        'keyof T でTのキーのUnion型を取得します',
        '[K in ...] で各キーに対して型を変換します',
      ],
      explanation:
        'Mapped Types は TypeScript の型システムの核心的な機能です。修飾子の追加/除去も可能: + readonly（読み取り専用の追加）、-?（省略可能の除去）。Conditional Types と組み合わせると、条件に基づく高度な型変換が実現できます。',
    },
    {
      id: 18,
      title: 'Conditional Types（条件付き型）',
      difficulty: 'intermediate',
      description:
        'Conditional Types は T extends U ? X : Y の形で、型の条件分岐を行います。ジェネリクスと組み合わせて、入力の型に応じた戻り値の型を動的に決定できます。',
      task: '型 T が string を extends するなら "text"、そうでなければ "other" を返す TypeCheck<T> 型を定義してください。',
      initialCode: '// TypeCheck 条件付き型を定義\n\n\nconst a: TypeCheck<string> = "text";\nconst b: TypeCheck<number> = "other";\n\nconsole.log(a);\nconsole.log(b);',
      solutionCode: 'type TypeCheck<T> = T extends string ? "text" : "other";\n\nconst a: TypeCheck<string> = "text";\nconst b: TypeCheck<number> = "other";\n\nconsole.log(a);\nconsole.log(b);',
      expectedOutput: 'text\nother',
      hints: [
        'type TypeCheck<T> = T extends string ? "text" : "other";',
        '三項演算子のような構文で型を条件分岐します',
        'string を extends する → "text"、しない → "other"',
      ],
      explanation:
        'Conditional Types は型レベルの if 文です。分配（Distribution）機能により、Union型の各メンバーに対して自動的に適用されます（TypeCheck<string | number> → "text" | "other"）。infer キーワードと組み合わせると、型の一部を抽出できます。',
    },
    {
      id: 19,
      title: 'クラスとアクセス修飾子',
      difficulty: 'intermediate',
      description:
        'TypeScript のクラスには public, private, protected のアクセス修飾子があります。private はクラス内のみ、protected は子クラスからもアクセス可能、public はどこからでもアクセス可能です。',
      task: 'name (public) と balance (private) を持つ BankAccount クラスを定義し、getBalance() メソッドで残高を返してください。',
      initialCode: '// BankAccount クラスを定義\n\n\nconst account = new BankAccount("太郎", 1000);\nconsole.log(account.getBalance());',
      solutionCode: 'class BankAccount {\n  public name: string;\n  private balance: number;\n\n  constructor(name: string, balance: number) {\n    this.name = name;\n    this.balance = balance;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}\n\nconst account = new BankAccount("太郎", 1000);\nconsole.log(account.getBalance());',
      expectedOutput: '1000',
      hints: [
        'private balance: number; で外部からのアクセスを禁止します',
        'getBalance() メソッドでのみ balance を公開します',
        'これがカプセル化の原則です',
      ],
      explanation:
        'アクセス修飾子はカプセル化（Encapsulation）を実現します。内部実装を隠蔽し、公開するインターフェースのみを提供することで、変更に強い設計になります。TypeScript のprivateはコンパイル時のみの制約で、実行時のJavaScriptにはない点に注意。ES2022の # プライベートフィールドは実行時にも強制されます。',
    },
    {
      id: 20,
      title: '抽象クラス',
      difficulty: 'intermediate',
      description:
        '抽象クラス（abstract class）はインスタンス化できないクラスで、抽象メソッド（実装のないメソッド）を定義できます。子クラスは必ず抽象メソッドを実装する必要があります。interface とクラスの中間的な存在です。',
      task: 'abstract メソッド area() を持つ Shape 抽象クラスを作り、Rectangle で実装してください。width=5, height=3 で面積を出力してください。',
      initialCode: '// Shape 抽象クラスと Rectangle を定義\n\n\nconst rect = new Rectangle(5, 3);\nconsole.log(rect.area());',
      solutionCode: 'abstract class Shape {\n  abstract area(): number;\n}\n\nclass Rectangle extends Shape {\n  constructor(private width: number, private height: number) {\n    super();\n  }\n\n  area(): number {\n    return this.width * this.height;\n  }\n}\n\nconst rect = new Rectangle(5, 3);\nconsole.log(rect.area());',
      expectedOutput: '15',
      hints: [
        'abstract class Shape で抽象クラスを定義します',
        'abstract area(): number; で抽象メソッドを宣言します',
        'constructor のパラメータに private を付けると自動でプロパティになります',
      ],
      explanation:
        '抽象クラスは「部分的な実装を持つインターフェース」です。共通のメソッドを抽象クラスに実装し、サブクラス固有の部分を抽象メソッドとして定義するのがTemplate Methodパターンです。constructor のパラメータプロパティ（private width: number）は TypeScript の便利な糖衣構文で、宣言と代入を1行で行えます。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'infer キーワード',
      difficulty: 'advanced',
      description:
        'infer は Conditional Types 内で型の一部を「推論して抽出」するキーワードです。関数の戻り値型の抽出（ReturnType<T>）や配列の要素型の抽出などに使われます。',
      task: '関数型から戻り値の型を抽出する MyReturnType<T> を定義し、() => string 関数の戻り値型を取得してください。',
      initialCode: '// MyReturnType を定義\n\n\ntype Fn = () => string;\ntype Result = MyReturnType<Fn>;\n\nconst value: Result = "hello";\nconsole.log(value);',
      solutionCode: 'type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;\n\ntype Fn = () => string;\ntype Result = MyReturnType<Fn>;\n\nconst value: Result = "hello";\nconsole.log(value);',
      expectedOutput: 'hello',
      hints: [
        'T extends (...args: unknown[]) => infer R ? R : never',
        'infer R で戻り値の型を R に抽出します',
        '条件が合わない場合は never を返します',
      ],
      explanation:
        'infer はパターンマッチの型版です。T extends Promise<infer U> ? U : T（Promise のアンラップ）、T extends (infer U)[] ? U : T（配列要素の抽出）など、複雑な型操作が可能になります。TypeScript の標準ユーティリティ型（ReturnType, Parameters, ConstructorParameters）はすべて infer で実装されています。',
    },
    {
      id: 22,
      title: 'テンプレートリテラル型',
      difficulty: 'advanced',
      description:
        'テンプレートリテラル型は `${A}${B}` の形で文字列パターンの型を定義します。TypeScript 4.1で導入され、型安全な文字列操作を可能にしました。イベント名や API パスの型定義に有用です。',
      task: '"get" | "set" と "Name" | "Age" を組み合わせた型 Methods を定義してください。',
      initialCode: 'type Verb = "get" | "set";\ntype Prop = "Name" | "Age";\n\n// テンプレートリテラル型で Methods を定義\n\n\nconst method: Methods = "getName";\nconsole.log(method);',
      solutionCode: 'type Verb = "get" | "set";\ntype Prop = "Name" | "Age";\n\ntype Methods = `${Verb}${Prop}`;\n\nconst method: Methods = "getName";\nconsole.log(method);',
      expectedOutput: 'getName',
      hints: [
        'type Methods = `${Verb}${Prop}`;',
        'Union型同士の組み合わせで全パターンが自動生成されます',
        'Methods は "getName" | "getAge" | "setName" | "setAge" になります',
      ],
      explanation:
        'テンプレートリテラル型はUnion型と組み合わせると、すべての組み合わせを自動生成します（分配動作）。組み込みの Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T> と組み合わせて、型レベルの文字列変換も可能です。DOM のイベント型定義などに実用されています。',
    },
    {
      id: 23,
      title: 'Discriminated Union（判別共用体）',
      difficulty: 'advanced',
      description:
        'Discriminated Union は共通のリテラル型プロパティ（判別子）を持つUnion型です。switch 文で判別子を分岐すると、各 case 内で型が自動的にナローイングされます。TypeScript で最も推奨されるパターンの一つです。',
      task: 'type フィールドを判別子とする Circle と Square の Discriminated Union を作り、面積を計算する関数を定義してください。',
      initialCode: 'interface Circle {\n  type: "circle";\n  radius: number;\n}\n\ninterface Square {\n  type: "square";\n  side: number;\n}\n\ntype Shape = Circle | Square;\n\n// area 関数を定義\n\n\nconsole.log(area({ type: "circle", radius: 5 }));\nconsole.log(area({ type: "square", side: 4 }));',
      solutionCode: 'interface Circle {\n  type: "circle";\n  radius: number;\n}\n\ninterface Square {\n  type: "square";\n  side: number;\n}\n\ntype Shape = Circle | Square;\n\nfunction area(shape: Shape): number {\n  switch (shape.type) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "square":\n      return shape.side ** 2;\n  }\n}\n\nconsole.log(area({ type: "circle", radius: 5 }));\nconsole.log(area({ type: "square", side: 4 }));',
      expectedOutput: '78.53981633974483\n16',
      hints: [
        'switch (shape.type) で判別します',
        '"circle" ケースでは shape.radius にアクセス可能になります',
        '"square" ケースでは shape.side にアクセス可能になります',
      ],
      explanation:
        'Discriminated Union は「代数的データ型」のTypeScript版で、関数型プログラミングの影響を受けています。網羅性チェック（exhaustiveness check）を使えば、新しい variant を追加した時にswitch文の更新漏れをコンパイルエラーで検出できます。default: never パターンを使います。',
    },
    {
      id: 24,
      title: 'モジュールシステム',
      difficulty: 'advanced',
      description:
        'TypeScript/JavaScript の ES Modules では import/export でモジュール間の依存関係を管理します。名前付きエクスポート（export { }）とデフォルトエクスポート（export default）があります。',
      task: '名前付きエクスポートされた関数 greet とデフォルトエクスポートされた定数を模擬して、それぞれ出力してください。',
      initialCode: '// モジュールの概念を理解するコード\n// 実際には別ファイルに分割しますが、ここでは1ファイルで模擬\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconst VERSION = "1.0.0";\n\n// 使用側\nconsole.log(greet("World"));\nconsole.log(VERSION);',
      solutionCode: 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconst VERSION = "1.0.0";\n\nconsole.log(greet("World"));\nconsole.log(VERSION);',
      expectedOutput: 'Hello, World!\n1.0.0',
      hints: [
        'export function greet(...) で名前付きエクスポート',
        'export default VERSION でデフォルトエクスポート',
        '実行環境では import { greet } from "./module" の形で使います',
      ],
      explanation:
        'ES Modules は JavaScript の標準モジュールシステムで、TreeShaking（未使用コードの除去）が可能です。名前付きエクスポートが推奨され、デフォルトエクスポートはリファクタリング時に問題を起こしやすいとされます。barrel ファイル（index.ts で再エクスポート）はAPIの表面積を制御するのに有用です。',
    },
    {
      id: 25,
      title: '宣言ファイル（.d.ts）',
      difficulty: 'advanced',
      description:
        '.d.ts ファイルは型情報だけを記述した宣言ファイルです。JavaScript ライブラリに型を付けるために使われます。declare キーワードで型を宣言し、実装は含みません。@types パッケージは .d.ts の集積です。',
      task: 'declare で外部関数 fetchData の型を宣言する概念を理解し、型付けされた関数を実装して出力してください。',
      initialCode: '// .d.ts ファイルの概念\n// declare function fetchData(url: string): Promise<string>;\n\n// 上記の宣言に合う実装を書いてみましょう\nfunction fetchData(url: string): string {\n  return `Data from ${url}`;\n}\n\nconsole.log(fetchData("https://api.example.com"));',
      solutionCode: 'function fetchData(url: string): string {\n  return `Data from ${url}`;\n}\n\nconsole.log(fetchData("https://api.example.com"));',
      expectedOutput: 'Data from https://api.example.com',
      hints: [
        'declare は「この関数/変数が存在すること」を型レベルで宣言します',
        '@types/node, @types/react など DefinitelyTyped の型定義',
        '.d.ts ファイルにはランタイムコードを含められません',
      ],
      explanation:
        '.d.ts ファイルは TypeScript エコシステムの基盤です。DefinitelyTyped（@types/xxx）は世界最大の型定義リポジトリで、多くの JavaScript ライブラリの型を提供しています。自作の .d.ts では declare module "xxx" で外部モジュールの型を拡張できます（モジュール拡張）。',
    },
    {
      id: 26,
      title: 'デコレータ',
      difficulty: 'advanced',
      description:
        'デコレータはクラスやメソッドにメタデータや振る舞いを追加する構文です。TC39 Stage 3 のデコレータ提案が TypeScript 5.0 で正式サポートされました。クラス、メソッド、プロパティなどに適用できます。',
      task: 'メソッドの実行をログ出力するデコレータの概念を関数で模擬してください。',
      initialCode: '// デコレータの概念を関数で模擬\nfunction withLog(fn: Function, name: string) {\n  return function(...args: unknown[]) {\n    console.log(`Calling ${name}`);\n    const result = fn(...args);\n    console.log(`Result: ${result}`);\n    return result;\n  };\n}\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconst loggedAdd = withLog(add, "add");\nloggedAdd(3, 5);',
      solutionCode: 'function withLog(fn: Function, name: string) {\n  return function(...args: unknown[]) {\n    console.log(`Calling ${name}`);\n    const result = fn(...args);\n    console.log(`Result: ${result}`);\n    return result;\n  };\n}\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconst loggedAdd = withLog(add, "add");\nloggedAdd(3, 5);',
      expectedOutput: 'Calling add\nResult: 8',
      hints: [
        'デコレータは「関数を受け取り、拡張した関数を返す」高階関数です',
        '@decorator 構文はこの概念のシンタックスシュガーです',
        'withLog が元の関数をラップして前後にログを追加します',
      ],
      explanation:
        'デコレータはAOP（アスペクト指向プログラミング）をTypeScriptで実現する手段です。NestJS, Angular など主要フレームワークがデコレータを活用しています。TypeScript 5.0のデコレータは ECMAScript標準に準拠しており、experimentalDecorators とは異なる新しい仕様です。',
    },
    {
      id: 27,
      title: '再帰型（Recursive Types）',
      difficulty: 'advanced',
      description:
        '再帰型は自身を参照する型定義で、ツリー構造、ネストされたオブジェクト、JSON型などの表現に使われます。',
      task: 'ネストされたファイルシステムを表す FileNode 型を定義してください。name と children（FileNode の配列）を持ちます。',
      initialCode: '// FileNode 再帰型を定義\n\n\nconst root: FileNode = {\n  name: "src",\n  children: [\n    { name: "index.ts", children: [] },\n    {\n      name: "utils",\n      children: [\n        { name: "helper.ts", children: [] }\n      ]\n    }\n  ]\n};\n\nconsole.log(root.name);\nconsole.log(root.children.length);',
      solutionCode: 'interface FileNode {\n  name: string;\n  children: FileNode[];\n}\n\nconst root: FileNode = {\n  name: "src",\n  children: [\n    { name: "index.ts", children: [] },\n    {\n      name: "utils",\n      children: [\n        { name: "helper.ts", children: [] }\n      ]\n    }\n  ]\n};\n\nconsole.log(root.name);\nconsole.log(root.children.length);',
      expectedOutput: 'src\n2',
      hints: [
        'interface FileNode { name: string; children: FileNode[]; }',
        'children プロパティが FileNode[] で自身を参照しています',
        'これでどれだけ深いツリーでも型安全です',
      ],
      explanation:
        '再帰型はツリー構造（ファイルシステム、DOM、AST）、JSON型（type JSON = string | number | boolean | null | JSON[] | { [key: string]: JSON }）などに必須です。型の深さに制限はありますが、実用上問題になることは稀です。LinkedList や Binary Tree も再帰型で表現できます。',
    },
    {
      id: 28,
      title: 'パターンマッチング型',
      difficulty: 'advanced',
      description:
        '高度な型操作として、条件型と infer を組み合わせたパターンマッチングがあります。型レベルで文字列操作や配列操作が可能です。',
      task: '配列の最初の要素の型を取得する Head<T> 型を定義してください。',
      initialCode: '// Head 型を定義（配列の最初の要素の型を取得）\n\n\ntype A = Head<[string, number, boolean]>;\nconst a: A = "hello";\nconsole.log(a);\n\ntype B = Head<[42, "text"]>;\nconst b: B = 42;\nconsole.log(b);',
      solutionCode: 'type Head<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;\n\ntype A = Head<[string, number, boolean]>;\nconst a: A = "hello";\nconsole.log(a);\n\ntype B = Head<[42, "text"]>;\nconst b: B = 42;\nconsole.log(b);',
      expectedOutput: 'hello\n42',
      hints: [
        'T extends [infer First, ...unknown[]] でパターンマッチングします',
        'infer First で最初の要素の型を抽出します',
        '...unknown[] が残りの要素にマッチします',
      ],
      explanation:
        '可変長タプルの型操作（TypeScript 4.0+）により、型レベルでのリスト操作が可能になりました。Head, Tail, Last, Push, Pop などの型レベルユーティリティを作成できます。Type Challenges（型パズル問題集）でこれらのテクニックを練習すると、TypeScriptの型システムへの理解が深まります。',
    },
    {
      id: 29,
      title: 'エラーハンドリングパターン',
      difficulty: 'advanced',
      description:
        'TypeScript では Result 型パターン（成功/失敗を型で表現）が広く使われます。例外の throw ではなく、戻り値で成功/失敗を返すことで、エラーハンドリングの漏れを型レベルで防止できます。',
      task: 'Result<T, E> 型を定義し、成功/失敗をパターンで処理してください。',
      initialCode: '// Result 型を定義\ntype Result<T, E> = { ok: true; value: T } | { ok: false; error: E };\n\nfunction divide(a: number, b: number): Result<number, string> {\n  // ゼロ除算をチェック\n}\n\nconst r1 = divide(10, 2);\nconst r2 = divide(10, 0);\n\nif (r1.ok) console.log(r1.value);\nif (!r2.ok) console.log(r2.error);',
      solutionCode: 'type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };\n\nfunction divide(a: number, b: number): Result<number, string> {\n  if (b === 0) {\n    return { ok: false, error: "Division by zero" };\n  }\n  return { ok: true, value: a / b };\n}\n\nconst r1 = divide(10, 2);\nconst r2 = divide(10, 0);\n\nif (r1.ok) console.log(r1.value);\nif (!r2.ok) console.log(r2.error);',
      expectedOutput: '5\nDivision by zero',
      hints: [
        'b === 0 の場合は { ok: false, error: "..." } を返す',
        '正常時は { ok: true, value: a / b } を返す',
        'Discriminated Union パターンで型安全にエラーを処理',
      ],
      explanation:
        'Result型（Either型）は関数型プログラミングの影響を受けたパターンで、Rust の Result<T, E> と同じ概念です。throw/catch と異なり、エラーが戻り値の型に含まれるため「エラーを無視する」ことが不可能になります。neverthrow, ts-results などのライブラリがこのパターンを実装しています。',
    },
    {
      id: 30,
      title: '高度な型チャレンジ — DeepReadonly',
      difficulty: 'advanced',
      description:
        '総合問題として、ネストされたオブジェクトの全プロパティを再帰的に readonly にする DeepReadonly<T> 型を実装します。Mapped Types, Conditional Types, 再帰型の知識を総合します。',
      task: 'DeepReadonly<T> 型を定義し、ネストされたオブジェクトの値を出力してください。',
      initialCode: '// DeepReadonly 型を定義\n\n\ninterface Config {\n  db: {\n    host: string;\n    port: number;\n  };\n  debug: boolean;\n}\n\nconst config: DeepReadonly<Config> = {\n  db: { host: "localhost", port: 5432 },\n  debug: false,\n};\n\nconsole.log(config.db.host);\nconsole.log(config.db.port);',
      solutionCode: 'type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\n\ninterface Config {\n  db: {\n    host: string;\n    port: number;\n  };\n  debug: boolean;\n}\n\nconst config: DeepReadonly<Config> = {\n  db: { host: "localhost", port: 5432 },\n  debug: false,\n};\n\nconsole.log(config.db.host);\nconsole.log(config.db.port);',
      expectedOutput: 'localhost\n5432',
      hints: [
        'Mapped Types で readonly を付けます',
        'Conditional Types でオブジェクト型を再帰的に処理',
        'T[K] extends object ? DeepReadonly<T[K]> : T[K]',
      ],
      explanation:
        'DeepReadonly はMapped Types, Conditional Types, 再帰型の集大成です。実務では ts-essentials, type-fest などのライブラリが多数のユーティリティ型を提供しています。イミュータビリティはバグの少ないコードの基本原則で、React の props や Redux の state でも重要です。TypeScript の型システムはチューリング完全であり、理論上はどんな計算も型レベルで表現可能です。',
    },
  ],
};

export default course;
