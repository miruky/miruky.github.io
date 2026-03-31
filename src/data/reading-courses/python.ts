import type { ReadingCourse } from './types';

const course: ReadingCourse = {
  id: 'python',
  lessons: [
    // ─── Beginner 1-12 ───
    {
      id: 1,
      title: 'Clean Naming',
      titleJa: 'クリーンな命名',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '変数名・関数名を意図が明確になるよう命名する技術。読み手が一瞬で意味を把握できるコードを目指します。',
      bookReference: 'リーダブルコード 第2章',
      code: `# ─── Bad: 何を表すか不明 ───
# d = 7
# def calc(a, b):
#     return a * b / d

# ─── Good: 意図が明確 ───
DAYS_IN_WEEK = 7

def calculate_daily_average(total_amount: float, num_weeks: int) -> float:
    """週次合計から日次平均を算出する"""
    total_days = num_weeks * DAYS_IN_WEEK
    return total_amount / total_days

def format_user_greeting(first_name: str, last_name: str) -> str:
    """フルネームで挨拶文を生成する"""
    full_name = f"{last_name} {first_name}"
    return f"こんにちは、{full_name}さん"

def is_eligible_for_discount(age: int, is_member: bool) -> bool:
    """割引適用条件を判定する"""
    SENIOR_AGE_THRESHOLD = 65
    return age >= SENIOR_AGE_THRESHOLD or is_member

# ─── 使用例 ───
weekly_sales = 140000.0
avg = calculate_daily_average(weekly_sales, num_weeks=4)
print(f"日次平均売上: ¥{avg:,.0f}")

greeting = format_user_greeting("太郎", "田中")
print(greeting)`,
      highlights: [
        { startLine: 5, endLine: 5, color: '#22c55e', label: '定数定義', explanation: 'マジックナンバーを意味ある名前の定数に置き換えている' },
        { startLine: 7, endLine: 10, color: '#3b82f6', label: '説明的関数名', explanation: '関数名だけで何をするか分かる。引数名も明確' },
        { startLine: 12, endLine: 15, color: '#3b82f6', label: '意図が明確な命名', explanation: 'full_name という中間変数で読みやすさ向上' },
        { startLine: 17, endLine: 20, color: '#f59e0b', label: 'ブール関数', explanation: 'is_ プレフィックスで真偽値を返すことが明確' },
      ],
      keyPoints: [
        '変数名は「何を表すか」を伝える名前にする',
        '関数名は「何をするか」を動詞で始める',
        'ブール値は is_/has_/can_ プレフィックスを使う',
        'マジックナンバーは名前付き定数に置き換える',
      ],
    },
    {
      id: 2,
      title: 'Single Responsibility Functions',
      titleJa: '単一責任の関数',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '1つの関数は1つのことだけを行う。関数を小さく保つことで、テスト・再利用・理解が容易になります。',
      bookReference: 'Clean Code 第3章',
      code: `from dataclasses import dataclass
from typing import Optional

@dataclass
class Product:
    name: str
    price: float
    quantity: int

def calculate_subtotal(products: list[Product]) -> float:
    """小計を計算する（税抜き）"""
    return sum(p.price * p.quantity for p in products)

def calculate_tax(subtotal: float, tax_rate: float = 0.10) -> float:
    """消費税額を計算する"""
    return subtotal * tax_rate

def calculate_total(subtotal: float, tax: float) -> float:
    """税込み合計を計算する"""
    return subtotal + tax

def format_receipt_line(product: Product) -> str:
    """1商品分のレシート行を生成する"""
    total = product.price * product.quantity
    return f"  {product.name:<20} {product.quantity:>3} x ¥{product.price:>8,.0f} = ¥{total:>10,.0f}"

def print_receipt(products: list[Product]) -> None:
    """レシート全体を出力する"""
    print("=" * 55)
    print("  レシート")
    print("-" * 55)
    for product in products:
        print(format_receipt_line(product))
    subtotal = calculate_subtotal(products)
    tax = calculate_tax(subtotal)
    total = calculate_total(subtotal, tax)
    print("-" * 55)
    print(f"  小計:{'':>30} ¥{subtotal:>10,.0f}")
    print(f"  消費税:{'':>28} ¥{tax:>10,.0f}")
    print(f"  合計:{'':>30} ¥{total:>10,.0f}")
    print("=" * 55)

# ─── 使用例 ───
items = [
    Product("コーヒー豆 200g", 1200, 2),
    Product("フィルター", 350, 1),
    Product("マグカップ", 980, 3),
]
print_receipt(items)`,
      highlights: [
        { startLine: 4, endLine: 8, color: '#f59e0b', label: 'データモデル', explanation: 'dataclass で商品データを構造化' },
        { startLine: 10, endLine: 12, color: '#22c55e', label: '単一責任', explanation: '小計計算だけを行う関数。テストも容易' },
        { startLine: 14, endLine: 15, color: '#22c55e', label: '単一責任', explanation: '税計算のみ。税率変更にも対応しやすい' },
        { startLine: 23, endLine: 26, color: '#3b82f6', label: 'フォーマット専用', explanation: '表示ロジックだけを担当する関数' },
        { startLine: 28, endLine: 43, color: '#ec4899', label: 'オーケストレーション', explanation: '小さな関数を組み合わせて全体処理を構成' },
      ],
      keyPoints: [
        '1関数1責任：計算・整形・出力を分離する',
        '小さな関数は個別にテストできる',
        '上位関数は下位関数を「組み合わせる」だけにする',
        'デフォルト引数で柔軟性を持たせる',
      ],
    },
    {
      id: 3,
      title: 'Guard Clauses',
      titleJa: 'ガード節パターン',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '早期リターンで異常系を先に処理し、正常系のネストを浅く保つ技術。',
      bookReference: 'リーダブルコード 第7章',
      code: `from enum import Enum

class UserRole(Enum):
    GUEST = "guest"
    MEMBER = "member"
    ADMIN = "admin"

class InsufficientFundsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

def process_withdrawal(
    user_role: UserRole,
    balance: float,
    amount: float,
    daily_limit: float = 500000.0,
) -> float:
    """出金処理 — ガード節で異常系を先に排除"""

    # Guard 1: 権限チェック
    if user_role == UserRole.GUEST:
        raise UnauthorizedError("ゲストユーザーは出金できません")

    # Guard 2: 金額バリデーション
    if amount <= 0:
        raise ValueError("出金額は正の数を指定してください")

    # Guard 3: 限度額チェック
    if amount > daily_limit:
        raise ValueError(f"1日の出金上限（¥{daily_limit:,.0f}）を超えています")

    # Guard 4: 残高チェック
    if amount > balance:
        raise InsufficientFundsError(
            f"残高不足: 残高 ¥{balance:,.0f} / 出金額 ¥{amount:,.0f}"
        )

    # ─── 正常系（ネストなし）───
    new_balance = balance - amount
    print(f"出金完了: ¥{amount:,.0f} → 残高: ¥{new_balance:,.0f}")
    return new_balance

# ─── 使用例 ───
try:
    balance = process_withdrawal(UserRole.MEMBER, 1000000, 200000)
    print(f"最終残高: ¥{balance:,.0f}")
except (UnauthorizedError, InsufficientFundsError, ValueError) as e:
    print(f"エラー: {e}")`,
      highlights: [
        { startLine: 23, endLine: 25, color: '#ef4444', label: 'Guard 1', explanation: '権限不足を最初に弾く。以降は認証済みユーザーのみ' },
        { startLine: 28, endLine: 29, color: '#ef4444', label: 'Guard 2', explanation: '不正値を早期に排除' },
        { startLine: 32, endLine: 33, color: '#ef4444', label: 'Guard 3', explanation: 'ビジネスルールの検証' },
        { startLine: 36, endLine: 39, color: '#ef4444', label: 'Guard 4', explanation: '残高検証。具体的なエラーメッセージ付き' },
        { startLine: 42, endLine: 44, color: '#22c55e', label: '正常系', explanation: '全ガードを通過した後のクリーンな処理。ネストゼロ' },
      ],
      keyPoints: [
        'ガード節で異常系を先に処理し、早期リターンする',
        '正常系コードのネストを浅く保てる',
        '各ガードに具体的なエラーメッセージを付与する',
        'カスタム例外クラスで意図を明確にする',
      ],
    },
    {
      id: 4,
      title: 'Constants Over Magic Numbers',
      titleJa: '定数 vs マジックナンバー',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'コード中の生の数値や文字列を名前付き定数に置き換え、意味と変更容易性を確保します。',
      bookReference: 'Clean Code 第17章',
      code: `from dataclasses import dataclass
from enum import IntEnum

# ─── 定数を一箇所に集約 ───
class HttpStatus(IntEnum):
    OK = 200
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    NOT_FOUND = 404
    SERVER_ERROR = 500

class PasswordPolicy:
    MIN_LENGTH = 8
    MAX_LENGTH = 128
    MIN_UPPERCASE = 1
    MIN_DIGITS = 2
    SPECIAL_CHARS = "!@#$%^&*()-_=+"

class BusinessRules:
    MAX_RETRY_COUNT = 3
    SESSION_TIMEOUT_SECONDS = 1800  # 30分
    MAX_ITEMS_PER_PAGE = 50
    FREE_SHIPPING_THRESHOLD = 5000

def validate_password(password: str) -> list[str]:
    """パスワードポリシーに基づくバリデーション"""
    errors: list[str] = []

    if len(password) < PasswordPolicy.MIN_LENGTH:
        errors.append(f"パスワードは{PasswordPolicy.MIN_LENGTH}文字以上必要です")

    if len(password) > PasswordPolicy.MAX_LENGTH:
        errors.append(f"パスワードは{PasswordPolicy.MAX_LENGTH}文字以下にしてください")

    uppercase_count = sum(1 for c in password if c.isupper())
    if uppercase_count < PasswordPolicy.MIN_UPPERCASE:
        errors.append(f"大文字を{PasswordPolicy.MIN_UPPERCASE}文字以上含めてください")

    digit_count = sum(1 for c in password if c.isdigit())
    if digit_count < PasswordPolicy.MIN_DIGITS:
        errors.append(f"数字を{PasswordPolicy.MIN_DIGITS}文字以上含めてください")

    return errors

def calculate_shipping(subtotal: float) -> float:
    """送料を計算する"""
    if subtotal >= BusinessRules.FREE_SHIPPING_THRESHOLD:
        return 0.0
    return 500.0

# ─── 使用例 ───
errors = validate_password("abc")
for e in errors:
    print(f"  ✗ {e}")`,
      highlights: [
        { startLine: 5, endLine: 10, color: '#a855f7', label: 'IntEnum定数', explanation: 'HTTPステータスコードを列挙型で管理' },
        { startLine: 12, endLine: 17, color: '#f59e0b', label: 'ポリシー定数', explanation: 'パスワード要件を一箇所に集約。変更時の影響範囲が明確' },
        { startLine: 19, endLine: 23, color: '#f59e0b', label: 'ビジネスルール', explanation: '業務ロジックの閾値を定数化' },
        { startLine: 25, endLine: 43, color: '#22c55e', label: '定数を参照', explanation: 'マジックナンバーなし。定数名で意図が自明' },
      ],
      keyPoints: [
        'マジックナンバーを名前付き定数に必ず置き換える',
        '関連する定数はクラスにグループ化する',
        'IntEnum で列挙型定数を定義するとタイプセーフ',
        '定数を一箇所に集約すれば変更が容易',
      ],
    },
    {
      id: 5,
      title: 'List Comprehensions',
      titleJa: 'リスト内包表記',
      difficulty: 'beginner',
      category: 'Pythonic Code',
      description: 'Pythonic なコレクション処理。内包表記でループを簡潔かつ高速に記述します。',
      code: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    score: int
    grade: str

students = [
    Student("田中", 85, "A"),
    Student("鈴木", 62, "C"),
    Student("佐藤", 91, "A"),
    Student("高橋", 45, "D"),
    Student("伊藤", 78, "B"),
]

# ─── 基本的なフィルタリング ───
passing_students = [s for s in students if s.score >= 60]

# ─── 変換（マッピング）───
names_and_scores = [(s.name, s.score) for s in students]

# ─── 条件付き変換 ───
results = [
    f"{s.name}: 合格 ✓" if s.score >= 60 else f"{s.name}: 不合格 ✗"
    for s in students
]

# ─── ネストした内包表記 ───
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [val for row in matrix for val in row]

# ─── 辞書内包表記 ───
score_map = {s.name: s.score for s in students}

# ─── 集合内包表記 ───
unique_grades = {s.grade for s in students}

# ─── ジェネレータ式（メモリ効率） ───
total_score = sum(s.score for s in students)
average = total_score / len(students)

print(f"合格者: {[s.name for s in passing_students]}")
print(f"平均点: {average:.1f}")
print(f"成績分布: {unique_grades}")`,
      highlights: [
        { startLine: 18, endLine: 18, color: '#22c55e', label: 'フィルタリング', explanation: '条件に合う要素だけ抽出。for+if+appendより簡潔' },
        { startLine: 21, endLine: 21, color: '#3b82f6', label: 'マッピング', explanation: '各要素を変換して新しいリストを作成' },
        { startLine: 24, endLine: 27, color: '#f59e0b', label: '条件式付き', explanation: '三項演算子と組み合わせた条件付き変換' },
        { startLine: 33, endLine: 33, color: '#a855f7', label: '辞書内包表記', explanation: 'dict comprehension でマップを一発生成' },
        { startLine: 39, endLine: 40, color: '#ec4899', label: 'ジェネレータ式', explanation: 'リストを作らずイテレーションするのでメモリ効率が良い' },
      ],
      keyPoints: [
        'リスト内包表記は for+append パターンより簡潔で高速',
        'フィルタリング・変換・条件分岐を1行で表現できる',
        '辞書・集合の内包表記も活用する',
        'sum/max/min にはジェネレータ式を使いメモリ節約',
      ],
    },
    {
      id: 6,
      title: 'Proper Exception Handling',
      titleJa: '適切な例外処理',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '具体的な例外を捕捉し、コンテキスト付きのエラーメッセージで問題解決を助けるコードを書く。',
      bookReference: 'Clean Code 第7章',
      code: `import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class ConfigError(Exception):
    """設定ファイル関連のエラー"""
    def __init__(self, message: str, filepath: str):
        self.filepath = filepath
        super().__init__(f"{message} (file: {filepath})")

class ValidationError(Exception):
    """バリデーションエラー"""
    def __init__(self, field: str, message: str):
        self.field = field
        super().__init__(f"{field}: {message}")

def load_config(filepath: str) -> dict:
    """設定ファイルを安全に読み込む"""
    path = Path(filepath)

    if not path.exists():
        raise ConfigError("設定ファイルが見つかりません", filepath)

    try:
        text = path.read_text(encoding="utf-8")
    except PermissionError:
        raise ConfigError("ファイルの読み取り権限がありません", filepath)

    try:
        config = json.loads(text)
    except json.JSONDecodeError as e:
        raise ConfigError(f"JSONパースエラー: {e.msg} (行{e.lineno})", filepath)

    if not isinstance(config, dict):
        raise ConfigError("設定はJSON Objectである必要があります", filepath)

    return config

def get_required_field(config: dict, field: str) -> str:
    """必須フィールドを取得する"""
    value = config.get(field)
    if value is None:
        raise ValidationError(field, "必須項目が未設定です")
    if not isinstance(value, str) or not value.strip():
        raise ValidationError(field, "空文字は許可されません")
    return value.strip()

# ─── 使用例 ───
try:
    config = load_config("settings.json")
    db_host = get_required_field(config, "database_host")
    print(f"DB接続先: {db_host}")
except ConfigError as e:
    logger.error(f"設定エラー: {e}")
except ValidationError as e:
    logger.error(f"バリデーション: {e}")`,
      highlights: [
        { startLine: 7, endLine: 11, color: '#a855f7', label: 'カスタム例外', explanation: 'コンテキスト（filepath）を持つドメイン固有例外' },
        { startLine: 13, endLine: 17, color: '#a855f7', label: 'カスタム例外', explanation: 'フィールド名付きバリデーションエラー' },
        { startLine: 23, endLine: 24, color: '#ef4444', label: '事前チェック', explanation: 'ファイル存在確認を例外発生前に行う' },
        { startLine: 31, endLine: 34, color: '#ef4444', label: '具体的な捕捉', explanation: 'JSONDecodeError を捕捉し行番号付きで再送出' },
        { startLine: 52, endLine: 57, color: '#ec4899', label: '呼び出し側', explanation: '例外の種類ごとに適切にハンドリング' },
      ],
      keyPoints: [
        'Exception ではなく具体的な例外を捕捉する',
        'カスタム例外にコンテキスト情報を持たせる',
        'except 節で元の例外情報を保持（from e）',
        '回復不能なエラーはログに記録して上位に伝播',
      ],
    },
    {
      id: 7,
      title: 'Context Managers',
      titleJa: 'コンテキストマネージャ',
      difficulty: 'beginner',
      category: 'Pythonic Code',
      description: 'with文によるリソースの安全な管理。ファイル・DB接続・ロックなどの確実なクリーンアップを保証します。',
      code: `import time
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    """処理時間を計測するコンテキストマネージャ"""
    start = time.perf_counter()
    print(f"⏱ [{label}] 開始...")
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"⏱ [{label}] 完了: {elapsed:.3f}秒")

@contextmanager
def temporary_file(filepath: str, content: str):
    """一時ファイルを作成し、ブロック終了後に削除する"""
    from pathlib import Path
    path = Path(filepath)
    try:
        path.write_text(content, encoding="utf-8")
        print(f"  📝 作成: {filepath}")
        yield path
    finally:
        if path.exists():
            path.unlink()
            print(f"  🗑 削除: {filepath}")

class DatabaseConnection:
    """DB接続のコンテキストマネージャ（クラスベース）"""
    def __init__(self, host: str, db_name: str):
        self.host = host
        self.db_name = db_name
        self.connected = False

    def __enter__(self):
        print(f"  🔌 DB接続: {self.host}/{self.db_name}")
        self.connected = True
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connected:
            print(f"  🔌 DB切断: {self.host}/{self.db_name}")
            self.connected = False
        return False  # 例外を再送出

    def query(self, sql: str) -> list:
        if not self.connected:
            raise RuntimeError("DB未接続")
        print(f"  📊 実行: {sql}")
        return [{"id": 1, "name": "sample"}]

# ─── 使用例 ───
with timer("データ処理"):
    with DatabaseConnection("localhost", "mydb") as db:
        results = db.query("SELECT * FROM users")
        print(f"  結果: {len(results)}件")`,
      highlights: [
        { startLine: 4, endLine: 13, color: '#22c55e', label: '@contextmanager', explanation: 'デコレータベースのCM。yield前が__enter__、finally内が__exit__に相当' },
        { startLine: 15, endLine: 27, color: '#3b82f6', label: 'リソース管理', explanation: 'ファイルを作成し、例外が起きても確実に削除する' },
        { startLine: 29, endLine: 49, color: '#a855f7', label: 'クラスベースCM', explanation: '__enter__と__exit__を実装する正統的な方法' },
        { startLine: 55, endLine: 58, color: '#ec4899', label: 'ネストした利用', explanation: 'with文をネストして複数リソースを安全に管理' },
      ],
      keyPoints: [
        'with文でリソースの確実な解放を保証する',
        '@contextmanager で簡単にCMを作成できる',
        'クラスベースでは__enter__/__exit__を実装',
        'finally節で例外発生時もクリーンアップ実行',
      ],
    },
    {
      id: 8,
      title: 'Dataclasses',
      titleJa: 'データクラス活用',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: 'dataclassを使った構造化データの定義。ボイラープレートを排除し、比較・ソート・不変性を簡単に実現します。',
      bookReference: 'Effective Python 第6章',
      code: `from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class Address:
    prefecture: str
    city: str
    street: str

    def full_address(self) -> str:
        return f"{self.prefecture}{self.city}{self.street}"

@dataclass(frozen=True)
class Money:
    """不変な金額オブジェクト（Value Object）"""
    amount: int
    currency: str = "JPY"

    def add(self, other: 'Money') -> 'Money':
        assert self.currency == other.currency, "通貨が異なります"
        return Money(self.amount + other.amount, self.currency)

    def __str__(self) -> str:
        if self.currency == "JPY":
            return f"¥{self.amount:,}"
        return f"{self.amount} {self.currency}"

@dataclass
class User:
    name: str
    email: str
    address: Address
    balance: Money = field(default_factory=lambda: Money(0))
    created_at: datetime = field(default_factory=datetime.now)
    tags: list[str] = field(default_factory=list)

    def display(self) -> str:
        return f"{self.name} ({self.email}) - 残高: {self.balance}"

# ─── 使用例 ───
addr = Address("東京都", "渋谷区", "神宮前1-1-1")
user = User(
    name="田中太郎",
    email="tanaka@example.com",
    address=addr,
    balance=Money(50000),
    tags=["premium", "early-adopter"],
)
print(user.display())
print(f"住所: {addr.full_address()}")
print(f"合計: {user.balance.add(Money(3000))}")`,
      highlights: [
        { startLine: 5, endLine: 12, color: '#f59e0b', label: '基本的なデータクラス', explanation: '__init__, __repr__, __eq__ が自動生成される' },
        { startLine: 14, endLine: 27, color: '#22c55e', label: 'frozen=True', explanation: '不変オブジェクト（Value Object）。ハッシュ可能になる' },
        { startLine: 29, endLine: 40, color: '#3b82f6', label: 'field()活用', explanation: 'default_factory でミュータブルなデフォルト値を安全に定義' },
      ],
      keyPoints: [
        'dataclass でボイラープレートコードを排除',
        'frozen=True で不変オブジェクト（Value Object）を作る',
        'field(default_factory=) でミュータブルデフォルトを安全に',
        'ネストした dataclass で複雑なデータ構造を表現',
      ],
    },
    {
      id: 9,
      title: 'Type Hints',
      titleJa: '型ヒントの活用',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '型ヒントで自己文書化コードを書く。IDEの補完とmypyの静的検査で品質を向上させます。',
      code: `from typing import Optional, Union, TypeAlias, Callable
from dataclasses import dataclass
from collections.abc import Sequence

# ─── 型エイリアス ───
UserId: TypeAlias = int
Email: TypeAlias = str
JsonDict: TypeAlias = dict[str, object]

@dataclass
class User:
    id: UserId
    name: str
    email: Email
    age: Optional[int] = None

def find_user(users: Sequence[User], user_id: UserId) -> Optional[User]:
    """IDでユーザーを検索する"""
    for user in users:
        if user.id == user_id:
            return user
    return None

def filter_users(
    users: list[User],
    predicate: Callable[[User], bool],
) -> list[User]:
    """条件に合うユーザーを抽出する"""
    return [u for u in users if predicate(u)]

def format_user_info(user: User) -> str:
    """ユーザー情報の書式化"""
    age_str = f", {user.age}歳" if user.age else ""
    return f"{user.name} <{user.email}>{age_str}"

def get_stats(users: list[User]) -> dict[str, Union[int, float]]:
    """ユーザー統計を返す"""
    ages = [u.age for u in users if u.age is not None]
    return {
        "total": len(users),
        "with_age": len(ages),
        "avg_age": sum(ages) / len(ages) if ages else 0.0,
    }

# ─── 使用例 ───
users = [
    User(1, "田中", "tanaka@example.com", 28),
    User(2, "鈴木", "suzuki@example.com"),
    User(3, "佐藤", "sato@example.com", 35),
]
found = find_user(users, 2)
adults = filter_users(users, lambda u: (u.age or 0) >= 30)
print(get_stats(users))`,
      highlights: [
        { startLine: 6, endLine: 8, color: '#f59e0b', label: '型エイリアス', explanation: 'TypeAlias で意味のある型名を定義し可読性向上' },
        { startLine: 17, endLine: 22, color: '#22c55e', label: 'Optional戻り値', explanation: 'None を返す可能性を型で明示' },
        { startLine: 24, endLine: 29, color: '#3b82f6', label: 'Callable型', explanation: '関数を引数に取る高階関数の型定義' },
        { startLine: 36, endLine: 43, color: '#a855f7', label: 'Union型', explanation: '複合型の戻り値を正確に表現' },
      ],
      keyPoints: [
        '全ての関数に引数型と戻り値型を付与する',
        'TypeAlias でドメイン固有の型名を作る',
        'Optional は None を返しうる場合に必ず使う',
        'Callable で関数型の引数を明示する',
      ],
    },
    {
      id: 10,
      title: 'Enum Over Strings',
      titleJa: 'Enum活用',
      difficulty: 'beginner',
      category: 'Clean Code',
      description: '文字列リテラルの代わりにEnumを使い、状態管理の安全性と補完の効きやすさを確保します。',
      bookReference: 'Effective Python 第34項',
      code: `from enum import Enum, auto
from dataclasses import dataclass

class OrderStatus(Enum):
    PENDING = auto()
    CONFIRMED = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    CANCELLED = auto()

    @property
    def is_active(self) -> bool:
        return self in (OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.SHIPPED)

    @property
    def label(self) -> str:
        labels = {
            OrderStatus.PENDING: "注文受付",
            OrderStatus.CONFIRMED: "確認済み",
            OrderStatus.SHIPPED: "発送済み",
            OrderStatus.DELIVERED: "配達完了",
            OrderStatus.CANCELLED: "キャンセル",
        }
        return labels[self]

VALID_TRANSITIONS: dict[OrderStatus, set[OrderStatus]] = {
    OrderStatus.PENDING: {OrderStatus.CONFIRMED, OrderStatus.CANCELLED},
    OrderStatus.CONFIRMED: {OrderStatus.SHIPPED, OrderStatus.CANCELLED},
    OrderStatus.SHIPPED: {OrderStatus.DELIVERED},
    OrderStatus.DELIVERED: set(),
    OrderStatus.CANCELLED: set(),
}

@dataclass
class Order:
    id: int
    status: OrderStatus = OrderStatus.PENDING

    def transition_to(self, new_status: OrderStatus) -> None:
        allowed = VALID_TRANSITIONS.get(self.status, set())
        if new_status not in allowed:
            raise ValueError(
                f"無効な遷移: {self.status.label} → {new_status.label}"
            )
        print(f"  注文#{self.id}: {self.status.label} → {new_status.label}")
        self.status = new_status

# ─── 使用例 ───
order = Order(id=1001)
order.transition_to(OrderStatus.CONFIRMED)
order.transition_to(OrderStatus.SHIPPED)
print(f"アクティブ: {order.status.is_active}")`,
      highlights: [
        { startLine: 4, endLine: 9, color: '#a855f7', label: 'Enum定義', explanation: 'auto()で値を自動割り当て。文字列比較の事故を防ぐ' },
        { startLine: 11, endLine: 24, color: '#22c55e', label: 'プロパティ付与', explanation: 'Enumにロジックを持たせてリッチなドメインモデルに' },
        { startLine: 26, endLine: 32, color: '#f59e0b', label: '状態遷移表', explanation: '有効な遷移をデータとして定義。不正遷移を防止' },
        { startLine: 39, endLine: 47, color: '#3b82f6', label: '遷移ロジック', explanation: '遷移表に基づいてバリデーション付きで状態変更' },
      ],
      keyPoints: [
        'Enum で文字列リテラルのタイポを防止する',
        'auto() で値の管理を不要にする',
        'Enum にプロパティやメソッドを持たせる',
        '状態遷移表で不正な遷移を防ぐ',
      ],
    },
    {
      id: 11,
      title: 'F-string Formatting',
      titleJa: '文字列フォーマット',
      difficulty: 'beginner',
      category: 'Pythonic Code',
      description: 'f-stringの高度な書式指定を活用し、見やすいログやテーブル出力を作成する技術。',
      code: `from datetime import datetime, timedelta

# ─── 基本フォーマット ───
name = "Python"
version = 3.12
print(f"{name} {version}")

# ─── 数値フォーマット ───
price = 1234567
tax_rate = 0.10
print(f"価格: ¥{price:,}")            # カンマ区切り
print(f"税率: {tax_rate:.0%}")          # パーセント表示
print(f"円周率: {3.14159:.3f}")         # 小数点3桁

# ─── パディング・揃え ───
items = [("コーヒー", 450), ("紅茶", 380), ("ジュース", 200)]
print("\\n─── メニュー ───")
for item_name, item_price in items:
    print(f"  {item_name:<10} ¥{item_price:>6,}")

# ─── 日時フォーマット ───
now = datetime.now()
print(f"\\n現在時刻: {now:%Y年%m月%d日 %H:%M:%S}")
print(f"30日後: {now + timedelta(days=30):%Y/%m/%d}")

# ─── デバッグ表示（= 記法）───
x = 42
y = [1, 2, 3]
print(f"\\n{x = }")    # x = 42
print(f"{y = }")        # y = [1, 2, 3]
print(f"{len(y) = }")   # len(y) = 3

# ─── 条件式の埋め込み ───
score = 85
print(f"\\n結果: {'合格' if score >= 60 else '不合格'} ({score}点)")

# ─── ネストした書式指定 ───
width = 20
for label, value in [("売上", 1500000), ("経費", 430000)]:
    print(f"  {label:>{width}}: ¥{value:>12,}")`,
      highlights: [
        { startLine: 10, endLine: 13, color: '#22c55e', label: '数値書式', explanation: 'カンマ区切り・パーセント・小数桁数の指定' },
        { startLine: 17, endLine: 19, color: '#3b82f6', label: '揃え指定', explanation: '<左寄せ >右寄せ で表形式の出力を作成' },
        { startLine: 22, endLine: 24, color: '#f59e0b', label: '日時書式', explanation: 'strftimeフォーマットをf-string内で直接使用' },
        { startLine: 27, endLine: 31, color: '#a855f7', label: '= デバッグ', explanation: 'Python 3.8+ の自己文書化式。変数名と値を同時表示' },
      ],
      keyPoints: [
        ':, で桁区切り、:.Nf で小数点Nは桁、:% でパーセント',
        '< > ^ でそれぞれ左・右・中央揃え',
        '= 記法でデバッグ出力を簡単に',
        'f-string内で条件式や関数呼び出しも可能',
      ],
    },
    {
      id: 12,
      title: 'Decorator Basics',
      titleJa: 'デコレータ基礎',
      difficulty: 'beginner',
      category: 'Pythonic Code',
      description: 'デコレータで関数に横断的関心事（ログ・計測・リトライ）を付与する。関数合成のPythonic手法。',
      code: `import functools
import time
import logging
from typing import Callable, TypeVar, ParamSpec

P = ParamSpec("P")
T = TypeVar("T")

logger = logging.getLogger(__name__)

def log_call(func: Callable[P, T]) -> Callable[P, T]:
    """関数の呼び出しをログに記録するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        logger.info(f"呼び出し: {func.__name__}()")
        result = func(*args, **kwargs)
        logger.info(f"完了: {func.__name__}() -> {result!r}")
        return result
    return wrapper

def measure_time(func: Callable[P, T]) -> Callable[P, T]:
    """実行時間を計測するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"  ⏱ {func.__name__}: {elapsed:.4f}秒")
        return result
    return wrapper

def retry(max_attempts: int = 3, delay: float = 1.0):
    """リトライデコレータ（引数付き）"""
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        @functools.wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
            last_error: Exception = Exception()
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    print(f"  ⚠ {func.__name__} 失敗 ({attempt}/{max_attempts})")
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise last_error
        return wrapper
    return decorator

# ─── 使用例 ───
@measure_time
@log_call
def calculate_fibonacci(n: int) -> int:
    """N番目のフィボナッチ数を計算"""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

result = calculate_fibonacci(30)
print(f"fib(30) = {result}")`,
      highlights: [
        { startLine: 10, endLine: 18, color: '#22c55e', label: '基本デコレータ', explanation: 'functools.wraps で元関数のメタ情報を保持' },
        { startLine: 20, endLine: 29, color: '#3b82f6', label: '計測デコレータ', explanation: '実行時間を透過的に計測。本体コードに影響なし' },
        { startLine: 31, endLine: 47, color: '#a855f7', label: '引数付きデコレータ', explanation: '三重ネスト構造。外側関数で設定を受け取る' },
        { startLine: 50, endLine: 51, color: '#ec4899', label: 'スタック適用', explanation: '複数デコレータを重ねて適用。下から順に実行される' },
      ],
      keyPoints: [
        'functools.wraps で元関数の __name__ 等を引き継ぐ',
        '引数付きデコレータは三重ネスト（外→中→内）',
        'デコレータは下から上の順に適用される',
        '横断的関心事を本体コードから分離できる',
      ],
    },

    // ─── Intermediate 13-24 ───
    {
      id: 13,
      title: 'Strategy Pattern',
      titleJa: 'ストラテジーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'アルゴリズムを交換可能にするパターン。割引計算や認証方式など、振る舞いを実行時に切り替えます。',
      bookReference: 'GoFデザインパターン',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Protocol

# ─── Strategy Interface ───
class DiscountStrategy(Protocol):
    def calculate(self, price: float) -> float: ...

# ─── Concrete Strategies ───
class NoDiscount:
    """割引なし"""
    def calculate(self, price: float) -> float:
        return price

class PercentageDiscount:
    """割合割引"""
    def __init__(self, percent: float):
        self.percent = percent

    def calculate(self, price: float) -> float:
        return price * (1 - self.percent / 100)

class FixedDiscount:
    """固定額割引"""
    def __init__(self, amount: float):
        self.amount = amount

    def calculate(self, price: float) -> float:
        return max(0, price - self.amount)

class TieredDiscount:
    """段階的割引"""
    def __init__(self, tiers: list[tuple[float, float]]):
        self.tiers = sorted(tiers, key=lambda t: t[0], reverse=True)

    def calculate(self, price: float) -> float:
        for threshold, percent in self.tiers:
            if price >= threshold:
                return price * (1 - percent / 100)
        return price

# ─── Context ───
@dataclass
class Order:
    items: list[tuple[str, float]]
    discount_strategy: DiscountStrategy

    @property
    def subtotal(self) -> float:
        return sum(price for _, price in self.items)

    @property
    def total(self) -> float:
        return self.discount_strategy.calculate(self.subtotal)

    def print_receipt(self) -> None:
        print("─── 注文明細 ───")
        for name, price in self.items:
            print(f"  {name:<20} ¥{price:>8,.0f}")
        sub = self.subtotal
        tot = self.total
        print(f"  {'小計':<20} ¥{sub:>8,.0f}")
        if sub != tot:
            print(f"  {'割引後':<20} ¥{tot:>8,.0f}")
            print(f"  {'割引額':<20} -¥{sub - tot:>7,.0f}")

# ─── 使用例 ───
items = [("ノートPC", 89800), ("マウス", 3980), ("キーボード", 12800)]

# 戦略を切り替え
strategies = [
    ("割引なし", NoDiscount()),
    ("20%オフ", PercentageDiscount(20)),
    ("5000円引き", FixedDiscount(5000)),
    ("段階割引", TieredDiscount([(100000, 15), (50000, 10), (10000, 5)])),
]

for label, strategy in strategies:
    print(f"\\n=== {label} ===")
    order = Order(items=items, discount_strategy=strategy)
    order.print_receipt()`,
      highlights: [
        { startLine: 6, endLine: 7, color: '#a855f7', label: 'Strategy Interface', explanation: 'Protocolで策略のインターフェースを定義。ダックタイピング対応' },
        { startLine: 9, endLine: 42, color: '#22c55e', label: '具体的な戦略群', explanation: '同じインターフェースで異なるアルゴリズムを実装' },
        { startLine: 45, endLine: 68, color: '#3b82f6', label: 'Context（利用側）', explanation: '戦略を注入され、アルゴリズムの詳細を知らない' },
        { startLine: 73, endLine: 84, color: '#ec4899', label: '実行時切替', explanation: '戦略を動的に切り替えて同じ注文に異なる割引を適用' },
      ],
      keyPoints: [
        'Protocol で暗黙的インターフェースを定義する',
        '各戦略は同じメソッドシグネチャを持つ',
        'Context は戦略の具体的な型を知らない',
        '実行時にアルゴリズムを差し替えできる',
      ],
    },
    {
      id: 14,
      title: 'Observer Pattern',
      titleJa: 'オブザーバーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'イベント駆動型の疎結合設計。あるオブジェクトの状態変化を複数のリスナーに通知します。',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any
from datetime import datetime

# ─── Event ───
@dataclass(frozen=True)
class Event:
    name: str
    data: dict[str, Any]
    timestamp: datetime = field(default_factory=datetime.now)

# ─── Observer Interface ───
class EventListener(ABC):
    @abstractmethod
    def on_event(self, event: Event) -> None: ...

# ─── Concrete Observers ───
class LoggingListener(EventListener):
    def on_event(self, event: Event) -> None:
        ts = event.timestamp.strftime("%H:%M:%S")
        print(f"  📝 [{ts}] {event.name}: {event.data}")

class EmailNotifier(EventListener):
    def __init__(self, recipient: str):
        self.recipient = recipient

    def on_event(self, event: Event) -> None:
        if event.name in ("user.registered", "order.completed"):
            print(f"  📧 → {self.recipient}: [{event.name}] {event.data}")

class MetricsCollector(EventListener):
    def __init__(self):
        self.counts: dict[str, int] = {}

    def on_event(self, event: Event) -> None:
        self.counts[event.name] = self.counts.get(event.name, 0) + 1

    def report(self) -> None:
        print("  📊 メトリクス:")
        for name, count in sorted(self.counts.items()):
            print(f"     {name}: {count}回")

# ─── Event Bus（Subject） ───
class EventBus:
    def __init__(self):
        self._listeners: dict[str, list[EventListener]] = {}

    def subscribe(self, event_name: str, listener: EventListener) -> None:
        self._listeners.setdefault(event_name, []).append(listener)

    def unsubscribe(self, event_name: str, listener: EventListener) -> None:
        if event_name in self._listeners:
            self._listeners[event_name].remove(listener)

    def publish(self, event_name: str, data: dict[str, Any] | None = None) -> None:
        event = Event(name=event_name, data=data or {})
        for listener in self._listeners.get(event_name, []):
            listener.on_event(event)
        for listener in self._listeners.get("*", []):
            listener.on_event(event)

# ─── 使用例 ───
bus = EventBus()
logger_listener = LoggingListener()
email = EmailNotifier("admin@example.com")
metrics = MetricsCollector()

bus.subscribe("*", logger_listener)
bus.subscribe("*", metrics)
bus.subscribe("user.registered", email)
bus.subscribe("order.completed", email)

print("=== イベント発行 ===")
bus.publish("user.registered", {"user": "田中", "plan": "premium"})
bus.publish("order.completed", {"order_id": 1234, "total": 5980})
bus.publish("page.viewed", {"path": "/products"})

print("\\n=== メトリクスレポート ===")
metrics.report()`,
      highlights: [
        { startLine: 7, endLine: 11, color: '#f59e0b', label: 'Event データ', explanation: '不変のイベントオブジェクト。名前・データ・タイムスタンプを持つ' },
        { startLine: 14, endLine: 16, color: '#a855f7', label: 'Observer ABC', explanation: '全リスナーが実装すべきインターフェース' },
        { startLine: 19, endLine: 43, color: '#3b82f6', label: '具体的リスナー', explanation: 'ロギング・メール・メトリクスの各リスナー実装' },
        { startLine: 46, endLine: 63, color: '#22c55e', label: 'EventBus', explanation: 'サブスクライブ/パブリッシュの中核。* でワイルドカード購読可能' },
      ],
      keyPoints: [
        'Subject と Observer を疎結合にする',
        'EventBus でパブリッシュ/サブスクライブを実現',
        'ワイルドカード購読で全イベントを監視可能',
        'リスナーの追加・削除が動的にできる',
      ],
    },
    {
      id: 15,
      title: 'Factory Method',
      titleJa: 'ファクトリーメソッド',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'オブジェクト生成を専用メソッドに委譲し、生成ロジックの変更に強い設計を実現します。',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import ClassVar

# ─── Product Interface ───
class Notification(ABC):
    @abstractmethod
    def send(self, to: str, message: str) -> None: ...

    @abstractmethod
    def get_provider_name(self) -> str: ...

# ─── Concrete Products ───
class EmailNotification(Notification):
    def __init__(self, smtp_host: str = "smtp.example.com"):
        self.smtp_host = smtp_host

    def send(self, to: str, message: str) -> None:
        print(f"  📧 Email → {to}: {message} (via {self.smtp_host})")

    def get_provider_name(self) -> str:
        return "Email"

class SlackNotification(Notification):
    def __init__(self, webhook_url: str = "https://hooks.slack.com/xxx"):
        self.webhook_url = webhook_url

    def send(self, to: str, message: str) -> None:
        print(f"  💬 Slack → #{to}: {message}")

    def get_provider_name(self) -> str:
        return "Slack"

class SmsNotification(Notification):
    def __init__(self, api_key: str = "dummy-key"):
        self.api_key = api_key

    def send(self, to: str, message: str) -> None:
        print(f"  📱 SMS → {to}: {message}")

    def get_provider_name(self) -> str:
        return "SMS"

# ─── Factory ───
class NotificationFactory:
    _registry: ClassVar[dict[str, type[Notification]]] = {}

    @classmethod
    def register(cls, name: str, notification_cls: type[Notification]) -> None:
        cls._registry[name] = notification_cls

    @classmethod
    def create(cls, name: str, **kwargs) -> Notification:
        notification_cls = cls._registry.get(name)
        if notification_cls is None:
            available = ", ".join(cls._registry.keys())
            raise ValueError(f"Unknown type: '{name}'. Available: {available}")
        return notification_cls(**kwargs)

# ─── 登録 ───
NotificationFactory.register("email", EmailNotification)
NotificationFactory.register("slack", SlackNotification)
NotificationFactory.register("sms", SmsNotification)

# ─── 使用例 ───
def send_alert(channel: str, recipient: str, message: str) -> None:
    notification = NotificationFactory.create(channel)
    print(f"[{notification.get_provider_name()}]")
    notification.send(recipient, message)

send_alert("email", "admin@example.com", "サーバー負荷が高いです")
send_alert("slack", "alerts", "CPU使用率90%超過")
send_alert("sms", "090-1234-5678", "緊急: DB接続断")`,
      highlights: [
        { startLine: 6, endLine: 11, color: '#a855f7', label: 'Product ABC', explanation: '全通知タイプの共通インターフェース' },
        { startLine: 14, endLine: 42, color: '#3b82f6', label: '具象プロダクト', explanation: 'Email/Slack/SMSの各実装。同じインターフェースに従う' },
        { startLine: 45, endLine: 58, color: '#22c55e', label: 'Factory', explanation: 'レジストリパターンで動的に生成対象を登録・生成' },
        { startLine: 65, endLine: 69, color: '#ec4899', label: '利用コード', explanation: '具象クラスを直接参照せず、文字列キーで生成' },
      ],
      keyPoints: [
        '生成ロジックをFactoryに集約し利用側から分離',
        'レジストリパターンで動的に生成対象を追加可能',
        '新しい通知方式追加時も利用コード変更不要',
        'ClassVar でクラスレベルの共有状態を管理',
      ],
    },
    {
      id: 16,
      title: 'Builder Pattern',
      titleJa: 'ビルダーパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '複雑なオブジェクトをステップバイステップで構築する。メソッドチェーンで直感的なAPIを提供します。',
      code: `from dataclasses import dataclass, field
from typing import Optional, Self

@dataclass(frozen=True)
class HttpRequest:
    method: str
    url: str
    headers: dict[str, str]
    body: Optional[str]
    timeout: int
    retries: int

    def __str__(self) -> str:
        lines = [f"{self.method} {self.url}"]
        for k, v in self.headers.items():
            lines.append(f"  {k}: {v}")
        if self.body:
            lines.append(f"  Body: {self.body[:50]}...")
        lines.append(f"  Timeout: {self.timeout}ms, Retries: {self.retries}")
        return "\\n".join(lines)

class HttpRequestBuilder:
    """Fluent Builder for HttpRequest"""
    def __init__(self, method: str, url: str):
        self._method = method
        self._url = url
        self._headers: dict[str, str] = {}
        self._body: Optional[str] = None
        self._timeout = 5000
        self._retries = 0

    def header(self, key: str, value: str) -> Self:
        self._headers[key] = value
        return self

    def content_type(self, ct: str) -> Self:
        return self.header("Content-Type", ct)

    def authorization(self, token: str) -> Self:
        return self.header("Authorization", f"Bearer {token}")

    def body(self, data: str) -> Self:
        self._body = data
        return self

    def timeout(self, ms: int) -> Self:
        self._timeout = ms
        return self

    def retries(self, count: int) -> Self:
        self._retries = count
        return self

    def build(self) -> HttpRequest:
        if not self._url:
            raise ValueError("URLは必須です")
        return HttpRequest(
            method=self._method,
            url=self._url,
            headers=dict(self._headers),
            body=self._body,
            timeout=self._timeout,
            retries=self._retries,
        )

# ─── Convenience factories ───
def get(url: str) -> HttpRequestBuilder:
    return HttpRequestBuilder("GET", url)

def post(url: str) -> HttpRequestBuilder:
    return HttpRequestBuilder("POST", url)

# ─── 使用例 ───
request = (
    post("https://api.example.com/users")
    .content_type("application/json")
    .authorization("eyJhbGci...")
    .body('{"name": "田中", "role": "admin"}')
    .timeout(10000)
    .retries(3)
    .build()
)
print(request)

simple = get("https://api.example.com/status").build()
print(f"\\n{simple}")`,
      highlights: [
        { startLine: 4, endLine: 20, color: '#f59e0b', label: 'Product（不変）', explanation: 'frozen=True で構築後は変更不可。安全なデータオブジェクト' },
        { startLine: 22, endLine: 64, color: '#22c55e', label: 'Builder', explanation: '各メソッドが self を返しメソッドチェーンを実現' },
        { startLine: 67, endLine: 72, color: '#3b82f6', label: 'ファクトリー関数', explanation: 'Builderの生成を簡潔にするショートカット' },
        { startLine: 75, endLine: 83, color: '#ec4899', label: 'メソッドチェーン', explanation: '流れるようなインターフェースで直感的にオブジェクト構築' },
      ],
      keyPoints: [
        'Builder パターンで複雑なオブジェクト生成を段階的に',
        'Self 型を返してメソッドチェーン（Fluent API）を実現',
        'build() で最終的な不変オブジェクトを生成',
        'ファクトリー関数で Builder 生成を簡潔に',
      ],
    },
    {
      id: 17,
      title: 'Repository Pattern',
      titleJa: 'リポジトリパターン',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: 'データアクセスロジックを抽象化し、ビジネスロジックをストレージ手段から切り離すパターン。',
      bookReference: 'PofEAA',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime

# ─── Entity ───
@dataclass
class User:
    id: Optional[int] = None
    name: str = ""
    email: str = ""
    created_at: datetime = field(default_factory=datetime.now)

# ─── Repository Interface ───
class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: int) -> Optional[User]: ...

    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]: ...

    @abstractmethod
    def find_all(self) -> list[User]: ...

    @abstractmethod
    def save(self, user: User) -> User: ...

    @abstractmethod
    def delete(self, user_id: int) -> bool: ...

