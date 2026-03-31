import type { ReadingCourse } from './types';

const course: ReadingCourse = {
  id: 'typescript',
  lessons: [
    // ──── Beginner (id 1-11) ────
    {
      id: 1,
      title: 'Type-Safe Configuration',
      titleJa: '型安全な設定管理',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'as constとSatisfiesを活用して型安全な設定オブジェクトを作る手法を学びます。',
      bookReference: 'Effective TypeScript 第2章',
      code: `// 型安全な設定管理
// BAD: any型や型アサーションに頼る設定
// GOOD: as const + satisfies で型安全に

interface AppConfig {
  apiUrl: string;
  timeout: number;
  retryCount: number;
  features: Record<string, boolean>;
}

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retryCount: 3,
  features: {
    darkMode: true,
    notifications: false,
    betaFeatures: true,
  },
} as const satisfies AppConfig;

// configの各プロパティはリテラル型として推論される
type ApiUrl = typeof config.apiUrl;
// => "https://api.example.com"

function getFeatureFlag(key: keyof typeof config.features): boolean {
  return config.features[key];
}

// コンパイル時にキーの存在チェック
const isDarkMode = getFeatureFlag('darkMode');    // OK
// getFeatureFlag('unknown');  // コンパイルエラー`,
      highlights: [
        { startLine: 5, endLine: 10, color: '#f59e0b', label: '型定義', explanation: 'AppConfig interfaceで設定の構造を明確に定義' },
        { startLine: 12, endLine: 21, color: '#22c55e', label: 'as const satisfies', explanation: 'as constでリテラル型推論、satisfiesで型チェックを両立' },
        { startLine: 27, endLine: 29, color: '#3b82f6', label: '型安全なアクセサ', explanation: 'keyofで存在するキーのみ受け付ける関数' },
      ],
      keyPoints: [
        'as constでオブジェクトをリテラル型として凍結できる',
        'satisfiesは型チェックしつつリテラル型を維持する',
        'keyof typeofで設定キーの自動補完が効く',
        '実行時エラーをコンパイル時に検出できる',
      ],
    },
    {
      id: 2,
      title: 'Discriminated Unions',
      titleJa: '判別共用体',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'タグ付きユニオン型で状態を安全に管理し、switch文で網羅的チェックを行います。',
      bookReference: 'Effective TypeScript 第32項',
      code: `// 判別共用体（Discriminated Unions）
// typeプロパティで状態を区別し、型安全に分岐する

type LoadingState = {
  type: 'loading';
};

type SuccessState<T> = {
  type: 'success';
  data: T;
  updatedAt: Date;
};

type ErrorState = {
  type: 'error';
  message: string;
  code: number;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// 網羅性チェック（Exhaustive Check）
function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${x}\`);
}

function renderState<T>(state: AsyncState<T>): string {
  switch (state.type) {
    case 'loading':
      return 'Loading...';
    case 'success':
      // この分岐内ではstate.dataにアクセス可能
      return \`Data loaded at \${state.updatedAt.toISOString()}\`;
    case 'error':
      return \`Error \${state.code}: \${state.message}\`;
    default:
      return assertNever(state);
  }
}

// 使用例
const state: AsyncState<string[]> = {
  type: 'success',
  data: ['item1', 'item2'],
  updatedAt: new Date(),
};

console.log(renderState(state));`,
      highlights: [
        { startLine: 4, endLine: 20, color: '#f59e0b', label: '状態型定義', explanation: 'typeプロパティをタグとして各状態を定義' },
        { startLine: 20, endLine: 20, color: '#a855f7', label: 'ユニオン型', explanation: '3つの状態を1つの型に統合' },
        { startLine: 23, endLine: 25, color: '#ef4444', label: '網羅性チェック', explanation: 'never型で全ケース処理を強制' },
        { startLine: 27, endLine: 39, color: '#22c55e', label: '型の絞り込み', explanation: 'switch文で各分岐内の型が自動推論される' },
      ],
      keyPoints: [
        'type プロパティをタグとして型を判別する',
        'switch-case で型が自動的に絞り込まれる',
        'never型で網羅性チェックを行い漏れを防ぐ',
        '新しい状態追加時にコンパイルエラーで気づける',
      ],
    },
    {
      id: 3,
      title: 'Generic Utility Functions',
      titleJa: 'ジェネリックユーティリティ',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'ジェネリクスと型制約を使って再利用可能で型安全なユーティリティ関数を作ります。',
      code: `// ジェネリックユーティリティ関数
// 型パラメータと制約で安全かつ柔軟な関数を作る

// オブジェクトから安全にプロパティを取得
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 配列をキーでグループ化
function groupBy<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

// null/undefinedを除外
function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => item != null);
}

// 型安全なパイプライン
function pipe<A, B>(a: A, fn1: (a: A) => B): B;
function pipe<A, B, C>(a: A, fn1: (a: A) => B, fn2: (b: B) => C): C;
function pipe(a: unknown, ...fns: Function[]): unknown {
  return fns.reduce((acc, fn) => fn(acc), a);
}

// 使用例
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Carol', role: 'user' },
];

const grouped = groupBy(users, (u) => u.role);
// typeof grouped = Record<"admin" | "user", User[]>

const name = getProperty(users[0], 'name');
// typeof name = string`,
      highlights: [
        { startLine: 5, endLine: 7, color: '#22c55e', label: 'keyof制約', explanation: 'K extends keyof Tでオブジェクトに存在するキーのみ指定可能' },
        { startLine: 10, endLine: 20, color: '#3b82f6', label: 'groupBy', explanation: 'ジェネリクスで入力型を保持したグルーピング' },
        { startLine: 23, endLine: 25, color: '#22c55e', label: '型ガード', explanation: 'item is T というユーザー定義型ガードでnullを除外' },
        { startLine: 28, endLine: 32, color: '#a855f7', label: 'オーバーロード', explanation: '関数オーバーロードで型安全なパイプラインを実現' },
      ],
      keyPoints: [
        'extends keyof で型パラメータに制約を付ける',
        'ユーザー定義型ガード (is T) で型を絞り込む',
        'オーバーロードシグネチャで引数パターンごとの戻り値型を定義',
        'ジェネリクスで入力型の情報を出力まで伝搬させる',
      ],
    },
    {
      id: 4,
      title: 'Error Handling with Result Type',
      titleJa: 'Result型によるエラー処理',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '例外の代わりにResult型を使い、エラーを型レベルで表現して安全に処理します。',
      bookReference: 'Effective TypeScript 第49項',
      code: `// Result型パターン
// 例外を投げずにエラーを値として返す

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// 成功・失敗のヘルパー
function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// JSONパース（例外を投げない版）
function safeJsonParse<T>(json: string): Result<T, string> {
  try {
    return ok(JSON.parse(json) as T);
  } catch (e) {
    return err(\`Invalid JSON: \${(e as Error).message}\`);
  }
}

// 数値変換
function parseAge(input: string): Result<number, string> {
  const n = Number(input);
  if (isNaN(n)) return err(\`"\${input}" is not a number\`);
  if (n < 0 || n > 150) return err(\`Age \${n} out of range\`);
  return ok(n);
}

// Result型のチェーン
function processUserInput(json: string): Result<string, string> {
  const parsed = safeJsonParse<{ name: string; age: string }>(json);
  if (!parsed.ok) return parsed;

  const age = parseAge(parsed.value.age);
  if (!age.ok) return age;

  return ok(\`\${parsed.value.name} is \${age.value} years old\`);
}

// 使用例
const result = processUserInput('{"name":"Alice","age":"25"}');
if (result.ok) {
  console.log(result.value);
} else {
  console.error(result.error);
}`,
      highlights: [
        { startLine: 4, endLine: 6, color: '#f59e0b', label: 'Result型', explanation: '成功と失敗をユニオン型で明示的に表現' },
        { startLine: 9, endLine: 15, color: '#3b82f6', label: 'ヘルパー関数', explanation: 'ok/errファクトリでResult型の生成を簡潔に' },
        { startLine: 18, endLine: 24, color: '#ef4444', label: '安全なラッパー', explanation: 'try-catchを関数内に閉じ込めResult型で返す' },
        { startLine: 35, endLine: 43, color: '#22c55e', label: 'チェーン処理', explanation: 'okチェックで早期リターンし処理を連鎖' },
      ],
      keyPoints: [
        'Result型で成功/失敗を型レベルで表現する',
        '例外を投げずエラーをデータとして扱う',
        'ok/errヘルパーで生成を簡潔にする',
        'if(!result.ok) return で早期リターンチェーン',
      ],
    },
    {
      id: 5,
      title: 'Mapped Types & Template Literals',
      titleJa: 'マップ型とテンプレートリテラル型',
      difficulty: 'beginner',
      category: 'Type System',
      description: 'TypeScriptの型レベルプログラミングでAPIレスポンス型やイベント型を自動生成します。',
      code: `// マップ型とテンプレートリテラル型
// 型から型を自動生成するメタプログラミング

// 基本モデル
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Partial/Required/Readonlyは組み込みだが、自作もできる
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// 特定のキーだけ必須にする
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

type UserUpdate = MyPartial<User> & { id: number };

// テンプレートリテラル型でイベント名を自動生成
type ModelEvents<T> = {
  [K in keyof T as \`on\${Capitalize<K & string>}Change\`]: (
    value: T[K]
  ) => void;
};

type UserEvents = ModelEvents<User>;
// {
//   onIdChange: (value: number) => void;
//   onNameChange: (value: string) => void;
//   onEmailChange: (value: string) => void;
//   onRoleChange: (value: 'admin' | 'user') => void;
// }

// Getter型の自動生成
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<K & string>}\`]: () => T[K];
};

type UserGetters = Getters<User>;`,
      highlights: [
        { startLine: 13, endLine: 15, color: '#3b82f6', label: 'マップ型', explanation: '[K in keyof T]で型のプロパティを変換' },
        { startLine: 18, endLine: 18, color: '#22c55e', label: '交差型ユーティリティ', explanation: 'Required + Pickの組合せで部分必須型を作る' },
        { startLine: 23, endLine: 27, color: '#a855f7', label: 'テンプレートリテラル型', explanation: 'as句とCapitalizeでプロパティ名を動的生成' },
        { startLine: 38, endLine: 40, color: '#22c55e', label: 'Getter型生成', explanation: '同じパターンでGetter関数の型を自動導出' },
      ],
      keyPoints: [
        'マップ型 [K in keyof T] で型を変換できる',
        'as句でプロパティ名をリマッピングする',
        'Capitalize等のintrinsic型で文字列型を操作',
        '型レベルプログラミングでボイラープレートを排除',
      ],
    },
    {
      id: 6,
      title: 'Zod Schema Validation',
      titleJa: 'Zodスキーマバリデーション',
      difficulty: 'beginner',
      category: 'Validation',
      description: 'Zodを使ったランタイムバリデーション+型推論の統合パターンを学びます。',
      code: `// Zodスキーマバリデーション（概念コード）
// スキーマ定義から型推論で二重定義を排除

// z.object / z.string 等を模擬した型定義
interface Schema<T> {
  parse(data: unknown): T;
  safeParse(data: unknown): { success: true; data: T } | { success: false; error: string };
}

// スキーマビルダー（簡略版）
function string(): Schema<string> {
  return {
    parse: (d) => { if (typeof d !== 'string') throw new Error('Not string'); return d; },
    safeParse: (d) => typeof d === 'string' ? { success: true, data: d } : { success: false, error: 'Not string' },
  };
}

function number(): Schema<number> {
  return {
    parse: (d) => { if (typeof d !== 'number') throw new Error('Not number'); return d; },
    safeParse: (d) => typeof d === 'number' ? { success: true, data: d } : { success: false, error: 'Not number' },
  };
}

function object<T extends Record<string, Schema<unknown>>>(
  shape: T
): Schema<{ [K in keyof T]: T[K] extends Schema<infer U> ? U : never }> {
  type Output = { [K in keyof T]: T[K] extends Schema<infer U> ? U : never };
  return {
    parse(data: unknown) {
      const obj = data as Record<string, unknown>;
      const result: Record<string, unknown> = {};
      for (const [key, schema] of Object.entries(shape)) {
        result[key] = schema.parse(obj[key]);
      }
      return result as Output;
    },
    safeParse(data: unknown) {
      try { return { success: true, data: this.parse(data) }; }
      catch { return { success: false, error: 'Validation failed' }; }
    },
  };
}

// スキーマ定義 = 型定義
const UserSchema = object({
  name: string(),
  age: number(),
});

// 型推論: { name: string; age: number }
type User = ReturnType<typeof UserSchema.parse>;

// 安全なバリデーション
const result = UserSchema.safeParse({ name: 'Alice', age: 30 });
if (result.success) {
  console.log(result.data.name);
}`,
      highlights: [
        { startLine: 5, endLine: 8, color: '#a855f7', label: 'Schemaインターフェース', explanation: 'parse/safeParseの2つのバリデーション方法を定義' },
        { startLine: 25, endLine: 27, color: '#22c55e', label: '推論型マッピング', explanation: 'infer Uでスキーマ型からデータ型を自動推論' },
        { startLine: 46, endLine: 49, color: '#f59e0b', label: 'スキーマ定義', explanation: '型定義とバリデーションルールを一元管理' },
        { startLine: 52, endLine: 52, color: '#3b82f6', label: '型推論', explanation: 'ReturnTypeでスキーマから型を自動導出' },
      ],
      keyPoints: [
        'スキーマ定義が型定義を兼ねる（Single Source of Truth）',
        'infer でジェネリクスの内部型を抽出できる',
        'safeParse でバリデーション結果をResult型で返す',
        'ランタイムチェックとコンパイル時型チェックを統合',
      ],
    },
    {
      id: 7,
      title: 'Branded Types',
      titleJa: 'ブランド型',
      difficulty: 'beginner',
      category: 'Type System',
      description: 'ブランド型で同じプリミティブ型を区別し、IDの取り違えを型レベルで防ぎます。',
      code: `// ブランド型（Branded Types）
// 同じ基盤型(string/number)を意味的に区別する

// ブランドの定義
declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

// 各種ID型
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type ProductId = Brand<string, 'ProductId'>;

// ファクトリ関数でバリデーション付き生成
function createUserId(id: string): UserId {
  if (!/^usr_[a-z0-9]{8}$/.test(id)) {
    throw new Error(\`Invalid user ID format: \${id}\`);
  }
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  if (!/^ord_[a-z0-9]{8}$/.test(id)) {
    throw new Error(\`Invalid order ID format: \${id}\`);
  }
  return id as OrderId;
}

// 型安全な関数
function getUser(userId: UserId): void {
  console.log(\`Fetching user: \${userId}\`);
}

function getOrder(orderId: OrderId): void {
  console.log(\`Fetching order: \${orderId}\`);
}

// 使用例
const userId = createUserId('usr_abc12345');
const orderId = createOrderId('ord_xyz98765');

getUser(userId);   // OK
getOrder(orderId); // OK
// getUser(orderId);  // コンパイルエラー！型が違う
// getOrder(userId);  // コンパイルエラー！`,
      highlights: [
        { startLine: 5, endLine: 6, color: '#a855f7', label: 'ブランド型定義', explanation: 'unique symbolで他と区別可能な型タグを付与' },
        { startLine: 9, endLine: 11, color: '#f59e0b', label: '型エイリアス', explanation: '同じstringでも意味の異なるID型を作る' },
        { startLine: 14, endLine: 19, color: '#22c55e', label: 'ファクトリ関数', explanation: 'バリデーション付きでブランド型を安全に生成' },
        { startLine: 29, endLine: 35, color: '#3b82f6', label: '型安全な使用', explanation: '異なるID型の混同をコンパイル時に防止' },
      ],
      keyPoints: [
        'ブランド型で同じプリミティブ型を区別する',
        'unique symbolで型レベルの一意性を確保',
        'ファクトリ関数でバリデーションと型変換を統合',
        'IDの取り違えをコンパイル時に検出できる',
      ],
    },
    {
      id: 8,
      title: 'Builder Pattern with Fluent API',
      titleJa: 'ビルダーパターンとFluent API',
      difficulty: 'beginner',
      category: 'Design Patterns',
      description: 'メソッドチェーンで直感的にオブジェクトを構築するビルダーパターンを型安全に実装します。',
      code: `// ビルダーパターン（Fluent API）
// メソッドチェーンで直感的にオブジェクトを構築

interface EmailMessage {
  to: string[];
  cc: string[];
  subject: string;
  body: string;
  isHtml: boolean;
  attachments: string[];
}

class EmailBuilder {
  private message: Partial<EmailMessage> = {
    to: [],
    cc: [],
    attachments: [],
    isHtml: false,
  };

  to(...addresses: string[]): this {
    this.message.to = [...(this.message.to || []), ...addresses];
    return this;
  }

  cc(...addresses: string[]): this {
    this.message.cc = [...(this.message.cc || []), ...addresses];
    return this;
  }

  subject(text: string): this {
    this.message.subject = text;
    return this;
  }

  body(text: string): this {
    this.message.body = text;
    return this;
  }

  html(content: string): this {
    this.message.body = content;
    this.message.isHtml = true;
    return this;
  }

  attach(...files: string[]): this {
    this.message.attachments = [
      ...(this.message.attachments || []),
      ...files,
    ];
    return this;
  }

  build(): EmailMessage {
    if (!this.message.to?.length) throw new Error('To is required');
    if (!this.message.subject) throw new Error('Subject is required');
    if (!this.message.body) throw new Error('Body is required');
    return this.message as EmailMessage;
  }
}

// 使用例: メソッドチェーンで直感的に構築
const email = new EmailBuilder()
  .to('alice@example.com', 'bob@example.com')
  .cc('manager@example.com')
  .subject('Weekly Report')
  .body('Please find the report attached.')
  .attach('report.pdf')
  .build();

console.log(email);`,
      highlights: [
        { startLine: 4, endLine: 11, color: '#f59e0b', label: 'データ型', explanation: '最終成果物の型を明確に定義' },
        { startLine: 21, endLine: 24, color: '#22c55e', label: 'Fluent Method', explanation: 'thisを返すことでメソッドチェーンを実現' },
        { startLine: 55, endLine: 60, color: '#ef4444', label: 'バリデーション', explanation: 'build時に必須プロパティの検証を行う' },
        { startLine: 63, endLine: 70, color: '#ec4899', label: '使用例', explanation: 'チェーンで宣言的にメールを構築' },
      ],
      keyPoints: [
        'thisを返してメソッドチェーンを実現する',
        'Partialで構築途中の状態を表現する',
        'build()で必須プロパティのバリデーションを行う',
        'Fluent APIで可読性の高い構築コードが書ける',
      ],
    },
    {
      id: 9,
      title: 'Type Guard Functions',
      titleJa: '型ガード関数',
      difficulty: 'beginner',
      category: 'Type System',
      description: 'ユーザー定義型ガードでランタイムチェックと型の絞り込みを統合する手法です。',
      code: `// ユーザー定義型ガード
// ランタイムの検査と型の絞り込みを統合する

interface Dog {
  kind: 'dog';
  bark(): string;
  fetch(item: string): void;
}

interface Cat {
  kind: 'cat';
  meow(): string;
  purr(): void;
}

interface Bird {
  kind: 'bird';
  sing(): string;
  fly(altitude: number): void;
}

type Animal = Dog | Cat | Bird;

// ユーザー定義型ガード
function isDog(animal: Animal): animal is Dog {
  return animal.kind === 'dog';
}

function isCat(animal: Animal): animal is Cat {
  return animal.kind === 'cat';
}

// 複合型ガード
function isPlayful(animal: Animal): animal is Dog | Cat {
  return animal.kind === 'dog' || animal.kind === 'cat';
}

// 未知の値に対する型ガード
function isAnimal(value: unknown): value is Animal {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.kind === 'string' &&
    ['dog', 'cat', 'bird'].includes(obj.kind)
  );
}

// 使用例
function interact(animal: Animal): string {
  if (isDog(animal)) {
    animal.fetch('ball'); // Dog型に絞り込まれている
    return animal.bark();
  }
  if (isCat(animal)) {
    animal.purr();        // Cat型に絞り込まれている
    return animal.meow();
  }
  // ここではBird型のみ
  animal.fly(100);
  return animal.sing();
}`,
      highlights: [
        { startLine: 4, endLine: 22, color: '#f59e0b', label: '型定義', explanation: 'kindプロパティで区別可能なAnimal型階層' },
        { startLine: 25, endLine: 31, color: '#22c55e', label: '型ガード関数', explanation: 'animal is Typeで戻り値に型情報を付与' },
        { startLine: 34, endLine: 36, color: '#a855f7', label: '複合型ガード', explanation: '複数の型にマッチする型ガードも定義可能' },
        { startLine: 39, endLine: 46, color: '#ef4444', label: 'unknown型ガード', explanation: '未知の値を安全にAnimal型に絞り込む' },
      ],
      keyPoints: [
        'is キーワードで型ガードの戻り値型を宣言する',
        '型ガード関数内でランタイムチェックを行う',
        'unknown 型に対しても型ガードで安全に絞り込める',
        '関数呼び出し後のスコープで型が自動的に絞り込まれる',
      ],
    },
    {
      id: 10,
      title: 'Readonly & Immutable Patterns',
      titleJa: '不変パターン',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'ReadonlyとDeepReadonly型で不変性を保証し、予期しない変更を防ぎます。',
      bookReference: 'Effective TypeScript 第17項',
      code: `// 不変（Immutable）パターン
// Readonlyで意図しないミューテーションを防ぐ

// DeepReadonly型
type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      user: string;
      password: string;
    };
  };
  features: string[];
}

// 通常のReadonlyは浅い（1段階のみ）
type ShallowConfig = Readonly<Config>;
// database自体は再代入不可だが、database.hostは変更可能

// DeepReadonlyならネスト全体が不変
type ImmutableConfig = DeepReadonly<Config>;

// 安全な更新関数（新しいオブジェクトを返す）
function updatePort(
  config: ImmutableConfig,
  newPort: number
): ImmutableConfig {
  return {
    ...config,
    database: {
      ...config.database,
      port: newPort,
    },
  };
}

const config: ImmutableConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    credentials: { user: 'admin', password: 'secret' },
  },
  features: ['auth', 'logging'],
};

// config.database.port = 3000;  // コンパイルエラー！
const updated = updatePort(config, 3000);  // OK: 新しいオブジェクト`,
      highlights: [
        { startLine: 5, endLine: 9, color: '#a855f7', label: 'DeepReadonly型', explanation: '再帰的に全プロパティをreadonlyにする条件型' },
        { startLine: 24, endLine: 25, color: '#ef4444', label: '浅いReadonly', explanation: '組み込みReadonlyは1段階しか保護しない' },
        { startLine: 31, endLine: 42, color: '#22c55e', label: '不変更新パターン', explanation: 'スプレッド演算子で新しいオブジェクトを生成して返す' },
      ],
      keyPoints: [
        '組み込みReadonlyは浅い（1段階）ことに注意',
        'DeepReadonlyで再帰的に全プロパティを不変にする',
        '不変データの更新はスプレッド演算子で新オブジェクトを生成',
        '不変性により副作用のない予測可能なコードが書ける',
      ],
    },
    {
      id: 11,
      title: 'Module Pattern & Encapsulation',
      titleJa: 'モジュールパターンとカプセル化',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'クロージャとモジュールパターンで状態をカプセル化し、安全なAPIを公開します。',
      code: `// モジュールパターン
// 内部状態をカプセル化し、安全なAPIだけを公開

interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  getHistory(): ReadonlyArray<LogEntry>;
  clear(): void;
}

interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
}

function createLogger(prefix: string): Logger {
  // プライベートな内部状態
  const history: LogEntry[] = [];

  function addEntry(level: LogEntry['level'], message: string): void {
    const entry: LogEntry = {
      level,
      message: \`[\${prefix}] \${message}\`,
      timestamp: new Date(),
    };
    history.push(entry);
    const color = level === 'error' ? '\\x1b[31m' : level === 'warn' ? '\\x1b[33m' : '\\x1b[36m';
    console.log(\`\${color}\${entry.message}\\x1b[0m\`);
  }

  // 公開API（内部状態に直接アクセス不可）
  return {
    info: (msg) => addEntry('info', msg),
    warn: (msg) => addEntry('warn', msg),
    error: (msg) => addEntry('error', msg),
    getHistory: () => [...history],  // コピーを返す
    clear: () => { history.length = 0; },
  };
}

// 使用例
const logger = createLogger('App');
logger.info('Application started');
logger.warn('Low memory');
logger.error('Connection failed');

const logs = logger.getHistory();
console.log(\`Total logs: \${logs.length}\`);`,
      highlights: [
        { startLine: 4, endLine: 10, color: '#a855f7', label: '公開インターフェース', explanation: '外部に公開するAPIの型を明確に定義' },
        { startLine: 20, endLine: 21, color: '#f59e0b', label: 'プライベート状態', explanation: 'クロージャ内でのみアクセス可能な変数' },
        { startLine: 22, endLine: 31, color: '#3b82f6', label: '内部関数', explanation: '共通ロジックをプライベート関数に集約' },
        { startLine: 34, endLine: 41, color: '#22c55e', label: '公開API', explanation: '安全な操作のみ外部に公開する' },
      ],
      keyPoints: [
        'クロージャで内部状態をカプセル化する',
        'インターフェースで公開APIの型を明示する',
        'getHistoryはコピーを返し外部からの変更を防ぐ',
        'ファクトリ関数でモジュールのインスタンスを生成する',
      ],
    },
    // ──── Intermediate (id 12-22) ────
    {
      id: 12,
      title: 'Strategy Pattern',
      titleJa: 'ストラテジーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'インターフェースでアルゴリズムを差し替え可能にし、Open/Closed原則を実現します。',
      bookReference: 'GoFデザインパターン',
      code: `// ストラテジーパターン
// アルゴリズムを差し替え可能な戦略オブジェクトとして分離

interface SortStrategy<T> {
  sort(items: T[], compareFn?: (a: T, b: T) => number): T[];
  readonly name: string;
}

// バブルソート戦略
class BubbleSort<T> implements SortStrategy<T> {
  readonly name = 'BubbleSort';
  sort(items: T[], compareFn: (a: T, b: T) => number = (a, b) => (a > b ? 1 : -1)): T[] {
    const arr = [...items];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (compareFn(arr[j], arr[j + 1]) > 0) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

// クイックソート戦略
class QuickSort<T> implements SortStrategy<T> {
  readonly name = 'QuickSort';
  sort(items: T[], compareFn: (a: T, b: T) => number = (a, b) => (a > b ? 1 : -1)): T[] {
    if (items.length <= 1) return [...items];
    const pivot = items[Math.floor(items.length / 2)];
    const left = items.filter(x => compareFn(x, pivot) < 0);
    const middle = items.filter(x => compareFn(x, pivot) === 0);
    const right = items.filter(x => compareFn(x, pivot) > 0);
    return [...this.sort(left, compareFn), ...middle, ...this.sort(right, compareFn)];
  }
}

// コンテキスト：戦略を利用するクラス
class Sorter<T> {
  private strategy: SortStrategy<T>;
  private history: Array<{ strategy: string; itemCount: number; timeMs: number }> = [];

  constructor(strategy: SortStrategy<T>) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }

  execute(items: T[], compareFn?: (a: T, b: T) => number): T[] {
    const start = performance.now();
    const result = this.strategy.sort(items, compareFn);
    const timeMs = performance.now() - start;
    this.history.push({
      strategy: this.strategy.name,
      itemCount: items.length,
      timeMs,
    });
    return result;
  }

  getHistory() {
    return [...this.history];
  }
}

// 使用例：データサイズに応じて戦略を切り替え
const sorter = new Sorter<number>(new BubbleSort());
const small = [5, 3, 8, 1, 9, 2];
console.log(sorter.execute(small));

// 大きなデータにはQuickSortに切り替え
sorter.setStrategy(new QuickSort());
const large = Array.from({ length: 1000 }, () => Math.random());
console.log(sorter.execute(large).slice(0, 5));

console.log(sorter.getHistory());`,
      highlights: [
        { startLine: 4, endLine: 7, color: '#a855f7', label: 'Strategy Interface', explanation: '全戦略が実装すべき共通インターフェース' },
        { startLine: 10, endLine: 23, color: '#3b82f6', label: 'BubbleSort戦略', explanation: '具体的なソートアルゴリズム実装' },
        { startLine: 26, endLine: 36, color: '#3b82f6', label: 'QuickSort戦略', explanation: '別のアルゴリズムを同じインターフェースで実装' },
        { startLine: 39, endLine: 66, color: '#22c55e', label: 'コンテキスト', explanation: '戦略を保持し実行するクラス。戦略の切替が可能' },
      ],
      keyPoints: [
        '共通インターフェースでアルゴリズムを抽象化する',
        'コンテキストは戦略の具体的な実装を知らない',
        '実行時に戦略を動的に切り替えられる',
        'Open/Closed原則：既存コードを変更せず新戦略を追加可能',
      ],
    },
    {
      id: 13,
      title: 'Observer Pattern with EventEmitter',
      titleJa: 'オブザーバーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '型安全なイベントエミッターで疎結合なコンポーネント間通信を実現します。',
      code: `// 型安全なオブザーバーパターン
// EventEmitterをジェネリクスで型安全に実装

type EventMap = Record<string, unknown[]>;

class TypedEventEmitter<Events extends EventMap> {
  private listeners = new Map<keyof Events, Set<Function>>();

  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    // unsubscribe関数を返す
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }

  once<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void
  ): () => void {
    const unsubscribe = this.on(event, (...args) => {
      unsubscribe();
      listener(...args);
    });
    return unsubscribe;
  }

  removeAllListeners(event?: keyof Events): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// イベント型の定義
interface AppEvents extends EventMap {
  userLogin: [userId: string, timestamp: Date];
  userLogout: [userId: string];
  error: [error: Error, context: string];
  dataUpdate: [table: string, id: number, changes: Record<string, unknown>];
}

// 使用例
const emitter = new TypedEventEmitter<AppEvents>();

// 型安全なリスナー登録
const unsub = emitter.on('userLogin', (userId, timestamp) => {
  // userIdはstring、timestampはDate（自動推論）
  console.log(\`User \${userId} logged in at \${timestamp.toISOString()}\`);
});

emitter.on('error', (error, context) => {
  console.error(\`[\${context}] \${error.message}\`);
});

// 型安全なイベント発火
emitter.emit('userLogin', 'user_123', new Date());
// emitter.emit('userLogin', 123);  // コンパイルエラー！

// クリーンアップ
unsub();`,
      highlights: [
        { startLine: 6, endLine: 7, color: '#a855f7', label: 'TypedEventEmitter', explanation: 'ジェネリクスでイベント型を受け取る汎用エミッター' },
        { startLine: 9, endLine: 22, color: '#22c55e', label: 'onメソッド', explanation: '型安全なリスナー登録。unsubscribe関数を返す' },
        { startLine: 24, endLine: 29, color: '#3b82f6', label: 'emitメソッド', explanation: 'イベント名に対応する引数型を強制' },
        { startLine: 52, endLine: 57, color: '#f59e0b', label: 'イベント型定義', explanation: 'ラベル付きタプルで引数名と型を明示' },
      ],
      keyPoints: [
        'EventMapジェネリクスでイベント名と引数型を紐付ける',
        'on()がunsubscribe関数を返すことでメモリリークを防ぐ',
        'ラベル付きタプル型で引数に名前を付けて可読性を上げる',
        'emit時にイベント名と引数の型チェックが自動で行われる',
      ],
    },
    {
      id: 14,
      title: 'Repository Pattern',
      titleJa: 'リポジトリパターン',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'データアクセスを抽象化し、ビジネスロジックをストレージ実装から分離します。',
      bookReference: 'PofEAA / Clean Architecture',
      code: `// リポジトリパターン
// データアクセスを抽象化しビジネスロジックから分離

interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends Entity {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

// リポジトリの共通インターフェース
interface Repository<T extends Entity> {
  findById(id: string): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// インメモリ実装
class InMemoryUserRepository implements Repository<User> {
  private store = new Map<string, User>();
  private nextId = 1;

  async findById(id: string): Promise<User | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(filter?: Partial<User>): Promise<User[]> {
    let users = Array.from(this.store.values());
    if (filter) {
      users = users.filter(user =>
        Object.entries(filter).every(([key, val]) =>
          user[key as keyof User] === val
        )
      );
    }
    return users;
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const user: User = {
      ...data,
      id: String(this.nextId++),
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(user.id, user);
    return user;
  }

  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    const existing = this.store.get(id);
    if (!existing) throw new Error(\`User \${id} not found\`);
    const updated: User = { ...existing, ...data, updatedAt: new Date() };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }
}

// ビジネスロジック層（リポジトリの実装を知らない）
class UserService {
  constructor(private repo: Repository<User>) {}

  async promoteToAdmin(userId: string): Promise<User> {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role === 'admin') throw new Error('Already admin');
    return this.repo.update(userId, { role: 'admin' });
  }

  async getAdmins(): Promise<User[]> {
    return this.repo.findAll({ role: 'admin' });
  }
}

// 使用例
const repo = new InMemoryUserRepository();
const service = new UserService(repo);`,
      highlights: [
        { startLine: 4, endLine: 14, color: '#f59e0b', label: 'エンティティ型', explanation: '共通のEntity基底型とUserエンティティ' },
        { startLine: 17, endLine: 23, color: '#a855f7', label: 'Repository Interface', explanation: 'CRUD操作の共通インターフェース' },
        { startLine: 26, endLine: 69, color: '#3b82f6', label: 'インメモリ実装', explanation: 'テスト用のMapベース実装' },
        { startLine: 72, endLine: 85, color: '#22c55e', label: 'ビジネスロジック', explanation: '具体的な実装に依存しないサービス層' },
      ],
      keyPoints: [
        'Repository Interface でデータアクセスの契約を定義',
        'ビジネスロジックはインターフェースにのみ依存する',
        'Omit型でcreate時にid/timestamp を除外する',
        'テスト時はインメモリ実装、本番ではDB実装に差替可能',
      ],
    },
    {
      id: 15,
      title: 'Dependency Injection Container',
      titleJa: '依存性注入コンテナ',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'TypeScriptでDIコンテナを実装し、疎結合で差し替え可能なアーキテクチャを構築します。',
      bookReference: 'Clean Architecture 第11章',
      code: `// 依存性注入（DI）コンテナ
// シンボルをキーとして依存を登録・解決する

// サービス識別子
const TOKENS = {
  Logger: Symbol('Logger'),
  UserRepo: Symbol('UserRepo'),
  UserService: Symbol('UserService'),
} as const;

// インターフェース定義
interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

interface IUserRepo {
  findById(id: string): Promise<{ id: string; name: string } | null>;
}

interface IUserService {
  getUser(id: string): Promise<string>;
}

// DIコンテナ
type Factory<T> = (container: Container) => T;

class Container {
  private factories = new Map<symbol, Factory<unknown>>();
  private singletons = new Map<symbol, unknown>();

  register<T>(token: symbol, factory: Factory<T>): void {
    this.factories.set(token, factory);
  }

  registerSingleton<T>(token: symbol, factory: Factory<T>): void {
    this.factories.set(token, (c) => {
      if (!this.singletons.has(token)) {
        this.singletons.set(token, factory(c));
      }
      return this.singletons.get(token)!;
    });
  }

  resolve<T>(token: symbol): T {
    const factory = this.factories.get(token);
    if (!factory) throw new Error(\`No registration for \${token.toString()}\`);
    return factory(this) as T;
  }
}

// 実装クラス
class ConsoleLogger implements ILogger {
  log(message: string) { console.log(\`[INFO] \${message}\`); }
  error(message: string) { console.error(\`[ERROR] \${message}\`); }
}

class InMemoryUserRepo implements IUserRepo {
  private users = new Map([['1', { id: '1', name: 'Alice' }]]);
  async findById(id: string) { return this.users.get(id) ?? null; }
}

class UserService implements IUserService {
  constructor(private logger: ILogger, private repo: IUserRepo) {}
  async getUser(id: string): Promise<string> {
    this.logger.log(\`Fetching user \${id}\`);
    const user = await this.repo.findById(id);
    if (!user) {
      this.logger.error(\`User \${id} not found\`);
      throw new Error('User not found');
    }
    return user.name;
  }
}

// コンテナ構成
const container = new Container();
container.registerSingleton<ILogger>(TOKENS.Logger, () => new ConsoleLogger());
container.register<IUserRepo>(TOKENS.UserRepo, () => new InMemoryUserRepo());
container.register<IUserService>(TOKENS.UserService, (c) =>
  new UserService(c.resolve(TOKENS.Logger), c.resolve(TOKENS.UserRepo))
);

// 解決
const service = container.resolve<IUserService>(TOKENS.UserService);
service.getUser('1').then(console.log);`,
      highlights: [
        { startLine: 4, endLine: 9, color: '#f59e0b', label: 'トークン定義', explanation: 'Symbolでサービスを一意に識別するキーを定義' },
        { startLine: 28, endLine: 50, color: '#22c55e', label: 'DIコンテナ', explanation: 'ファクトリ関数の登録と依存解決を行うコンテナ' },
        { startLine: 63, endLine: 74, color: '#3b82f6', label: 'サービス実装', explanation: 'コンストラクタでインターフェースを受け取る' },
        { startLine: 77, endLine: 82, color: '#ec4899', label: 'コンテナ構成', explanation: '依存関係のワイヤリングを1箇所に集約' },
      ],
      keyPoints: [
        'Symbol をトークンとして依存を一意に識別する',
        'ファクトリ関数で遅延生成と依存解決を行う',
        'registerSingletonで共有インスタンスを管理する',
        'ワイヤリングを1箇所に集約し見通しを良くする',
      ],
    },
    {
      id: 16,
      title: 'State Machine Pattern',
      titleJa: 'ステートマシンパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '型安全なステートマシンで遷移ルールをコンパイル時に強制し、不正な状態遷移を防ぎます。',
      code: `// 型安全ステートマシン
// 状態遷移ルールを型で表現し不正遷移をコンパイル時に防ぐ

type OrderStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'shipped' | 'delivered';

// 遷移ルール: 各状態から次に遷移可能な状態を定義
type TransitionMap = {
  draft: 'submitted';
  submitted: 'approved' | 'rejected';
  approved: 'shipped';
  rejected: 'draft';
  shipped: 'delivered';
  delivered: never;
};

interface OrderEvent {
  type: string;
  timestamp: Date;
  actor: string;
}

class OrderStateMachine {
  private status: OrderStatus = 'draft';
  private history: Array<{ from: OrderStatus; to: OrderStatus; event: OrderEvent }> = [];

  getStatus(): OrderStatus {
    return this.status;
  }

  private transition<S extends OrderStatus>(
    from: S,
    to: TransitionMap[S],
    event: OrderEvent
  ): void {
    if (this.status !== from) {
      throw new Error(\`Cannot transition: expected \${from}, got \${this.status}\`);
    }
    this.history.push({ from, to: to as OrderStatus, event });
    this.status = to as OrderStatus;
  }

  submit(actor: string): void {
    this.transition('draft', 'submitted', {
      type: 'submit', timestamp: new Date(), actor,
    });
  }

  approve(actor: string): void {
    this.transition('submitted', 'approved', {
      type: 'approve', timestamp: new Date(), actor,
    });
  }

  reject(actor: string): void {
    this.transition('submitted', 'rejected', {
      type: 'reject', timestamp: new Date(), actor,
    });
  }

  revise(actor: string): void {
    this.transition('rejected', 'draft', {
      type: 'revise', timestamp: new Date(), actor,
    });
  }

  ship(actor: string): void {
    this.transition('approved', 'shipped', {
      type: 'ship', timestamp: new Date(), actor,
    });
  }

  deliver(actor: string): void {
    this.transition('shipped', 'delivered', {
      type: 'deliver', timestamp: new Date(), actor,
    });
  }

  getHistory() {
    return [...this.history];
  }
}

// 使用例
const order = new OrderStateMachine();
order.submit('user_1');
order.approve('admin_1');
order.ship('warehouse_1');
order.deliver('courier_1');
console.log(order.getHistory());`,
      highlights: [
        { startLine: 7, endLine: 14, color: '#f59e0b', label: '遷移マップ型', explanation: '各状態から遷移可能な状態をマップ型で定義' },
        { startLine: 30, endLine: 40, color: '#22c55e', label: 'transition メソッド', explanation: '型制約で不正な遷移をコンパイル時にブロック' },
        { startLine: 42, endLine: 76, color: '#3b82f6', label: '具体的遷移メソッド', explanation: '各ビジネスアクションに対応する遷移操作' },
      ],
      keyPoints: [
        'TransitionMapで許可される状態遷移を型として定義',
        'transitionメソッドに型制約をかけ不正遷移を防ぐ',
        '遷移履歴を記録して監査証跡を残す',
        'neverで終端状態からの遷移を禁止する',
      ],
    },
    {
      id: 17,
      title: 'Command Pattern with Undo',
      titleJa: 'コマンドパターン（Undo対応）',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '操作をコマンドオブジェクトとしてカプセル化し、実行・取消・リドゥを実現します。',
      bookReference: 'GoFデザインパターン',
      code: `// コマンドパターン（Undo/Redo対応）
// 操作をオブジェクトとしてカプセル化し履歴管理

interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}

// テキストエディタのドキュメント
class TextDocument {
  private content = '';
  getContent(): string { return this.content; }
  insert(pos: number, text: string): void {
    this.content = this.content.slice(0, pos) + text + this.content.slice(pos);
  }
  remove(pos: number, length: number): string {
    const removed = this.content.slice(pos, pos + length);
    this.content = this.content.slice(0, pos) + this.content.slice(pos + length);
    return removed;
  }
}

// 挿入コマンド
class InsertCommand implements Command {
  constructor(
    private doc: TextDocument,
    private position: number,
    private text: string
  ) {}
  execute(): void { this.doc.insert(this.position, this.text); }
  undo(): void { this.doc.remove(this.position, this.text.length); }
  describe(): string { return \`Insert "\${this.text}" at \${this.position}\`; }
}

// 削除コマンド
class DeleteCommand implements Command {
  private deletedText = '';
  constructor(
    private doc: TextDocument,
    private position: number,
    private length: number
  ) {}
  execute(): void { this.deletedText = this.doc.remove(this.position, this.length); }
  undo(): void { this.doc.insert(this.position, this.deletedText); }
  describe(): string { return \`Delete \${this.length} chars at \${this.position}\`; }
}

// コマンドマネージャ（Undo/Redo管理）
class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];  // 新しいコマンド実行でredo履歴をクリア
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (!command) return;
    command.undo();
    this.redoStack.push(command);
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (!command) return;
    command.execute();
    this.undoStack.push(command);
  }

  getHistory(): string[] {
    return this.undoStack.map(c => c.describe());
  }
}

// 使用例
const doc = new TextDocument();
const manager = new CommandManager();

manager.execute(new InsertCommand(doc, 0, 'Hello'));
manager.execute(new InsertCommand(doc, 5, ' World'));
console.log(doc.getContent());  // "Hello World"

manager.undo();
console.log(doc.getContent());  // "Hello"

manager.redo();
console.log(doc.getContent());  // "Hello World"`,
      highlights: [
        { startLine: 4, endLine: 8, color: '#a855f7', label: 'Command Interface', explanation: 'execute/undo/describeの3つの操作を定義' },
        { startLine: 25, endLine: 34, color: '#3b82f6', label: 'InsertCommand', explanation: '挿入操作をカプセル化。undoで逆操作を実行' },
        { startLine: 37, endLine: 47, color: '#3b82f6', label: 'DeleteCommand', explanation: '削除したテキストを保持しundoで復元' },
        { startLine: 50, endLine: 77, color: '#22c55e', label: 'CommandManager', explanation: 'スタック2本でundo/redo履歴を管理' },
      ],
      keyPoints: [
        'Commandインターフェースでexecute/undoを対にする',
        '操作をオブジェクトにすることで履歴管理が可能になる',
        'undoStackとredoStackの2本スタックでUndo/Redoを実現',
        '新しいコマンド実行時にredoStackをクリアする',
      ],
    },
    {
      id: 18,
      title: 'Middleware Pattern',
      titleJa: 'ミドルウェアパターン',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'Express風のミドルウェアチェーンを型安全に実装し、処理パイプラインを構築します。',
      code: `// ミドルウェアパターン
// 処理パイプラインを連鎖的に構築する

interface Context {
  request: {
    method: string;
    path: string;
    headers: Record<string, string>;
    body?: unknown;
  };
  response: {
    status: number;
    body: unknown;
    headers: Record<string, string>;
  };
  state: Record<string, unknown>;
}

type NextFunction = () => Promise<void>;
type Middleware = (ctx: Context, next: NextFunction) => Promise<void>;

class MiddlewarePipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(ctx: Context): Promise<void> {
    let index = 0;
    const dispatch = async (): Promise<void> => {
      if (index >= this.middlewares.length) return;
      const mw = this.middlewares[index++];
      await mw(ctx, dispatch);
    };
    await dispatch();
  }
}

// ミドルウェア実装
const logger: Middleware = async (ctx, next) => {
  const start = Date.now();
  console.log(\`→ \${ctx.request.method} \${ctx.request.path}\`);
  await next();
  const ms = Date.now() - start;
  console.log(\`← \${ctx.response.status} (\${ms}ms)\`);
};

const auth: Middleware = async (ctx, next) => {
  const token = ctx.request.headers['authorization'];
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: 'Unauthorized' };
    return;  // nextを呼ばずにチェーン中断
  }
  ctx.state.userId = 'user_from_token';
  await next();
};

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: (err as Error).message };
  }
};

const handler: Middleware = async (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { message: 'OK', user: ctx.state.userId };
};

// パイプライン構築
const app = new MiddlewarePipeline();
app.use(errorHandler).use(logger).use(auth).use(handler);

// 実行
const ctx: Context = {
  request: { method: 'GET', path: '/api/users', headers: { authorization: 'Bearer xxx' } },
  response: { status: 200, body: null, headers: {} },
  state: {},
};
app.execute(ctx).then(() => console.log(ctx.response));`,
      highlights: [
        { startLine: 4, endLine: 17, color: '#f59e0b', label: 'Context型', explanation: 'リクエスト/レスポンス/状態を保持するコンテキスト' },
        { startLine: 22, endLine: 39, color: '#22c55e', label: 'Pipeline', explanation: '再帰的dispatchでミドルウェアを順次実行' },
        { startLine: 41, endLine: 73, color: '#3b82f6', label: 'ミドルウェア群', explanation: 'logger/auth/errorHandler/handler の各レイヤー' },
        { startLine: 77, endLine: 77, color: '#ec4899', label: 'チェーン構築', explanation: 'use()のメソッドチェーンでパイプライン組立' },
      ],
      keyPoints: [
        'ミドルウェアは (ctx, next) => Promise<void> のシグネチャ',
        'next()を呼ぶことで次のミドルウェアに処理を委譲する',
        'next()を呼ばなければチェーンを中断できる',
        'try-catchミドルウェアで横断的なエラー処理を実現する',
      ],
    },
    {
      id: 19,
      title: 'Decorator Pattern',
      titleJa: 'デコレータパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'デコレータで機能を動的に追加し、継承を使わずに横断的関心事を合成します。',
      code: `// デコレータパターン（構造パターン）
// 継承ではなく合成で動的に機能を追加する

interface HttpClient {
  request(url: string, options?: RequestInit): Promise<Response>;
}

// 基本クライアント
class BasicHttpClient implements HttpClient {
  async request(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, options);
  }
}

// ログ付きデコレータ
class LoggingHttpClient implements HttpClient {
  constructor(private inner: HttpClient) {}

  async request(url: string, options?: RequestInit): Promise<Response> {
    console.log(\`[HTTP] \${options?.method || 'GET'} \${url}\`);
    const start = Date.now();
    const response = await this.inner.request(url, options);
    console.log(\`[HTTP] \${response.status} (\${Date.now() - start}ms)\`);
    return response;
  }
}

// リトライデコレータ
class RetryHttpClient implements HttpClient {
  constructor(
    private inner: HttpClient,
    private maxRetries: number = 3,
    private delayMs: number = 1000
  ) {}

  async request(url: string, options?: RequestInit): Promise<Response> {
    let lastError: Error | null = null;
    for (let i = 0; i <= this.maxRetries; i++) {
      try {
        return await this.inner.request(url, options);
      } catch (err) {
        lastError = err as Error;
        if (i < this.maxRetries) {
          await new Promise(r => setTimeout(r, this.delayMs * (i + 1)));
        }
      }
    }
    throw lastError;
  }
}

// キャッシュデコレータ
class CachingHttpClient implements HttpClient {
  private cache = new Map<string, { response: Response; expiry: number }>();

  constructor(private inner: HttpClient, private ttlMs: number = 60000) {}

  async request(url: string, options?: RequestInit): Promise<Response> {
    const method = options?.method || 'GET';
    if (method !== 'GET') return this.inner.request(url, options);

    const cached = this.cache.get(url);
    if (cached && cached.expiry > Date.now()) {
      console.log(\`[CACHE] Hit: \${url}\`);
      return cached.response.clone();
    }

    const response = await this.inner.request(url, options);
    this.cache.set(url, { response: response.clone(), expiry: Date.now() + this.ttlMs });
    return response;
  }
}

// デコレータの合成
const client: HttpClient = new CachingHttpClient(
  new RetryHttpClient(
    new LoggingHttpClient(
      new BasicHttpClient()
    ),
    3, 500
  ),
  30000
);

// client.request() は Cache → Retry → Logging → Basic の順に処理`,
      highlights: [
        { startLine: 4, endLine: 6, color: '#a855f7', label: 'HttpClient Interface', explanation: '全デコレータが実装する共通インターフェース' },
        { startLine: 16, endLine: 26, color: '#3b82f6', label: 'Loggingデコレータ', explanation: 'リクエストの前後にログを追加' },
        { startLine: 29, endLine: 50, color: '#ef4444', label: 'Retryデコレータ', explanation: '失敗時に指数バックオフでリトライ' },
        { startLine: 53, endLine: 72, color: '#22c55e', label: 'Cacheデコレータ', explanation: 'GETリクエストの結果をTTL付きでキャッシュ' },
        { startLine: 74, endLine: 83, color: '#ec4899', label: 'デコレータ合成', explanation: 'ネストにより処理レイヤーを積み重ねる' },
      ],
      keyPoints: [
        '全デコレータが同じHttpClientインターフェースを実装する',
        '内部にラップ対象(inner)を保持して処理を委譲する',
        'デコレータの合成順序で処理フローが決まる',
        '新機能追加時に既存コードを変更せず新デコレータを追加',
      ],
    },
    {
      id: 20,
      title: 'Pub/Sub with Type Safety',
      titleJa: '型安全なPub/Sub',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'マイクロサービス間通信を模したPub/Subシステムを型安全に実装します。',
      code: `// 型安全なPub/Subメッセージングシステム

// メッセージ型の定義
interface MessageTypes {
  'user.created': { userId: string; email: string };
  'user.updated': { userId: string; changes: Record<string, unknown> };
  'order.placed': { orderId: string; userId: string; total: number };
  'order.shipped': { orderId: string; trackingId: string };
}

type Topic = keyof MessageTypes;

interface Message<T extends Topic> {
  topic: T;
  payload: MessageTypes[T];
  timestamp: Date;
  messageId: string;
}

type Handler<T extends Topic> = (message: Message<T>) => Promise<void>;

// メッセージバス
class MessageBus {
  private handlers = new Map<string, Set<Handler<never>>>();

  subscribe<T extends Topic>(topic: T, handler: Handler<T>): () => void {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, new Set());
    }
    this.handlers.get(topic)!.add(handler as Handler<never>);
    return () => { this.handlers.get(topic)?.delete(handler as Handler<never>); };
  }

  async publish<T extends Topic>(topic: T, payload: MessageTypes[T]): Promise<void> {
    const message: Message<T> = {
      topic,
      payload,
      timestamp: new Date(),
      messageId: Math.random().toString(36).slice(2),
    };
    const handlers = this.handlers.get(topic);
    if (handlers) {
      await Promise.all(
        Array.from(handlers).map(h => (h as Handler<T>)(message))
      );
    }
  }
}

// サブスクライバー（疎結合なハンドラー）
class EmailNotifier {
  constructor(private bus: MessageBus) {
    bus.subscribe('user.created', this.onUserCreated.bind(this));
    bus.subscribe('order.placed', this.onOrderPlaced.bind(this));
  }

  private async onUserCreated(msg: Message<'user.created'>): Promise<void> {
    console.log(\`[Email] Welcome email to \${msg.payload.email}\`);
  }

  private async onOrderPlaced(msg: Message<'order.placed'>): Promise<void> {
    console.log(\`[Email] Order confirmation #\${msg.payload.orderId}\`);
  }
}

class AnalyticsTracker {
  constructor(bus: MessageBus) {
    bus.subscribe('user.created', async (msg) => {
      console.log(\`[Analytics] New user: \${msg.payload.userId}\`);
    });
    bus.subscribe('order.placed', async (msg) => {
      console.log(\`[Analytics] Revenue: $\${msg.payload.total}\`);
    });
  }
}

// 使用例
const bus = new MessageBus();
new EmailNotifier(bus);
new AnalyticsTracker(bus);

bus.publish('user.created', { userId: 'u1', email: 'alice@example.com' });
bus.publish('order.placed', { orderId: 'o1', userId: 'u1', total: 99.99 });`,
      highlights: [
        { startLine: 3, endLine: 9, color: '#f59e0b', label: 'メッセージ型マップ', explanation: 'トピック名とペイロード型の対応を定義' },
        { startLine: 22, endLine: 48, color: '#22c55e', label: 'MessageBus', explanation: '型安全なpublish/subscribeメカニズム' },
        { startLine: 51, endLine: 64, color: '#3b82f6', label: 'EmailNotifier', explanation: 'メッセージを受けてメール送信を行うサブスクライバー' },
        { startLine: 66, endLine: 75, color: '#3b82f6', label: 'AnalyticsTracker', explanation: '同じイベントの別ハンドラー' },
      ],
      keyPoints: [
        'MessageTypesでトピックとペイロード型を紐付ける',
        'publish/subscribeの引数型が自動チェックされる',
        '疎結合：パブリッシャーはサブスクライバーを知らない',
        'subscribe()がunsubscribe関数を返しメモリリーク防止',
      ],
    },
    {
      id: 21,
      title: 'Monad-like Chaining',
      titleJa: 'モナド風チェーン',
      difficulty: 'intermediate',
      category: 'Functional',
      description: 'Option/Maybe型を実装し、null安全なメソッドチェーンパターンを学びます。',
      code: `// Option/Maybe型パターン
// null/undefinedを型レベルで安全に扱うモナド風チェーン

class Option<T> {
  private constructor(private readonly value: T | null) {}

  static some<T>(value: T): Option<T> {
    return new Option(value);
  }

  static none<T>(): Option<T> {
    return new Option<T>(null);
  }

  static fromNullable<T>(value: T | null | undefined): Option<T> {
    return value != null ? Option.some(value) : Option.none();
  }

  isSome(): boolean {
    return this.value !== null;
  }

  isNone(): boolean {
    return this.value === null;
  }

  map<U>(fn: (value: T) => U): Option<U> {
    return this.value !== null ? Option.some(fn(this.value)) : Option.none();
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.value !== null ? fn(this.value) : Option.none();
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (this.value !== null && predicate(this.value)) return this;
    return Option.none();
  }

  getOrElse(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue;
  }

  getOrThrow(message = 'Value is None'): T {
    if (this.value === null) throw new Error(message);
    return this.value;
  }

  match<U>(handlers: { some: (value: T) => U; none: () => U }): U {
    return this.value !== null ? handlers.some(this.value) : handlers.none();
  }
}

// 使用例：ネストしたオプショナルアクセス
interface Address { city: string; zip: string; }
interface Profile { address?: Address; }
interface User { id: string; profile?: Profile; }

function getUserCity(user: User | null): string {
  return Option.fromNullable(user)
    .flatMap(u => Option.fromNullable(u.profile))
    .flatMap(p => Option.fromNullable(p.address))
    .map(a => a.city)
    .getOrElse('Unknown');
}

const user: User = { id: '1', profile: { address: { city: 'Tokyo', zip: '100-0001' } } };
console.log(getUserCity(user));        // "Tokyo"
console.log(getUserCity(null));        // "Unknown"
console.log(getUserCity({ id: '2' })); // "Unknown"`,
      highlights: [
        { startLine: 4, endLine: 5, color: '#a855f7', label: 'Option型', explanation: 'null許容値をラップするコンテナ型' },
        { startLine: 27, endLine: 33, color: '#22c55e', label: 'map/flatMap', explanation: '値が存在する場合のみ変換を適用するチェーン操作' },
        { startLine: 49, endLine: 51, color: '#3b82f6', label: 'matchメソッド', explanation: 'some/noneの両ケースを明示的にハンドリング' },
        { startLine: 59, endLine: 65, color: '#ec4899', label: 'チェーン使用例', explanation: 'ネストしたnullチェックをフラットなチェーンに変換' },
      ],
      keyPoints: [
        'Option型でnull/undefinedを安全にラップする',
        'map()で値の変換、flatMap()でOptionのネストを解消',
        'getOrElse()でデフォルト値を設定しnullを排除',
        'メソッドチェーンでネストしたnullチェックをフラットに書ける',
      ],
    },
    {
      id: 22,
      title: 'Proxy & Access Control',
      titleJa: 'Proxyとアクセス制御',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'Proxyパターンでアクセス制御・バリデーション・キャッシュを透過的に追加します。',
      code: `// Proxyパターン
// アクセス制御・バリデーション・キャッシュを透過的に追加

interface UserApi {
  getUser(id: string): Promise<{ id: string; name: string; role: string }>;
  updateUser(id: string, data: Record<string, unknown>): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

// 本体の実装
class RealUserApi implements UserApi {
  async getUser(id: string) {
    console.log(\`[DB] Loading user \${id}\`);
    return { id, name: 'Alice', role: 'admin' };
  }
  async updateUser(id: string, data: Record<string, unknown>) {
    console.log(\`[DB] Updating user \${id}\`, data);
  }
  async deleteUser(id: string) {
    console.log(\`[DB] Deleting user \${id}\`);
  }
}

// アクセス制御プロキシ
class AuthProxy implements UserApi {
  constructor(
    private inner: UserApi,
    private currentUserRole: string
  ) {}

  async getUser(id: string) {
    return this.inner.getUser(id);  // 読み取りは誰でもOK
  }

  async updateUser(id: string, data: Record<string, unknown>) {
    if (this.currentUserRole !== 'admin') {
      throw new Error('Permission denied: admin only');
    }
    return this.inner.updateUser(id, data);
  }

  async deleteUser(id: string) {
    if (this.currentUserRole !== 'admin') {
      throw new Error('Permission denied: admin only');
    }
    return this.inner.deleteUser(id);
  }
}

// キャッシュプロキシ
class CacheProxy implements UserApi {
  private cache = new Map<string, { data: unknown; expiry: number }>();

  constructor(private inner: UserApi, private ttl = 60000) {}

  async getUser(id: string) {
    const key = \`user:\${id}\`;
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      console.log(\`[Cache] Hit for \${id}\`);
      return cached.data as Awaited<ReturnType<UserApi['getUser']>>;
    }
    const result = await this.inner.getUser(id);
    this.cache.set(key, { data: result, expiry: Date.now() + this.ttl });
    return result;
  }

  async updateUser(id: string, data: Record<string, unknown>) {
    this.cache.delete(\`user:\${id}\`);
    return this.inner.updateUser(id, data);
  }

  async deleteUser(id: string) {
    this.cache.delete(\`user:\${id}\`);
    return this.inner.deleteUser(id);
  }
}

// プロキシを重ねて使用
const api: UserApi = new CacheProxy(
  new AuthProxy(new RealUserApi(), 'admin')
);`,
      highlights: [
        { startLine: 4, endLine: 8, color: '#a855f7', label: 'UserApi Interface', explanation: '本体とプロキシが共有するインターフェース' },
        { startLine: 24, endLine: 48, color: '#ef4444', label: '認証プロキシ', explanation: '権限チェックを透過的に追加するプロキシ' },
        { startLine: 50, endLine: 77, color: '#22c55e', label: 'キャッシュプロキシ', explanation: 'TTL付きキャッシュで読み取り性能を改善' },
        { startLine: 79, endLine: 82, color: '#ec4899', label: 'プロキシ合成', explanation: '複数のプロキシを重ねて多層防御を実現' },
      ],
      keyPoints: [
        'プロキシは本体と同じインターフェースを実装する',
        '呼び出し元はプロキシか本体かを意識しない',
        '認証・キャッシュ等の関心事を横断的に追加できる',
        '更新/削除時にキャッシュを無効化する整合性管理',
      ],
    },
    // ──── Advanced (id 23-33) ────
    {
      id: 23,
      title: 'Clean Architecture',
      titleJa: 'クリーンアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'ドメイン層・ユースケース層・インフラ層を分離し、変更に強い設計を実現します。',
      bookReference: 'Clean Architecture 第22章',
      code: `// クリーンアーキテクチャ
// Domain → UseCase → Infrastructure の依存方向

// ━━━ Domain Layer（最内層：ビジネスルールのみ）━━━

// Value Object
class Money {
  constructor(
    readonly amount: number,
    readonly currency: string
  ) {
    if (amount < 0) throw new Error('Amount must be non-negative');
  }
  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor * 100) / 100, this.currency);
  }
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
  toString(): string {
    return \`\${this.currency} \${this.amount.toFixed(2)}\`;
  }
}

// Entity
class OrderItem {
  constructor(
    readonly productId: string,
    readonly productName: string,
    readonly unitPrice: Money,
    readonly quantity: number
  ) {
    if (quantity <= 0) throw new Error('Quantity must be positive');
  }
  get subtotal(): Money {
    return this.unitPrice.multiply(this.quantity);
  }
}

class Order {
  private _items: OrderItem[] = [];
  private _status: 'draft' | 'confirmed' | 'shipped' | 'delivered' = 'draft';

  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly createdAt: Date = new Date()
  ) {}

  get items(): ReadonlyArray<OrderItem> { return this._items; }
  get status() { return this._status; }

  get total(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.subtotal),
      new Money(0, 'JPY')
    );
  }

  addItem(item: OrderItem): void {
    if (this._status !== 'draft') throw new Error('Cannot modify confirmed order');
    this._items.push(item);
  }

  confirm(): void {
    if (this._items.length === 0) throw new Error('Cannot confirm empty order');
    if (this._status !== 'draft') throw new Error('Already confirmed');
    this._status = 'confirmed';
  }
}

// Domain Service Interface (Port)
interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

interface PaymentGateway {
  charge(orderId: string, amount: Money): Promise<{ transactionId: string }>;
}

interface NotificationService {
  sendOrderConfirmation(customerId: string, orderId: string): Promise<void>;
}

// ━━━ Use Case Layer（アプリケーションビジネスルール）━━━

interface PlaceOrderInput {
  customerId: string;
  items: Array<{
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
  }>;
}

interface PlaceOrderOutput {
  orderId: string;
  total: string;
  transactionId: string;
}

class PlaceOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private payment: PaymentGateway,
    private notification: NotificationService
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    // 1. Orderエンティティを構築
    const orderId = \`ord_\${Date.now()}\`;
    const order = new Order(orderId, input.customerId);
    for (const item of input.items) {
      order.addItem(new OrderItem(
        item.productId,
        item.productName,
        new Money(item.unitPrice, 'JPY'),
        item.quantity
      ));
    }

    // 2. ビジネスルール検証 + 確定
    order.confirm();

    // 3. 永続化
    await this.orderRepo.save(order);

    // 4. 決済
    const result = await this.payment.charge(orderId, order.total);

    // 5. 通知
    await this.notification.sendOrderConfirmation(input.customerId, orderId);

    return {
      orderId,
      total: order.total.toString(),
      transactionId: result.transactionId,
    };
  }
}

// ━━━ Infrastructure Layer（外部アダプター）━━━

class InMemoryOrderRepository implements OrderRepository {
  private store = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.store.set(order.id, order);
  }

  async findById(id: string): Promise<Order | null> {
    return this.store.get(id) ?? null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return Array.from(this.store.values())
      .filter(o => o.customerId === customerId);
  }
}

class MockPaymentGateway implements PaymentGateway {
  async charge(orderId: string, amount: Money) {
    console.log(\`[Payment] Charged \${amount} for order \${orderId}\`);
    return { transactionId: \`txn_\${Date.now()}\` };
  }
}

class ConsoleNotificationService implements NotificationService {
  async sendOrderConfirmation(customerId: string, orderId: string) {
    console.log(\`[Notification] Order \${orderId} confirmed for \${customerId}\`);
  }
}

// ━━━ Composition Root（依存注入の組立）━━━

const orderRepo = new InMemoryOrderRepository();
const payment = new MockPaymentGateway();
const notification = new ConsoleNotificationService();
const placeOrder = new PlaceOrderUseCase(orderRepo, payment, notification);

// 実行
placeOrder.execute({
  customerId: 'cust_1',
  items: [
    { productId: 'p1', productName: 'Book', unitPrice: 1500, quantity: 2 },
    { productId: 'p2', productName: 'Pen', unitPrice: 200, quantity: 5 },
  ],
}).then(result => console.log('Order placed:', result));`,
      highlights: [
        { startLine: 7, endLine: 27, color: '#f59e0b', label: 'Value Object', explanation: 'Moneyは不変で等価性で比較。ビジネスルールを内包' },
        { startLine: 30, endLine: 74, color: '#22c55e', label: 'Entity', explanation: 'OrderはIDで識別。状態遷移のルールを自己保持' },
        { startLine: 76, endLine: 89, color: '#a855f7', label: 'Port（インターフェース）', explanation: 'ドメイン層が定義するインターフェース' },
        { startLine: 103, endLine: 147, color: '#3b82f6', label: 'Use Case', explanation: 'ビジネスフローをオーケストレーション' },
        { startLine: 149, endLine: 179, color: '#ec4899', label: 'Infrastructure', explanation: 'Port実装。交換可能な外部アダプター' },
      ],
      keyPoints: [
        '依存方向は外側→内側（インフラ→ドメイン）',
        'Value Objectは不変で等価性で比較、Entityは同一性で比較',
        'Use Caseはドメインオブジェクトのオーケストレーター',
        'Infrastructure層はPort（Interface）を実装するアダプター',
        'Composition Rootで依存注入の組立を行う',
      ],
    },
    {
      id: 24,
      title: 'Domain-Driven Design',
      titleJa: 'ドメイン駆動設計',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'Aggregate・Entity・Value Object・Domain Eventを使ったDDDの戦術的設計を実践します。',
      bookReference: 'エリック・エヴァンスのDDD',
      code: `// ドメイン駆動設計（DDD）戦術的パターン
// Aggregate Root, Entity, Value Object, Domain Event

// ━━━ Value Objects ━━━
class Email {
  readonly value: string;
  constructor(email: string) {
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      throw new Error(\`Invalid email: \${email}\`);
    }
    this.value = email.toLowerCase();
  }
  equals(other: Email): boolean { return this.value === other.value; }
}

class PhoneNumber {
  readonly value: string;
  constructor(phone: string) {
    const cleaned = phone.replace(/[\\s\\-()]/g, '');
    if (!/^\\+?\\d{10,15}$/.test(cleaned)) {
      throw new Error(\`Invalid phone: \${phone}\`);
    }
    this.value = cleaned;
  }
  equals(other: PhoneNumber): boolean { return this.value === other.value; }
}

class Address {
  constructor(
    readonly postalCode: string,
    readonly prefecture: string,
    readonly city: string,
    readonly street: string,
    readonly building?: string
  ) {}
  get fullAddress(): string {
    return \`〒\${this.postalCode} \${this.prefecture}\${this.city}\${this.street}\${this.building ? ' ' + this.building : ''}\`;
  }
  equals(other: Address): boolean {
    return this.postalCode === other.postalCode && this.street === other.street;
  }
}

// ━━━ Domain Events ━━━
interface DomainEvent {
  readonly eventType: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;
}

class CustomerRegistered implements DomainEvent {
  readonly eventType = 'CustomerRegistered';
  readonly occurredAt = new Date();
  constructor(
    readonly aggregateId: string,
    readonly email: string,
    readonly name: string
  ) {}
}

class CustomerAddressChanged implements DomainEvent {
  readonly eventType = 'CustomerAddressChanged';
  readonly occurredAt = new Date();
  constructor(
    readonly aggregateId: string,
    readonly newAddress: string
  ) {}
}

class CustomerSuspended implements DomainEvent {
  readonly eventType = 'CustomerSuspended';
  readonly occurredAt = new Date();
  constructor(
    readonly aggregateId: string,
    readonly reason: string
  ) {}
}

// ━━━ Aggregate Root ━━━
type CustomerStatus = 'active' | 'suspended' | 'closed';

class Customer {
  private _events: DomainEvent[] = [];

  private constructor(
    readonly id: string,
    private _name: string,
    private _email: Email,
    private _phone: PhoneNumber,
    private _address: Address,
    private _status: CustomerStatus,
    private _createdAt: Date
  ) {}

  // ファクトリメソッド
  static register(id: string, name: string, email: string, phone: string, address: Address): Customer {
    const customer = new Customer(
      id, name, new Email(email), new PhoneNumber(phone),
      address, 'active', new Date()
    );
    customer.addEvent(new CustomerRegistered(id, email, name));
    return customer;
  }

  get name() { return this._name; }
  get email() { return this._email; }
  get status() { return this._status; }
  get address() { return this._address; }

  // ビジネスルールを内包するメソッド
  changeAddress(newAddress: Address): void {
    if (this._status !== 'active') throw new Error('Cannot update suspended customer');
    this._address = newAddress;
    this.addEvent(new CustomerAddressChanged(this.id, newAddress.fullAddress));
  }

  suspend(reason: string): void {
    if (this._status !== 'active') throw new Error('Customer is not active');
    this._status = 'suspended';
    this.addEvent(new CustomerSuspended(this.id, reason));
  }

  reactivate(): void {
    if (this._status !== 'suspended') throw new Error('Customer is not suspended');
    this._status = 'active';
  }

  // ドメインイベントの管理
  private addEvent(event: DomainEvent): void {
    this._events.push(event);
  }

  pullEvents(): DomainEvent[] {
    const events = [...this._events];
    this._events = [];
    return events;
  }
}

// ━━━ Repository Interface ━━━
interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
}

// ━━━ Application Service ━━━
class CustomerService {
  constructor(
    private repo: CustomerRepository,
    private eventBus: { publish(event: DomainEvent): Promise<void> }
  ) {}

  async registerCustomer(name: string, email: string, phone: string, address: Address): Promise<string> {
    const id = \`cust_\${Date.now()}\`;
    const customer = Customer.register(id, name, email, phone, address);
    await this.repo.save(customer);

    // ドメインイベントを発行
    for (const event of customer.pullEvents()) {
      await this.eventBus.publish(event);
    }
    return id;
  }

  async changeCustomerAddress(customerId: string, newAddress: Address): Promise<void> {
    const customer = await this.repo.findById(customerId);
    if (!customer) throw new Error('Customer not found');
    customer.changeAddress(newAddress);
    await this.repo.save(customer);
    for (const event of customer.pullEvents()) {
      await this.eventBus.publish(event);
    }
  }
}`,
      highlights: [
        { startLine: 4, endLine: 42, color: '#f59e0b', label: 'Value Objects', explanation: 'Email/PhoneNumber/Addressは不変で自己検証する値オブジェクト' },
        { startLine: 44, endLine: 77, color: '#3b82f6', label: 'Domain Events', explanation: 'ドメインの重要な出来事をイベントとして表現' },
        { startLine: 79, endLine: 138, color: '#22c55e', label: 'Aggregate Root', explanation: 'Customerが整合性境界を管理しイベントを発行' },
        { startLine: 146, endLine: 174, color: '#a855f7', label: 'Application Service', explanation: 'ユースケースのオーケストレーションとイベント発行' },
      ],
      keyPoints: [
        'Value Objectは不変・自己検証・等価性で比較する',
        'Aggregate Rootが整合性境界の管理とルール適用を担う',
        'ファクトリメソッドでオブジェクト生成ルールを一元管理',
        'Domain Eventで状態変更をイベントとして外部に通知',
        'Application Serviceはドメインロジックを持たずオーケストレーションのみ行う',
      ],
    },
    {
      id: 25,
      title: 'Event Sourcing',
      titleJa: 'イベントソーシング',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '状態をイベントの履歴から再構築するイベントソーシングパターンを実装します。',
      code: `// イベントソーシング
// 状態をイベントの履歴から再構築する

// ━━━ イベント定義 ━━━
interface BaseEvent {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly version: number;
  readonly timestamp: Date;
}

interface AccountCreated extends BaseEvent {
  readonly type: 'AccountCreated';
  readonly ownerName: string;
  readonly initialBalance: number;
}

interface MoneyDeposited extends BaseEvent {
  readonly type: 'MoneyDeposited';
  readonly amount: number;
  readonly description: string;
}

interface MoneyWithdrawn extends BaseEvent {
  readonly type: 'MoneyWithdrawn';
  readonly amount: number;
  readonly description: string;
}

interface AccountFrozen extends BaseEvent {
  readonly type: 'AccountFrozen';
  readonly reason: string;
}

type AccountEvent = AccountCreated | MoneyDeposited | MoneyWithdrawn | AccountFrozen;

// ━━━ Aggregate（イベントから状態を再構築）━━━
interface AccountState {
  id: string;
  ownerName: string;
  balance: number;
  isFrozen: boolean;
  version: number;
}

class BankAccount {
  private state: AccountState;
  private uncommittedEvents: AccountEvent[] = [];

  private constructor(state: AccountState) {
    this.state = state;
  }

  // イベント履歴から復元
  static fromHistory(events: AccountEvent[]): BankAccount {
    const initial: AccountState = { id: '', ownerName: '', balance: 0, isFrozen: false, version: 0 };
    const account = new BankAccount(initial);
    for (const event of events) {
      account.apply(event);
    }
    return account;
  }

  // 新規作成
  static create(id: string, ownerName: string, initialBalance: number): BankAccount {
    const account = new BankAccount({ id: '', ownerName: '', balance: 0, isFrozen: false, version: 0 });
    account.raiseEvent({
      type: 'AccountCreated',
      eventId: crypto.randomUUID(),
      aggregateId: id,
      version: 1,
      timestamp: new Date(),
      ownerName,
      initialBalance,
    });
    return account;
  }

  get id() { return this.state.id; }
  get balance() { return this.state.balance; }
  get isFrozen() { return this.state.isFrozen; }
  get version() { return this.state.version; }

  deposit(amount: number, description: string): void {
    if (this.state.isFrozen) throw new Error('Account is frozen');
    if (amount <= 0) throw new Error('Amount must be positive');
    this.raiseEvent({
      type: 'MoneyDeposited',
      eventId: crypto.randomUUID(),
      aggregateId: this.state.id,
      version: this.state.version + 1,
      timestamp: new Date(),
      amount,
      description,
    });
  }

  withdraw(amount: number, description: string): void {
    if (this.state.isFrozen) throw new Error('Account is frozen');
    if (amount <= 0) throw new Error('Amount must be positive');
    if (this.state.balance < amount) throw new Error('Insufficient funds');
    this.raiseEvent({
      type: 'MoneyWithdrawn',
      eventId: crypto.randomUUID(),
      aggregateId: this.state.id,
      version: this.state.version + 1,
      timestamp: new Date(),
      amount,
      description,
    });
  }

  freeze(reason: string): void {
    if (this.state.isFrozen) throw new Error('Already frozen');
    this.raiseEvent({
      type: 'AccountFrozen',
      eventId: crypto.randomUUID(),
      aggregateId: this.state.id,
      version: this.state.version + 1,
      timestamp: new Date(),
      reason,
    });
  }

  // イベントを適用して状態を更新
  private apply(event: AccountEvent): void {
    switch (event.type) {
      case 'AccountCreated':
        this.state = {
          id: event.aggregateId,
          ownerName: event.ownerName,
          balance: event.initialBalance,
          isFrozen: false,
          version: event.version,
        };
        break;
      case 'MoneyDeposited':
        this.state.balance += event.amount;
        this.state.version = event.version;
        break;
      case 'MoneyWithdrawn':
        this.state.balance -= event.amount;
        this.state.version = event.version;
        break;
      case 'AccountFrozen':
        this.state.isFrozen = true;
        this.state.version = event.version;
        break;
    }
  }

  private raiseEvent(event: AccountEvent): void {
    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  pullUncommittedEvents(): AccountEvent[] {
    const events = [...this.uncommittedEvents];
    this.uncommittedEvents = [];
    return events;
  }
}

// ━━━ Event Store ━━━
class EventStore {
  private streams = new Map<string, AccountEvent[]>();

  append(aggregateId: string, events: AccountEvent[], expectedVersion: number): void {
    const existing = this.streams.get(aggregateId) || [];
    if (existing.length !== expectedVersion) {
      throw new Error(\`Concurrency conflict: expected v\${expectedVersion}, got v\${existing.length}\`);
    }
    this.streams.set(aggregateId, [...existing, ...events]);
  }

  getEvents(aggregateId: string): AccountEvent[] {
    return this.streams.get(aggregateId) || [];
  }
}

// ━━━ 使用例 ━━━
const store = new EventStore();

// 新規口座作成
const account = BankAccount.create('acc_1', 'Alice', 10000);
account.deposit(5000, 'Salary');
account.withdraw(3000, 'Rent');
store.append('acc_1', account.pullUncommittedEvents(), 0);

// 別のプロセスでイベントから状態を復元
const events = store.getEvents('acc_1');
const restored = BankAccount.fromHistory(events);
console.log(\`Balance: \${restored.balance}\`);  // 12000
console.log(\`Version: \${restored.version}\`);   // 3`,
      highlights: [
        { startLine: 5, endLine: 36, color: '#f59e0b', label: 'イベント定義', explanation: '口座の全状態変更をイベント型で表現' },
        { startLine: 38, endLine: 44, color: '#a855f7', label: '状態モデル', explanation: 'イベントから導出される現在の口座状態' },
        { startLine: 46, endLine: 162, color: '#22c55e', label: 'Aggregate', explanation: 'イベントの生成・適用とビジネスルール検証' },
        { startLine: 164, endLine: 179, color: '#3b82f6', label: 'Event Store', explanation: '楽観的並行制御付きのイベント永続化' },
      ],
      keyPoints: [
        '状態はイベントの履歴から常に再構築可能（真のソースはイベント）',
        'raiseEvent()でイベント生成と状態適用を同時に行う',
        'apply()はswitch文で各イベント型に対応する状態変更を実行',
        'EventStoreで楽観的並行制御（expectedVersion）を実現',
        'pullUncommittedEvents()パターンで永続化タイミングを制御',
      ],
    },
    {
      id: 26,
      title: 'CQRS Pattern',
      titleJa: 'CQRSパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'コマンド（書き込み）とクエリ（読み取り）のモデルを分離するCQRSを実装します。',
      bookReference: 'Implementing DDD',
      code: `// CQRS（Command Query Responsibility Segregation）
// コマンド（変更）とクエリ（参照）のモデルを分離

// ━━━ Command Side（書き込みモデル）━━━

interface Command {
  readonly type: string;
}

class CreateTodoCommand implements Command {
  readonly type = 'CreateTodo';
  constructor(
    readonly id: string,
    readonly title: string,
    readonly assigneeId: string
  ) {}
}

class CompleteTodoCommand implements Command {
  readonly type = 'CompleteTodo';
  constructor(readonly id: string) {}
}

class AssignTodoCommand implements Command {
  readonly type = 'AssignTodo';
  constructor(readonly id: string, readonly assigneeId: string) {}
}

// Write Model (Aggregate)
class Todo {
  private constructor(
    readonly id: string,
    private _title: string,
    private _assigneeId: string,
    private _completed: boolean,
    private _createdAt: Date
  ) {}

  static create(id: string, title: string, assigneeId: string): Todo {
    if (!title.trim()) throw new Error('Title is required');
    return new Todo(id, title, assigneeId, false, new Date());
  }

  get completed() { return this._completed; }
  get assigneeId() { return this._assigneeId; }
  get title() { return this._title; }
  get createdAt() { return this._createdAt; }

  complete(): void {
    if (this._completed) throw new Error('Already completed');
    this._completed = true;
  }

  assign(assigneeId: string): void {
    if (this._completed) throw new Error('Cannot reassign completed todo');
    this._assigneeId = assigneeId;
  }
}

// Command Handler
interface TodoWriteRepository {
  save(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
}

class TodoCommandHandler {
  constructor(
    private writeRepo: TodoWriteRepository,
    private projector: TodoProjector
  ) {}

  async handle(command: Command): Promise<void> {
    switch (command.type) {
      case 'CreateTodo': {
        const cmd = command as CreateTodoCommand;
        const todo = Todo.create(cmd.id, cmd.title, cmd.assigneeId);
        await this.writeRepo.save(todo);
        await this.projector.onTodoCreated(todo);
        break;
      }
      case 'CompleteTodo': {
        const cmd = command as CompleteTodoCommand;
        const todo = await this.writeRepo.findById(cmd.id);
        if (!todo) throw new Error('Todo not found');
        todo.complete();
        await this.writeRepo.save(todo);
        await this.projector.onTodoCompleted(cmd.id);
        break;
      }
      case 'AssignTodo': {
        const cmd = command as AssignTodoCommand;
        const todo = await this.writeRepo.findById(cmd.id);
        if (!todo) throw new Error('Todo not found');
        todo.assign(cmd.assigneeId);
        await this.writeRepo.save(todo);
        await this.projector.onTodoAssigned(cmd.id, cmd.assigneeId);
        break;
      }
    }
  }
}

// ━━━ Query Side（読み取りモデル）━━━

interface TodoView {
  id: string;
  title: string;
  assigneeName: string;
  completed: boolean;
  createdAt: string;
}

interface TodoSummary {
  totalCount: number;
  completedCount: number;
  byAssignee: Record<string, number>;
}

// Read Model Repository
interface TodoReadRepository {
  getById(id: string): Promise<TodoView | null>;
  getAll(filter?: { completed?: boolean; assigneeId?: string }): Promise<TodoView[]>;
  getSummary(): Promise<TodoSummary>;
}

class InMemoryTodoReadRepo implements TodoReadRepository {
  private views = new Map<string, TodoView>();

  async upsert(view: TodoView) { this.views.set(view.id, view); }
  async markCompleted(id: string) {
    const v = this.views.get(id);
    if (v) v.completed = true;
  }
  async updateAssignee(id: string, name: string) {
    const v = this.views.get(id);
    if (v) v.assigneeName = name;
  }

  async getById(id: string) { return this.views.get(id) ?? null; }
  async getAll(filter?: { completed?: boolean; assigneeId?: string }) {
    let list = Array.from(this.views.values());
    if (filter?.completed !== undefined) list = list.filter(v => v.completed === filter.completed);
    return list;
  }
  async getSummary(): Promise<TodoSummary> {
    const all = Array.from(this.views.values());
    return {
      totalCount: all.length,
      completedCount: all.filter(v => v.completed).length,
      byAssignee: all.reduce((acc, v) => {
        acc[v.assigneeName] = (acc[v.assigneeName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}

// Projector（Write→ReadモデルのSync）
class TodoProjector {
  constructor(private readRepo: InMemoryTodoReadRepo) {}

  async onTodoCreated(todo: Todo) {
    await this.readRepo.upsert({
      id: todo.id,
      title: todo.title,
      assigneeName: todo.assigneeId,
      completed: false,
      createdAt: todo.createdAt.toISOString(),
    });
  }

  async onTodoCompleted(id: string) {
    await this.readRepo.markCompleted(id);
  }

  async onTodoAssigned(id: string, assigneeId: string) {
    await this.readRepo.updateAssignee(id, assigneeId);
  }
}

// Query Handler
class TodoQueryHandler {
  constructor(private readRepo: TodoReadRepository) {}

  async getAll(filter?: { completed?: boolean }) {
    return this.readRepo.getAll(filter);
  }

  async getSummary() {
    return this.readRepo.getSummary();
  }
}

// ━━━ 使用例 ━━━
async function main() {
  const readRepo = new InMemoryTodoReadRepo();
  const projector = new TodoProjector(readRepo);
  const writeRepo = { store: new Map<string, Todo>(), async save(t: Todo) { this.store.set(t.id, t); }, async findById(id: string) { return this.store.get(id) ?? null; } };
  const commandHandler = new TodoCommandHandler(writeRepo, projector);
  const queryHandler = new TodoQueryHandler(readRepo);

  await commandHandler.handle(new CreateTodoCommand('1', 'Write docs', 'Alice'));
  await commandHandler.handle(new CreateTodoCommand('2', 'Fix bug', 'Bob'));
  await commandHandler.handle(new CompleteTodoCommand('1'));

  console.log(await queryHandler.getSummary());
  console.log(await queryHandler.getAll({ completed: false }));
}
main();`,
      highlights: [
        { startLine: 6, endLine: 27, color: '#f59e0b', label: 'Command定義', explanation: 'Create/Complete/Assignの3つの変更操作' },
        { startLine: 30, endLine: 58, color: '#22c55e', label: 'Write Model', explanation: 'ビジネスルールを持つTodoエンティティ' },
        { startLine: 61, endLine: 101, color: '#3b82f6', label: 'Command Handler', explanation: 'コマンドを受けてWrite Modelを操作しProjectorに通知' },
        { startLine: 103, endLine: 156, color: '#a855f7', label: 'Read Model', explanation: 'クエリに最適化されたビューモデル' },
        { startLine: 158, endLine: 179, color: '#ec4899', label: 'Projector', explanation: 'Write側の変更をRead側のモデルに同期するプロジェクター' },
      ],
      keyPoints: [
        'Command（書き込み）とQuery（読み取り）のモデルを分離する',
        'Write Modelはビジネスルール、Read Modelはクエリに最適化',
        'Projectorが Write→Read の同期を担当する',
        'Read Modelは非正規化して検索パフォーマンスを最適化',
        'Command Handlerは1つのCommandに1つの処理を対応させる',
      ],
    },
    {
      id: 27,
      title: 'Plugin Architecture',
      titleJa: 'プラグインアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'コア機能を変更せずに機能拡張できるプラグインシステムを型安全に設計します。',
      bookReference: '達人プログラマー 第17節',
      code: `// プラグインアーキテクチャ
// コアシステムを変更せずに機能を動的に拡張

// ━━━ Plugin API ━━━
interface PluginContext {
  config: Record<string, unknown>;
  logger: { info(msg: string): void; warn(msg: string): void; error(msg: string): void };
  registerHook<T extends keyof HookMap>(hook: T, handler: HookMap[T]): void;
  registerCommand(name: string, handler: CommandHandler): void;
  getService<T>(name: string): T | undefined;
  registerService<T>(name: string, service: T): void;
}

interface Plugin {
  readonly name: string;
  readonly version: string;
  readonly dependencies?: string[];
  install(ctx: PluginContext): void | Promise<void>;
  uninstall?(): void;
}

// ━━━ Hook System ━━━
interface HookMap {
  'beforeRequest': (req: { url: string; method: string }) => { url: string; method: string };
  'afterResponse': (res: { status: number; body: unknown }) => void;
  'onError': (error: Error) => void;
  'transform': (data: unknown) => unknown;
}

type CommandHandler = (args: Record<string, unknown>) => unknown | Promise<unknown>;

// ━━━ Plugin Manager ━━━
class PluginManager {
  private plugins = new Map<string, Plugin>();
  private hooks = new Map<string, Function[]>();
  private commands = new Map<string, CommandHandler>();
  private services = new Map<string, unknown>();

  private createContext(plugin: Plugin): PluginContext {
    const self = this;
    return {
      config: {},
      logger: {
        info: (msg) => console.log(\`[\${plugin.name}] \${msg}\`),
        warn: (msg) => console.warn(\`[\${plugin.name}] \${msg}\`),
        error: (msg) => console.error(\`[\${plugin.name}] \${msg}\`),
      },
      registerHook(hook, handler) {
        if (!self.hooks.has(hook)) self.hooks.set(hook, []);
        self.hooks.get(hook)!.push(handler);
      },
      registerCommand(name, handler) {
        self.commands.set(\`\${plugin.name}:\${name}\`, handler);
      },
      getService<T>(name: string) { return self.services.get(name) as T | undefined; },
      registerService<T>(name: string, service: T) { self.services.set(name, service); },
    };
  }

  async install(plugin: Plugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(\`Plugin "\${plugin.name}" already installed\`);
    }
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(\`Missing dependency: "\${dep}" required by "\${plugin.name}"\`);
        }
      }
    }
    const ctx = this.createContext(plugin);
    await plugin.install(ctx);
    this.plugins.set(plugin.name, plugin);
    console.log(\`Installed: \${plugin.name} v\${plugin.version}\`);
  }

  async executeHook<T extends keyof HookMap>(
    hook: T,
    ...args: Parameters<HookMap[T]>
  ): Promise<ReturnType<HookMap[T]> | undefined> {
    const handlers = this.hooks.get(hook) || [];
    let result: unknown;
    for (const handler of handlers) {
      result = await handler(...args);
    }
    return result as ReturnType<HookMap[T]> | undefined;
  }

  async executeCommand(name: string, args: Record<string, unknown> = {}): Promise<unknown> {
    const handler = this.commands.get(name);
    if (!handler) throw new Error(\`Unknown command: \${name}\`);
    return handler(args);
  }

  getPluginList(): Array<{ name: string; version: string }> {
    return Array.from(this.plugins.values()).map(p => ({ name: p.name, version: p.version }));
  }
}

// ━━━ プラグイン実装例 ━━━
const loggingPlugin: Plugin = {
  name: 'logging',
  version: '1.0.0',
  install(ctx) {
    ctx.registerHook('beforeRequest', (req) => {
      ctx.logger.info(\`Request: \${req.method} \${req.url}\`);
      return req;
    });
    ctx.registerHook('afterResponse', (res) => {
      ctx.logger.info(\`Response: \${res.status}\`);
    });
    ctx.registerHook('onError', (error) => {
      ctx.logger.error(\`Error: \${error.message}\`);
    });
  },
};

const metricsPlugin: Plugin = {
  name: 'metrics',
  version: '1.0.0',
  dependencies: ['logging'],
  install(ctx) {
    const counters: Record<string, number> = {};
    ctx.registerService('metrics', {
      increment(name: string) { counters[name] = (counters[name] || 0) + 1; },
      get(name: string) { return counters[name] || 0; },
    });
    ctx.registerCommand('getMetrics', () => ({ ...counters }));
    ctx.registerHook('beforeRequest', (req) => {
      counters[\`request.\${req.method}\`] = (counters[\`request.\${req.method}\`] || 0) + 1;
      return req;
    });
  },
};

// ━━━ 使用例 ━━━
async function main() {
  const pm = new PluginManager();
  await pm.install(loggingPlugin);
  await pm.install(metricsPlugin);

  await pm.executeHook('beforeRequest', { url: '/api/users', method: 'GET' });
  await pm.executeHook('afterResponse', { status: 200, body: {} });

  const metrics = await pm.executeCommand('metrics:getMetrics');
  console.log('Metrics:', metrics);
  console.log('Plugins:', pm.getPluginList());
}
main();`,
      highlights: [
        { startLine: 5, endLine: 13, color: '#a855f7', label: 'Plugin Context API', explanation: 'プラグインに提供するAPI（フック・コマンド・サービス登録）' },
        { startLine: 14, endLine: 20, color: '#f59e0b', label: 'Plugin Interface', explanation: '全プラグインが実装するインターフェース' },
        { startLine: 33, endLine: 98, color: '#22c55e', label: 'Plugin Manager', explanation: '依存解決・フック実行・コマンドディスパッチを管理' },
        { startLine: 100, endLine: 134, color: '#3b82f6', label: 'プラグイン実装例', explanation: 'logging/metricsプラグインが独立して機能を追加' },
      ],
      keyPoints: [
        'PluginContextで安全なAPI境界を提供しコア内部を隠蔽',
        'dependenciesでプラグイン間の依存関係を宣言的に管理',
        'Hook Systemで処理パイプラインを拡張可能にする',
        'Service RegistryでプラグインがサービスをDI的に共有できる',
        'Command PatternでプラグインのアクションをNamespaceで管理',
      ],
    },
    {
      id: 28,
      title: 'Pipeline & Data Transform',
      titleJa: 'パイプラインパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '型安全なデータ変換パイプラインで、ETLやデータ処理ワークフローを構築します。',
      bookReference: '達人プログラマー 第30節',
      code: `// パイプラインパターン
// 型安全なデータ変換チェーンでETLワークフローを構築

// ━━━ Pipeline Types ━━━
interface PipelineStep<TIn, TOut> {
  readonly name: string;
  process(input: TIn): Promise<TOut>;
}

class Pipeline<TIn, TOut> {
  private constructor(
    private readonly steps: PipelineStep<unknown, unknown>[],
    private readonly _name: string
  ) {}

  static create<T>(name: string): Pipeline<T, T> {
    return new Pipeline<T, T>([], name);
  }

  pipe<TNext>(step: PipelineStep<TOut, TNext>): Pipeline<TIn, TNext> {
    return new Pipeline<TIn, TNext>(
      [...this.steps, step as PipelineStep<unknown, unknown>],
      this._name
    );
  }

  async execute(input: TIn): Promise<TOut> {
    let result: unknown = input;
    for (const step of this.steps) {
      const start = performance.now();
      try {
        result = await step.process(result);
        console.log(\`  ✓ \${step.name} (\${(performance.now() - start).toFixed(1)}ms)\`);
      } catch (err) {
        console.error(\`  ✗ \${step.name} failed: \${(err as Error).message}\`);
        throw err;
      }
    }
    return result as TOut;
  }
}

// ━━━ ステップ実装例：CSVデータ処理 ━━━

// Raw CSV行
interface RawRecord {
  name: string;
  age: string;
  email: string;
  department: string;
  salary: string;
}

// バリデーション済みレコード
interface ValidRecord {
  name: string;
  age: number;
  email: string;
  department: string;
  salary: number;
}

// エンリッチ済みレコード
interface EnrichedRecord extends ValidRecord {
  ageGroup: 'junior' | 'mid' | 'senior';
  salaryGrade: 'A' | 'B' | 'C';
}

// 集計結果
interface AggregateResult {
  totalEmployees: number;
  avgSalary: number;
  byDepartment: Record<string, { count: number; avgSalary: number }>;
  byAgeGroup: Record<string, number>;
}

// Step 1: バリデーション
const validateStep: PipelineStep<RawRecord[], ValidRecord[]> = {
  name: 'Validate',
  async process(records) {
    const valid: ValidRecord[] = [];
    for (const r of records) {
      const age = parseInt(r.age, 10);
      const salary = parseFloat(r.salary);
      if (isNaN(age) || isNaN(salary)) continue;
      if (!r.email.includes('@')) continue;
      valid.push({ name: r.name, age, email: r.email, department: r.department, salary });
    }
    return valid;
  },
};

// Step 2: エンリッチ
const enrichStep: PipelineStep<ValidRecord[], EnrichedRecord[]> = {
  name: 'Enrich',
  async process(records) {
    return records.map(r => ({
      ...r,
      ageGroup: r.age < 30 ? 'junior' as const : r.age < 45 ? 'mid' as const : 'senior' as const,
      salaryGrade: r.salary >= 800000 ? 'A' as const : r.salary >= 500000 ? 'B' as const : 'C' as const,
    }));
  },
};

// Step 3: フィルタ
const filterActiveStep: PipelineStep<EnrichedRecord[], EnrichedRecord[]> = {
  name: 'FilterActive',
  async process(records) {
    return records.filter(r => r.salary > 0);
  },
};

// Step 4: 集計
const aggregateStep: PipelineStep<EnrichedRecord[], AggregateResult> = {
  name: 'Aggregate',
  async process(records) {
    const byDept: Record<string, { count: number; totalSalary: number }> = {};
    const byAge: Record<string, number> = {};
    for (const r of records) {
      if (!byDept[r.department]) byDept[r.department] = { count: 0, totalSalary: 0 };
      byDept[r.department].count++;
      byDept[r.department].totalSalary += r.salary;
      byAge[r.ageGroup] = (byAge[r.ageGroup] || 0) + 1;
    }
    return {
      totalEmployees: records.length,
      avgSalary: records.reduce((s, r) => s + r.salary, 0) / records.length,
      byDepartment: Object.fromEntries(
        Object.entries(byDept).map(([k, v]) => [k, { count: v.count, avgSalary: v.totalSalary / v.count }])
      ),
      byAgeGroup: byAge,
    };
  },
};

// ━━━ パイプライン構築と実行 ━━━
const etlPipeline = Pipeline.create<RawRecord[]>('EmployeeETL')
  .pipe(validateStep)
  .pipe(enrichStep)
  .pipe(filterActiveStep)
  .pipe(aggregateStep);

// 実行
const sampleData: RawRecord[] = [
  { name: 'Alice', age: '28', email: 'alice@co.jp', department: 'Engineering', salary: '750000' },
  { name: 'Bob', age: '35', email: 'bob@co.jp', department: 'Engineering', salary: '900000' },
  { name: 'Carol', age: '42', email: 'carol@co.jp', department: 'Marketing', salary: '650000' },
  { name: 'Dave', age: '55', email: 'dave@co.jp', department: 'Marketing', salary: '800000' },
  { name: 'Eve', age: '22', email: 'invalid', department: 'HR', salary: 'NaN' },
];

etlPipeline.execute(sampleData).then(result => {
  console.log(JSON.stringify(result, null, 2));
});`,
      highlights: [
        { startLine: 5, endLine: 8, color: '#a855f7', label: 'PipelineStep', explanation: 'TIn→TOutの変換ステップを定義するインターフェース' },
        { startLine: 10, endLine: 41, color: '#22c55e', label: 'Pipeline', explanation: '型安全なpipe()でステップを連鎖。各ステップの入出力型が連結' },
        { startLine: 78, endLine: 134, color: '#3b82f6', label: '変換ステップ群', explanation: 'Validate→Enrich→Filter→Aggregateの各ステップ' },
        { startLine: 137, endLine: 141, color: '#ec4899', label: 'パイプライン構築', explanation: 'メソッドチェーンでETLワークフローを宣言的に構築' },
      ],
      keyPoints: [
        'PipelineStepのTIn/TOutでステップ間の型が自動チェックされる',
        'pipe()の戻り値がPipeline<TIn, TNext>で型が伝搬する',
        '各ステップは独立しており単体テスト可能',
        'execute()で各ステップの実行時間を計測・ログ出力',
        'ETL処理を宣言的に構築しステップの追加・入替が容易',
      ],
    },
    {
      id: 29,
      title: 'Circuit Breaker',
      titleJa: 'サーキットブレーカー',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '外部サービスの障害時にシステムを保護するサーキットブレーカーパターンを実装します。',
      code: `// サーキットブレーカーパターン
// 外部サービス障害時の連鎖障害を防ぐ耐障害性パターン

type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerOptions {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  monitorInterval: number;
}

interface CircuitStats {
  state: CircuitState;
  failures: number;
  successes: number;
  lastFailureTime: Date | null;
  totalRequests: number;
  totalFailures: number;
}

class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures = 0;
  private successes = 0;
  private lastFailureTime: Date | null = null;
  private totalRequests = 0;
  private totalFailures = 0;

  constructor(
    private readonly name: string,
    private readonly options: CircuitBreakerOptions = {
      failureThreshold: 5,
      successThreshold: 3,
      timeout: 30000,
      monitorInterval: 5000,
    }
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.totalRequests++;

    if (this.state === 'open') {
      if (this.shouldAttemptReset()) {
        this.state = 'half-open';
        console.log(\`[CB:\${this.name}] State: half-open (attempting reset)\`);
      } else {
        throw new Error(\`Circuit breaker "\${this.name}" is OPEN\`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === 'half-open') {
      this.successes++;
      if (this.successes >= this.options.successThreshold) {
        this.reset();
        console.log(\`[CB:\${this.name}] State: closed (recovered)\`);
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.totalFailures++;
    this.lastFailureTime = new Date();

    if (this.state === 'half-open') {
      this.trip();
    } else if (this.failures >= this.options.failureThreshold) {
      this.trip();
    }
  }

  private trip(): void {
    this.state = 'open';
    this.successes = 0;
    console.log(\`[CB:\${this.name}] State: OPEN (tripped after \${this.failures} failures)\`);
  }

  private reset(): void {
    this.state = 'closed';
    this.failures = 0;
    this.successes = 0;
  }

  private shouldAttemptReset(): boolean {
    if (!this.lastFailureTime) return true;
    return Date.now() - this.lastFailureTime.getTime() >= this.options.timeout;
  }

  getStats(): CircuitStats {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      lastFailureTime: this.lastFailureTime,
      totalRequests: this.totalRequests,
      totalFailures: this.totalFailures,
    };
  }
}

// ━━━ 使用例：外部API呼び出しを保護 ━━━

class ExternalApiClient {
  private breaker = new CircuitBreaker('external-api', {
    failureThreshold: 3,
    successThreshold: 2,
    timeout: 10000,
    monitorInterval: 5000,
  });

  async fetchData(endpoint: string): Promise<unknown> {
    return this.breaker.execute(async () => {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return response.json();
    });
  }

  async fetchWithFallback(endpoint: string, fallback: unknown): Promise<unknown> {
    try {
      return await this.fetchData(endpoint);
    } catch (err) {
      console.warn(\`Fallback used: \${(err as Error).message}\`);
      return fallback;
    }
  }

  getBreaker() { return this.breaker; }
}

// ━━━ CircuitBreakerRegistry（複数ブレーカー管理）━━━
class CircuitBreakerRegistry {
  private breakers = new Map<string, CircuitBreaker>();

  getOrCreate(name: string, options?: CircuitBreakerOptions): CircuitBreaker {
    if (!this.breakers.has(name)) {
      this.breakers.set(name, new CircuitBreaker(name, options));
    }
    return this.breakers.get(name)!;
  }

  getAllStats(): Record<string, CircuitStats> {
    const stats: Record<string, CircuitStats> = {};
    for (const [name, breaker] of this.breakers) {
      stats[name] = breaker.getStats();
    }
    return stats;
  }
}

// 使用例
const registry = new CircuitBreakerRegistry();
const apiBreaker = registry.getOrCreate('payment-api', { failureThreshold: 3, successThreshold: 2, timeout: 15000, monitorInterval: 5000 });
const dbBreaker = registry.getOrCreate('database', { failureThreshold: 5, successThreshold: 3, timeout: 30000, monitorInterval: 10000 });
console.log(registry.getAllStats());`,
      highlights: [
        { startLine: 4, endLine: 20, color: '#f59e0b', label: '型定義', explanation: '三状態（Closed/Open/Half-Open）と設定/統計の型' },
        { startLine: 22, endLine: 113, color: '#22c55e', label: 'CircuitBreaker本体', explanation: '状態遷移ロジックとfailure/successカウンタ管理' },
        { startLine: 115, endLine: 143, color: '#3b82f6', label: '使用例', explanation: 'fetch呼び出しをCircuit Breakerで保護' },
        { startLine: 145, endLine: 163, color: '#a855f7', label: 'Registry', explanation: '複数のCircuit Breakerを名前で管理する登録簿' },
      ],
      keyPoints: [
        'Closed→Open: 連続失敗がthreshold到達で遮断',
        'Open→Half-Open: timeout経過後に試行的に復帰',
        'Half-Open→Closed: 連続成功でthreshold到達で完全復帰',
        'フォールバック値で障害時にもサービスを継続',
        'Registryで複数サービスのCircuit Breakerを一元管理',
      ],
    },
    {
      id: 30,
      title: 'Abstract Factory with DI',
      titleJa: '抽象ファクトリーとDI',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: '抽象ファクトリーでUIコンポーネント群を差し替え可能に生成し、テーマやプラットフォームの切替を実現します。',
      code: `// 抽象ファクトリーパターン + 依存性注入
// テーマやプラットフォームごとのUI部品ファミリーを差し替え

// ━━━ 製品インターフェース ━━━
interface Button {
  render(): string;
  onClick(handler: () => void): void;
}

interface TextInput {
  render(): string;
  setValue(value: string): void;
  getValue(): string;
}

interface Card {
  render(title: string, content: string): string;
}

interface Modal {
  render(title: string, body: string): string;
  open(): void;
  close(): void;
}

// ━━━ 抽象ファクトリー ━━━
interface UIFactory {
  createButton(label: string): Button;
  createTextInput(placeholder: string): TextInput;
  createCard(): Card;
  createModal(): Modal;
}

// ━━━ Material Design テーマ ━━━
class MaterialButton implements Button {
  constructor(private label: string) {}
  render() { return \`<md-button>\${this.label}</md-button>\`; }
  onClick(handler: () => void) { console.log(\`Material button "\${this.label}" clicked\`); handler(); }
}

class MaterialTextInput implements TextInput {
  private value = '';
  constructor(private placeholder: string) {}
  render() { return \`<md-input placeholder="\${this.placeholder}" value="\${this.value}" />\`; }
  setValue(v: string) { this.value = v; }
  getValue() { return this.value; }
}

class MaterialCard implements Card {
  render(title: string, content: string) {
    return \`<md-card><md-card-title>\${title}</md-card-title><md-card-content>\${content}</md-card-content></md-card>\`;
  }
}

class MaterialModal implements Modal {
  private isOpen = false;
  render(title: string, body: string) { return \`<md-dialog \${this.isOpen ? 'open' : ''}><h2>\${title}</h2><p>\${body}</p></md-dialog>\`; }
  open() { this.isOpen = true; console.log('Material modal opened'); }
  close() { this.isOpen = false; console.log('Material modal closed'); }
}

class MaterialUIFactory implements UIFactory {
  createButton(label: string) { return new MaterialButton(label); }
  createTextInput(placeholder: string) { return new MaterialTextInput(placeholder); }
  createCard() { return new MaterialCard(); }
  createModal() { return new MaterialModal(); }
}

// ━━━ Minimal テーマ ━━━
class MinimalButton implements Button {
  constructor(private label: string) {}
  render() { return \`<button class="min-btn">\${this.label}</button>\`; }
  onClick(handler: () => void) { console.log(\`Minimal button clicked\`); handler(); }
}

class MinimalTextInput implements TextInput {
  private value = '';
  constructor(private placeholder: string) {}
  render() { return \`<input class="min-input" placeholder="\${this.placeholder}" />\`; }
  setValue(v: string) { this.value = v; }
  getValue() { return this.value; }
}

class MinimalCard implements Card {
  render(title: string, content: string) { return \`<div class="min-card"><h3>\${title}</h3><p>\${content}</p></div>\`; }
}

class MinimalModal implements Modal {
  private isOpen = false;
  render(title: string, body: string) { return \`<div class="min-modal \${this.isOpen ? 'open' : ''}"><h2>\${title}</h2><p>\${body}</p></div>\`; }
  open() { this.isOpen = true; }
  close() { this.isOpen = false; }
}

class MinimalUIFactory implements UIFactory {
  createButton(label: string) { return new MinimalButton(label); }
  createTextInput(placeholder: string) { return new MinimalTextInput(placeholder); }
  createCard() { return new MinimalCard(); }
  createModal() { return new MinimalModal(); }
}

// ━━━ ファクトリーレジストリ ━━━
class UIThemeRegistry {
  private factories = new Map<string, UIFactory>();

  register(theme: string, factory: UIFactory): void {
    this.factories.set(theme, factory);
  }

  get(theme: string): UIFactory {
    const factory = this.factories.get(theme);
    if (!factory) throw new Error(\`Unknown theme: \${theme}\`);
    return factory;
  }

  getAvailableThemes(): string[] {
    return Array.from(this.factories.keys());
  }
}

// ━━━ アプリケーション（ファクトリーの具体型を知らない）━━━
class LoginForm {
  constructor(private factory: UIFactory) {}

  render(): string {
    const emailInput = this.factory.createTextInput('Email');
    const passwordInput = this.factory.createTextInput('Password');
    const submitBtn = this.factory.createButton('Login');
    const card = this.factory.createCard();

    return card.render('Login', [
      emailInput.render(),
      passwordInput.render(),
      submitBtn.render(),
    ].join('\\n'));
  }
}

// ━━━ 使用例 ━━━
const registry = new UIThemeRegistry();
registry.register('material', new MaterialUIFactory());
registry.register('minimal', new MinimalUIFactory());

const currentTheme = 'material';
const factory = registry.get(currentTheme);
const loginForm = new LoginForm(factory);
console.log(loginForm.render());

// テーマ切替
const minimalForm = new LoginForm(registry.get('minimal'));
console.log(minimalForm.render());`,
      highlights: [
        { startLine: 4, endLine: 24, color: '#a855f7', label: '製品インターフェース', explanation: 'UIコンポーネントの共通契約を定義' },
        { startLine: 27, endLine: 33, color: '#22c55e', label: '抽象ファクトリー', explanation: 'コンポーネント群の生成メソッドを束ねる' },
        { startLine: 34, endLine: 67, color: '#3b82f6', label: 'Material実装', explanation: 'Material Designテーマのコンポーネントセット' },
        { startLine: 102, endLine: 119, color: '#f59e0b', label: 'テーマレジストリ', explanation: 'テーマ名でファクトリーを登録・取得' },
        { startLine: 121, endLine: 137, color: '#ec4899', label: 'アプリケーション使用', explanation: 'LoginFormはUIFactoryのみに依存し具体テーマを知らない' },
      ],
      keyPoints: [
        '抽象ファクトリーで関連する製品群をセットで生成する',
        'アプリケーションは抽象ファクトリーのみに依存する',
        'テーマレジストリで動的にファクトリーを切替可能',
        '新テーマ追加はUIFactory実装クラスの追加のみで完結',
        '製品間の整合性がファクトリー単位で保証される',
      ],
    },
    {
      id: 31,
      title: 'Mediator Pattern',
      titleJa: 'メディエータパターン',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: 'メディエータを仲介して複数コンポーネント間の複雑な相互依存を解消します。',
      code: `// メディエータパターン
// コンポーネント間の直接通信を仲介者で管理し疎結合化

// ━━━ メディエータインターフェース ━━━
interface Mediator {
  notify(sender: Component, event: string, data?: unknown): void;
}

abstract class Component {
  protected mediator: Mediator | null = null;

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// ━━━ フォームコンポーネント ━━━
class EmailInput extends Component {
  private value = '';
  private isValid = false;

  setValue(email: string): void {
    this.value = email;
    this.isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    this.mediator?.notify(this, 'emailChanged', { email, isValid: this.isValid });
  }

  getValue(): string { return this.value; }
  getIsValid(): boolean { return this.isValid; }
}

class PasswordInput extends Component {
  private value = '';
  private strength: 'weak' | 'medium' | 'strong' = 'weak';

  setValue(password: string): void {
    this.value = password;
    this.strength = password.length >= 12 ? 'strong' : password.length >= 8 ? 'medium' : 'weak';
    this.mediator?.notify(this, 'passwordChanged', { strength: this.strength });
  }

  getValue(): string { return this.value; }
  getStrength() { return this.strength; }
}

class SubmitButton extends Component {
  private enabled = false;

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    console.log(\`[SubmitButton] \${enabled ? 'Enabled' : 'Disabled'}\`);
  }

  click(): void {
    if (!this.enabled) {
      console.log('[SubmitButton] Cannot submit: disabled');
      return;
    }
    this.mediator?.notify(this, 'submit');
  }

  isEnabled(): boolean { return this.enabled; }
}

class StrengthIndicator extends Component {
  private level: 'weak' | 'medium' | 'strong' = 'weak';

  update(strength: 'weak' | 'medium' | 'strong'): void {
    this.level = strength;
    const colors = { weak: '🔴', medium: '🟡', strong: '🟢' };
    console.log(\`[StrengthIndicator] \${colors[strength]} \${strength}\`);
  }
}

class StatusMessage extends Component {
  show(message: string, type: 'info' | 'success' | 'error'): void {
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(\`[Status] \${prefix} \${message}\`);
  }
}

// ━━━ メディエータ実装 ━━━
class FormMediator implements Mediator {
  constructor(
    private emailInput: EmailInput,
    private passwordInput: PasswordInput,
    private submitButton: SubmitButton,
    private strengthIndicator: StrengthIndicator,
    private statusMessage: StatusMessage
  ) {
    emailInput.setMediator(this);
    passwordInput.setMediator(this);
    submitButton.setMediator(this);
    strengthIndicator.setMediator(this);
    statusMessage.setMediator(this);
  }

  notify(sender: Component, event: string, data?: unknown): void {
    if (event === 'emailChanged') {
      this.validateForm();
      const d = data as { email: string; isValid: boolean };
      if (!d.isValid && d.email.length > 0) {
        this.statusMessage.show('メールアドレスの形式が正しくありません', 'error');
      }
    }

    if (event === 'passwordChanged') {
      const d = data as { strength: 'weak' | 'medium' | 'strong' };
      this.strengthIndicator.update(d.strength);
      this.validateForm();
      if (d.strength === 'weak') {
        this.statusMessage.show('パスワードは8文字以上にしてください', 'info');
      }
    }

    if (event === 'submit') {
      this.statusMessage.show('登録処理中...', 'info');
      setTimeout(() => {
        this.statusMessage.show(
          \`登録完了: \${this.emailInput.getValue()}\`,
          'success'
        );
      }, 1000);
    }
  }

  private validateForm(): void {
    const isValid =
      this.emailInput.getIsValid() &&
      this.passwordInput.getStrength() !== 'weak';
    this.submitButton.setEnabled(isValid);
  }
}

// ━━━ 使用例 ━━━
const email = new EmailInput();
const password = new PasswordInput();
const submit = new SubmitButton();
const strength = new StrengthIndicator();
const status = new StatusMessage();

const mediator = new FormMediator(email, password, submit, strength, status);

email.setValue('alice@example.com');
password.setValue('MyStr0ngP@ss!');
submit.click();`,
      highlights: [
        { startLine: 5, endLine: 15, color: '#a855f7', label: 'Mediator + Component基底', explanation: 'メディエータを通じて通信する基底クラス' },
        { startLine: 18, endLine: 80, color: '#3b82f6', label: 'フォームコンポーネント群', explanation: '各コンポーネントはmediator.notifyで変更を通知' },
        { startLine: 82, endLine: 133, color: '#22c55e', label: 'FormMediator', explanation: 'コンポーネント間の相互作用ルールを一元管理' },
        { startLine: 135, endLine: 146, color: '#ec4899', label: '使用例', explanation: 'コンポーネントは互いを知らずメディエータ経由で連携' },
      ],
      keyPoints: [
        'コンポーネントは他のコンポーネントを直接参照しない',
        'mediator.notify()で変更を通知し、Mediatorが連携ロジックを管理',
        'フォーム全体のバリデーションロジックをMediator に集約',
        '新しいコンポーネント追加時もMediatorの修正のみで済む',
        '複雑な相互依存をMediatorに集約しコンポーネントを再利用可能に',
      ],
    },
    {
      id: 32,
      title: 'Hexagonal Architecture',
      titleJa: 'ヘキサゴナルアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'Ports & Adaptersアーキテクチャでアプリケーションコアを外部詳細から完全に分離します。',
      bookReference: 'Clean Architecture 第17章',
      code: `// ヘキサゴナルアーキテクチャ（Ports & Adapters）
// アプリケーションコアを外部の詳細から完全に分離する

// ━━━━━ DOMAIN CORE（六角形の内側）━━━━━

// Value Objects
class ProductId {
  constructor(readonly value: string) {
    if (!value.match(/^prod_[a-zA-Z0-9]{8}$/)) throw new Error('Invalid ProductId');
  }
  equals(other: ProductId): boolean { return this.value === other.value; }
}

class Price {
  constructor(readonly amount: number, readonly currency: string = 'JPY') {
    if (amount < 0) throw new Error('Price cannot be negative');
  }
  applyDiscount(percent: number): Price {
    return new Price(Math.round(this.amount * (1 - percent / 100)), this.currency);
  }
  add(other: Price): Price {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Price(this.amount + other.amount, this.currency);
  }
}

class Quantity {
  constructor(readonly value: number) {
    if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid quantity');
  }
  subtract(n: number): Quantity {
    if (this.value - n < 0) throw new Error('Insufficient quantity');
    return new Quantity(this.value - n);
  }
}

// Entity
class Product {
  constructor(
    readonly id: ProductId,
    private _name: string,
    private _price: Price,
    private _stock: Quantity
  ) {}

  get name() { return this._name; }
  get price() { return this._price; }
  get stock() { return this._stock; }
  get isAvailable(): boolean { return this._stock.value > 0; }

  reduceStock(qty: number): void {
    this._stock = this._stock.subtract(qty);
  }

  updatePrice(newPrice: Price): void {
    this._price = newPrice;
  }
}

// ━━━ PORTS（六角形の辺：入出力の契約）━━━

// Driving Port（アプリケーションが提供するAPI）
interface ProductCatalogPort {
  addProduct(name: string, price: number, stock: number): Promise<ProductId>;
  getProduct(id: string): Promise<Product | null>;
  searchProducts(query: string): Promise<Product[]>;
  purchaseProduct(id: string, quantity: number): Promise<void>;
}

// Driven Port（アプリケーションが要求する外部機能）
interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findByName(query: string): Promise<Product[]>;
}

interface PaymentPort {
  processPayment(amount: Price, reference: string): Promise<{ transactionId: string }>;
}

interface NotificationPort {
  notifyLowStock(product: Product): Promise<void>;
  notifyPurchase(productName: string, quantity: number): Promise<void>;
}

// ━━━ APPLICATION SERVICE（六角形のコア）━━━

class ProductCatalogService implements ProductCatalogPort {
  constructor(
    private repo: ProductRepository,
    private payment: PaymentPort,
    private notification: NotificationPort
  ) {}

  async addProduct(name: string, price: number, stock: number): Promise<ProductId> {
    const id = new ProductId(\`prod_\${Math.random().toString(36).slice(2, 10)}\`);
    const product = new Product(id, name, new Price(price), new Quantity(stock));
    await this.repo.save(product);
    return id;
  }

  async getProduct(id: string): Promise<Product | null> {
    return this.repo.findById(new ProductId(id));
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.repo.findByName(query);
  }

  async purchaseProduct(id: string, quantity: number): Promise<void> {
    const product = await this.repo.findById(new ProductId(id));
    if (!product) throw new Error('Product not found');
    if (!product.isAvailable) throw new Error('Product out of stock');

    const totalPrice = new Price(product.price.amount * quantity, product.price.currency);
    await this.payment.processPayment(totalPrice, \`order_\${id}_\${Date.now()}\`);

    product.reduceStock(quantity);
    await this.repo.save(product);

    if (product.stock.value < 5) {
      await this.notification.notifyLowStock(product);
    }
    await this.notification.notifyPurchase(product.name, quantity);
  }
}

// ━━━━━ ADAPTERS（六角形の外側）━━━━━

// Driven Adapter: InMemory Repository
class InMemoryProductRepo implements ProductRepository {
  private store = new Map<string, Product>();

  async save(product: Product) { this.store.set(product.id.value, product); }
  async findById(id: ProductId) { return this.store.get(id.value) ?? null; }
  async findByName(query: string) {
    return Array.from(this.store.values())
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
}

// Driven Adapter: Mock Payment
class MockPaymentAdapter implements PaymentPort {
  async processPayment(amount: Price, reference: string) {
    console.log(\`[Payment] Charged \${amount.currency} \${amount.amount} (ref: \${reference})\`);
    return { transactionId: \`txn_\${Date.now()}\` };
  }
}

// Driven Adapter: Console Notification
class ConsoleNotificationAdapter implements NotificationPort {
  async notifyLowStock(product: Product) {
    console.log(\`[Alert] Low stock: \${product.name} (remaining: \${product.stock.value})\`);
  }
  async notifyPurchase(productName: string, quantity: number) {
    console.log(\`[Notification] Purchased: \${productName} x \${quantity}\`);
  }
}

// ━━━ Driving Adapter: REST API Controller ━━━
class ProductApiController {
  constructor(private service: ProductCatalogPort) {}

  async handleGetProduct(req: { params: { id: string } }) {
    const product = await this.service.getProduct(req.params.id);
    if (!product) return { status: 404, body: { error: 'Not found' } };
    return { status: 200, body: { id: product.id.value, name: product.name, price: product.price.amount, stock: product.stock.value } };
  }

  async handlePurchase(req: { params: { id: string }; body: { quantity: number } }) {
    try {
      await this.service.purchaseProduct(req.params.id, req.body.quantity);
      return { status: 200, body: { message: 'Purchase successful' } };
    } catch (err) {
      return { status: 400, body: { error: (err as Error).message } };
    }
  }
}

// ━━━ Composition Root（全体の組立）━━━
const repo = new InMemoryProductRepo();
const payment = new MockPaymentAdapter();
const notification = new ConsoleNotificationAdapter();
const catalogService = new ProductCatalogService(repo, payment, notification);
const apiController = new ProductApiController(catalogService);

// 使用例
async function demo() {
  const id = await catalogService.addProduct('TypeScript入門', 3000, 10);
  await catalogService.purchaseProduct(id.value, 2);
  const result = await apiController.handleGetProduct({ params: { id: id.value } });
  console.log(result);
}
demo();`,
      highlights: [
        { startLine: 7, endLine: 58, color: '#f59e0b', label: 'Domain Core', explanation: 'Value Object + Entity。外部依存ゼロ' },
        { startLine: 60, endLine: 84, color: '#a855f7', label: 'Ports（契約）', explanation: 'Driving Port（提供API）とDriven Port（要求API）' },
        { startLine: 86, endLine: 126, color: '#22c55e', label: 'Application Service', explanation: 'ポートを通じて外部と連携するビジネスフロー' },
        { startLine: 128, endLine: 158, color: '#3b82f6', label: 'Driven Adapters', explanation: '外部システムのアダプター実装（交換可能）' },
        { startLine: 160, endLine: 178, color: '#ec4899', label: 'Driving Adapter', explanation: 'REST APIコントローラという入力アダプター' },
      ],
      keyPoints: [
        'ドメインコアは外部依存ゼロ（Pure Domain）',
        'Driving Port:外部→コアへの入力契約、Driven Port:コア→外部への出力契約',
        'アダプターは交換可能（テスト用Mock、本番用実装）',
        'Composition Rootで依存関係を一箇所で組み立てる',
        'テスト時はDriven Adapterだけ差し替えてコアを単体テスト可能',
      ],
    },
    {
      id: 33,
      title: 'Specification Pattern',
      titleJa: 'スペシフィケーションパターン',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: 'ビジネスルールを合成可能な仕様オブジェクトとしてカプセル化し、複雑な条件を宣言的に構築します。',
      bookReference: 'エリック・エヴァンスのDDD 第9章',
      code: `// スペシフィケーションパターン
// ビジネスルールを合成可能な仕様オブジェクトとして表現

// ━━━ Specification 基底 ━━━
abstract class Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }

  filter(items: T[]): T[] {
    return items.filter(item => this.isSatisfiedBy(item));
  }
}

class AndSpecification<T> extends Specification<T> {
  constructor(private left: Specification<T>, private right: Specification<T>) { super(); }
  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends Specification<T> {
  constructor(private left: Specification<T>, private right: Specification<T>) { super(); }
  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends Specification<T> {
  constructor(private spec: Specification<T>) { super(); }
  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

// ━━━ ドメインモデル ━━━
interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  yearsOfExperience: number;
  skills: string[];
  isRemote: boolean;
  performanceScore: number; // 1-5
}

// ━━━ 具体的な仕様 ━━━
class DepartmentSpec extends Specification<Employee> {
  constructor(private department: string) { super(); }
  isSatisfiedBy(e: Employee): boolean { return e.department === this.department; }
}

class SalaryRangeSpec extends Specification<Employee> {
  constructor(private min: number, private max: number) { super(); }
  isSatisfiedBy(e: Employee): boolean { return e.salary >= this.min && e.salary <= this.max; }
}

class ExperienceSpec extends Specification<Employee> {
  constructor(private minYears: number) { super(); }
  isSatisfiedBy(e: Employee): boolean { return e.yearsOfExperience >= this.minYears; }
}

class SkillSpec extends Specification<Employee> {
  constructor(private skill: string) { super(); }
  isSatisfiedBy(e: Employee): boolean { return e.skills.includes(this.skill); }
}

class RemoteSpec extends Specification<Employee> {
  isSatisfiedBy(e: Employee): boolean { return e.isRemote; }
}

class HighPerformerSpec extends Specification<Employee> {
  constructor(private minScore: number = 4) { super(); }
  isSatisfiedBy(e: Employee): boolean { return e.performanceScore >= this.minScore; }
}

// ━━━ ビジネスルールの合成 ━━━

// シニアエンジニア: Engineering部門 + 経験5年以上 + TypeScriptスキル
const seniorEngineer = new DepartmentSpec('Engineering')
  .and(new ExperienceSpec(5))
  .and(new SkillSpec('TypeScript'));

// 昇給候補: 高パフォーマー + 給与が一定範囲内
const promotionCandidate = new HighPerformerSpec(4)
  .and(new SalaryRangeSpec(500000, 800000));

// リモートワーク可能なエンジニア
const remoteEngineer = new DepartmentSpec('Engineering')
  .and(new RemoteSpec());

// 高給取りではないが高パフォーマー（昇給すべき人）
const underPaidHighPerformer = new HighPerformerSpec(4)
  .and(new SalaryRangeSpec(0, 600000));

// ━━━ 使用例 ━━━
const employees: Employee[] = [
  { id: '1', name: 'Alice', department: 'Engineering', salary: 750000, yearsOfExperience: 7,
    skills: ['TypeScript', 'React', 'Node.js'], isRemote: true, performanceScore: 5 },
  { id: '2', name: 'Bob', department: 'Engineering', salary: 550000, yearsOfExperience: 3,
    skills: ['JavaScript', 'React'], isRemote: false, performanceScore: 4 },
  { id: '3', name: 'Carol', department: 'Marketing', salary: 600000, yearsOfExperience: 8,
    skills: ['Analytics', 'SEO'], isRemote: true, performanceScore: 3 },
  { id: '4', name: 'Dave', department: 'Engineering', salary: 900000, yearsOfExperience: 10,
    skills: ['TypeScript', 'Python', 'AWS'], isRemote: true, performanceScore: 5 },
  { id: '5', name: 'Eve', department: 'Engineering', salary: 480000, yearsOfExperience: 2,
    skills: ['TypeScript', 'Next.js'], isRemote: false, performanceScore: 4 },
];

console.log('Senior Engineers:', seniorEngineer.filter(employees).map(e => e.name));
console.log('Promotion Candidates:', promotionCandidate.filter(employees).map(e => e.name));
console.log('Remote Engineers:', remoteEngineer.filter(employees).map(e => e.name));
console.log('Underpaid High Performers:', underPaidHighPerformer.filter(employees).map(e => e.name));

// 動的な条件合成
function buildSearchSpec(criteria: {
  department?: string;
  minExperience?: number;
  skill?: string;
  remote?: boolean;
}): Specification<Employee> {
  let spec: Specification<Employee> = {
    isSatisfiedBy: () => true, and: Specification.prototype.and,
    or: Specification.prototype.or, not: Specification.prototype.not,
    filter: Specification.prototype.filter,
  } as Specification<Employee>;

  if (criteria.department) spec = spec.and(new DepartmentSpec(criteria.department));
  if (criteria.minExperience) spec = spec.and(new ExperienceSpec(criteria.minExperience));
  if (criteria.skill) spec = spec.and(new SkillSpec(criteria.skill));
  if (criteria.remote) spec = spec.and(new RemoteSpec());

  return spec;
}

const dynamic = buildSearchSpec({ department: 'Engineering', skill: 'TypeScript', remote: true });
console.log('Dynamic search:', dynamic.filter(employees).map(e => e.name));`,
      highlights: [
        { startLine: 5, endLine: 24, color: '#a855f7', label: 'Specification基底', explanation: 'and/or/notで合成可能な仕様の抽象クラス' },
        { startLine: 25, endLine: 44, color: '#3b82f6', label: '合成仕様クラス', explanation: 'And/Or/Notで複合条件を構築' },
        { startLine: 58, endLine: 86, color: '#22c55e', label: '具体的仕様', explanation: '部門、給与、経験等の個別ビジネスルール' },
        { startLine: 88, endLine: 105, color: '#f59e0b', label: 'ビジネスルール合成', explanation: 'and/orの連鎖で複雑な条件を宣言的に構築' },
        { startLine: 125, endLine: 148, color: '#ec4899', label: '動的検索', explanation: '実行時に条件を組み立てる動的Specification' },
      ],
      keyPoints: [
        'ビジネスルールをオブジェクトとして分離・再利用可能にする',
        'and/or/notで仕様を合成し複雑な条件を宣言的に表現',
        'filter()でコレクションから条件合致要素を抽出',
        '動的な検索条件の構築にも応用できる',
        'ドメインエキスパートが理解しやすい仕様の命名が重要',
      ],
    },
  ],
};

export default course;
