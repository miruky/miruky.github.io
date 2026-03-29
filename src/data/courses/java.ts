import { LangCourse } from './types';

const course: LangCourse = {
  id: 'java',
  name: 'Java',
  nameJa: 'Java',
  simpleIconSlug: 'openjdk',
  color: '#ED8B00',
  description: 'Java は堅牢な型システムと「Write Once, Run Anywhere」の理念を掲げ、エンタープライズから Android まで広く使われるオブジェクト指向言語です。JVM 上で動作し、ガベージコレクション・豊富な標準ライブラリ・大規模エコシステムが特徴です。',
  lessons: [
    // ── Beginner (1-10) ──
    {
      id: 1,
      title: 'Hello World',
      difficulty: 'beginner',
      description:
        'Java プログラムはクラスの中に main メソッドを書くことで実行できます。public static void main(String[] args) がエントリーポイントとなり、JVM はここから実行を開始します。System.out.println() は標準出力に文字列を出力し、自動的に改行を追加します。C や C++ と異なり、Java ではすべてのコードが何らかのクラスに属している必要があります。ファイル名はパブリッククラス名と一致させる規約があり、Main.java に public class Main を書くのが基本です。',
      task: '"Hello, Java!" と出力するプログラムを完成させてください。',
      initialCode:
        '// Java のすべてのプログラムはクラスの中に書く\npublic class Main {\n  // main メソッドがプログラムのエントリーポイント\n  public static void main(String[] args) {\n    // ここに出力処理を書いてください\n    \n  }\n}',
      solutionCode:
        'public class Main {\n  // main メソッドがプログラムのエントリーポイント\n  public static void main(String[] args) {\n    // System.out.println で標準出力に文字列を表示\n    System.out.println("Hello, Java!");\n  }\n}',
      expectedOutput: 'Hello, Java!',
      hints: [
        'System.out.println() を使って文字列を出力します',
        '文字列はダブルクォーテーション "" で囲みます',
        'println は print + line（改行付き出力）の略です',
        'セミコロン ; を文末に忘れないようにしましょう',
      ],
      explanation:
        'Java のすべてのアプリケーションは最低1つのクラスと main メソッドを持ちます。public はどこからでもアクセス可能、static はインスタンスを作らず呼べる、void は戻り値がないことを意味します。System.out は標準出力ストリームのオブジェクトで、println メソッドは引数を出力したあと改行します。print メソッドを使うと改行なしで出力できます。Java のコンパイルは javac Main.java で行い、java Main で実行します。この2段階のプロセスがバイトコードへの変換と JVM での実行に対応しています。',
    },
    {
      id: 2,
      title: '変数とデータ型',
      difficulty: 'beginner',
      description:
        'Java は静的型付け言語であり、変数を宣言するときに型を明示する必要があります。基本型（プリミティブ型）には int（整数）、double（浮動小数点）、boolean（真偽値）、char（文字）などがあり、参照型には String やオブジェクトがあります。Java 10 以降は var キーワードで型推論も可能ですが、プリミティブ型とオブジェクト型の違いを理解することが重要です。プリミティブ型はスタックに直接値を格納し、参照型はヒープ上のオブジェクトへの参照を格納します。',
      task: '整数・浮動小数点数・文字列の変数をそれぞれ宣言し、出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    // int: 整数型\n    \n    // double: 浮動小数点型\n    \n    // String: 文字列型（参照型）\n    \n    // 3つの変数を出力\n    \n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    // int: 整数型（32ビット）\n    int age = 25;\n    // double: 浮動小数点型（64ビット）\n    double height = 170.5;\n    // String: 文字列型（参照型・イミュータブル）\n    String name = "Java";\n    System.out.println(age);\n    System.out.println(height);\n    System.out.println(name);\n  }\n}',
      expectedOutput: '25\n170.5\nJava',
      hints: [
        'int age = 25; のように 型名 変数名 = 値; と書きます',
        'double は小数点を含む数値に使います',
        'String は大文字始まり — プリミティブ型ではなく参照型です',
        'Java のプリミティブ型: byte, short, int, long, float, double, char, boolean',
      ],
      explanation:
        'Java のプリミティブ型は 8 種類あり、それぞれサイズが決まっています。int は 32 ビット（約 ±21 億）、long は 64 ビット、double は 64 ビット浮動小数点です。String は java.lang パッケージのクラスでイミュータブル（不変）です。一度作成された String オブジェクトは変更できず、文字列操作は新しいオブジェクトを生成します。プリミティブ型にはそれぞれラッパークラス（Integer, Double など）があり、コレクションで使う際にはオートボクシングにより自動変換されます。変数名は camelCase で記述するのが Java の慣例です。',
    },
    {
      id: 3,
      title: '演算子と文字列結合',
      difficulty: 'beginner',
      description:
        'Java では算術演算子（+, -, *, /, %）、比較演算子（==, !=, <, >）、論理演算子（&&, ||, !）が使えます。+ 演算子は数値では加算、文字列ではコンカチネーション（結合）として動作します。整数同士の除算は小数部分が切り捨てられる点に注意が必要です（5 / 2 は 2）。型の異なる数値を演算すると、自動的に広い型に暗黙変換（ワイドニング）されます。文字列と数値を + で結合すると、数値が自動的に文字列に変換されます。',
      task: '2つの整数の四則演算の結果と、文字列結合の結果を出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    int a = 10;\n    int b = 3;\n    // 四則演算の結果を出力\n    System.out.println(a + b);\n    System.out.println(a - b);\n    // 残りの演算と文字列結合を追加\n    \n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    int a = 10;\n    int b = 3;\n    // 四則演算\n    System.out.println(a + b);   // 加算\n    System.out.println(a - b);   // 減算\n    System.out.println(a * b);   // 乗算\n    System.out.println(a / b);   // 整数除算（切り捨て）\n    System.out.println(a % b);   // 剰余\n    // 文字列結合\n    System.out.println("Result: " + (a + b));\n  }\n}',
      expectedOutput: '13\n7\n30\n3\n1\nResult: 13',
      hints: [
        '整数同士の / は小数部分が切り捨てられます（10 / 3 = 3）',
        '% は剰余（余り）演算子です（10 % 3 = 1）',
        '"文字列" + 数値 で文字列結合になります',
        '(a + b) のように括弧で囲まないと、文字列 + a + b になり "Result: 103" になります',
      ],
      explanation:
        'Java の整数除算は結果も整数になるため、10 / 3 は 3.333... ではなく 3 です。小数の結果が必要な場合は、一方を double にキャストするか double リテラルを使います（10.0 / 3）。文字列結合で + を使う場合、演算の優先順位に注意が必要です。"Result: " + a + b は左から評価されるため "Result: 103" になりますが、"Result: " + (a + b) とすれば括弧内が先に計算され "Result: 13" になります。大量の文字列結合には StringBuilder を使うのがパフォーマンス上有利です。剰余演算子 % は偶奇判定やサイクリック処理で頻繁に使用されます。',
    },
    {
      id: 4,
      title: 'if-else 条件分岐',
      difficulty: 'beginner',
      description:
        '条件分岐は if-else 文で記述します。条件式は boolean 型の値を返す必要があり、C/C++ のように整数を条件にすることはできません。else if で複数の条件を連鎖でき、三項演算子 (条件 ? 値1 : 値2) で簡潔に書くこともできます。Java 14 以降は switch 式が強化され、パターンマッチングも利用可能になりました。条件式の短絡評価により、&& の左辺が false なら右辺は評価されません。',
      task: '変数 score の値に応じて "A"（90以上）、"B"（70以上）、"C"（それ以外）を出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    int score = 85;\n    // if-else で成績を判定\n    // 90以上 → "A"\n    // 70以上 → "B"\n    // それ以外 → "C"\n    \n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    int score = 85;\n    // if-else で成績を判定\n    if (score >= 90) {\n      System.out.println("A");\n    } else if (score >= 70) {\n      System.out.println("B");\n    } else {\n      System.out.println("C");\n    }\n  }\n}',
      expectedOutput: 'B',
      hints: [
        'if (score >= 90) のように条件を書きます',
        'else if で追加の条件を連鎖できます',
        '条件は上から順に評価され、最初にマッチしたブロックが実行されます',
        '波括弧 {} でブロックを囲むのが安全です（1行でも省略しない方がよい）',
      ],
      explanation:
        'Java の if 文は条件式が boolean 型でなければコンパイルエラーになります。if (1) のような書き方は C では可能ですが Java では不可です。else if は実際には else { if ... } のシンタックスシュガーであり、上から順に評価されるため、条件の順序が重要です。85 は 90 未満なので最初の条件は偽、70 以上なので二番目の条件が真となり "B" が出力されます。三項演算子 String grade = (score >= 90) ? "A" : "B"; で簡潔に書けるケースもあります。複雑な分岐には switch 文や Strategy パターンを検討してください。ブレース省略は保守時のバグの原因になるため、常に {} を付けるスタイルが推奨されます。',
    },
    {
      id: 5,
      title: 'for ループと while ループ',
      difficulty: 'beginner',
      description:
        'Java には for ループ、拡張 for（for-each）ループ、while ループ、do-while ループがあります。for ループは初期化・条件・更新の 3 部分で構成され、繰り返し回数が明確な場合に適しています。while ループは条件が真である間繰り返し、回数が不明確な場合に使います。do-while は最低 1 回は実行される点が while と異なります。break でループを抜け、continue で次の反復にスキップできます。',
      task: '1 から 5 までの数字を for ループで、次に while ループで合計を計算して出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    // for ループで 1〜5 を出力\n    for (int i = 1; i <= 5; i++) {\n      System.out.println(i);\n    }\n    // while ループで 1〜5 の合計を計算\n    int sum = 0;\n    int n = 1;\n    // while ループを書いてください\n    \n    System.out.println("Sum: " + sum);\n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    // for ループで 1〜5 を出力\n    for (int i = 1; i <= 5; i++) {\n      System.out.println(i);\n    }\n    // while ループで 1〜5 の合計を計算\n    int sum = 0;\n    int n = 1;\n    while (n <= 5) {\n      sum += n;  // sum = sum + n\n      n++;       // n をインクリメント\n    }\n    System.out.println("Sum: " + sum);\n  }\n}',
      expectedOutput: '1\n2\n3\n4\n5\nSum: 15',
      hints: [
        'while (n <= 5) で条件を設定します',
        'sum += n; で合計に加算します',
        'n++ を忘れると無限ループになります',
        'for ループの i は {} 内のスコープでのみ有効です',
      ],
      explanation:
        'for ループの for (int i = 1; i <= 5; i++) は「i を 1 から始め、5 以下の間、毎回 1 増やして繰り返す」と読みます。while ループは条件チェックが先に行われるため、条件が最初から偽なら一度も実行されません。n++ はポストインクリメントで、式の評価後に値が増えます（++n はプレインクリメント）。無限ループは while (true) で意図的に作ることもあり、break で脱出します。拡張 for 文 for (int x : array) は配列やコレクションの全要素に対する反復に便利です。ループのネストでは内側のループが外側の各反復ごとに完全に実行されます。パフォーマンスが重要な場合、ループ変数のスコープや配列の長さキャッシュも考慮します。',
    },
    {
      id: 6,
      title: '配列',
      difficulty: 'beginner',
      description:
        'Java の配列は固定長で同一型の要素を格納するデータ構造です。宣言時にサイズを指定するか、初期化リストで要素を直接指定します。配列のサイズは .length プロパティで取得でき、インデックスは 0 から始まります。範囲外アクセスは ArrayIndexOutOfBoundsException を投げます。配列は参照型であるため、配列変数の代入はコピーではなく参照の共有になる点に注意が必要です。多次元配列も int[][] のように宣言できます。',
      task: '整数配列を作り、拡張 for 文で全要素を出力し、合計も出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    // 配列の宣言と初期化\n    int[] numbers = {10, 20, 30, 40, 50};\n    int sum = 0;\n    // 拡張 for 文で各要素を出力し合計を計算\n    \n    System.out.println("Sum: " + sum);\n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    // 配列の宣言と初期化\n    int[] numbers = {10, 20, 30, 40, 50};\n    int sum = 0;\n    // 拡張 for 文（for-each）で各要素を出力し合計を計算\n    for (int num : numbers) {\n      System.out.println(num);\n      sum += num;\n    }\n    System.out.println("Sum: " + sum);\n  }\n}',
      expectedOutput: '10\n20\n30\n40\n50\nSum: 150',
      hints: [
        'for (int num : numbers) が拡張 for 文の構文です',
        'sum += num; で合計に各要素を加算します',
        '配列の長さは numbers.length で取得できます',
        'Arrays.toString(numbers) で配列を文字列化できます（import java.util.Arrays が必要）',
      ],
      explanation:
        '拡張 for 文（enhanced for / for-each）は配列やイテラブルなコレクションの全要素を簡潔に走査できます。内部的にはインデックス変数やイテレータを使った通常の for ループに変換されます。配列のサイズは生成後に変更できないため、可変長が必要な場合は ArrayList を使います。int[] numbers = new int[5]; とすると全要素が 0 で初期化された配列が作られます。配列の比較に == を使うと参照の比較になるため、要素の比較には Arrays.equals() を使います。Arrays クラスには sort(), binarySearch(), fill(), copyOf() など便利なメソッドが多数用意されています。多次元配列はジャグ配列（各行で長さが異なる）も可能です。',
    },
    {
      id: 7,
      title: 'メソッドの定義と呼び出し',
      difficulty: 'beginner',
      description:
        'メソッドは処理のまとまりを名前で呼び出せるようにした再利用可能な部品です。戻り値の型、メソッド名、引数リストで構成されるシグネチャによって識別されます。同名でも引数の型や数が異なるメソッドを定義できるオーバーロードが Java の特徴です。static メソッドはクラスに属し、インスタンスなしで呼べます。void は戻り値がないことを示し、return 文で値を返すメソッドは戻り値の型を明示します。',
      task: '2つの整数の最大値を返す static メソッド max を作成してください。',
      initialCode:
        'public class Main {\n  // static メソッド max を定義\n  // 引数: int a, int b\n  // 戻り値: 大きい方の int\n  \n\n  public static void main(String[] args) {\n    System.out.println(max(10, 20));\n    System.out.println(max(50, 30));\n  }\n}',
      solutionCode:
        'public class Main {\n  // 2つの整数の大きい方を返す\n  static int max(int a, int b) {\n    // 三項演算子でシンプルに記述\n    return a > b ? a : b;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(max(10, 20));\n    System.out.println(max(50, 30));\n  }\n}',
      expectedOutput: '20\n50',
      hints: [
        'static int max(int a, int b) でメソッドを定義します',
        'return 文で値を呼び出し元に返します',
        'a > b ? a : b は三項演算子で if-else の簡略形です',
        'Math.max(a, b) という標準ライブラリのメソッドも利用可能です',
      ],
      explanation:
        'Java のメソッドはクラスの中に定義する必要があります。main メソッドが static なので、呼び出す max メソッドも static でなければなりません（インスタンスが存在しないため）。メソッドオーバーロードにより max(int, int), max(double, double), max(int, int, int) のように同名メソッドを複数定義できます。Java ではプリミティブ型は値渡し、オブジェクトは参照の値渡しです。戻り値を持たないメソッドは void を指定し、return; で早期リターンが可能です。標準ライブラリの Math.max() は内部的に同様のロジックを持っています。メソッドの命名は動詞で始める camelCase（getMax, calculateTotal など）が慣例です。',
    },
    {
      id: 8,
      title: 'String メソッド',
      difficulty: 'beginner',
      description:
        'String クラスはイミュータブル（不変）で、文字列操作のためのメソッドを多数持っています。length(), charAt(), substring(), indexOf(), contains(), replace(), split(), trim(), toUpperCase(), toLowerCase() などが代表的です。String のイミュータブル性により、これらのメソッドは元の文字列を変更せず新しい String オブジェクトを返します。文字列の比較には == ではなく equals() メソッドを使う必要があります。Java 11 では isBlank(), strip(), repeat() なども追加されました。',
      task: '文字列の長さ、大文字変換、部分文字列の取得を行い出力してください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    String text = "Hello, Java World!";\n    // 文字列の長さを出力\n    \n    // 大文字に変換して出力\n    \n    // 7文字目から11文字目（Java）を切り出して出力\n    \n    // "Java" が含まれているか判定して出力\n    \n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    String text = "Hello, Java World!";\n    // 文字列の長さ\n    System.out.println(text.length());\n    // 大文字変換（元の text は変わらない）\n    System.out.println(text.toUpperCase());\n    // substring(開始, 終了) で部分文字列\n    System.out.println(text.substring(7, 11));\n    // contains で部分文字列の存在チェック\n    System.out.println(text.contains("Java"));\n  }\n}',
      expectedOutput: '18\nHELLO, JAVA WORLD!\nJava\ntrue',
      hints: [
        '.length() で文字列の長さを取得します（配列の .length とは異なりメソッドです）',
        '.toUpperCase() で大文字に変換した新しい文字列を返します',
        '.substring(7, 11) は 7 番目から 11 番目の直前まで（0始まり）',
        '.contains("Java") は部分文字列が存在すれば true を返します',
      ],
      explanation:
        'String のイミュータブル性は Java の重要な設計判断です。text.toUpperCase() を呼んでも text 自体は変わらず、新しい String が返されます。substring(7, 11) の範囲は半開区間 [7, 11) で、インデックス 7, 8, 9, 10 の4文字が取得されます。文字列比較では str1 == str2 は参照の比較であり、str1.equals(str2) が内容の比較です。intern() メソッドで文字列プールを活用できますが、通常は意識する必要はありません。StringBuilder は可変文字列で、ループ内で大量の文字列結合を行う場合にパフォーマンスが大幅に向上します。Java 15 以降のテキストブロック（\"\"\"...\"\"\"）で複数行文字列も簡潔に書けます。',
    },
    {
      id: 9,
      title: 'ArrayList',
      difficulty: 'beginner',
      description:
        'ArrayList は java.util パッケージの可変長リスト実装です。内部的には配列を使用し、要素数が増えると自動的にリサイズされます。ジェネリクス ArrayList<型> で格納する型を指定し、型安全性を確保します。add(), get(), set(), remove(), size() などのメソッドで要素を操作します。プリミティブ型は直接格納できないため、Integer, Double などのラッパークラスを使いますが、オートボクシングにより int → Integer の変換は自動的に行われます。',
      task: 'ArrayList<String> に要素を追加・取得・削除し、サイズを出力してください。',
      initialCode:
        'import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> fruits = new ArrayList<>();\n    // "Apple", "Banana", "Cherry" を追加\n    \n    // 全要素を出力\n    \n    // "Banana" を削除\n    \n    // サイズを出力\n    \n  }\n}',
      solutionCode:
        'import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> fruits = new ArrayList<>();\n    // 要素の追加\n    fruits.add("Apple");\n    fruits.add("Banana");\n    fruits.add("Cherry");\n    // 全要素を for-each で出力\n    for (String f : fruits) {\n      System.out.println(f);\n    }\n    // 要素の削除\n    fruits.remove("Banana");\n    // サイズの確認\n    System.out.println(fruits.size());\n  }\n}',
      expectedOutput: 'Apple\nBanana\nCherry\n2',
      hints: [
        '.add("要素") でリストの末尾に追加します',
        'for (String f : fruits) で全要素を走査できます',
        '.remove("Banana") で指定した要素を削除します',
        '.size() で現在の要素数を取得します（配列の .length に相当）',
      ],
      explanation:
        'ArrayList は java.util.List インターフェースの代表的な実装です。内部配列のデフォルト初期容量は 10 で、容量を超えると約 1.5 倍に自動拡張されます。ダイヤモンド演算子 <> により右辺の型パラメータを省略できます。remove() にはインデックス指定（remove(1)）とオブジェクト指定（remove("Banana")）の2種類があり、Integer のリストでは混乱しやすいので注意が必要です。LinkedList はランダムアクセスは遅いですが挿入・削除が速い別の List 実装です。変数の型を List<String> インターフェースで宣言するのが推奨されます（List<String> fruits = new ArrayList<>()）。Collections.unmodifiableList() や List.of() で不変リストも作成できます。',
    },
    {
      id: 10,
      title: 'Scanner で入力処理',
      difficulty: 'beginner',
      description:
        'Scanner クラスは標準入力やファイルからデータを読み込むためのユーティリティです。nextLine() で1行分の文字列を、nextInt() で整数を、nextDouble() で浮動小数点数を読み込みます。System.in を引数に渡してインスタンスを作成し、使い終わったら close() でリソースを解放します。nextInt() の後に nextLine() を呼ぶと改行文字が残る問題は初心者がよくハマるポイントです。try-with-resources で自動クローズするのがベストプラクティスです。',
      task: '名前を入力して挨拶メッセージを出力する処理を完成させてください（ここでは固定値で代替）。',
      initialCode:
        'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    // 本来は Scanner で入力を受け取る\n    // Scanner sc = new Scanner(System.in);\n    // String name = sc.nextLine();\n    // ここでは固定値で代替\n    String name = "miruky";\n    // 挨拶メッセージを出力\n    \n  }\n}',
      solutionCode:
        'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    // 本来は Scanner で入力を受け取る\n    // Scanner sc = new Scanner(System.in);\n    // String name = sc.nextLine();\n    // sc.close();\n    // ここでは固定値で代替\n    String name = "miruky";\n    // 挨拶メッセージを出力\n    System.out.println("Hello, " + name + "!");\n  }\n}',
      expectedOutput: 'Hello, miruky!',
      hints: [
        '"Hello, " + name + "!" で文字列を結合します',
        'Scanner は System.in から入力を読み取るクラスです',
        'sc.nextLine() で1行分の入力を取得します',
        'try (Scanner sc = new Scanner(System.in)) で自動クローズできます',
      ],
      explanation:
        'Scanner は java.util パッケージに属し、正規表現ベースのテキスト解析機能を持つパーサーです。デリミタ（デフォルトは空白）でトークンを区切り、hasNext() で次のトークンの有無を確認できます。nextInt() の後に nextLine() を呼ぶと、残った改行文字を読み取ってしまうため、間に nextLine() を挟んで空読みする必要があります。大量のデータ読み込みには BufferedReader の方が高速です。実行環境で標準入力が使えない場合は固定値で代替するのが一般的なテスト手法です。Java 11 以降は readLine() 的な操作に System.console() も使えますが、IDE 上では null を返すことがあります。',
    },
    // ── Intermediate (11-20) ──
    {
      id: 11,
      title: 'クラスとオブジェクト',
      difficulty: 'intermediate',
      description:
        'Java はオブジェクト指向プログラミングの代表的な言語であり、クラスはオブジェクトの設計図です。フィールド（データ）とメソッド（振る舞い）をカプセル化し、new 演算子でインスタンス（実体）を生成します。コンストラクタはオブジェクト生成時に初期化処理を行う特殊なメソッドで、クラス名と同名です。this キーワードは現在のインスタンスへの参照を表し、フィールドと引数名が同じ場合の曖昧さを解消します。',
      task: '名前と年齢を持つ Person クラスを作り、自己紹介メソッドを実装してください。',
      initialCode:
        '// Person クラスを定義\n// フィールド: String name, int age\n// コンストラクタ: Person(String name, int age)\n// メソッド: void introduce()\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person("miruky", 25);\n    p.introduce();\n  }\n}',
      solutionCode:
        'class Person {\n  // フィールド\n  String name;\n  int age;\n\n  // コンストラクタ — インスタンス生成時に呼ばれる\n  Person(String name, int age) {\n    this.name = name;  // this で自身のフィールドを参照\n    this.age = age;\n  }\n\n  // 自己紹介メソッド\n  void introduce() {\n    System.out.println("I am " + name + ", age " + age);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person("miruky", 25);\n    p.introduce();\n  }\n}',
      expectedOutput: 'I am miruky, age 25',
      hints: [
        'class Person { ... } でクラスを定義します',
        'this.name = name; で引数をフィールドに代入します',
        'コンストラクタには戻り値の型を書きません',
        'new Person("miruky", 25) でインスタンスを生成します',
      ],
      explanation:
        'Java のクラスは状態（フィールド）と振る舞い（メソッド）をまとめた抽象的な型です。new 演算子はヒープにメモリを確保し、コンストラクタを呼び出してオブジェクトを初期化します。this は現在のインスタンスを指す暗黙の参照で、this.name と引数 name を区別します。コンストラクタを明示的に書かない場合、引数なしのデフォルトコンストラクタが自動生成されますが、引数付きコンストラクタを1つでも定義するとデフォルトは生成されません。this() で別のコンストラクタを呼ぶコンストラクタチェーンも可能です。複数のコンストラクタをオーバーロードしてさまざまな初期化パターンに対応するのが一般的です。',
    },
    {
      id: 12,
      title: 'カプセル化 — private とアクセサ',
      difficulty: 'intermediate',
      description:
        'カプセル化はオブジェクト指向の重要な原則で、内部データを隠蔽し制御されたアクセスを提供します。フィールドを private にして外部から直接アクセスできなくし、getter と setter メソッド経由でのみアクセス可能にします。これにより入力値のバリデーション、副作用の制御、将来の実装変更に対する柔軟性を確保できます。Java のアクセス修飾子は private, default(パッケージプライベート), protected, public の4段階です。',
      task: 'BankAccount クラスで残高を private にし、deposit と getBalance メソッドを実装してください。',
      initialCode:
        'class BankAccount {\n  // 残高を private で隠蔽\n  \n\n  // コンストラクタ\n  BankAccount(double balance) {\n    this.balance = balance;\n  }\n\n  // deposit: 正の金額のみ追加\n  \n\n  // getBalance: 残高を返す\n  \n}\n\npublic class Main {\n  public static void main(String[] args) {\n    BankAccount acc = new BankAccount(1000);\n    acc.deposit(500);\n    acc.deposit(-100); // 無効 — 無視される\n    System.out.println(acc.getBalance());\n  }\n}',
      solutionCode:
        'class BankAccount {\n  // 残高を private で隠蔽\n  private double balance;\n\n  // コンストラクタ\n  BankAccount(double balance) {\n    this.balance = balance;\n  }\n\n  // deposit: 正の金額のみ追加（バリデーション付き）\n  void deposit(double amount) {\n    if (amount > 0) {\n      balance += amount;\n    }\n  }\n\n  // getBalance: 残高を返す（読み取り専用アクセス）\n  double getBalance() {\n    return balance;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    BankAccount acc = new BankAccount(1000);\n    acc.deposit(500);\n    acc.deposit(-100); // 無効 — 無視される\n    System.out.println(acc.getBalance());\n  }\n}',
      expectedOutput: '1500.0',
      hints: [
        'private double balance; でフィールドを隠蔽します',
        'deposit で if (amount > 0) のバリデーションを入れます',
        'getter は double getBalance() { return balance; } です',
        'private フィールドは同じクラス内からのみアクセス可能です',
      ],
      explanation:
        'カプセル化により BankAccount の balance には deposit() と getBalance() を通じてのみアクセスでき、不正な値（負の入金額）をブロックできます。もし balance が public だった場合、外部から acc.balance = -999999; と不正な値を設定できてしまいます。getter/setter のパターンは JavaBeans 規約に従い、getXxx() / setXxx() の命名が標準です。boolean 型の getter は isXxx() とするのが慣例です。Lombok ライブラリの @Getter / @Setter アノテーションでボイラープレートコードを自動生成することもできます。フィールドは可能な限り private にし、必要最小限のアクセスを提供するのが良い設計です。不変オブジェクトにする場合は setter を提供せず、final フィールドにします。',
    },
    {
      id: 13,
      title: '継承と super',
      difficulty: 'intermediate',
      description:
        '継承は既存のクラス（スーパークラス）の機能を引き継いで新しいクラス（サブクラス）を作る仕組みです。extends キーワードでスーパークラスを指定し、フィールドとメソッドを再利用できます。super() でスーパークラスのコンストラクタを呼び、super.method() でオーバーライド前のメソッドにアクセスします。Java は単一継承のみをサポートし、1つのクラスは1つのスーパークラスしか持てません。すべてのクラスは暗黙的に Object クラスを継承しています。',
      task: 'Animal クラスを継承した Dog クラスで、speak() メソッドをオーバーライドしてください。',
      initialCode:
        'class Animal {\n  String name;\n  Animal(String name) { this.name = name; }\n  void speak() { System.out.println(name + " makes a sound"); }\n}\n\n// Dog クラスを Animal から継承\n// speak() をオーバーライドして "Woof!" と出力\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Animal("Cat");\n    a.speak();\n    Dog d = new Dog("Rex");\n    d.speak();\n  }\n}',
      solutionCode:
        'class Animal {\n  String name;\n  Animal(String name) { this.name = name; }\n  void speak() { System.out.println(name + " makes a sound"); }\n}\n\n// Dog は Animal を継承\nclass Dog extends Animal {\n  // super() でスーパークラスのコンストラクタを呼ぶ\n  Dog(String name) { super(name); }\n\n  // @Override でメソッドをオーバーライド\n  @Override\n  void speak() { System.out.println(name + " says Woof!"); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Animal("Cat");\n    a.speak();\n    Dog d = new Dog("Rex");\n    d.speak();\n  }\n}',
      expectedOutput: 'Cat makes a sound\nRex says Woof!',
      hints: [
        'class Dog extends Animal でクラスを継承します',
        'super(name) でスーパークラスのコンストラクタを呼びます',
        '@Override アノテーションを付けるとコンパイラがチェックしてくれます',
        '継承したフィールド name はそのまま使えます',
      ],
      explanation:
        '継承は「is-a」関係を表現するための仕組みです（Dog は Animal である）。子クラスのコンストラクタでは最初に super() を呼ぶ必要があり、明示しない場合は引数なしの super() が暗黙的に呼ばれます。@Override アノテーションを付けることで、スーパークラスに対応するメソッドが存在しない場合にコンパイルエラーになり、タイプミスを防げます。Java の単一継承制約はダイヤモンド問題を回避するためですが、インターフェースの多重実装で柔軟性を補完します。final クラスは継承不可、final メソッドはオーバーライド不可にできます。過度な継承はクラス階層を複雑にするため、「継承より委譲（コンポジション）を優先する」が現代のベストプラクティスです。',
    },
    {
      id: 14,
      title: 'インターフェース',
      difficulty: 'intermediate',
      description:
        'インターフェースは抽象メソッドの集合を定義し、実装クラスに対して契約を課す仕組みです。interface キーワードで定義し、implements で実装します。Java 8 以降は default メソッドで実装を持てるようになり、static メソッドも定義可能になりました。1つのクラスが複数のインターフェースを実装でき、多重継承の問題なく多態性を実現します。インターフェースの定数は暗黙的に public static final です。',
      task: 'Printable インターフェースを定義し、Book と Magazine に実装させてください。',
      initialCode:
        '// Printable インターフェースを定義\n// void printInfo() メソッドを宣言\n\n// Book クラス — Printable を実装\n\n// Magazine クラス — Printable を実装\n\npublic class Main {\n  public static void main(String[] args) {\n    Printable b = new Book("Java入門");\n    Printable m = new Magazine("Tech Monthly");\n    b.printInfo();\n    m.printInfo();\n  }\n}',
      solutionCode:
        '// インターフェース定義\ninterface Printable {\n  void printInfo();\n}\n\n// Book クラス — Printable を実装\nclass Book implements Printable {\n  String title;\n  Book(String title) { this.title = title; }\n  @Override\n  public void printInfo() {\n    System.out.println("Book: " + title);\n  }\n}\n\n// Magazine クラス — Printable を実装\nclass Magazine implements Printable {\n  String name;\n  Magazine(String name) { this.name = name; }\n  @Override\n  public void printInfo() {\n    System.out.println("Magazine: " + name);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Printable b = new Book("Java入門");\n    Printable m = new Magazine("Tech Monthly");\n    b.printInfo();\n    m.printInfo();\n  }\n}',
      expectedOutput: 'Book: Java入門\nMagazine: Tech Monthly',
      hints: [
        'interface Printable { void printInfo(); } でインターフェースを定義します',
        'class Book implements Printable で実装します',
        'インターフェースのメソッドは暗黙的に public abstract です',
        '実装メソッドには @Override と public を付けます',
      ],
      explanation:
        'インターフェースは「何ができるか」の契約を定義し、「どうやるか」は各実装クラスに委ねます。Printable 型の変数には Book でも Magazine でも代入でき、printInfo() を呼ぶと実際のオブジェクトの実装が実行されます（ポリモーフィズム）。Java 8 の default メソッドにより、インターフェースに backward-compatible な機能追加が可能になりました。Comparable<T>, Iterable<T>, Serializable など標準ライブラリのインターフェースを実装することで、ソートやイテレーションの機能を持たせることができます。関数型インターフェース（@FunctionalInterface）は抽象メソッドが1つだけで、ラムダ式のターゲット型になります。インターフェースの設計は API の安定性に直結するため、小さく凝集度の高い設計が推奨されます。',
    },
    {
      id: 15,
      title: 'ポリモーフィズム',
      difficulty: 'intermediate',
      description:
        'ポリモーフィズム（多態性）は、同じインターフェースを通じて異なる型のオブジェクトを統一的に扱える性質です。スーパークラスや インターフェース型の変数にサブクラスのインスタンスを代入し、メソッドを呼ぶと実際の型に応じた処理が実行されます。これにより if-else による型分岐を排除し、新しい型の追加がオープン/クローズド原則に従って行えます。コンパイル時の型と実行時の型が異なるのが Java のポリモーフィズムの核心です。',
      task: 'Shape の配列に Circle と Rectangle を入れ、ループで area() を呼び出してください。',
      initialCode:
        'abstract class Shape {\n  abstract double area();\n}\n\n// Circle クラスを実装\n\n// Rectangle クラスを実装\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape[] shapes = { new Circle(5), new Rectangle(4, 6) };\n    for (Shape s : shapes) {\n      System.out.println(s.area());\n    }\n  }\n}',
      solutionCode:
        'abstract class Shape {\n  abstract double area();\n}\n\n// 円 — 半径から面積を計算\nclass Circle extends Shape {\n  double r;\n  Circle(double r) { this.r = r; }\n  @Override\n  double area() { return Math.PI * r * r; }\n}\n\n// 長方形 — 幅×高さ\nclass Rectangle extends Shape {\n  double w, h;\n  Rectangle(double w, double h) { this.w = w; this.h = h; }\n  @Override\n  double area() { return w * h; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Shape 配列にさまざまな図形を格納\n    Shape[] shapes = { new Circle(5), new Rectangle(4, 6) };\n    // ループで統一的に area() を呼び出し\n    for (Shape s : shapes) {\n      System.out.println(s.area());\n    }\n  }\n}',
      expectedOutput: '78.53981633974483\n24.0',
      hints: [
        'class Circle extends Shape で Shape を継承します',
        'Math.PI で円周率を使えます',
        'abstract メソッドは必ずオーバーライドする必要があります',
        'Shape 型の配列にはすべてのサブクラスを格納できます',
      ],
      explanation:
        'ポリモーフィズムにより Shape[] 配列には Circle でも Rectangle でも格納でき、s.area() の呼び出しは実行時の実際の型に基づいてディスパッチされます。これが動的束縛（late binding / dynamic dispatch）です。新しい図形（Triangle など）を追加する場合、既存のコードを変更せずに Shape を継承した新クラスを追加するだけで済みます（開放/閉鎖原則）。abstract クラスは直接インスタンス化できず、抽象メソッドの実装を子クラスに強制します。instanceof 演算子で実行時の型チェックが可能ですが、多用するのはポリモーフィズムを活かしていない兆候です。Java 16 以降のパターンマッチング if (s instanceof Circle c) で型チェックとキャストを同時に行えます。',
    },
    {
      id: 16,
      title: '例外処理 — try-catch-finally',
      difficulty: 'intermediate',
      description:
        'Java の例外処理は try-catch-finally 構文で行います。try ブロックで例外が発生する可能性のあるコードを囲み、catch で特定の例外型をキャッチして処理します。finally は例外の有無に関わらず必ず実行されるブロックで、リソースのクリーンアップに使います。Java の例外は Checked Exception（コンパイル時に処理を強制）と Unchecked Exception（RuntimeException の子孫）に分類されます。try-with-resources 構文で AutoCloseable リソースを自動的にクローズできます。',
      task: '文字列を整数に変換する処理で、NumberFormatException をキャッチしてください。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) {\n    String[] inputs = {"42", "hello", "100"};\n    for (String s : inputs) {\n      // try-catch で安全に整数変換\n      // 成功: "42 -> 42" の形式で出力\n      // 失敗: "hello is not a number" と出力\n      \n    }\n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) {\n    String[] inputs = {"42", "hello", "100"};\n    for (String s : inputs) {\n      try {\n        // 文字列を整数に変換\n        int num = Integer.parseInt(s);\n        System.out.println(s + " -> " + num);\n      } catch (NumberFormatException e) {\n        // 変換失敗時のエラーハンドリング\n        System.out.println(s + " is not a number");\n      }\n    }\n  }\n}',
      expectedOutput: '42 -> 42\nhello is not a number\n100 -> 100',
      hints: [
        'Integer.parseInt(s) で文字列を整数に変換します',
        'catch (NumberFormatException e) で数値変換例外をキャッチします',
        'try { ... } catch (Exception e) { ... } が基本構文です',
        'e.getMessage() でエラーメッセージを取得できます',
      ],
      explanation:
        'NumberFormatException は RuntimeException のサブクラスであり、Unchecked Exception です。catch ブロックは複数書くことができ、上から順にマッチする最初のブロックが実行されます。より具体的な例外型を先に書く必要があり、Exception を先に書くとコンパイルエラーになります（到達不能コード）。Java 7 のマルチキャッチ catch (IOException | SQLException e) で複数の例外型を1つの catch で処理できます。finally ブロックは return 文があっても実行されるため、リソース解放に適していますが、try-with-resources がより安全です。独自の例外クラスは Exception または RuntimeException を継承して作成します。例外はフロー制御の手段として使うべきではなく、本当に例外的な状況にのみ使用します。',
    },
    {
      id: 17,
      title: 'HashMap',
      difficulty: 'intermediate',
      description:
        'HashMap<K, V> はキーと値の対（エントリ）を格納するマップ実装で、ハッシュテーブルに基づいて平均 O(1) の検索・挿入を実現します。キーは一意であり、同じキーに新しい値を put すると上書きされます。null キーと null 値の両方を許容します。put(), get(), containsKey(), remove(), size(), keySet(), values(), entrySet() が主要なメソッドです。Java 8 以降は getOrDefault(), computeIfAbsent(), merge() など便利なメソッドが追加されました。',
      task: 'HashMap で果物の在庫管理を行い、全エントリを出力してください。',
      initialCode:
        'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, Integer> stock = new HashMap<>();\n    // "Apple" -> 10, "Banana" -> 5, "Cherry" -> 8 を追加\n    \n    // "Banana" の在庫を3増やす\n    \n    // 全エントリを出力（キー: 値 の形式）\n    \n  }\n}',
      solutionCode:
        'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, Integer> stock = new HashMap<>();\n    // エントリの追加\n    stock.put("Apple", 10);\n    stock.put("Banana", 5);\n    stock.put("Cherry", 8);\n    // merge で在庫を加算\n    stock.merge("Banana", 3, Integer::sum);\n    // entrySet で全エントリを出力\n    for (Map.Entry<String, Integer> e : stock.entrySet()) {\n      System.out.println(e.getKey() + ": " + e.getValue());\n    }\n  }\n}',
      expectedOutput: 'Apple: 10\nBanana: 8\nCherry: 8',
      hints: [
        '.put("Apple", 10) でエントリを追加します',
        '.merge("Banana", 3, Integer::sum) で既存値に加算します',
        'entrySet() でキー・値のペアのセットを取得します',
        '.getOrDefault("Grape", 0) で存在しないキーのデフォルト値を指定できます',
      ],
      explanation:
        'HashMap はハッシュコードに基づいてバケットにエントリを配置し、平均 O(1) で操作を行います。キーの equals() と hashCode() が正しく実装されていることが前提です。Java 8 以降、衝突が多いバケットはリンクリストから赤黒木に変換され、最悪計算量が O(n) から O(log n) に改善されました。merge() は値が存在する場合にリマッピング関数を適用し、存在しない場合は値をそのまま設定する便利なメソッドです。順序が必要な場合は LinkedHashMap（挿入順）、ソート順が必要な場合は TreeMap（キーの自然順序）を使います。ConcurrentHashMap はスレッドセーフなマップ実装です。HashMap の初期容量と負荷係数を適切に設定することでリハッシュの頻度を制御できます。',
    },
    {
      id: 18,
      title: 'ジェネリクス',
      difficulty: 'intermediate',
      description:
        'ジェネリクスは型をパラメータ化する機能で、コードの再利用性と型安全性を両立します。クラス、インターフェース、メソッドに型パラメータ <T> を付与し、使用時に具体的な型を指定します。コンパイル時に型チェックが行われるため、ClassCastException のリスクを排除できます。型消去（Type Erasure）により、実行時にはジェネリクスの型情報は失われます。ワイルドカード <? extends T> と <? super T> で境界を設定し、柔軟性を高められます。',
      task: 'ジェネリックな Pair<A, B> クラスを作り、2つの異なる型の値を保持してください。',
      initialCode:
        '// Pair<A, B> クラスを定義\n// フィールド: A first, B second\n// コンストラクタ\n// toString メソッド\n\npublic class Main {\n  public static void main(String[] args) {\n    Pair<String, Integer> p = new Pair<>("Java", 17);\n    System.out.println(p);\n    System.out.println(p.getFirst());\n    System.out.println(p.getSecond());\n  }\n}',
      solutionCode:
        '// ジェネリッククラス — 2つの型パラメータ\nclass Pair<A, B> {\n  private final A first;\n  private final B second;\n\n  Pair(A first, B second) {\n    this.first = first;\n    this.second = second;\n  }\n\n  A getFirst() { return first; }\n  B getSecond() { return second; }\n\n  @Override\n  public String toString() {\n    return "(" + first + ", " + second + ")";\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Pair<String, Integer> p = new Pair<>("Java", 17);\n    System.out.println(p);\n    System.out.println(p.getFirst());\n    System.out.println(p.getSecond());\n  }\n}',
      expectedOutput: '(Java, 17)\nJava\n17',
      hints: [
        'class Pair<A, B> で2つの型パラメータを宣言します',
        'private final A first; でフィールドの型に型パラメータを使います',
        'ダイヤモンド演算子 <> で右辺の型推論ができます',
        'toString() をオーバーライドしてオブジェクトの文字列表現を定義します',
      ],
      explanation:
        'ジェネリクスは compile-time の型安全性を提供しますが、Type Erasure により実行時には Pair<String, Integer> は Pair に変換されます。これは Java 5 で既存コードとの互換性を維持するための設計判断です。型パラメータの命名規約は T（Type）, E（Element）, K（Key）, V（Value）, N（Number）です。bounded type parameter <T extends Number> で型の上限を、<T super Integer> で下限を設定できます。ジェネリックメソッドは static <T> T method(T arg) のように定義します。PECS（Producer Extends, Consumer Super）はワイルドカードを使うときの指針で、読み取り専用なら extends、書き込みなら super を使います。final フィールドにすることでイミュータブルな Pair を実現しています。',
    },
    {
      id: 19,
      title: 'Stream API — map / filter',
      difficulty: 'intermediate',
      description:
        'Stream API（Java 8+）はコレクションに対する関数型操作を提供します。stream() でストリームを生成し、中間操作（map, filter, sorted, distinct など）と終端操作（collect, forEach, reduce, count など）を組み合わせます。ストリームは遅延評価で、終端操作が呼ばれるまで中間操作は実行されません。パイプライン形式で読みやすく宣言的なコードが書け、parallelStream() で並列処理も容易に実現できます。',
      task: '整数リストから偶数だけをフィルタし、2倍にして出力してください。',
      initialCode:
        'import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8);\n    // Stream API で偶数をフィルタし2倍にする\n    // 結果をリストに収集して出力\n    \n  }\n}',
      solutionCode:
        'import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8);\n    // Stream API: filter → map → collect パイプライン\n    List<Integer> result = nums.stream()\n        .filter(n -> n % 2 == 0)   // 偶数をフィルタ\n        .map(n -> n * 2)           // 2倍に変換\n        .collect(Collectors.toList()); // リストに収集\n    System.out.println(result);\n  }\n}',
      expectedOutput: '[4, 8, 12, 16]',
      hints: [
        '.stream() でストリームを生成します',
        '.filter(n -> n % 2 == 0) で偶数だけを抽出します',
        '.map(n -> n * 2) で各要素を2倍に変換します',
        '.collect(Collectors.toList()) でリストに収集します',
      ],
      explanation:
        'Stream API の処理はパイプラインとして組み立てられ、終端操作（collect）が呼ばれた時点で初めて実行されます（遅延評価）。filter は Predicate<T>（T → boolean）を受け取り、条件に合う要素だけを通過させます。map は Function<T, R>（T → R）を受け取り、各要素を変換します。Collectors.toList() は Stream の要素を ArrayList に収集します（Java 16+ では Stream.toList() も使用可能）。sorted(), distinct(), limit(), skip() などの中間操作を組み合わせて複雑なデータ処理を宣言的に記述できます。IntStream, LongStream, DoubleStream はプリミティブ型専用のストリームで、ボクシングのオーバーヘッドを避けられます。副作用のない純粋関数を使うことがストリームの正しい使い方です。',
    },
    {
      id: 20,
      title: 'Optional',
      difficulty: 'intermediate',
      description:
        'Optional<T> は値が存在するかもしれないし存在しないかもしれないコンテナです。null を返す代わりに Optional を使うことで、呼び出し側に「値がないかもしれない」ことを型レベルで明示します。of(), ofNullable(), empty() で生成し、isPresent(), ifPresent(), orElse(), map(), flatMap() で安全に値を操作します。NullPointerException の防止とコードの意図の明確化が主な目的です。フィールドやコレクションの要素として使うのはアンチパターンと見なされています。',
      task: 'Optional で名前を検索し、見つかれば大文字で、なければデフォルト値を出力してください。',
      initialCode:
        'import java.util.Optional;\nimport java.util.Map;\n\npublic class Main {\n  static Map<Integer, String> users = Map.of(1, "alice", 2, "bob");\n\n  // ID からユーザー名を検索する Optional メソッド\n  static Optional<String> findUser(int id) {\n    return Optional.ofNullable(users.get(id));\n  }\n\n  public static void main(String[] args) {\n    // ID 1: 見つかれば大文字に変換\n    // ID 99: 見つからなければ "unknown" を使用\n    \n  }\n}',
      solutionCode:
        'import java.util.Optional;\nimport java.util.Map;\n\npublic class Main {\n  static Map<Integer, String> users = Map.of(1, "alice", 2, "bob");\n\n  // ID からユーザー名を検索\n  static Optional<String> findUser(int id) {\n    return Optional.ofNullable(users.get(id));\n  }\n\n  public static void main(String[] args) {\n    // map で変換 + orElse でデフォルト値\n    String name1 = findUser(1)\n        .map(String::toUpperCase)\n        .orElse("unknown");\n    System.out.println(name1);\n\n    String name2 = findUser(99)\n        .map(String::toUpperCase)\n        .orElse("unknown");\n    System.out.println(name2);\n  }\n}',
      expectedOutput: 'ALICE\nunknown',
      hints: [
        'Optional.ofNullable(value) は null なら empty を返します',
        '.map(String::toUpperCase) で値を変換します',
        '.orElse("unknown") で値がない場合のデフォルトを指定します',
        '.orElseThrow() で値がなければ例外をスローすることもできます',
      ],
      explanation:
        'Optional は null の代わりに「値の不在」を明示的に表現するコンテナです。Optional.of(value) は null を渡すと NullPointerException を投げますが、ofNullable(value) は null を empty に変換します。map() は値が存在する場合のみ関数を適用し、結果を新しい Optional でラップします。orElse() は常にデフォルト値を評価しますが、orElseGet(Supplier) は必要な場合のみ遅延評価します。flatMap() は関数が Optional を返す場合に二重ネストを防ぎます。メソッドの戻り値として使うのは適切ですが、メソッド引数やフィールドの型として Optional を使うのはアンチパターンです。Stream API の findFirst(), findAny(), reduce() も Optional を返します。',
    },
    // ── Advanced (21-30) ──
    {
      id: 21,
      title: 'デザインパターン — Singleton',
      difficulty: 'advanced',
      description:
        'Singleton パターンはクラスのインスタンスをアプリケーション全体で1つだけに制限するパターンです。設定管理、ロガー、接続プール、キャッシュなどのグローバルリソースに使われます。実装方法には Eager 初期化、Lazy 初期化、ダブルチェックロック、enum、static holder（Bill Pugh Singleton）などがあり、それぞれスレッド安全性とパフォーマンスのトレードオフがあります。シリアライズやリフレクションによる破壊にも注意が必要です。',
      task: 'private コンストラクタと getInstance() を持つ Lazy 初期化の Singleton クラスを実装してください。',
      initialCode:
        'class Singleton {\n  // static フィールドでインスタンスを保持\n  private static Singleton instance;\n\n  // private コンストラクタ（外部から new を禁止）\n  \n\n  // getInstance — インスタンスがなければ生成して返す\n  \n\n  void show() { System.out.println("I am singleton"); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Singleton s1 = Singleton.getInstance();\n    Singleton s2 = Singleton.getInstance();\n    s1.show();\n    System.out.println(s1 == s2);\n  }\n}',
      solutionCode:
        'class Singleton {\n  // 唯一のインスタンスを保持する static フィールド\n  private static Singleton instance;\n\n  // private コンストラクタ — 外部からの new を禁止\n  private Singleton() {}\n\n  // getInstance — Lazy 初期化（初回呼び出し時に生成）\n  static Singleton getInstance() {\n    if (instance == null) {\n      instance = new Singleton();\n    }\n    return instance;\n  }\n\n  void show() { System.out.println("I am singleton"); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Singleton s1 = Singleton.getInstance();\n    Singleton s2 = Singleton.getInstance();\n    s1.show();\n    // s1 と s2 は同じインスタンスを参照\n    System.out.println(s1 == s2);\n  }\n}',
      expectedOutput: 'I am singleton\ntrue',
      hints: [
        'private Singleton() {} でコンストラクタを隠蔽します',
        'if (instance == null) で未生成の場合のみ新規作成します',
        's1 == s2 は参照比較で同一オブジェクトなら true です',
        'enum Singleton { INSTANCE } が最も安全な実装方法です',
      ],
      explanation:
        'この Lazy 初期化はシングルスレッド環境では問題ありませんが、マルチスレッド環境ではレースコンディションにより複数インスタンスが生成される可能性があります。ダブルチェックロック（synchronized + volatile）で解決できますが、コードが複雑になります。最も推奨されるのは enum Singleton { INSTANCE } で、スレッドセーフ・シリアライズ安全・リフレクション耐性が保証されます。static holder パターン（Initialization-on-demand holder idiom）は JVM のクラスローダ機構により Lazy かつスレッドセーフを実現します。Singleton の乱用はグローバル状態を増やしテスタビリティを低下させるため、DI フレームワーク（Spring のスコープ管理）に委ねるのが現代的なアプローチです。GoF の 23 パターンの中で最も議論のあるパターンです。',
    },
    {
      id: 22,
      title: 'デザインパターン — Strategy',
      difficulty: 'advanced',
      description:
        'Strategy パターンはアルゴリズムをクラスとしてカプセル化し、実行時に切り替え可能にする振る舞いパターンです。if-else や switch による条件分岐を排除し、開放/閉鎖原則を守った柔軟な設計を実現します。コンテキスト（利用者）がストラテジーインターフェースを通じてアルゴリズムを呼び出し、具体的なアルゴリズムクラスを差し替えることで振る舞いを変更します。Java 8 以降はラムダ式で簡潔に Strategy を記述できます。',
      task: 'SortStrategy インターフェースを使い、昇順・降順のソートを切り替えられるようにしてください。',
      initialCode:
        'import java.util.Arrays;\n\ninterface SortStrategy {\n  int[] sort(int[] data);\n}\n\n// AscSort — 昇順ソート\n\n// DescSort — 降順ソート\n\npublic class Main {\n  public static void main(String[] args) {\n    int[] data = {3, 1, 4, 1, 5};\n    SortStrategy asc = new AscSort();\n    System.out.println(Arrays.toString(asc.sort(data.clone())));\n  }\n}',
      solutionCode:
        'import java.util.Arrays;\n\n// ストラテジーインターフェース\ninterface SortStrategy {\n  int[] sort(int[] data);\n}\n\n// 昇順ソート戦略\nclass AscSort implements SortStrategy {\n  public int[] sort(int[] data) {\n    Arrays.sort(data);\n    return data;\n  }\n}\n\n// 降順ソート戦略\nclass DescSort implements SortStrategy {\n  public int[] sort(int[] data) {\n    Arrays.sort(data);\n    // 配列を逆順にコピー\n    int[] desc = new int[data.length];\n    for (int i = 0; i < data.length; i++) {\n      desc[i] = data[data.length - 1 - i];\n    }\n    return desc;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    int[] data = {3, 1, 4, 1, 5};\n    SortStrategy asc = new AscSort();\n    System.out.println(Arrays.toString(asc.sort(data.clone())));\n  }\n}',
      expectedOutput: '[1, 1, 3, 4, 5]',
      hints: [
        'Arrays.sort(data) で配列を昇順にソートします',
        'class AscSort implements SortStrategy でインターフェースを実装します',
        'data.clone() で元データを保持しながらソートできます',
        'Java 8+ ではラムダ式 SortStrategy asc = d -> { Arrays.sort(d); return d; }; も可',
      ],
      explanation:
        'Strategy パターンは GoF のデザインパターンの1つで、アルゴリズムの族を定義し互換性を持たせます。新しいソートアルゴリズム（安定ソート、ランダムソートなど）を追加する場合、既存コードを変更せずに新しいクラスを追加するだけです。Context クラスを設け SortStrategy フィールドを setter で切り替える設計も一般的です。Java 8 以降はラムダ式が Strategy パターンの簡潔な実装手段となり、Comparator.reverseOrder() なども内部的に Strategy パターンを使っています。Spring Framework の依存性注入と組み合わせることで、設定ファイルや条件に基づいてアルゴリズムを切り替えることもできます。テスト時にモック実装を注入しやすいのも大きな利点です。',
    },
    {
      id: 23,
      title: 'ラムダ式と関数型インターフェース',
      difficulty: 'advanced',
      description:
        'Java 8 でラムダ式が導入され、関数型プログラミングのスタイルが可能になりました。ラムダ式は匿名クラスの簡略構文であり、@FunctionalInterface（抽象メソッドが1つのインターフェース）のインスタンスとして使えます。java.util.function パッケージには Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>, BiFunction<T,U,R> などの標準関数型インターフェースが用意されています。compose() と andThen() で関数合成が可能で、メソッド参照（::）でさらに簡潔に記述できます。',
      task: 'Function<Integer, Integer> を使って数値を2倍にし、andThen で3を足す関数と合成して 5 に適用してください。',
      initialCode:
        'import java.util.function.Function;\n\npublic class Main {\n  public static void main(String[] args) {\n    // 2倍にする関数\n    Function<Integer, Integer> doubleIt = n -> n * 2;\n    // 3を足す関数\n    Function<Integer, Integer> addThree = n -> n + 3;\n    // andThen で合成: まず doubleIt → 次に addThree\n    \n    // 5 に適用して出力\n    \n  }\n}',
      solutionCode:
        'import java.util.function.Function;\n\npublic class Main {\n  public static void main(String[] args) {\n    // 2倍にする関数\n    Function<Integer, Integer> doubleIt = n -> n * 2;\n    // 3を足す関数\n    Function<Integer, Integer> addThree = n -> n + 3;\n    // andThen: doubleIt(5) → addThree(10) = 13\n    Function<Integer, Integer> combined = doubleIt.andThen(addThree);\n    System.out.println(combined.apply(5));\n  }\n}',
      expectedOutput: '13',
      hints: [
        '.andThen(addThree) は「まず自身を適用、次に addThree」の順序です',
        '.compose(addThree) は逆順 — 「まず addThree、次に自身」です',
        '.apply(5) で関数を値に適用します',
        'Function<Integer, Integer> は UnaryOperator<Integer> とも書けます',
      ],
      explanation:
        'andThen は左→右の合成で doubleIt(5) = 10、addThree(10) = 13 となります。compose は右→左で addThree(5) = 8、doubleIt(8) = 16 となり結果が異なります。主要な関数型インターフェースは Function<T,R>（変換）、Predicate<T>（判定：T → boolean）、Consumer<T>（消費：T → void）、Supplier<T>（生成：() → T）の4つです。BiFunction<T,U,R> は2引数の関数です。メソッド参照 String::toUpperCase はラムダ式 s -> s.toUpperCase() の省略形です。ラムダ式は「実質的 final」な変数のみキャプチャでき、クロージャとしてのスコープルールがあります。Stream API やコレクションの sort, forEach などあらゆる場面でラムダ式が活用されています。',
    },
    {
      id: 24,
      title: 'スレッドと並行処理',
      difficulty: 'advanced',
      description:
        'Java はマルチスレッドをネイティブにサポートしており、Thread クラスと Runnable インターフェースで並行処理を実装します。start() でスレッドを起動し、join() で完了を待ちます。共有データへの同時アクセスはレースコンディションを引き起こすため、synchronized, volatile, Lock, Atomic クラスで排他制御します。java.util.concurrent パッケージの ExecutorService, Future, CountDownLatch, Semaphore などが高レベルの並行処理ユーティリティを提供します。Java 21 では Virtual Thread（仮想スレッド）も導入されました。',
      task: 'Runnable をラムダ式で作り、別スレッドで "Hello from thread" と出力してください。join でスレッドの完了を待ちます。',
      initialCode:
        'public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    // ラムダ式で Runnable を作成\n    // Thread を生成して start\n    // join で完了を待つ\n    \n    System.out.println("Main thread");\n  }\n}',
      solutionCode:
        'public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    // ラムダ式で Runnable を作成しスレッドを生成\n    Thread t = new Thread(() -> {\n      System.out.println("Hello from thread");\n    });\n    t.start();  // スレッドを起動（run ではなく start）\n    t.join();   // t の完了を待機\n    System.out.println("Main thread");\n  }\n}',
      expectedOutput: 'Hello from thread\nMain thread',
      hints: [
        'new Thread(() -> { ... }) でラムダ式から Thread を生成します',
        '.start() を呼ぶとスレッドが並行に実行を開始します（.run() は同じスレッドで直接実行）',
        '.join() は対象スレッドの終了まで現在のスレッドをブロックします',
        'throws InterruptedException を main メソッドに追加する必要があります',
      ],
      explanation:
        'start() と run() の違いは重要です。start() は新しいスレッドを作成して run() を呼びますが、run() を直接呼ぶと同じスレッドで実行されるため並行処理になりません。join() は InterruptedException を投げる可能性があるため、throws 宣言またはtry-catch が必要です。スレッドの生成コストは高いため、実際のアプリケーションでは ExecutorService のスレッドプール（Executors.newFixedThreadPool(n)）を使います。Java 21 の Virtual Thread は Thread.ofVirtual().start(() -> ...) で軽量スレッドを作成でき、I/O バウンドな処理で大量のスレッドを効率的に管理できます。デッドロックやスタベーションなどの並行処理特有の問題に注意が必要です。',
    },
    {
      id: 25,
      title: 'Record クラス（Java 16+）',
      difficulty: 'advanced',
      description:
        'Record は不変データクラスを簡潔に定義できる Java 16 の機能です。record 宣言でフィールドを指定するだけで、コンストラクタ、アクセサ（getter）、equals(), hashCode(), toString() が自動生成されます。従来のPOJO で必要だった大量のボイラープレートコードを劇的に削減します。コンパクトコンストラクタでバリデーションを追加したり、static メソッドや追加のインスタンスメソッドを定義することも可能です。Record のフィールドは暗黙的に private final であり、不変性が保証されます。',
      task: 'record Point(int x, int y) を定義し、Point(3, 4) を作って出力してください。',
      initialCode:
        '// Record を定義（Java 16+）\n// record Point(int x, int y) {}\n// 通常のクラスでは getter, equals, hashCode, toString が必要\n\npublic class Main {\n  public static void main(String[] args) {\n    // Point を生成して出力\n    // x(), y() でアクセス（getX() ではない）\n    \n  }\n}',
      solutionCode:
        '// Record — 不変データクラスの簡潔な定義\nrecord Point(int x, int y) {}\n\npublic class Main {\n  public static void main(String[] args) {\n    Point p = new Point(3, 4);\n    // 自動生成された toString()\n    System.out.println(p);\n    // アクセサは x(), y()（getter スタイルではない）\n    System.out.println(p.x());\n    System.out.println(p.y());\n  }\n}',
      expectedOutput: 'Point[x=3, y=4]\n3\n4',
      hints: [
        'record Point(int x, int y) {} の1行だけで定義完了です',
        'アクセサは p.x() と p.y() — getX() ではありません',
        'toString() は自動的に "Point[x=3, y=4]" 形式を返します',
        'Record のフィールドは final なので不変（immutable）です',
      ],
      explanation:
        'Record は DTO（Data Transfer Object）、Value Object、API レスポンスのモデリングに最適です。従来のJavaでは equals/hashCode/toString/getter/コンストラクタを手動で（またはLombokで）書く必要がありましたが、Record はこれを言語レベルで解決します。コンパクトコンストラクタ record Point(int x, int y) { Point { if (x < 0) throw new IllegalArgumentException(); } } でバリデーションを追加できます。Record は暗黙的に final クラスであり継承できませんが、インターフェースの実装は可能です。Record はシリアライズにも対応しており、JSON ライブラリとの相性も良好です。パターンマッチング（Java 21）と組み合わせることで、代数的データ型に近い表現力を持ちます。',
    },
    {
      id: 26,
      title: 'sealed クラス（Java 17+）',
      difficulty: 'advanced',
      description:
        'sealed クラスは Java 17 で導入された機能で、継承できるサブクラスを permits で限定します。これにより型の階層を閉じた集合として定義でき、コンパイラが全ケースの網羅性を検証できるようになります。サブクラスは final（さらなる継承不可）, sealed（さらに限定的に許可）, non-sealed（制限なし）のいずれかで宣言する必要があります。sealed クラスは Java 21 の switch パターンマッチングと組み合わせることで真価を発揮し、代数的データ型のような安全な型設計を実現します。',
      task: 'sealed Shape を Circle と Square だけが継承できるように定義し、面積を計算してください。',
      initialCode:
        '// sealed クラスで型階層を閉じる\n// Circle と Square のみが Shape を継承可能\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape c = new Circle(5);\n    Shape s = new Square(4);\n    System.out.println(c.area());\n    System.out.println(s.area());\n  }\n}',
      solutionCode:
        '// sealed で許可するサブクラスを限定\nsealed abstract class Shape permits Circle, Square {\n  abstract double area();\n}\n\n// final — これ以上の継承を禁止\nfinal class Circle extends Shape {\n  double r;\n  Circle(double r) { this.r = r; }\n  @Override\n  double area() { return Math.PI * r * r; }\n}\n\nfinal class Square extends Shape {\n  double side;\n  Square(double side) { this.side = side; }\n  @Override\n  double area() { return side * side; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape c = new Circle(5);\n    Shape s = new Square(4);\n    System.out.println(c.area());\n    System.out.println(s.area());\n  }\n}',
      expectedOutput: '78.53981633974483\n16.0',
      hints: [
        'sealed abstract class Shape permits Circle, Square で許可クラスを限定します',
        'サブクラスには final, sealed, または non-sealed を付けます',
        'final class Circle extends Shape で継承チェーンを終了します',
        'Java 21 の switch 式でパターンマッチングと組み合わせると網羅性が保証されます',
      ],
      explanation:
        'sealed クラスは型の階層を閉じることで、コンパイラが「すべてのケースを処理しているか」を検証できるようにします。Java 21 の switch パターンマッチングでは switch (shape) { case Circle c -> ...; case Square s -> ...; } と書くことで、default なしでも全ケースが網羅されていることをコンパイラが保証します（新しい Shape のサブクラスが追加されるとコンパイルエラー）。これは Kotlin の sealed class や Rust の enum に相当する機能です。sealed + record の組み合わせは代数的データ型（ADT）を Java で実現する強力なパターンです。permits に指定するクラスは同一パッケージ（モジュール使用時は同一モジュール）に存在する必要があります。',
    },
    {
      id: 27,
      title: 'CompletableFuture',
      difficulty: 'advanced',
      description:
        'CompletableFuture は Java 8 で導入された非同期プログラミングのための強力な API です。supplyAsync でバックグラウンドタスクを開始し、thenApply, thenCompose, thenCombine でパイプラインを構築します。JavaScript の Promise に相当し、非同期操作のチェーン化・合成・エラーハンドリングを宣言的に記述できます。exceptionally や handle で例外を処理し、allOf や anyOf で複数の Future を合成します。デフォルトでは ForkJoinPool.commonPool() で実行されますが、カスタム Executor を指定することも可能です。',
      task: 'CompletableFuture.supplyAsync で "Hello" を返し、thenApply で "Hello World" に変換して出力してください。',
      initialCode:
        'import java.util.concurrent.CompletableFuture;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    // supplyAsync で非同期に "Hello" を生成\n    // thenApply で " World" を結合\n    // get() で結果を取得して出力\n    \n  }\n}',
      solutionCode:
        'import java.util.concurrent.CompletableFuture;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    // 非同期パイプライン: 生成 → 変換 → 取得\n    String result = CompletableFuture\n        .supplyAsync(() -> "Hello")           // 非同期で値を生成\n        .thenApply(s -> s + " World")         // 同期的に変換\n        .get();                                // 結果をブロッキング取得\n    System.out.println(result);\n  }\n}',
      expectedOutput: 'Hello World',
      hints: [
        'supplyAsync(() -> "Hello") で非同期タスクを開始します',
        '.thenApply(s -> s + " World") で結果を同期的に変換します',
        '.get() は結果が得られるまでブロッキングします',
        '.thenCompose() は非同期チェーン（flatMap 相当）に使います',
      ],
      explanation:
        'CompletableFuture は JavaScript の Promise に相当する非同期プリミティブです。supplyAsync は Supplier<T> を受け取り、別スレッドで実行して結果を CompletableFuture<T> でラップします。thenApply は同期的な変換（Promise.then に相当）、thenCompose は非同期チェーン（flatMap）、thenCombine は2つの Future の結果を合成します。exceptionally(ex -> defaultValue) で例外ハンドリング、handle((result, ex) -> ...) で成功・失敗の両方を処理できます。CompletableFuture.allOf(cf1, cf2, ...) は全ての完了を待ち、anyOf は最初に完了したものの結果を返します。get() はチェック例外を投げるため、join() の方が非チェック例外で扱いやすいです。本番コードでは get() のタイムアウト版 get(5, TimeUnit.SECONDS) を使うのが安全です。',
    },
    {
      id: 28,
      title: 'SOLID原則 — 単一責任',
      difficulty: 'advanced',
      description:
        'SOLID は5つの設計原則の頭文字で、保守性・拡張性の高いオブジェクト指向設計を導きます。S は Single Responsibility Principle（単一責任原則）の略で、「クラスは変更の理由を1つだけ持つべき」と定義されます。1つのクラスに複数の責任（データの作成・表示・保存など）を持たせると、一方の変更が他方に影響し、テストも困難になります。責任を分離することで、各クラスが独立して変更・テスト・再利用可能になります。Robert C. Martin（Uncle Bob）が提唱したこの原則は、Clean Architecture の基盤の1つです。',
      task: 'UserService（ビジネスロジック）と UserPrinter（表示）を分離して実装してください。',
      initialCode:
        '// 悪い例: 1つのクラスに複数の責任\n// class UserManager {\n//   String create(String name) { ... }   // ビジネスロジック\n//   void print(String user) { ... }      // 表示\n//   void save(String user) { ... }       // 永続化\n// }\n\n// 良い例: 責任を分離\n// UserService — ビジネスロジックのみ\n// UserPrinter — 表示のみ\n\npublic class Main {\n  public static void main(String[] args) {\n    UserService service = new UserService();\n    UserPrinter printer = new UserPrinter();\n    String user = service.create("miruky");\n    printer.print(user);\n  }\n}',
      solutionCode:
        '// UserService — ビジネスロジックのみを担当\nclass UserService {\n  String create(String name) {\n    return "User: " + name;\n  }\n}\n\n// UserPrinter — 表示ロジックのみを担当\nclass UserPrinter {\n  void print(String user) {\n    System.out.println(user);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    UserService service = new UserService();\n    UserPrinter printer = new UserPrinter();\n    String user = service.create("miruky");\n    printer.print(user);\n  }\n}',
      expectedOutput: 'User: miruky',
      hints: [
        'UserService はデータの作成・ビジネスロジックのみを担当します',
        'UserPrinter は表示・フォーマットのみを担当します',
        '各クラスの変更理由は1つだけになります',
        '将来 JSON や HTML で出力する場合、UserPrinter だけを変更（または新クラス追加）すれば済みます',
      ],
      explanation:
        '単一責任原則はクラスの凝集度を高め、結合度を下げます。UserService はビジネスルールの変更時のみ修正が必要で、UserPrinter は出力フォーマットの変更時のみ修正が必要です。もし UserService に print 機能もある場合、表示形式を変えるためにビジネスロジックを含むクラスを修正するリスクが生じます。Spring Framework ではこの原則に従い、@Service, @Repository, @Controller でレイヤーを分離します。テスト時にも、UserService は UserPrinter をモック、UserPrinter は UserService に依存せずテスト可能です。SOLID の残り4原則は Open/Closed（拡張に開き修正に閉じる）、Liskov Substitution（置換可能）、Interface Segregation（インターフェース分離）、Dependency Inversion（依存性逆転）です。実際のプロジェクトでは完璧な分離が常に最善とは限らず、コンテキストに応じたバランスが重要です。',
    },
    {
      id: 29,
      title: 'Builder パターン',
      difficulty: 'advanced',
      description:
        'Builder パターンはオブジェクトの生成過程を分離し、複雑なオブジェクトをステップバイステップで構築する生成パターンです。コンストラクタの引数が多い場合（テレスコーピングコンストラクタ問題）や、オプションパラメータが多数ある場合に特に有効です。各メソッドが this を返すことでメソッドチェーンを実現し、最後に build() で完成したオブジェクトを返します。Effective Java（Joshua Bloch）で推奨されている重要なパターンであり、Lombok の @Builder で自動生成も可能です。',
      task: 'UserBuilder を使って name と age を設定した User を構築してください。',
      initialCode:
        'class User {\n  String name;\n  int age;\n  User(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n  public String toString() { return name + "(" + age + ")"; }\n}\n\n// UserBuilder を実装\n// name(String n) → this を返す\n// age(int a) → this を返す\n// build() → User を返す\n\npublic class Main {\n  public static void main(String[] args) {\n    User user = new UserBuilder().name("miruky").age(25).build();\n    System.out.println(user);\n  }\n}',
      solutionCode:
        'class User {\n  String name;\n  int age;\n  User(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n  public String toString() { return name + "(" + age + ")"; }\n}\n\n// Builder — メソッドチェーンで段階的に構築\nclass UserBuilder {\n  private String name = "";\n  private int age = 0;\n\n  // 各メソッドは this を返してチェーン可能にする\n  UserBuilder name(String n) { this.name = n; return this; }\n  UserBuilder age(int a) { this.age = a; return this; }\n\n  // build で完成した User を生成\n  User build() { return new User(name, age); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    User user = new UserBuilder().name("miruky").age(25).build();\n    System.out.println(user);\n  }\n}',
      expectedOutput: 'miruky(25)',
      hints: [
        '各 setter メソッドが return this; でメソッドチェーンを実現します',
        'build() で最終的なオブジェクトを new User(name, age) で生成します',
        'デフォルト値を設定しておくとオプションパラメータに対応できます',
        'Lombok の @Builder アノテーションで自動生成も可能です',
      ],
      explanation:
        'Builder パターンはテレスコーピングコンストラクタ問題（new User(name, age, email, phone, address, ...)）を解決し、可読性を大幅に向上させます。各メソッドが this を返すことで new UserBuilder().name("miruky").age(25).email("test@test.com").build() のようなフルーエントインターフェースを実現します。build() メソッド内でバリデーションを行い、不正な状態のオブジェクト生成を防ぐこともできます。User クラスのフィールドを final にし、Builder 経由でのみ構築可能にすれば不変オブジェクトが実現できます。Lombok の @Builder アノテーションを使えばボイラープレートを完全に自動生成できます。java.lang.StringBuilder, HttpRequest.newBuilder() など標準ライブラリでも広く使われているパターンです。Inner Builder パターン（User.builder().name(...).build()）も一般的な変形です。',
    },
    {
      id: 30,
      title: 'リフレクションとアノテーション',
      difficulty: 'advanced',
      description:
        'リフレクションは実行時にクラスの構造（フィールド、メソッド、コンストラクタ、アノテーション）を調べたり動的に操作する機能です。Spring, JPA, JUnit, Jackson など主要フレームワークの根幹技術であり、DI（依存性注入）、ORM、テスト実行、シリアライズの多くがリフレクションに依存しています。Class.forName(), getDeclaredMethods(), getDeclaredFields(), setAccessible(true) などのAPIで実行時にクラスの内部構造にアクセスできます。パフォーマンスコストがあるため、通常のアプリケーションコードで多用すべきではありません。',
      task: 'クラス名からメソッド一覧を取得し、メソッド名と数を出力してください。',
      initialCode:
        'import java.lang.reflect.Method;\n\nclass Sample {\n  void hello() {}\n  void world() {}\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Sample クラスのメソッド一覧を取得して出力\n    // getDeclaredMethods() で自クラス定義のメソッドを取得\n    // メソッド名と数を出力\n    \n  }\n}',
      solutionCode:
        'import java.lang.reflect.Method;\n\nclass Sample {\n  void hello() {}\n  void world() {}\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Sample.class でクラスオブジェクトを取得\n    Method[] methods = Sample.class.getDeclaredMethods();\n    // 各メソッド名を出力\n    for (Method m : methods) {\n      System.out.println(m.getName());\n    }\n    // メソッド数を出力\n    System.out.println(methods.length);\n  }\n}',
      expectedOutput: 'hello\nworld\n2',
      hints: [
        'Sample.class でクラスのリフレクション情報を取得します',
        '.getDeclaredMethods() は自クラスで宣言されたメソッドを返します（継承分は含まない）',
        '.getName() でメソッド名を文字列として取得します',
        '.getMethods() は public メソッド（継承含む）を返す別のメソッドです',
      ],
      explanation:
        'リフレクションは Java の強力な機能であり、フレームワーク開発には不可欠です。getDeclaredMethods() と getMethods() の違いは重要で、前者は自クラスの全アクセスレベルのメソッド、後者は自クラスと継承した public メソッドを返します。Spring の @Autowired は内部的にリフレクションでフィールドやコンストラクタのアノテーションを走査し、依存関係を注入します。JUnit の @Test も同様にリフレクションでテストメソッドを発見・実行します。setAccessible(true) で private メンバーにもアクセスできますが、セキュリティマネージャーやモジュールシステム（Java 9+）で制限される場合があります。パフォーマンスは通常のメソッド呼び出しの数倍〜数十倍遅くなるため、結果のキャッシュやMethodHandleの使用が推奨されます。Java 9のモジュールシステムではリフレクションのアクセスに opens 宣言が必要になりました。',
    },
  ],
};

export default course;