# ─── In-Memory Implementation ───
class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._store: dict[int, User] = {}
        self._next_id = 1

    def find_by_id(self, user_id: int) -> Optional[User]:
        return self._store.get(user_id)

    def find_by_email(self, email: str) -> Optional[User]:
        return next((u for u in self._store.values() if u.email == email), None)

    def find_all(self) -> list[User]:
        return list(self._store.values())

    def save(self, user: User) -> User:
        if user.id is None:
            user.id = self._next_id
            self._next_id += 1
        self._store[user.id] = user
        return user

    def delete(self, user_id: int) -> bool:
        return self._store.pop(user_id, None) is not None

# ─── Service（リポジトリを利用）───
class UserService:
    def __init__(self, repo: UserRepository):
        self._repo = repo

    def register(self, name: str, email: str) -> User:
        existing = self._repo.find_by_email(email)
        if existing:
            raise ValueError(f"メールアドレス '{email}' は既に登録済みです")
        user = User(name=name, email=email)
        return self._repo.save(user)

    def get_user(self, user_id: int) -> User:
        user = self._repo.find_by_id(user_id)
        if not user:
            raise ValueError(f"ユーザーID {user_id} が見つかりません")
        return user

    def list_users(self) -> list[User]:
        return self._repo.find_all()

# ─── 使用例 ───
repo = InMemoryUserRepository()
service = UserService(repo)

