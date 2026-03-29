import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'python',
  name: 'Python',
  nameJa: 'Python',
  simpleIconSlug: 'python',
  color: '#3776AB',
  description: '初心者に最も推奨される言語。シンプルな構文でAI・データ分析・Web開発まで幅広く対応できます。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'Hello World — はじめてのPython',
      difficulty: 'beginner',
      description:
        'プログラミングの第一歩は「Hello World」を画面に表示することです。Pythonでは print() 関数を使って文字列を出力します。文字列はシングルクォート(\') またはダブルクォート(\")で囲みます。',
      task: 'print() を使って「Hello, World!」と出力してください。',
      initialCode: '# ここにコードを書いてください\n',
      solutionCode: 'print("Hello, World!")',
      expectedOutput: 'Hello, World!',
      hints: [
        'print() 関数の括弧の中に文字列を入れます',
        '文字列はダブルクォートで囲みます: "Hello, World!"',
        '答え: print("Hello, World!")',
      ],
      explanation:
        'print() はPythonの組み込み関数で、引数に渡した値を標準出力（コンソール）に表示します。文字列は "" または \'\' で囲む必要があります。これがPythonプログラムの最も基本的な形です。print() は改行を自動で追加します。',
    },
    {
      id: 2,
      title: '変数とデータ型',
      difficulty: 'beginner',
      description:
        '変数はデータを格納する「名前付きの箱」です。Pythonでは型宣言が不要で、代入するだけで変数が作られます。主なデータ型には str(文字列)、int(整数)、float(小数)、bool(真偽値) があります。',
      task: '変数 name に "Python"、変数 version に 3 を代入し、両方を print() で出力してください。',
      initialCode: '# 変数を定義してください\nname = \nversion = \n\nprint(name)\nprint(version)',
      solutionCode: 'name = "Python"\nversion = 3\n\nprint(name)\nprint(version)',
      expectedOutput: 'Python\n3',
      hints: [
        '文字列は "" で囲み、数値はそのまま書きます',
        'name = "Python" のように代入します',
        '整数は version = 3 と書きます',
      ],
      explanation:
        'Pythonは動的型付け言語です。変数に値を代入すると、自動的に適切な型が割り当てられます。"Python" は str型、3 は int型になります。type() 関数で型を確認できます（例: type(name) → <class \'str\'>）。変数名は小文字のスネークケース（snake_case）が推奨されます。',
    },
    {
      id: 3,
      title: '文字列操作',
      difficulty: 'beginner',
      description:
        '文字列（str型）は文字の並びで、多くの便利なメソッドを持っています。f-string（f"..."）を使うと、文字列の中に変数を埋め込めます。文字列の連結は + 演算子で行います。',
      task: '変数 lang に "Python" を代入し、f-string を使って「I love Python!」と出力してください。',
      initialCode: 'lang = "Python"\n\n# f-string を使って出力してください\nprint()',
      solutionCode: 'lang = "Python"\n\nprint(f"I love {lang}!")',
      expectedOutput: 'I love Python!',
      hints: [
        'f-string は f"..." の形式で書きます',
        '変数は {} の中に入れます: f"I love {lang}!"',
        'print(f"I love {lang}!") と書きます',
      ],
      explanation:
        'f-string（フォーマット済み文字列リテラル）はPython 3.6で導入された機能で、f"..." の中に {変数名} を書くと、その部分が変数の値に置き換わります。従来の .format() や % 演算子よりも読みやすく、現在のPythonでは f-string が推奨されています。式も埋め込めます（例: f"{2 + 3}" → "5"）。',
    },
    {
      id: 4,
      title: '算術演算子',
      difficulty: 'beginner',
      description:
        'Pythonの算術演算子: + (加算), - (減算), * (乗算), / (除算), // (整数除算), % (剰余), ** (べき乗)。除算 / は常にfloat型を返し、整数除算 // は小数点以下を切り捨てます。',
      task: '変数 a=17, b=5 として、a を b で割った商（整数除算）と余りをそれぞれ出力してください。',
      initialCode: 'a = 17\nb = 5\n\n# 整数除算（商）を出力\nprint()\n\n# 余りを出力\nprint()',
      solutionCode: 'a = 17\nb = 5\n\nprint(a // b)\n\nprint(a % b)',
      expectedOutput: '3\n2',
      hints: [
        '整数除算は // 演算子です',
        '余り（剰余）は % 演算子です',
        'a // b は 3、a % b は 2 になります',
      ],
      explanation:
        '17 // 5 = 3 （17÷5=3余り2 の商の部分）、17 % 5 = 2 （余りの部分）です。// は「フロア除算」とも呼ばれ、結果を切り捨てた整数を返します。divmod(a, b) を使うと商と余りを同時に取得できます。',
    },
    {
      id: 5,
      title: '入力と型変換',
      difficulty: 'beginner',
      description:
        'input() 関数はユーザーからの入力を文字列として受け取ります。数値として扱いたい場合は int() や float() で型変換（キャスト）する必要があります。str() で数値を文字列に変換することもできます。',
      task: '変数 age_str に "25" が格納されています。これを整数に変換して 1 を足し、結果を出力してください。',
      initialCode: 'age_str = "25"\n\n# age_str を整数に変換して 1 を足す\nage = \n\nprint(age)',
      solutionCode: 'age_str = "25"\n\nage = int(age_str) + 1\n\nprint(age)',
      expectedOutput: '26',
      hints: [
        'int() で文字列を整数に変換できます',
        'int("25") は整数の 25 になります',
        'age = int(age_str) + 1 と書きます',
      ],
      explanation:
        'Pythonでは文字列と数値を直接足すことはできません（TypeError になります）。int() は文字列を整数に変換し、float() は小数に変換します。逆に str() は数値を文字列に変換します。型変換はデータ処理の基本操作で、特にユーザー入力（常に文字列）を扱う際に不可欠です。',
    },
    {
      id: 6,
      title: '条件分岐 — if / elif / else',
      difficulty: 'beginner',
      description:
        '条件分岐は、条件の真偽に応じて実行するコードを切り替える仕組みです。Pythonでは if / elif / else を使い、インデント（半角スペース4つ）でブロックを表現します。',
      task: '変数 score に 75 が入っています。80以上なら "A"、60以上なら "B"、それ以外なら "C" を出力してください。',
      initialCode: 'score = 75\n\n# 条件分岐を書いてください\n',
      solutionCode: 'score = 75\n\nif score >= 80:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")',
      expectedOutput: 'B',
      hints: [
        'if score >= 80: のように書きます',
        '2番目の条件は elif score >= 60: です',
        'それ以外は else: を使います。各ブロックはインデント必須です',
      ],
      explanation:
        'if文は上から順に条件を評価し、最初にTrueになったブロックを実行します。score=75 の場合、score >= 80 は False、score >= 60 は True なので "B" が出力されます。Pythonはインデントでブロック構造を表現するため、インデントが崩れるとIndentationErrorになります。PEP 8ではスペース4つを推奨しています。',
    },
    {
      id: 7,
      title: 'forループ',
      difficulty: 'beginner',
      description:
        'for ループは、リストや range() などのイテラブル（反復可能オブジェクト）の各要素に対して繰り返し処理を行います。range(n) は 0 から n-1 までの整数を生成します。',
      task: 'for ループと range() を使って、1から5までの数字を1行ずつ出力してください。',
      initialCode: '# 1から5まで出力してください\n',
      solutionCode: 'for i in range(1, 6):\n    print(i)',
      expectedOutput: '1\n2\n3\n4\n5',
      hints: [
        'range(1, 6) は 1, 2, 3, 4, 5 を生成します',
        'for i in range(1, 6): と書きます',
        'ループ本体で print(i) を実行します',
      ],
      explanation:
        'range(start, stop) は start から stop-1 までの整数を生成します（stop は含まない）。range(5) は range(0, 5) と同じで 0〜4 を生成します。range(start, stop, step) で刻み幅も指定可能です。for ループは Pythonで最も頻繁に使われる繰り返し構造です。',
    },
    {
      id: 8,
      title: 'whileループ',
      difficulty: 'beginner',
      description:
        'while ループは条件が True の間、処理を繰り返します。ループの終了条件を確実に設定しないと無限ループになるため注意が必要です。break で途中終了、continue で次の繰り返しにスキップできます。',
      task: '変数 count を 1 で初期化し、while ループで count が 5 以下の間、count の値を出力して 1 ずつ増やしてください。',
      initialCode: 'count = 1\n\n# while ループを書いてください\n',
      solutionCode: 'count = 1\n\nwhile count <= 5:\n    print(count)\n    count += 1',
      expectedOutput: '1\n2\n3\n4\n5',
      hints: [
        'while count <= 5: で条件を設定します',
        'ループ内で print(count) を実行します',
        'count += 1 でカウンタを増やします（忘れると無限ループ）',
      ],
      explanation:
        'while ループは条件式が True の間ずっと繰り返されます。count += 1 は count = count + 1 の省略形です。カウンタの更新を忘れると無限ループになるため要注意です。一般的に、回数が決まっている繰り返しには for、条件による繰り返しには while を使い分けます。',
    },
    {
      id: 9,
      title: 'リストの基本',
      difficulty: 'beginner',
      description:
        'リスト（list）は複数の値を順序付きで格納するデータ構造です。[] で作成し、インデックス（0始まり）でアクセスします。append() で追加、len() で長さを取得できます。',
      task: 'リスト fruits に "apple", "banana", "cherry" を格納し、2番目の要素（banana）を出力してください。',
      initialCode: '# リストを作成してください\nfruits = []\n\n# 2番目の要素を出力\nprint()',
      solutionCode: 'fruits = ["apple", "banana", "cherry"]\n\nprint(fruits[1])',
      expectedOutput: 'banana',
      hints: [
        'リストは ["apple", "banana", "cherry"] のように書きます',
        'インデックスは 0 始まりなので、2番目は [1] です',
        'print(fruits[1]) で banana を出力できます',
      ],
      explanation:
        'Pythonのリストは 0-indexed で、最初の要素が [0]、2番目が [1] です。負のインデックスも使え、[-1] は最後の要素を指します。リストはミュータブル（変更可能）で、要素の追加（append）、削除（remove, pop）、挿入（insert）が可能です。',
    },
    {
      id: 10,
      title: '辞書（dict）の基本',
      difficulty: 'beginner',
      description:
        '辞書（dict）はキーと値のペアでデータを格納します。{} で作成し、キーを使って値にアクセスします。キーは一意でなければなりません。',
      task: '辞書 user に name="太郎", age=20 を格納し、name の値を出力してください。',
      initialCode: '# 辞書を作成してください\nuser = {}\n\nprint()',
      solutionCode: 'user = {"name": "太郎", "age": 20}\n\nprint(user["name"])',
      expectedOutput: '太郎',
      hints: [
        '辞書は {"key": value} の形で書きます',
        'user = {"name": "太郎", "age": 20} と定義します',
        'user["name"] でアクセスします',
      ],
      explanation:
        '辞書はハッシュマップの実装で、キーからの検索が O(1) と高速です。.get(key, default) を使うとキーが存在しない場合にデフォルト値を返せます（KeyError を回避）。辞書は Python 3.7 以降、挿入順序が保証されています。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: '関数の定義と戻り値',
      difficulty: 'intermediate',
      description:
        '関数は処理をまとめて再利用可能にする仕組みです。def キーワードで定義し、return で値を返します。関数は「一つのことだけを行う」のが良い設計の原則です（単一責任の原則）。',
      task: '2つの整数を受け取り、その合計を返す関数 add を定義し、add(3, 7) の結果を出力してください。',
      initialCode: '# 関数 add を定義してください\n\n\n# 結果を出力\nprint(add(3, 7))',
      solutionCode: 'def add(a, b):\n    return a + b\n\nprint(add(3, 7))',
      expectedOutput: '10',
      hints: [
        'def add(a, b): で関数を定義します',
        'return a + b で合計を返します',
        '関数名は動詞で始めると意図が明確になります',
      ],
      explanation:
        '関数は def 関数名(引数): で定義します。return 文がない場合、暗黙的に None を返します。「リーダブルコード」の原則に従い、関数名は処理内容を表す動詞（add, calculate, get など）にすべきです。引数にはデフォルト値を設定でき、可読性と柔軟性が向上します。',
    },
    {
      id: 12,
      title: 'デフォルト引数と可変長引数',
      difficulty: 'intermediate',
      description:
        'デフォルト引数を使うと、呼び出し時に省略可能な引数を定義できます。*args は位置引数のタプル、**kwargs はキーワード引数の辞書として受け取ります。',
      task: '*args を使って任意個の数値の合計を返す関数 total を定義し、total(1, 2, 3, 4, 5) の結果を出力してください。',
      initialCode: '# 関数 total を定義してください\n\n\nprint(total(1, 2, 3, 4, 5))',
      solutionCode: 'def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4, 5))',
      expectedOutput: '15',
      hints: [
        '*args でタプルとして全引数を受け取れます',
        'sum() で合計を計算できます',
        'def total(*args): return sum(args)',
      ],
      explanation:
        '*args は任意個の位置引数をタプルとして受け取ります。同様に **kwargs は任意個のキーワード引数を辞書として受け取ります。sum() は組み込み関数で、イテラブルの合計を計算します。引数の順序は: 通常引数 → *args → キーワード引数 → **kwargs です。',
    },
    {
      id: 13,
      title: 'リスト内包表記',
      difficulty: 'intermediate',
      description:
        'リスト内包表記（list comprehension）は、forループとリスト作成を1行で書ける構文です。[式 for 変数 in イテラブル if 条件] の形で、フィルタリングも可能です。Pythonicなコードの代表例です。',
      task: '1から10までの整数のうち、偶数だけを2乗したリストを作成し、出力してください。',
      initialCode: '# リスト内包表記で偶数の2乗リストを作成\nresult = []\n\nprint(result)',
      solutionCode: 'result = [x ** 2 for x in range(1, 11) if x % 2 == 0]\n\nprint(result)',
      expectedOutput: '[4, 16, 36, 64, 100]',
      hints: [
        '[式 for x in range(1, 11) if 条件] の形です',
        '偶数の条件: x % 2 == 0',
        '2乗: x ** 2',
      ],
      explanation:
        'リスト内包表記は for ループ + append を1行に凝縮した構文です。読みやすく効率的ですが、複雑になりすぎる場合は通常のforループに戻すべきです（リーダブルコードの原則: 「ネストは浅くする」）。辞書内包表記 {k: v for ...} やセット内包表記 {x for ...} もあります。',
    },
    {
      id: 14,
      title: 'タプルとセット',
      difficulty: 'intermediate',
      description:
        'タプル（tuple）はイミュータブル（変更不可）なリストです。() で作成し、安全性が必要な場面で使います。セット（set）は重複を許さないコレクションで、集合演算（和・積・差）が可能です。',
      task: 'リスト [1, 2, 2, 3, 3, 3, 4, 5] から重複を除去してソートされたリストを作り、出力してください。',
      initialCode: 'numbers = [1, 2, 2, 3, 3, 3, 4, 5]\n\n# 重複除去してソート\nresult = \n\nprint(result)',
      solutionCode: 'numbers = [1, 2, 2, 3, 3, 3, 4, 5]\n\nresult = sorted(set(numbers))\n\nprint(result)',
      expectedOutput: '[1, 2, 3, 4, 5]',
      hints: [
        'set() で重複を除去できます',
        'sorted() でソートされたリストを返します',
        'sorted(set(numbers)) と組み合わせます',
      ],
      explanation:
        'set() はハッシュテーブルを使った集合で、重複を自動除去します。sorted() は新しいソート済みリストを返す組み込み関数です（元のデータは変更しません）。タプルは (1, 2, 3) で作成し、辞書のキーやセットの要素として使えます（イミュータブルなため）。定数データにはタプルを使うのが良い設計です。',
    },
    {
      id: 15,
      title: 'ファイル入出力',
      difficulty: 'intermediate',
      description:
        'ファイル操作は open() で行い、with文を使うと自動的にファイルが閉じられます。モードは "r"(読取), "w"(書込), "a"(追加) があります。with文はリソース管理のベストプラクティスです。',
      task: 'with文を使ってファイルに書き込み、読み取るコードの穴埋めをしてください。（実行環境の制約上、期待出力を直接printします）',
      initialCode: '# ファイル書き込みと読み取りの基本構文を完成させてください\n# 実環境では以下のように書きます:\n#\n# with open("hello.txt", "w") as f:\n#     f.write("Hello, File!")\n#\n# with open("hello.txt", "r") as f:\n#     content = f.read()\n#     print(content)\n\n# ここでは結果を直接出力してください\nprint()',
      solutionCode: 'print("Hello, File!")',
      expectedOutput: 'Hello, File!',
      hints: [
        'with open(ファイル名, モード) as f: の構文を使います',
        '"w" モードで書き込み、"r" モードで読み取ります',
        'f.write() で書き込み、f.read() で読み取ります',
      ],
      explanation:
        'with文（コンテキストマネージャ）はリソースの確実な解放を保証します。ファイルを開いた後、例外が発生しても必ずclose()が呼ばれます。これはリソース管理のベストプラクティスで、try-finallyよりも簡潔で安全です。エンコーディングは encoding="utf-8" を明示的に指定するのが良い習慣です。',
    },
    {
      id: 16,
      title: '例外処理 — try / except',
      difficulty: 'intermediate',
      description:
        '例外処理はエラーが発生してもプログラムが停止しないようにする仕組みです。try ブロック内で例外が発生すると except ブロックが実行されます。具体的な例外クラスを指定することが重要です。',
      task: '"abc" を整数に変換する処理を try/except で囲み、エラー時に "変換エラー" と出力してください。',
      initialCode: '# 例外処理を書いてください\n\n    result = int("abc")\n    print(result)\n\n    print("変換エラー")',
      solutionCode: 'try:\n    result = int("abc")\n    print(result)\nexcept ValueError:\n    print("変換エラー")',
      expectedOutput: '変換エラー',
      hints: [
        'try: ブロック内にエラーが起きうるコードを書きます',
        'except ValueError: で型変換エラーをキャッチします',
        '具体的な例外クラスを指定することが重要です（except: だけは避ける）',
      ],
      explanation:
        '例外は具体的にキャッチすべきです。except: や except Exception: は全例外をキャッチしてしまい、バグを隠す原因になります。よく使う例外: ValueError（値が不正）, TypeError（型が不正）, KeyError（辞書のキーがない）, FileNotFoundError（ファイルが見つからない）。finally ブロックは例外の有無に関わらず必ず実行されます。',
    },
    {
      id: 17,
      title: 'クラスとオブジェクト',
      difficulty: 'intermediate',
      description:
        'クラスはデータ（属性）と振る舞い（メソッド）をまとめた設計図です。__init__ はコンストラクタで、インスタンス生成時に呼ばれます。self は自身のインスタンスを参照します。',
      task: 'name と age を持つ Dog クラスを作り、bark() メソッドで "{name} says Woof!" と出力してください。Dog("Pochi", 3) を作り bark() を呼び出してください。',
      initialCode: '# Dog クラスを定義してください\n\n\n# インスタンスを作成して bark() を呼ぶ\ndog = Dog("Pochi", 3)\ndog.bark()',
      solutionCode: 'class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def bark(self):\n        print(f"{self.name} says Woof!")\n\ndog = Dog("Pochi", 3)\ndog.bark()',
      expectedOutput: 'Pochi says Woof!',
      hints: [
        'class Dog: で定義し、__init__ でname, ageを受け取ります',
        'self.name = name でインスタンス変数に代入します',
        'bark() メソッドで f"{self.name} says Woof!" を出力します',
      ],
      explanation:
        'オブジェクト指向プログラミング（OOP）の基本です。クラスは設計図、インスタンスはその実体です。__init__ はコンストラクタ（初期化メソッド）で、インスタンス生成時に自動で呼ばれます。クラス名は CapWords（PascalCase）で書くのが PEP 8 の規約です。',
    },
    {
      id: 18,
      title: '継承とポリモーフィズム',
      difficulty: 'intermediate',
      description:
        '継承は既存のクラス（親クラス）の機能を引き継いで新しいクラス（子クラス）を作る仕組みです。メソッドのオーバーライドにより、子クラス独自の振る舞いを定義できます。これがポリモーフィズム（多態性）です。',
      task: 'Animal クラスを継承した Cat クラスを作り、speak() メソッドをオーバーライドして "Meow" と出力してください。',
      initialCode: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print("...")\n\n# Cat クラスを定義してください\n\n\ncat = Cat("Tama")\ncat.speak()',
      solutionCode: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print("...")\n\nclass Cat(Animal):\n    def speak(self):\n        print("Meow")\n\ncat = Cat("Tama")\ncat.speak()',
      expectedOutput: 'Meow',
      hints: [
        'class Cat(Animal): で Animal を継承します',
        'speak() メソッドをオーバーライドして "Meow" を出力します',
        '__init__ は親クラスのものが自動的に使われます',
      ],
      explanation:
        '継承はコードの再利用を促進しますが、深い継承階層は複雑さを増します（「継承より合成を好め」という原則）。Pythonは多重継承をサポートしますが、MRO（メソッド解決順序）が複雑になるため慎重に使用すべきです。super() を使うと親クラスのメソッドを明示的に呼び出せます。',
    },
    {
      id: 19,
      title: 'モジュールとインポート',
      difficulty: 'intermediate',
      description:
        'モジュールは .py ファイルのことで、import 文で他のモジュールの機能を使えます。標準ライブラリには math, os, json, datetime など便利なモジュールが多数あります。',
      task: 'math モジュールの sqrt 関数を使って 144 の平方根を出力してください。結果は整数に変換して出力してください。',
      initialCode: '# math モジュールをインポートしてください\n\n\n# 144 の平方根を整数で出力\nprint()',
      solutionCode: 'import math\n\nprint(int(math.sqrt(144)))',
      expectedOutput: '12',
      hints: [
        'import math でモジュールをインポートします',
        'math.sqrt(144) で平方根を計算します',
        'int() で整数に変換します',
      ],
      explanation:
        'import math はモジュール全体をインポートし、from math import sqrt は特定の関数だけをインポートします。名前空間の汚染を避けるため、import math が推奨されます。from math import * はすべてをインポートしますが、名前衝突のリスクがあるため避けるべきです（PEP 8）。',
    },
    {
      id: 20,
      title: 'ラムダ式と高階関数',
      difficulty: 'intermediate',
      description:
        'lambda は無名関数を作る構文で、簡単な処理を1行で定義できます。map() はリスト各要素に関数を適用し、filter() は条件に合う要素を抽出します。sorted() の key 引数にも使えます。',
      task: 'リスト [3, 1, 4, 1, 5, 9] を、各要素の2乗の値でソートした結果を出力してください（sorted の key に lambda を使用）。',
      initialCode: 'numbers = [3, 1, 4, 1, 5, 9]\n\n# lambda を使ってソート\nresult = sorted(numbers)\n\nprint(result)',
      solutionCode: 'numbers = [3, 1, 4, 1, 5, 9]\n\nresult = sorted(numbers, key=lambda x: x ** 2)\n\nprint(result)',
      expectedOutput: '[1, 1, 3, 4, 5, 9]',
      hints: [
        'sorted() の key 引数に関数を渡せます',
        'lambda x: x ** 2 は各要素の2乗を返す無名関数です',
        'sorted(numbers, key=lambda x: x ** 2) と書きます',
      ],
      explanation:
        'lambda は「使い捨ての小さな関数」に適しています。複雑な処理には通常の def 文を使うべきです（リーダブルコード: 簡潔さと明瞭さのバランス）。map/filter は遅延評価のイテレータを返すため、結果をリストにするには list() で包む必要があります。Pythonでは、map/filter よりリスト内包表記の方が Pythonic とされます。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'デコレータ',
      difficulty: 'advanced',
      description:
        'デコレータは関数を受け取って拡張する関数です。@decorator 構文で適用します。ログ記録、認証チェック、キャッシュなど、横断的関心事（Cross-cutting Concerns）の実装に使われます。',
      task: '関数の実行前後にログを出力する timer デコレータを作成し、@timer で hello 関数に適用してください。hello() は "Hello!" を出力します。',
      initialCode: 'import functools\n\n# timer デコレータを定義\n\n\n@timer\ndef hello():\n    print("Hello!")\n\nhello()',
      solutionCode: 'import functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print("start")\n        result = func(*args, **kwargs)\n        print("end")\n        return result\n    return wrapper\n\n@timer\ndef hello():\n    print("Hello!")\n\nhello()',
      expectedOutput: 'start\nHello!\nend',
      hints: [
        'デコレータは関数を受け取り、wrapper 関数を返す関数です',
        'functools.wraps で元の関数の情報を保持します',
        'wrapper 内で func() を呼び出し前後に print します',
      ],
      explanation:
        'デコレータは関数を拡張する強力なパターンで、AOP（アスペクト指向プログラミング）の実現手段です。functools.wraps を使わないと、デコレートされた関数の __name__ や __doc__ が wrapper のものに書き換わってしまいます。標準ライブラリの @functools.lru_cache や @property もデコレータです。',
    },
    {
      id: 22,
      title: 'ジェネレータと yield',
      difficulty: 'advanced',
      description:
        'ジェネレータは yield キーワードを使って値を一つずつ遅延生成する関数です。メモリ効率が極めて高く、大量データの処理に適しています。呼び出すとイテレータオブジェクトを返します。',
      task: 'フィボナッチ数列（0, 1, 1, 2, 3, 5, 8...）を生成するジェネレータ fibonacci を定義し、最初の7個を出力してください。',
      initialCode: '# フィボナッチジェネレータを定義\n\n\n# 最初の7個を出力\ngen = fibonacci()\nfor _ in range(7):\n    print(next(gen))',
      solutionCode: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nfor _ in range(7):\n    print(next(gen))',
      expectedOutput: '0\n1\n1\n2\n3\n5\n8',
      hints: [
        'yield で値を返し、次の呼び出しまで処理を一時停止します',
        'a, b = b, a + b でフィボナッチの漸化式を実装します',
        'while True で無限に生成し、呼び出し側で必要な数だけ取得します',
      ],
      explanation:
        'ジェネレータは「遅延評価」の典型例で、全データをメモリに保持せず、必要な時に値を計算して返します。巨大なファイルの行読み込みや無限列の扱いに最適です。ジェネレータ式 (x for x in iterable) はメモリ効率の良いリスト内包表記です。itertools モジュールと組み合わせると強力です。',
    },
    {
      id: 23,
      title: 'コンテキストマネージャ',
      difficulty: 'advanced',
      description:
        'with文で使えるオブジェクトをコンテキストマネージャと呼びます。__enter__ と __exit__ メソッドで定義するか、contextlib.contextmanager デコレータで簡単に作れます。リソース管理のベストプラクティスです。',
      task: 'contextlib.contextmanager を使って、開始と終了のログを出力する timer コンテキストマネージャを作り、with timer(): で "Processing" を出力してください。',
      initialCode: 'from contextlib import contextmanager\n\n# timer コンテキストマネージャを定義\n\n\nwith timer():\n    print("Processing")',
      solutionCode: 'from contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    print("Start")\n    yield\n    print("End")\n\nwith timer():\n    print("Processing")',
      expectedOutput: 'Start\nProcessing\nEnd',
      hints: [
        '@contextmanager デコレータを使います',
        'yield の前が __enter__、後が __exit__ に相当します',
        'yield でwithブロックに制御を渡します',
      ],
      explanation:
        'コンテキストマネージャは「リソースの獲得と解放」を保証するパターンです。ファイル、DB接続、ロック、一時ディレクトリなどの管理に使います。例外が発生しても __exit__ は必ず呼ばれるため、リソースリークを防げます。try-finally を書く代わりに with 文を使うのが Pythonic です。',
    },
    {
      id: 24,
      title: '正規表現',
      difficulty: 'advanced',
      description:
        're モジュールはパターンマッチングの強力なツールです。search() でパターンを検索、findall() で全一致を取得、sub() で置換します。メールアドレスや電話番号のバリデーションなどに使われます。',
      task: '文字列 "My email is user@example.com" からメールアドレス部分を抽出して出力してください。',
      initialCode: 'import re\n\ntext = "My email is user@example.com"\n\n# メールアドレスを抽出して出力\n',
      solutionCode: 'import re\n\ntext = "My email is user@example.com"\n\nmatch = re.search(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", text)\nif match:\n    print(match.group())',
      expectedOutput: 'user@example.com',
      hints: [
        're.search(パターン, 文字列) でパターンを検索します',
        'メールのパターン例: r"[\\w.+-]+@[\\w-]+\\.[\\w.]+"',
        'match.group() で一致した文字列を取得します',
      ],
      explanation:
        '正規表現はテキスト処理の強力なツールですが、可読性を損なうこともあります。複雑なパターンにはコメント付きの re.VERBOSE フラグが有効です。セキュリティ面では、ユーザー入力をそのまま正規表現パターンに使うと ReDoS（正規表現 DoS）攻撃を受ける可能性があるため、re.escape() でエスケープすべきです。',
    },
    {
      id: 25,
      title: '型ヒント（Type Hints）',
      difficulty: 'advanced',
      description:
        '型ヒントは変数や関数の引数・戻り値に期待される型を注釈する機能です。実行時の動作には影響しませんが、mypy などの静的解析ツールでバグを早期発見できます。大規模プロジェクトでは事実上必須です。',
      task: '引数 items（文字列のリスト）を受け取り、カンマ区切りの文字列を返す関数 join_items を型ヒント付きで定義し、結果を出力してください。',
      initialCode: '# 型ヒント付きで関数を定義してください\n\n\nprint(join_items(["a", "b", "c"]))',
      solutionCode: 'def join_items(items: list[str]) -> str:\n    return ", ".join(items)\n\nprint(join_items(["a", "b", "c"]))',
      expectedOutput: 'a, b, c',
      hints: [
        '引数の型: items: list[str]',
        '戻り値の型: -> str',
        '", ".join(items) で文字列を結合します',
      ],
      explanation:
        'Python 3.9以降、list[str] のように組み込み型をジェネリックとして直接使えます（3.8以前は from typing import List が必要）。Optional[int] は int | None の意味です。Union[int, str] は int または str を表します。型ヒントはチーム開発でのコミュニケーションコストを大幅に削減します。',
    },
    {
      id: 26,
      title: 'データクラス',
      difficulty: 'advanced',
      description:
        '@dataclass デコレータはデータを保持するクラスを簡潔に定義できます。__init__, __repr__, __eq__ などが自動生成されます。frozen=True でイミュータブルにでき、安全なデータ構造を作れます。',
      task: 'name(str) と price(int) を持つ Product データクラスを定義し、Product("Laptop", 1200) の repr を出力してください。',
      initialCode: 'from dataclasses import dataclass\n\n# Product データクラスを定義\n\n\nproduct = Product("Laptop", 1200)\nprint(product)',
      solutionCode: 'from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: int\n\nproduct = Product("Laptop", 1200)\nprint(product)',
      expectedOutput: "Product(name='Laptop', price=1200)",
      hints: [
        '@dataclass デコレータをクラスに適用します',
        'フィールドは型ヒント付きで定義します',
        '__repr__ が自動生成されるため、print で見やすい表示になります',
      ],
      explanation:
        'dataclass は DTO（Data Transfer Object）の Python版です。通常のクラスに比べてボイラープレートコードが大幅に減ります。field() で デフォルトファクトリや比較対象外の設定が可能です。frozen=True にするとイミュータブルになり、辞書のキーやセットの要素として使えます。Python 3.10以降は slots=True でメモリ効率も改善されます。',
    },
    {
      id: 27,
      title: '抽象基底クラス',
      difficulty: 'advanced',
      description:
        'ABC（Abstract Base Class）は abc モジュールで定義でき、サブクラスに特定のメソッド実装を強制します。インターフェースや契約の概念を Python で実現する方法です。',
      task: 'area() メソッドを強制する Shape 抽象クラスを作り、Circle クラスで実装してください。半径5の円の面積を出力してください。',
      initialCode: 'from abc import ABC, abstractmethod\nimport math\n\n# Shape 抽象クラスを定義\n\n\n# Circle クラスを定義\n\n\ncircle = Circle(5)\nprint(circle.area())',
      solutionCode: 'from abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float:\n        pass\n\nclass Circle(Shape):\n    def __init__(self, radius: float):\n        self.radius = radius\n\n    def area(self) -> float:\n        return math.pi * self.radius ** 2\n\ncircle = Circle(5)\nprint(circle.area())',
      expectedOutput: '78.53981633974483',
      hints: [
        'ABC を継承し、@abstractmethod を付けます',
        'Circle は Shape を継承して area() を実装します',
        'math.pi * radius ** 2 で面積を計算します',
      ],
      explanation:
        '抽象基底クラスはインターフェースの契約を強制する仕組みです。abstractmethod が実装されていないとインスタンス化時に TypeError が発生します。SOLID原則の「依存関係逆転の原則」（DIP）を実現する手段の一つです。具象クラスではなく抽象に依存することで、柔軟で拡張性の高い設計になります。',
    },
    {
      id: 28,
      title: 'マルチスレッドの基本',
      difficulty: 'advanced',
      description:
        'threading モジュールで並行処理を実現できます。GIL（Global Interpreter Lock）により、CPU バウンドな処理では真の並列性は得られませんが、I/O バウンドな処理（ネットワーク通信、ファイルI/O）では効果的です。',
      task: 'concurrent.futures.ThreadPoolExecutor を使って、リスト [1, 2, 3, 4, 5] の各要素を2乗する処理を並行実行し、結果をリストで出力してください。',
      initialCode: 'from concurrent.futures import ThreadPoolExecutor\n\ndef square(n):\n    return n ** 2\n\nnumbers = [1, 2, 3, 4, 5]\n\n# ThreadPoolExecutor で並行処理\n',
      solutionCode: 'from concurrent.futures import ThreadPoolExecutor\n\ndef square(n):\n    return n ** 2\n\nnumbers = [1, 2, 3, 4, 5]\n\nwith ThreadPoolExecutor() as executor:\n    results = list(executor.map(square, numbers))\n\nprint(results)',
      expectedOutput: '[1, 4, 9, 16, 25]',
      hints: [
        'ThreadPoolExecutor() を with 文で使います',
        'executor.map(関数, イテラブル) で並行実行します',
        'list() で結果をリストに変換します',
      ],
      explanation:
        'concurrent.futures は高レベルな並行処理APIです。ThreadPoolExecutor は I/O バウンドな処理に、ProcessPoolExecutor は CPU バウンドな処理に適しています。GIL の制約により、CPUを多用する処理にはマルチプロセスを使うべきです。Python 3.4以降では asyncio による非同期I/Oも選択肢です。',
    },
    {
      id: 29,
      title: 'ユニットテスト',
      difficulty: 'advanced',
      description:
        'unittest はPython標準のテストフレームワークです。テストを書くことでコードの品質と保守性が向上します。テスト駆動開発（TDD）では、テストを先に書いてから実装します。',
      task: 'add(a, b) 関数のテストケースを unittest で書いてください。add(2, 3) が 5 を返すこと、add(-1, 1) が 0 を返すことをテストしてください。',
      initialCode: 'import unittest\n\ndef add(a, b):\n    return a + b\n\n# テストクラスを定義\nclass TestAdd(unittest.TestCase):\n    pass\n\n# テスト実行（簡易版）\nsuite = unittest.TestLoader().loadTestsFromTestCase(TestAdd)\nresult = unittest.TextTestRunner(verbosity=0).run(suite)\nprint(f"Tests run: {result.testsRun}, Failures: {len(result.failures)}")',
      solutionCode: 'import unittest\n\ndef add(a, b):\n    return a + b\n\nclass TestAdd(unittest.TestCase):\n    def test_positive(self):\n        self.assertEqual(add(2, 3), 5)\n\n    def test_negative(self):\n        self.assertEqual(add(-1, 1), 0)\n\nsuite = unittest.TestLoader().loadTestsFromTestCase(TestAdd)\nresult = unittest.TextTestRunner(verbosity=0).run(suite)\nprint(f"Tests run: {result.testsRun}, Failures: {len(result.failures)}")',
      expectedOutput: 'Tests run: 2, Failures: 0',
      hints: [
        'test_ で始まるメソッドがテストケースになります',
        'self.assertEqual(actual, expected) で値を検証します',
        '2つのテストメソッドを定義してください',
      ],
      explanation:
        'テストは「動く仕様書」です。assertEqual, assertTrue, assertRaises など多数のアサーションメソッドがあります。テストは「1つのテストに1つのアサーション」が原則です（AAA パターン: Arrange, Act, Assert）。実務では pytest フレームワークがデファクトスタンダードで、fixture や parametrize などの強力な機能があります。',
    },
    {
      id: 30,
      title: 'デザインパターン — Strategy パターン',
      difficulty: 'advanced',
      description:
        'Strategy パターンはアルゴリズムをオブジェクトとして切り出し、実行時に切り替え可能にするパターンです。if/elif の分岐を排除し、開放閉鎖の原則（OCP）を実現します。Pythonではプロトコルやコールバック関数でも実装できます。',
      task: '割引計算の Strategy パターンを実装してください。通常割引（10%引き）とVIP割引（20%引き）を切り替えて、1000円の商品の価格を計算してください。',
      initialCode: 'from abc import ABC, abstractmethod\n\n# Strategy インターフェース\nclass DiscountStrategy(ABC):\n    @abstractmethod\n    def calculate(self, price: int) -> int:\n        pass\n\n# 通常割引\n\n# VIP割引\n\n# コンテキスト\nclass PriceCalculator:\n    def __init__(self, strategy: DiscountStrategy):\n        self.strategy = strategy\n\n    def get_price(self, price: int) -> int:\n        return self.strategy.calculate(price)\n\n# 使用例\ncalc = PriceCalculator(NormalDiscount())\nprint(calc.get_price(1000))\n\ncalc = PriceCalculator(VipDiscount())\nprint(calc.get_price(1000))',
      solutionCode: 'from abc import ABC, abstractmethod\n\nclass DiscountStrategy(ABC):\n    @abstractmethod\n    def calculate(self, price: int) -> int:\n        pass\n\nclass NormalDiscount(DiscountStrategy):\n    def calculate(self, price: int) -> int:\n        return int(price * 0.9)\n\nclass VipDiscount(DiscountStrategy):\n    def calculate(self, price: int) -> int:\n        return int(price * 0.8)\n\nclass PriceCalculator:\n    def __init__(self, strategy: DiscountStrategy):\n        self.strategy = strategy\n\n    def get_price(self, price: int) -> int:\n        return self.strategy.calculate(price)\n\ncalc = PriceCalculator(NormalDiscount())\nprint(calc.get_price(1000))\n\ncalc = PriceCalculator(VipDiscount())\nprint(calc.get_price(1000))',
      expectedOutput: '900\n800',
      hints: [
        'NormalDiscount と VipDiscount で DiscountStrategy を継承します',
        'calculate で price * 0.9 と price * 0.8 を返します',
        'int() で整数に変換するのを忘れずに',
      ],
      explanation:
        'Strategy パターンは GoF デザインパターンの一つで、アルゴリズムの選択を実行時に行えます。条件分岐の代わりにポリモーフィズムを使うことで、新しい戦略の追加が既存コードの修正なしに可能です（開放閉鎖の原則 OCP）。Python では関数がファーストクラスオブジェクトなので、シンプルなケースでは関数を直接渡す方法も有効です。',
    },
  ],
};

export default course;
