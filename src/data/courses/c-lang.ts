import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'c-lang',
  name: 'C',
  nameJa: 'C言語',
  simpleIconSlug: 'c',
  color: '#A8B9CC',
  description: 'システムプログラミングの基盤。メモリ管理やポインタを深く理解できます。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'はじめてのCプログラム',
      difficulty: 'beginner',
      description:
        'C言語は1972年にDennis RitchieがBell研究所で開発したシステムプログラミング言語です。OS（Linux, Windows, macOS のカーネル）、組み込みシステム、コンパイラ、データベースエンジンなど低レベル開発に広く使われています。すべてのCプログラムは main() 関数から実行が開始され、#include でヘッダファイルを取り込み、printf() で標準出力に文字列を表示します。C言語を学ぶことでコンピュータの動作原理（メモリ、CPU、I/O）を深く理解できます。',
      task: 'printf 関数を使って "Hello, C!" と改行付きで表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    // printf で "Hello, C!" と出力\n    // \\n は改行を表します\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C!\\n");\n    return 0;\n}',
      expectedOutput: 'Hello, C!',
      hints: [
        'printf("テキスト\\n"); で出力します',
        '#include <stdio.h> は標準入出力の関数宣言を取り込みます',
        '\\n はエスケープシーケンスで改行を表します',
        'return 0; はプログラムが正常終了したことをOSに伝えます',
      ],
      explanation:
        '#include はプリプロセッサ指令で、コンパイル前にヘッダファイルの中身を展開します。stdio.h には printf, scanf, FILE 等の宣言が含まれます。main() はプログラムのエントリポイントで、戻り値 0 は正常終了、非ゼロはエラーを意味します。\\n 以外にも \\t(タブ), \\\\(バックスラッシュ), \\0(NULL文字) などのエスケープシーケンスがあります。C言語は「高水準アセンブリ」とも呼ばれ、ハードウェアに近い制御が可能な一方、安全性は開発者の責任です。',
    },
    {
      id: 2,
      title: '変数とデータ型',
      difficulty: 'beginner',
      description:
        'C言語の基本データ型: int（整数, 通常4バイト）, float/double（浮動小数点, 4/8バイト）, char（文字, 1バイト）。変数は使用前に必ず型宣言が必要で、宣言時に初期化しないとゴミ値が入ります。sizeof 演算子で型のバイト数を確認できます。unsigned 修飾子を付けると負の値を取れない代わりに正の範囲が2倍になります。型のサイズはプラットフォーム依存なため、正確なサイズが必要な場合は stdint.h の int32_t 等を使います。',
      task: 'int 型の変数 age に 25 を代入し、printf の書式指定子 %d で表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    // int 型の変数 age を宣言し 25 で初期化\n    // printf で "Age: 25" と表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int age = 25;\n    printf("Age: %d\\n", age);\n    return 0;\n}',
      expectedOutput: 'Age: 25',
      hints: [
        'int age = 25; で宣言と初期化を同時に行います',
        '%d は int 型の書式指定子です',
        'printf("Age: %d\\n", age); で変数の値を埋め込みます',
        'sizeof(int) でバイト数を確認できます（通常 4）',
      ],
      explanation:
        '書式指定子一覧: %d(int), %f(float/double), %c(char), %s(文字列), %p(ポインタアドレス), %ld(long), %lld(long long), %u(unsigned int), %x(16進数), %o(8進数)。%.2f のように幅と精度も指定可能です。C99以降は変数宣言をブロック内のどこでも行えますが、C89では関数の先頭に限られていました。初期化せずに使うと未定義動作(Undefined Behavior)になるため、常に初期化する習慣を付けましょう。',
    },
    {
      id: 3,
      title: '算術演算子と型変換',
      difficulty: 'beginner',
      description:
        '四則演算 +, -, *, / と剰余 %。C言語では整数同士の除算は小数部が切り捨てられ、10/3 = 3 になります。精度が必要な場合は一方を浮動小数点にキャストします。暗黙の型変換（型昇格）により int + double の場合、int が自動的に double に変換されます。明示的キャスト: (double)a で int を double に変換。整数オーバーフロー（INT_MAX + 1）は未定義動作で、セキュリティ脆弱性の原因にもなります。',
      task: '10 / 3 の整数除算結果と、(double)キャストによる浮動小数点除算結果を両方表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    int a = 10, b = 3;\n    // 整数除算の結果を表示\n    // キャストして浮動小数点除算の結果を表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int a = 10, b = 3;\n    printf("Integer: %d\\n", a / b);\n    printf("Float: %.2f\\n", (double)a / b);\n    return 0;\n}',
      expectedOutput: 'Integer: 3\nFloat: 3.33',
      hints: [
        '(double)a でキャスト（型変換）します',
        '%.2f は小数点以下2桁で表示する書式',
        '整数同士の除算は小数部が切り捨てられます',
        '一方が double なら結果も double になります（型昇格）',
      ],
      explanation:
        '暗黙の型変換ルール: char/short → int → unsigned int → long → unsigned long → float → double。小さい型から大きい型へ自動変換されます。ただし float → int のような縮小変換は値が失われる可能性があり、コンパイラがwarningを出します。C言語の整数オーバーフローは符号付きの場合は未定義動作、符号なしの場合はラップアラウンド（モジュロ演算）が規格で定義されています。安全な計算には事前チェックが必要です。',
    },
    {
      id: 4,
      title: '条件分岐 (if / else)',
      difficulty: 'beginner',
      description:
        'if-else 文で条件に応じた処理を分岐します。比較演算子: <, >, ==, !=, <=, >=。論理演算子: &&(AND), ||(OR), !(NOT)。C言語では条件式で0が偽、0以外のすべての値が真と評価されます。よくある間違いとして = （代入）と == （比較）の混同があり、if (x = 5) はコンパイルは通りますがバグ化します。switch-case は定数値の多分岐に適しており、break を忘れるとフォールスルーします。',
      task: '変数 score が 60 以上なら "Pass"、未満なら "Fail" と表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    int score = 75;\n    // if-else で合否判定\n    // 60以上: "Pass", 未満: "Fail"\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int score = 75;\n    if (score >= 60) {\n        printf("Pass\\n");\n    } else {\n        printf("Fail\\n");\n    }\n    return 0;\n}',
      expectedOutput: 'Pass',
      hints: [
        'if (score >= 60) { ... } で条件分岐',
        '== は比較、= は代入（混同注意！）',
        '三項演算子: (score >= 60) ? "Pass" : "Fail" でも書けます',
        '&& は両方真の場合に真、|| はどちらか一方が真なら真',
      ],
      explanation:
        '条件分岐のパターン: if / else if / else で多段分岐、switch-case で定数値分岐（break 必須）。三項演算子: result = (a > b) ? a : b; で簡潔に書けます。C言語の真偽は 0=偽、非0=真です。NULL ポインタ、0.0 も偽と評価されます。「= と == の混同」はC言語最大級のバグ源で、コンパイラの -Wall オプションで警告を有効にすると検出できます。',
    },
    {
      id: 5,
      title: 'ループ (for / while)',
      difficulty: 'beginner',
      description:
        'for は回数が決まった繰り返し、while は条件ベースの繰り返し、do-while は最低1回実行してから条件判定するループです。break でループを即座に抜け、continue で次のイテレーションに進みます。for (int i = 0; i < n; i++) は最も頻出するパターンです。C99以降は for 文の初期化子でローカル変数を宣言できます。無限ループは for(;;) または while(1) で記述し、break で脱出します。',
      task: 'for ループで 1 から 5 まで各行に表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    // for (int i = 1; i <= 5; i++) で繰り返し\n    // printf でiを表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}',
      expectedOutput: '1\n2\n3\n4\n5',
      hints: [
        'for (初期化; 条件; 更新) { 本体 } の構文',
        'i++ は i = i + 1 と同じ（インクリメント）',
        'i <= 5 で1〜5を含む範囲をカバー',
        'do { ... } while (条件); は最低1回実行される',
      ],
      explanation:
        'for ループは3つの式(初期化; 条件; 更新)で構成され、条件が偽になるまで繰り返します。do-while は while と異なり、最低1回実行後に条件判定します（メニュー表示→入力の繰り返し等に便利）。ネストしたループからの脱出には goto を使う場合もありますが、濫用は可読性を損ないます。ループカウンタの型に size_t を使うと符号なしで安全ですが、逆方向ループでは注意が必要です。',
    },
    {
      id: 6,
      title: '配列',
      difficulty: 'beginner',
      description:
        '配列は同じ型のデータを連続したメモリ領域に格納するデータ構造です。インデックスは0から始まります。C言語の配列は長さ情報を保持せず、境界チェックも行いません。そのため配列外アクセス（バッファオーバーフロー）はセキュリティ脆弱性の主な原因です。sizeof(arr)/sizeof(arr[0]) で要素数を計算できますが、ポインタに変換された後は使えません。C99以降は可変長配列(VLA)も使えますが、スタック消費の予測が難しいため注意が必要です。',
      task: 'int 型配列に {10, 20, 30, 40, 50} を格納し、ループで全要素を表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    // int 型配列を初期化\n    // sizeof で要素数を計算\n    // for ループで全要素を表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int nums[] = {10, 20, 30, 40, 50};\n    int len = sizeof(nums) / sizeof(nums[0]);\n    for (int i = 0; i < len; i++) {\n        printf("%d\\n", nums[i]);\n    }\n    return 0;\n}',
      expectedOutput: '10\n20\n30\n40\n50',
      hints: [
        'int nums[] = {10, 20, 30, 40, 50}; で初期化',
        'sizeof(nums)/sizeof(nums[0]) で要素数を計算',
        'nums[i] で i 番目の要素にアクセス（0始まり）',
        '配列の範囲外アクセスは未定義動作（バグの原因）',
      ],
      explanation:
        'C言語の配列はメモリの連続領域です。int arr[5] は sizeof(int)*5 = 20バイトを確保します。配列名 arr は式中では先頭要素のアドレス &arr[0] に暗黙変換されます（配列からポインタへの崩壊）。ただし sizeof(arr) と &arr は配列全体を指します。多次元配列の int matrix[3][4] はメモリ上では行優先(row-major)で配置されます。配列外アクセスの検出には AddressSanitizer (-fsanitize=address) が有効です。',
    },
    {
      id: 7,
      title: '文字列 (char 配列)',
      difficulty: 'beginner',
      description:
        'C言語に組み込みの文字列型はなく、char の配列 + 末尾のNULL文字(\\0)で文字列を表現します。"Hello" は 6バイト必要です。string.h に文字列操作関数（strlen, strcpy, strcat, strcmp 等）がありますが、多くはバッファサイズのチェックを行わないため、strncpy, strncat 等のサイズ指定版を使うのが安全です。文字列リテラルは読み取り専用メモリに配置されることがあり、変更すると未定義動作になります。',
      task: 'char配列で "Hello" を定義し、strlen で長さを取得して1文字ずつ表示してください。',
      initialCode: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    // char配列で文字列を定義\n    // strlen で長さを取得\n    // ループで1文字ずつ表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char greeting[] = "Hello";\n    int len = strlen(greeting);\n    for (int i = 0; i < len; i++) {\n        printf("%c\\n", greeting[i]);\n    }\n    return 0;\n}',
      expectedOutput: 'H\ne\nl\nl\no',
      hints: [
        'char greeting[] = "Hello"; は \\0 を含む6文字分確保',
        'strlen() は \\0 を含まない文字数を返します',
        '%c は1文字の書式指定子です',
        'char *p = "Hello"; はリテラル（書き換え不可）を指すポインタ',
      ],
      explanation:
        '文字列関数一覧: strlen(長さ), strcpy/strncpy(コピー), strcat/strncat(連結), strcmp/strncmp(比較), strchr(文字検索), strstr(部分文字列検索), strtok(トークン分割), sprintf(文字列フォーマット)。char greeting[] は配列なので変更可能ですが、char *p = "Hello"; はリテラルへのポインタで変更不可です。snprintf はバッファオーバーフローを防ぐ推奨関数です。',
    },
    {
      id: 8,
      title: '関数',
      difficulty: 'beginner',
      description:
        '関数は処理をまとめて再利用する基本構造です。戻り値の型、関数名、引数リストで構成されます。C言語の引数渡しは「値渡し」(pass by value)のみで、関数内で引数を変更しても呼び出し元には影響しません。ポインタを渡すことで「参照渡し」のような動作を実現します。プロトタイプ宣言（関数の前方宣言）を使うと、定義の順序に関係なく関数を呼び出せます。ヘッダファイルにプロトタイプを書くのが一般的です。',
      task: '2つの int を受け取り、大きい方を返す max 関数を定義して使ってください。',
      initialCode: '#include <stdio.h>\n\n// max 関数を定義（2つのintから大きい方を返す）\n\nint main(void) {\n    printf("Max: %d\\n", max(10, 25));\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint max(int a, int b) {\n    return (a > b) ? a : b;\n}\n\nint main(void) {\n    printf("Max: %d\\n", max(10, 25));\n    return 0;\n}',
      expectedOutput: 'Max: 25',
      hints: [
        'int max(int a, int b) { return ...; } の形で定義',
        '三項演算子 (a > b) ? a : b で簡潔に書ける',
        'main() より前に定義するか、プロトタイプ宣言が必要',
        'C では引数は値渡し（コピーが渡される）',
      ],
      explanation:
        'C言語の関数は値渡しのみです。関数内で引数を変更しても呼び出し元に反映されません。複数の値を返したい場合はポインタ引数を使います: void swap(int *a, int *b)。static 関数はファイルスコープに限定され、他のファイルからアクセスできません（情報隠蔽）。inline 関数は関数呼び出しのオーバーヘッドを削減するヒントをコンパイラに与えます。再帰関数も定義可能ですが、深い再帰はスタックオーバーフローの原因になります。',
    },
    {
      id: 9,
      title: 'ポインタ入門',
      difficulty: 'beginner',
      description:
        'ポインタはC言語の最も重要な概念で、メモリアドレスを格納する変数です。& (アドレス演算子)で変数のアドレスを取得し、* (間接参照演算子)でアドレス先の値にアクセスします。ポインタにより動的メモリ管理、関数からの複数値返却、配列の効率的な操作、データ構造の構築が可能になります。NULLポインタの間接参照はセグメンテーション違反(SEGV)の最も一般的な原因です。ポインタを理解することはC言語マスターへの鍵です。',
      task: 'int 型変数のポインタを作り、ポインタ経由で値を 42 に変更してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    // int *p = &x; でポインタを作成\n    // *p = 42; でポインタ経由で値を変更\n    // printf で x の値を表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    int *p = &x;\n    *p = 42;\n    printf("x = %d\\n", x);\n    return 0;\n}',
      expectedOutput: 'x = 42',
      hints: [
        '&x で変数 x のメモリアドレスを取得',
        'int *p = &x; でポインタ変数 p を宣言しアドレスを格納',
        '*p = 42; でポインタが指す先の値を変更（間接参照）',
        'p == NULL のチェックを間接参照の前に行うのが安全',
      ],
      explanation:
        'ポインタの記法: int *p は「int へのポインタ」型。&x は「x のアドレス」、*p は「p が指す先の値」。これにより swap(int *a, int *b) のように関数から呼び出し元の変数を変更できます。ポインタのサイズは型に関係なく一定（64bitOSなら8バイト）。const int *p（指す先がconst）と int * const p（ポインタ自体がconst）の違いも重要です。NULLポインタのデリファレンスは未定義動作で、通常はSEGVクラッシュします。',
    },
    {
      id: 10,
      title: '構造体 (struct)',
      difficulty: 'beginner',
      description:
        '構造体(struct)は異なる型のデータをまとめる複合データ型で、オブジェクト指向言語のクラスの前身です。typedef で型の別名を付けると宣言が簡潔になります。メンバへのアクセスはドット演算子(.)、ポインタ経由ではアロー演算子(->)を使います。構造体はメモリアラインメント（パディング）により、メンバの合計サイズより大きくなることがあります。関数に構造体を渡す場合、大きな構造体はポインタ渡しが効率的です。',
      task: 'name と age メンバを持つ Person 構造体を typedef で定義し、値を表示してください。',
      initialCode: '#include <stdio.h>\n\n// typedef struct で Person を定義\n// name(char配列50), age(int)\n\nint main(void) {\n    // Person 変数を作成して初期化\n    // printf で表示\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n} Person;\n\nint main(void) {\n    Person p = {"Alice", 30};\n    printf("Name: %s, Age: %d\\n", p.name, p.age);\n    return 0;\n}',
      expectedOutput: 'Name: Alice, Age: 30',
      hints: [
        'typedef struct { ... } Person; で型を定義',
        'Person p = {"Alice", 30}; で初期化',
        'p.name でメンバアクセス（ドット演算子）',
        'ポインタ経由では ptr->name（アロー演算子）',
      ],
      explanation:
        '構造体ポインタ: Person *ptr = &p; の場合、ptr->age は (*ptr).age の糖衣構文です。構造体のメモリアラインメントにより、CPUが効率的にアクセスできるようコンパイラがメンバ間にパディングを挿入します。#pragma pack() でパッキングを制御できます。C11の匿名構造体/共用体を使うとネストされたメンバに直接アクセスできます。構造体の代入はメンバごとのコピー（浅いコピー）です。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: 'ポインタと配列の関係',
      difficulty: 'intermediate',
      description:
        'C言語では配列名は式中で先頭要素へのポインタに暗黙変換されます（ポインタへの崩壊）。そのため arr[i] と *(arr + i) は同じ意味です。ポインタ演算では型のサイズ分アドレスが進み、int *p の場合 p+1 は4バイト先を指します。ただし sizeof(arr) は配列全体のサイズ、sizeof(p) はポインタのサイズ（8バイト/64bit）という重要な違いがあります。関数に配列を渡すと必ずポインタに崩壊するため、サイズ情報が失われます。',
      task: 'ポインタ演算 *(p + i) を使って配列の全要素を表示してください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;\n    // *(p + i) で各要素を表示\n    // sizeof の違いも確認\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;\n    printf("sizeof(arr)=%zu, sizeof(p)=%zu\\n", sizeof(arr), sizeof(p));\n    for (int i = 0; i < 5; i++) {\n        printf("%d\\n", *(p + i));\n    }\n    return 0;\n}',
      expectedOutput: 'sizeof(arr)=20, sizeof(p)=8\n10\n20\n30\n40\n50',
      hints: [
        '*(p + i) は p[i] と完全に同じ意味',
        'int* の場合 p+1 は sizeof(int)=4 バイト先',
        'sizeof(arr) は配列全体のサイズ、sizeof(p) はポインタのサイズ',
        '配列を関数に渡すとポインタに崩壊しサイズが失われる',
      ],
      explanation:
        'ポインタ演算の詳細: p + n は p のアドレスに sizeof(*p) * n バイトを加算します。つまり型のサイズが自動的に考慮されるため、バイト単位の計算は不要です。arr[i] は *(arr + i) の糖衣構文であり、さらに i[arr] とも書けます（交換則）。関数に配列を渡す場合は void func(int *arr, size_t len) のようにサイズも一緒に渡すのが定番です。',
    },
    {
      id: 12,
      title: '動的メモリ管理 (malloc/free)',
      difficulty: 'intermediate',
      description:
        'malloc() はヒープ領域から指定バイト数のメモリを動的確保し、free() で解放します。calloc() は確保と同時に0初期化、realloc() はサイズ変更を行います。メモリリーク（確保したまま解放しない）はプログラムが長時間動作する場合に深刻な問題となります。free() 後のポインタにアクセスする「ダングリングポインタ」は未定義動作です。malloc の戻り値が NULL でないか必ずチェックする必要があります。',
      task: 'malloc で5要素の int 配列を動的確保し、値を設定・表示・解放してください。NULLチェックも行ってください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // malloc で 5 * sizeof(int) バイト確保\n    // NULL チェック\n    // 値を設定して表示\n    // free で解放\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = (int *)malloc(5 * sizeof(int));\n    if (arr == NULL) {\n        fprintf(stderr, "Memory allocation failed\\n");\n        return 1;\n    }\n    for (int i = 0; i < 5; i++) {\n        arr[i] = (i + 1) * 10;\n    }\n    for (int i = 0; i < 5; i++) {\n        printf("%d\\n", arr[i]);\n    }\n    free(arr);\n    arr = NULL;\n    return 0;\n}',
      expectedOutput: '10\n20\n30\n40\n50',
      hints: [
        'malloc(5 * sizeof(int)) で5要素分のメモリを確保',
        'if (arr == NULL) で確保失敗をチェック',
        'free(arr) 後に arr = NULL を代入するのが安全',
        'calloc(5, sizeof(int)) なら0初期化付き',
      ],
      explanation:
        'メモリ管理関数: malloc(size)は未初期化確保、calloc(n, size)は0初期化付き確保、realloc(ptr, new_size)はサイズ変更（内容保持）、free(ptr)は解放。ダングリングポインタ防止策としてfree後にNULLを代入します。二重free（同じアドレスを2回free）はヒープ破壊を引き起こします。検出ツール: Valgrind(--leak-check=full), AddressSanitizer(gcc/clang -fsanitize=address)。',
    },
    {
      id: 13,
      title: 'ダブルポインタ (ポインタのポインタ)',
      difficulty: 'intermediate',
      description:
        'ダブルポインタ (int **) はポインタ変数のアドレスを格納します。用途: 1. 関数内でポインタ自体を変更する（ポインタの参照渡し）、2. 二次元配列の動的確保、3. main(argc, argv) の char **argv。ダブルポインタを理解するには「ポインタもメモリ上の変数であり、アドレスを持つ」という点が重要です。*pp でポインタにアクセス、**pp で最終的な値にアクセスします。',
      task: 'ダブルポインタを使って、関数内でポインタの指す先（アドレス自体）を変更してください。',
      initialCode: '#include <stdio.h>\n\nvoid change(int **pp, int *newAddr) {\n    // *pp を newAddr に変更\n}\n\nint main(void) {\n    int a = 10, b = 20;\n    int *p = &a;\n    printf("Before: %d\\n", *p);\n    change(&p, &b);\n    printf("After: %d\\n", *p);\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nvoid change(int **pp, int *newAddr) {\n    *pp = newAddr;\n}\n\nint main(void) {\n    int a = 10, b = 20;\n    int *p = &a;\n    printf("Before: %d\\n", *p);\n    change(&p, &b);\n    printf("After: %d\\n", *p);\n    return 0;\n}',
      expectedOutput: 'Before: 10\nAfter: 20',
      hints: [
        '*pp = newAddr; でポインタが指す先を変更',
        '&p でポインタ変数 p 自体のアドレスを渡す',
        '**pp で最終的な int の値にアクセス',
        'main() の argv (char **argv) もダブルポインタ',
      ],
      explanation:
        'ダブルポインタの典型的な用途: ポインタの変更(void alloc(int **pp) { *pp = malloc(sizeof(int)); })、二次元動的配列、文字列配列(char **argv)、連結リストの先頭ノード変更(void push(Node **head, int data))。ポインタの間接参照レベルが深くなるほどコードは複雑になるため、通常は2段(ダブル)までに留めるのが良い設計です。',
    },
    {
      id: 14,
      title: '関数ポインタ',
      difficulty: 'intermediate',
      description:
        '関数もメモリ上にアドレスを持ち、ポインタに格納して動的に呼び出せます。関数ポインタの宣言は int (*fp)(int, int); で「intを2つ受け取りintを返す関数へのポインタ」です。用途: コールバック関数、qsort の比較関数、プラグインアーキテクチャ、イベント駆動プログラミング。typedef で型名を付けると格段に読みやすくなります。関数ポインタの配列で「ジャンプテーブル」パターンも実装できます。',
      task: '関数ポインタを使って add と multiply を動的に切り替えて実行してください。',
      initialCode: '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint main(void) {\n    // 関数ポインタ op を宣言\n    // add と multiply を切り替えて呼び出す\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint main(void) {\n    int (*op)(int, int);\n    op = add;\n    printf("Add: %d\\n", op(3, 4));\n    op = multiply;\n    printf("Multiply: %d\\n", op(3, 4));\n    return 0;\n}',
      expectedOutput: 'Add: 7\nMultiply: 12',
      hints: [
        'int (*op)(int, int); で関数ポインタを宣言',
        'op = add; で関数のアドレスを代入',
        'op(3, 4) で関数ポインタ経由の呼び出し',
        'typedef int (*Operation)(int, int); で型名を定義すると読みやすい',
      ],
      explanation:
        '関数ポインタの活用パターン: コールバック(void foreach(int *arr, int n, void (*callback)(int)))、qsort(qsort(arr, n, sizeof(int), compare_func))、ジャンプテーブル(int (*ops[])(int,int) = {add, sub, mul, div}; ops[choice](a, b);)、状態マシン(typedef State (*Handler)(Event);)。typedef を使うと可読性が向上します。',
    },
    {
      id: 15,
      title: 'ファイル入出力',
      difficulty: 'intermediate',
      description:
        'fopen() でファイルを開き、fprintf/fgets/fread/fwrite で読み書きし、fclose() で閉じます。FILE ポインタがファイルハンドルとして機能します。モード: "r"(読込), "w"(書込/上書き), "a"(追記), "rb"/"wb"(バイナリ)。fopen 失敗時は NULL を返すため必ずチェックが必要です。ファイルを閉じ忘れるとバッファのフラッシュが行われず、データ損失やリソースリークの原因になります。',
      task: 'ファイルに文字列を書き込み、再度開いて読み込んで表示してください。fopen の NULL チェックも行ってください。',
      initialCode: '#include <stdio.h>\n\nint main(void) {\n    // "w" モードでファイルに書き込み\n    // fclose で閉じる\n    // "r" モードで開き直して読み込み\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("test.txt", "w");\n    if (fp == NULL) {\n        perror("fopen failed");\n        return 1;\n    }\n    fprintf(fp, "Hello, File I/O!\\n");\n    fclose(fp);\n\n    char buf[100];\n    fp = fopen("test.txt", "r");\n    if (fp != NULL) {\n        fgets(buf, sizeof(buf), fp);\n        printf("%s", buf);\n        fclose(fp);\n    }\n    return 0;\n}',
      expectedOutput: 'Hello, File I/O!',
      hints: [
        'fopen("file.txt", "w") で書き込みモード',
        'fprintf(fp, ...) でファイルに書き込み',
        'fgets(buf, sizeof(buf), fp) で1行読み込み',
        'fclose(fp) を必ず呼んでリソース解放',
      ],
      explanation:
        'ファイルI/O関数: fprintf(書式付き書き込み), fputs(文字列書き込み), fwrite(バイナリ書き込み), fscanf(書式付き読み込み), fgets(行読み込み), fread(バイナリ読み込み)。fseek/ftell でファイル内の位置を移動/取得。perror() はerrno に基づくエラーメッセージを表示します。stderr への出力は fprintf(stderr, ...) で行い、パイプやリダイレクトの影響を受けません。',
    },
    {
      id: 16,
      title: 'プリプロセッサ',
      difficulty: 'intermediate',
      description:
        'プリプロセッサはコンパイル前にソースコードのテキスト置換を行います。#define でマクロ定数と関数マクロを定義、#include でヘッダファイルを取り込み、#ifdef/#ifndef で条件付きコンパイルを行います。関数マクロは引数を必ず括弧で囲まないと演算子の優先順位で問題が発生します。#ifndef ... #endif のインクルードガードは多重インクルード防止の必須パターンです。',
      task: '#define でマクロ定数 PI と関数マクロ MAX を定義して使ってください。',
      initialCode: '#include <stdio.h>\n\n// #define PI ...\n// #define MAX(a, b) ...\n\nint main(void) {\n    printf("PI = %.2f\\n", PI);\n    printf("MAX(3, 5) = %d\\n", MAX(3, 5));\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\n#define PI 3.14159\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main(void) {\n    printf("PI = %.2f\\n", PI);\n    printf("MAX(3, 5) = %d\\n", MAX(3, 5));\n    return 0;\n}',
      expectedOutput: 'PI = 3.14\nMAX(3, 5) = 5',
      hints: [
        '#define PI 3.14159 でマクロ定数を定義',
        '#define MAX(a, b) ((a) > (b) ? (a) : (b)) で関数マクロ',
        '引数は必ず括弧 (a), (b) で囲むこと',
        'マクロ全体も外側を括弧で囲む',
      ],
      explanation:
        'マクロの落とし穴: #define SQUARE(x) x*x だと SQUARE(1+2) が 1+2*1+2=5 になります（正しくは ((x)*(x))）。また MAX(i++, j++) は i++ が2回評価される危険があります。これがインライン関数が推奨される理由です。プリプロセッサの便利機能: #(文字列化), ##(トークン連結), __FILE__, __LINE__, __func__。#if defined(DEBUG) でデバッグコードの条件付きコンパイルが可能です。',
    },
    {
      id: 17,
      title: '列挙型 (enum) と共用体 (union)',
      difficulty: 'intermediate',
      description:
        'enum は名前付き整数定数の集合で、コードの可読性を向上させます。デフォルトでは 0 から連番ですが、値を明示的に指定することも可能です。union は全メンバが同じメモリ領域を共有するデータ型で、サイズは最大メンバのサイズと等しくなります。enum + union で「タグ付き共用体（tagged union）」を実装でき、型安全なバリアント型を実現します。これは Rust の enum や TypeScript の判別共用体の先祖にあたるパターンです。',
      task: 'enum Color と union Value を定義し、使い方を示してください。',
      initialCode: '#include <stdio.h>\n\n// enum Color を定義 (RED, GREEN, BLUE)\n// union Value を定義 (int i, float f, char c)\n\nint main(void) {\n    // enum と union を使う\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\ntypedef enum { RED, GREEN, BLUE } Color;\n\ntypedef union {\n    int i;\n    float f;\n    char c;\n} Value;\n\nint main(void) {\n    Color color = GREEN;\n    printf("Color: %d\\n", color);\n\n    Value v;\n    v.i = 42;\n    printf("Int: %d\\n", v.i);\n    v.f = 3.14f;\n    printf("Float: %.2f\\n", v.f);\n    return 0;\n}',
      expectedOutput: 'Color: 1\nInt: 42\nFloat: 3.14',
      hints: [
        'enum { RED, GREEN, BLUE } は 0, 1, 2 に対応',
        'union は最大メンバのサイズ分のメモリを確保',
        'union で別のメンバに書き込むと前の値は上書きされる',
        'tagged union: enum type + union data の組合せ',
      ],
      explanation:
        'enum の値は明示指定可能: enum { A = 10, B = 20, C = B + 5 }。C言語の enum は実質 int で型安全性は弱いです（C++ の enum class は厳密）。union は型パンニング（同じビット列を別の型で再解釈）にも使われますが、厳密には未定義動作の場合があります。安全なタグ付き共用体パターン: struct Variant { enum Type type; union { int i; double d; char *s; } data; }; で type フィールドで現在のデータ型を管理します。',
    },
    {
      id: 18,
      title: '連結リスト (Linked List)',
      difficulty: 'intermediate',
      description:
        '連結リストは動的なデータ構造で、各ノードがデータと次のノードへのポインタを持ちます。配列と異なりメモリの連続性が不要で、先頭/中間への挿入・削除が O(1) です。一方、ランダムアクセスは O(n) でキャッシュ効率も劣ります。単方向リスト(next のみ)、双方向リスト(prev + next)、循環リスト(末尾が先頭を指す)の3種類があります。リスト破棄時は全ノードを free する必要があります。',
      task: '3つのノード(10, 20, 30)を持つ連結リストを作成し、走査して全ノードの値を表示してください。リスト解放も行ってください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\n// createNode, printList, freeList を実装\n\nint main(void) {\n    // 3ノードのリストを作成し表示・解放\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int data) {\n    Node *n = (Node *)malloc(sizeof(Node));\n    if (n == NULL) return NULL;\n    n->data = data;\n    n->next = NULL;\n    return n;\n}\n\nvoid printList(Node *head) {\n    Node *cur = head;\n    while (cur != NULL) {\n        printf("%d\\n", cur->data);\n        cur = cur->next;\n    }\n}\n\nvoid freeList(Node *head) {\n    Node *tmp;\n    while (head != NULL) {\n        tmp = head;\n        head = head->next;\n        free(tmp);\n    }\n}\n\nint main(void) {\n    Node *head = createNode(10);\n    head->next = createNode(20);\n    head->next->next = createNode(30);\n    printList(head);\n    freeList(head);\n    return 0;\n}',
      expectedOutput: '10\n20\n30',
      hints: [
        'struct Node に next ポインタを持たせて次のノードを参照',
        'malloc で各ノードを動的確保',
        '走査は while (cur != NULL) { cur = cur->next; }',
        'freeList では tmp に現在ノードを保存してから next に進む',
      ],
      explanation:
        '連結リストの操作計算量: 先頭挿入 O(1), 末尾挿入 O(n)（末尾ポインタがあれば O(1)）, 検索 O(n), 削除 O(1)（ノードが分かっている場合）。双方向リストは prev ポインタも持ち逆方向走査が可能。循環リストは末尾の next が先頭を指し、ラウンドロビンスケジューリングに使われます。実装時の注意: NULLポインタチェック、空リストの扱い、ポインタ繋ぎ替え順序が重要です。',
    },
    {
      id: 19,
      title: 'ビット演算',
      difficulty: 'intermediate',
      description:
        'ビット演算子: &(AND), |(OR), ^(XOR), ~(NOT), <<(左シフト), >>(右シフト)。低レベルプログラミング（デバイスドライバ、通信プロトコル）やフラグ管理に不可欠です。Unixのファイルパーミッション(rwx = 0b111 = 7)もビットフラグです。ビットマスクでフラグの設定(|=)、確認(&)、クリア(&= ~)、トグル(^=)の4操作を行います。左シフト << n は 2^n 倍、右シフト >> n は 2^n で割るのと等価です。',
      task: 'ビット演算でフラグの設定・確認・クリアを行い、各操作の結果を表示してください。',
      initialCode: '#include <stdio.h>\n\n#define FLAG_READ  0x01\n#define FLAG_WRITE 0x02\n#define FLAG_EXEC  0x04\n\nint main(void) {\n    unsigned int perms = 0;\n    // フラグ設定(|=)、確認(&)、クリア(&= ~)\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\n#define FLAG_READ  0x01\n#define FLAG_WRITE 0x02\n#define FLAG_EXEC  0x04\n\nint main(void) {\n    unsigned int perms = 0;\n    perms |= FLAG_READ;\n    perms |= FLAG_WRITE;\n    printf("Read: %d\\n", (perms & FLAG_READ) ? 1 : 0);\n    printf("Write: %d\\n", (perms & FLAG_WRITE) ? 1 : 0);\n    printf("Exec: %d\\n", (perms & FLAG_EXEC) ? 1 : 0);\n    perms &= ~FLAG_WRITE;\n    printf("Write after clear: %d\\n", (perms & FLAG_WRITE) ? 1 : 0);\n    return 0;\n}',
      expectedOutput: 'Read: 1\nWrite: 1\nExec: 0\nWrite after clear: 0',
      hints: [
        'perms |= FLAG_READ; でフラグをセット',
        '(perms & FLAG_READ) ? 1 : 0 でフラグを確認',
        'perms &= ~FLAG_WRITE; でフラグをクリア',
        'perms ^= FLAG_EXEC; でフラグをトグル',
      ],
      explanation:
        'ビット演算の4操作: セット(flags |= FLAG)、確認((flags & FLAG) != 0)、クリア(flags &= ~FLAG)、トグル(flags ^= FLAG)。応用: XOR スワップ(a^=b; b^=a; a^=b;), ビットカウント(__builtin_popcount), 最下位ビット取得(x & -x), 2の累乗判定((n & (n-1)) == 0)。組み込みシステムではレジスタ操作にビット演算が必須で、volatile と組み合わせて使います。',
    },
    {
      id: 20,
      title: 'マルチファイル構成とヘッダファイル',
      difficulty: 'intermediate',
      description:
        '大規模なCプログラムは複数のソースファイル(.c)に分割し、ヘッダファイル(.h)でインターフェースを公開します。各 .c ファイルは個別にコンパイルされオブジェクトファイル(.o)になり、リンカが実行ファイルに結合します。#ifndef ... #endif のインクルードガードで二重読み込みを防止します。static 関数/変数はファイルスコープに限定され、extern でグローバル変数を他ファイルから参照します。',
      task: 'ヘッダファイル(math_utils.h)にプロトタイプ宣言、ソースファイルに実装を書く分離構成を示してください。',
      initialCode: '/* == math_utils.h の内容 ==\n   ヘッダガード + プロトタイプ宣言 */\n\n/* == math_utils.c の内容 ==\n   #include "math_utils.h"\n   関数実装 */\n\n/* == main.c の内容 == */\n#include <stdio.h>\n\nint add(int a, int b);\nint multiply(int a, int b);\n\nint main(void) {\n    printf("Add: %d\\n", add(3, 4));\n    printf("Multiply: %d\\n", multiply(3, 4));\n    return 0;\n}',
      solutionCode: '/* -- math_utils.h -- */\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\nint multiply(int a, int b);\n#endif\n\n/* -- math_utils.c -- */\n/* #include "math_utils.h" */\n\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\n/* -- main.c -- */\n#include <stdio.h>\n/* #include "math_utils.h" */\n\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint main(void) {\n    printf("Add: %d\\n", add(3, 4));\n    printf("Multiply: %d\\n", multiply(3, 4));\n    return 0;\n}',
      expectedOutput: 'Add: 7\nMultiply: 12',
      hints: [
        '#ifndef MATH_UTILS_H / #define MATH_UTILS_H / #endif でインクルードガード',
        '.h に宣言(プロトタイプ)、.c に実装を分離',
        '#include "file.h" でローカルヘッダを取り込み',
        'extern int global_var; で他ファイルのグローバル変数を参照',
      ],
      explanation:
        'コンパイル手順: gcc -c main.c → main.o, gcc -c math_utils.c → math_utils.o, gcc main.o math_utils.o -o program。Makefile で自動化するのが一般的です。static 関数は同じファイル内からのみ呼び出せる「プライベート関数」です。extern は他ファイルで定義された変数の存在を宣言します。#pragma once はインクルードガードの代替で短く書けますが非標準です。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'メモリレイアウトとスタック/ヒープ',
      difficulty: 'advanced',
      description:
        'Cプログラムのメモリは5つのセグメントに分かれます: Text(実行コード, 読取専用), Data(初期化済みグローバル/static変数), BSS(未初期化グローバル/static, 0初期化), Heap(malloc等の動的確保, 低位→高位に成長), Stack(ローカル変数・引数・戻りアドレス, 高位→低位に成長)。スタックとヒープは同じメモリ空間の両端から伸びるため、過度な使用で衝突します。この構造を理解することは、バグの原因特定やパフォーマンス最適化に不可欠です。',
      task: 'グローバル変数、static変数、スタック変数、ヒープ変数のアドレスを表示し、メモリ領域の違いを確認してください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint global_var = 100;\n\nint main(void) {\n    int stack_var = 200;\n    static int static_var = 300;\n    int *heap_var = (int *)malloc(sizeof(int));\n    *heap_var = 400;\n    // 各変数のアドレスと値を printf で表示\n    free(heap_var);\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint global_var = 100;\n\nint main(void) {\n    int stack_var = 200;\n    static int static_var = 300;\n    int *heap_var = (int *)malloc(sizeof(int));\n    *heap_var = 400;\n    printf("Global: %p (val=%d)\\n", (void *)&global_var, global_var);\n    printf("Static: %p (val=%d)\\n", (void *)&static_var, static_var);\n    printf("Stack:  %p (val=%d)\\n", (void *)&stack_var, stack_var);\n    printf("Heap:   %p (val=%d)\\n", (void *)heap_var, *heap_var);\n    free(heap_var);\n    return 0;\n}',
      expectedOutput: 'Global: 0x... (val=100)\nStatic: 0x... (val=300)\nStack:  0x... (val=200)\nHeap:   0x... (val=400)',
      hints: [
        '%p でアドレスを16進表示（void* にキャスト推奨）',
        'Global/Static は Data/BSS セグメント（低いアドレス）',
        'Stack は高いアドレス（下方向に成長）',
        'Heap は低いアドレスから上方向に成長',
      ],
      explanation:
        'メモリセグメント: Text(機械語コード, 読取専用), Data(初期化済み static/global), BSS(未初期化 static/global, 0に初期化), Heap(malloc/calloc で確保, 断片化の問題あり), Stack(関数呼び出しごとにフレームが積まれる, 自動解放, 通常2-8MB)。スタックオーバーフローは深い再帰や大きなローカル変数で発生します。ASLR（Address Space Layout Randomization）によりアドレスは実行ごとにランダム化されます。',
    },
    {
      id: 22,
      title: 'void ポインタとジェネリックプログラミング',
      difficulty: 'advanced',
      description:
        'void* は型を持たない汎用ポインタで、任意の型のポインタを格納できます。C言語でジェネリック（型に依存しない）プログラミングを実現する中核です。qsort, bsearch, memcpy 等の標準ライブラリ関数が void* を活用しています。void* はデリファレンスやポインタ演算ができないため、使用時は適切な型にキャストする必要があります。size_t パラメータでデータサイズを渡すパターンが定番です。',
      task: 'void* と memcpy を使った汎用 swap 関数を実装して、int と double の両方で動作させてください。',
      initialCode: '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nvoid generic_swap(void *a, void *b, size_t size) {\n    // memcpy で入れ替え\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    generic_swap(&x, &y, sizeof(int));\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nvoid generic_swap(void *a, void *b, size_t size) {\n    void *tmp = malloc(size);\n    if (tmp == NULL) return;\n    memcpy(tmp, a, size);\n    memcpy(a, b, size);\n    memcpy(b, tmp, size);\n    free(tmp);\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    generic_swap(&x, &y, sizeof(int));\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
      expectedOutput: 'Before: x=10, y=20\nAfter: x=20, y=10',
      hints: [
        'void *tmp = malloc(size); で一時バッファ確保',
        'memcpy(dst, src, size) でバイト単位コピー',
        'void* は直接デリファレンスできない（キャストが必要）',
        'size_t でデータサイズを受け取り型に依存しない処理を実現',
      ],
      explanation:
        'void* はC言語唯一のジェネリクス手段です。標準ライブラリでの活用: qsort(arr, n, elem_size, cmp), bsearch(key, arr, n, elem_size, cmp), memcpy(dst, src, n), memset(ptr, value, n)。void* の算術演算は標準Cでは禁止ですが、GCC拡張では1バイト単位で動作します。ポータブルなコードでは (char*)ptr + offset とキャストして使います。',
    },
    {
      id: 23,
      title: 'qsort と比較関数',
      difficulty: 'advanced',
      description:
        'stdlib.h の qsort() はC標準ライブラリの汎用ソート関数で、比較関数を関数ポインタで受け取ります。比較関数は2つの要素への const void* を受け取り、負(a<b), 0(a==b), 正(a>b) を返します。構造体のソートにも同じパターンが適用できます。bsearch() も同様の比較関数でソート済み配列の二分探索を行います。return a - b; はオーバーフローの危険があるため、安全な比較パターンを使いましょう。',
      task: 'qsort で int 配列を昇順にソートしてください。比較関数も正しく実装してください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n\n// 比較関数を定義\n\nint main(void) {\n    int arr[] = {42, 15, 8, 23, 4, 16};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    // qsort で昇順ソート\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint compare(const void *a, const void *b) {\n    int va = *(const int *)a;\n    int vb = *(const int *)b;\n    return (va > vb) - (va < vb);\n}\n\nint main(void) {\n    int arr[] = {42, 15, 8, 23, 4, 16};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    qsort(arr, n, sizeof(int), compare);\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}',
      expectedOutput: '4 8 15 16 23 42',
      hints: [
        'int compare(const void *a, const void *b) のシグネチャ',
        '*(const int *)a でvoid*をintに変換して値を取得',
        'qsort(arr, n, sizeof(int), compare) で呼び出し',
        'return (va > vb) - (va < vb); はオーバーフロー安全な比較',
      ],
      explanation:
        '比較関数の注意: return a - b; は INT_MIN - INT_MAX でオーバーフローする危険があります。安全な実装: return (a > b) - (a < b); は -1, 0, 1 のみを返します。構造体のソートも同パターンで可能です。降順にするには比較の符号を反転。qsort の内部アルゴリズムは実装依存（quicksort, introsort, mergesort 等）です。',
    },
    {
      id: 24,
      title: 'マクロの高度なテクニック',
      difficulty: 'advanced',
      description:
        'Cプリプロセッサの高度な機能: #演算子（文字列化）、##演算子（トークン連結）、__VA_ARGS__（可変長引数マクロ）。デバッグ用LOGマクロ（ファイル名・行番号付き）は実務で頻出します。do { ... } while(0) でマクロ本体を安全に複数文にまとめるイディオムも重要です。X-Macro はコードの重複を減らす高度なテクニックです。',
      task: '__FILE__、__LINE__、__VA_ARGS__ を使ったデバッグ用LOGマクロを作ってください。',
      initialCode: '#include <stdio.h>\n\n// デバッグ用 LOG マクロを定義\n// [ファイル名:行番号] メッセージ の形式\n\nint main(void) {\n    int x = 42;\n    LOG("x = %d", x);\n    LOG("hello %s", "world");\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\n#define LOG(fmt, ...) \\\n    printf("[%s:%d] " fmt "\\n", __FILE__, __LINE__, __VA_ARGS__)\n\nint main(void) {\n    int x = 42;\n    LOG("x = %d", x);\n    LOG("hello %s", "world");\n    return 0;\n}',
      expectedOutput: '[main.c:7] x = 42\n[main.c:8] hello world',
      hints: [
        '__FILE__ は現在のソースファイル名の文字列リテラル',
        '__LINE__ は現在の行番号の整数定数',
        '__VA_ARGS__ はマクロの可変長引数を展開',
        'バックスラッシュ \\ で行継続',
      ],
      explanation:
        'プリプロセッサの高度な機能: # 演算子で #define STR(x) #x → STR(hello) = "hello"。## 演算子で #define CONCAT(a,b) a##b → CONCAT(foo, bar) = foobar。do { ... } while(0) は複数文マクロを安全に if/else で使えるようにするイディオムです。__func__ (C99)は現在の関数名。X-Macro でデータをマクロ定義し展開方法を切り替えるテクニックも有用です。',
    },
    {
      id: 25,
      title: '再帰とメモ化',
      difficulty: 'advanced',
      description:
        '再帰関数は自分自身を呼び出すことで問題を分割統治します。フィボナッチ数列の素朴な再帰は O(2^n) ですが、メモ化（計算済みの値を配列に保存）により O(n) に改善できます。再帰呼び出しのたびにスタックフレームが積まれるため、深い再帰はスタックオーバーフローを引き起こします。末尾再帰はコンパイラがループに最適化できる場合がありますが、C言語では保証されません。',
      task: 'メモ化再帰でフィボナッチ数列を効率的に計算し、fib(0)〜fib(10) を表示してください。',
      initialCode: '#include <stdio.h>\n\nlong long memo[100] = {0};\n\nlong long fib(int n) {\n    // ベースケース: n <= 1\n    // メモ化チェックと再帰計算\n}\n\nint main(void) {\n    for (int i = 0; i <= 10; i++) {\n        printf("fib(%d) = %lld\\n", i, fib(i));\n    }\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nlong long memo[100] = {0};\n\nlong long fib(int n) {\n    if (n <= 1) return n;\n    if (memo[n] != 0) return memo[n];\n    memo[n] = fib(n - 1) + fib(n - 2);\n    return memo[n];\n}\n\nint main(void) {\n    for (int i = 0; i <= 10; i++) {\n        printf("fib(%d) = %lld\\n", i, fib(i));\n    }\n    return 0;\n}',
      expectedOutput: 'fib(0) = 0\nfib(1) = 1\nfib(2) = 1\nfib(3) = 2\nfib(4) = 3\nfib(5) = 5\nfib(6) = 8\nfib(7) = 13\nfib(8) = 21\nfib(9) = 34\nfib(10) = 55',
      hints: [
        'if (n <= 1) return n; がベースケース',
        'if (memo[n] != 0) return memo[n]; でキャッシュヒット',
        'memo[n] = fib(n-1) + fib(n-2); で計算結果を保存',
        'メモ化により O(2^n) が O(n) に改善される',
      ],
      explanation:
        '再帰の3要素: ベースケース（終了条件）、再帰ケース（問題の分割）、進行（ベースケースに近づく）。素朴な fib(n) は同じ計算を繰り返し O(2^n)。メモ化で各 fib(k) は最大1回しか計算されず O(n)。ボトムアップDP（配列を前から埋める）はスタックを消費せずさらに効率的です。末尾再帰最適化(TCO)はGCCでは -O2 以上で有効になることがあります。',
    },
    {
      id: 26,
      title: '二分探索木 (BST)',
      difficulty: 'advanced',
      description:
        '二分探索木(Binary Search Tree)は各ノードが「左の子 < 自分 < 右の子」の性質を持つ木構造です。平均的な探索・挿入・削除は O(log n) ですが、偏った木では O(n) に退化します。中順走査(in-order)で昇順に要素を列挙できます。バランスを保つには AVL木や赤黒木を使います。LinuxカーネルのCFSスケジューラは赤黒木を使用しています。',
      task: 'BST の挿入(insert)と中順走査(inorder)を再帰で実装してください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int data;\n    struct TreeNode *left, *right;\n} TreeNode;\n\n// createNode, insert, inorder を実装\n\nint main(void) {\n    TreeNode *root = NULL;\n    int values[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) {\n        root = insert(root, values[i]);\n    }\n    inorder(root);\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int data;\n    struct TreeNode *left, *right;\n} TreeNode;\n\nTreeNode* createNode(int data) {\n    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));\n    if (n == NULL) return NULL;\n    n->data = data;\n    n->left = n->right = NULL;\n    return n;\n}\n\nTreeNode* insert(TreeNode *root, int data) {\n    if (root == NULL) return createNode(data);\n    if (data < root->data) root->left = insert(root->left, data);\n    else if (data > root->data) root->right = insert(root->right, data);\n    return root;\n}\n\nvoid inorder(TreeNode *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf("%d ", root->data);\n    inorder(root->right);\n}\n\nint main(void) {\n    TreeNode *root = NULL;\n    int values[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) {\n        root = insert(root, values[i]);\n    }\n    inorder(root);\n    printf("\\n");\n    return 0;\n}',
      expectedOutput: '20 30 40 50 60 70 80',
      hints: [
        'insert: root == NULL なら新ノード作成、data < root->data なら左へ',
        'inorder: 左 → 自分 → 右 の順で再帰',
        'createNode で malloc + 初期化',
        '全ノードのメモリ解放も実装すべき（postorder走査で）',
      ],
      explanation:
        'BST の走査順序: 前順(preorder) 自分→左→右、中順(inorder) 左→自分→右（昇順出力）、後順(postorder) 左→右→自分（メモリ解放に使用）。削除は3パターン: 葉ノード(単純削除), 子1つ(子で置換), 子2つ(中順後続者で置換)。自己平衡木: AVL木（高さ差<=1）、赤黒木（色でバランス）、B木（データベースのインデックス）。',
    },
    {
      id: 27,
      title: 'ハッシュテーブル',
      difficulty: 'advanced',
      description:
        'ハッシュテーブルはキーのハッシュ値でインデックスを決定し、平均 O(1) の探索・挿入・削除を実現するデータ構造です。衝突解決法: チェイン法（各バケットをリンクリストに）とオープンアドレス法（空きスロットを探す）。良いハッシュ関数は均一分布が重要で、負荷率(要素数/テーブルサイズ)が閾値を超えたらリハッシュを行います。',
      task: 'チェイン法による文字列→整数のハッシュテーブルを実装し、put/get 操作を行ってください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define TABLE_SIZE 10\n\ntypedef struct Entry {\n    char key[64];\n    int value;\n    struct Entry *next;\n} Entry;\n\nEntry *table[TABLE_SIZE] = {NULL};\n\n// hash, put, get を実装\n\nint main(void) {\n    put("apple", 100);\n    put("banana", 200);\n    printf("apple: %d\\n", get("apple"));\n    printf("banana: %d\\n", get("banana"));\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define TABLE_SIZE 10\n\ntypedef struct Entry {\n    char key[64];\n    int value;\n    struct Entry *next;\n} Entry;\n\nEntry *table[TABLE_SIZE] = {NULL};\n\nunsigned int hash(const char *key) {\n    unsigned int h = 0;\n    while (*key) h = h * 31 + (unsigned char)*key++;\n    return h % TABLE_SIZE;\n}\n\nvoid put(const char *key, int value) {\n    unsigned int idx = hash(key);\n    Entry *e = (Entry *)malloc(sizeof(Entry));\n    if (e == NULL) return;\n    strncpy(e->key, key, sizeof(e->key) - 1);\n    e->key[sizeof(e->key) - 1] = 0;\n    e->value = value;\n    e->next = table[idx];\n    table[idx] = e;\n}\n\nint get(const char *key) {\n    unsigned int idx = hash(key);\n    Entry *e = table[idx];\n    while (e != NULL) {\n        if (strcmp(e->key, key) == 0) return e->value;\n        e = e->next;\n    }\n    return -1;\n}\n\nint main(void) {\n    put("apple", 100);\n    put("banana", 200);\n    printf("apple: %d\\n", get("apple"));\n    printf("banana: %d\\n", get("banana"));\n    return 0;\n}',
      expectedOutput: 'apple: 100\nbanana: 200',
      hints: [
        'h = h * 31 + c はdjb2系の高速ハッシュ関数',
        '衝突時はリンクリストの先頭に挿入（チェイン法）',
        'get では同じバケットのリストを走査して key を比較',
        'strncpy で安全な文字列コピー',
      ],
      explanation:
        'ハッシュテーブルの設計要素: ハッシュ関数（djb2, FNV-1a, MurmurHash等）、衝突解決（チェイン法/オープンアドレス法）、負荷率（0.75超でリハッシュ）、最悪計算量（全キーが同一バケットで O(n)）。Java HashMap はバケット内が8要素を超えると赤黒木に変換します。実用では glib のGHashTable や uthash ライブラリが便利です。',
    },
    {
      id: 28,
      title: 'シグナル処理',
      difficulty: 'advanced',
      description:
        'シグナルはプロセス間通信の原始的な仕組みで、OSやユーザーからプロセスに通知を送ります。signal() または sigaction() でシグナルハンドラを登録できます。SIGINT(Ctrl+C), SIGTERM(終了要求), SIGSEGV(不正メモリアクセス), SIGKILL(強制終了, キャッチ不可)。ハンドラ内では非同期シグナル安全な関数のみ使用可能で、volatile sig_atomic_t 型の変数のみ安全に読み書きできます。',
      task: 'signal() で SIGINT をキャッチし、カスタムメッセージを表示するハンドラを設定してください。',
      initialCode: '#include <stdio.h>\n#include <signal.h>\n#include <stdlib.h>\n\n// volatile sig_atomic_t でフラグ\n// シグナルハンドラ関数\n\nint main(void) {\n    // SIGINT ハンドラを登録\n    printf("Running... Press Ctrl+C to stop\\n");\n    printf("Signal handler set for SIGINT\\n");\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <signal.h>\n#include <stdlib.h>\n\nvolatile sig_atomic_t running = 1;\n\nvoid handle_sigint(int sig) {\n    running = 0;\n}\n\nint main(void) {\n    signal(SIGINT, handle_sigint);\n    printf("Running... Press Ctrl+C to stop\\n");\n    printf("Signal handler set for SIGINT\\n");\n    if (!running) {\n        printf("SIGINT received, shutting down\\n");\n    }\n    return 0;\n}',
      expectedOutput: 'Running... Press Ctrl+C to stop\nSignal handler set for SIGINT',
      hints: [
        'signal(SIGINT, handler_function); でハンドラ登録',
        'volatile sig_atomic_t でシグナル安全なフラグ変数',
        'ハンドラ内では printf は本来使用不可（非async-signal-safe）',
        'sigaction() の方がより安全で推奨される',
      ],
      explanation:
        'シグナルの種類: SIGINT(2, Ctrl+C), SIGTERM(15, 終了要求), SIGKILL(9, 強制終了/捕捉不可), SIGSEGV(11, セグメンテーション違反)。sigaction() のメリット: ハンドラ実行中のシグナルブロック指定、ハンドラの自動リセットなし、追加情報(siginfo_t)の取得。ハンドラ内で安全な操作: volatile sig_atomic_t への読み書き、_exit() 呼び出し、write() によるFDへの書き込み。',
    },
    {
      id: 29,
      title: 'メモリ安全性とデバッグ',
      difficulty: 'advanced',
      description:
        'C言語の4大メモリバグ: 1. バッファオーバーフロー（配列外書き込み）、2. ダングリングポインタ（free後のアクセス）、3. メモリリーク（解放忘れ）、4. 未初期化変数（ゴミ値の使用）。これらは未定義動作(Undefined Behavior)を引き起こし、デバッグが非常に困難です。Valgrind, AddressSanitizer(ASan), UndefinedBehaviorSanitizer(UBSan)が検出ツールとして有効です。Rustが生まれた理由の一つがこれらの安全性問題です。',
      task: 'safe_strdup（安全なstrdup）と safe_free（NULL化付きfree）を実装してください。',
      initialCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n// safe_strdup: NULL チェック付き strdup\n// safe_free: free 後に NULL を代入\n\nint main(void) {\n    // safe_strdup で文字列を複製\n    // 表示後に safe_free で解放\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar* safe_strdup(const char *src) {\n    if (src == NULL) return NULL;\n    size_t len = strlen(src) + 1;\n    char *dst = (char *)malloc(len);\n    if (dst == NULL) return NULL;\n    memcpy(dst, src, len);\n    return dst;\n}\n\nvoid safe_free(void **ptr) {\n    if (ptr != NULL && *ptr != NULL) {\n        free(*ptr);\n        *ptr = NULL;\n    }\n}\n\nint main(void) {\n    char *str = safe_strdup("Hello, Safe C!");\n    if (str != NULL) {\n        printf("%s\\n", str);\n        safe_free((void **)&str);\n        printf("After free: %s\\n", str == NULL ? "NULL" : "NOT NULL");\n    }\n    return 0;\n}',
      expectedOutput: 'Hello, Safe C!\nAfter free: NULL',
      hints: [
        'strlen(src) + 1 で NULL 文字分も含めたサイズを計算',
        'malloc の戻り値 NULL チェックは必須',
        'safe_free ではダブルポインタで受け取り *ptr = NULL を代入',
        'memcpy は strcpy より安全（サイズ指定のため）',
      ],
      explanation:
        'メモリバグの防止策: バッファオーバーフロー→strncpy/snprintf使用。ダングリングポインタ→free後にNULL代入。メモリリーク→malloc/freeを対にする。未初期化→宣言時に必ず初期化。検出ツール: Valgrind(--leak-check=full), gcc -fsanitize=address(ASan), gcc -fsanitize=undefined(UBSan)。これらのメモリ安全性問題がRust言語が生まれた理由の一つです。',
    },
    {
      id: 30,
      title: 'C11 の _Generic で型安全ジェネリクス',
      difficulty: 'advanced',
      description:
        'C11で追加された _Generic キーワードは、式の型に基づいてコンパイル時に分岐するジェネリック選択機能です。C++のテンプレートや関数オーバーロードに相当する機能をCで実現できます。_Generic((式), int: func_int, double: func_double, default: func_default) の形式で、式の型に対応する関数が選択されます。tgmath.h の型ジェネリック数学関数も内部的にこの仕組みを使っています。',
      task: '_Generic を使って int/double/char* に対応する汎用 print マクロを作ってください。',
      initialCode: '#include <stdio.h>\n\n// _Generic + マクロで型に応じた関数を選択\n// print(x) マクロを定義\n\nint main(void) {\n    int i = 42;\n    double d = 3.14;\n    char *s = "hello";\n    print(i);\n    print(d);\n    print(s);\n    return 0;\n}',
      solutionCode: '#include <stdio.h>\n\nvoid print_int(int x) { printf("int: %d\\n", x); }\nvoid print_double(double x) { printf("double: %.2f\\n", x); }\nvoid print_str(char *x) { printf("string: %s\\n", x); }\n\n#define print(x) _Generic((x), \\\n    int: print_int, \\\n    double: print_double, \\\n    char*: print_str \\\n)(x)\n\nint main(void) {\n    int i = 42;\n    double d = 3.14;\n    char *s = "hello";\n    print(i);\n    print(d);\n    print(s);\n    return 0;\n}',
      expectedOutput: 'int: 42\ndouble: 3.14\nstring: hello',
      hints: [
        '_Generic((x), int: func_int, double: func_double, ...)(x) の構文',
        'コンパイル時に x の型に応じた関数が選択される',
        'default: で未知の型のフォールバック指定可能',
        '各型に対応する関数を事前に定義しておく',
      ],
      explanation:
        '_Generic はC11のコンパイル時型スイッチです。実行時コストはゼロで、型に応じた関数が直接呼び出されます。活用例: 型安全な print マクロ、tgmath.h(sin/cos等の型自動判別)、型安全なコンテナ。default: で未マッチ時のフォールバックを指定可能。C言語のジェネリクスは _Generic + マクロ + void* の組み合わせで実現し、C++のテンプレートほど強力ではありませんがゼロコスト抽象化を実現できます。',
    },
  ],
};

export default course;