u1 = service.register("田中太郎", "tanaka@example.com")
u2 = service.register("鈴木花子", "suzuki@example.com")
print(f"登録: {u1.name} (ID: {u1.id})")
print(f"登録: {u2.name} (ID: {u2.id})")

all_users = service.list_users()
print(f"全ユーザー数: {len(all_users)}")`,
      highlights: [
        { startLine: 7, endLine: 12, color: '#f59e0b', label: 'Entity', explanation: 'ドメインエンティティ。IDで識別される' },
        { startLine: 15, endLine: 29, color: '#a855f7', label: 'Repository ABC', explanation: 'データアクセスの抽象インターフェース' },
        { startLine: 32, endLine: 54, color: '#22c55e', label: 'InMemory実装', explanation: 'テスト用のインメモリ実装。本番ではDB実装に差し替え可能' },
        { startLine: 57, endLine: 77, color: '#3b82f6', label: 'Service層', explanation: 'リポジトリを注入され、ストレージ手段を知らない' },
      ],
      keyPoints: [
        'Repository でデータアクセスを抽象化する',
        'ビジネスロジックはストレージ手段を知らない',
        'テスト時はInMemory実装に差し替え可能',
        'DI（依存性注入）で結合度を下げる',
      ],
    },
    {
      id: 18,
      title: 'Command Pattern',
      titleJa: 'コマンドパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: '操作をオブジェクトとして表し、実行・取り消し・履歴管理を実現するパターン。',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass

# ─── Command Interface ───
class Command(ABC):
    @abstractmethod
    def execute(self) -> None: ...

    @abstractmethod
    def undo(self) -> None: ...

    @abstractmethod
    def description(self) -> str: ...

# ─── Receiver ───
@dataclass
class TextDocument:
    content: str = ""
    cursor: int = 0

    def insert(self, pos: int, text: str) -> None:
        self.content = self.content[:pos] + text + self.content[pos:]
        self.cursor = pos + len(text)

    def delete(self, pos: int, length: int) -> str:
        deleted = self.content[pos:pos + length]
        self.content = self.content[:pos] + self.content[pos + length:]
        self.cursor = pos
        return deleted

    def __str__(self) -> str:
        return f'"{self.content}" (cursor:{self.cursor})'

# ─── Concrete Commands ───
class InsertCommand(Command):
    def __init__(self, doc: TextDocument, pos: int, text: str):
        self.doc = doc
        self.pos = pos
        self.text = text

    def execute(self) -> None:
        self.doc.insert(self.pos, self.text)

    def undo(self) -> None:
        self.doc.delete(self.pos, len(self.text))

    def description(self) -> str:
        return f"挿入 '{self.text}' at {self.pos}"

class DeleteCommand(Command):
    def __init__(self, doc: TextDocument, pos: int, length: int):
        self.doc = doc
        self.pos = pos
        self.length = length
        self._deleted_text = ""

    def execute(self) -> None:
        self._deleted_text = self.doc.delete(self.pos, self.length)

    def undo(self) -> None:
        self.doc.insert(self.pos, self._deleted_text)

    def description(self) -> str:
        return f"削除 '{self._deleted_text}' at {self.pos}"

# ─── Invoker ───
class CommandHistory:
    def __init__(self):
        self._history: list[Command] = []
        self._redo_stack: list[Command] = []

    def execute(self, command: Command) -> None:
        command.execute()
        self._history.append(command)
        self._redo_stack.clear()
        print(f"  ✅ {command.description()}")

    def undo(self) -> None:
        if not self._history:
            print("  ⚠ 取り消し履歴なし")
            return
        command = self._history.pop()
        command.undo()
        self._redo_stack.append(command)
        print(f"  ↩️ 取消: {command.description()}")

    def redo(self) -> None:
        if not self._redo_stack:
            print("  ⚠ やり直し履歴なし")
            return
        command = self._redo_stack.pop()
        command.execute()
        self._history.append(command)
        print(f"  ↪️ やり直し: {command.description()}")

# ─── 使用例 ───
doc = TextDocument()
history = CommandHistory()

history.execute(InsertCommand(doc, 0, "Hello"))
history.execute(InsertCommand(doc, 5, " World"))
print(f"  文書: {doc}")

history.undo()
print(f"  文書: {doc}")

history.redo()
print(f"  文書: {doc}")

history.execute(DeleteCommand(doc, 5, 6))
print(f"  文書: {doc}")`,
      highlights: [
        { startLine: 4, endLine: 13, color: '#a855f7', label: 'Command ABC', explanation: 'execute/undo/descriptionを持つ共通インターフェース' },
        { startLine: 16, endLine: 32, color: '#f59e0b', label: 'Receiver', explanation: '実際の操作対象。コマンドから操作を受ける' },
        { startLine: 35, endLine: 65, color: '#22c55e', label: '具象コマンド', explanation: '各操作をオブジェクト化。Undo用にデータを保持' },
        { startLine: 68, endLine: 94, color: '#3b82f6', label: 'CommandHistory', explanation: '実行履歴を管理。Undo/Redo操作を提供' },
      ],
      keyPoints: [
        '操作をオブジェクト化しUndo/Redoを実現',
        'Command は execute() と undo() を持つ',
        '履歴スタックで操作の取り消し・やり直しを管理',
        'Receiver は操作の詳細を実装する',
      ],
    },
    {
      id: 19,
      title: 'Dependency Injection',
      titleJa: '依存性注入',
      difficulty: 'intermediate',
      category: 'Architecture',
      description: '依存関係をコンストラクタ経由で外部から注入し、テスト容易性と柔軟性を確保する設計原則。',
      bookReference: 'Clean Architecture 第11章',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass

# ─── Interfaces（ポート）───
class Logger(ABC):
    @abstractmethod
    def info(self, msg: str) -> None: ...
    @abstractmethod
    def error(self, msg: str) -> None: ...

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, card_token: str) -> str: ...

