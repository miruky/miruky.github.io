import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'ruby',
  name: 'Ruby',
  nameJa: 'Ruby',
  simpleIconSlug: 'ruby',
  color: '#CC342D',
  description:
    'Ruby は「プログラミングを楽しく」をモットーに松本行弘氏が設計した動的型付けオブジェクト指向言語です。直感的で読みやすい構文、強力なメタプログラミング機能、豊富な標準ライブラリが特徴で、Ruby on Rails によるWeb開発で世界的に普及しました。',
  lessons: [
    // ── Beginner (1-10) ──
    {
      id: 1,
      title: 'Hello World — puts',
      difficulty: 'beginner',
      description:
        'Ruby でのプログラミングは puts メソッドによる出力から始まります。puts は put string の略で、引数を文字列として標準出力に出力し自動的に改行します。Ruby ではセミコロンは不要で、1行に1つの文を書くのが基本スタイルです。似たメソッドとして print（改行なし）、p（デバッグ用 inspect 出力）、pp（プリティプリント）があり、それぞれ用途が異なります。Ruby は Perl, Smalltalk, Lisp の影響を受けた言語で、「すべてがオブジェクト」という一貫した設計思想を持っています。',
      task: '"Hello, Ruby!" と出力してください。',
      initialCode:
        '# Ruby の基本出力メソッド\n# puts  — 改行あり出力\n# print — 改行なし出力\n# p     — デバッグ用（inspect）出力\n\n# ここに出力処理を書いてください\n',
      solutionCode: '# puts で文字列を改行付きで出力\nputs "Hello, Ruby!"',
      expectedOutput: 'Hello, Ruby!',
      hints: [
        'puts "文字列" で出力します',
        '文字列はダブルクォーテーション "" またはシングルクォーテーション \'\' で囲みます',
        'print は改行なし、puts は改行ありです',
        'p は inspect 結果を表示するデバッグ用メソッドです',
      ],
      explanation:
        'puts は Ruby で最も基本的な出力メソッドです。配列を渡すと各要素を1行ずつ出力する特性があります（puts [1, 2, 3] は 1, 2, 3 を別々の行に出力）。print は改行を追加せず、複数の引数を並べて出力します。p メソッドは .inspect を呼んだ結果を出力するため、文字列なら "hello" のようにクォート付きで表示されデバッグに便利です。Ruby ではすべてがオブジェクトであり、整数 1 にもメソッドを呼べます（1.to_s, 1.even? など）。irb（Interactive Ruby）は対話的にRubyコードを実行できるREPLで、学習やデバッグに最適です。',
    },
    {
      id: 2,
      title: '変数と文字列補間',
      difficulty: 'beginner',
      description:
        'Ruby の変数は型宣言が不要な動的型付けです。ダブルクォーテーション内で #{式} を使うと文字列補間（string interpolation）ができ、変数や式の結果を直接文字列に埋め込めます。変数名はスネークケース（my_variable）が規約で、大文字で始まる識別子は定数として扱われます。Ruby の文字列は可変（ミュータブル）であり、同じ文字列リテラルでも別のオブジェクトが生成される点が Python や Java と異なります。',
      task: 'name = "miruky", age = 25 を定義し、"miruky is 25 years old" と出力してください。',
      initialCode:
        '# 変数の定義（型宣言不要）\nname = "miruky"\nage = 25\n\n# ダブルクォート内で #{} を使って文字列補間\n# 結果: "miruky is 25 years old"\n',
      solutionCode:
        '# 変数の定義\nname = "miruky"\nage = 25\n\n# 文字列補間で変数を埋め込む\nputs "#{name} is #{age} years old"',
      expectedOutput: 'miruky is 25 years old',
      hints: [
        '"#{変数}" でダブルクォート内に変数を埋め込めます',
        '文字列補間はダブルクォートのみで有効です（シングルクォートでは無効）',
        '#{} 内には任意の Ruby 式を書けます（#{1 + 2} → "3"）',
        '変数名はスネークケース（is_valid, user_name）が慣例です',
      ],
      explanation:
        'Ruby の文字列補間は + による文字列結合よりも読みやすく効率的です。シングルクォートの文字列ではエスケープシーケンス（\\n など一部を除く）と文字列補間が無効になるため、使い分けが重要です。Ruby の変数にはローカル変数（小文字始まり）、インスタンス変数（@name）、クラス変数（@@count）、グローバル変数（$debug）の4種類があり、スコープが異なります。定数は大文字始まり（MAX_SIZE, PI）で、再代入すると警告が出ますがエラーにはなりません。freeze メソッドでオブジェクトを凍結すると変更不可になります。Ruby 3.0 以降、# frozen_string_literal: true マジックコメントでファイル内の全文字列を自動的に freeze できます。',
    },
    {
      id: 3,
      title: 'シンボルとハッシュ',
      difficulty: 'beginner',
      description:
        'シンボル（:name）は不変の識別子で、同じシンボルは必ず同一のオブジェクトを指します。文字列と異なりメモリ上に1つだけ存在するため、ハッシュのキーとして使うと高速です。ハッシュ（Hash）はキーと値のペアを格納するデータ構造で、Python の辞書や JavaScript のオブジェクトに相当します。{ key: value } のシンタックスシュガーでシンボルキーを簡潔に書けます。Ruby のハッシュは挿入順序を保持する特性があります。',
      task: '{ name: "miruky", role: "engineer" } のハッシュを作り、name の値を出力してください。',
      initialCode:
        '# ハッシュの作成（シンボルキー省略記法）\n# { key: value } は { :key => value } の省略形\n\n# user ハッシュを作成\n\n# user[:name] でシンボルキーにアクセス\n',
      solutionCode:
        '# シンボルキーのハッシュを作成\nuser = { name: "miruky", role: "engineer" }\n\n# シンボルでアクセス\nputs user[:name]',
      expectedOutput: 'miruky',
      hints: [
        'user = { name: "miruky" } でシンボルキーのハッシュを作成します',
        'user[:name] でシンボルキーの値にアクセスします',
        '{ name: "value" } は { :name => "value" } の省略形です',
        'Ruby 3.1+ では { name: } は { name: name } の省略になります',
      ],
      explanation:
        'シンボルは immutable（不変）な識別子で、:name.object_id は何度呼んでも同じ値を返します。一方、"name".object_id は呼ぶたびに異なります。この特性によりハッシュのキー比較が高速で、ハッシュルックアップのパフォーマンスが向上します。ハッシュの作成には { :key => value }（ハッシュロケット）と { key: value }（省略記法）の2つのスタイルがあり、後者はシンボルキー専用です。fetch(:key) メソッドを使うとキーが存在しない場合に KeyError を投げ、バグの早期発見に役立ちます。dig(:a, :b, :c) でネストしたハッシュに安全にアクセスでき、途中で nil があっても NoMethodError にならずに nil を返します。',
    },
    {
      id: 4,
      title: '配列とイテレータ',
      difficulty: 'beginner',
      description:
        'Ruby の配列は [] で作成し、異なる型の要素を混在して格納できます。each, map, select, reject, reduce などの豊富なイテレータメソッドが特徴で、ブロック（{ |引数| 処理 }）を渡してコレクション操作を行います。Ruby では for ループよりもイテレータメソッドの使用が推奨されており、これが Ruby の「楽しいプログラミング」スタイルの核心です。メソッドチェーンで複数の操作を連鎖させることもできます。',
      task: '[1, 2, 3, 4, 5] の各要素を2倍にした配列を出力してください。',
      initialCode:
        'nums = [1, 2, 3, 4, 5]\n\n# map でブロックを渡し、各要素を変換\n# ブロック記法: .map { |n| 式 }\n# result = nums.map { |n| ??? }\n\n# inspect で配列を見やすく表示\n',
      solutionCode:
        'nums = [1, 2, 3, 4, 5]\n\n# map で各要素を2倍に変換\nresult = nums.map { |n| n * 2 }\n\n# inspect で配列内容を表示\nputs result.inspect',
      expectedOutput: '[2, 4, 6, 8, 10]',
      hints: [
        '.map { |n| n * 2 } で各要素を変換した新しい配列を返します',
        '.inspect で配列の中身を [1, 2, 3] の形式で表示します',
        'ブロック記法: 1行は { }、複数行は do...end が慣例です',
        '.map! を使うと元の配列を直接変更します（破壊的メソッド）',
      ],
      explanation:
        'Ruby のブロックはメソッドに渡すコードの塊で、イテレータパターンの基盤です。{ |n| n * 2 } の | | 内がブロック引数で、各要素が順に代入されます。map は元の配列を変更せず新しい配列を返しますが、map!（破壊的メソッド）は元の配列を直接変更します。Ruby では慣例として破壊的メソッドに !（バンメソッド）を付けます。主要なイテレータには map（変換）、select（フィルタリング）、reject（排除）、reduce（畳み込み）、each_with_index（インデックス付き反復）、flat_map（変換 + 平坦化）などがあります。&:method_name はシンボルをProc に変換する省略記法で、nums.map(&:to_s) は nums.map { |n| n.to_s } と同等です。',
    },
    {
      id: 5,
      title: 'if / unless 条件分岐',
      difficulty: 'beginner',
      description:
        'Ruby では if-elsif-else-end で条件分岐を書きます。独特の機能として unless（if の否定版）があり、「〜でなければ」を直感的に表現できます。後置 if/unless で result = value if condition のように1行にまとめることも可能で、Ruby らしい簡潔なコードが書けます。Ruby では false と nil のみが偽で、0 や空文字列 "" も真値として扱われる点に注意が必要です。',
      task: 'score = 85 として、80以上なら "Pass"、そうでなければ "Fail" と出力してください。',
      initialCode:
        'score = 85\n\n# if-else-end で条件分岐\n# 80以上 → "Pass"\n# それ以外 → "Fail"\n\n# 後置 if: puts "Pass" if score >= 80\n',
      solutionCode:
        'score = 85\n\n# if-else-end による条件分岐\nif score >= 80\n  puts "Pass"\nelse\n  puts "Fail"\nend',
      expectedOutput: 'Pass',
      hints: [
        'if 条件 ... else ... end が基本構文です',
        '後置形式: puts "Pass" if score >= 80 でも書けます',
        'unless は if の否定版 — unless score < 80 は if score >= 80 と同じです',
        'Ruby では false と nil のみが偽 — 0 も "" も真です',
      ],
      explanation:
        'Ruby の条件分岐は end キーワードで閉じます（波括弧は使いません）。elsif（else if ではない）で複数条件を連鎖でき、三項演算子 score >= 80 ? "Pass" : "Fail" も使えます。unless は「〜でなければ」を表現しますが、unless...else は読みにくいため避けるべきです。case-when 文は switch に相当し、値の一致だけでなく Range（1..10）、正規表現（/pattern/）、クラス（Integer）でのマッチングも可能です。Ruby 3.0 以降の case-in パターンマッチングはさらに強力で、構造の分解代入もできます。条件式の結果を変数に代入する status = if score >= 80 then "Pass" else "Fail" end というスタイルもRuby らしい書き方です。',
    },
    {
      id: 6,
      title: 'メソッドの定義',
      difficulty: 'beginner',
      description:
        'Ruby のメソッドは def メソッド名(引数) ... end で定義します。最後に評価された式が暗黙的に戻り値となるため、return を明示的に書く必要がないのが大きな特徴です。早期リターン以外で return を書くのは Ruby らしくないとされます。メソッド名は snake_case が規約で、? で終わるメソッドは真偽値を返し（empty?, nil?）、! で終わるメソッドは破壊的操作を示唆するのが慣例です。',
      task: '2つの数を受け取って合計を返すメソッド add を作り、add(3, 7) の結果を出力してください。',
      initialCode:
        '# def メソッド名(引数) ... end でメソッドを定義\n# 最後の式が暗黙的に戻り値になる\n\n# add メソッドを定義してください\n\n\nputs add(3, 7)',
      solutionCode:
        '# 最後の式が暗黙的に戻り値になる\ndef add(a, b)\n  a + b\nend\n\nputs add(3, 7)',
      expectedOutput: '10',
      hints: [
        'def add(a, b) ... end でメソッドを定義します',
        'return は省略可能 — 最後に評価された式が自動的に返されます',
        'メソッド名は snake_case が Ruby の規約です',
        '? で終わるメソッドは真偽値を返す慣例: def valid?(x) ... end',
      ],
      explanation:
        'Ruby のメソッドは最後に評価された式を暗黙的に返すため、return は早期リターン（ガード節）以外では使わないのが慣例です。例えば def abs(n); return -n if n < 0; n; end のように条件に合わない場合の早期脱出にのみ return を使います。デフォルト引数 def greet(name = "World") でオプション引数を設定でき、*args で可変長引数、**kwargs でキーワード引数をハッシュとして受け取れます。Ruby 3.0 からは位置引数とキーワード引数の自動変換が廃止され、明確な区別が必要になりました。メソッドはオブジェクトではありませんが、method(:add) でMethod オブジェクトとして取得し、.call で呼び出すことも可能です。',
    },
    {
      id: 7,
      title: 'ブロック・Proc・Lambda',
      difficulty: 'beginner',
      description:
        'ブロックは Ruby の最も重要な概念の1つで、メソッドに渡すコードの塊です。{ |引数| 処理 } または do |引数| ... end で記述し、メソッド側では yield キーワードでブロックを実行します。Proc はブロックをオブジェクトとして保持したもので、変数に代入・引数として渡すことができます。Lambda は Proc の一種ですが、引数チェックが厳密で return の挙動が異なります。これらの違いを理解することが Ruby のメタプログラミングの基盤です。',
      task: '[1, 2, 3] に each でブロックを渡し、各要素を出力してください。',
      initialCode:
        'nums = [1, 2, 3]\n\n# each メソッドにブロックを渡して各要素を処理\n# ブロック記法: { |n| 処理 } または do |n| 処理 end\n',
      solutionCode:
        'nums = [1, 2, 3]\n\n# each にブロックを渡して各要素を出力\nnums.each { |n| puts n }',
      expectedOutput: '1\n2\n3',
      hints: [
        '.each { |n| puts n } でブロックを渡します',
        'do...end でも書けます: nums.each do |n| puts n end',
        '1行は { }、複数行は do...end が Ruby の慣例です',
        '&block でブロックを Proc オブジェクトとして受け取れます',
      ],
      explanation:
        'ブロックは Ruby のイテレータの根幹です。メソッド側では yield でブロックを呼び出し、block_given? でブロックが渡されたかチェックできます。Proc.new { |n| n * 2 } でブロックをオブジェクト化し、.call(5) で実行します。Lambda は -> (n) { n * 2 } で作成し、引数の数が合わないと ArgumentError を投げます（Proc は余分な引数を無視）。もう1つの重要な違いは return の挙動で、Lambda の return は Lambda 内で完結しますが、Proc の return はProcを囲むメソッドからも抜けてしまいます。&:to_s のような Symbol#to_proc は Ruby のメタプログラミングの美しい例です。ブロックはクロージャとして外側のスコープの変数をキャプチャします。',
    },
    {
      id: 8,
      title: 'Range と繰り返し',
      difficulty: 'beginner',
      description:
        'Range は始点から終点までの連続した値の範囲を表すオブジェクトです。(1..5) は 1 から 5 を含む閉区間、(1...5) は 5 を含まない半開区間です。Range は Enumerable をインクルードしているため each, map, select, reduce などのイテレータが全て使えます。times, upto, downto メソッドによる繰り返しも Ruby らしい書き方です。Range は数値だけでなく文字列（"a".."z"）でも使えます。',
      task: '1から5までの合計を計算して出力してください。',
      initialCode:
        '# Range を使って合計を計算\n# (1..5) は 1, 2, 3, 4, 5 の範囲\n# reduce で畳み込み計算\n\n# 合計を計算して出力\n',
      solutionCode:
        '# reduce で初期値 0 から畳み込み\nsum = (1..5).reduce(0) { |acc, n| acc + n }\nputs sum',
      expectedOutput: '15',
      hints: [
        '(1..5).reduce(0) { |acc, n| acc + n } で畳み込みます',
        '(1..5).sum でも同じ結果が得られます（Ruby 2.4+）',
        '.. は終点を含む、... は終点を含みません',
        '5.times { |i| ... } で 0〜4 を繰り返すこともできます',
      ],
      explanation:
        'reduce（inject のエイリアス）は配列や Range の要素を順に畳み込んで1つの値にします。初期値 0 にアキュムレータ acc と各要素 n を順に適用します。(1..5).reduce(:+) のようにシンボルで演算子を渡す省略形もあります。Ruby 2.4 以降は (1..5).sum で合計が直接計算でき、さらに簡潔です。5.times { |i| puts i } は 0 から 4 までを繰り返し、1.upto(5) { |i| puts i } は 1 から 5 まで繰り返します。step メソッド (1..10).step(2) で奇数列のような等差数列も生成可能です。Ruby では C スタイルの for ループよりもこうしたイテレータメソッドが好まれます。',
    },
    {
      id: 9,
      title: '正規表現',
      difficulty: 'beginner',
      description:
        'Ruby は正規表現をネイティブにサポートしており、/pattern/ リテラルで正規表現オブジェクトを作成します。=~ 演算子でマッチの有無を確認し、match メソッドで MatchData オブジェクトを取得できます。scan は文字列内のすべてのマッチを配列で返し、gsub は正規表現にマッチした部分を置換します。Ruby の正規表現は Perl の影響を強く受けており、名前付きキャプチャ (?<name>...) などの高度な機能も備えています。',
      task: '"Hello World 123" から scan で数字部分を抽出して出力してください。',
      initialCode:
        'text = "Hello World 123"\n\n# 正規表現で数字を抽出\n# scan(/pattern/) — マッチした部分を配列で返す\n# \\d+ — 1桁以上の数字にマッチ\n',
      solutionCode:
        'text = "Hello World 123"\n\n# scan で正規表現にマッチする部分を配列で取得\nputs text.scan(/\\d+/).inspect',
      expectedOutput: '["123"]',
      hints: [
        '.scan(/\\d+/) で数字にマッチした部分を配列で返します',
        '\\d+ は「1文字以上の数字」にマッチするパターンです',
        '.inspect で配列を ["123"] の形式で表示します',
        '=~ 演算子はマッチした位置（整数）を返し、マッチしなければ nil です',
      ],
      explanation:
        'Ruby の正規表現はファーストクラスオブジェクトで、/pattern/ リテラルで Regexp インスタンスを作成します。=~ はマッチした場合にマッチ位置（0始まり）を返し、マッチしなければ nil を返します。match メソッドは MatchData オブジェクトを返し、名前付きキャプチャ /(?<year>\\d{4})/ では $~[:year] でアクセスできます。gsub(/pattern/, replacement) で置換、sub で最初の1つだけ置換します。case 文の when 節に正規表現を書くことでパターンマッチの分岐にも使えます。Ruby 3.2 では Regexp のタイムアウト設定が追加され、ReDoS（正規表現サービス拒否）攻撃の対策が可能になりました。',
    },
    {
      id: 10,
      title: 'ファイル操作',
      difficulty: 'beginner',
      description:
        'Ruby の File クラスはファイルの読み書きを行うための豊富なメソッドを提供します。File.open にブロックを渡すと、ブロック終了時に自動的にファイルがクローズされ、リソースリークを防ぎます。File.read は一括読み込み、File.readlines は行ごとの配列、File.foreach はメモリ効率の良い行単位の処理に適しています。ここではファイルI/Oの代わりに配列でシミュレーションして基本概念を学びます。',
      task: '配列にデータを追加し、全データを出力してください。',
      initialCode:
        '# ファイルの代わりに配列でI/Oをシミュレーション\n# 実際: File.open("path", "w") { |f| f.puts "text" }\ndata = []\n\n# << で配列に追加（ファイルへの書き込みに相当）\ndata << "Hello"\ndata << "Ruby"\n\n# 全データを出力（ファイルからの読み込みに相当）\n',
      solutionCode:
        '# 配列でファイルI/Oをシミュレーション\ndata = []\ndata << "Hello"\ndata << "Ruby"\n\n# 全データを出力\ndata.each { |line| puts line }',
      expectedOutput: 'Hello\nRuby',
      hints: [
        '<< で配列の末尾に要素を追加します',
        '.each { |line| puts line } で全要素を出力します',
        '実際のファイル書き込み: File.write("file.txt", "content")',
        'ブロック付き open: File.open("f.txt", "w") { |f| f.puts "text" }',
      ],
      explanation:
        'Ruby のファイルI/Oでは、ブロック付き File.open を使うのがベストプラクティスです。ブロック終了時に ensure で自動的に close が呼ばれるため、例外が発生してもリソースリークしません。File.read("path") は内容を丸ごと文字列で返し、File.readlines("path") は行の配列を返します。大きなファイルには File.foreach("path") { |line| ... } がメモリ効率に優れています。<< はShovel演算子と呼ばれ、配列への追加や文字列の結合に使います。IO.copy_stream でファイルのコピー、Dir.glob("*.rb") でファイルの検索も可能です。Pathname クラスを使うとよりオブジェクト指向的なファイルパス操作ができます。',
    },
    // ── Intermediate (11-20) ──
    {
      id: 11,
      title: 'クラスとオブジェクト指向',
      difficulty: 'intermediate',
      description:
        'Ruby は純粋なオブジェクト指向言語であり、整数、文字列、nil までもがオブジェクトです。クラスは class キーワードで定義し、initialize メソッドがコンストラクタとして .new 呼び出し時に実行されます。@変数 はインスタンス変数で、オブジェクトごとに独立した状態を保持します。attr_accessor, attr_reader, attr_writer でアクセサメソッドを自動生成でき、ボイラープレートを大幅に削減します。',
      task: 'name 属性を持つ Person クラスを作り、initialize と greet メソッドを実装してください。',
      initialCode:
        'class Person\n  # attr_reader :name で getter を自動定義\n\n  # initialize — new 時に呼ばれるコンストラクタ\n  # @name にインスタンス変数を設定\n\n  # greet — 挨拶を出力するメソッド\nend\n\np = Person.new("miruky")\np.greet',
      solutionCode:
        'class Person\n  attr_reader :name\n\n  # コンストラクタ: new 時に自動的に呼ばれる\n  def initialize(name)\n    @name = name  # インスタンス変数\n  end\n\n  # 挨拶メソッド\n  def greet\n    puts "Hello, I am #{@name}"\n  end\nend\n\np = Person.new("miruky")\np.greet',
      expectedOutput: 'Hello, I am miruky',
      hints: [
        '@name はインスタンス変数 — オブジェクトごとに独立した値を保持します',
        'initialize は .new 時に呼ばれるコンストラクタです',
        'attr_accessor :name で getter と setter を自動定義できます',
        'attr_reader は読み取り専用、attr_writer は書き込み専用です',
      ],
      explanation:
        'Ruby のクラスは Class クラスのインスタンスであり、クラス自体もオブジェクトです。@name はインスタンス変数で、オブジェクトごとに異なる値を持ちます。@@count はクラス変数でクラスとそのサブクラスで共有されますが、予期しない動作が起きやすいため使用は推奨されません。attr_accessor :name は def name; @name; end と def name=(val); @name = val; end の2つのメソッドを自動生成します。Ruby では private はキーワードであり、以降に定義されるメソッドがすべて private になります。メソッドの可視性は private, protected, public の3段階で、protected は同じクラスのインスタンス間でアクセス可能です。self は現在のオブジェクトを参照し、クラスメソッドは def self.method_name で定義します。',
    },
    {
      id: 12,
      title: 'モジュールと Mixin',
      difficulty: 'intermediate',
      description:
        'モジュール（module）はメソッドや定数をまとめた名前空間で、クラスとは異なりインスタンス化できません。include でクラスにメソッドを混入する（Mixin）ことで、単一継承の制約を超えた機能の共有を実現します。Ruby は単一継承ですが、Mixin により多重継承と同等の柔軟性を安全に確保しています。include はインスタンスメソッドとして、extend はクラスメソッドとして取り込みます。prepend はメソッド探索チェーンの先頭に挿入し、既存メソッドのラッピングに使えます。',
      task: 'Greetable モジュールの hello メソッドを User クラスに include してください。',
      initialCode:
        'module Greetable\n  def hello\n    puts "Hello from #{self.class}"\n  end\nend\n\nclass User\n  # Greetable モジュールを include\n  # → hello がインスタンスメソッドとして使える\nend\n\nUser.new.hello',
      solutionCode:
        'module Greetable\n  def hello\n    puts "Hello from #{self.class}"\n  end\nend\n\nclass User\n  include Greetable  # インスタンスメソッドとして取り込み\nend\n\nUser.new.hello',
      expectedOutput: 'Hello from User',
      hints: [
        'include Greetable でモジュールのメソッドをインスタンスメソッドとして取り込みます',
        'extend Greetable はクラスメソッドとして取り込みます',
        'self.class で現在のオブジェクトのクラス名を取得できます',
        'prepend は include と似ていますが、メソッド探索の先頭に挿入します',
      ],
      explanation:
        'Mixin は Ruby で多重継承を安全に実現する手段です。メソッド探索順序（MRO: Method Resolution Order）は ancestors メソッドで確認でき、include は親クラスの前、prepend は自クラスの前に挿入されます。Comparable（比較メソッド群）や Enumerable（コレクション操作メソッド群）は標準ライブラリの代表的なモジュールです。extend self をモジュール内に書くと、モジュール自身でもメソッドを呼べるようになり、名前空間付きユーティリティ関数として機能します。ActiveSupport::Concern はRailsで使われるモジュールの依存関係管理パターンです。Ruby 3.0 以降ではモジュールのインターフェース定義として RBS（型定義ファイル）を活用することもできます。',
    },
    {
      id: 13,
      title: 'Enumerable モジュール',
      difficulty: 'intermediate',
      description:
        'Enumerable は each メソッドを定義するだけで 50 以上の便利なメソッドを使えるようにする強力なモジュールです。map, select, reject, reduce, find, any?, all?, none?, count, group_by, zip, flat_map, chunk, each_with_object などを一挙に利用可能にします。Array, Hash, Range はすべて Enumerable をインクルードしています。カスタムクラスに include Enumerable し each を定義するだけで、これら全てのメソッドが使えるようになります。',
      task: '[3, 1, 4, 1, 5] を select で奇数のみ抽出し、sort して出力してください。',
      initialCode:
        'nums = [3, 1, 4, 1, 5]\n\n# select で奇数を抽出し sort で昇順ソート\n# &:odd? は { |n| n.odd? } の省略形\n# result = nums.select(???).sort\n\n# inspect で表示\n',
      solutionCode:
        'nums = [3, 1, 4, 1, 5]\n\n# &:odd? — Symbol#to_proc による省略記法\nresult = nums.select(&:odd?).sort\nputs result.inspect',
      expectedOutput: '[1, 1, 3, 5]',
      hints: [
        '.select(&:odd?) は .select { |n| n.odd? } の省略形です',
        '&:method_name は Symbol#to_proc を利用した省略記法です',
        '.sort で昇順ソートし新しい配列を返します',
        '.select は条件に合う要素だけを抽出します（.reject は逆）',
      ],
      explanation:
        '&:odd? は Ruby のメタプログラミングの美しい例です。& がオブジェクトに to_proc を呼び、:odd? シンボルが Proc.new { |n| n.odd? } に変換されます。Enumerable の各メソッドは each を通じて要素にアクセスするため、each さえ定義すれば全て使えます。select（filter と同名のエイリアスあり）は条件に合う要素の配列を返し、find は最初にマッチした1要素を返します。group_by { |n| n % 2 == 0 ? :even : :odd } でグループ分けし、tally でカウント集計（Ruby 2.7+）、zip で複数配列を並行処理できます。チェーンが長くなる場合は各メソッドの前で改行し、読みやすさを維持するのが Ruby スタイルです。Lazy Enumerator を使えば無限シーケンスの処理も可能になります。',
    },
    {
      id: 14,
      title: '例外処理 — begin/rescue',
      difficulty: 'intermediate',
      description:
        'Ruby の例外処理は begin-rescue-else-ensure-end で構成されます。rescue で例外をキャッチし、ensure は例外の有無に関わらず必ず実行されます。else は例外が発生しなかった場合にのみ実行されるブロックです。raise でカスタム例外を投げ、retry で rescue ブロック内から begin ブロックを再実行することもできます。Ruby の例外クラスは Exception を頂点とした階層構造になっており、通常は StandardError のサブクラスのみを rescue します。',
      task: '0除算を rescue で捕捉し "Error caught" と出力、ensure で "Done" と出力してください。',
      initialCode:
        '# begin-rescue-ensure の例外処理\nbegin\n  # 0除算を試みる\n  result = 10 / 0\nrescue\n  # 例外をキャッチして処理\n  \nensure\n  # 例外の有無に関わらず必ず実行\n  \nend',
      solutionCode:
        'begin\n  # 0除算 → ZeroDivisionError が発生\n  result = 10 / 0\nrescue ZeroDivisionError\n  # 特定の例外クラスをキャッチ\n  puts "Error caught"\nensure\n  # 必ず実行される（finally に相当）\n  puts "Done"\nend',
      expectedOutput: 'Error caught\nDone',
      hints: [
        'rescue ZeroDivisionError で特定の例外をキャッチします',
        'ensure は Java の finally に相当し、必ず実行されます',
        'rescue => e で例外オブジェクトを変数にキャプチャできます',
        'retry で begin ブロックを再実行できます（無限ループ注意）',
      ],
      explanation:
        'Ruby の例外階層は Exception → StandardError → RuntimeError/TypeError/... です。rescue を型指定なしで書くと StandardError をキャッチしますが、rescue Exception は SystemExit や SignalException もキャッチするため通常は避けるべきです。rescue => e で例外オブジェクトを取得し、e.message でメッセージ、e.backtrace でスタックトレースにアクセスできます。retry は rescue ブロック内で使い、begin ブロックを再実行します（リトライ回数をカウントしないと無限ループの危険）。カスタム例外は class MyError < StandardError; end で作成します。メソッド全体が begin ブロックの場合、begin/end を省略して def method ... rescue ... end と書けます。',
    },
    {
      id: 15,
      title: '可変長引数とキーワード引数',
      difficulty: 'intermediate',
      description:
        'Ruby のメソッドは柔軟な引数定義が可能です。*args で可変長の位置引数を配列として受け取り、**kwargs でキーワード引数をハッシュとして受け取れます。キーワード引数 key: default_value でデフォルト値を設定でき、呼び出し時に名前を明示するため可読性が高いです。Ruby 3.0 以降は位置引数とキーワード引数の自動変換が廃止され、厳密な区別が求められます。',
      task: 'キーワード引数 name:, greeting: "Hello" を持つメソッドを作り、呼び出してください。',
      initialCode:
        '# キーワード引数でメソッドを定義\n# name: — 必須キーワード引数\n# greeting: "Hello" — デフォルト値付きキーワード引数\ndef greet(name:, greeting: "Hello")\n  # greeting と name を使って出力\n  \nend\n\ngreet(name: "miruky")\ngreet(name: "Ruby", greeting: "Hi")',
      solutionCode:
        '# キーワード引数でメソッドを定義\ndef greet(name:, greeting: "Hello")\n  puts "#{greeting}, #{name}!"\nend\n\n# デフォルト greeting で呼び出し\ngreet(name: "miruky")\n# greeting を上書きして呼び出し\ngreet(name: "Ruby", greeting: "Hi")',
      expectedOutput: 'Hello, miruky!\nHi, Ruby!',
      hints: [
        'name: は必須キーワード引数です（省略するとエラー）',
        'greeting: "Hello" はデフォルト値付きで省略可能です',
        '呼び出し時に greet(name: "miruky") とキー名を明示します',
        '**opts でキーワード引数をハッシュとして一括受け取りできます',
      ],
      explanation:
        'キーワード引数は呼び出し時にパラメータの意味が明確になり、引数の順序を気にする必要がないため可読性が大幅に向上します。*args は可変長位置引数を配列として、**kwargs はキーワード引数をハッシュとして受け取ります。def method(a, b = 10, *rest, key:, **opts) のように組み合わせることも可能です。Ruby 3.0 以降、ハッシュを自動的にキーワード引数に変換する機能が廃止されたため、method({key: value}) と method(key: value) は明確に区別されます。デフォルト値には定数だけでなく式も書けます（def f(time: Time.now)）。ブロック引数 &block と組み合わせることで非常に表現力の高いメソッドインターフェースを設計できます。',
    },
    {
      id: 16,
      title: 'Struct と Data',
      difficulty: 'intermediate',
      description:
        'Struct は軽量なデータクラスを1行で定義できるファクトリクラスです。属性の getter/setter、==、to_s、each、[] アクセスなどが自動生成されます。Struct.new にブロックを渡してメソッドを追加することも可能です。Ruby 3.2 では不変のデータクラス Data も導入され、Record パターンのような使い方ができます。Struct は DTO（Data Transfer Object）や一時的なデータ構造に最適です。',
      task: 'Struct で Point(x, y) を定義し、座標を出力してください。',
      initialCode:
        '# Struct で軽量データクラスを定義\n# Point = Struct.new(:x, :y)\n\n# Point のインスタンスを作成\n# point = Point.new(3, 4)\n\n# x, y を出力\n',
      solutionCode:
        '# Struct で Point クラスを自動生成\nPoint = Struct.new(:x, :y)\n\n# インスタンス生成\npoint = Point.new(3, 4)\n\n# アクセサで座標を出力\nputs "#{point.x}, #{point.y}"',
      expectedOutput: '3, 4',
      hints: [
        'Point = Struct.new(:x, :y) で属性付きクラスを自動生成します',
        'point.x, point.y でアクセサ経由のアクセスが可能です',
        'Struct は ==, to_s, each, [] がすべて自動定義されます',
        'keyword_init: true で Point.new(x: 3, y: 4) のように呼べます',
      ],
      explanation:
        'Struct は内部的にクラスを動的に生成するファクトリメソッドです。生成されたクラスは Class のサブクラスで、attr_accessor, ==, eql?, hash, to_s, inspect, each, [], []= が自動的に定義されます。Struct.new(:x, :y, keyword_init: true) とすると Point.new(x: 3, y: 4) のようにキーワード引数で初期化できます。ブロックで追加メソッドも定義可能: Point = Struct.new(:x, :y) { def distance; Math.sqrt(x**2 + y**2); end }。Ruby 3.2 の Data クラスは Struct と似ていますがイミュータブル（setter なし）で、値オブジェクトとしての使用に特化しています。Struct は一時的なデータ構造やテスト用のスタブオブジェクトにも便利です。',
    },
    {
      id: 17,
      title: 'メタプログラミング — method_missing',
      difficulty: 'intermediate',
      description:
        'Ruby のメタプログラミングは、コードを書くコードを実行時に生成する強力な機能です。method_missing は存在しないメソッドが呼ばれた時に呼び出されるフックメソッドで、動的メソッドディスパッチの基盤です。ActiveRecord の find_by_name などの動的メソッドはこの仕組みで実現されています。ただし method_missing の乱用はデバッグを困難にするため、respond_to_missing? も併せてオーバーライドすることが必須とされています。',
      task: 'method_missing で "say_hello" を呼ぶと "hello" と出力する DynamicClass を作ってください。',
      initialCode:
        'class DynamicClass\n  def method_missing(name, *args)\n    # say_ で始まるメソッドを動的に処理\n    # それ以外は super で元の method_missing を呼ぶ\n    \n  end\nend\n\nobj = DynamicClass.new\nobj.say_hello',
      solutionCode:
        'class DynamicClass\n  def method_missing(name, *args)\n    if name.to_s.start_with?("say_")\n      # say_ 以降の文字列を取得して出力\n      word = name.to_s.sub("say_", "")\n      puts word\n    else\n      # 未対応のメソッドは親の method_missing に委譲\n      super\n    end\n  end\nend\n\nobj = DynamicClass.new\nobj.say_hello',
      expectedOutput: 'hello',
      hints: [
        'name.to_s でメソッド名をシンボルから文字列に変換します',
        '.start_with?("say_") で接頭辞を判定します',
        '.sub("say_", "") で "say_" を削除して対象の単語を取得します',
        'super で元の method_missing（NoMethodError）を呼ぶのを忘れないこと',
      ],
      explanation:
        'method_missing は Ruby のメタプログラミングの核心機能の1つです。存在しないメソッドが呼ばれると Ruby はメソッド探索チェーンを辿り、見つからなければ method_missing を呼びます。super を呼ばない場合、本来エラーになるべき呼び出しも静かに無視されるため、未対応のメソッドは必ず super に委譲するべきです。respond_to_missing? もオーバーライドしないと、obj.respond_to?(:say_hello) が false を返してしまいます。method_missing の代替として define_method による動的メソッド定義があり、こちらの方がデバッグしやすく respond_to? にも対応するため推奨されます。ActiveRecord, OpenStruct, Delegator などの Ruby の有名なライブラリがこのテクニックを活用しています。',
    },
    {
      id: 18,
      title: 'Comparable モジュール',
      difficulty: 'intermediate',
      description:
        'Comparable モジュールを include し <=> 演算子（宇宙船演算子）を定義するだけで、<, <=, ==, >=, >, between?, clamp の比較メソッドが自動的に使えるようになります。<=> は左辺が小さければ -1、等しければ 0、大きければ 1 を返す規約です。sort メソッドも内部で <=> を使うため、Comparable を実装したオブジェクトはソート可能になります。この設計は「1つのメソッドで多くの機能を得る」という Ruby の哲学を体現しています。',
      task: 'weight 属性で比較可能な Box クラスを作り、ソートしてください。',
      initialCode:
        'class Box\n  include Comparable\n  attr_reader :weight\n\n  def initialize(weight)\n    @weight = weight\n  end\n\n  # <=> 演算子を定義して weight で比較\n  \nend\n\nboxes = [Box.new(30), Box.new(10), Box.new(20)]\nputs boxes.sort.map(&:weight).inspect',
      solutionCode:
        'class Box\n  include Comparable\n  attr_reader :weight\n\n  def initialize(weight)\n    @weight = weight\n  end\n\n  # <=> 演算子で比較ロジックを定義\n  def <=>(other)\n    weight <=> other.weight\n  end\nend\n\nboxes = [Box.new(30), Box.new(10), Box.new(20)]\nputs boxes.sort.map(&:weight).inspect',
      expectedOutput: '[10, 20, 30]',
      hints: [
        'def <=>(other) で比較メソッドを定義します',
        'weight <=> other.weight で数値の比較を委譲します',
        '<=> は左 < 右で -1、等しければ 0、左 > 右で 1 を返します',
        'Comparable を include すると <, <=, ==, >=, >, between?, clamp が使えます',
      ],
      explanation:
        '<=> 演算子（宇宙船演算子）は比較の結果を -1, 0, 1 の三値で返します。Integer, String, Time など Ruby の多くの組み込みクラスがこの演算子を定義しているため、配列の sort はデフォルトで動作します。Comparable を include して <=> を1つ定義するだけで、6つの比較メソッドと clamp が自動的に利用可能になる設計は、Ruby の DRY（Don\'t Repeat Yourself）原則の好例です。between?(min, max) は範囲チェック、clamp(min, max) は値を範囲内に制限します。sort_by { |box| box.weight } はソートキーを明示する別のアプローチで、複雑なソート条件に向いています。比較不能な場合は <=> が nil を返す規約です。',
    },
    {
      id: 19,
      title: 'Proc とクロージャ',
      difficulty: 'intermediate',
      description:
        'Proc はブロックをオブジェクト化したもので、変数に代入したり引数として渡すことができます。Proc はクロージャとして動作し、定義時のスコープの変数をキャプチャして保持し続けます。Lambda（-> { } で作成）は Proc の特殊形で、引数の数が合わないと ArgumentError を投げ、return が Lambda 内で完結する点が Proc と異なります。クロージャの概念は関数型プログラミングの基盤であり、状態のカプセル化に使われます。',
      task: 'カウンターを返すクロージャを作り、3回呼び出して結果を出力してください。',
      initialCode:
        'def create_counter\n  count = 0\n  # Proc でカウンターを返す\n  # クロージャ: 外側の count 変数をキャプチャ\n  \nend\n\ncounter = create_counter\nputs counter.call\nputs counter.call\nputs counter.call',
      solutionCode:
        'def create_counter\n  count = 0\n  # Proc はクロージャとして count をキャプチャ\n  Proc.new do\n    count += 1\n    count\n  end\nend\n\ncounter = create_counter\nputs counter.call\nputs counter.call\nputs counter.call',
      expectedOutput: '1\n2\n3',
      hints: [
        'Proc.new { count += 1; count } でクロージャを作成します',
        '.call で Proc を実行します（[] や .() でも可）',
        'Proc は外側のスコープの変数（count）をキャプチャし続けます',
        'Lambda は -> { count += 1; count } でも作成できます',
      ],
      explanation:
        'Proc はクロージャとして、作成時のスコープの変数への参照を保持します。create_counter から返された Proc は count 変数を参照し続け、呼び出すたびにインクリメントされます。これは関数型プログラミングにおける状態のカプセル化パターンです。Lambda（-> (args) { body }）との主な違いは2つです。引数: Lambda は厳密チェック、Proc は柔軟。return: Lambda は Lambda 内で完結、Proc は囲むメソッドからも脱出。method(:puts) でメソッドを Method オブジェクトとして取得し、.call で呼び出すことも可能です。Proc は .call, .[], .() の3つの方法で呼び出せます。Ruby のブロック、Proc、Lambda の違いを正確に理解することは、上級 Ruby プログラマへの重要なステップです。',
    },
    {
      id: 20,
      title: 'パターンマッチング（Ruby 3.0+）',
      difficulty: 'intermediate',
      description:
        'Ruby 3.0 で正式導入されたパターンマッチング（case/in）は、データの構造に基づいたマッチングと分解代入を提供します。ハッシュ、配列、クラスのパターンに対してマッチし、値を変数にバインドできます。従来の case/when の値の比較とは異なり、case/in はパターンの構造にマッチします。find パターン、ガード条件（if）、ピン演算子（^）などの高度な機能も備えており、Rust や Elixir のパターンマッチングに影響を受けています。',
      task: 'ハッシュをパターンマッチングで分解し、name を出力してください。',
      initialCode:
        'data = { name: "miruky", role: "engineer", age: 25 }\n\n# case/in でパターンマッチング\n# { name: String => name } でString型のnameを取得\ncase data\nin { name: String => name }\n  # name を出力\n  \nend',
      solutionCode:
        'data = { name: "miruky", role: "engineer", age: 25 }\n\n# case/in でハッシュの構造にマッチ\ncase data\nin { name: String => name }\n  # name に "miruky" がバインドされる\n  puts name\nend',
      expectedOutput: 'miruky',
      hints: [
        'in { name: String => name } で String 型の name をキャプチャします',
        '=> name で値を変数にバインドします',
        'ピン演算子 ^variable で既存の変数値とのマッチを行います',
        'in [Integer => x, *rest] で配列パターンも使えます',
      ],
      explanation:
        'パターンマッチングは Ruby 2.7 で実験的に導入、3.0 で正式機能になりました。case/in と case/when の違いは重要で、when は === による値の比較、in は構造のパターンマッチングです。{ name: String => name } は「ハッシュの :name キーの値が String である場合、その値を name にバインド」と読みます。配列パターン [first, *rest]、find パターン [*, {name: /mi.*/ } => user, *]、ガード条件 in { age: (18..) } if condition も使えます。ピン演算子 ^ は変数の値をパターンとして使うためのもので、^expected_name のように書きます。=> 式でパターンマッチングの結果を直接分解代入することも可能です（data => { name: }）。',
    },
    // ── Advanced (21-30) ──
    {
      id: 21,
      title: 'DSL (ドメイン固有言語) の作成',
      difficulty: 'advanced',
      description:
        'Ruby の柔軟な構文（括弧省略、ブロック、メタプログラミング）を活かして、特定のドメインに特化した DSL（Domain Specific Language）を作成できます。instance_eval を使うとブロック内の self を任意のオブジェクトに切り替えることができ、まるで設定ファイルのような記述が可能になります。Rails の routes.rb, Gemfile, RSpec のテスト記述、Sinatra のルーティングなどは全て Ruby の DSL です。これこそが Ruby の「プログラマの幸福」を追求した結果です。',
      task: 'configure ブロックで設定を定義できる簡易 DSL を作ってください。',
      initialCode:
        'class Config\n  attr_accessor :host, :port\n\n  def initialize\n    @host = "localhost"\n    @port = 3000\n  end\nend\n\n# configure メソッド: ブロックを Config コンテキストで実行\ndef configure(&block)\n  config = Config.new\n  # instance_eval でブロック内の self を config に\n  \n  config\nend\n\nc = configure do\n  self.host = "example.com"\n  self.port = 8080\nend\nputs "#{c.host}:#{c.port}"',
      solutionCode:
        'class Config\n  attr_accessor :host, :port\n\n  def initialize\n    @host = "localhost"\n    @port = 3000\n  end\nend\n\n# configure: ブロックを Config のコンテキストで実行\ndef configure(&block)\n  config = Config.new\n  config.instance_eval(&block)  # self を config に切り替え\n  config\nend\n\nc = configure do\n  self.host = "example.com"\n  self.port = 8080\nend\nputs "#{c.host}:#{c.port}"',
      expectedOutput: 'example.com:8080',
      hints: [
        'instance_eval(&block) でブロック内の self をレシーバオブジェクトに切り替えます',
        'attr_accessor で getter/setter を自動生成すると DSL ライクな記述が可能になります',
        'self.host = の self. は setter メソッド呼び出しのために必要です',
        'class_eval はクラスのコンテキストでブロックを実行します（メソッド定義に使う）',
      ],
      explanation:
        'instance_eval はブロック内の self をレシーバに変更する強力なメソッドです。これによりブロック内で config.host = ではなく self.host = と書けるようになり、DSL としての読みやすさが向上します。Rails の routes.rb（Rails.application.routes.draw do ... end）、Gemfile（gem "rails"）、RSpec（describe, it, expect）はすべてこの手法で実現されています。class_eval はクラスのコンテキストでコードを実行するため、動的なメソッド定義に使います。instance_eval と class_eval を組み合わせることで、非常に表現力の高い DSL を構築できます。ただし self の切り替えはスコープの理解を要求するため、ドキュメントをしっかり書くことが重要です。',
    },
    {
      id: 22,
      title: 'Fiber による軽量コルーチン',
      difficulty: 'advanced',
      description:
        'Fiber は協調的マルチタスク（cooperative multitasking）を実現する軽量コルーチンです。Thread とは異なり、明示的に Fiber.yield で処理を中断し resume で再開するため、レースコンディションの心配がありません。Enumerator は内部で Fiber を使って遅延評価を実現しています。Ruby 3.0 以降は Fiber Scheduler が導入され、非同期 I/O の基盤としても Fiber が活用されています。Fiber はジェネレータパターンやストリーム処理にも最適です。',
      task: '1, 2, 3 を順に yield する Fiber を作り、3回 resume して出力してください。',
      initialCode:
        '# Fiber: 協調的コルーチン\nfiber = Fiber.new do\n  # Fiber.yield で値を返して中断\n  # resume で再開\n  \nend\n\nputs fiber.resume\nputs fiber.resume\nputs fiber.resume',
      solutionCode:
        '# Fiber: 中断と再開を明示的に制御\nfiber = Fiber.new do\n  Fiber.yield 1  # 1 を返して中断\n  Fiber.yield 2  # 2 を返して中断\n  3              # 最後の値（return に相当）\nend\n\nputs fiber.resume  # → 1\nputs fiber.resume  # → 2\nputs fiber.resume  # → 3',
      expectedOutput: '1\n2\n3',
      hints: [
        'Fiber.yield で値を返して処理を中断します',
        'resume で Fiber の実行を再開します',
        '最後の値は暗黙的な return として返されます',
        'Fiber を使い終わった後に resume するとFiberError が発生します',
      ],
      explanation:
        'Fiber は Thread より軽量で、明示的なスイッチング（yield/resume）により並行処理の制御が容易です。Thread が OS レベルのスレッドを利用するのに対し、Fiber はユーザー空間のコルーチンとして動作します。Enumerator.new { |y| y.yield 1; y.yield 2 } は内部で Fiber を使っており、遅延評価の基盤になっています。Ruby 3.0 の Fiber Scheduler は IO 操作（ファイル読み書き、ネットワーク）を非ブロッキングにし、async/await パターンに近い非同期プログラミングを可能にします。Fiber.transfer を使うと Fiber 間で直接制御を移すこともできます。Python のジェネレータ（yield）や JavaScript の Generator と概念的に近い機能です。',
    },
    {
      id: 23,
      title: 'Ractor による並行処理（Ruby 3.0+）',
      difficulty: 'advanced',
      description:
        'Ractor は Ruby 3.0 で導入された並行処理の新しいプリミティブで、GVL（Global VM Lock）を超えた真の並列実行を実現します。各 Ractor は独立したメモリ空間を持ち、メッセージパッシングでデータを共有します。Erlang/Elixir の Actor モデルに影響を受けており、共有メモリの問題（レースコンディション、デッドロック）を設計レベルで回避します。freeze 済みの不変オブジェクトのみが Ractor 間で直接共有可能です。',
      task: 'Ractor のコンセプトを Thread で代替しシミュレーションしてください。',
      initialCode:
        '# Ractor のシミュレーション（Thread で代替）\n# 実際の Ractor: r = Ractor.new { 2 + 3 }; puts r.take\n\nresult = nil\nt = Thread.new { result = 2 + 3 }\nt.join\nputs result',
      solutionCode:
        '# Ractor は Actor モデルベースの並行処理\n# Thread でシミュレーション\nresult = nil\nt = Thread.new { result = 2 + 3 }\nt.join  # スレッドの完了を待機\nputs result',
      expectedOutput: '5',
      hints: [
        'Thread.new { ... } で新しいスレッドを作成します',
        '.join でスレッドの完了を待ちます',
        '実際の Ractor: r = Ractor.new { 2 + 3 }; r.take で結果取得',
        'Ractor はメッセージパッシング: r.send(value) / Ractor.receive',
      ],
      explanation:
        'Ractor は Erlang/Elixir の Actor モデルに影響を受けた並行処理の仕組みです。各 Ractor は独立したメモリ空間を持ち、send/take でメッセージをやり取りします。共有可能な（shareable）オブジェクトは freeze 済みの不変オブジェクト、Ractor, Integer, Symbol などに限定されます。MRI Ruby の GVL により Thread は CPU バウンドな処理では並列実行されませんが、Ractor は各 Ractor が独自の GVL を持つため真の並列実行が可能です。ただし Ruby 3.x 時点ではまだ実験的な機能であり、一部の制限があります。大量のデータ処理やCPU集約的な計算で Ractor を使うとマルチコアの恩恵を受けられます。将来的に Ruby の並行処理モデルの中心になることが期待されています。',
    },
    {
      id: 24,
      title: 'define_method による動的メソッド定義',
      difficulty: 'advanced',
      description:
        'define_method はプログラム実行時にメソッドを動的に定義できるメタプログラミングの核心メソッドです。method_missing よりもデメリットが少なく、定義されたメソッドは respond_to? に応答し、method(:name) で取得でき、通常のメソッドと同じようにデバッグ可能です。ActiveRecord の動的ファインダー（find_by_name 等）や attr_accessor の内部実装はこの仕組みを使っています。ブロック内からクロージャとして外側の変数にアクセスできる点も重要な特徴です。',
      task: '[:hello, :bye] から say_hello, say_bye メソッドを動的に定義してください。',
      initialCode:
        'class Greeter\n  # 配列の各要素からメソッドを動的に定義\n  [:hello, :bye].each do |word|\n    # define_method で "say_#{word}" メソッドを定義\n    \n  end\nend\n\ng = Greeter.new\ng.say_hello\ng.say_bye',
      solutionCode:
        'class Greeter\n  # define_method で動的にメソッドを定義\n  [:hello, :bye].each do |word|\n    define_method("say_#{word}") do\n      puts word  # クロージャで word をキャプチャ\n    end\n  end\nend\n\ng = Greeter.new\ng.say_hello\ng.say_bye',
      expectedOutput: 'hello\nbye',
      hints: [
        'define_method("say_#{word}") do ... end でメソッドを動的定義します',
        'ブロック内から word を クロージャとして参照できます',
        'method_missing より安全：respond_to? にも対応します',
        'define_method はクラス定義内（クラスのコンテキスト）で使えます',
      ],
      explanation:
        'define_method は Class や Module のプライベートメソッドで、クラス本体またはclass_eval/module_eval内で使用します。ブロックが Proc として保存されるため、外側の変数（ここでは word）をクロージャでキャプチャできます。ActiveRecord の動的ファインダー、Rails の has_many マクロ、attr_accessor の内部実装はすべて define_method を活用しています。method_missing と比較して、定義されたメソッドは methods, respond_to?, method(:name) で正常に認識されるため、デバッグやイントロスペクションが容易です。send(:say_hello) で動的にメソッドを呼び出すことも可能です。大量のメソッドを define_method で定義する場合、method_missing + define_method のキャッシュパターンも使われます。',
    },
    {
      id: 25,
      title: 'Refinements — 安全なモンキーパッチ',
      difficulty: 'advanced',
      description:
        'Refinements は Ruby 2.0 で導入された、スコープを限定したクラス拡張機能です。従来のモンキーパッチ（オープンクラス）はグローバルに影響するため副作用が大きく、依存ライブラリとの衝突リスクがありました。Refinements は using キーワードで有効化したファイルまたはモジュール内でのみ拡張が適用され、他のコードに影響しません。これにより組み込みクラスの拡張を安全に行えます。',
      task: 'String に shout メソッドを追加する Refinement を作り、using で有効化してください。',
      initialCode:
        'module StringExtensions\n  refine String do\n    # shout メソッドを定義（大文字 + "!!!"）\n    \n  end\nend\n\n# using で Refinement を有効化\nusing StringExtensions\nputs "hello".shout',
      solutionCode:
        'module StringExtensions\n  refine String do\n    # 大文字化して "!!!" を付加\n    def shout\n      upcase + "!!!"\n    end\n  end\nend\n\n# using で現在のスコープに Refinement を適用\nusing StringExtensions\nputs "hello".shout',
      expectedOutput: 'HELLO!!!',
      hints: [
        'refine String do ... end で String クラスを拡張します',
        'using StringExtensions で Refinement を有効化します',
        'Refinement は using 宣言以降のコードでのみ有効です',
        '他のファイルやモジュールには影響しません（スコープ限定）',
      ],
      explanation:
        'Refinements は using を宣言したスコープでのみ有効になるため、グローバルな名前空間汚染を防ぎます。オープンクラス（class String; def shout; ...; end; end）は全体に影響しますが、Refinements は安全です。using はファイルのトップレベルまたはモジュール/クラス定義内で宣言でき、ブロックやメソッド内では使えない制限があります。Refinements 内では super が元のメソッドを呼び出すため、既存メソッドの拡張やラッピングも可能です。ActiveSupport の String 拡張（blank?, present?, camelize など）は Refinements ではなくオープンクラスですが、Refinements の方がより安全な設計です。Ruby のメタプログラミングの力を安全に活用するための重要なツールです。',
    },
    {
      id: 26,
      title: 'Lazy Enumerator',
      difficulty: 'advanced',
      description:
        '.lazy メソッドを呼ぶと遅延評価（Lazy Evaluation）の Enumerator を生成します。通常の Enumerator は全要素を即座に処理しますが、Lazy Enumerator は必要な分だけ計算するため、無限シーケンスも安全に扱えます。map, select, reject, take, drop などがすべて遅延版に変換され、最後に force や to_a で実体化します。大量データのストリーム処理やメモリ効率が重要な場面で威力を発揮します。',
      task: '無限の自然数列から偶数を10個取得して出力してください。',
      initialCode:
        '# lazy で無限シーケンスを遅延評価\n# (1..Float::INFINITY) は無限の範囲\n# .lazy がないとメモリ不足になる\n\n# result = (1..Float::INFINITY).lazy\n#   .select で偶数をフィルタ\n#   .first(10) で最初の10個を取得\n',
      solutionCode:
        '# lazy により必要な分だけ計算（遅延評価）\nresult = (1..Float::INFINITY).lazy.select(&:even?).first(10)\nputs result.inspect',
      expectedOutput: '[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]',
      hints: [
        '.lazy で遅延評価の Enumerator を生成します',
        '.select(&:even?) で偶数のみをフィルタします',
        '.first(10) で最初の10個を取得して配列化します',
        '.lazy がなければ Float::INFINITY まで処理しようとしてフリーズします',
      ],
      explanation:
        'Lazy Enumerator は関数型プログラミングの遅延評価をRubyで実現します。.lazy なしで (1..Float::INFINITY).select(&:even?) を実行すると、無限の要素全てを処理しようとしてメモリ不足やフリーズが発生します。Lazy は各 中間操作（map, select, reject）を遅延化し、終端操作（first, to_a, force, each）が呼ばれた時点で必要な分だけ処理します。Enumerator::Lazy は Ruby 2.0 で導入され、ストリーム処理のパイプラインを構築するのに最適です。大容量ファイルの行単位処理にも File.foreach("big.log").lazy.select { ... }.first(100) のように活用できます。zip, flat_map, chunk なども遅延版が用意されています。Haskell の遅延評価に影響を受けた機能です。',
    },
    {
      id: 27,
      title: 'テスト駆動開発 — Minitest',
      difficulty: 'advanced',
      description:
        'Minitest は Ruby の標準テストフレームワークで、TDD（テスト駆動開発）の基盤です。assert_equal, assert_nil, assert_raises, assert_includes などのアサーションメソッドを提供し、シンプルかつ高速にテストを実行できます。TDD のサイクルは Red（失敗するテストを書く）→ Green（最小限のコードで通す）→ Refactor（リファクタリング）です。RSpec はより表現力の高い代替フレームワークで、describe/it/expect の BDD スタイルを提供します。',
      task: 'Calculator クラスの add メソッドをテストしてください（シミュレーション）。',
      initialCode:
        'class Calculator\n  def add(a, b)\n    a + b\n  end\nend\n\n# テストのシミュレーション\n# 実際: require "minitest/autorun"\n# class TestCalc < Minitest::Test\n#   def test_add\n#     assert_equal 5, Calculator.new.add(2, 3)\n#   end\n# end\n\ncalc = Calculator.new\nresult = calc.add(2, 3)\nif result == 5\n  puts "PASS: add(2, 3) == 5"\nelse\n  puts "FAIL: expected 5, got #{result}"\nend',
      solutionCode:
        'class Calculator\n  def add(a, b)\n    a + b\n  end\nend\n\n# テストのシミュレーション\ncalc = Calculator.new\nresult = calc.add(2, 3)\nif result == 5\n  puts "PASS: add(2, 3) == 5"\nelse\n  puts "FAIL: expected 5, got #{result}"\nend',
      expectedOutput: 'PASS: add(2, 3) == 5',
      hints: [
        'Calculator.new でインスタンスを生成します',
        '.add(2, 3) を呼んで結果を検証します',
        '実際の Minitest: assert_equal 5, calc.add(2, 3)',
        'RSpec スタイル: expect(calc.add(2, 3)).to eq(5)',
      ],
      explanation:
        'TDD は ① Red（失敗するテストを書く）→ ② Green（テストを通す最小限のコードを書く）→ ③ Refactor（リファクタリング）のサイクルを繰り返す開発手法です。Minitest はRuby標準で、require "minitest/autorun" だけで使えます。assert_equal(expected, actual) で値の一致、assert_nil で nil チェック、assert_raises(ErrorClass) で例外の発生を検証します。RSpec はBDD（Behavior Driven Development）スタイルのフレームワークで、describe/context/it/expect のDSL が読みやすいテストを実現します。テストカバレッジの測定には SimpleCov、モックには Minitest::Mock や RSpec Mocks が使えます。CI/CD パイプラインでの自動テスト実行が現代の開発では必須です。',
    },
    {
      id: 28,
      title: 'デザインパターン — Decorator（prepend）',
      difficulty: 'advanced',
      description:
        'Decorator パターンはオブジェクトに動的に新しい責任を追加するパターンです。Ruby では module と prepend を使って既存メソッドをラップし、前後に処理を追加できます。prepend はメソッド探索チェーンの自クラスの前にモジュールを挿入するため、super で元のメソッドを呼び出せます。これは AOP（アスペクト指向プログラミング）のアラウンドアドバイスに相当し、ログ出力、認証チェック、パフォーマンス計測などの横断的関心事の実装に適しています。',
      task: 'Logger モジュールを prepend して、greet メソッドの前にログを出力してください。',
      initialCode:
        'module Logger\n  def greet\n    puts "[LOG] greet called"\n    super  # 元のメソッドを呼び出す\n  end\nend\n\nclass User\n  # Logger を prepend してメソッドをラップ\n  \n\n  def greet\n    puts "Hello!"\n  end\nend\n\nUser.new.greet',
      solutionCode:
        'module Logger\n  def greet\n    puts "[LOG] greet called"\n    super  # 元の User#greet を呼び出す\n  end\nend\n\nclass User\n  prepend Logger  # メソッド探索チェーンの先頭に挿入\n\n  def greet\n    puts "Hello!"\n  end\nend\n\nUser.new.greet',
      expectedOutput: '[LOG] greet called\nHello!',
      hints: [
        'prepend Logger でモジュールをメソッド探索の先頭に挿入します',
        'super で元の User#greet を呼び出します',
        'include は後ろに挿入、prepend は前に挿入される違いがあります',
        'User.ancestors で探索順序を確認できます',
      ],
      explanation:
        'prepend はメソッド探索チェーンの自クラスの前にモジュールを挿入するため、Logger#greet が User#greet より先に呼ばれます。super を呼ぶと元の User#greet が実行されるため、メソッドのラッピング（前後に処理を追加）が可能です。include は親クラスの前に挿入されるため、super の関係が異なります。User.ancestors で [Logger, User, Object, ...] という探索順序が確認できます。この手法はログ出力、認証、キャッシュ、トランザクション管理などの横断的関心事（Cross-Cutting Concerns）の実装に適しています。Rails の ActiveRecord::Callbacks や around_action も概念的に同様のパターンです。複数のモジュールを prepend して処理を積み重ねることも可能です。',
    },
    {
      id: 29,
      title: 'Frozen String リテラル',
      difficulty: 'advanced',
      description:
        '# frozen_string_literal: true マジックコメントをファイルの先頭に書くと、そのファイル内の全ての文字列リテラルが自動的に freeze されます。freeze された文字列は変更不可（immutable）になり、同じ内容の文字列が共有されるためメモリ効率が向上します。変更しようとすると FrozenError（Ruby 2.5 以前は RuntimeError）が発生します。Ruby 3.x 以降はデフォルト freeze 化が段階的に導入されており、将来的には全文字列がデフォルトで frozen になる方向です。',
      task: '凍結された文字列に対して変更を試み、例外を rescue してください。',
      initialCode:
        '# freeze で文字列を凍結\n# 実際のプロジェクトでは # frozen_string_literal: true を使用\nstr = "hello".freeze\n\nbegin\n  # str に " world" を追加しようとする\n  # → FrozenError が発生する\n  \nrescue => e\n  puts e.class\nend',
      solutionCode:
        '# freeze で文字列を凍結（イミュータブルにする）\nstr = "hello".freeze\n\nbegin\n  # 凍結された文字列への変更は FrozenError\n  str << " world"\nrescue => e\n  puts e.class\nend',
      expectedOutput: 'FrozenError',
      hints: [
        '.freeze でオブジェクトを凍結（変更不可）にします',
        '<< は文字列の末尾に追加する破壊的メソッドです',
        '凍結された文字列を変更すると FrozenError が発生します',
        '.frozen? で凍結状態を確認できます',
      ],
      explanation:
        '# frozen_string_literal: true はパフォーマンスとメモリ効率の両方を改善します。同じ内容のフリーズ済み文字列はメモリ上で共有されるため、ガベージコレクションの負荷が軽減されます。RuboCop（Ruby の静的解析ツール）もこのマジックコメントの使用を推奨しています。凍結された文字列から新しい文字列を作りたい場合は str.dup（浅いコピー）や +str（Ruby 3.0+）で解凍コピーを取得できます。freeze は String だけでなく Array, Hash など全てのオブジェクトに使えます。Integer, Symbol, true, false, nil は元々イミュータブルなので freeze しても変わりません。Ruby のコアチームは将来的にデフォルト frozen string にすることを目指しており、早めに # frozen_string_literal: true を導入するのがベストプラクティスです。',
    },
    {
      id: 30,
      title: 'GC とメモリ管理',
      difficulty: 'advanced',
      description:
        'Ruby は Mark-and-Sweep 方式のガベージコレクション（GC）を採用しており、世代別GC（Generational GC）と インクリメンタルGC で効率を向上させています。ObjectSpace モジュールで現在のオブジェクトの統計情報を取得でき、パフォーマンスチューニングに役立ちます。GC.stat で詳細なGC統計、GC.compact（Ruby 2.7+）でメモリコンパクションが可能です。大規模 Rails アプリケーションではGCチューニングが応答性能の鍵になることがあります。',
      task: 'ObjectSpace.count_objects を使って、現在のオブジェクト数の情報を出力してください。',
      initialCode:
        '# ObjectSpace でオブジェクト統計を取得\n# count_objects はオブジェクト種別ごとのカウントを返すハッシュ\ncounts = ObjectSpace.count_objects\n\n# :TOTAL — 全オブジェクト数\n# :FREE — 解放済みスロット数\nputs counts[:TOTAL]\nputs counts[:FREE]',
      solutionCode:
        '# ObjectSpace でオブジェクト統計を取得\ncounts = ObjectSpace.count_objects\n\n# オブジェクトの全体数と空きスロット数\nputs counts[:TOTAL]\nputs counts[:FREE]',
      expectedOutput: '0\n0',
      hints: [
        'ObjectSpace.count_objects はハッシュを返します',
        ':TOTAL で全オブジェクト数、:FREE で空きスロット数にアクセスします',
        'GC.stat で詳細なGC統計情報を取得できます',
        'ObjectSpace.each_object(String) で全ての String オブジェクトを列挙できます',
      ],
      explanation:
        'Ruby のGCは Mark-and-Sweep を基本とし、世代別GC（若い世代 / 古い世代）で効率を改善しています。若い世代のオブジェクト（直近で作成されたもの）は頻繁にGCが行われ、古い世代は頻度を下げることでパフォーマンスを最適化します。GC.stat は major_gc_count（Full GC回数）, minor_gc_count（若い世代のGC回数）, heap_allocated_pages などの詳細統計を返します。GC.compact（Ruby 2.7+）はヒープのフラグメンテーションを解消し、メモリ使用効率を向上させます。RUBY_GC_HEAP_INIT_SLOTS などの環境変数でGCパラメータを調整でき、Unicorn/Puma の worker プロセスの立ち上げ時にGC.compact を呼ぶことでCopy-on-Write の効率を最大化するテクニックもあります。大規模アプリケーションではGCの影響がレスポンスタイムに直結するため、モニタリングとチューニングが重要です。',
    },
  ],
};

export default course;
