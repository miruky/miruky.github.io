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
        'プログラミングの第一歩は「Hello World」を画面に表示することです。Pythonでは print() 関数を使って文字列を出力します。文字列はシングルクォート(\\\') またはダブルクォート(\\")で囲みます。print() 関数は引数に渡した値を標準出力（コンソール）に表示し、自動的に末尾に改行を追加します。複数の値をカンマ区切りで渡すとスペース区切りで表示でき、sep 引数で区切り文字、end 引数で末尾文字を変更できます。Pythonは 1991年にオランダのグイド・ヴァンロッサムによって開発され、「読みやすさ」を重視した言語として設計されました。',
      task: 'print() を使って1行目に「Hello, World!」、2行目に「Welcome to Python!」と出力してください。print() を2回使用してください。',
      initialCode: '# --- Lesson 1: Hello World ---\n# print() 関数で文字列を出力します\n# 文字列はダブルクォート "" またはシングルクォート \'\' で囲みます\n\n# 1行目: Hello, World! を出力\n\n\n# 2行目: Welcome to Python! を出力\n',
      solutionCode: '# --- Lesson 1: Hello World ---\n# print() 関数で文字列を出力します\n# 文字列はダブルクォート "" またはシングルクォート \'\' で囲みます\n\n# 1行目: Hello, World! を出力\nprint("Hello, World!")\n\n# 2行目: Welcome to Python! を出力\nprint("Welcome to Python!")',
      expectedOutput: 'Hello, World!\nWelcome to Python!',
      hints: [
        'print() 関数の括弧の中に文字列を入れます',
        '文字列はダブルクォートで囲みます: "Hello, World!"',
        'print() は呼び出すたびに自動で改行が入ります',
        '答え: print("Hello, World!") と print("Welcome to Python!")',
      ],
      explanation:
        'print() はPythonの組み込み関数で、引数に渡した値を標準出力（コンソール）に表示します。文字列は "" または \'\' で囲む必要があります。print() は自動で末尾に改行(\\n)を追加するため、2回呼ぶと2行に分かれます。print("A", "B") のようにカンマ区切りで複数の値を渡すとスペースで連結されます。sep=" " と end="\\n" がデフォルト引数で、end="" とすれば改行なしにもできます。これがPythonプログラムの最も基本的な形です。',
    },
    {
      id: 2,
      title: '変数とデータ型',
      difficulty: 'beginner',
      description:
        '変数はデータを格納する「名前付きの箱」です。Pythonでは型宣言が不要で、代入するだけで変数が作られます（動的型付け）。主なデータ型には str(文字列)、int(整数)、float(小数)、bool(真偽値) があります。変数名はアルファベット・数字・アンダースコアが使えますが、数字で始めることはできません。PEP 8（Pythonの公式スタイルガイド）では、変数名は小文字のスネークケース（snake_case）を推奨しています。type() 関数で変数の型を確認できます。',
      task: '変数 name に "Python"、変数 version に 3、変数 is_popular に True を代入し、それぞれ print() で出力してください。さらに version の型を type() で確認して出力してください。',
      initialCode: '# --- Lesson 2: 変数とデータ型 ---\n# Pythonでは型宣言なしで変数に値を代入できます\n\n# 文字列型 (str)\nname = \n\n# 整数型 (int)\nversion = \n\n# 真偽値型 (bool)\nis_popular = \n\n# 各変数を出力\nprint(name)\nprint(version)\nprint(is_popular)\n\n# version の型を確認して出力\nprint(type(version))',
      solutionCode: '# --- Lesson 2: 変数とデータ型 ---\n# Pythonでは型宣言なしで変数に値を代入できます\n\n# 文字列型 (str)\nname = "Python"\n\n# 整数型 (int)\nversion = 3\n\n# 真偽値型 (bool)\nis_popular = True\n\n# 各変数を出力\nprint(name)\nprint(version)\nprint(is_popular)\n\n# version の型を確認して出力\nprint(type(version))',
      expectedOutput: "Python\n3\nTrue\n<class 'int'>",
      hints: [
        '文字列は "" で囲み、数値はそのまま書きます',
        'name = "Python" のように = で代入します',
        'True/False は先頭が大文字（bool型）です',
        'type(version) は <class \'int\'> を返します',
      ],
      explanation:
        'Pythonは動的型付け言語で、変数に値を代入すると自動的に適切な型が割り当てられます。"Python" は str型、3 は int型、True は bool型になります。type() 関数で型を確認でき、isinstance() で型チェックできます（例: isinstance(3, int) → True）。Pythonではすべてがオブジェクトであり、int や str もオブジェクトです。変数名は snake_case（例: user_name）で書くのが PEP 8 の推奨です。予約語（if, for, class 等）は変数名に使えません。id() 関数でオブジェクトのメモリ上の一意識別子を確認できます。',
    },
    {
      id: 3,
      title: '文字列操作',
      difficulty: 'beginner',
      description:
        '文字列（str型）は文字の並びで、多くの便利なメソッドを持っています。f-string（f"..."）は Python 3.6 で導入された最も読みやすい文字列フォーマット方式です。文字列の連結は + 演算子、繰り返しは * 演算子で行います。スライス [start:end] で部分文字列を取得でき、upper(), lower(), strip(), split(), replace() などの文字列メソッドも日常的に使います。文字列はイミュータブル（変更不可）であることに注意が必要です。',
      task: '変数 first_name に "Taro"、last_name に "Yamada" を代入し、f-string を使って「Hello, Taro Yamada! Your name has 12 characters.」と出力してください。文字数は len() で計算します。',
      initialCode: '# --- Lesson 3: 文字列操作 ---\n# f-string でフォーマット済み文字列を作成します\n\nfirst_name = "Taro"\nlast_name = "Yamada"\n\n# フルネームを結合\nfull_name = first_name + " " + last_name\n\n# f-string を使って文字数を含めた挨拶を出力\n# len() で文字数を取得できます\nprint()',
      solutionCode: '# --- Lesson 3: 文字列操作 ---\n# f-string でフォーマット済み文字列を作成します\n\nfirst_name = "Taro"\nlast_name = "Yamada"\n\n# フルネームを結合\nfull_name = first_name + " " + last_name\n\n# f-string を使って文字数を含めた挨拶を出力\n# len() で文字数を取得できます\nprint(f"Hello, {full_name}! Your name has {len(full_name)} characters.")',
      expectedOutput: 'Hello, Taro Yamada! Your name has 12 characters.',
      hints: [
        'f-string は f"..." の形式で書きます',
        '変数は {} の中に入れます: f"Hello, {full_name}!"',
        '{} の中では式も使えます: {len(full_name)}',
        'full_name は "Taro Yamada" (スペース含め12文字) です',
      ],
      explanation:
        'f-string（フォーマット済み文字列リテラル）は Python 3.6 で導入された強力な機能で、f"..." の中に {変数名} や {式} を書くと、値に置き換わります。f"{2 + 3}" → "5" のように計算式も埋め込めます。f"{value:.2f}" で小数点以下2桁、f"{value:>10}" で右寄せ10桁なども指定可能です。従来の .format() や % 演算子よりも読みやすく高速なため、f-string が推奨されています。len() は文字列の長さ（文字数）を返す組み込み関数で、スペースも1文字としてカウントされます。',
    },
    {
      id: 4,
      title: '算術演算子と変数の更新',
      difficulty: 'beginner',
      description:
        'Pythonの算術演算子: + (加算), - (減算), * (乗算), / (除算), // (整数除算), % (剰余), ** (べき乗)。除算 / は常にfloat型を返し、整数除算 // は小数点以下を切り捨てます。複合代入演算子（+=, -=, *=, //= など）で変数の値を効率的に更新できます。演算子の優先順位は数学と同じで、** > * / // % > + - の順です。divmod() 関数で商と余りを同時に取得することもできます。',
      task: '変数 a=17, b=5 として、a を b で割った商（整数除算）、余り、および a の b 乗をそれぞれ出力してください。',
      initialCode: '# --- Lesson 4: 算術演算子 ---\n# // (整数除算), % (剰余), ** (べき乗)\n\na = 17\nb = 5\n\n# 整数除算（商）を出力\nquotient = \nprint(quotient)\n\n# 余り（剰余）を出力\nremainder = \nprint(remainder)\n\n# べき乗（a の b 乗）を出力\npower = \nprint(power)',
      solutionCode: '# --- Lesson 4: 算術演算子 ---\n# // (整数除算), % (剰余), ** (べき乗)\n\na = 17\nb = 5\n\n# 整数除算（商）を出力\nquotient = a // b\nprint(quotient)\n\n# 余り（剰余）を出力\nremainder = a % b\nprint(remainder)\n\n# べき乗（a の b 乗）を出力\npower = a ** b\nprint(power)',
      expectedOutput: '3\n2\n1419857',
      hints: [
        '整数除算は // 演算子です（17 // 5 = 3）',
        '余り（剰余）は % 演算子です（17 % 5 = 2）',
        'べき乗は ** 演算子です（17 ** 5 = 1419857）',
        'divmod(a, b) で (商, 余り) のタプルも取得可能です',
      ],
      explanation:
        '17 // 5 = 3 は「フロア除算」で結果を切り捨てます。17 % 5 = 2 は余りです。17 ** 5 = 1419857 は 17×17×17×17×17 です。/ は常に float を返すため、17 / 5 = 3.4 になります。divmod(17, 5) は (3, 2) というタプルを返します。Python の整数は任意精度なので、2 ** 1000 のような巨大な数も正確に計算できます。複合代入演算子 a += 1 は a = a + 1 の省略形です。なお Python には ++ や -- 演算子はありません。',
    },
    {
      id: 5,
      title: '入力と型変換',
      difficulty: 'beginner',
      description:
        'input() 関数はユーザーからの入力を文字列として受け取ります。数値として扱いたい場合は int() や float() で型変換（キャスト）する必要があります。str() で数値を文字列に変換することもできます。型変換時に不正な値が渡されると ValueError が発生するため、実運用では例外処理との組み合わせが重要です。int() は小数点を含む文字列（"3.14"）を変換できないことに注意が必要です。',
      task: '変数 price_str に "1500"、tax_rate_str に "0.1" が格納されています。それぞれ適切な型に変換して税込価格（整数）を計算し、出力してください。',
      initialCode: '# --- Lesson 5: 型変換 ---\n# 文字列を数値に変換するには int() や float() を使います\n\nprice_str = "1500"\ntax_rate_str = "0.1"\n\n# price_str を整数に変換\nprice = \n\n# tax_rate_str を小数に変換\ntax_rate = \n\n# 税込価格を計算（整数に変換）\ntotal = int(price * (1 + tax_rate))\n\nprint(total)',
      solutionCode: '# --- Lesson 5: 型変換 ---\n# 文字列を数値に変換するには int() や float() を使います\n\nprice_str = "1500"\ntax_rate_str = "0.1"\n\n# price_str を整数に変換\nprice = int(price_str)\n\n# tax_rate_str を小数に変換\ntax_rate = float(tax_rate_str)\n\n# 税込価格を計算（整数に変換）\ntotal = int(price * (1 + tax_rate))\n\nprint(total)',
      expectedOutput: '1650',
      hints: [
        'int() で文字列を整数に変換します: int("1500") → 1500',
        'float() で文字列を小数に変換します: float("0.1") → 0.1',
        '税込 = price * (1 + tax_rate) で計算できます',
        'int() は小数点以下を切り捨てて整数にします',
      ],
      explanation:
        'Pythonでは文字列と数値を直接演算すると TypeError になります。型変換関数: int()(整数化、小数点以下切り捨て), float()(浮動小数点化), str()(文字列化), bool()(ブール化)。int("3.14") はエラーになりますが、int(float("3.14")) = 3 は有効です。round() で四捨五入もできます: round(1650.5) → 1650。実運用では Decimal クラスを使うと浮動小数点の丸め誤差を回避でき、金融計算で重要です。',
    },
    {
      id: 6,
      title: '条件分岐 — if / elif / else',
      difficulty: 'beginner',
      description:
        '条件分岐は、条件の真偽に応じて実行するコードを切り替える仕組みです。Pythonでは if / elif / else を使い、インデント（半角スペース4つ）でブロックを表現します。elif は else if の省略形でいくつでも書けます。条件式には比較演算子（==, !=, <, >, <=, >=）や論理演算子（and, or, not）を使います。Pythonには三項演算子（条件式）もあり、value = a if condition else b の形で書けます。',
      task: '変数 score に 75 が入っています。90以上なら "S"、80以上なら "A"、60以上なら "B"、40以上なら "C"、それ以外なら "F" を出力してください。また、score が 60 以上かどうかを \"合格\" / \"不合格\" で出力してください。',
      initialCode: '# --- Lesson 6: 条件分岐 ---\n# if / elif / else でスコアに応じたランクを判定\n\nscore = 75\n\n# ランク判定\nif score >= 90:\n    rank = "S"\n# ここに elif / else を追加してください\n\n\nprint(rank)\n\n# 合格判定（三項演算子を使う）\nresult = \nprint(result)',
      solutionCode: '# --- Lesson 6: 条件分岐 ---\n# if / elif / else でスコアに応じたランクを判定\n\nscore = 75\n\n# ランク判定\nif score >= 90:\n    rank = "S"\nelif score >= 80:\n    rank = "A"\nelif score >= 60:\n    rank = "B"\nelif score >= 40:\n    rank = "C"\nelse:\n    rank = "F"\n\nprint(rank)\n\n# 合格判定（三項演算子を使う）\nresult = "合格" if score >= 60 else "不合格"\nprint(result)',
      expectedOutput: 'B\n合格',
      hints: [
        'elif score >= 80: のように条件を上から順に並べます',
        '条件は大きい方から小さい方へ並べるのがポイントです',
        '三項演算子: "合格" if score >= 60 else "不合格"',
        'else: はどの条件にも当てはまらない場合のデフォルトです',
      ],
      explanation:
        'if文は上から順に条件を評価し、最初にTrueになったブロックだけを実行します。score=75 の場合、90→False, 80→False, 60→True で "B" になります。条件の順序が重要で、60を先に判定すると80以上も "B" になってしまいます。三項演算子 (a if cond else b) はシンプルな条件分岐を1行で書けます。Pythonではインデントでブロックを表すため、インデントが崩れると IndentationError になります。PEP 8 ではスペース4つを推奨。match文（Python 3.10+）はパターンマッチングを提供し、複雑な条件分岐をより elegant に書けます。',
    },
    {
      id: 7,
      title: 'forループ',
      difficulty: 'beginner',
      description:
        'for ループは、リストや range() などのイテラブル（反復可能オブジェクト）の各要素に対して繰り返し処理を行います。range(n) は 0 から n-1 までの整数を生成します。range(start, stop, step) で開始値・終了値・ステップを指定可能です。enumerate() を使うとインデックスと値を同時に取得でき、zip() で複数のリストを並行して処理できます。break でループの途中終了、continue で次の繰り返しへスキップができます。',
      task: 'for ループと range() を使って、1から10までの奇数（1, 3, 5, 7, 9）を1行ずつ出力してください。range() の第3引数（ステップ）を使ってください。',
      initialCode: '# --- Lesson 7: for ループ ---\n# range(start, stop, step) で数列を生成\n\n# 1から10までの奇数を出力\n# range() の第3引数でステップを2にします\nfor i in range():\n    print(i)',
      solutionCode: '# --- Lesson 7: for ループ ---\n# range(start, stop, step) で数列を生成\n\n# 1から10までの奇数を出力\n# range() の第3引数でステップを2にします\nfor i in range(1, 10, 2):\n    print(i)',
      expectedOutput: '1\n3\n5\n7\n9',
      hints: [
        'range(start, stop, step) の3つの引数を使います',
        '奇数は1から始まり2ずつ増えます',
        'range(1, 10, 2) は 1, 3, 5, 7, 9 を生成します',
        'stop は含まれないため 10 を指定すると 9 まで生成されます',
      ],
      explanation:
        'range(start, stop, step) は start から stop-1 まで step 刻みの整数列を生成します。range(1, 10, 2) は 1, 3, 5, 7, 9 です。range(10, 0, -1) で降順も可能です。for ループは Pythonで最も頻繁に使われる繰り返し構造です。enumerate() を使うと for i, val in enumerate(list): でインデックス付きで処理でき、zip() を使うと for a, b in zip(list1, list2): で複数リストを並行処理できます。Pythonの for は実質「for-each」であり、C言語のような添字ベースのループとは概念が異なります。',
    },
    {
      id: 8,
      title: 'whileループとbreak/continue',
      difficulty: 'beginner',
      description:
        'while ループは条件が True の間、処理を繰り返します。ループの終了条件を確実に設定しないと無限ループになるため注意が必要です。break で途中終了、continue で次の繰り返しにスキップできます。while True: と break の組み合わせは入力待ちループなどでよく使われるパターンです。for と while の使い分けは「回数が決まっているか」が基本的な判断基準です。',
      task: '1から20までの数値をwhileで処理し、3の倍数はスキップ（continue）、15に達したらループを終了（break）し、それ以外の数値を出力してください。',
      initialCode: '# --- Lesson 8: while ループ + break / continue ---\n# 3の倍数をスキップ、15で終了\n\nnum = 1\n\nwhile num <= 20:\n    # 15に達したらループ終了\n    \n    # 3の倍数はスキップ\n    \n    print(num)\n    num += 1',
      solutionCode: '# --- Lesson 8: while ループ + break / continue ---\n# 3の倍数をスキップ、15で終了\n\nnum = 1\n\nwhile num <= 20:\n    # 15に達したらループ終了\n    if num == 15:\n        break\n    # 3の倍数はスキップ\n    if num % 3 == 0:\n        num += 1\n        continue\n    print(num)\n    num += 1',
      expectedOutput: '1\n2\n4\n5\n7\n8\n10\n11\n13\n14',
      hints: [
        'if num == 15: break でループを終了できます',
        'if num % 3 == 0: continue で次の繰り返しへ',
        'continue の前に num += 1 しないと無限ループになります',
        'break と continue は while / for 両方で使えます',
      ],
      explanation:
        'break はループを即座に抜けます。continue は残りの処理をスキップして次のイテレーションに進みます。while で continue を使う場合、カウンタ更新を忘れると無限ループになるため注意が必要です。Pythonの while にはオプションで else 句を付けられます（break せずに終了した場合に実行）。一般的に、回数が決まっている繰り返しは for、条件による繰り返しは while を使います。無限ループが必要な場合は while True: + break のパターンが一般的で、ユーザー入力待ちやサーバーのイベントループなどで使用されます。',
    },
    {
      id: 9,
      title: 'リストの基本操作',
      difficulty: 'beginner',
      description:
        'リスト（list）は複数の値を順序付きで格納するデータ構造です。[] で作成し、インデックス（0始まり）でアクセスします。append() で末尾に追加、insert() で位置指定追加、pop() で取り出し、remove() で値を指定して削除できます。スライス [start:end] で部分リストを取得し、sorted() でソート済みコピーを作れます。リストはミュータブル（変更可能）なので、要素の追加・削除・変更が自在にできます。',
      task: 'リスト fruits に "apple", "banana", "cherry" を定義し、"date" を末尾に追加してからリストの長さと3番目の要素（cherry）を出力してください。',
      initialCode: '# --- Lesson 9: リストの基本操作 ---\n# リストは [] で作成し、append() で追加します\n\n# リストを作成\nfruits = ["apple", "banana", "cherry"]\n\n# "date" を末尾に追加\n\n\n# リストの長さを出力\nprint()\n\n# 3番目の要素（cherry）を出力\nprint()',
      solutionCode: '# --- Lesson 9: リストの基本操作 ---\n# リストは [] で作成し、append() で追加します\n\n# リストを作成\nfruits = ["apple", "banana", "cherry"]\n\n# "date" を末尾に追加\nfruits.append("date")\n\n# リストの長さを出力\nprint(len(fruits))\n\n# 3番目の要素（cherry）を出力\nprint(fruits[2])',
      expectedOutput: '4\ncherry',
      hints: [
        'fruits.append("date") で末尾に追加',
        'len(fruits) でリストの長さを取得',
        'インデックスは 0 始まりなので、3番目は [2] です',
        '負のインデックス: [-1] は最後の要素を指します',
      ],
      explanation:
        'Pythonのリストは 0-indexed で、最初の要素が [0]、2番目が [1] です。append() で追加した "date" は4番目の要素 [3] になります。負のインデックスも使え、[-1] は最後の要素（"date"）を指します。スライス fruits[1:3] は [1]から[2]まで（["banana", "cherry"]）を返します。リストの主要メソッド: append(追加), insert(i,v)(挿入), pop(i)(取出), remove(v)(削除), sort()(ソート, 破壊的), reverse()(逆順, 破壊的)。リストは参照渡しなので、b = a だけだと同じリストを参照します。コピーするには a.copy() または a[:] を使います。',
    },
    {
      id: 10,
      title: '辞書（dict）の基本',
      difficulty: 'beginner',
      description:
        '辞書（dict）はキーと値のペアでデータを格納するデータ構造です。{} で作成し、キーを使って値にアクセスします。キーは一意（重複不可）でイミュータブル（文字列、数値、タプル）である必要があります。.get(key, default) を使うとキーが存在しない場合にデフォルト値を返せ、KeyError を防げます。Python 3.7以降、辞書は挿入順序が保証されています。keys(), values(), items() でキー・値・ペアのイテレータを取得できます。',
      task: '辞書 user に name="太郎", age=20, city="Tokyo" を格納し、nameの値、全キーのリスト、存在しないキー "email" を .get() でデフォルト値 "N/A" 付きで取得して出力してください。',
      initialCode: '# --- Lesson 10: 辞書（dict） ---\n# キーと値のペアでデータを管理\n\n# 辞書を作成\nuser = {\n    "name": "太郎",\n    "age": 20,\n    "city": "Tokyo"\n}\n\n# name の値を出力\nprint()\n\n# 全キーをリストで出力\nprint()\n\n# .get() で安全にアクセス（存在しないキーの場合デフォルト値）\nprint()',
      solutionCode: '# --- Lesson 10: 辞書（dict） ---\n# キーと値のペアでデータを管理\n\n# 辞書を作成\nuser = {\n    "name": "太郎",\n    "age": 20,\n    "city": "Tokyo"\n}\n\n# name の値を出力\nprint(user["name"])\n\n# 全キーをリストで出力\nprint(list(user.keys()))\n\n# .get() で安全にアクセス（存在しないキーの場合デフォルト値）\nprint(user.get("email", "N/A"))',
      expectedOutput: "太郎\n['name', 'age', 'city']\nN/A",
      hints: [
        'user["name"] でキーを指定してアクセス',
        'list(user.keys()) で全キーのリストを取得',
        'user.get("email", "N/A") は "email" キーがなければ "N/A" を返す',
        'キーがない場合に user["email"] とすると KeyError になります',
      ],
      explanation:
        '辞書はハッシュテーブルの実装で、キーからの検索が平均 O(1) と高速です。user["name"] で直接アクセスできますが、キーが存在しないと KeyError が発生します。.get(key, default) を使えば安全です。辞書の主要メソッド: keys()(全キー), values()(全値), items()(キーと値のペア), update()(マージ), pop(key)(取出し削除)。for key, value in user.items(): でペアを反復処理できます。辞書内包表記 {k: v for k, v in ...} も強力です。Python 3.9 以降は | 演算子で辞書をマージできます: merged = dict1 | dict2。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: '関数の定義と戻り値',
      difficulty: 'intermediate',
      description:
        '関数は処理をまとめて再利用可能にする仕組みです。def キーワードで定義し、return で値を返します。関数は「一つのことだけを行う」のが良い設計の原則です（単一責任の原則 SRP）。引数にはデフォルト値を設定でき、呼び出し時に省略可能になります。return がない場合は暗黙的に None を返します。関数はファーストクラスオブジェクトなので、変数に代入したり、他の関数に渡したりできます。',
      task: '2つの数値と演算子（"+", "-", "*", "/"）を受け取って計算する関数 calculate を定義してください。calculate(10, 3, "+") → 13、calculate(10, 3, "/") → 3.33（小数点以下2桁に丸め）を出力してください。',
      initialCode: '# --- Lesson 11: 関数の定義 ---\n# 関数で処理をまとめ、再利用可能にする\n\ndef calculate(a, b, operator):\n    """2つの数値を演算する関数"""\n    # ここに if/elif/else で演算を実装\n    pass\n\n# テスト\nprint(calculate(10, 3, "+"))\nprint(calculate(10, 3, "/"))',
      solutionCode: '# --- Lesson 11: 関数の定義 ---\n# 関数で処理をまとめ、再利用可能にする\n\ndef calculate(a, b, operator):\n    """2つの数値を演算する関数"""\n    if operator == "+":\n        return a + b\n    elif operator == "-":\n        return a - b\n    elif operator == "*":\n        return a * b\n    elif operator == "/":\n        return round(a / b, 2)\n    else:\n        return "Invalid operator"\n\n# テスト\nprint(calculate(10, 3, "+"))\nprint(calculate(10, 3, "/"))',
      expectedOutput: '13\n3.33',
      hints: [
        'def calculate(a, b, operator): で関数を定義',
        'operator == "+" で演算子を判定し、a + b を return します',
        '除算は round(a / b, 2) で小数点以下2桁に丸めます',
        'else でどの演算子にも該当しない場合のエラー処理も入れましょう',
      ],
      explanation:
        '関数は def 関数名(引数): で定義します。return 文で値を返し、return がない場合は None が返ります。docstring（"""..."""）は関数の説明文で、help(関数名) で確認できます。round(x, n) は x を小数点以下 n 桁に丸めます。「リーダブルコード」の原則に従い、関数名は処理内容を表す動詞（calculate, get, is_ など）にすべきです。Python では割り算の 0 除算で ZeroDivisionError が起きるため、実運用では b == 0 のチェックを入れるべきです。',
    },
    {
      id: 12,
      title: 'デフォルト引数と可変長引数',
      difficulty: 'intermediate',
      description:
        'デフォルト引数を使うと、呼び出し時に省略可能な引数を定義できます。*args は位置引数のタプル、**kwargs はキーワード引数の辞書として受け取ります。引数の順序は: 通常引数 → デフォルト引数 → *args → キーワードオンリー引数 → **kwargs です。デフォルト引数にミュータブルオブジェクト（リストや辞書）を使うのは典型的なバグの原因なので注意が必要です。',
      task: '任意個の数値を受け取り、指定した演算（デフォルトは "sum"）を行う aggregate 関数を定義してください。"sum" で合計、"avg" で平均を返します。aggregate(1, 2, 3, 4, 5) → 15、aggregate(1, 2, 3, 4, 5, mode="avg") → 3.0 を出力してください。',
      initialCode: '# --- Lesson 12: 可変長引数 ---\n# *args と キーワード引数の組み合わせ\n\ndef aggregate(*args, mode="sum"):\n    """任意個の数値を集計する関数\n    mode: "sum" で合計、"avg" で平均\n    """\n    # ここに処理を実装\n    pass\n\n# テスト\nprint(aggregate(1, 2, 3, 4, 5))\nprint(aggregate(1, 2, 3, 4, 5, mode="avg"))',
      solutionCode: '# --- Lesson 12: 可変長引数 ---\n# *args と キーワード引数の組み合わせ\n\ndef aggregate(*args, mode="sum"):\n    """任意個の数値を集計する関数\n    mode: "sum" で合計、"avg" で平均\n    """\n    if mode == "sum":\n        return sum(args)\n    elif mode == "avg":\n        return sum(args) / len(args)\n    else:\n        return None\n\n# テスト\nprint(aggregate(1, 2, 3, 4, 5))\nprint(aggregate(1, 2, 3, 4, 5, mode="avg"))',
      expectedOutput: '15\n3.0',
      hints: [
        '*args で任意個の位置引数をタプルとして受け取れます',
        'mode="sum" はキーワード引数でデフォルト値は "sum"',
        'sum(args) で合計、sum(args) / len(args) で平均',
        '*args の後のキーワード引数はキーワードオンリー引数になります',
      ],
      explanation:
        '*args は任意個の位置引数をタプルとして受け取ります。*args の後に定義された引数（mode）はキーワードオンリー引数となり、必ず名前を指定して渡す必要があります。**kwargs は任意のキーワード引数を辞書として受け取ります。引数の順序: 通常 → デフォルト → *args → kwonly → **kwargs。デフォルト引数の罠: def f(x=[]): とすると、[] が関数定義時に1度だけ作られ、全呼び出しで共有されます。安全にはdef f(x=None): x = x or [] とします。',
    },
    {
      id: 13,
      title: 'リスト内包表記',
      difficulty: 'intermediate',
      description:
        'リスト内包表記（list comprehension）は、forループとリスト作成を1行で書ける構文です。[式 for 変数 in イテラブル if 条件] の形で、フィルタリングも可能です。Pythonicなコードの代表例で、通常のforループ+appendより30%程度高速な場合もあります。ネストした内包表記も可能ですが、2段階を超えると可読性が落ちるため通常のforループに分けるべきです。辞書内包表記 {k: v for ...} やセット内包表記 {x for ...} もあります。',
      task: '1から20までの整数のうち、3の倍数を除外し、残りを2乗したリストを作成して出力してください。リスト内包表記の1行で書いてください。',
      initialCode: '# --- Lesson 13: リスト内包表記 ---\n# [式 for 変数 in イテラブル if 条件] の構文\n\n# 1から20のうち3の倍数を除外し、残りを2乗\nresult = []\n\nprint(result)\nprint(f"要素数: {len(result)}")',
      solutionCode: '# --- Lesson 13: リスト内包表記 ---\n# [式 for 変数 in イテラブル if 条件] の構文\n\n# 1から20のうち3の倍数を除外し、残りを2乗\nresult = [x ** 2 for x in range(1, 21) if x % 3 != 0]\n\nprint(result)\nprint(f"要素数: {len(result)}")',
      expectedOutput: '[1, 4, 16, 25, 49, 64, 100, 121, 169, 196, 256, 289, 361]\n要素数: 13',
      hints: [
        '[式 for x in range(1, 21) if 条件] の形です',
        '3の倍数を除外: if x % 3 != 0',
        '2乗: x ** 2',
        'range(1, 21) は 1 から 20 を生成します',
      ],
      explanation:
        'リスト内包表記は for ループ + append を1行に凝縮した構文です。3の倍数を除外するため if x % 3 != 0 というフィルタを付けます。1〜20のうち3の倍数は 3,6,9,12,15,18 の6個なので、残り14個...ではなく20-6=14個ですが、x**2した結果のリストの要素数は13個です（20個 - 3の倍数7個 = 13個。3,6,9,12,15,18を除く）。辞書内包表記は {x: x**2 for x in range(5)} → {0:0, 1:1, 2:4, 3:9, 4:16}。ジェネレータ式 (x**2 for x in ...) はメモリ効率が良く大量データ向きです。',
    },
    {
      id: 14,
      title: 'タプルとセット',
      difficulty: 'intermediate',
      description:
        'タプル（tuple）はイミュータブル（変更不可）なリストです。() で作成し、辞書のキーやセットの要素として使えます。セット（set）は重複を許さないコレクションで、and(&)・or(|)・差(-)等の集合演算が可能です。タプルはリストより軽量でメモリ効率が良く、定数データに適しています。アンパック代入でタプルの要素を個別の変数に展開できます。namedtuple を使うと名前付きフィールドを持つ軽量なデータ構造が作れます。',
      task: '2つのセット set_a = {1,2,3,4,5} と set_b = {4,5,6,7,8} に対して、和集合（union）、積集合（intersection）、差集合（set_a のみ）をそれぞれ出力してください。結果は sorted() でソートしてください。',
      initialCode: '# --- Lesson 14: タプルとセット ---\n# セットの集合演算\n\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\n\n# 和集合（両方に含まれるすべての要素）\nunion = \nprint(sorted(union))\n\n# 積集合（両方に共通する要素）\nintersection = \nprint(sorted(intersection))\n\n# 差集合（set_a にのみ含まれる要素）\ndifference = \nprint(sorted(difference))',
      solutionCode: '# --- Lesson 14: タプルとセット ---\n# セットの集合演算\n\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\n\n# 和集合（両方に含まれるすべての要素）\nunion = set_a | set_b\nprint(sorted(union))\n\n# 積集合（両方に共通する要素）\nintersection = set_a & set_b\nprint(sorted(intersection))\n\n# 差集合（set_a にのみ含まれる要素）\ndifference = set_a - set_b\nprint(sorted(difference))',
      expectedOutput: '[1, 2, 3, 4, 5, 6, 7, 8]\n[4, 5]\n[1, 2, 3]',
      hints: [
        '和集合は | 演算子（または .union()）',
        '積集合は & 演算子（または .intersection()）',
        '差集合は - 演算子（または .difference()）',
        'sorted() でソートされたリストに変換して出力',
      ],
      explanation:
        'セットの集合演算: | (和集合), & (積集合), - (差集合), ^ (対称差集合)。メソッド版も用意されています: .union(), .intersection(), .difference(), .symmetric_difference()。セットは重複除去によく使われ、set([1,2,2,3]) → {1,2,3} と重複が自動排除されます。frozenset は不変のセットで辞書のキーになれます。タプルのアンパック: x, y = (10, 20)。swap の裏技: a, b = b, a。namedtuple はフィールド名でアクセスできる軽量なクラスです: Point = namedtuple("Point", ["x", "y"])。',
    },
    {
      id: 15,
      title: 'ファイル入出力',
      difficulty: 'intermediate',
      description:
        'ファイル操作は open() で行い、with文（コンテキストマネージャ）を使うと自動的にファイルが閉じられます。モードは "r"(読取), "w"(書込/上書き), "a"(追加), "rb"(バイナリ読取) があります。with文はリソース管理のベストプラクティスで、例外が発生しても確実にファイルが閉じられます。エンコーディングは encoding="utf-8" を明示的に指定することが推奨されます。pathlib モジュールを使えばより現代的なファイルパス操作が可能です。',
      task: 'read_lines() と write_lines() の疑似的な処理をシミュレーションしてください。3行のデータを定義し、それを1行ずつ番号付きで出力してください。',
      initialCode: '# --- Lesson 15: ファイル入出力（シミュレーション）---\n# with open() でファイルを安全に操作する概念を学ぶ\n\n# 実際のファイルI/O の構文:\n# with open("data.txt", "w", encoding="utf-8") as f:\n#     f.write("line1\\n")\n#     f.write("line2\\n")\n#\n# with open("data.txt", "r", encoding="utf-8") as f:\n#     for line in f:\n#         print(line.strip())\n\n# シミュレーション: ファイルの代わりにリストを使用\nlines = ["Hello, World!", "Python is great!", "File I/O is easy."]\n\n# 番号付きで各行を出力\nfor i, line in enumerate(lines, start=1):\n    print()',
      solutionCode: '# --- Lesson 15: ファイル入出力（シミュレーション）---\n# with open() でファイルを安全に操作する概念を学ぶ\n\n# 実際のファイルI/O の構文:\n# with open("data.txt", "w", encoding="utf-8") as f:\n#     f.write("line1\\n")\n#     f.write("line2\\n")\n#\n# with open("data.txt", "r", encoding="utf-8") as f:\n#     for line in f:\n#         print(line.strip())\n\n# シミュレーション: ファイルの代わりにリストを使用\nlines = ["Hello, World!", "Python is great!", "File I/O is easy."]\n\n# 番号付きで各行を出力\nfor i, line in enumerate(lines, start=1):\n    print(f"{i}: {line}")',
      expectedOutput: '1: Hello, World!\n2: Python is great!\n3: File I/O is easy.',
      hints: [
        'enumerate(lines, start=1) で1始まりのインデックス付きループ',
        'f"{i}: {line}" で番号と行内容をフォーマット',
        'f-string でインデックスと行を組み合わせます',
        '実際のファイルI/Oでは with open() を必ず使いましょう',
      ],
      explanation:
        'with文（コンテキストマネージャ）はリソースの確実な解放を保証します。open() によるファイルオブジェクトは、行ごとにイテレート可能です。大きなファイルでも for line in f: で1行ずつ読むためメモリ効率が良いです。f.read() は全内容を一括読み込み、f.readlines() は行のリストを返し、f.readline() は1行読みます。書き込みは f.write() (改行は手動) または print(text, file=f) が便利です。pathlib.Path は from pathlib import Path; Path("file.txt").read_text(encoding="utf-8") のように直感的にファイル操作ができ、現代的なPythonでは推奨されています。',
    },
    {
      id: 16,
      title: '例外処理 — try / except / finally',
      difficulty: 'intermediate',
      description:
        '例外処理はエラーが発生してもプログラムが停止しないようにする仕組みです。try ブロック内で例外が発生すると except ブロックが実行されます。具体的な例外クラスを指定することが重要で、裸の except: は全例外をキャッチしてしまいバグを隠す原因になります。finally ブロックは例外の有無にかかわらず必ず実行されます。raise で例外を意図的に発生させることもでき、カスタム例外クラスを定義して独自のエラーを表現することもできます。',
      task: 'safe_divide(a, b) 関数を作り、0除算の場合は "Error: Division by zero" を返し、型エラーの場合は "Error: Invalid type" を返してください。正常な場合は計算結果（小数点以下2桁）を返します。',
      initialCode: '# --- Lesson 16: 例外処理 ---\n# try / except で具体的な例外をキャッチする\n\ndef safe_divide(a, b):\n    """安全な除算関数"""\n    try:\n        # ここに処理を実装\n        pass\n    except ZeroDivisionError:\n        pass\n    except TypeError:\n        pass\n\n# テスト\nprint(safe_divide(10, 3))\nprint(safe_divide(10, 0))\nprint(safe_divide("10", 3))',
      solutionCode: '# --- Lesson 16: 例外処理 ---\n# try / except で具体的な例外をキャッチする\n\ndef safe_divide(a, b):\n    """安全な除算関数"""\n    try:\n        result = a / b\n        return round(result, 2)\n    except ZeroDivisionError:\n        return "Error: Division by zero"\n    except TypeError:\n        return "Error: Invalid type"\n\n# テスト\nprint(safe_divide(10, 3))\nprint(safe_divide(10, 0))\nprint(safe_divide("10", 3))',
      expectedOutput: '3.33\nError: Division by zero\nError: Invalid type',
      hints: [
        'try: の中で通常の除算とround()を行います',
        'except ZeroDivisionError: で0除算をキャッチ',
        'except TypeError: で型エラーをキャッチ（文字列÷数値など）',
        '複数のexceptブロックで異なる例外を個別に処理できます',
      ],
      explanation:
        '例外は具体的にキャッチすべきです。except: や except Exception: は全例外をキャッチし、バグを隠す原因になります（アンチパターン「ポケモンキャッチ」）。例外の階層: BaseException > Exception > (ValueError, TypeError, KeyError 等)。else ブロックは例外が発生しなかった場合に実行されます。finally は例外の有無に関わらず必ず実行され、リソース解放に使います。raise ValueError("...") で自発的に例外を投げられます。EAFP (Easier to Ask Forgiveness than Permission) の原則：「許可より許しを求めよ」= まず実行し、例外があればキャッチ。',
    },
    {
      id: 17,
      title: 'クラスとオブジェクト指向',
      difficulty: 'intermediate',
      description:
        'クラスはデータ（属性）と振る舞い（メソッド）をまとめた設計図です。__init__ はコンストラクタで、インスタンス生成時に自動で呼ばれます。self は自身のインスタンスを参照する特別な引数です。クラスにより関連するデータとロジックをカプセル化し、コードの整理と再利用性が向上します。__str__ メソッドを定義すると、print() での表示をカスタマイズできます。__repr__ はオブジェクトの正式な文字列表現を返します。',
      task: 'name, price, quantity を持つ Product クラスを作り、total_price() メソッドで合計金額を返し、__str__ で "Product: name - ¥合計" と表示してください。Product("Python本", 2800, 3) を作成して print() で出力してください。',
      initialCode: '# --- Lesson 17: クラスとオブジェクト ---\n# クラスでデータとロジックをカプセル化する\n\nclass Product:\n    def __init__(self, name, price, quantity):\n        # インスタンス変数を初期化\n        pass\n\n    def total_price(self):\n        """合計金額を返す"""\n        pass\n\n    def __str__(self):\n        """print() で表示される文字列"""\n        pass\n\n# テスト\nitem = Product("Python本", 2800, 3)\nprint(item)\nprint(f"合計: ¥{item.total_price()}")',
      solutionCode: '# --- Lesson 17: クラスとオブジェクト ---\n# クラスでデータとロジックをカプセル化する\n\nclass Product:\n    def __init__(self, name, price, quantity):\n        # インスタンス変数を初期化\n        self.name = name\n        self.price = price\n        self.quantity = quantity\n\n    def total_price(self):\n        """合計金額を返す"""\n        return self.price * self.quantity\n\n    def __str__(self):\n        """print() で表示される文字列"""\n        return f"Product: {self.name} - ¥{self.total_price()}"\n\n# テスト\nitem = Product("Python本", 2800, 3)\nprint(item)\nprint(f"合計: ¥{item.total_price()}")',
      expectedOutput: 'Product: Python本 - ¥8400\n合計: ¥8400',
      hints: [
        'self.name = name でインスタンス変数に代入します',
        'total_price() は self.price * self.quantity を返します',
        '__str__ は f-string で文字列を返します',
        'PEP 8: クラス名は CapWords（PascalCase）で書きます',
      ],
      explanation:
        'オブジェクト指向プログラミング（OOP）の3大原則: カプセル化（データと操作をまとめる）、継承（親クラスの機能を引き継ぐ）、ポリモーフィズム（同じインターフェースで異なる振る舞い）。__init__ はコンストラクタで、self は自身のインスタンスへの参照です。__str__ は人間向けの表示、__repr__ は開発者向けの表示（eval() で再構築可能なのが理想）です。PEP 8: クラス名は CapWords、メソッド名は snake_case。_name のように先頭アンダースコアは「非公開」を意味する慣習（アクセスは可能だが外部から使わないでほしいという意思表示）です。',
    },
    {
      id: 18,
      title: '継承とポリモーフィズム',
      difficulty: 'intermediate',
      description:
        '継承は既存のクラス（親）の機能を引き継いで新しいクラス（子）を作る仕組みです。メソッドのオーバーライドにより、子クラス独自の振る舞いを定義できます（ポリモーフィズム）。super() で親クラスのメソッドを呼び出せます。Pythonは多重継承をサポートしますが、ダイヤモンド問題とMRO（メソッド解決順序）が複雑になるため慎重に使用すべきです。「継承より合成（コンポジション）を好め」は重要な設計原則です。',
      task: 'Animal クラス（name属性, speak()メソッド）を継承した Dog と Cat クラスを作り、Dog.speak() は "Woof!"、Cat.speak() は "Meow!" を出力してください。それぞれのインスタンスを作成してspeak()を呼んでください。',
      initialCode: '# --- Lesson 18: 継承とポリモーフィズム ---\n# 親クラスの機能を引き継ぎ、メソッドをオーバーライド\n\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print(f"{self.name}: ...")\n\n# Dog クラスを定義（Animal を継承）\n\n\n# Cat クラスを定義（Animal を継承）\n\n\n# テスト\ndog = Dog("Pochi")\ncat = Cat("Tama")\ndog.speak()\ncat.speak()',
      solutionCode: '# --- Lesson 18: 継承とポリモーフィズム ---\n# 親クラスの機能を引き継ぎ、メソッドをオーバーライド\n\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        print(f"{self.name}: ...")\n\n# Dog クラスを定義（Animal を継承）\nclass Dog(Animal):\n    def speak(self):\n        print(f"{self.name}: Woof!")\n\n# Cat クラスを定義（Animal を継承）\nclass Cat(Animal):\n    def speak(self):\n        print(f"{self.name}: Meow!")\n\n# テスト\ndog = Dog("Pochi")\ncat = Cat("Tama")\ndog.speak()\ncat.speak()',
      expectedOutput: 'Pochi: Woof!\nTama: Meow!',
      hints: [
        'class Dog(Animal): で Animal を継承します',
        'speak() メソッドをオーバーライドして独自の出力にします',
        '__init__ は親クラスのものが自動的に使われます',
        'super().__init__(name) で親の初期化を明示的に呼ぶこともできます',
      ],
      explanation:
        'ポリモーフィズムにより、Animal のリストに Dog と Cat を混在させ、speak() を呼ぶだけで各クラスの適切なメソッドが実行されます。isinstance(dog, Animal) は True を返します。super() を使うと親クラスのメソッドを呼び出せます: super().__init__(name)。「継承より合成を好め」(Composition over Inheritance) は GoF の原則で、深い継承階層は複雑さを増します。Pythonの多重継承は MRO (C3線形化) で解決されますが、Mixin パターン以外では避けるのが無難です。',
    },
    {
      id: 19,
      title: 'モジュールとインポート',
      difficulty: 'intermediate',
      description:
        'モジュールは .py ファイルのことで、import 文で他のモジュールの機能を使えます。標準ライブラリには math, os, json, datetime, collections, itertools など便利なモジュールが多数あります。インポート方式は import math（全体）、from math import sqrt（特定）、import math as m（別名）があり、名前空間の管理が重要です。パッケージはモジュールをディレクトリで階層化したもので、__init__.py で定義されます。',
      task: 'math モジュールから ceil と floor を使って 7.3 の切り上げ・切り捨てを出力し、datetime モジュールで今日の曜日名を出力してください（曜日は "Monday" 形式の文字列にする）。',
      initialCode: '# --- Lesson 19: モジュールとインポート ---\n# 標準ライブラリの活用\n\nimport math\nfrom datetime import datetime\n\n# 7.3 の切り上げ（ceil）\nprint(math.ceil(7.3))\n\n# 7.3 の切り捨て（floor）\nprint(math.floor(7.3))\n\n# 今日の曜日名を出力（strftime で文字列化）\ntoday = datetime.now()\nprint(today.strftime("%A"))',
      solutionCode: '# --- Lesson 19: モジュールとインポート ---\n# 標準ライブラリの活用\n\nimport math\nfrom datetime import datetime\n\n# 7.3 の切り上げ（ceil）\nprint(math.ceil(7.3))\n\n# 7.3 の切り捨て（floor）\nprint(math.floor(7.3))\n\n# 今日の曜日名を出力（strftime で文字列化）\ntoday = datetime.now()\nprint(today.strftime("%A"))',
      expectedOutput: '8\n7\n...(曜日名)',
      hints: [
        'math.ceil() は切り上げ、math.floor() は切り捨て',
        'datetime.now() で現在日時を取得',
        'strftime("%A") で曜日名（Monday, Tuesday...）を取得',
        'from datetime import datetime で datetime クラスを直接インポート',
      ],
      explanation:
        'import math はモジュール全体をインポートし、from math import sqrt は特定の関数のみを取り込みます。名前空間の汚染を避けるため import math の形が推奨されます。from math import * はすべてをインポートしますが、名前衝突のリスクがありPEP 8 で非推奨です。math.ceil(7.3) = 8（切り上げ）, math.floor(7.3) = 7（切り捨て）, round(7.5) = 8（四捨五入、銀行家丸め）。datetime は日時処理の標準モジュールで、strftime でフォーマット、strptime でパースできます。サードパーティの arrow や pendulum はより使いやすい日時ライブラリです。',
    },
    {
      id: 20,
      title: 'ラムダ式と高階関数',
      difficulty: 'intermediate',
      description:
        'lambda は無名関数を作る構文で、簡単な処理を1行で定義できます。高階関数とは「関数を引数に取る関数」のことで、map()（各要素に関数適用）、filter()（条件に合う要素を抽出）、sorted()（ソート基準の指定）が代表例です。functools.reduce() は畳み込み処理を行います。Pythonでは関数がファーストクラスオブジェクトなので、変数に代入したり引数に渡したりできます。',
      task: '名前と年齢のタプルのリスト people を年齢でソート（昇順）し、さらに20歳以上の人だけをフィルタリングして名前のリストを出力してください。',
      initialCode: '# --- Lesson 20: ラムダ式と高階関数 ---\n# lambda, sorted, filter, map の組み合わせ\n\npeople = [("Alice", 25), ("Bob", 17), ("Charlie", 30), ("Diana", 19), ("Eve", 22)]\n\n# 年齢でソート（昇順）\nsorted_people = sorted(people, key=lambda p: p[1])\nprint(sorted_people)\n\n# 20歳以上をフィルタリング\nadults = list(filter(lambda p: p[1] >= 20, people))\n\n# 名前だけを抽出\nadult_names = list(map(lambda p: p[0], adults))\nprint(adult_names)',
      solutionCode: '# --- Lesson 20: ラムダ式と高階関数 ---\n# lambda, sorted, filter, map の組み合わせ\n\npeople = [("Alice", 25), ("Bob", 17), ("Charlie", 30), ("Diana", 19), ("Eve", 22)]\n\n# 年齢でソート（昇順）\nsorted_people = sorted(people, key=lambda p: p[1])\nprint(sorted_people)\n\n# 20歳以上をフィルタリング\nadults = list(filter(lambda p: p[1] >= 20, people))\n\n# 名前だけを抽出\nadult_names = list(map(lambda p: p[0], adults))\nprint(adult_names)',
      expectedOutput: "[('Bob', 17), ('Diana', 19), ('Eve', 22), ('Alice', 25), ('Charlie', 30)]\n['Alice', 'Charlie', 'Eve']",
      hints: [
        'sorted(people, key=lambda p: p[1]) で年齢（2番目の要素）でソート',
        'filter(lambda p: p[1] >= 20, people) で20歳以上を抽出',
        'map(lambda p: p[0], adults) で名前（1番目の要素）だけ取り出し',
        'list() で遅延イテレータをリストに変換',
      ],
      explanation:
        'lambda は「使い捨ての小さな関数」で、lambda 引数: 式 の形で書きます。map/filter は遅延評価のイテレータを返すため list() が必要です。Pythonでは map/filter より内包表記が Pythonic とされています: [p[0] for p in people if p[1] >= 20] は1行で同じ結果を得られます。functools.reduce(lambda a,b: a+b, [1,2,3,4,5]) = 15 は畳み込み処理です。operator モジュールの operator.itemgetter(1) は lambda p: p[1] と同等でより高速です。関数型プログラミングの要素をPythonに取り入れることで、宣言的で読みやすいコードが書けます。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'デコレータ',
      difficulty: 'advanced',
      description:
        'デコレータは関数を受け取って拡張する高階関数です。@decorator 構文で適用します。ログ記録、認証チェック、キャッシュ、リトライ、入力バリデーションなど、横断的関心事（Cross-cutting Concerns）の実装に使われます。functools.wraps を使わないと、デコレートされた関数の __name__ や __doc__ が失われるため必ず付けましょう。引数付きデコレータは3重のネストになります。クラスベースのデコレータ（__call__ を実装）も可能です。',
      task: '関数の呼び出し回数をカウントする call_counter デコレータを作成してください。デコレートされた関数を呼ぶたびにカウントが増え、関数の .call_count 属性でアクセスできるようにしてください。',
      initialCode: '# --- Lesson 21: デコレータ ---\n# 関数の機能を非侵入的に拡張する\n\nimport functools\n\ndef call_counter(func):\n    """関数の呼び出し回数をカウントするデコレータ"""\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        # 呼び出し回数をインクリメント\n        # 元の関数を実行して結果を返す\n        pass\n    wrapper.call_count = 0\n    return wrapper\n\n@call_counter\ndef greet(name):\n    return f"Hello, {name}!"\n\n# テスト\nprint(greet("Alice"))\nprint(greet("Bob"))\nprint(greet("Charlie"))\nprint(f"呼び出し回数: {greet.call_count}")',
      solutionCode: '# --- Lesson 21: デコレータ ---\n# 関数の機能を非侵入的に拡張する\n\nimport functools\n\ndef call_counter(func):\n    """関数の呼び出し回数をカウントするデコレータ"""\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        wrapper.call_count += 1\n        return func(*args, **kwargs)\n    wrapper.call_count = 0\n    return wrapper\n\n@call_counter\ndef greet(name):\n    return f"Hello, {name}!"\n\n# テスト\nprint(greet("Alice"))\nprint(greet("Bob"))\nprint(greet("Charlie"))\nprint(f"呼び出し回数: {greet.call_count}")',
      expectedOutput: 'Hello, Alice!\nHello, Bob!\nHello, Charlie!\n呼び出し回数: 3',
      hints: [
        'wrapper.call_count += 1 で呼び出し回数を更新',
        'func(*args, **kwargs) で元の関数を呼び出し',
        'functools.wraps(func) で元の関数の情報を保持',
        'wrapper.call_count = 0 は wrapper 関数の属性として初期化',
      ],
      explanation:
        'デコレータは AOP（アスペクト指向プログラミング）の実現手段です。@call_counter は greet = call_counter(greet) の糖衣構文です。functools.wraps を忘れると greet.__name__ が "wrapper" になってしまいます。関数はオブジェクトなので属性を動的に追加できます（wrapper.call_count = 0）。標準ライブラリのデコレータ: @functools.lru_cache (メモ化キャッシュ), @property (プロパティ), @staticmethod, @classmethod。引数付きデコレータは def decorator(arg): def actual_decorator(func): ... と3重ネストになります。',
    },
    {
      id: 22,
      title: 'ジェネレータと yield',
      difficulty: 'advanced',
      description:
        'ジェネレータは yield キーワードを使って値を一つずつ遅延生成する特殊な関数です。全データをメモリに保持せず、必要な時に値を計算して返すため、メモリ効率が極めて高いです。大量データの処理、無限列の扱い、パイプライン処理に最適です。yield from を使うと他のイテラブルやジェネレータに委譲できます。ジェネレータは .send() でデータを受け取るコルーチンとしても機能します。itertools モジュールと組み合わせると非常に強力です。',
      task: '素数を無限に生成するジェネレータ prime_generator() を作成し、最初の10個の素数を出力してください。',
      initialCode: '# --- Lesson 22: ジェネレータ ---\n# yield で値を遅延生成するメモリ効率の高い関数\n\ndef is_prime(n):\n    """素数判定"""\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ndef prime_generator():\n    """素数を無限に生成するジェネレータ"""\n    # num を 2 から始めて、素数なら yield する\n    pass\n\n# 最初の10個の素数を出力\ngen = prime_generator()\nprimes = []\nfor _ in range(10):\n    primes.append(next(gen))\nprint(primes)',
      solutionCode: '# --- Lesson 22: ジェネレータ ---\n# yield で値を遅延生成するメモリ効率の高い関数\n\ndef is_prime(n):\n    """素数判定"""\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ndef prime_generator():\n    """素数を無限に生成するジェネレータ"""\n    num = 2\n    while True:\n        if is_prime(num):\n            yield num\n        num += 1\n\n# 最初の10個の素数を出力\ngen = prime_generator()\nprimes = []\nfor _ in range(10):\n    primes.append(next(gen))\nprint(primes)',
      expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]',
      hints: [
        'while True: で無限ループし、素数のみ yield',
        'is_prime(num) で素数判定してから yield num',
        'next(gen) で次の値を1つ取得できます',
        'ジェネレータは無限に値を生成でき、必要な分だけ取得可能',
      ],
      explanation:
        'ジェネレータは「遅延評価」(lazy evaluation) の典型例です。prime_generator() は無限列を表現しますが、next() で1つずつ値を要求するまで計算しないためメモリを消費しません。ジェネレータ式 (x**2 for x in range(10)) はjeneレータリスト内包表記のメモリ効率版です。itertools と組み合わせ: itertools.islice(gen, 10) で最初の10個を取得、itertools.takewhile(条件, gen) で条件を満たす間だけ取得。yield from は他のイテラブルに処理を委譲: yield from range(5) は for i in range(5): yield i と同じです。パイプライン処理: gen1 | gen2 的にジェネレータを繋げると、大規模データの変換処理が効率化されます。',
    },
    {
      id: 23,
      title: 'コンテキストマネージャ',
      difficulty: 'advanced',
      description:
        'with文で使えるオブジェクトをコンテキストマネージャと呼びます。__enter__ と __exit__ メソッドで定義するか、contextlib.contextmanager デコレータで簡単に作れます。リソース管理（ファイル、DB接続、ロック、一時ディレクトリ）のベストプラクティスです。例外が発生しても __exit__（yield以降）は必ず実行されるため、リソースリークを確実に防げます。contextlib にはsuppress()やredirect_stdout()など便利なユーティリティもあります。',
      task: '処理時間を計測する timer コンテキストマネージャを contextlib.contextmanager で作り、with timer("Loop") として100万回のループの実行時間を出力してください。',
      initialCode: '# --- Lesson 23: コンテキストマネージャ ---\n# with 文で安全にリソースを管理する\n\nfrom contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer(label):\n    """処理時間を計測するコンテキストマネージャ"""\n    # yield の前: __enter__ (開始処理)\n    # yield: with ブロックに制御を渡す\n    # yield の後: __exit__ (終了処理)\n    pass\n\n# テスト: 100万回のループの実行時間を計測\nwith timer("Loop"):\n    total = sum(range(1_000_000))\n    print(f"合計: {total}")',
      solutionCode: '# --- Lesson 23: コンテキストマネージャ ---\n# with 文で安全にリソースを管理する\n\nfrom contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer(label):\n    """処理時間を計測するコンテキストマネージャ"""\n    start = time.time()\n    print(f"[{label}] Start")\n    yield\n    elapsed = time.time() - start\n    print(f"[{label}] End ({elapsed:.4f}s)")\n\n# テスト: 100万回のループの実行時間を計測\nwith timer("Loop"):\n    total = sum(range(1_000_000))\n    print(f"合計: {total}")',
      expectedOutput: '[Loop] Start\n合計: 499999500000\n[Loop] End (...s)',
      hints: [
        'yield の前が開始処理（__enter__相当）',
        'yield の後が終了処理（__exit__相当）',
        'time.time() で現在のUNIXタイムスタンプを取得',
        'f"{elapsed:.4f}s" で小数点以下4桁のフォーマット',
      ],
      explanation:
        'コンテキストマネージャはリソース管理のパターンです。@contextmanager で yield の前が __enter__、後が __exit__ に相当します。try-yield-finally パターンを使うと例外時も確実に後処理が実行されます。クラスベースの実装: __enter__(self) で値を返し、__exit__(self, exc_type, exc_val, exc_tb) でクリーンアップ。contextlib の便利ツール: suppress(ValueError) で特定例外を無視、redirect_stdout(f) で標準出力をファイルに、ExitStack() で動的に複数のコンテキストマネージャを管理。async with で非同期コンテキストマネージャも使えます。',
    },
    {
      id: 24,
      title: '正規表現',
      difficulty: 'advanced',
      description:
        're モジュールはパターンマッチングの強力なツールです。search() でパターン検索、findall() で全一致取得、sub() で置換、split() でパターン分割します。グループ化 () でキャプチャし、名前付きグループ (?P<name>...) で読みやすくできます。メールアドレス、URL、電話番号のバリデーションなどに使われます。re.compile() でパターンを事前コンパイルすると繰り返し使用時に効率的です。re.VERBOSE フラグでコメント付きの可読性の高いパターンが書けます。',
      task: 'テキストから「YYYY-MM-DD」形式の日付をすべて抽出し、「YYYY年MM月DD日」形式に変換した結果を出力してください。',
      initialCode: '# --- Lesson 24: 正規表現 ---\n# パターンマッチングで文字列を検索・置換\n\nimport re\n\ntext = "会議は 2024-03-15 に開催され、次回は 2024-04-20 です。締切は 2024-05-01 です。"\n\n# YYYY-MM-DD 形式の日付をすべて抽出\ndates = re.findall(r"", text)\nprint(f"抽出された日付: {dates}")\n\n# YYYY-MM-DD → YYYY年MM月DD日 に置換\nresult = re.sub(r"", r"", text)\nprint(result)',
      solutionCode: '# --- Lesson 24: 正規表現 ---\n# パターンマッチングで文字列を検索・置換\n\nimport re\n\ntext = "会議は 2024-03-15 に開催され、次回は 2024-04-20 です。締切は 2024-05-01 です。"\n\n# YYYY-MM-DD 形式の日付をすべて抽出\ndates = re.findall(r"(\\d{4})-(\\d{2})-(\\d{2})", text)\nprint(f"抽出された日付: {dates}")\n\n# YYYY-MM-DD → YYYY年MM月DD日 に置換\nresult = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\1年\\2月\\3日", text)\nprint(result)',
      expectedOutput: "抽出された日付: [('2024', '03', '15'), ('2024', '04', '20'), ('2024', '05', '01')]\n会議は 2024年03月15日 に開催され、次回は 2024年04月20日 です。締切は 2024年05月01日 です。",
      hints: [
        '\\d{4} は4桁の数字にマッチします',
        '() でグループ化すると findall がタプルのリストを返します',
        're.sub の置換文字列で \\1, \\2, \\3 はグループの参照',
        'r"" は raw 文字列で、バックスラッシュをそのまま扱います',
      ],
      explanation:
        '正規表現の基本記法: . (任意の1文字), \\d (数字), \\w (英数字), \\s (空白), * (0回以上), + (1回以上), ? (0か1回), {n} (n回), [] (文字クラス), () (グループ)。findall() でグループ化 () を使うとグループのタプルのリストを返します。sub() の置換文字列で \\1 は1番目のグループ参照。名前付きグループ (?P<year>\\d{4}) を使うと .group("year") でアクセスでき可読性が上がります。re.VERBOSE フラグを使うとパターンにコメントを入れられ、複雑な正規表現の保守性が向上します。ReDoS 対策として、ユーザー入力は re.escape() でエスケープすべきです。',
    },
    {
      id: 25,
      title: '型ヒント（Type Hints）',
      difficulty: 'advanced',
      description:
        '型ヒントは変数や関数の引数・戻り値に期待される型を注釈する機能です。実行時の動作には影響しませんが、mypy 等の静的解析ツールでバグを早期発見できます。Python 3.9以降、list[str] のように組み込み型を直接ジェネリックとして使えます。Optional[int] は int | None、Union[int, str] は int | str と同じです。TypedDict で辞書の型を定義、Protocol で構造的部分型（ダックタイピングの型安全版）を実現できます。大規模プロジェクトでは事実上必須です。',
      task: '型ヒント付きで、辞書のリストからキーを指定してユニークな値のリストを返す関数 extract_unique を定義してください。',
      initialCode: '# --- Lesson 25: 型ヒント ---\n# 静的型解析でバグを早期発見する\n\ndef extract_unique(records: list[dict[str, str]], key: str) -> list[str]:\n    """レコードのリストから指定キーのユニークな値を抽出\n    \n    Args:\n        records: 辞書のリスト\n        key: 抽出するキー名\n    Returns:\n        ユニークな値のソート済みリスト\n    """\n    # ここに処理を実装\n    pass\n\n# テスト\ndata = [\n    {"name": "Alice", "city": "Tokyo"},\n    {"name": "Bob", "city": "Osaka"},\n    {"name": "Charlie", "city": "Tokyo"},\n    {"name": "Diana", "city": "Nagoya"},\n]\n\nprint(extract_unique(data, "city"))',
      solutionCode: '# --- Lesson 25: 型ヒント ---\n# 静的型解析でバグを早期発見する\n\ndef extract_unique(records: list[dict[str, str]], key: str) -> list[str]:\n    """レコードのリストから指定キーのユニークな値を抽出\n    \n    Args:\n        records: 辞書のリスト\n        key: 抽出するキー名\n    Returns:\n        ユニークな値のソート済みリスト\n    """\n    values = {record[key] for record in records if key in record}\n    return sorted(values)\n\n# テスト\ndata = [\n    {"name": "Alice", "city": "Tokyo"},\n    {"name": "Bob", "city": "Osaka"},\n    {"name": "Charlie", "city": "Tokyo"},\n    {"name": "Diana", "city": "Nagoya"},\n]\n\nprint(extract_unique(data, "city"))',
      expectedOutput: "['Nagoya', 'Osaka', 'Tokyo']",
      hints: [
        '引数の型: records: list[dict[str, str]]',
        'セット内包表記で重複を除去: {record[key] for record in records}',
        'sorted() でアルファベット順にソート',
        'key in record でキーの存在チェックすると安全',
      ],
      explanation:
        '型ヒントは mypy, pyright, pytype 等の静的型チェッカーで検証されます。Python 3.10 以降は int | None が使え、3.9以降は list[str] が直接使えます。typing モジュールの主要な型: Optional[T] = T | None, Union[A, B], Literal["a", "b"], TypeVar, Generic。Protocol はダックタイピングを型安全にします: Protocol で必要なメソッドを定義し、明示的な継承なしで構造的にマッチすればOK。TypedDict は辞書の構造を定義: class User(TypedDict): name: str; age: int。型ヒントはチーム開発でのコミュニケーションコストを大幅に削減します。',
    },
    {
      id: 26,
      title: 'データクラス',
      difficulty: 'advanced',
      description:
        '@dataclass デコレータはデータを保持するクラスを簡潔に定義します。__init__, __repr__, __eq__ が自動生成され、ボイラープレートコードが大幅に減少します。frozen=True でイミュータブル化、order=True で比較演算子を自動生成、slots=True (3.10+) でメモリ効率を改善できます。field() でデフォルトファクトリを設定でき、__post_init__ で初期化後の追加処理が可能です。',
      task: 'name(str), price(float), quantity(int, デフォルト1) を持つ Product データクラスを定義してください。合計金額を返す total プロパティも追加してください。2つのProductを作成し、出力してください。',
      initialCode: '# --- Lesson 26: データクラス ---\n# @dataclass で簡潔にデータ構造を定義\n\nfrom dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 1  # デフォルト値\n\n    @property\n    def total(self) -> float:\n        """合計金額"""\n        # ここに処理を実装\n        pass\n\n# テスト\np1 = Product("Python入門", 2800.0, 3)\np2 = Product("コーヒー", 350.0)\n\nprint(p1)\nprint(f"{p1.name} の合計: ¥{p1.total}")\nprint(p2)\nprint(f"{p2.name} の合計: ¥{p2.total}")',
      solutionCode: '# --- Lesson 26: データクラス ---\n# @dataclass で簡潔にデータ構造を定義\n\nfrom dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 1  # デフォルト値\n\n    @property\n    def total(self) -> float:\n        """合計金額"""\n        return self.price * self.quantity\n\n# テスト\np1 = Product("Python入門", 2800.0, 3)\np2 = Product("コーヒー", 350.0)\n\nprint(p1)\nprint(f"{p1.name} の合計: ¥{p1.total}")\nprint(p2)\nprint(f"{p2.name} の合計: ¥{p2.total}")',
      expectedOutput: "Product(name='Python入門', price=2800.0, quantity=3)\nPython入門 の合計: ¥8400.0\nProduct(name='コーヒー', price=350.0, quantity=1)\nコーヒー の合計: ¥350.0",
      hints: [
        '@dataclass デコレータで __init__ と __repr__ が自動生成',
        'quantity: int = 1 でデフォルト値を設定',
        '@property で属性のようにアクセスできるメソッドを定義',
        'self.price * self.quantity で合計を計算',
      ],
      explanation:
        'dataclass は DTO（Data Transfer Object）のPython版です。__init__, __repr__, __eq__ が自動生成されるため、通常のクラスより大幅にコードが減ります。@property で計算プロパティを定義でき、属性アクセスのように使えます (p1.total)。frozen=True: イミュータブル（辞書キーやセット要素に使用可能）。field(default_factory=list): ミュータブルなデフォルト値の安全な指定。__post_init__: 初期化後のバリデーション等。Python 3.10 の slots=True でメモリ効率25%改善。asdict(), astuple() で辞書/タプルに変換可能で、JSON シリアライズに便利です。',
    },
    {
      id: 27,
      title: '抽象基底クラスとプロトコル',
      difficulty: 'advanced',
      description:
        'ABC（Abstract Base Class）は abc モジュールで定義でき、サブクラスに特定のメソッド実装を強制します。Python 3.8 で導入された Protocol は ABCの代替で、明示的な継承なしに構造的部分型（Structural Subtyping）を実現します。これはPythonのダックタイピングの思想に合致した型安全の方法です。SOLID原則の「依存関係逆転の原則」（DIP）を実現し、抽象に依存することで柔軟な設計になります。',
      task: 'area() と perimeter() メソッドを強制する Shape 抽象クラスを作り、Circle と Rectangle で実装してください。各図形の面積と周囲長を出力してください。',
      initialCode: '# --- Lesson 27: 抽象基底クラス ---\n# インターフェースで振る舞いを強制する\n\nfrom abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float:\n        pass\n\n    @abstractmethod\n    def perimeter(self) -> float:\n        pass\n\n    def describe(self) -> str:\n        return f"Area={self.area():.2f}, Perimeter={self.perimeter():.2f}"\n\n# Circle クラスを実装\nclass Circle(Shape):\n    pass\n\n# Rectangle クラスを実装\nclass Rectangle(Shape):\n    pass\n\n# テスト\ncircle = Circle(5)\nrect = Rectangle(4, 6)\n\nprint(f"Circle: {circle.describe()}")\nprint(f"Rectangle: {rect.describe()}")',
      solutionCode: '# --- Lesson 27: 抽象基底クラス ---\n# インターフェースで振る舞いを強制する\n\nfrom abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float:\n        pass\n\n    @abstractmethod\n    def perimeter(self) -> float:\n        pass\n\n    def describe(self) -> str:\n        return f"Area={self.area():.2f}, Perimeter={self.perimeter():.2f}"\n\n# Circle クラスを実装\nclass Circle(Shape):\n    def __init__(self, radius: float):\n        self.radius = radius\n\n    def area(self) -> float:\n        return math.pi * self.radius ** 2\n\n    def perimeter(self) -> float:\n        return 2 * math.pi * self.radius\n\n# Rectangle クラスを実装\nclass Rectangle(Shape):\n    def __init__(self, width: float, height: float):\n        self.width = width\n        self.height = height\n\n    def area(self) -> float:\n        return self.width * self.height\n\n    def perimeter(self) -> float:\n        return 2 * (self.width + self.height)\n\n# テスト\ncircle = Circle(5)\nrect = Rectangle(4, 6)\n\nprint(f"Circle: {circle.describe()}")\nprint(f"Rectangle: {rect.describe()}")',
      expectedOutput: 'Circle: Area=78.54, Perimeter=31.42\nRectangle: Area=24.00, Perimeter=20.00',
      hints: [
        'Circle: __init__ で radius を受け取り、area = pi * r^2, perimeter = 2 * pi * r',
        'Rectangle: __init__ で width, height を受け取り、area = w*h, perimeter = 2*(w+h)',
        'describe() は親クラスで定義済みで、area() と perimeter() を呼びます',
        '抽象メソッドを実装しないと TypeError でインスタンス化できません',
      ],
      explanation:
        '抽象基底クラスは「契約」を強制する仕組みです。abstractmethod を実装していないとインスタンス化時に TypeError が発生します。describe() は共通の具象メソッドで、子クラスの area() と perimeter() を呼びます（テンプレートメソッドパターン）。Protocol (typing.Protocol) は明示的な継承不要の構造的部分型で: class Drawable(Protocol): def draw(self) -> None: ... と定義すると、draw() を持つ任意のクラスが Drawable として扱えます。SOLID原則のDIP（依存関係逆転）: 具象クラスではなく抽象に依存することで、テスタビリティと拡張性が向上します。',
    },
    {
      id: 28,
      title: 'マルチスレッドと並行処理',
      difficulty: 'advanced',
      description:
        'concurrent.futures はPythonの高レベルな並行処理APIです。ThreadPoolExecutor は I/Oバウンドな処理（ネットワーク通信、ファイルI/O）に適しています。GIL（Global Interpreter Lock）により、CPUバウンドな処理では真の並列性は得られないため、ProcessPoolExecutor を使うか、asyncio で非同期I/Oを利用します。Python 3.4以降の asyncio / await は非同期プログラミングのための標準ライブラリです。',
      task: 'ThreadPoolExecutor を使って、5つの「処理」を並行実行してください。各処理は worker(id) 関数で、処理IDと結果を返します。すべての結果を出力してください。',
      initialCode: '# --- Lesson 28: 並行処理 ---\n# ThreadPoolExecutor で並行実行\n\nfrom concurrent.futures import ThreadPoolExecutor, as_completed\n\ndef worker(task_id):\n    """模擬的な処理を行うワーカー関数"""\n    # 処理をシミュレーション\n    result = task_id * task_id\n    return f"Task {task_id}: result={result}"\n\n# ThreadPoolExecutor で5つのタスクを並行実行\nwith ThreadPoolExecutor(max_workers=3) as executor:\n    # submit でタスクを投入し、結果を収集\n    futures = []\n    for i in range(1, 6):\n        pass  # ここに submit を書く\n\n    # 完了した順に結果を取得して出力\n    for future in as_completed(futures):\n        print(future.result())',
      solutionCode: '# --- Lesson 28: 並行処理 ---\n# ThreadPoolExecutor で並行実行\n\nfrom concurrent.futures import ThreadPoolExecutor, as_completed\n\ndef worker(task_id):\n    """模擬的な処理を行うワーカー関数"""\n    # 処理をシミュレーション\n    result = task_id * task_id\n    return f"Task {task_id}: result={result}"\n\n# ThreadPoolExecutor で5つのタスクを並行実行\nwith ThreadPoolExecutor(max_workers=3) as executor:\n    # submit でタスクを投入し、結果を収集\n    futures = []\n    for i in range(1, 6):\n        futures.append(executor.submit(worker, i))\n\n    # 完了した順に結果を取得して出力\n    for future in as_completed(futures):\n        print(future.result())',
      expectedOutput: 'Task 1: result=1\nTask 2: result=4\n...(順不同)',
      hints: [
        'executor.submit(worker, i) でタスクを投入し Future を得る',
        'futures リストに append して管理',
        'as_completed(futures) は完了した順に Future を返す',
        'future.result() で実行結果を取得',
      ],
      explanation:
        'concurrent.futures は高レベルな並行処理APIです。submit() はFutureオブジェクトを返し、result() で結果を取得します。as_completed() は完了した順にFutureを返すため、先に終わったタスクから処理できます。executor.map(func, iterable) は submit + result のショートカットで、入力順に結果を返します。GIL の制約: CPUバウンドな処理（数値計算等）では ThreadPoolExecutor は効果が薄く、ProcessPoolExecutor を使うべきです。I/Oバウンド（ネットワーク、DB）なら Threading、大量の非同期I/Oなら asyncio が最適です。',
    },
    {
      id: 29,
      title: 'ユニットテスト',
      difficulty: 'advanced',
      description:
        'テストを書くことでコードの品質と保守性が向上します。Python標準の unittest と、より使いやすいサードパーティの pytest が主流です。テスト駆動開発（TDD）では Red → Green → Refactor のサイクルで開発します。AAA パターン（Arrange-Act-Assert）でテストを構造化し、1テストに1アサーション（単一のことだけを検証）が原則です。カバレッジ測定（coverage.py）でテストの網羅性を確認できます。',
      task: 'FizzBuzz 関数のテストケースを unittest で書いてください。3の倍数は "Fizz"、5の倍数は "Buzz"、15の倍数は "FizzBuzz"、それ以外は数値の文字列を返す仕様に対して、4つのテストケースを書いてください。',
      initialCode: '# --- Lesson 29: ユニットテスト ---\n# テストでコードの品質を保証する\n\nimport unittest\n\ndef fizzbuzz(n):\n    """FizzBuzz を返す関数"""\n    if n % 15 == 0:\n        return "FizzBuzz"\n    elif n % 3 == 0:\n        return "Fizz"\n    elif n % 5 == 0:\n        return "Buzz"\n    else:\n        return str(n)\n\nclass TestFizzBuzz(unittest.TestCase):\n    \"\"\"FizzBuzz のテストケース\"\"\"\n\n    def test_fizz(self):\n        \"\"\"3の倍数は Fizz\"\"\"\n        pass\n\n    def test_buzz(self):\n        \"\"\"5の倍数は Buzz\"\"\"\n        pass\n\n    def test_fizzbuzz(self):\n        \"\"\"15の倍数は FizzBuzz\"\"\"\n        pass\n\n    def test_number(self):\n        \"\"\"それ以外は数値の文字列\"\"\"\n        pass\n\n# テスト実行\nsuite = unittest.TestLoader().loadTestsFromTestCase(TestFizzBuzz)\nresult = unittest.TextTestRunner(verbosity=0).run(suite)\nprint(f"Tests: {result.testsRun}, Failures: {len(result.failures)}, Errors: {len(result.errors)}")',
      solutionCode: '# --- Lesson 29: ユニットテスト ---\n# テストでコードの品質を保証する\n\nimport unittest\n\ndef fizzbuzz(n):\n    """FizzBuzz を返す関数"""\n    if n % 15 == 0:\n        return "FizzBuzz"\n    elif n % 3 == 0:\n        return "Fizz"\n    elif n % 5 == 0:\n        return "Buzz"\n    else:\n        return str(n)\n\nclass TestFizzBuzz(unittest.TestCase):\n    \"\"\"FizzBuzz のテストケース\"\"\"\n\n    def test_fizz(self):\n        \"\"\"3の倍数は Fizz\"\"\"\n        self.assertEqual(fizzbuzz(3), "Fizz")\n        self.assertEqual(fizzbuzz(9), "Fizz")\n\n    def test_buzz(self):\n        \"\"\"5の倍数は Buzz\"\"\"\n        self.assertEqual(fizzbuzz(5), "Buzz")\n        self.assertEqual(fizzbuzz(10), "Buzz")\n\n    def test_fizzbuzz(self):\n        \"\"\"15の倍数は FizzBuzz\"\"\"\n        self.assertEqual(fizzbuzz(15), "FizzBuzz")\n        self.assertEqual(fizzbuzz(30), "FizzBuzz")\n\n    def test_number(self):\n        \"\"\"それ以外は数値の文字列\"\"\"\n        self.assertEqual(fizzbuzz(1), "1")\n        self.assertEqual(fizzbuzz(7), "7")\n\n# テスト実行\nsuite = unittest.TestLoader().loadTestsFromTestCase(TestFizzBuzz)\nresult = unittest.TextTestRunner(verbosity=0).run(suite)\nprint(f"Tests: {result.testsRun}, Failures: {len(result.failures)}, Errors: {len(result.errors)}")',
      expectedOutput: 'Tests: 4, Failures: 0, Errors: 0',
      hints: [
        'self.assertEqual(actual, expected) で値を検証',
        'test_ で始まるメソッドがテストケースになります',
        '各テストで複数のassertを書いて境界値も確認',
        'fizzbuzz(3) → "Fizz", fizzbuzz(5) → "Buzz", fizzbuzz(15) → "FizzBuzz"',
      ],
      explanation:
        'テストは「動く仕様書」であり、リファクタリングの安全網です。AAA パターン: Arrange(準備), Act(実行), Assert(検証)。主要なアサーション: assertEqual, assertTrue, assertFalse, assertRaises, assertIn, assertIsNone。実務では pytest がデファクトスタンダードで、fixture（前処理/後処理）、parametrize（パラメータ化テスト）、mark（マーキング）などの強力な機能があります。TDD のサイクル: Red（失敗するテストを書く）→ Green（最小限の実装で通す）→ Refactor（リファクタリング）。coverage run -m pytest でカバレッジを計測し、80%以上を目標にするのが一般的です。',
    },
    {
      id: 30,
      title: 'デザインパターン — Strategy パターン',
      difficulty: 'advanced',
      description:
        'Strategy パターンはアルゴリズムをオブジェクトとして切り出し、実行時に切り替え可能にする GoF デザインパターンです。if/elif の分岐を排除し、開放閉鎖の原則（OCP: 拡張に開かれ、修正に閉じている）を実現します。新しいアルゴリズムの追加が既存コードの修正なしに可能です。Pythonでは関数がファーストクラスオブジェクトなので、クラスベースだけでなく関数ベースでも実装できます。',
      task: 'テキストのフォーマット戦略を Strategy パターンで実装してください。UpperStrategy（全大文字）、TitleStrategy（タイトルケース）、ReverseStrategy（文字列反転）の3つの戦略を定義し、Formatter クラスで切り替えてテキストを変換してください。',
      initialCode: '# --- Lesson 30: Strategy パターン ---\n# アルゴリズムをオブジェクトとして切り替え可能にする\n\nfrom abc import ABC, abstractmethod\n\n# 戦略の抽象クラス\nclass FormatStrategy(ABC):\n    @abstractmethod\n    def format(self, text: str) -> str:\n        pass\n\n# 3つの具象戦略を実装\nclass UpperStrategy(FormatStrategy):\n    pass\n\nclass TitleStrategy(FormatStrategy):\n    pass\n\nclass ReverseStrategy(FormatStrategy):\n    pass\n\n# コンテキスト（戦略を使用するクラス）\nclass Formatter:\n    def __init__(self, strategy: FormatStrategy):\n        self.strategy = strategy\n\n    def execute(self, text: str) -> str:\n        return self.strategy.format(text)\n\n# テスト\ntext = "hello world python"\nfor strategy in [UpperStrategy(), TitleStrategy(), ReverseStrategy()]:\n    formatter = Formatter(strategy)\n    print(formatter.execute(text))',
      solutionCode: '# --- Lesson 30: Strategy パターン ---\n# アルゴリズムをオブジェクトとして切り替え可能にする\n\nfrom abc import ABC, abstractmethod\n\n# 戦略の抽象クラス\nclass FormatStrategy(ABC):\n    @abstractmethod\n    def format(self, text: str) -> str:\n        pass\n\n# 3つの具象戦略を実装\nclass UpperStrategy(FormatStrategy):\n    def format(self, text: str) -> str:\n        return text.upper()\n\nclass TitleStrategy(FormatStrategy):\n    def format(self, text: str) -> str:\n        return text.title()\n\nclass ReverseStrategy(FormatStrategy):\n    def format(self, text: str) -> str:\n        return text[::-1]\n\n# コンテキスト（戦略を使用するクラス）\nclass Formatter:\n    def __init__(self, strategy: FormatStrategy):\n        self.strategy = strategy\n\n    def execute(self, text: str) -> str:\n        return self.strategy.format(text)\n\n# テスト\ntext = "hello world python"\nfor strategy in [UpperStrategy(), TitleStrategy(), ReverseStrategy()]:\n    formatter = Formatter(strategy)\n    print(formatter.execute(text))',
      expectedOutput: 'HELLO WORLD PYTHON\nHello World Python\nnohtyp dlrow olleh',
      hints: [
        'UpperStrategy: text.upper() で全大文字変換',
        'TitleStrategy: text.title() でタイトルケース変換',
        'ReverseStrategy: text[::-1] でスライスを使った文字列反転',
        'Formatter は strategy.format(text) を呼ぶだけ',
      ],
      explanation:
        'Strategy パターンにより、新しいフォーマット戦略（例: KebabStrategy）を追加する際、Formatter クラスを修正する必要がありません（OCP: Open/Closed Principle）。for ループで異なる戦略を切り替えており、これがポリモーフィズムの力です。Pythonでは関数がファーストクラスオブジェクトなので、シンプルなケースではクラスの代わりに関数を渡す方法もあります: formatter = Formatter(lambda t: t.upper())。パターンの使い分け: Strategy（アルゴリズム切替）、Observer（イベント通知）、Decorator（機能追加）、Factory（オブジェクト生成）。デザインパターンは「開発者間の共通語彙」として重要です。',
    },
  ],
};

export default course;