class NotificationService(ABC):
    @abstractmethod
    def notify(self, to: str, message: str) -> None: ...

# ─── 本番実装 ───
class ConsoleLogger(Logger):
    def info(self, msg: str) -> None:
        print(f"  ℹ️  {msg}")
    def error(self, msg: str) -> None:
        print(f"  ❌ {msg}")

class StripeGateway(PaymentGateway):
    def charge(self, amount: float, card_token: str) -> str:
        print(f"  💳 Stripe: ¥{amount:,.0f} チャージ (token: {card_token[:8]}...)")
        return f"ch_{card_token[:8]}"

class EmailService(NotificationService):
    def notify(self, to: str, message: str) -> None:
        print(f"  📧 → {to}: {message}")

# ─── ビジネスロジック（依存を注入される）───
class OrderProcessor:
    def __init__(
        self,
        payment: PaymentGateway,
        notification: NotificationService,
        logger: Logger,
    ):
        self._payment = payment
        self._notification = notification
        self._logger = logger

    def process(self, email: str, amount: float, card_token: str) -> str:
        self._logger.info(f"注文処理開始: ¥{amount:,.0f}")
        try:
            charge_id = self._payment.charge(amount, card_token)
            self._notification.notify(email, f"ご注文確定: ¥{amount:,.0f}")
            self._logger.info(f"注文完了: {charge_id}")
            return charge_id
        except Exception as e:
            self._logger.error(f"注文失敗: {e}")
            raise

# ─── テスト用モック実装 ───
class MockLogger(Logger):
    def __init__(self):
        self.messages: list[str] = []
    def info(self, msg: str) -> None:
        self.messages.append(f"INFO: {msg}")
    def error(self, msg: str) -> None:
        self.messages.append(f"ERROR: {msg}")

class MockPayment(PaymentGateway):
    def charge(self, amount: float, card_token: str) -> str:
        return "mock_charge_001"

class MockNotification(NotificationService):
    def __init__(self):
        self.sent: list[tuple[str, str]] = []
    def notify(self, to: str, message: str) -> None:
        self.sent.append((to, message))

# ─── 本番利用 ───
print("=== 本番 ===")
processor = OrderProcessor(
    payment=StripeGateway(),
    notification=EmailService(),
    logger=ConsoleLogger(),
)
processor.process("user@example.com", 9800, "tok_visa_4242424242")

