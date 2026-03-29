import type { LangCourse } from './types';

const course: LangCourse = {
  id: 'sql',
  name: 'SQL',
  nameJa: 'SQL',
  simpleIconSlug: 'postgresql',
  color: '#4169E1',
  description: 'データベース操作の標準言語。データの検索・操作・管理を学びます。',
  lessons: [
    // ==================== 初級 (1-10) ====================
    {
      id: 1,
      title: 'はじめてのSELECT',
      difficulty: 'beginner',
      description:
        'SQL (Structured Query Language) は1970年代にIBMで開発されたリレーショナルデータベースを操作する標準言語です。MySQL, PostgreSQL, SQLite, Oracle, SQL Server など主要なRDBMS全てで使用されます。SELECT文はデータの取得（問い合わせ）に使い、FROM句で対象テーブルを指定します。SQLは宣言的言語であり「何を取得するか」を記述し、「どう取得するか」はDBエンジンが最適化します。',
      task: 'users テーブルから全てのカラムを取得するクエリを書いてください。SELECT * FROM の構文を使います。',
      initialCode: '-- users テーブルの全データを取得\n-- SELECT カラム名 FROM テーブル名;\n-- * は「全てのカラム」を意味します\n',
      solutionCode: 'SELECT * FROM users;',
      expectedOutput: 'SELECT * FROM users;',
      hints: [
        'SELECT カラム FROM テーブル; の構文です',
        '* は全カラムを表すワイルドカードです',
        'SQL文の終わりにはセミコロン(;)を付けます',
        'キーワード(SELECT, FROM)は大文字が慣例です',
      ],
      explanation:
        'SELECT は最も基本的なSQL文で、データベースからデータを読み取ります。* で全カラム取得できますが、本番環境では必要なカラムのみ指定するのがベストプラクティスです（ネットワーク転送量削減、インデックスの活用）。SQLは大文字小文字を区別しませんが、キーワードを大文字にするのが一般的な慣例です。クエリの実行順序は SELECT の前に FROM が評価される点を覚えておきましょう。',
    },
    {
      id: 2,
      title: 'WHERE で条件絞り込み',
      difficulty: 'beginner',
      description:
        'WHERE 句で取得するレコードを条件で絞り込みます。比較演算子（=, <>, <, >, <=, >=）と論理演算子（AND, OR, NOT）を組み合わせて複雑な条件も表現できます。BETWEEN a AND b で範囲指定、IN (値リスト) で複数値のいずれかにマッチ、IS NULL で NULL 判定も可能です。WHERE句はSELECTだけでなくUPDATE, DELETEでも使用します。',
      task: 'users テーブルから age が 20 以上のレコードの name と age カラムを取得してください。',
      initialCode: '-- age が 20 以上のユーザーを取得\n-- WHERE 句で条件を指定します\n-- 必要なカラムだけ SELECT します\n',
      solutionCode: 'SELECT name, age FROM users WHERE age >= 20;',
      expectedOutput: 'SELECT name, age FROM users WHERE age >= 20;',
      hints: [
        'WHERE age >= 20 で条件を指定します',
        'SELECT name, age で必要なカラムだけ取得します',
        '>= は「以上」（20を含む）、> は「より大きい」（20を含まない）',
        'AND/OR で複数条件を組み合わせられます',
      ],
      explanation:
        '比較演算子: = (等しい), <> または != (等しくない), < (未満), > (より大きい), <= (以下), >= (以上)。論理演算子: AND (両方真), OR (どちらか真), NOT (否定)。BETWEEN 20 AND 30 は >= 20 AND <= 30 と同じ。IN (1, 2, 3) は = 1 OR = 2 OR = 3 と同じ。WHERE句はインデックスと密接に関連し、適切な条件はクエリ性能に大きく影響します。',
    },
    {
      id: 3,
      title: 'LIKE でパターン検索',
      difficulty: 'beginner',
      description:
        'LIKE 句はワイルドカード文字を使ったパターンマッチング検索を行います。% は任意の0文字以上の文字列、_ は任意の1文字にマッチします。大文字小文字の区別はDBMSにより異なります（PostgreSQLでは ILIKE で大文字小文字を無視）。LIKE は文字列型カラムでのみ使用し、大量データでの先頭ワイルドカード(LIKE "%text")はインデックスが効かないため注意が必要です。',
      task: 'users テーブルから name が "A" で始まるレコードを取得してください。ワイルドカード % を使います。',
      initialCode: '-- 名前が A で始まるユーザーを検索\n-- LIKE パターン でマッチングします\n-- % は任意の文字列にマッチ\n',
      solutionCode: "SELECT * FROM users WHERE name LIKE 'A%';",
      expectedOutput: "SELECT * FROM users WHERE name LIKE 'A%';",
      hints: [
        "LIKE 'A%' で A 始まりを検索します",
        '% は任意の0文字以上にマッチします',
        '_ は任意の1文字にマッチします',
        "LIKE '%text%' は前方一致でないためインデックスが効きません",
      ],
      explanation:
        "パターン例: 'A%': Aで始まる、'%a': aで終わる、'%test%': testを含む、'_a%': 2文字目がa、'A___': Aで始まる4文字。大量データでの LIKE '%text%' はフルスキャンになるため、全文検索インデックス（PostgreSQL: pg_trgm, MySQL: FULLTEXT INDEX）やElasticsearchの使用を検討します。PostgreSQLでは SIMILAR TO で正規表現ライクな検索も可能です。",
    },
    {
      id: 4,
      title: 'ORDER BY と LIMIT',
      difficulty: 'beginner',
      description:
        'ORDER BY で結果を並び替え（ASC=昇順（デフォルト）, DESC=降順）、LIMIT で取得件数を制限します。複数カラムでのソートも可能で、ORDER BY age DESC, name ASC のように指定します。OFFSET でスキップする行数を指定でき、ページネーション（ページング）に使われます。NULL値のソート順序はDBMSによって異なり、NULLS FIRST/NULLS LAST で制御できます。',
      task: 'users テーブルから age の降順で上位5件を取得してください。ORDER BY と LIMIT を組み合わせます。',
      initialCode: '-- 年齢の高い順に5件取得\n-- ORDER BY カラム DESC で降順\n-- LIMIT n で取得件数を制限\n',
      solutionCode: 'SELECT * FROM users ORDER BY age DESC LIMIT 5;',
      expectedOutput: 'SELECT * FROM users ORDER BY age DESC LIMIT 5;',
      hints: [
        'ORDER BY age DESC で年齢の降順に並べます',
        'LIMIT 5 で結果を5件に制限します',
        'ASC(昇順)はデフォルトなので省略可能です',
        'OFFSET 10 LIMIT 5 で11〜15件目を取得できます',
      ],
      explanation:
        '複数カラムでソート: ORDER BY age DESC, name ASC（まず年齢で降順、同じなら名前で昇順）。OFFSET でスキップ: LIMIT 10 OFFSET 20 で21〜30件目を取得。ただし大量データのページネーションでは OFFSET は遅くなるため、keyset pagination（WHERE id > last_id ORDER BY id LIMIT 10）が高速です。SQL Serverでは LIMIT の代わりに TOP を使います。',
    },
    {
      id: 5,
      title: 'INSERT — データの挿入',
      difficulty: 'beginner',
      description:
        'INSERT INTO 文でテーブルに新しいレコードを追加します。VALUES 句でデータの値を指定します。カラム名を明示すると特定のカラムのみ値を指定でき、省略すると全カラムの値を順番通りに指定する必要があります。複数行を一度に挿入することもでき、INSERT ... SELECT で別テーブルのデータをコピーすることも可能です。',
      task: 'users テーブルに name="Bob", age=25, email="bob@example.com" のレコードを挿入してください。',
      initialCode: '-- 新しいユーザーを挿入\n-- INSERT INTO テーブル (カラム名) VALUES (値);\n-- 文字列はシングルクォートで囲みます\n',
      solutionCode: "INSERT INTO users (name, age, email) VALUES ('Bob', 25, 'bob@example.com');",
      expectedOutput: "INSERT INTO users (name, age, email) VALUES ('Bob', 25, 'bob@example.com');",
      hints: [
        'INSERT INTO テーブル (カラム) VALUES (値) の構文です',
        "文字列はシングルクォートで囲みます: 'Bob'",
        '数値はクォート不要です: 25',
        "複数行: VALUES ('A', 1), ('B', 2) で一括挿入可能です",
      ],
      explanation:
        "カラム名を省略すると全カラムの値を順番に指定する必要があり、テーブル変更時に壊れやすいため非推奨です。複数行挿入: INSERT INTO users (name) VALUES ('A'), ('B'), ('C'); で一括挿入できます。INSERT ... SELECT で別テーブルからのコピーも可能。PostgreSQLでは INSERT ... ON CONFLICT (email) DO UPDATE で upsert（存在すれば更新、なければ挿入）ができます。",
    },
    {
      id: 6,
      title: 'UPDATE — データの更新',
      difficulty: 'beginner',
      description:
        'UPDATE 文でテーブル内の既存レコードの値を変更します。SET句で更新するカラムと新しい値を指定し、WHERE句で対象レコードを限定します。WHERE を忘れると全レコードが更新される大事故になるため、本番環境では必ずトランザクション内で実行し、事前にSELECTで対象を確認してからUPDATEする習慣を付けましょう。',
      task: 'users テーブルの id=1 のユーザーの age を 30 に更新してください。WHERE句を忘れないこと。',
      initialCode: '-- id=1 のユーザーの年齢を更新\n-- UPDATE テーブル SET カラム = 値 WHERE 条件;\n-- WHERE を忘れると全行更新される！\n',
      solutionCode: 'UPDATE users SET age = 30 WHERE id = 1;',
      expectedOutput: 'UPDATE users SET age = 30 WHERE id = 1;',
      hints: [
        'UPDATE テーブル SET カラム = 値 WHERE 条件 の構文です',
        'WHERE を必ず付けることが最も重要！',
        '複数カラム: SET age = 30, name = "New" と書きます',
        '先に SELECT で対象を確認してから UPDATE するのが安全です',
      ],
      explanation:
        'WHERE なしの UPDATE は全レコードを更新する大事故の原因です。本番では先に SELECT * FROM users WHERE id = 1; で対象を確認 → BEGIN; で開始 → UPDATE → 結果確認 → COMMIT; の手順が安全です。複数カラムの同時更新: SET age = 30, name = "New"。UPDATE ... FROM ... で他テーブルの値を使った更新も可能です。',
    },
    {
      id: 7,
      title: 'DELETE — データの削除',
      difficulty: 'beginner',
      description:
        'DELETE FROM 文でテーブルからレコードを削除します。UPDATE と同様にWHERE句を忘れると全レコードが削除されます。実務では物理削除（DELETE）より論理削除（deleted_at カラムにタイムスタンプを記録）が推奨されます。TRUNCATE TABLE はDELETEよりも高速ですが、ロールバックができない場合があり、外部キー制約にも注意が必要です。',
      task: 'users テーブルから age が 18 未満のレコードを削除してください。WHERE句を忘れずに。',
      initialCode: '-- 18歳未満のユーザーを削除\n-- DELETE FROM テーブル WHERE 条件;\n-- WHERE を忘れると全行削除される！\n',
      solutionCode: 'DELETE FROM users WHERE age < 18;',
      expectedOutput: 'DELETE FROM users WHERE age < 18;',
      hints: [
        'DELETE FROM テーブル WHERE 条件 の構文です',
        'WHERE を必ず付けること（UPDATE と同様に重要）',
        'TRUNCATE TABLE で全行削除（高速だがロールバック不可の場合あり）',
        '実務では物理削除より論理削除（deleted_at カラム）が推奨されます',
      ],
      explanation:
        'DELETE はトランザクションログを記録しながら一行ずつ削除するため遅く、TRUNCATE はログを記録せず高速ですがロールバック不可のDBMSもあります。実務では物理削除より論理削除（deleted_at カラムにタイムスタンプ or is_deleted フラグ）が推奨されます。外部キー制約がある場合は ON DELETE CASCADE を考慮しないと削除エラーになります。',
    },
    {
      id: 8,
      title: '集約関数 (COUNT, SUM, AVG, MAX, MIN)',
      difficulty: 'beginner',
      description:
        '集約関数は複数行の値を1つの値にまとめる関数です。COUNT(行数), SUM(合計), AVG(平均), MAX(最大), MIN(最小)の5つが基本です。NULL値は COUNT(*) を除く全ての集約関数で無視されます。DISTINCT と組み合わせることで、一意な値に対して集計を行えます。集約関数はGROUP BY と組み合わせることでグループ単位の集計が可能です。',
      task: 'users テーブルのユーザー数、平均年齢、最高年齢を1つのクエリで求めてください。AS で別名を付けます。',
      initialCode: '-- ユーザー数、平均年齢、最高年齢を集約関数で計算\n-- COUNT, AVG, MAX を使います\n-- AS で列の別名を付けます\n',
      solutionCode: 'SELECT COUNT(*) AS user_count, AVG(age) AS avg_age, MAX(age) AS max_age FROM users;',
      expectedOutput: 'SELECT COUNT(*) AS user_count, AVG(age) AS avg_age, MAX(age) AS max_age FROM users;',
      hints: [
        'COUNT(*) は全行数を数えます',
        'AVG(age) で平均値、MAX(age) で最大値を計算します',
        'AS でエイリアス（別名）を付けて結果を分かりやすくします',
        'NULL値は COUNT(*) 以外の集約関数で無視されます',
      ],
      explanation:
        'COUNT(*) は全行数、COUNT(column) はNULL以外の行数を返します。DISTINCT と組み合わせ: COUNT(DISTINCT city) でユニーク都市数を取得。NULL は集約関数で無視されるため、AVG は NULL 行を除外して計算します。SUM(CASE WHEN status = "active" THEN 1 ELSE 0 END) のように条件付き集計も可能です。',
    },
    {
      id: 9,
      title: 'GROUP BY でグループ化',
      difficulty: 'beginner',
      description:
        'GROUP BY 句で特定カラムの値ごとにグループ化し、集約関数でグループ単位の統計を取ります。HAVING 句はGROUP BY 後のフィルタリングで、WHERE（GROUP BY 前のフィルタ）とは適用タイミングが異なります。SQL の実行順序は FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT であり、この順序を理解することでSQLの挙動が明確になります。',
      task: 'orders テーブルで customer_id ごとの注文数を集計し、3件以上の顧客だけ注文数の降順で表示してください。',
      initialCode: '-- 顧客ごとの注文数（3件以上のみ）\n-- GROUP BY でグループ化\n-- HAVING で集約結果をフィルタ\n-- ORDER BY で降順ソート\n',
      solutionCode: 'SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) >= 3\nORDER BY order_count DESC;',
      expectedOutput: 'SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) >= 3\nORDER BY order_count DESC;',
      hints: [
        'GROUP BY customer_id で顧客ごとにグループ化します',
        'HAVING は GROUP BY 後のフィルタリング（WHERE とは違う）',
        'WHERE は GROUP BY 前、HAVING は GROUP BY 後に評価されます',
        'ORDER BY order_count DESC で注文数の多い順に並べます',
      ],
      explanation:
        'WHERE は GROUP BY 前のフィルタ（個別行を絞る）、HAVING は GROUP BY 後のフィルタ（グループの集約結果を絞る）です。SQL実行順序: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。GROUP BY に含まないカラムをSELECTすると、PostgreSQLやSQL Serverではエラーになります（MySQLでは暗黙許可だが非推奨）。GROUP BY ROLLUP/CUBE で小計・総計も生成できます。',
    },
    {
      id: 10,
      title: 'DISTINCT とNULLの扱い',
      difficulty: 'beginner',
      description:
        'DISTINCT で結果から重複行を排除します。NULLは「値が不明」または「値が存在しない」を表す特殊な値で、通常の比較演算（=, <>）では判定できません。NULL = NULL は TRUE ではなく UNKNOWN になるため、NULL の判定には IS NULL / IS NOT NULL を使います。三値論理（TRUE, FALSE, UNKNOWN）の理解はSQLでバグを防ぐために重要です。',
      task: 'users テーブルからユニークな city の一覧を取得するクエリと、email が NULL のユーザーを抽出するクエリを書いてください。',
      initialCode: '-- ユニークな都市一覧を取得\n-- DISTINCT で重複排除\n\n-- email が NULL のユーザーを抽出\n-- IS NULL を使うこと（= NULL はNG）\n',
      solutionCode: 'SELECT DISTINCT city FROM users;\n\nSELECT * FROM users WHERE email IS NULL;',
      expectedOutput: 'SELECT DISTINCT city FROM users;\n\nSELECT * FROM users WHERE email IS NULL;',
      hints: [
        'SELECT DISTINCT カラム で重複を排除します',
        'NULL の比較は IS NULL / IS NOT NULL を使います',
        'WHERE email = NULL は常にUNKNOWN（意図通り動きません）',
        'COALESCE(email, "なし") で NULL にデフォルト値を設定できます',
      ],
      explanation:
        'NULL = NULL は TRUE ではなく UNKNOWN になります。これはSQLの三値論理（TRUE, FALSE, UNKNOWN）によるものです。COALESCE(email, "なし") で NULL にデフォルト値を設定でき、NULLIF(a, b) は a=b なら NULL を返します。DISTINCT は NULL を1つのグループとして扱い、GROUP BY でも同様です。IFNULL(MySQL) / NVL(Oracle) も COALESCE と同様の機能です。',
    },
    // ==================== 中級 (11-20) ====================
    {
      id: 11,
      title: 'INNER JOIN — テーブル結合',
      difficulty: 'intermediate',
      description:
        'INNER JOIN で2つのテーブルを共通カラムで結合し、両方のテーブルにマッチするレコードのみを取得します。リレーショナルデータベースの正規化により分割されたテーブルを再結合するための最も基本的な操作です。ON句で結合条件を指定し、テーブルにはエイリアス（別名）を付けてカラム名の曖昧さを解消します。結合条件を間違えるとカーテシアン積（全組み合わせ）になるため注意が必要です。',
      task: 'users と orders テーブルを user_id で結合し、ユーザー名、注文日、金額を取得してください。テーブルにエイリアスを付けます。',
      initialCode: '-- users と orders を INNER JOIN で結合\n-- テーブルにエイリアス(u, o)を付ける\n-- ON 句で結合条件を指定\n',
      solutionCode: 'SELECT u.name, o.order_date, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;',
      expectedOutput: 'SELECT u.name, o.order_date, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;',
      hints: [
        'INNER JOIN テーブル ON 結合条件 の構文です',
        'u, o はテーブルのエイリアス（短い別名）です',
        'ON u.id = o.user_id で結合キーを指定します',
        '両方に存在するレコードのみ返されます（片方にないデータは含まれません）',
      ],
      explanation:
        'JOIN の種類: INNER JOIN（両方に存在するレコードのみ）、LEFT JOIN（左テーブルは全部 + 右にマッチがあれば結合）、RIGHT JOIN（右テーブルは全部）、FULL OUTER JOIN（両方の全レコード）、CROSS JOIN（直積 = 全組み合わせ）。ON の条件を間違えるとカーテシアン積（行数が爆発）になるので注意。3テーブル以上の結合も FROM a JOIN b ON ... JOIN c ON ... で連結できます。',
    },
    {
      id: 12,
      title: 'LEFT JOIN と OUTER JOIN',
      difficulty: 'intermediate',
      description:
        'LEFT JOIN（LEFT OUTER JOIN）は左テーブルの全レコードを保持し、右テーブルにマッチしないレコードはNULLで埋められます。「この一覧を全部出して、関連データがあれば付加する」というパターンに最適です。COALESCE関数でNULLをデフォルト値に変換し、CASE式で存在判定も行えます。RIGHT JOIN は LEFT JOIN の左右入替と同じなので、可読性のためLEFT JOINだけ使うのが推奨です。',
      task: '全ユーザーの一覧を表示し、注文がある場合は注文情報も含めてください。注文がないユーザーもNULLとして表示します。',
      initialCode: '-- 全ユーザー + 注文（あれば）\n-- LEFT JOIN で左テーブルの全レコードを保持\n-- COALESCE で NULL をデフォルト値に\n',
      solutionCode: "SELECT u.name, COALESCE(o.total, 0) AS total, \n       CASE WHEN o.id IS NULL THEN 'No orders' ELSE 'Has orders' END AS status\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;",
      expectedOutput: "SELECT u.name, COALESCE(o.total, 0) AS total,\n       CASE WHEN o.id IS NULL THEN 'No orders' ELSE 'Has orders' END AS status\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;",
      hints: [
        'LEFT JOIN で左テーブル(users)の全レコードを保持します',
        'COALESCE(o.total, 0) で NULL を 0 に変換します',
        'CASE WHEN o.id IS NULL THEN ... で注文有無を判定できます',
        'RIGHT JOIN は LEFT JOIN の左右を入れ替えたものと同じです',
      ],
      explanation:
        'LEFT JOIN は「この一覧を全部出して、関連データがあれば付加」というパターンに最適です。RIGHT JOIN は LEFT JOIN の左右入替と同じなので、LEFT JOIN だけ使うのが可読性のベストプラクティスです。FULL OUTER JOIN は両テーブルの全レコードを返し、一致しない行はNULLで埋めます（MySQL は非対応、UNION で代用）。LEFT JOIN + WHERE right.id IS NULL で「右テーブルに存在しないレコード」の抽出が可能です。',
    },
    {
      id: 13,
      title: 'サブクエリ',
      difficulty: 'intermediate',
      description:
        'サブクエリ（副問合せ）はクエリの中にネストしたクエリです。WHERE句（条件として）、FROM句（派生テーブルとして）、SELECT句（スカラーサブクエリとして）のいずれでも使えます。外側のクエリのカラムを参照する「相関サブクエリ」は行ごとに実行されるためパフォーマンスに注意が必要です。多くの場合、サブクエリはJOINやCTEで書き換え可能で、そちらの方が可読性・性能に優れることが多いです。',
      task: '平均年齢以上のユーザーをサブクエリで取得してください。WHERE句にSELECTをネストします。',
      initialCode: '-- 平均年齢以上のユーザーをサブクエリで取得\n-- WHERE age >= (SELECT ...)\n-- サブクエリは () で囲みます\n',
      solutionCode: 'SELECT name, age\nFROM users\nWHERE age >= (SELECT AVG(age) FROM users);',
      expectedOutput: 'SELECT name, age\nFROM users\nWHERE age >= (SELECT AVG(age) FROM users);',
      hints: [
        '(SELECT AVG(age) FROM users) がサブクエリです',
        'WHERE句に単一値を返すサブクエリ（スカラーサブクエリ）を使用します',
        'サブクエリが複数値を返す場合は IN を使います',
        'FROM句のサブクエリは「派生テーブル」として使えます',
      ],
      explanation:
        'サブクエリの種類: スカラー（1値を返す, = で比較）、行（1行を返す）、テーブル（複数行を返す, IN/EXISTS で使用）、相関サブクエリ（外側のクエリのカラムを参照, 行ごとに実行）。EXISTS は行の存在チェック、IN は値リストのマッチング。パフォーマンスではJOINやCTEの方が良い場合が多く、EXPLAIN で実行計画を確認して判断しましょう。',
    },
    {
      id: 14,
      title: 'EXISTS と IN',
      difficulty: 'intermediate',
      description:
        'EXISTS はサブクエリが1行以上返すかどうかをチェックし、IN はサブクエリの結果リストに値が含まれるかをチェックします。EXISTS は見つかった時点で探索を打ち切るため、大量データでは IN より高速な場合があります。重要な注意点として、NOT IN のサブクエリ結果に NULL が含まれると予期しない結果（空集合）になるため、NOT EXISTS の方が安全です。',
      task: '注文が1件以上あるユーザーを EXISTS を使った相関サブクエリで取得してください。',
      initialCode: '-- 注文があるユーザー（EXISTS）\n-- EXISTS (SELECT 1 FROM ... WHERE ...)\n-- SELECT 1 は定数で十分（中身は不問）\n',
      solutionCode: 'SELECT u.name\nFROM users u\nWHERE EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n);',
      expectedOutput: 'SELECT u.name\nFROM users u\nWHERE EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n);',
      hints: [
        'EXISTS (SELECT 1 FROM ... WHERE ...) で存在チェックします',
        'SELECT 1 は定数で十分です（中身は不問）',
        'NOT EXISTS で「存在しない」の判定ができます',
        'NOT IN + NULL は空集合になるため NOT EXISTS の方が安全です',
      ],
      explanation:
        'EXISTS は見つかった時点で探索を打ち切るため、大量データでは IN より高速な場合があります。NOT EXISTS は「存在しない」の判定に安全に使えます。IN の落とし穴: NOT IN のサブクエリ結果にNULLが含まれると、三値論理により全行がUNKNOWNとなり空集合が返ります。そのため NOT EXISTS を使う方が安全で、多くのDBMSで最適化されます。',
    },
    {
      id: 15,
      title: 'CASE 式',
      difficulty: 'intermediate',
      description:
        'CASE 式はSQLにおける条件分岐で、プログラミング言語のif-elseに相当します。SELECT, WHERE, ORDER BY, GROUP BY, UPDATE SET のどこでも使用可能です。検索CASE（WHEN条件 THEN値）と単純CASE（CASE column WHEN value THEN値）の2形式があります。集約関数内でも使用できるため、SUM(CASE WHEN ... THEN 1 ELSE 0 END) のような条件付き集計で非常に便利です。',
      task: 'users の age を元に "未成年"(20未満), "成人"(20-64), "シニア"(65以上) に分類するクエリを書いてください。',
      initialCode: '-- 年齢でカテゴリ分け\n-- CASE WHEN 条件 THEN 値 ... ELSE 値 END\n-- AS でカテゴリカラムに名前を付ける\n',
      solutionCode: "SELECT name, age,\n    CASE\n        WHEN age < 20 THEN '未成年'\n        WHEN age < 65 THEN '成人'\n        ELSE 'シニア'\n    END AS category\nFROM users;",
      expectedOutput: "SELECT name, age,\n    CASE\n        WHEN age < 20 THEN '未成年'\n        WHEN age < 65 THEN '成人'\n        ELSE 'シニア'\n    END AS category\nFROM users;",
      hints: [
        'CASE WHEN 条件 THEN 値 ... END の構文です',
        'ELSE はどの条件にもマッチしない時のデフォルト値です',
        'WHEN は上から順に評価され、最初にマッチした値が返されます',
        '集約関数内でも使用可: SUM(CASE WHEN ... THEN 1 ELSE 0 END)',
      ],
      explanation:
        'CASE は SELECT, WHERE, ORDER BY, GROUP BY, UPDATE SET のどこでも使えます。単純CASE: CASE column WHEN value1 THEN result1 WHEN value2 THEN result2 END。集約関数内: SUM(CASE WHEN status = "active" THEN 1 ELSE 0 END) でアクティブ数を集計。ORDER BY CASE WHEN priority = "high" THEN 1 WHEN priority = "medium" THEN 2 ELSE 3 END でカスタムソートも可能です。',
    },
    {
      id: 16,
      title: 'UNION と集合演算',
      difficulty: 'intermediate',
      description:
        'UNION で複数のSELECTクエリの結果を縦に結合します。UNION は重複行を排除し、UNION ALL は重複を含みます。UNION は内部的にソート+重複排除が行われるためコストが高く、重複が問題にならない場合は UNION ALL を使うのが高速です。INTERSECT（共通部分）と EXCEPT（差集合、Oracleでは MINUS）もあります。結合するクエリはカラム数と型を一致させる必要があります。',
      task: 'employees テーブルと contractors テーブルを UNION ALL で結合し、種別を付けて名前順に表示してください。',
      initialCode: '-- 社員と契約社員を統合\n-- UNION ALL で重複を含めて結合\n-- 定数カラムで種別を区別\n-- ORDER BY で名前順\n',
      solutionCode: "SELECT name, email, 'employee' AS type FROM employees\nUNION ALL\nSELECT name, email, 'contractor' AS type FROM contractors\nORDER BY name;",
      expectedOutput: "SELECT name, email, 'employee' AS type FROM employees\nUNION ALL\nSELECT name, email, 'contractor' AS type FROM contractors\nORDER BY name;",
      hints: [
        'UNION ALL は重複を含めて結合します（高速）',
        'UNION は重複排除するため遅くなります',
        '結合するクエリのカラム数と型を一致させる必要があります',
        'INTERSECT（共通部分）、EXCEPT（差集合）もあります',
      ],
      explanation:
        'UNION はソート + 重複排除でコストが高く、UNION ALL の方が高速です。重複排除が不要な場合は必ず UNION ALL を使いましょう。INTERSECT（共通部分）は2つのクエリ結果の両方に含まれる行を返し、EXCEPT/MINUS（差集合）は最初のクエリにあって2番目にない行を返します。ORDER BY は最終結果に対して1つだけ指定でき、個々のSELECT文には付けられません。',
    },
    {
      id: 17,
      title: 'CREATE TABLE と制約',
      difficulty: 'intermediate',
      description:
        'CREATE TABLE でテーブルの構造（スキーマ）を定義します。制約(Constraint)によりデータの整合性を保証します: PRIMARY KEY（主キー、一意+NOT NULL）、FOREIGN KEY（外部キー、参照整合性）、NOT NULL（NULL禁止）、UNIQUE（重複禁止）、CHECK（値の範囲チェック）、DEFAULT（初期値）。適切な制約設計はアプリケーション層のバグからもデータを守る最後の砦です。',
      task: 'id(主キー/自動採番), name(NOT NULL), email(UNIQUE/NOT NULL), age(0以上), created_at(デフォルト現在時刻) を持つ users テーブルを作成してください。',
      initialCode: '-- users テーブルを作成\n-- 主キー、NOT NULL、UNIQUE、CHECK、DEFAULT 制約を設定\n-- PostgreSQL: SERIAL で自動採番\n',
      solutionCode: 'CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    age INT CHECK (age >= 0),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);',
      expectedOutput: 'CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    age INT CHECK (age >= 0),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);',
      hints: [
        'SERIAL は PostgreSQL の自動採番型です（MySQL: AUTO_INCREMENT）',
        'PRIMARY KEY は一意 + NOT NULL の複合制約です',
        'CHECK (age >= 0) で値の範囲を制限します',
        'DEFAULT CURRENT_TIMESTAMP で作成日時を自動記録します',
      ],
      explanation:
        'MySQL: AUTO_INCREMENT で自動採番、PostgreSQL: SERIAL/GENERATED ALWAYS AS IDENTITY。主要データ型: VARCHAR(n)(可変長文字列), TEXT(制限なし), INT(整数), BIGINT(大整数), DECIMAL(10,2)(精度付き小数), BOOLEAN, DATE, TIMESTAMP, JSON/JSONB。制約はデータ整合性の最後の砦であり、アプリケーション層のバグ時でも不正データの挿入を防ぎます。ALTER TABLE でテーブル定義の後からの変更も可能です。',
    },
    {
      id: 18,
      title: '外部キーとリレーション',
      difficulty: 'intermediate',
      description:
        'FOREIGN KEY制約で他テーブルへの参照整合性を保証します。存在しないユーザーIDで注文を作成しようとするとエラーになり、データの一貫性が守られます。1対多（ユーザー:注文）、多対多（ユーザー:タグ → 中間テーブル）のリレーションを設計します。ON DELETE / ON UPDATE で親レコード変更時の子レコードの振る舞いを制御します。',
      task: 'orders テーブルを作成し、users テーブルへの外部キー制約と CASCADE DELETE を設定してください。',
      initialCode: '-- orders テーブル（外部キー付き）\n-- FOREIGN KEY でusersテーブルを参照\n-- ON DELETE CASCADE で親削除時に子も削除\n',
      solutionCode: 'CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    product_name VARCHAR(200) NOT NULL,\n    total DECIMAL(10, 2) NOT NULL,\n    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);',
      expectedOutput: 'CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT NOT NULL,\n    product_name VARCHAR(200) NOT NULL,\n    total DECIMAL(10, 2) NOT NULL,\n    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);',
      hints: [
        'FOREIGN KEY (col) REFERENCES table(col) で外部キーを設定します',
        'ON DELETE CASCADE で親レコード削除時に子も連鎖削除されます',
        'ON DELETE SET NULL で親削除時にNULLを設定します',
        '多対多リレーションには中間テーブル(user_tags等)が必要です',
      ],
      explanation:
        'ON DELETE オプション: CASCADE(連鎖削除), SET NULL(NULLに設定), RESTRICT(削除拒否/即時), NO ACTION(削除拒否/遅延, デフォルト)。ON UPDATE も同様のオプションがあります。多対多はJOINテーブル(中間テーブル)で実装: CREATE TABLE user_tags (user_id INT REFERENCES users(id), tag_id INT REFERENCES tags(id), PRIMARY KEY(user_id, tag_id))。外部キーには自動的にインデックスが作成されるDBMS(MySQL)とされないDBMS(PostgreSQL)があり、性能に影響します。',
    },
    {
      id: 19,
      title: 'INDEX — インデックス',
      difficulty: 'intermediate',
      description:
        'インデックスは検索を高速化するデータ構造です。多くのDBMSではB-Tree（バランス木）が使われ、O(log n) の検索性能を実現します。WHERE, JOIN, ORDER BY のカラムにインデックスを設定すると効果的です。ただし INSERT/UPDATE/DELETE 時にインデックスの更新コストが発生するため、読み取りが多いカラムに設定するのが基本戦略です。複合インデックスは左端のカラムから順に使われます。',
      task: 'users テーブルの email カラムと、orders テーブルの (user_id, order_date) に複合インデックスを作成してください。',
      initialCode: '-- インデックスの作成\n-- CREATE INDEX 名前 ON テーブル (カラム);\n-- 複合インデックスは複数カラムを指定\n',
      solutionCode: 'CREATE INDEX idx_users_email ON users (email);\n\nCREATE INDEX idx_orders_user_date ON orders (user_id, order_date DESC);',
      expectedOutput: 'CREATE INDEX idx_users_email ON users (email);\n\nCREATE INDEX idx_orders_user_date ON orders (user_id, order_date DESC);',
      hints: [
        'CREATE INDEX 名前 ON テーブル (カラム) の構文です',
        '複合インデックスは左端のカラムから順に使われます',
        'DESC を指定すると降順ソートに最適化されます',
        'WHERE句付きの部分インデックスも作成可能です（PostgreSQL）',
      ],
      explanation:
        'B-Treeインデックスは O(log n) の検索を実現します。注意: INSERT/UPDATE/DELETE が遅くなるトレードオフがあります。複合インデックス (A, B, C) は A 単独、A+B、A+B+C の検索に効きますが、B単独やC単独では効きません（左端一致原則）。PostgreSQL: 部分インデックス(CREATE INDEX ... WHERE status = "active")やGINインデックス（JSONBや全文検索）も活用できます。EXPLAIN でクエリプランを確認する習慣がパフォーマンスチューニングの基本です。',
    },
    {
      id: 20,
      title: 'EXPLAIN — クエリプラン',
      difficulty: 'intermediate',
      description:
        'EXPLAIN でデータベースエンジンのクエリ実行計画を確認し、スロークエリの原因を特定します。EXPLAIN ANALYZE は実際にクエリを実行して正確な行数と時間を表示します。Seq Scan（全行スキャン）はインデックスが使われていない兆候で、Index Scan に変えることで大幅に高速化できる場合があります。実行計画の読み方を習得することはDBA・バックエンドエンジニアの必修スキルです。',
      task: 'EXPLAIN ANALYZE を使ってJOIN+WHERE+GROUP BY+HAVINGクエリの実行計画を確認してください。',
      initialCode: '-- EXPLAIN ANALYZE でクエリプランを確認\n-- Seq Scan vs Index Scan を確認\n-- 実際の実行時間も表示される\n',
      solutionCode: "EXPLAIN ANALYZE\nSELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.age >= 20\nGROUP BY u.name\nHAVING COUNT(o.id) >= 2;",
      expectedOutput: "EXPLAIN ANALYZE\nSELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.age >= 20\nGROUP BY u.name\nHAVING COUNT(o.id) >= 2;",
      hints: [
        'EXPLAIN ANALYZE で実際の実行時間も表示されます',
        'Seq Scan はフルスキャン（大きいテーブルでは遅い）',
        'Index Scan はインデックスが使われている証拠です',
        'Hash Join, Nested Loop, Merge Join など結合方式も確認できます',
      ],
      explanation:
        '注目ポイント: Seq Scan(全行スキャン, インデックス未使用) vs Index Scan(インデックス使用)、Hash Join(ハッシュ結合, 等値結合向け) vs Nested Loop(ネストループ, 小さいテーブル向け)、rows(推定行数)。EXPLAIN (FORMAT JSON) でJSON形式の詳細出力も可能。N+1クエリ問題（ループ内で逐次クエリ）はJOINやサブクエリで解決します。スロークエリログ(slow_query_log)の活用も実務では重要です。',
    },
    // ==================== 上級 (21-30) ====================
    {
      id: 21,
      title: 'ウィンドウ関数 (ROW_NUMBER, RANK)',
      difficulty: 'advanced',
      description:
        'ウィンドウ関数は GROUP BY なしで集約計算とレコード単位の処理を同時に行える強力な機能です（SQL:2003標準）。OVER句で範囲（ウィンドウ）を指定し、PARTITION BY でグループ分け、ORDER BY で順序を指定します。ROW_NUMBER(連番), RANK(同順位あり+スキップ), DENSE_RANK(同順位あり+スキップなし) の3種類のランキング関数があり、レポート作成やデータ分析に不可欠です。',
      task: 'users を年齢順にランキングし、各ユーザーに ROW_NUMBER, RANK, DENSE_RANK を付けてください。',
      initialCode: '-- ランキング付きクエリ\n-- ROW_NUMBER() OVER (ORDER BY ...)\n-- RANK(), DENSE_RANK() の違いを確認\n',
      solutionCode: 'SELECT \n    name,\n    age,\n    ROW_NUMBER() OVER (ORDER BY age DESC) AS row_num,\n    RANK() OVER (ORDER BY age DESC) AS rank,\n    DENSE_RANK() OVER (ORDER BY age DESC) AS dense_rank\nFROM users;',
      expectedOutput: 'SELECT\n    name,\n    age,\n    ROW_NUMBER() OVER (ORDER BY age DESC) AS row_num,\n    RANK() OVER (ORDER BY age DESC) AS rank,\n    DENSE_RANK() OVER (ORDER BY age DESC) AS dense_rank\nFROM users;',
      hints: [
        '関数() OVER (ORDER BY カラム) の構文です',
        'ROW_NUMBER は常に一意な連番 (1,2,3,4)',
        'RANK は同値で同順位 + 次をスキップ (1,2,2,4)',
        'DENSE_RANK は同値で同順位 + スキップなし (1,2,2,3)',
      ],
      explanation:
        'ROW_NUMBER: 常に一意な連番(1,2,3,4)。RANK: 同値は同順位 + 次をスキップ(1,2,2,4)。DENSE_RANK: 同値は同順位 + スキップなし(1,2,2,3)。PARTITION BY で部門ごと、カテゴリごとなどグループ内ランキングも可能: ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)。NTILE(n) で行をn等分するバケットに振り分けることもできます。',
    },
    {
      id: 22,
      title: 'ウィンドウ関数 (LAG, LEAD, SUM OVER)',
      difficulty: 'advanced',
      description:
        'LAG/LEADで前後の行の値を参照し、SUM() OVERで累計や移動平均を計算できます。LAG(col, n, default)はn行前（デフォルト1行前）の値を返し、前月比や成長率の計算に便利です。フレーム指定（ROWS BETWEEN ... AND ...）で集計範囲を細かく制御でき、移動平均や累計の計算も簡単に記述できます。ウィンドウ関数はBI（ビジネスインテリジェンス）レポートの必須ツールです。',
      task: '月次売上テーブルで各月の売上額、前月との差額、累計売上を1つのクエリで計算してください。',
      initialCode: '-- 前月比と累計売上\n-- LAG() で前の行の値を参照\n-- SUM() OVER で累計計算\n-- ROWS UNBOUNDED PRECEDING で先頭から\n',
      solutionCode: 'SELECT \n    month,\n    revenue,\n    revenue - LAG(revenue) OVER (ORDER BY month) AS diff_from_prev,\n    SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS cumulative\nFROM monthly_sales;',
      expectedOutput: 'SELECT\n    month,\n    revenue,\n    revenue - LAG(revenue) OVER (ORDER BY month) AS diff_from_prev,\n    SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS cumulative\nFROM monthly_sales;',
      hints: [
        'LAG(column) OVER (...) で前の行の値を取得します',
        'LEAD(column) OVER (...) で次の行の値を取得します',
        'ROWS UNBOUNDED PRECEDING で先頭行からの累計を計算します',
        'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW で3行の移動平均',
      ],
      explanation:
        'LAG(col, n, default): n行前の値を返します（デフォルト1行前）。default引数を指定すると最初の行でNULLにならず便利です。LEAD: n行後の値を返します。フレーム指定: ROWS BETWEEN 2 PRECEDING AND CURRENT ROW で直近3行の移動平均。RANGE BETWEEN で値ベースの範囲指定もできます。ウィンドウ関数はレポート作成の強力なツールで、GROUP BYでは実現困難な行レベルの集約処理を記述できます。',
    },
    {
      id: 23,
      title: 'CTE (Common Table Expression)',
      difficulty: 'advanced',
      description:
        'WITH句（CTE: Common Table Expression）で名前付きの一時的な結果セットを定義し、可読性の高い複雑なクエリを段階的に構築できます。サブクエリの代替として使われ、1つのクエリ内で複数のCTEをカンマで連結できます。CTEは同じクエリ内で複数回参照可能で、再帰CTE（WITH RECURSIVE）で階層構造の走査も実現できます。可読性と保守性の面でサブクエリより優れた選択肢です。',
      task: 'CTE で顧客ごとの注文集計を行い、さらにランキングを付けて上位10顧客を抽出してください。段階的に構築します。',
      initialCode: '-- CTE で段階的に集計\n-- WITH 名前1 AS (...), 名前2 AS (...)\n-- メインクエリで最終結果を取得\n',
      solutionCode: "WITH customer_stats AS (\n    SELECT \n        u.id,\n        u.name,\n        COUNT(o.id) AS order_count,\n        SUM(o.total) AS total_spent\n    FROM users u\n    JOIN orders o ON u.id = o.user_id\n    GROUP BY u.id, u.name\n),\nranked AS (\n    SELECT *,\n        RANK() OVER (ORDER BY total_spent DESC) AS spending_rank\n    FROM customer_stats\n)\nSELECT name, order_count, total_spent, spending_rank\nFROM ranked\nWHERE spending_rank <= 10;",
      expectedOutput: "WITH customer_stats AS (...),\nranked AS (...)\nSELECT ... FROM ranked WHERE spending_rank <= 10;",
      hints: [
        'WITH 名前 AS (クエリ) ... SELECT ... の構文です',
        '複数CTEはカンマで連結します',
        'CTEは同じクエリ内で複数回参照可能です',
        'サブクエリより可読性が高く保守しやすいです',
      ],
      explanation:
        'CTEはサブクエリの代替で可読性が高く、段階的にデータを変換するパイプライン処理に適しています。WITH RECURSIVE で再帰クエリも可能（階層構造の走査等）。PostgreSQLではCTEが暗黙にマテリアライズされることがあり、NOT MATERIALIZED ヒントで制御できます。MySQL 8.0+, PostgreSQL, SQL Server, Oracle 全てでCTEがサポートされています。実務では複雑なレポートクエリの可読性向上に頻繁に使われます。',
    },
    {
      id: 24,
      title: '再帰CTE',
      difficulty: 'advanced',
      description:
        'WITH RECURSIVE で自己参照する再帰クエリを書けます。ベースケース（再帰の起点）と再帰ケース（自己参照）を UNION ALL で結合します。階層構造（組織図、カテゴリツリー）、グラフの走査、連番生成、日付シーケンスの生成に使われます。無限ループ防止のためにdepth制限やCYCLE句（PostgreSQL 14+）を設定することが重要です。',
      task: '部門テーブル(departments)の階層構造(parent_id)を再帰CTEでツリー表示してください。深さとパスも出力します。',
      initialCode: '-- 部門の階層をツリー表示\n-- WITH RECURSIVE でベースケース + 再帰ケース\n-- depth で深さ、path で経路を追跡\n',
      solutionCode: "WITH RECURSIVE dept_tree AS (\n    SELECT id, name, parent_id, 0 AS depth,\n           CAST(name AS VARCHAR(500)) AS path\n    FROM departments\n    WHERE parent_id IS NULL\n    \n    UNION ALL\n    \n    SELECT d.id, d.name, d.parent_id, dt.depth + 1,\n           CAST(dt.path || ' > ' || d.name AS VARCHAR(500))\n    FROM departments d\n    JOIN dept_tree dt ON d.parent_id = dt.id\n)\nSELECT REPEAT('  ', depth) || name AS tree_view, path\nFROM dept_tree\nORDER BY path;",
      expectedOutput: "WITH RECURSIVE dept_tree AS (\n    -- base case\n    UNION ALL\n    -- recursive case\n)\nSELECT ... FROM dept_tree;",
      hints: [
        '最初のSELECTがベースケース（parent_id IS NULL = ルートノード）',
        'UNION ALL 後のSELECTが再帰ステップ（子ノードを辿る）',
        'depth + 1 で階層の深さを追跡します',
        '|| で文字列連結してパスを構築します（PostgreSQL）',
      ],
      explanation:
        '再帰CTEの構造: ベースケース(非再帰, 起点) UNION ALL 再帰ケース(自己参照, CTE自身をJOIN)。無限ループ防止: WHERE depth < 100 やPostgreSQL 14+の CYCLE句。活用例: 連番生成(1から100)、日付シーケンス(月初の一覧)、組織図、カテゴリツリー、最短経路探索。MySQL 8.0+, PostgreSQL, SQL Server, Oracle 全てで WITH RECURSIVE がサポートされています。',
    },
    {
      id: 25,
      title: 'トランザクションとACID',
      difficulty: 'advanced',
      description:
        'トランザクションは一連のSQL操作をアトミック（全て成功 or 全て取消）に実行する仕組みです。ACID特性: Atomicity(原子性—全て成功か全て失敗), Consistency(一貫性—制約を常に満たす), Isolation(分離性—同時実行する他トランザクションの影響を受けない), Durability(永続性—コミット後はクラッシュしても失われない)。分離レベルの選択はパフォーマンスとデータ整合性のトレードオフです。',
      task: '送金処理をトランザクションで実装してください。FOR UPDATE で行ロックを取得し、残高不足時はロールバックします。',
      initialCode: '-- 送金トランザクション\n-- BEGIN で開始\n-- FOR UPDATE で行ロック\n-- COMMIT で確定、問題時は ROLLBACK\n',
      solutionCode: "BEGIN;\n\n-- 送金元の残高確認（行ロック）\nSELECT balance FROM accounts WHERE id = 1 FOR UPDATE;\n\n-- 残高が十分な場合のみ実行\nUPDATE accounts SET balance = balance - 1000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 1000 WHERE id = 2;\n\n-- 送金元の残高が0未満になっていないか確認\n-- 問題なければ確定、問題あればロールバック\nCOMMIT;\n-- もしエラーなら: ROLLBACK;",
      expectedOutput: "BEGIN;\nUPDATE accounts ... ;\nUPDATE accounts ... ;\nCOMMIT;",
      hints: [
        'BEGIN で開始、COMMIT で確定、ROLLBACK で取消します',
        'SELECT ... FOR UPDATE で対象行をロックします',
        '他のトランザクションはロック解除まで待機します',
        'SAVEPOINT で部分的にロールバックすることも可能です',
      ],
      explanation:
        'ACID: Atomicity(原子性—一部だけ成功はない), Consistency(一貫性—制約違反は許さない), Isolation(分離性—他トランザクションの影響を受けない), Durability(永続性—コミット後は永続化)。分離レベル: READ UNCOMMITTED(ダーティリード可), READ COMMITTED(PostgreSQLデフォルト), REPEATABLE READ(MySQLデフォルト), SERIALIZABLE(最も厳密)。分離レベルが高いほどデッドロックのリスクが増し、パフォーマンスが低下します。',
    },
    {
      id: 26,
      title: '正規化 (1NF, 2NF, 3NF)',
      difficulty: 'advanced',
      description:
        '正規化はデータの冗長性を排除し、更新時異常（挿入異常、更新異常、削除異常）を防ぐためのテーブル設計手法です。第一正規形(1NF): 各セルに1値（繰り返しグループなし）。第二正規形(2NF): 非キー属性は主キー全体に完全関数従属。第三正規形(3NF): 非キー属性間の推移的関数従属なし。ただし過度な正規化はJOIN増加による性能低下を招くため、適度な非正規化とのバランスが重要です。',
      task: '非正規化されたordersテーブル(id, customer_name, customer_email, product_name, product_price, quantity)を第三正規形(3NF)に分解してください。',
      initialCode: '-- 非正規形:\n-- orders(id, customer_name, customer_email, product_name, product_price, quantity)\n-- これを 3NF に分解する\n-- 各テーブルに適切な制約を設定\n',
      solutionCode: '-- 顧客テーブル (3NF)\nCREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL\n);\n\n-- 商品テーブル (3NF)\nCREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(200) NOT NULL,\n    price DECIMAL(10, 2) NOT NULL\n);\n\n-- 注文テーブル (3NF)\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id),\n    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 注文明細テーブル (3NF)\nCREATE TABLE order_items (\n    id SERIAL PRIMARY KEY,\n    order_id INT REFERENCES orders(id),\n    product_id INT REFERENCES products(id),\n    quantity INT NOT NULL CHECK (quantity > 0)\n);',
      expectedOutput: 'CREATE TABLE customers (...);\nCREATE TABLE products (...);\nCREATE TABLE orders (...);\nCREATE TABLE order_items (...);',
      hints: [
        '1NF: 各セルに1値（繰り返しグループを別テーブルに分離）',
        '2NF: 非キー属性は主キー全体に完全関数従属させる',
        '3NF: 非キー属性間の推移的関数従属を排除する',
        '過度な正規化はJOIN増加で性能低下を招くことがあります',
      ],
      explanation:
        '正規化の段階: 1NF(各セルに1値、繰り返しなし) → 2NF(部分関数従属の排除) → 3NF(推移的関数従属の排除) → BCNF(全ての決定要因が候補キー)。実務では3NFまでが一般的です。非正規化が有効な場面: 読み取り性能優先のレポート用テーブル、キャッシュテーブル、マテリアライズドビュー。Star Schema（ファクト+ディメンション）はDWH設計の定番で、意図的に非正規化しています。',
    },
    {
      id: 27,
      title: 'ビューとマテリアライズドビュー',
      difficulty: 'advanced',
      description:
        'ビュー(VIEW)は仮想テーブルで、複雑なクエリを名前付きで保存し簡潔に再利用できます。SELECT の度にクエリが実行されるため、常に最新データが返ります。マテリアライズドビュー(MATERIALIZED VIEW, PostgreSQL)は結果を物理的に保存するため高速ですが、元データ更新時にREFRESHが必要です。ビューによるセキュリティ制御（特定カラムのみ公開）も実務で活用されます。',
      task: '顧客ごとの注文サマリー（注文数、合計金額、最終注文日）をビューとして作成し、使用例も示してください。',
      initialCode: '-- 注文サマリービューを作成\n-- CREATE VIEW 名前 AS SELECT ...\n-- ビューをテーブルのように使う\n',
      solutionCode: 'CREATE VIEW customer_summary AS\nSELECT \n    u.id,\n    u.name,\n    COUNT(o.id) AS total_orders,\n    COALESCE(SUM(o.total), 0) AS total_spent,\n    MAX(o.order_date) AS last_order_date\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name;\n\n-- 使用例\nSELECT * FROM customer_summary WHERE total_spent > 10000;',
      expectedOutput: 'CREATE VIEW customer_summary AS\nSELECT ... FROM users u LEFT JOIN orders o ...\nGROUP BY u.id, u.name;',
      hints: [
        'CREATE VIEW 名前 AS SELECT ... で定義します',
        'ビューは SELECT の度にクエリが実行されます',
        'マテリアライズドビューは結果を物理保存して高速化します',
        'DROP VIEW 名前; でビューを削除できます',
      ],
      explanation:
        'ビューの利点: 複雑なクエリの簡潔化、セキュリティ（特定カラムのみ公開）、論理的データ独立性。マテリアライズドビュー(PostgreSQL): CREATE MATERIALIZED VIEW ... でデータを物理保存し高速にアクセス。REFRESH MATERIALIZED VIEW で更新が必要です。CONCURRENTLY オプションでロックなしの更新も可能。MySQL にはマテリアライズドビューがないため、定期更新テーブルで代用します。',
    },
    {
      id: 28,
      title: 'ストアドプロシージャと関数',
      difficulty: 'advanced',
      description:
        'ストアドプロシージャ/関数はDB側に保存された処理ロジックで、複雑なビジネスロジックをDB層に移動できます。ネットワーク往復の削減、セキュリティ強化（直接テーブルアクセスを防ぐ）がメリットです。一方、デバッグの困難さ、DB製品への依存度増加がデメリットです。PostgreSQL では PL/pgSQL, PL/Python, PL/V8(JavaScript) 等の言語が使えます。',
      task: 'バリデーション付きのユーザー作成関数を PL/pgSQL で作成し、新規IDを返すようにしてください。',
      initialCode: '-- ユーザー作成関数\n-- CREATE FUNCTION でPL/pgSQL関数を定義\n-- バリデーション（年齢チェック）を含める\n-- RETURNING で新規IDを返す\n',
      solutionCode: "CREATE OR REPLACE FUNCTION create_user(\n    p_name VARCHAR,\n    p_email VARCHAR,\n    p_age INT\n) RETURNS INT AS $$\nDECLARE\n    new_id INT;\nBEGIN\n    IF p_age < 0 THEN\n        RAISE EXCEPTION 'Age must be non-negative';\n    END IF;\n    \n    INSERT INTO users (name, email, age)\n    VALUES (p_name, p_email, p_age)\n    RETURNING id INTO new_id;\n    \n    RETURN new_id;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- 使用例\nSELECT create_user('Alice', 'alice@example.com', 25);",
      expectedOutput: "CREATE OR REPLACE FUNCTION create_user(...) RETURNS INT AS $$ ... $$ LANGUAGE plpgsql;",
      hints: [
        'CREATE FUNCTION 名前(引数) RETURNS 型 AS $$ ... $$ LANGUAGE plpgsql',
        'DECLARE で変数を宣言、BEGIN...END で処理を記述します',
        'RAISE EXCEPTION でエラーを発生させます',
        'RETURNING id INTO new_id で INSERT の結果を変数に格納します',
      ],
      explanation:
        'ストアドプロシージャの利点: ネットワーク往復の削減（複数SQL文を1回の呼び出しで実行）、セキュリティ（直接テーブルアクセスを防ぐ）、トランザクション制御。欠点: デバッグ困難、DBMS依存性増加、バージョン管理が難しい。PostgreSQL: PL/pgSQL, PL/Python, PL/V8。MySQL: DELIMITER // ... CREATE PROCEDURE ... //。現在のトレンドではアプリケーション層にロジックを寄せる傾向がありますが、高頻度のデータ処理にはストアドが有効です。',
    },
    {
      id: 29,
      title: 'トリガー',
      difficulty: 'advanced',
      description:
        'トリガーはINSERT/UPDATE/DELETEの前後に自動実行される処理です。監査ログの自動記録、計算フィールドの自動更新、データの整合性チェックに使われます。BEFORE トリガーは操作前に値の検証・変更を行い、AFTER トリガーは操作後の記録・通知に使います。トリガーの内部でさらにDMLが実行されるとカスケード的に他のトリガーが発火する場合があり、設計には注意が必要です。',
      task: 'users テーブルへの全変更操作(INSERT/UPDATE/DELETE)を audit_log テーブルに自動記録するトリガーを作成してください。JSONBで変更前後のデータを保存します。',
      initialCode: '-- 監査ログトリガー\n-- audit_log テーブルを作成\n-- トリガー関数を定義\n-- トリガーを users テーブルに設定\n',
      solutionCode: "CREATE TABLE audit_log (\n    id SERIAL PRIMARY KEY,\n    table_name VARCHAR(50),\n    operation VARCHAR(10),\n    old_data JSONB,\n    new_data JSONB,\n    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE OR REPLACE FUNCTION audit_trigger_func()\nRETURNS TRIGGER AS $$\nBEGIN\n    INSERT INTO audit_log (table_name, operation, old_data, new_data)\n    VALUES (\n        TG_TABLE_NAME,\n        TG_OP,\n        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,\n        CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW)::jsonb ELSE NULL END\n    );\n    RETURN COALESCE(NEW, OLD);\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER users_audit\nAFTER INSERT OR UPDATE OR DELETE ON users\nFOR EACH ROW EXECUTE FUNCTION audit_trigger_func();",
      expectedOutput: "CREATE TABLE audit_log (...);\nCREATE FUNCTION audit_trigger_func() ...\nCREATE TRIGGER users_audit AFTER ... ON users ...;",
      hints: [
        'BEFORE（操作前の検証/変更）と AFTER（操作後の記録）があります',
        'TG_TABLE_NAME, TG_OP はトリガーの特殊変数です',
        'NEW は変更後の行データ、OLD は変更前の行データです',
        'FOR EACH ROW(行単位) と FOR EACH STATEMENT(文単位) があります',
      ],
      explanation:
        'トリガーのタイミング: BEFORE(処理前に検証/変更, NEW を修正可能), AFTER(処理後に記録/通知)。粒度: FOR EACH ROW(行単位で発火), FOR EACH STATEMENT(SQL文単位で発火)。特殊変数: TG_TABLE_NAME(テーブル名), TG_OP(操作種別), NEW(新しい行), OLD(古い行)。トリガーの乱用はデバッグの困難さ、予期しない副作用、パフォーマンス低下を引き起こすため、必要最小限に設計しましょう。',
    },
    {
      id: 30,
      title: 'パフォーマンスチューニング総合',
      difficulty: 'advanced',
      description:
        'SQLパフォーマンスチューニングの総合的な改善手法: EXPLAIN で実行計画を分析、適切なインデックス戦略（複合・部分・カバリングインデックス）、クエリの書き換え（IN→JOIN, SELECT *→必要カラム）、N+1問題の解決、パーティション分割、接続プーリング、Read レプリカでの読み書き分離。これらを組み合わせてクエリ応答時間を数千倍改善できる場合もあります。',
      task: '遅いクエリ（IN サブクエリ + SELECT * + ORDER BY + LIMIT なし）を分析し、インデックス作成とクエリ書き換えで最適化してください。',
      initialCode: "-- 遅いクエリ（改善前）:\nSELECT * FROM orders o\nWHERE o.user_id IN (\n    SELECT id FROM users WHERE created_at > '2024-01-01'\n)\nAND o.status = 'completed'\nORDER BY o.created_at DESC;\n\n-- 問題点を特定して最適化してください\n",
      solutionCode: "-- 最適化後:\n-- 1. 必要なカラムだけ SELECT\n-- 2. IN サブクエリを JOIN に書き換え\n-- 3. 部分インデックス + 複合インデックスを作成\n-- 4. LIMIT で取得件数を制限\n\nCREATE INDEX idx_orders_status_created \n    ON orders (status, created_at DESC)\n    WHERE status = 'completed';\n\nCREATE INDEX idx_users_created \n    ON users (created_at);\n\nSELECT o.id, o.total, o.created_at\nFROM orders o\nJOIN users u ON o.user_id = u.id\nWHERE u.created_at > '2024-01-01'\n  AND o.status = 'completed'\nORDER BY o.created_at DESC\nLIMIT 100;",
      expectedOutput: "CREATE INDEX ...;\nSELECT o.id, o.total, o.created_at\nFROM orders o JOIN users u ON ...\nWHERE ... ORDER BY ... LIMIT 100;",
      hints: [
        'SELECT * を避け必要なカラムだけ取得します',
        'IN サブクエリより JOIN が効率的な場合が多いです',
        '部分インデックス(WHERE条件付き)で不要な行を除外します',
        'LIMIT で取得件数を制限しソートコストを削減します',
      ],
      explanation:
        '最適化のチェックリスト: 1. EXPLAIN ANALYZE で実行計画を確認 2. SELECT * → 必要カラムのみ（ネットワーク転送量削減）3. 適切なインデックス（複合インデックスの左端一致、部分インデックス、カバリングインデックス）4. LIMIT で取得件数制限 5. N+1問題をJOINで解決 6. テーブルパーティション（大規模テーブルの範囲分割）7. 接続プーリング(PgBouncer等) 8. Read レプリカでR/W分離。これらの組み合わせで応答時間を劇的に改善できます。',
    },
  ],
};

export default course;