# ─── テスト利用 ───
print("\\n=== テスト ===")
mock_logger = MockLogger()
mock_notif = MockNotification()
test_proc = OrderProcessor(MockPayment(), mock_notif, mock_logger)
test_proc.process("test@test.com", 100, "tok_test")
print(f"  ログ: {mock_logger.messages}")
print(f"  通知: {mock_notif.sent}")`,
      highlights: [
        { startLine: 5, endLine: 17, color: '#a855f7', label: 'Interface（ポート）', explanation: '依存先の抽象インターフェース。本番・テストで差替え可能' },
        { startLine: 20, endLine: 33, color: '#3b82f6', label: '本番実装', explanation: '実際のStripe/Email等の実装' },
        { startLine: 36, endLine: 56, color: '#22c55e', label: 'DI を受けるクラス', explanation: 'コンストラクタで依存を注入。具象クラスを知らない' },
        { startLine: 59, endLine: 76, color: '#f59e0b', label: 'テスト用モック', explanation: '同じインターフェースのモック実装。副作用なしでテスト可能' },
      ],
      keyPoints: [
        '依存をコンストラクタ引数で注入する',
        'ビジネスロジックは抽象インターフェースのみに依存',
        'テスト時はモック実装を注入してユニットテスト可能',
        '本番・テスト・開発で実装を自由に差し替え',
      ],
    },
    {
      id: 20,
      title: 'Template Method',
      titleJa: 'テンプレートメソッド',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'アルゴリズムの骨格を基底クラスに定義し、各ステップをサブクラスで実装させるパターン。',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ReportData:
    title: str
    rows: list[dict[str, str]]
    generated_at: datetime

# ─── Template ───
class ReportGenerator(ABC):
    """レポート生成のテンプレート"""
    def generate(self, data: ReportData) -> str:
        """テンプレートメソッド — 処理の流れを固定"""
        output = self._header(data)
        output += self._body(data)
        output += self._footer(data)
        return output

    @abstractmethod
    def _header(self, data: ReportData) -> str: ...

    @abstractmethod
    def _body(self, data: ReportData) -> str: ...

    def _footer(self, data: ReportData) -> str:
        """デフォルト実装（オーバーライド可能）"""
        return f"\\n生成日時: {data.generated_at:%Y-%m-%d %H:%M}\\n"

# ─── 具象: テキスト形式 ───
class TextReport(ReportGenerator):
    def _header(self, data: ReportData) -> str:
        return f"{'=' * 40}\\n  {data.title}\\n{'=' * 40}\\n"

    def _body(self, data: ReportData) -> str:
        lines = []
        for row in data.rows:
            parts = [f"{k}: {v}" for k, v in row.items()]
            lines.append("  " + " | ".join(parts))
        return "\\n".join(lines) + "\\n"

# ─── 具象: CSV形式 ───
class CsvReport(ReportGenerator):
    def _header(self, data: ReportData) -> str:
        if not data.rows:
            return ""
        return ",".join(data.rows[0].keys()) + "\\n"

    def _body(self, data: ReportData) -> str:
        lines = []
        for row in data.rows:
            lines.append(",".join(row.values()))
        return "\\n".join(lines) + "\\n"

    def _footer(self, data: ReportData) -> str:
        return ""  # CSVにフッタ不要

# ─── 具象: Markdown形式 ───
class MarkdownReport(ReportGenerator):
    def _header(self, data: ReportData) -> str:
        if not data.rows:
            return f"# {data.title}\\n"
        cols = list(data.rows[0].keys())
        header = "| " + " | ".join(cols) + " |\\n"
        sep = "| " + " | ".join("---" for _ in cols) + " |\\n"
        return f"# {data.title}\\n\\n{header}{sep}"

    def _body(self, data: ReportData) -> str:
        lines = []
        for row in data.rows:
            lines.append("| " + " | ".join(row.values()) + " |")
        return "\\n".join(lines) + "\\n"

# ─── 使用例 ───
report_data = ReportData(
    title="月次売上レポート",
    rows=[
        {"商品": "ノートPC", "数量": "15", "売上": "¥1,347,000"},
        {"商品": "マウス", "数量": "42", "売上": "¥167,160"},
        {"商品": "モニター", "数量": "8", "売上": "¥399,200"},
    ],
    generated_at=datetime.now(),
)

for fmt, gen in [("Text", TextReport()), ("CSV", CsvReport()), ("MD", MarkdownReport())]:
    print(f"\\n─── {fmt} ───")
    print(gen.generate(report_data))`,
      highlights: [
        { startLine: 12, endLine: 29, color: '#22c55e', label: 'Template Method', explanation: 'generate()がアルゴリズムの骨格。各ステップは抽象/フック' },
        { startLine: 32, endLine: 41, color: '#3b82f6', label: 'Text実装', explanation: 'テキスト形式のヘッダー・ボディを実装' },
        { startLine: 44, endLine: 57, color: '#3b82f6', label: 'CSV実装', explanation: 'CSV形式。フッターをオーバーライドして空に' },
        { startLine: 60, endLine: 73, color: '#3b82f6', label: 'Markdown実装', explanation: 'テーブル記法で出力するMarkdown実装' },
      ],
      keyPoints: [
        'テンプレートメソッドで処理の流れを固定する',
        '各ステップを抽象メソッドでサブクラスに委譲',
        'フックメソッドにデフォルト実装を提供可能',
        '「変わる部分」だけをサブクラスに実装させる',
      ],
    },
    {
      id: 21,
      title: 'Iterator Pattern',
      titleJa: 'イテレータパターン',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'カスタムイテレータで複雑なデータ構造のトラバーサルを隠蔽する。Pythonの__iter__/__next__を活用。',
      code: `from dataclasses import dataclass, field
from typing import Iterator, Optional
from collections.abc import Iterable

@dataclass
class TreeNode:
    value: str
    children: list['TreeNode'] = field(default_factory=list)

    def add(self, value: str) -> 'TreeNode':
        child = TreeNode(value)
        self.children.append(child)
        return child

class DepthFirstIterator:
    """深さ優先でツリーを走査するイテレータ"""
    def __init__(self, root: TreeNode):
        self._stack: list[tuple[TreeNode, int]] = [(root, 0)]

    def __iter__(self) -> 'DepthFirstIterator':
        return self

    def __next__(self) -> tuple[str, int]:
        while self._stack:
            node, depth = self._stack.pop()
            for child in reversed(node.children):
                self._stack.append((child, depth + 1))
            return (node.value, depth)
        raise StopIteration

class BreadthFirstIterator:
    """幅優先でツリーを走査するイテレータ"""
    def __init__(self, root: TreeNode):
        from collections import deque
        self._queue: deque[tuple[TreeNode, int]] = deque([(root, 0)])

    def __iter__(self) -> 'BreadthFirstIterator':
        return self

    def __next__(self) -> tuple[str, int]:
        if not self._queue:
            raise StopIteration
        node, depth = self._queue.popleft()
        for child in node.children:
            self._queue.append((child, depth + 1))
        return (node.value, depth)

class Tree(Iterable[tuple[str, int]]):
    """走査方法を切り替えられるツリー"""
    def __init__(self, root: TreeNode, mode: str = "dfs"):
        self.root = root
        self.mode = mode

    def __iter__(self) -> Iterator[tuple[str, int]]:
        if self.mode == "bfs":
            return BreadthFirstIterator(self.root)
        return DepthFirstIterator(self.root)

# ─── 使用例 ───
root = TreeNode("CEO")
dev = root.add("開発部長")
dev.add("フロントエンド")
dev.add("バックエンド")
dev.add("インフラ")
sales = root.add("営業部長")
sales.add("法人営業")
sales.add("個人営業")

print("=== 深さ優先 ===")
for name, depth in Tree(root, "dfs"):
    print(f"{'  ' * depth}├─ {name}")

print("\\n=== 幅優先 ===")
for name, depth in Tree(root, "bfs"):
    print(f"{'  ' * depth}├─ {name}")`,
      highlights: [
        { startLine: 5, endLine: 13, color: '#f59e0b', label: 'TreeNode', explanation: '再帰的なツリー構造。子ノードのリストを持つ' },
        { startLine: 15, endLine: 29, color: '#22c55e', label: 'DFSイテレータ', explanation: 'スタックで深さ優先走査を実装' },
        { startLine: 31, endLine: 47, color: '#3b82f6', label: 'BFSイテレータ', explanation: 'キューで幅優先走査を実装' },
        { startLine: 49, endLine: 57, color: '#a855f7', label: 'Iterable Tree', explanation: 'モードに応じてイテレータを切り替え' },
      ],
      keyPoints: [
        '__iter__ と __next__ でイテレータプロトコルを実装',
        '走査アルゴリズムをイテレータに隠蔽する',
        'for文やリスト内包表記でそのまま使える',
        'Iterable を実装してPythonの反復プロトコルに適合',
      ],
    },
    {
      id: 22,
      title: 'Chain of Responsibility',
      titleJa: '責任の連鎖',
      difficulty: 'intermediate',
      category: 'Design Patterns',
      description: 'リクエストを一連のハンドラに順番に渡し、処理できるハンドラが処理する。ミドルウェアパイプライン。',
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field

@dataclass
class HttpRequest:
    path: str
    method: str
    headers: dict[str, str] = field(default_factory=dict)
    body: str = ""
    user: str | None = None

@dataclass
class HttpResponse:
    status: int
    body: str
    headers: dict[str, str] = field(default_factory=dict)

# ─── Handler Interface ───
class Middleware(ABC):
    def __init__(self):
        self._next: Middleware | None = None

    def set_next(self, handler: 'Middleware') -> 'Middleware':
        self._next = handler
        return handler

    def handle(self, request: HttpRequest) -> HttpResponse | None:
        if self._next:
            return self._next.handle(request)
        return None

    @abstractmethod
    def process(self, request: HttpRequest) -> HttpResponse | None: ...

# ─── Concrete Handlers ───
class LoggingMiddleware(Middleware):
    def process(self, request: HttpRequest) -> HttpResponse | None:
        print(f"  📝 {request.method} {request.path}")
        return self.handle(request)

class AuthMiddleware(Middleware):
    def process(self, request: HttpRequest) -> HttpResponse | None:
        token = request.headers.get("Authorization")
        if not token:
            return HttpResponse(401, '{"error": "認証が必要です"}')
        request.user = token.replace("Bearer ", "")
        print(f"  🔐 認証OK: {request.user}")
        return self.handle(request)

class RateLimitMiddleware(Middleware):
    def __init__(self, max_requests: int = 100):
        super().__init__()
        self.max_requests = max_requests
        self._count = 0

    def process(self, request: HttpRequest) -> HttpResponse | None:
        self._count += 1
        if self._count > self.max_requests:
            return HttpResponse(429, '{"error": "レート制限超過"}')
        print(f"  ⏱ Rate: {self._count}/{self.max_requests}")
        return self.handle(request)

class RouteHandler(Middleware):
    def process(self, request: HttpRequest) -> HttpResponse | None:
        return HttpResponse(200, f'{{"path": "{request.path}", "user": "{request.user}"}}')

# ─── チェーン構築 ───
def build_pipeline() -> Middleware:
    logging_mw = LoggingMiddleware()
    auth = AuthMiddleware()
    rate_limit = RateLimitMiddleware(max_requests=5)
    router = RouteHandler()

    logging_mw.set_next(auth).set_next(rate_limit).set_next(router)

    class PipelineEntry(Middleware):
        def process(self, request: HttpRequest) -> HttpResponse | None:
            return logging_mw.process(request)
    return PipelineEntry()

# ─── 使用例 ───
pipeline = build_pipeline()

req1 = HttpRequest("/api/users", "GET", {"Authorization": "Bearer tanaka"})
resp1 = pipeline.process(req1)
print(f"  → {resp1}\\n")

req2 = HttpRequest("/api/data", "POST")
resp2 = pipeline.process(req2)
print(f"  → {resp2}")`,
      highlights: [
        { startLine: 19, endLine: 33, color: '#a855f7', label: 'Handler ABC', explanation: '次のハンドラへの参照と委譲メソッドを持つ基底クラス' },
        { startLine: 36, endLine: 63, color: '#22c55e', label: '具象ハンドラ群', explanation: 'ログ・認証・レートリミット。処理できなければ次へ委譲' },
        { startLine: 70, endLine: 79, color: '#3b82f6', label: 'チェーン構築', explanation: 'set_next()でハンドラを連鎖。メソッドチェーンで記述' },
      ],
      keyPoints: [
        'ハンドラを連鎖させてリクエストを順次処理',
        '各ハンドラは処理するか次に委譲するかを決める',
        'ミドルウェアパイプラインに最適なパターン',
        '新しいハンドラの追加が既存コードに影響しない',
      ],
    },
    {
      id: 23,
      title: 'Testing with Pytest',
      titleJa: 'pytestテスト設計',
      difficulty: 'intermediate',
      category: 'Testing',
      description: 'クリーンなテストの書き方。Arrange-Act-Assert、フィクスチャ、パラメトライズを活用した品質のあるテスト。',
      bookReference: '達人プログラマー 第41節',
      code: `"""pytest テスト設計のベストプラクティス"""
from dataclasses import dataclass
from typing import Optional

# ─── プロダクションコード ───
@dataclass
class Money:
    amount: int
    currency: str = "JPY"

    def add(self, other: 'Money') -> 'Money':
        if self.currency != other.currency:
            raise ValueError(f"通貨が異なります: {self.currency} vs {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def multiply(self, factor: int) -> 'Money':
        return Money(self.amount * factor, self.currency)

    def is_positive(self) -> bool:
        return self.amount > 0

class Wallet:
    def __init__(self, owner: str):
        self.owner = owner
        self._balances: dict[str, Money] = {}

    def deposit(self, money: Money) -> None:
        key = money.currency
        current = self._balances.get(key, Money(0, key))
        self._balances[key] = current.add(money)

    def balance(self, currency: str) -> int:
        return self._balances.get(currency, Money(0, currency)).amount

    def withdraw(self, money: Money) -> None:
        if self.balance(money.currency) < money.amount:
            raise ValueError("残高不足")
        current = self._balances[money.currency]
        self._balances[money.currency] = Money(
            current.amount - money.amount, money.currency
        )

# ─── テストコード ───

# --- Fixture的セットアップ ---
def create_wallet_with_balance(owner: str, amount: int) -> Wallet:
    wallet = Wallet(owner)
    wallet.deposit(Money(amount))
    return wallet

# --- 基本テスト: Arrange-Act-Assert ---
def test_money_add():
    # Arrange
    a = Money(1000)
    b = Money(2000)
    # Act
    result = a.add(b)
    # Assert
    assert result.amount == 3000
    assert result.currency == "JPY"

def test_money_different_currency_raises():
    jpy = Money(1000, "JPY")
    usd = Money(50, "USD")
    try:
        jpy.add(usd)
        assert False, "ValueError が発生するべき"
    except ValueError as e:
        assert "通貨が異なります" in str(e)

# --- パラメトライズ的テスト ---
def test_money_multiply_cases():
    cases = [
        (Money(100), 3, 300),
        (Money(0), 5, 0),
        (Money(999), 1, 999),
        (Money(50), 0, 0),
    ]
    for money, factor, expected in cases:
        result = money.multiply(factor)
        assert result.amount == expected, f"{money} * {factor} should be {expected}"

# --- 統合テスト ---
def test_wallet_deposit_and_withdraw():
    wallet = create_wallet_with_balance("田中", 10000)
    assert wallet.balance("JPY") == 10000

    wallet.withdraw(Money(3000))
    assert wallet.balance("JPY") == 7000

def test_wallet_insufficient_funds():
    wallet = create_wallet_with_balance("鈴木", 1000)
    try:
        wallet.withdraw(Money(5000))
        assert False, "ValueError が発生するべき"
    except ValueError:
        assert wallet.balance("JPY") == 1000  # 残高変わらず

# ─── テスト実行 ───
tests = [
    test_money_add,
    test_money_different_currency_raises,
    test_money_multiply_cases,
    test_wallet_deposit_and_withdraw,
    test_wallet_insufficient_funds,
]
for t in tests:
    try:
        t()
        print(f"  ✅ {t.__name__}")
    except AssertionError as e:
        print(f"  ❌ {t.__name__}: {e}")`,
      highlights: [
        { startLine: 6, endLine: 20, color: '#f59e0b', label: 'プロダクションコード', explanation: 'テスト対象のMoney値オブジェクト' },
        { startLine: 47, endLine: 50, color: '#3b82f6', label: 'ファクトリー関数', explanation: 'テスト用セットアップを共通化（Fixture相当）' },
        { startLine: 53, endLine: 60, color: '#22c55e', label: 'AAA パターン', explanation: 'Arrange-Act-Assert の明確な3フェーズ構造' },
        { startLine: 72, endLine: 81, color: '#a855f7', label: 'パラメトライズ', explanation: '複数ケースをデータ駆動でテスト' },
      ],
      keyPoints: [
        'Arrange-Act-Assert の3フェーズ構造で書く',
        'ファクトリー関数でテストセットアップを共通化',
        'パラメトライズで複数ケースを効率的にテスト',
        '例外テストでエラーメッセージも検証する',
      ],
    },
    {
      id: 24,
      title: 'Async/Await Patterns',
      titleJa: '非同期パターン',
      difficulty: 'intermediate',
      category: 'Concurrency',
      description: 'asyncio を使った非同期プログラミングの基本パターン。並行実行とエラーハンドリング。',
      code: `import asyncio
from dataclasses import dataclass
from typing import Optional

@dataclass
class ApiResponse:
    url: str
    status: int
    data: str
    elapsed_ms: float

# ─── 非同期API呼び出し（シミュレート）───
async def fetch_api(url: str, delay: float = 0.5) -> ApiResponse:
    """APIリクエストをシミュレート"""
    import time
    start = time.perf_counter()
    await asyncio.sleep(delay)
    elapsed = (time.perf_counter() - start) * 1000
    return ApiResponse(url, 200, f"data from {url}", elapsed)

# ─── 並行実行パターン ───
async def fetch_all_concurrent(urls: list[str]) -> list[ApiResponse]:
    """複数URLを並行取得"""
    tasks = [fetch_api(url, delay=0.3) for url in urls]
    return await asyncio.gather(*tasks)

# ─── タイムアウト付き ───
async def fetch_with_timeout(url: str, timeout: float = 1.0) -> Optional[ApiResponse]:
    """タイムアウト付きフェッチ"""
    try:
        return await asyncio.wait_for(fetch_api(url, delay=0.5), timeout=timeout)
    except asyncio.TimeoutError:
        print(f"  ⏱ タイムアウト: {url}")
        return None

# ─── リトライ付き ───
async def fetch_with_retry(url: str, max_retries: int = 3) -> ApiResponse:
    """リトライ付きフェッチ"""
    for attempt in range(1, max_retries + 1):
        try:
            return await fetch_api(url, delay=0.2)
        except Exception as e:
            print(f"  ⚠ 試行{attempt}/{max_retries}: {e}")
            if attempt < max_retries:
                await asyncio.sleep(0.5 * attempt)
    raise RuntimeError(f"全リトライ失敗: {url}")

# ─── セマフォで並行数制限 ───
async def fetch_limited(urls: list[str], max_concurrent: int = 3) -> list[ApiResponse]:
    """並行数をセマフォで制限"""
    semaphore = asyncio.Semaphore(max_concurrent)
    async def _limited_fetch(url: str) -> ApiResponse:
        async with semaphore:
            print(f"  🔄 取得中: {url}")
            return await fetch_api(url, delay=0.3)
    tasks = [_limited_fetch(url) for url in urls]
    return await asyncio.gather(*tasks)

# ─── メイン ───
async def main():
    print("=== 並行取得 ===")
    urls = [f"https://api.example.com/item/{i}" for i in range(5)]
    results = await fetch_all_concurrent(urls)
    for r in results:
        print(f"  ✅ {r.url} ({r.elapsed_ms:.0f}ms)")

    print("\\n=== セマフォ制限付き ===")
    results = await fetch_limited(urls, max_concurrent=2)
    print(f"  完了: {len(results)}件")

    print("\\n=== タイムアウト付き ===")
    result = await fetch_with_timeout("https://slow.api.com", timeout=1.0)
    print(f"  結果: {result}")

asyncio.run(main())`,
      highlights: [
        { startLine: 13, endLine: 19, color: '#f59e0b', label: '非同期関数', explanation: 'async def で非同期関数を定義。await で制御を返す' },
        { startLine: 22, endLine: 25, color: '#22c55e', label: 'gather並行実行', explanation: 'asyncio.gather で複数タスクを同時実行' },
        { startLine: 28, endLine: 33, color: '#ef4444', label: 'タイムアウト', explanation: 'wait_for でタイムアウト制御' },
        { startLine: 49, endLine: 57, color: '#a855f7', label: 'セマフォ', explanation: 'Semaphore で並行実行数を制限' },
      ],
      keyPoints: [
        'asyncio.gather で複数の非同期処理を並行実行',
        'wait_for でタイムアウトを設定',
        'Semaphore で並行数を制限しリソースを保護',
        'リトライは指数バックオフで実装する',
      ],
    },

    // ─── Advanced 25-34 ───
    {
      id: 25,
      title: 'Clean Architecture',
      titleJa: 'クリーンアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'ビジネスロジックを中心に据え、フレームワーク・DB・UIから独立した層構造を設計する。',
      bookReference: 'Clean Architecture 第22章',
      code: `"""Clean Architecture — ユーザー登録ユースケース"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
import re

# ═══════════════════════════════════════
# Domain Layer（最内層: ビジネスルール）
# ═══════════════════════════════════════

@dataclass
class Email:
    """Value Object — メールアドレス"""
    value: str

    def __post_init__(self):
        if not re.match(r'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$', self.value):
            raise ValueError(f"無効なメールアドレス: {self.value}")

@dataclass
class UserId:
    """Value Object — ユーザーID"""
    value: int

@dataclass
class User:
    """Entity — ユーザー"""
    id: Optional[UserId]
    name: str
    email: Email
    created_at: datetime = field(default_factory=datetime.now)

    def change_email(self, new_email: Email) -> None:
        self.email = new_email

class UserRepository(ABC):
    """Port — ユーザーリポジトリ"""
    @abstractmethod
    def find_by_email(self, email: Email) -> Optional[User]: ...
    @abstractmethod
    def save(self, user: User) -> User: ...
    @abstractmethod
    def next_id(self) -> UserId: ...

class EventPublisher(ABC):
    """Port — イベント発行"""
    @abstractmethod
    def publish(self, event_name: str, data: dict) -> None: ...

# ═══════════════════════════════════════
# Application Layer（ユースケース）
# ═══════════════════════════════════════

@dataclass(frozen=True)
class RegisterUserCommand:
    """Input DTO"""
    name: str
    email: str

@dataclass(frozen=True)
class RegisterUserResult:
    """Output DTO"""
    user_id: int
    name: str
    email: str

class RegisterUserUseCase:
    """ユーザー登録ユースケース"""
    def __init__(self, repo: UserRepository, events: EventPublisher):
        self._repo = repo
        self._events = events

    def execute(self, command: RegisterUserCommand) -> RegisterUserResult:
        email = Email(command.email)
        existing = self._repo.find_by_email(email)
        if existing:
            raise ValueError(f"メールアドレス '{command.email}' は既に登録済みです")

        user = User(
            id=self._repo.next_id(),
            name=command.name,
            email=email,
        )
        saved = self._repo.save(user)

        self._events.publish("user.registered", {
            "user_id": saved.id.value if saved.id else 0,
            "name": saved.name,
            "email": saved.email.value,
        })

        return RegisterUserResult(
            user_id=saved.id.value if saved.id else 0,
            name=saved.name,
            email=saved.email.value,
        )

# ═══════════════════════════════════════
# Infrastructure Layer（外部実装）
# ═══════════════════════════════════════

class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._store: dict[int, User] = {}
        self._seq = 0

    def find_by_email(self, email: Email) -> Optional[User]:
        return next(
            (u for u in self._store.values() if u.email.value == email.value),
            None,
        )

    def save(self, user: User) -> User:
        uid = user.id.value if user.id else self._seq + 1
        self._store[uid] = user
        return user

    def next_id(self) -> UserId:
        self._seq += 1
        return UserId(self._seq)

class ConsoleEventPublisher(EventPublisher):
    def publish(self, event_name: str, data: dict) -> None:
        print(f"  📢 Event [{event_name}]: {data}")

# ═══════════════════════════════════════
# Presentation Layer（エントリポイント）
# ═══════════════════════════════════════

def main():
    repo = InMemoryUserRepository()
    events = ConsoleEventPublisher()
    use_case = RegisterUserUseCase(repo, events)

    commands = [
        RegisterUserCommand("田中太郎", "tanaka@example.com"),
        RegisterUserCommand("鈴木花子", "suzuki@example.com"),
    ]

    for cmd in commands:
        result = use_case.execute(cmd)
        print(f"  ✅ 登録完了: ID={result.user_id}, {result.name} <{result.email}>")

    # 重複テスト
    try:
        use_case.execute(RegisterUserCommand("田中次郎", "tanaka@example.com"))
    except ValueError as e:
        print(f"  ❌ {e}")

main()`,
      highlights: [
        { startLine: 12, endLine: 50, color: '#22c55e', label: 'Domain Layer', explanation: 'Value Object, Entity, Repository/Event の Port（抽象）。外部依存ゼロ' },
        { startLine: 55, endLine: 97, color: '#a855f7', label: 'Application Layer', explanation: 'ユースケース。Input/Output DTOで境界を明確化' },
        { startLine: 102, endLine: 125, color: '#3b82f6', label: 'Infrastructure', explanation: 'リポジトリ・イベント発行の具体実装' },
        { startLine: 130, endLine: 148, color: '#ec4899', label: 'Presentation', explanation: 'エントリポイント。依存を組み立てて実行' },
      ],
      keyPoints: [
        'Domain層は外部フレームワークに一切依存しない',
        'Port（抽象）をDomain層に、Adapter（実装）をInfra層に配置',
        'ユースケースはInput/Output DTOで境界を定義',
        'DI でInfra実装をユースケースに注入する',
        '依存の方向は常に外→内（依存性逆転の原則）',
      ],
    },
    {
      id: 26,
      title: 'Domain-Driven Design',
      titleJa: 'ドメイン駆動設計',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'Entity・Value Object・Aggregate・Domain Serviceの概念を用いた、ビジネスドメイン中心の設計。',
      bookReference: 'エリック・エヴァンスのDDD',
      code: `"""Domain-Driven Design — EC注文ドメイン"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from enum import Enum, auto
import uuid

# ═══════════════════════════════════════
# Value Objects（値オブジェクト）
# ═══════════════════════════════════════

@dataclass(frozen=True)
class Money:
    amount: int
    currency: str = "JPY"

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("金額は0以上である必要があります")

    def add(self, other: 'Money') -> 'Money':
        assert self.currency == other.currency
        return Money(self.amount + other.amount, self.currency)

    def multiply(self, qty: int) -> 'Money':
        return Money(self.amount * qty, self.currency)

    def __str__(self) -> str:
        return f"¥{self.amount:,}"

@dataclass(frozen=True)
class ProductId:
    value: str = field(default_factory=lambda: str(uuid.uuid4())[:8])

@dataclass(frozen=True)
class OrderId:
    value: str = field(default_factory=lambda: f"ORD-{uuid.uuid4().hex[:8].upper()}")

@dataclass(frozen=True)
class Quantity:
    value: int

    def __post_init__(self):
        if self.value <= 0:
            raise ValueError("数量は1以上必要です")
        if self.value > 99:
            raise ValueError("数量は99以下にしてください")

# ═══════════════════════════════════════
# Entities
# ═══════════════════════════════════════

@dataclass
class Product:
    id: ProductId
    name: str
    price: Money
    stock: int

    def is_available(self, qty: Quantity) -> bool:
        return self.stock >= qty.value

    def reserve(self, qty: Quantity) -> None:
        if not self.is_available(qty):
            raise ValueError(f"在庫不足: {self.name} (残り{self.stock}個)")
        self.stock -= qty.value

# ═══════════════════════════════════════
# Aggregate Root
# ═══════════════════════════════════════

class OrderStatus(Enum):
    DRAFT = auto()
    CONFIRMED = auto()
    SHIPPED = auto()
    CANCELLED = auto()

@dataclass
class OrderLine:
    product_id: ProductId
    product_name: str
    unit_price: Money
    quantity: Quantity

    @property
    def subtotal(self) -> Money:
        return self.unit_price.multiply(self.quantity.value)

@dataclass
class Order:
    """Aggregate Root — 注文"""
    id: OrderId
    customer_name: str
    lines: list[OrderLine] = field(default_factory=list)
    status: OrderStatus = OrderStatus.DRAFT
    created_at: datetime = field(default_factory=datetime.now)
    _events: list[dict] = field(default_factory=list, repr=False)

    def add_line(self, product: Product, qty: Quantity) -> None:
        if self.status != OrderStatus.DRAFT:
            raise ValueError("確定済み注文には追加できません")
        product.reserve(qty)
        self.lines.append(OrderLine(
            product_id=product.id,
            product_name=product.name,
            unit_price=product.price,
            quantity=qty,
        ))

    @property
    def total(self) -> Money:
        result = Money(0)
        for line in self.lines:
            result = result.add(line.subtotal)
        return result

    def confirm(self) -> None:
        if self.status != OrderStatus.DRAFT:
            raise ValueError("DRAFTの注文のみ確定できます")
        if not self.lines:
            raise ValueError("注文明細が空です")
        self.status = OrderStatus.CONFIRMED
        self._events.append({
            "type": "order.confirmed",
            "order_id": self.id.value,
            "total": self.total.amount,
        })

    def cancel(self) -> None:
        if self.status in (OrderStatus.SHIPPED, OrderStatus.CANCELLED):
            raise ValueError(f"{self.status.name}の注文はキャンセルできません")
        self.status = OrderStatus.CANCELLED
        self._events.append({"type": "order.cancelled", "order_id": self.id.value})

    def collect_events(self) -> list[dict]:
        events = list(self._events)
        self._events.clear()
        return events

# ═══════════════════════════════════════
# Domain Service
# ═══════════════════════════════════════

class OrderService:
    """ドメインサービス — 複数Aggregateをまたぐ処理"""
    def create_order(self, customer: str, items: list[tuple[Product, int]]) -> Order:
        order = Order(id=OrderId(), customer_name=customer)
        for product, qty in items:
            order.add_line(product, Quantity(qty))
        order.confirm()
        return order

# ─── 使用例 ───
laptop = Product(ProductId(), "ノートPC", Money(89800), stock=10)
mouse = Product(ProductId(), "マウス", Money(3980), stock=50)

service = OrderService()
order = service.create_order("田中太郎", [(laptop, 1), (mouse, 2)])

print(f"注文ID: {order.id.value}")
print(f"顧客: {order.customer_name}")
print(f"ステータス: {order.status.name}")
for line in order.lines:
    print(f"  {line.product_name} x{line.quantity.value} = {line.subtotal}")
print(f"合計: {order.total}")
print(f"在庫: {laptop.name}={laptop.stock}, {mouse.name}={mouse.stock}")
for event in order.collect_events():
    print(f"📢 {event}")`,
      highlights: [
        { startLine: 13, endLine: 49, color: '#f59e0b', label: 'Value Objects', explanation: '不変・等価性で比較。Money, ProductId, Quantity等' },
        { startLine: 54, endLine: 67, color: '#3b82f6', label: 'Entity', explanation: 'IDで識別可能な可変オブジェクト。ビジネスルールを持つ' },
        { startLine: 82, endLine: 140, color: '#22c55e', label: 'Aggregate Root', explanation: 'Order が集約のルート。整合性の境界を守る' },
        { startLine: 146, endLine: 153, color: '#a855f7', label: 'Domain Service', explanation: '複数集約をまたぐビジネスロジック' },
      ],
      keyPoints: [
        'Value Object は不変で等価性で比較する',
        'Entity は ID で識別し、ライフサイクルを持つ',
        'Aggregate Root が集約の整合性を保証する',
        'Domain Service は複数集約にまたがる処理を担当',
        'ドメインイベントで副作用を疎結合に通知',
      ],
    },
    {
      id: 27,
      title: 'Event Sourcing',
      titleJa: 'イベントソーシング',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '状態をイベントの集積として表現する。全変更履歴を保持し、任意時点の状態を再現可能にする。',
      code: `"""Event Sourcing — 銀行口座ドメイン"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from enum import Enum

# ═══════════════════════════════════════
# Events（イベント定義）
# ═══════════════════════════════════════

@dataclass(frozen=True)
class DomainEvent:
    aggregate_id: str
    timestamp: datetime = field(default_factory=datetime.now)
    version: int = 0

@dataclass(frozen=True)
class AccountOpened(DomainEvent):
    owner: str = ""
    initial_balance: int = 0

@dataclass(frozen=True)
class MoneyDeposited(DomainEvent):
    amount: int = 0
    description: str = ""

@dataclass(frozen=True)
class MoneyWithdrawn(DomainEvent):
    amount: int = 0
    description: str = ""

@dataclass(frozen=True)
class AccountClosed(DomainEvent):
    reason: str = ""

# ═══════════════════════════════════════
# Aggregate（イベントから状態を復元）
# ═══════════════════════════════════════

class BankAccount:
    def __init__(self, account_id: str):
        self.account_id = account_id
        self.owner = ""
        self.balance = 0
        self.is_closed = False
        self._version = 0
        self._pending_events: list[DomainEvent] = []
        self._history: list[DomainEvent] = []

    # ─── コマンドメソッド ───
    def open(self, owner: str, initial_balance: int = 0) -> None:
        if self.owner:
            raise ValueError("既に口座が開設済みです")
        self._apply(AccountOpened(
            aggregate_id=self.account_id, owner=owner,
            initial_balance=initial_balance,
        ))

    def deposit(self, amount: int, description: str = "") -> None:
        if self.is_closed:
            raise ValueError("閉鎖された口座には入金できません")
        if amount <= 0:
            raise ValueError("入金額は正の数が必要です")
        self._apply(MoneyDeposited(
            aggregate_id=self.account_id, amount=amount, description=description,
        ))

    def withdraw(self, amount: int, description: str = "") -> None:
        if self.is_closed:
            raise ValueError("閉鎖された口座からは出金できません")
        if amount > self.balance:
            raise ValueError(f"残高不足: 残高¥{self.balance:,} < 出金¥{amount:,}")
        self._apply(MoneyWithdrawn(
            aggregate_id=self.account_id, amount=amount, description=description,
        ))

    def close(self, reason: str = "") -> None:
        if self.is_closed:
            raise ValueError("既に閉鎖済みです")
        if self.balance > 0:
            raise ValueError(f"残高¥{self.balance:,}がまだあります")
        self._apply(AccountClosed(aggregate_id=self.account_id, reason=reason))

    # ─── Event Handling ───
    def _apply(self, event: DomainEvent) -> None:
        self._version += 1
        versioned = type(event)(**{**event.__dict__, 'version': self._version})
        self._handle(versioned)
        self._pending_events.append(versioned)

    def _handle(self, event: DomainEvent) -> None:
        if isinstance(event, AccountOpened):
            self.owner = event.owner
            self.balance = event.initial_balance
        elif isinstance(event, MoneyDeposited):
            self.balance += event.amount
        elif isinstance(event, MoneyWithdrawn):
            self.balance -= event.amount
        elif isinstance(event, AccountClosed):
            self.is_closed = True
        self._history.append(event)

    # ─── 復元 ───
    @classmethod
    def from_events(cls, account_id: str, events: list[DomainEvent]) -> 'BankAccount':
        account = cls(account_id)
        for event in events:
            account._handle(event)
            account._version = event.version
        return account

    def collect_pending(self) -> list[DomainEvent]:
        events = list(self._pending_events)
        self._pending_events.clear()
        return events

# ═══════════════════════════════════════
# Event Store
# ═══════════════════════════════════════

class InMemoryEventStore:
    def __init__(self):
        self._store: dict[str, list[DomainEvent]] = {}

    def save(self, events: list[DomainEvent]) -> None:
        for event in events:
            self._store.setdefault(event.aggregate_id, []).append(event)

    def load(self, aggregate_id: str) -> list[DomainEvent]:
        return list(self._store.get(aggregate_id, []))

    def all_events(self) -> list[DomainEvent]:
        return [e for events in self._store.values() for e in events]

# ─── 使用例 ───
store = InMemoryEventStore()

account = BankAccount("ACC-001")
account.open("田中太郎", initial_balance=100000)
account.deposit(50000, "給与振込")
account.withdraw(20000, "ATM出金")
account.withdraw(30000, "家賃")

# イベントを永続化
store.save(account.collect_pending())

# イベントから復元
restored = BankAccount.from_events("ACC-001", store.load("ACC-001"))
print(f"口座: {restored.owner}")
print(f"残高: ¥{restored.balance:,}")
print(f"\\n─── イベント履歴 ───")
for e in store.load("ACC-001"):
    name = type(e).__name__
    if isinstance(e, MoneyDeposited):
        print(f"  v{e.version} 入金 +¥{e.amount:,} ({e.description})")
    elif isinstance(e, MoneyWithdrawn):
        print(f"  v{e.version} 出金 -¥{e.amount:,} ({e.description})")
    else:
        print(f"  v{e.version} {name}")`,
      highlights: [
        { startLine: 12, endLine: 37, color: '#f59e0b', label: 'Domain Events', explanation: '不変のイベントデータ。全ての状態変化を記録' },
        { startLine: 42, endLine: 108, color: '#22c55e', label: 'Event-Sourced Aggregate', explanation: 'コマンド→イベント生成→状態更新。from_eventsで復元' },
        { startLine: 113, endLine: 124, color: '#3b82f6', label: 'Event Store', explanation: 'イベントの永続化層。時系列で保存' },
      ],
      keyPoints: [
        '状態ではなくイベントの列を永続化する',
        'from_events でイベントを再生して状態を復元',
        'コマンドメソッドがイベントを生成し _apply で状態更新',
        '全変更履歴が残り、任意時点の状態を再現可能',
        'Event Store がイベントの永続化・読み込みを担当',
      ],
    },
    {
      id: 28,
      title: 'CQRS Pattern',
      titleJa: 'CQRSパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'コマンド（書き込み）とクエリ（読み取り）を分離し、それぞれ最適化する設計パターン。',
      code: `"""CQRS — 商品管理システム"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

# ═══════════════════════════════════════
# Commands（書き込み側）
# ═══════════════════════════════════════

@dataclass(frozen=True)
class CreateProductCommand:
    name: str
    price: int
    category: str
    stock: int

@dataclass(frozen=True)
class UpdatePriceCommand:
    product_id: int
    new_price: int

@dataclass(frozen=True)
class AddStockCommand:
    product_id: int
    quantity: int

# ─── Write Model ───
@dataclass
class ProductWriteModel:
    id: int
    name: str
    price: int
    category: str
    stock: int
    version: int = 1
    updated_at: datetime = field(default_factory=datetime.now)

class ProductWriteRepository(ABC):
    @abstractmethod
    def save(self, product: ProductWriteModel) -> ProductWriteModel: ...
    @abstractmethod
    def find_by_id(self, product_id: int) -> Optional[ProductWriteModel]: ...
    @abstractmethod
    def next_id(self) -> int: ...

# ─── Command Handlers ───
class ProductCommandHandler:
    def __init__(self, repo: ProductWriteRepository, projector: 'ReadModelProjector'):
        self._repo = repo
        self._projector = projector

    def handle_create(self, cmd: CreateProductCommand) -> int:
        product = ProductWriteModel(
            id=self._repo.next_id(),
            name=cmd.name, price=cmd.price,
            category=cmd.category, stock=cmd.stock,
        )
        saved = self._repo.save(product)
        self._projector.project_product(saved)
        print(f"  ✅ 商品作成: {saved.id} - {saved.name}")
        return saved.id

    def handle_update_price(self, cmd: UpdatePriceCommand) -> None:
        product = self._repo.find_by_id(cmd.product_id)
        if not product:
            raise ValueError(f"商品ID {cmd.product_id} が見つかりません")
        product.price = cmd.new_price
        product.version += 1
        product.updated_at = datetime.now()
        self._repo.save(product)
        self._projector.project_product(product)
        print(f"  ✅ 価格変更: {product.name} → ¥{cmd.new_price:,}")

# ═══════════════════════════════════════
# Queries（読み取り側）
# ═══════════════════════════════════════

@dataclass(frozen=True)
class ProductListItem:
    id: int
    name: str
    price_display: str
    category: str
    in_stock: bool

@dataclass(frozen=True)
class ProductDetail:
    id: int
    name: str
    price: int
    price_display: str
    category: str
    stock: int
    last_updated: str

class ProductQueryService(ABC):
    @abstractmethod
    def list_by_category(self, category: str) -> list[ProductListItem]: ...
    @abstractmethod
    def get_detail(self, product_id: int) -> Optional[ProductDetail]: ...

# ═══════════════════════════════════════
# Infrastructure
# ═══════════════════════════════════════

class InMemoryWriteRepo(ProductWriteRepository):
    def __init__(self):
        self._store: dict[int, ProductWriteModel] = {}
        self._seq = 0
    def save(self, p: ProductWriteModel) -> ProductWriteModel:
        self._store[p.id] = p
        return p
    def find_by_id(self, pid: int) -> Optional[ProductWriteModel]:
        return self._store.get(pid)
    def next_id(self) -> int:
        self._seq += 1
        return self._seq

class ReadModelProjector:
    """Write側の変更をRead Modelに反映"""
    def __init__(self):
        self._list_items: dict[int, ProductListItem] = {}
        self._details: dict[int, ProductDetail] = {}

    def project_product(self, p: ProductWriteModel) -> None:
        self._list_items[p.id] = ProductListItem(
            id=p.id, name=p.name,
            price_display=f"¥{p.price:,}",
            category=p.category, in_stock=p.stock > 0,
        )
        self._details[p.id] = ProductDetail(
            id=p.id, name=p.name, price=p.price,
            price_display=f"¥{p.price:,}",
            category=p.category, stock=p.stock,
            last_updated=p.updated_at.strftime("%Y-%m-%d %H:%M"),
        )

class InMemoryQueryService(ProductQueryService):
    def __init__(self, projector: ReadModelProjector):
        self._projector = projector
    def list_by_category(self, category: str) -> list[ProductListItem]:
        return [p for p in self._projector._list_items.values() if p.category == category]
    def get_detail(self, pid: int) -> Optional[ProductDetail]:
        return self._projector._details.get(pid)

# ─── 使用例 ───
projector = ReadModelProjector()
write_repo = InMemoryWriteRepo()
cmd_handler = ProductCommandHandler(write_repo, projector)
query_svc = InMemoryQueryService(projector)

# Commands
id1 = cmd_handler.handle_create(CreateProductCommand("ノートPC", 89800, "PC", 10))
id2 = cmd_handler.handle_create(CreateProductCommand("デスクトップ", 129800, "PC", 5))
id3 = cmd_handler.handle_create(CreateProductCommand("マウス", 3980, "周辺機器", 50))
cmd_handler.handle_update_price(UpdatePriceCommand(id1, 79800))

# Queries
print("\\n─── PC カテゴリ一覧 ───")
for item in query_svc.list_by_category("PC"):
    stock = "✅" if item.in_stock else "❌"
    print(f"  {stock} {item.name} - {item.price_display}")

print("\\n─── 商品詳細 ───")
detail = query_svc.get_detail(id1)
if detail:
    print(f"  {detail.name}: {detail.price_display} (在庫{detail.stock}) 更新:{detail.last_updated}")`,
      highlights: [
        { startLine: 11, endLine: 28, color: '#f59e0b', label: 'Commands', explanation: '書き込み意図を表す不変のコマンドオブジェクト' },
        { startLine: 50, endLine: 75, color: '#22c55e', label: 'Command Handler', explanation: 'コマンドを受け取り、Write Modelを更新し、Read Modelに投影' },
        { startLine: 80, endLine: 100, color: '#a855f7', label: 'Read Model', explanation: '読み取り専用の最適化されたデータ構造' },
        { startLine: 117, endLine: 139, color: '#3b82f6', label: 'Projector', explanation: 'Write→Read への変換・投影を担当' },
      ],
      keyPoints: [
        'Command（書き込み）とQuery（読み取り）を完全分離',
        'Write Model は正規化、Read Model は非正規化で最適化',
        'Projector が Write→Read の投影を担当',
        'それぞれを独立にスケーリング・最適化可能',
      ],
    },
    {
      id: 29,
      title: 'Plugin Architecture',
      titleJa: 'プラグインアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '拡張可能なプラグインシステムの設計。本体を変更せずに機能を追加できるアーキテクチャ。',
      bookReference: '達人プログラマー 第17節',
      code: `"""Plugin Architecture — テキスト処理フレームワーク"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Callable

# ═══════════════════════════════════════
# Plugin Interface
# ═══════════════════════════════════════

@dataclass
class PluginInfo:
    name: str
    version: str
    description: str

class TextPlugin(ABC):
    """テキスト処理プラグインの基底クラス"""
    @abstractmethod
    def info(self) -> PluginInfo: ...

    @abstractmethod
    def process(self, text: str, **options: Any) -> str: ...

    def on_load(self) -> None:
        """プラグインロード時のフック"""
        pass

    def on_unload(self) -> None:
        """プラグインアンロード時のフック"""
        pass

# ═══════════════════════════════════════
# Plugin Manager
# ═══════════════════════════════════════

class PluginManager:
    def __init__(self):
        self._plugins: dict[str, TextPlugin] = {}
        self._hooks: dict[str, list[Callable]] = {}

    def register(self, plugin: TextPlugin) -> None:
        info = plugin.info()
        self._plugins[info.name] = plugin
        plugin.on_load()
        print(f"  📦 Loaded: {info.name} v{info.version}")

    def unregister(self, name: str) -> None:
        plugin = self._plugins.pop(name, None)
        if plugin:
            plugin.on_unload()
            print(f"  📦 Unloaded: {name}")

    def get(self, name: str) -> TextPlugin | None:
        return self._plugins.get(name)

    def list_plugins(self) -> list[PluginInfo]:
        return [p.info() for p in self._plugins.values()]

    def process_pipeline(self, text: str, plugin_names: list[str], **options: Any) -> str:
        result = text
        for name in plugin_names:
            plugin = self._plugins.get(name)
            if plugin:
                result = plugin.process(result, **options)
        return result

# ═══════════════════════════════════════
# Concrete Plugins
# ═══════════════════════════════════════

class UpperCasePlugin(TextPlugin):
    def info(self) -> PluginInfo:
        return PluginInfo("uppercase", "1.0.0", "テキストを大文字に変換")
    def process(self, text: str, **options: Any) -> str:
        return text.upper()

class TrimPlugin(TextPlugin):
    def info(self) -> PluginInfo:
        return PluginInfo("trim", "1.0.0", "前後の空白を除去")
    def process(self, text: str, **options: Any) -> str:
        return "\\n".join(line.strip() for line in text.split("\\n"))

class WordCountPlugin(TextPlugin):
    def info(self) -> PluginInfo:
        return PluginInfo("wordcount", "1.0.0", "単語数をヘッダーに追加")
    def process(self, text: str, **options: Any) -> str:
        count = len(text.split())
        return f"[Words: {count}]\\n{text}"

class CensorPlugin(TextPlugin):
    def __init__(self, banned_words: list[str]):
        self._banned = banned_words
    def info(self) -> PluginInfo:
        return PluginInfo("censor", "1.0.0", f"禁止語句をマスク ({len(self._banned)}語)")
    def process(self, text: str, **options: Any) -> str:
        result = text
        for word in self._banned:
            result = result.replace(word, "*" * len(word))
        return result

class MarkdownHeaderPlugin(TextPlugin):
    def info(self) -> PluginInfo:
        return PluginInfo("md-header", "1.0.0", "Markdownヘッダーを追加")
    def process(self, text: str, **options: Any) -> str:
        title = options.get("title", "Untitled")
        author = options.get("author", "Unknown")
        header = f"# {title}\\n> Author: {author}\\n---\\n"
        return header + text

# ═══════════════════════════════════════
# 使用例
# ═══════════════════════════════════════

manager = PluginManager()
manager.register(TrimPlugin())
manager.register(UpperCasePlugin())
manager.register(WordCountPlugin())
manager.register(CensorPlugin(["spam", "viagra"]))
manager.register(MarkdownHeaderPlugin())

print("\\n─── 登録プラグイン ───")
for info in manager.list_plugins():
    print(f"  • {info.name} v{info.version}: {info.description}")

original = "  Hello World! This is a spam test.  "
print(f"\\n元テキスト: '{original}'")

result = manager.process_pipeline(
    original,
    ["trim", "censor", "uppercase", "wordcount", "md-header"],
    title="テスト文書",
    author="miruky",
)
print(f"\\n─── 加工結果 ───\\n{result}")`,
      highlights: [
        { startLine: 10, endLine: 31, color: '#a855f7', label: 'Plugin Interface', explanation: 'info/process/on_load/on_unloadの統一インターフェース' },
        { startLine: 36, endLine: 64, color: '#22c55e', label: 'Plugin Manager', explanation: '登録・解除・パイプライン実行を管理するコアエンジン' },
        { startLine: 69, endLine: 110, color: '#3b82f6', label: '具体プラグイン群', explanation: '各プラグインは独立して開発・テスト可能' },
        { startLine: 118, endLine: 130, color: '#ec4899', label: 'パイプライン実行', explanation: '複数プラグインを順序付きで適用' },
      ],
      keyPoints: [
        '統一インターフェースで拡張ポイントを定義する',
        'PluginManager が登録・解除・実行を管理',
        'パイプラインで複数プラグインを順序付き実行',
        '新規プラグインの追加が本体コードに影響しない',
        'on_load/on_unload フックでライフサイクル管理',
      ],
    },
    {
      id: 30,
      title: 'Pipeline Pattern',
      titleJa: 'パイプラインパターン',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'データを一連の処理ステージに順次通す。各ステージは独立してテスト・差し替え可能。',
      bookReference: '達人プログラマー 第30節',
      code: `"""Pipeline Pattern — ETLデータ処理"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import TypeVar, Generic, Any
from datetime import datetime

T = TypeVar("T")

# ═══════════════════════════════════════
# Pipeline Framework
# ═══════════════════════════════════════

@dataclass
class PipelineContext:
    """パイプライン実行コンテキスト"""
    data: Any = None
    metadata: dict[str, Any] = field(default_factory=dict)
    errors: list[str] = field(default_factory=list)
    started_at: datetime = field(default_factory=datetime.now)

    @property
    def has_errors(self) -> bool:
        return len(self.errors) > 0

class Stage(ABC):
    """パイプラインのステージ"""
    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    def process(self, ctx: PipelineContext) -> PipelineContext: ...

class Pipeline:
    """ステージを連結して実行するパイプライン"""
    def __init__(self, name: str):
        self._name = name
        self._stages: list[Stage] = []

    def add_stage(self, stage: Stage) -> 'Pipeline':
        self._stages.append(stage)
        return self

    def execute(self, data: Any) -> PipelineContext:
        ctx = PipelineContext(data=data)
        print(f"🚀 パイプライン '{self._name}' 開始")
        for stage in self._stages:
            if ctx.has_errors:
                print(f"  ⏭ スキップ: {stage.name} (エラー発生済み)")
                continue
            print(f"  ▶ {stage.name}")
            try:
                ctx = stage.process(ctx)
            except Exception as e:
                ctx.errors.append(f"{stage.name}: {e}")
                print(f"  ❌ エラー: {e}")
        elapsed = (datetime.now() - ctx.started_at).total_seconds()
        status = "❌ 失敗" if ctx.has_errors else "✅ 成功"
        print(f"🏁 {status} ({elapsed:.3f}秒)")
        return ctx

# ═══════════════════════════════════════
# ETL Stages
# ═══════════════════════════════════════

@dataclass
class RawRecord:
    name: str
    email: str
    age: str
    score: str

@dataclass
class CleanRecord:
    name: str
    email: str
    age: int
    score: float

class ExtractStage(Stage):
    @property
    def name(self) -> str:
        return "Extract（抽出）"

    def process(self, ctx: PipelineContext) -> PipelineContext:
        raw_data: list[dict[str, str]] = ctx.data
        records = [RawRecord(**row) for row in raw_data]
        ctx.data = records
        ctx.metadata["extracted_count"] = len(records)
        print(f"    {len(records)}件抽出")
        return ctx

class ValidateStage(Stage):
    @property
    def name(self) -> str:
        return "Validate（検証）"

    def process(self, ctx: PipelineContext) -> PipelineContext:
        records: list[RawRecord] = ctx.data
        valid, invalid = [], 0
        for r in records:
            if "@" in r.email and r.age.isdigit() and r.score.replace(".", "").isdigit():
                valid.append(r)
            else:
                invalid += 1
        ctx.data = valid
        ctx.metadata["valid_count"] = len(valid)
        ctx.metadata["invalid_count"] = invalid
        print(f"    有効: {len(valid)}, 無効: {invalid}")
        return ctx

class TransformStage(Stage):
    @property
    def name(self) -> str:
        return "Transform（変換）"

    def process(self, ctx: PipelineContext) -> PipelineContext:
        raw: list[RawRecord] = ctx.data
        clean = [
            CleanRecord(
                name=r.name.strip(),
                email=r.email.lower().strip(),
                age=int(r.age),
                score=round(float(r.score), 2),
            )
            for r in raw
        ]
        ctx.data = clean
        print(f"    {len(clean)}件変換")
        return ctx

class AggregateStage(Stage):
    @property
    def name(self) -> str:
        return "Aggregate（集計）"

    def process(self, ctx: PipelineContext) -> PipelineContext:
        records: list[CleanRecord] = ctx.data
        if not records:
            return ctx
        avg_age = sum(r.age for r in records) / len(records)
        avg_score = sum(r.score for r in records) / len(records)
        top = max(records, key=lambda r: r.score)
        ctx.metadata["avg_age"] = round(avg_age, 1)
        ctx.metadata["avg_score"] = round(avg_score, 2)
        ctx.metadata["top_scorer"] = top.name
        print(f"    平均年齢: {avg_age:.1f}, 平均スコア: {avg_score:.2f}")
        print(f"    最高スコア: {top.name} ({top.score})")
        return ctx

class LoadStage(Stage):
    @property
    def name(self) -> str:
        return "Load（格納）"

    def process(self, ctx: PipelineContext) -> PipelineContext:
        records: list[CleanRecord] = ctx.data
        print(f"    {len(records)}件を保存完了")
        ctx.metadata["loaded_count"] = len(records)
        return ctx

# ─── 使用例 ───
raw_data = [
    {"name": "田中太郎", "email": "tanaka@ex.com", "age": "28", "score": "85.5"},
    {"name": "鈴木花子", "email": "SUZUKI@EX.COM", "age": "35", "score": "92.3"},
    {"name": "佐藤次郎", "email": "invalid", "age": "abc", "score": "70.0"},
    {"name": "高橋美咲", "email": "takahashi@ex.com", "age": "42", "score": "88.1"},
]

pipeline = (
    Pipeline("ユーザーデータ ETL")
    .add_stage(ExtractStage())
    .add_stage(ValidateStage())
    .add_stage(TransformStage())
    .add_stage(AggregateStage())
    .add_stage(LoadStage())
)

result = pipeline.execute(raw_data)
print(f"\\nメタデータ: {result.metadata}")`,
      highlights: [
        { startLine: 13, endLine: 24, color: '#f59e0b', label: 'Context', explanation: 'ステージ間でデータとメタデータを受け渡す共有コンテキスト' },
        { startLine: 26, endLine: 32, color: '#a855f7', label: 'Stage ABC', explanation: 'name と process を持つステージの基底クラス' },
        { startLine: 34, endLine: 58, color: '#22c55e', label: 'Pipeline Engine', explanation: 'ステージを順次実行。エラー時はスキップ。経過時間計測' },
        { startLine: 79, endLine: 155, color: '#3b82f6', label: 'ETL Stages', explanation: 'Extract→Validate→Transform→Aggregate→Load の各ステージ' },
      ],
      keyPoints: [
        'PipelineContext でステージ間のデータ受け渡し',
        '各ステージは独立してテスト・差し替え可能',
        'Pipeline がエラーハンドリングと実行順序を管理',
        'メソッドチェーンでパイプラインを宣言的に構築',
        'メタデータで実行統計を収集',
      ],
    },
    {
      id: 31,
      title: 'Circuit Breaker',
      titleJa: 'サーキットブレーカー',
      difficulty: 'advanced',
      category: 'Architecture',
      description: '外部サービス障害時にカスケード障害を防ぐ耐障害性パターン。Open/HalfOpen/Closed状態を管理する。',
      code: `"""Circuit Breaker Pattern — 耐障害性設計"""
from enum import Enum, auto
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Callable, TypeVar, Any
import random

T = TypeVar("T")

class CircuitState(Enum):
    CLOSED = auto()      # 正常: リクエストを通す
    OPEN = auto()        # 遮断: リクエストを即時拒否
    HALF_OPEN = auto()   # 試行: 限定的にリクエストを通す

@dataclass
class CircuitStats:
    total_calls: int = 0
    failures: int = 0
    successes: int = 0
    last_failure_time: datetime | None = None
    consecutive_failures: int = 0

class CircuitBreakerError(Exception):
    pass

class CircuitBreaker:
    def __init__(
        self,
        name: str,
        failure_threshold: int = 5,
        recovery_timeout: float = 30.0,
        half_open_max_calls: int = 3,
    ):
        self.name = name
        self._failure_threshold = failure_threshold
        self._recovery_timeout = timedelta(seconds=recovery_timeout)
        self._half_open_max_calls = half_open_max_calls
        self._state = CircuitState.CLOSED
        self._stats = CircuitStats()
        self._half_open_calls = 0

    @property
    def state(self) -> CircuitState:
        if self._state == CircuitState.OPEN:
            if self._should_try_recovery():
                self._transition_to(CircuitState.HALF_OPEN)
        return self._state

    def _should_try_recovery(self) -> bool:
        if self._stats.last_failure_time is None:
            return False
        return datetime.now() - self._stats.last_failure_time >= self._recovery_timeout

    def call(self, func: Callable[..., T], *args: Any, **kwargs: Any) -> T:
        current_state = self.state

        if current_state == CircuitState.OPEN:
            raise CircuitBreakerError(
                f"Circuit '{self.name}' is OPEN. "
                f"Retry after {self._recovery_timeout.total_seconds()}s"
            )

        if current_state == CircuitState.HALF_OPEN:
            if self._half_open_calls >= self._half_open_max_calls:
                raise CircuitBreakerError(f"Circuit '{self.name}' HALF_OPEN limit reached")
            self._half_open_calls += 1

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _on_success(self) -> None:
        self._stats.total_calls += 1
        self._stats.successes += 1
        self._stats.consecutive_failures = 0
        if self._state == CircuitState.HALF_OPEN:
            self._transition_to(CircuitState.CLOSED)
            self._half_open_calls = 0

    def _on_failure(self) -> None:
        self._stats.total_calls += 1
        self._stats.failures += 1
        self._stats.consecutive_failures += 1
        self._stats.last_failure_time = datetime.now()
        if self._stats.consecutive_failures >= self._failure_threshold:
            self._transition_to(CircuitState.OPEN)
        elif self._state == CircuitState.HALF_OPEN:
            self._transition_to(CircuitState.OPEN)

    def _transition_to(self, new_state: CircuitState) -> None:
        if self._state != new_state:
            print(f"  ⚡ [{self.name}] {self._state.name} → {new_state.name}")
            self._state = new_state

    def get_stats(self) -> dict[str, Any]:
        return {
            "state": self.state.name,
            "total": self._stats.total_calls,
            "successes": self._stats.successes,
            "failures": self._stats.failures,
            "consecutive_failures": self._stats.consecutive_failures,
        }

# ─── 使用例 ───
def unreliable_api_call(success_rate: float = 0.3) -> str:
    """不安定なAPI呼び出しをシミュレート"""
    if random.random() > success_rate:
        raise ConnectionError("API接続失敗")
    return "API応答OK"

breaker = CircuitBreaker("payment-api", failure_threshold=3, recovery_timeout=2.0)

print("=== サーキットブレーカー テスト ===")
for i in range(10):
    try:
        result = breaker.call(unreliable_api_call, success_rate=0.3)
        print(f"  ✅ 呼び出し{i+1}: {result}")
    except CircuitBreakerError as e:
        print(f"  🔴 呼び出し{i+1}: 遮断 - {e}")
    except ConnectionError:
        print(f"  ⚠ 呼び出し{i+1}: 接続エラー")

print(f"\\n📊 統計: {breaker.get_stats()}")`,
      highlights: [
        { startLine: 10, endLine: 14, color: '#f59e0b', label: '3状態', explanation: 'CLOSED=正常, OPEN=遮断, HALF_OPEN=試行の3状態' },
        { startLine: 27, endLine: 42, color: '#22c55e', label: 'ブレーカー設定', explanation: '閾値・回復タイムアウト・試行上限を設定' },
        { startLine: 56, endLine: 75, color: '#a855f7', label: 'call メソッド', explanation: '状態に応じてリクエストを通す/遮断する中核ロジック' },
        { startLine: 77, endLine: 95, color: '#3b82f6', label: '状態遷移', explanation: '成功で回復、連続失敗で遮断、タイムアウト後に試行開始' },
      ],
      keyPoints: [
        'CLOSED→OPEN→HALF_OPEN→CLOSED の状態遷移',
        '連続失敗が閾値を超えると回路を遮断（OPEN）',
        '回復タイムアウト後に限定的に試行（HALF_OPEN）',
        '成功すれば回復（CLOSED）、失敗すれば再遮断',
        'カスケード障害を防ぐ耐障害性パターン',
      ],
    },
    {
      id: 32,
      title: 'Abstract Factory with DI',
      titleJa: '抽象ファクトリーとDI',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: '関連するオブジェクト群を一貫して生成する抽象ファクトリー。DIコンテナと組み合わせる。',
      code: `"""Abstract Factory + DI Container"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any

# ═══════════════════════════════════════
# Product Interfaces
# ═══════════════════════════════════════

class Button(ABC):
    @abstractmethod
    def render(self) -> str: ...

class TextInput(ABC):
    @abstractmethod
    def render(self) -> str: ...

class Card(ABC):
    @abstractmethod
    def render(self, title: str, content: str) -> str: ...

# ═══════════════════════════════════════
# Dark Theme Products
# ═══════════════════════════════════════

class DarkButton(Button):
    def render(self) -> str:
        return "[Dark Button: bg-gray-800 text-white border-gray-600]"

class DarkTextInput(TextInput):
    def render(self) -> str:
        return "[Dark Input: bg-gray-900 text-gray-100 border-gray-700]"

class DarkCard(Card):
    def render(self, title: str, content: str) -> str:
        return f"[Dark Card: bg-gray-850] {title}: {content}"

# ═══════════════════════════════════════
# Light Theme Products
# ═══════════════════════════════════════

class LightButton(Button):
    def render(self) -> str:
        return "[Light Button: bg-white text-gray-900 border-gray-300]"

class LightTextInput(TextInput):
    def render(self) -> str:
        return "[Light Input: bg-gray-50 text-gray-900 border-gray-300]"

class LightCard(Card):
    def render(self, title: str, content: str) -> str:
        return f"[Light Card: bg-white shadow-md] {title}: {content}"

# ═══════════════════════════════════════
# Abstract Factory
# ═══════════════════════════════════════

class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: ...
    @abstractmethod
    def create_text_input(self) -> TextInput: ...
    @abstractmethod
    def create_card(self) -> Card: ...

class DarkThemeFactory(UIFactory):
    def create_button(self) -> Button:
        return DarkButton()
    def create_text_input(self) -> TextInput:
        return DarkTextInput()
    def create_card(self) -> Card:
        return DarkCard()

class LightThemeFactory(UIFactory):
    def create_button(self) -> Button:
        return LightButton()
    def create_text_input(self) -> TextInput:
        return LightTextInput()
    def create_card(self) -> Card:
        return LightCard()

# ═══════════════════════════════════════
# Simple DI Container
# ═══════════════════════════════════════

class DIContainer:
    def __init__(self):
        self._factories: dict[type, Any] = {}
        self._singletons: dict[type, Any] = {}

    def register(self, interface: type, factory: Any, singleton: bool = False) -> None:
        self._factories[interface] = (factory, singleton)

    def resolve(self, interface: type) -> Any:
        if interface in self._singletons:
            return self._singletons[interface]
        entry = self._factories.get(interface)
        if not entry:
            raise ValueError(f"未登録: {interface.__name__}")
        factory, is_singleton = entry
        instance = factory() if callable(factory) else factory
        if is_singleton:
            self._singletons[interface] = instance
        return instance

# ═══════════════════════════════════════
# Application（UI Factory を利用）
# ═══════════════════════════════════════

class LoginPage:
    def __init__(self, ui: UIFactory):
        self._ui = ui

    def render(self) -> None:
        print("  ─── Login Page ───")
        print(f"    {self._ui.create_card().render('ログイン', '認証情報を入力')}")
        print(f"    Email: {self._ui.create_text_input().render()}")
        print(f"    Password: {self._ui.create_text_input().render()}")
        print(f"    {self._ui.create_button().render()}")

# ─── 使用例 ───
container = DIContainer()

# テーマ切替: ここを変えるだけで全UI変更
container.register(UIFactory, DarkThemeFactory, singleton=True)

# 解決 & 利用
factory = container.resolve(UIFactory)
page = LoginPage(factory)

print("=== Dark Theme ===")
page.render()

# テーマ変更
container._singletons.clear()
container.register(UIFactory, LightThemeFactory, singleton=True)
factory = container.resolve(UIFactory)
page = LoginPage(factory)

print("\\n=== Light Theme ===")
page.render()`,
      highlights: [
        { startLine: 9, endLine: 21, color: '#a855f7', label: 'Product Interfaces', explanation: 'UI部品の抽象インターフェース' },
        { startLine: 59, endLine: 80, color: '#22c55e', label: 'Abstract Factory', explanation: 'テーマごとに一貫したUI部品群を生成' },
        { startLine: 86, endLine: 105, color: '#3b82f6', label: 'DI Container', explanation: 'インターフェース→実装のマッピングとシングルトン管理' },
        { startLine: 111, endLine: 121, color: '#ec4899', label: 'Application', explanation: 'UIFactory を注入され、テーマを知らずにUIを構築' },
      ],
      keyPoints: [
        'Abstract Factory で関連オブジェクト群の一貫性を保証',
        'DI Container でインターフェース→実装の解決を一元管理',
        'シングルトンスコープで共有インスタンスを管理',
        'テーマ切替は DI 登録を変えるだけで全UI反映',
      ],
    },
    {
      id: 33,
      title: 'Mediator Pattern',
      titleJa: 'メディエータパターン',
      difficulty: 'advanced',
      category: 'Design Patterns',
      description: 'オブジェクト間の直接通信を排除し、仲介者を通じたやり取りに集約する。複雑な相互依存を解消。',
      code: `"""Mediator Pattern — チャットルームシステム"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

# ═══════════════════════════════════════
# Mediator Interface
# ═══════════════════════════════════════

class ChatMediator(ABC):
    @abstractmethod
    def send_message(self, message: str, sender: 'ChatUser', target: Optional[str] = None) -> None: ...
    @abstractmethod
    def add_user(self, user: 'ChatUser') -> None: ...
    @abstractmethod
    def remove_user(self, user: 'ChatUser') -> None: ...

# ═══════════════════════════════════════
# Colleague
# ═══════════════════════════════════════

class ChatUser:
    def __init__(self, name: str, mediator: ChatMediator):
        self.name = name
        self._mediator = mediator
        self._messages: list[str] = []
        mediator.add_user(self)

    def send(self, message: str, target: Optional[str] = None) -> None:
        self._mediator.send_message(message, self, target)

    def receive(self, message: str, sender_name: str) -> None:
        formatted = f"[{sender_name}] {message}"
        self._messages.append(formatted)

    def show_history(self) -> None:
        print(f"  📨 {self.name}の受信履歴:")
        for msg in self._messages[-5:]:
            print(f"    {msg}")

    def leave(self) -> None:
        self._mediator.remove_user(self)

# ═══════════════════════════════════════
# Concrete Mediator
# ═══════════════════════════════════════

class ChatRoom(ChatMediator):
    def __init__(self, name: str):
        self.name = name
        self._users: dict[str, ChatUser] = {}
        self._log: list[dict] = []

    def add_user(self, user: ChatUser) -> None:
        self._users[user.name] = user
        self._broadcast_system(f"🟢 {user.name} が参加しました")

    def remove_user(self, user: ChatUser) -> None:
        self._users.pop(user.name, None)
        self._broadcast_system(f"🔴 {user.name} が退出しました")

    def send_message(self, message: str, sender: ChatUser, target: Optional[str] = None) -> None:
        self._log.append({
            "time": datetime.now().strftime("%H:%M:%S"),
            "from": sender.name,
            "to": target or "ALL",
            "message": message,
        })

        if target:
            # DM
            user = self._users.get(target)
            if user:
                user.receive(f"(DM) {message}", sender.name)
                sender.receive(f"(DM→{target}) {message}", "自分")
            else:
                sender.receive(f"⚠ {target}は見つかりません", "System")
        else:
            # Broadcast
            for name, user in self._users.items():
                if name != sender.name:
                    user.receive(message, sender.name)

    def _broadcast_system(self, message: str) -> None:
        for user in self._users.values():
            user.receive(message, "System")

    def show_log(self, last_n: int = 10) -> None:
        print(f"\\n  📋 {self.name} ログ (最新{last_n}件):")
        for entry in self._log[-last_n:]:
            print(f"    [{entry['time']}] {entry['from']}→{entry['to']}: {entry['message']}")

    @property
    def user_count(self) -> int:
        return len(self._users)

# ─── 使用例 ───
room = ChatRoom("開発チーム")

alice = ChatUser("Alice", room)
bob = ChatUser("Bob", room)
charlie = ChatUser("Charlie", room)

print("=== チャット ===")
alice.send("おはようございます！")
bob.send("おはよう！今日のタスクは？")
alice.send("レビューお願いできる？", target="Bob")
charlie.send("私もレビュー参加します")
bob.leave()
alice.send("Bobさん退出しちゃった")

print(f"\\n参加者数: {room.user_count}")
alice.show_history()
room.show_log()`,
      highlights: [
        { startLine: 11, endLine: 17, color: '#a855f7', label: 'Mediator ABC', explanation: 'メッセージ送信・ユーザー管理のインターフェース' },
        { startLine: 22, endLine: 44, color: '#f59e0b', label: 'Colleague', explanation: 'Mediator経由で通信するユーザー。他ユーザーを直接参照しない' },
        { startLine: 50, endLine: 96, color: '#22c55e', label: 'Concrete Mediator', explanation: 'ChatRoomがユーザー管理・メッセージルーティング・ログを集約' },
      ],
      keyPoints: [
        'Colleague同士の直接通信を排除し疎結合にする',
        'Mediator がメッセージルーティングを一元管理',
        'ブロードキャスト・DM・システムメッセージを統一処理',
        'ログ機能をMediator側に集約できる',
      ],
    },
    {
      id: 34,
      title: 'Hexagonal Architecture',
      titleJa: 'ヘキサゴナルアーキテクチャ',
      difficulty: 'advanced',
      category: 'Architecture',
      description: 'ポートとアダプターで構成するヘキサゴナル（六角形）アーキテクチャ。外部依存を完全に差し替え可能にする。',
      bookReference: 'Clean Architecture 第17章',
      code: `"""Hexagonal Architecture — タスク管理システム"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from enum import Enum, auto

# ═══════════════════════════════════════
# Domain Core（中心: ポート定義 + ドメインモデル）
# ═══════════════════════════════════════

class TaskStatus(Enum):
    TODO = auto()
    IN_PROGRESS = auto()
    DONE = auto()

@dataclass
class Task:
    id: Optional[int]
    title: str
    description: str
    status: TaskStatus = TaskStatus.TODO
    created_at: datetime = field(default_factory=datetime.now)

    def start(self) -> None:
        if self.status != TaskStatus.TODO:
            raise ValueError("TODOのタスクのみ開始できます")
        self.status = TaskStatus.IN_PROGRESS

    def complete(self) -> None:
        if self.status != TaskStatus.IN_PROGRESS:
            raise ValueError("進行中のタスクのみ完了できます")
        self.status = TaskStatus.DONE

# ─── Primary Port（ユースケース入口）───
class TaskUseCase(ABC):
    @abstractmethod
    def create_task(self, title: str, description: str) -> Task: ...
    @abstractmethod
    def start_task(self, task_id: int) -> Task: ...
    @abstractmethod
    def complete_task(self, task_id: int) -> Task: ...
    @abstractmethod
    def list_tasks(self, status: Optional[TaskStatus] = None) -> list[Task]: ...

# ─── Secondary Port（外部依存）───
class TaskRepository(ABC):
    @abstractmethod
    def save(self, task: Task) -> Task: ...
    @abstractmethod
    def find_by_id(self, task_id: int) -> Optional[Task]: ...
    @abstractmethod
    def find_all(self, status: Optional[TaskStatus] = None) -> list[Task]: ...

class TaskNotifier(ABC):
    @abstractmethod
    def notify_created(self, task: Task) -> None: ...
    @abstractmethod
    def notify_completed(self, task: Task) -> None: ...

# ═══════════════════════════════════════
# Application Service（ユースケース実装）
# ═══════════════════════════════════════

class TaskService(TaskUseCase):
    def __init__(self, repo: TaskRepository, notifier: TaskNotifier):
        self._repo = repo
        self._notifier = notifier

    def create_task(self, title: str, description: str) -> Task:
        task = Task(id=None, title=title, description=description)
        saved = self._repo.save(task)
        self._notifier.notify_created(saved)
        return saved

    def start_task(self, task_id: int) -> Task:
        task = self._get_task(task_id)
        task.start()
        return self._repo.save(task)

    def complete_task(self, task_id: int) -> Task:
        task = self._get_task(task_id)
        task.complete()
        saved = self._repo.save(task)
        self._notifier.notify_completed(saved)
        return saved

    def list_tasks(self, status: Optional[TaskStatus] = None) -> list[Task]:
        return self._repo.find_all(status)

    def _get_task(self, task_id: int) -> Task:
        task = self._repo.find_by_id(task_id)
        if not task:
            raise ValueError(f"タスクID {task_id} が見つかりません")
        return task

# ═══════════════════════════════════════
# Adapters（外側: 具体的な実装）
# ═══════════════════════════════════════

# ─── Secondary Adapter: InMemory Repository ───
class InMemoryTaskRepository(TaskRepository):
    def __init__(self):
        self._store: dict[int, Task] = {}
        self._seq = 0

    def save(self, task: Task) -> Task:
        if task.id is None:
            self._seq += 1
            task.id = self._seq
        self._store[task.id] = task
        return task

    def find_by_id(self, task_id: int) -> Optional[Task]:
        return self._store.get(task_id)

    def find_all(self, status: Optional[TaskStatus] = None) -> list[Task]:
        tasks = list(self._store.values())
        if status:
            tasks = [t for t in tasks if t.status == status]
        return tasks

# ─── Secondary Adapter: Console Notifier ───
class ConsoleNotifier(TaskNotifier):
    def notify_created(self, task: Task) -> None:
        print(f"  📢 通知: タスク '{task.title}' が作成されました")

    def notify_completed(self, task: Task) -> None:
        print(f"  📢 通知: タスク '{task.title}' が完了しました 🎉")

# ─── Primary Adapter: CLI ───
class TaskCLI:
    """プライマリアダプター: CLIインターフェース"""
    def __init__(self, use_case: TaskUseCase):
        self._use_case = use_case

    def run_demo(self) -> None:
        print("=== タスク管理 CLI ===")
        t1 = self._use_case.create_task("API設計", "RESTful API のエンドポイント設計")
        t2 = self._use_case.create_task("DB設計", "ERDとテーブル定義")
        t3 = self._use_case.create_task("テスト", "ユニットテストの作成")

        self._use_case.start_task(t1.id)
        self._use_case.complete_task(t1.id)
        self._use_case.start_task(t2.id)

        print("\\n─── タスク一覧 ───")
        for task in self._use_case.list_tasks():
            icon = {"TODO": "⬜", "IN_PROGRESS": "🔵", "DONE": "✅"}
            print(f"  {icon.get(task.status.name, '?')} [{task.id}] {task.title} ({task.status.name})")

        print("\\n─── TODO のみ ───")
        for task in self._use_case.list_tasks(TaskStatus.TODO):
            print(f"  ⬜ [{task.id}] {task.title}")

# ═══════════════════════════════════════
# Composition Root（組み立て）
# ═══════════════════════════════════════

repo = InMemoryTaskRepository()
notifier = ConsoleNotifier()
service = TaskService(repo, notifier)
cli = TaskCLI(service)
cli.run_demo()`,
      highlights: [
        { startLine: 12, endLine: 34, color: '#f59e0b', label: 'Domain Model', explanation: 'ビジネスルールを持つ Entity。外部依存なし' },
        { startLine: 37, endLine: 58, color: '#a855f7', label: 'Ports（ポート）', explanation: 'Primary Port=ユースケース入口, Secondary Port=外部依存の抽象' },
        { startLine: 63, endLine: 92, color: '#22c55e', label: 'Application Service', explanation: 'ユースケースを実装。ポート経由で外部と通信' },
        { startLine: 98, endLine: 124, color: '#3b82f6', label: 'Secondary Adapters', explanation: 'Repository/Notifier の具体的な実装（差し替え可能）' },
        { startLine: 127, endLine: 147, color: '#ec4899', label: 'Primary Adapter + 組立', explanation: 'CLIアダプター。Composition Root で全体を組み立て' },
      ],
      keyPoints: [
        'ドメインコアは外部依存を一切持たない',
        'Primary Port = ユースケースの入口（駆動側）',
        'Secondary Port = 外部サービスの抽象（被駆動側）',
        'Adapter がポートの具体実装を提供する',
        'Composition Root で依存関係を組み立てる',
      ],
    },
  ],
};

export default course;
