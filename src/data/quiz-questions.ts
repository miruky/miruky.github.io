/**
 * IT知識クイズ用問題データ
 * Normal: 基本情報技術者レベル
 * Hard: 応用情報技術者レベル
 * Nightmare: スペシャリスト系試験レベル
 */

export type QuizDifficulty = 'normal' | 'hard' | 'nightmare';

export interface QuizQuestion {
  question: string;
  choices: string[];
  answer: number; // 0-indexed
  explanation: string;
}

const NORMAL_QUESTIONS: QuizQuestion[] = [
  {
    question: 'OSI参照モデルのトランスポート層は第何層か。',
    choices: ['第3層', '第4層', '第5層', '第6層'],
    answer: 1,
    explanation: 'トランスポート層はOSI参照モデルの第4層で、TCPやUDPが該当します。',
  },
  {
    question: 'CPUの性能指標で、1秒間に実行できる命令数を表す単位はどれか。',
    choices: ['FLOPS', 'MIPS', 'bps', 'Hz'],
    answer: 1,
    explanation: 'MIPS（Million Instructions Per Second）は1秒間に実行できる命令数（百万単位）を表します。',
  },
  {
    question: 'データベースにおいて、データの整合性を保つために設けるルールを何というか。',
    choices: ['インデックス', '制約（Constraint）', 'ビュー', 'トリガ'],
    answer: 1,
    explanation: '制約（Constraint）はデータの整合性を保つためのルールで、主キー制約、外部キー制約、NOT NULL制約などがあります。',
  },
  {
    question: 'TCP/IPモデルにおいて、IPアドレスの解決にARP（Address Resolution Protocol）が使われる。ARPが解決するのはどの対応か。',
    choices: ['IPアドレス → MACアドレス', 'MACアドレス → IPアドレス', 'ドメイン名 → IPアドレス', 'IPアドレス → ドメイン名'],
    answer: 0,
    explanation: 'ARPはIPアドレスからMACアドレスを解決するプロトコルです。逆はRARP、ドメイン名の解決はDNSです。',
  },
  {
    question: '2進数 10110101 を16進数に変換すると何か。',
    choices: ['B5', 'A5', 'B4', 'D5'],
    answer: 0,
    explanation: '1011 = B、0101 = 5 なので、10110101(2) = B5(16) です。',
  },
  {
    question: 'ソフトウェア開発モデルのうち、要件定義から保守まで順に進めるモデルはどれか。',
    choices: ['スパイラルモデル', 'プロトタイピングモデル', 'ウォーターフォールモデル', 'アジャイルモデル'],
    answer: 2,
    explanation: 'ウォーターフォールモデルは各工程を順番に進める開発モデルです。',
  },
  {
    question: 'SQLで、テーブルからすべてのレコードを取得する文はどれか。',
    choices: ['SELECT * FROM table_name;', 'GET ALL FROM table_name;', 'FETCH * FROM table_name;', 'READ ALL FROM table_name;'],
    answer: 0,
    explanation: 'SELECT * FROM table_name; ですべてのカラム・レコードを取得できます。',
  },
  {
    question: 'HTTPステータスコード404が示す意味はどれか。',
    choices: ['サーバ内部エラー', 'アクセス禁止', 'リソースが見つからない', 'リダイレクト'],
    answer: 2,
    explanation: '404 Not Found は、要求されたリソースが見つからなかったことを示します。',
  },
  {
    question: 'RAID1の特徴として正しいものはどれか。',
    choices: ['ストライピングにより高速化する', 'ミラーリングにより冗長性を確保する', 'パリティにより障害復旧する', 'データを圧縮して保存する'],
    answer: 1,
    explanation: 'RAID1はミラーリング方式で、同じデータを2台のディスクに書き込み冗長性を確保します。',
  },
  {
    question: 'プロジェクト管理において、作業の依存関係を矢印で表し、クリティカルパスを求める手法はどれか。',
    choices: ['ガントチャート', 'PERT', 'WBS', 'マインドマップ'],
    answer: 1,
    explanation: 'PERT（Program Evaluation and Review Technique）は工程間の依存関係を図示し、クリティカルパスを特定する手法です。',
  },
  {
    question: '公開鍵暗号方式で正しい説明はどれか。',
    choices: ['暗号化と復号に同じ鍵を使う', '送信者は受信者の公開鍵で暗号化する', '秘密鍵は全員に共有する', '処理速度は共通鍵方式より高速である'],
    answer: 1,
    explanation: '公開鍵暗号方式では、送信者は受信者の公開鍵で暗号化し、受信者は自分の秘密鍵で復号します。',
  },
  {
    question: 'サブネットマスク 255.255.255.0 は CIDR表記でどれか。',
    choices: ['/8', '/16', '/24', '/32'],
    answer: 2,
    explanation: '255.255.255.0 は先頭24ビットが1なので /24 です。',
  },
  {
    question: 'HTMLにおいて、外部CSSファイルを読み込むために使用するタグはどれか。',
    choices: ['<style>', '<link>', '<script>', '<css>'],
    answer: 1,
    explanation: '<link rel="stylesheet" href="..."> で外部CSSを読み込みます。',
  },
  {
    question: 'スタック（LIFO）にA, B, Cの順でpushした後、2回popしたときに取り出される順序はどれか。',
    choices: ['A, B', 'C, B', 'B, C', 'A, C'],
    answer: 1,
    explanation: 'スタックはLIFO（Last In First Out）なので、最後に入れたCから取り出され、次にBが取り出されます。',
  },
  {
    question: 'IPアドレス 192.168.1.0/24 のネットワークで使用可能なホストアドレスの数はいくつか。',
    choices: ['256', '255', '254', '253'],
    answer: 2,
    explanation: '/24 はホスト部が8ビット。2^8 - 2 = 254（ネットワークアドレスとブロードキャストアドレスを除く）。',
  },
  {
    question: 'UML図のうち、クラス間の関係を静的に表す図はどれか。',
    choices: ['シーケンス図', 'アクティビティ図', 'クラス図', 'ユースケース図'],
    answer: 2,
    explanation: 'クラス図はクラスの属性・操作・関連を静的に表現するUML図です。',
  },
  {
    question: 'SQLインジェクションの対策として最も有効なものはどれか。',
    choices: ['入力値のバリデーションのみ行う', 'プリペアドステートメントを使用する', 'HTTPSを使用する', 'ファイアウォールを導入する'],
    answer: 1,
    explanation: 'プリペアドステートメント（パラメータ化クエリ）はSQLインジェクションの最も有効な対策です。',
  },
  {
    question: 'プログラムのテストで、内部構造を考慮せずに入力と出力の関係のみで行うテスト手法はどれか。',
    choices: ['ホワイトボックステスト', 'ブラックボックステスト', '回帰テスト', '単体テスト'],
    answer: 1,
    explanation: 'ブラックボックステストは内部構造を考慮せず、仕様に基づいて入力と出力を検証する手法です。',
  },
  {
    question: 'クラウドサービスのうち、仮想マシンやネットワークなどのインフラを提供するサービスモデルはどれか。',
    choices: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
    answer: 2,
    explanation: 'IaaS（Infrastructure as a Service）はインフラストラクチャを提供するクラウドサービスモデルです。AWS EC2等が該当します。',
  },
  {
    question: '正規化において、第2正規形の条件として正しいものはどれか。',
    choices: ['繰り返し項目を排除する', '部分関数従属を排除する', '推移的関数従属を排除する', '多値従属性を排除する'],
    answer: 1,
    explanation: '第2正規形は第1正規形の条件を満たし、かつ部分関数従属を排除した状態です。',
  },
];

const HARD_QUESTIONS: QuizQuestion[] = [
  {
    question: 'CAP定理において、ネットワーク分断（Partition Tolerance）を保証する場合に両立できない2つの性質の組合せはどれか。',
    choices: ['一貫性と可用性', '一貫性と分断耐性', '可用性と分断耐性', '一貫性と応答速度'],
    answer: 0,
    explanation: 'CAP定理では、P（分断耐性）を保証する場合、C（一貫性）とA（可用性）は同時に保証できません。',
  },
  {
    question: 'デッドロックの4つの必要条件に含まれないものはどれか。',
    choices: ['相互排除', '保持と待機', '横取り可能（プリエンプション可能）', '循環待機'],
    answer: 2,
    explanation: 'デッドロックの4条件は「相互排除」「保持と待機」「横取り不可能」「循環待機」。横取り可能はデッドロック防止の手段です。',
  },
  {
    question: 'ページ置換アルゴリズムで、今後最も長い間使われないページを置換する方式はどれか。',
    choices: ['FIFO', 'LRU', 'LFU', 'OPT（最適）'],
    answer: 3,
    explanation: 'OPT（最適）アルゴリズムは、将来最も長い間参照されないページを置換します。理論上最適ですが実装は困難です。',
  },
  {
    question: 'B+木インデックスの特徴として正しいものはどれか。',
    choices: ['すべてのデータが根ノードに格納される', '葉ノードにのみ実データへのポインタがある', '非平衡木である', '範囲検索には不向きである'],
    answer: 1,
    explanation: 'B+木では、すべての実データへのポインタが葉ノードに格納され、葉ノード同士がリンクされているため範囲検索に適しています。',
  },
  {
    question: 'TLSハンドシェイクにおいて、サーバ認証に使用されるのはどれか。',
    choices: ['共通鍵証明書', 'X.509証明書', 'HMAC', 'Diffie-Hellman鍵'],
    answer: 1,
    explanation: 'TLSではX.509証明書を用いてサーバの身元を認証します。',
  },
  {
    question: 'アーキテクチャパターンのうち、処理をイベントの発行と購読で疎結合に接続するパターンはどれか。',
    choices: ['MVC', 'レイヤード', 'イベント駆動（Pub/Sub）', 'パイプ＆フィルタ'],
    answer: 2,
    explanation: 'イベント駆動（Pub/Sub）パターンは、発行者と購読者がイベントを介して疎結合に連携します。',
  },
  {
    question: 'OAuth 2.0の認可コードフローにおいて、アクセストークンを取得するために認可サーバに渡すものはどれか。',
    choices: ['リフレッシュトークン', '認可コード', 'IDトークン', 'APIキー'],
    answer: 1,
    explanation: '認可コードフローでは、リダイレクトで得た認可コードをトークンエンドポイントに送信してアクセストークンを取得します。',
  },
  {
    question: 'マイクロサービスアーキテクチャにおいて、サービス間の通信障害が連鎖的に広がるのを防ぐパターンはどれか。',
    choices: ['サーキットブレーカ', 'サービスメッシュ', 'APIゲートウェイ', 'サイドカー'],
    answer: 0,
    explanation: 'サーキットブレーカパターンは、障害が検出されると一定期間リクエストを遮断し、連鎖障害を防ぎます。',
  },
  {
    question: 'コンテナオーケストレーションツール Kubernetes において、Podのスケーリングを自動的に行うリソースはどれか。',
    choices: ['Deployment', 'Service', 'HorizontalPodAutoscaler', 'ConfigMap'],
    answer: 2,
    explanation: 'HorizontalPodAutoscaler（HPA）はCPU使用率などのメトリクスに基づいてPod数を自動スケーリングします。',
  },
  {
    question: 'ソフトウェアの品質特性を定義した国際規格はどれか。',
    choices: ['ISO 9001', 'ISO/IEC 25010', 'ISO 27001', 'ISO/IEC 12207'],
    answer: 1,
    explanation: 'ISO/IEC 25010（SQuaRE）はソフトウェア品質モデルを定義した規格で、機能適合性、性能効率性、互換性などの品質特性を規定しています。',
  },
  {
    question: 'DNS応答を偽装して不正なサイトに誘導する攻撃手法はどれか。',
    choices: ['DNSキャッシュポイズニング', 'SQLインジェクション', 'XSS', 'CSRF'],
    answer: 0,
    explanation: 'DNSキャッシュポイズニングは、DNSサーバのキャッシュに不正なレコードを注入し、ユーザを偽サイトに誘導する攻撃です。',
  },
  {
    question: 'トランザクションのACID特性のうち、トランザクション完了後の結果が永続的に保存される性質はどれか。',
    choices: ['Atomicity（原子性）', 'Consistency（一貫性）', 'Isolation（独立性）', 'Durability（永続性）'],
    answer: 3,
    explanation: 'Durability（永続性）は、コミットされたトランザクションの結果は障害が発生しても失われないという性質です。',
  },
  {
    question: '暗号学的ハッシュ関数に求められる性質に含まれないものはどれか。',
    choices: ['一方向性', '衝突耐性', '第2原像耐性', '可逆性'],
    answer: 3,
    explanation: '暗号学的ハッシュ関数は一方向性（元データの復元不可）を求めるため、可逆性は求められません。',
  },
  {
    question: 'スクラム開発において、スプリントの最後に成果物を確認するイベントはどれか。',
    choices: ['デイリースクラム', 'スプリントレビュー', 'スプリントレトロスペクティブ', 'スプリントプランニング'],
    answer: 1,
    explanation: 'スプリントレビューは、スプリントの成果物（インクリメント）をステークホルダーにデモし、フィードバックを得るイベントです。',
  },
  {
    question: 'AWSにおいて、仮想プライベートクラウドのサブネット間のルーティングを制御するものはどれか。',
    choices: ['セキュリティグループ', 'ネットワークACL', 'ルートテーブル', 'NATゲートウェイ'],
    answer: 2,
    explanation: 'ルートテーブルはVPC内のサブネット間およびサブネットから外部へのトラフィックのルーティングを制御します。',
  },
];

const NIGHTMARE_QUESTIONS: QuizQuestion[] = [
  {
    question: 'AWS Organizationsにおいて、SCP（Service Control Policy）の特徴として正しいものはどれか。',
    choices: [
      'SCPはルートアカウントには適用されない',
      'SCPは許可を付与するポリシーである',
      'SCPはOUまたはアカウントにアタッチできる',
      'SCPはIAMポリシーより優先度が低い',
    ],
    answer: 2,
    explanation: 'SCPはOU（組織単位）またはアカウントにアタッチでき、IAMの権限と交差的に評価されます。SCPは許可ではなく、許可の上限（ガードレール）を設定します。',
  },
  {
    question: 'BGP（Border Gateway Protocol）において、AS間のルーティング情報の伝播を制御するために使用される属性はどれか。',
    choices: ['MED（Multi-Exit Discriminator）', 'OSPF Cost', 'Metric', 'Hop Count'],
    answer: 0,
    explanation: 'MEDはeBGPで隣接ASに対して優先する経路を示すための属性です。OSPF CostはIGPの属性です。',
  },
  {
    question: 'Terraformの state locking の目的として正しいものはどれか。',
    choices: [
      'tfstateファイルを暗号化する',
      '複数ユーザの同時操作によるstate破損を防ぐ',
      'リソースの変更を自動ロールバックする',
      'state内の機密情報をマスクする',
    ],
    answer: 1,
    explanation: 'State lockingは、複数のユーザが同時にterraform applyなどを実行した際にstateファイルの競合・破損を防ぐ仕組みです。',
  },
  {
    question: 'Kubernetesにおいて、PodのDNS解決でClusterIPサービスのFQDNの形式として正しいものはどれか。',
    choices: [
      '<service>.<namespace>.pod.cluster.local',
      '<service>.<namespace>.svc.cluster.local',
      '<pod-ip>.<namespace>.svc.cluster.local',
      '<service>.cluster.<namespace>.local',
    ],
    answer: 1,
    explanation: 'KubernetesのClusterIPサービスのFQDNは <service-name>.<namespace>.svc.cluster.local の形式です。',
  },
  {
    question: 'TLS 1.3で廃止された機能はどれか。',
    choices: ['0-RTTハンドシェイク', 'RSA鍵交換', 'AEAD暗号', 'HKDF鍵導出'],
    answer: 1,
    explanation: 'TLS 1.3ではRSA鍵交換が廃止され、Forward Secrecyを提供するECDHE等のみが使用可能です。',
  },
  {
    question: 'AWS Lambda@Edge と CloudFront Functions の違いとして正しいものはどれか。',
    choices: [
      'Lambda@Edgeはビューアリクエスト/レスポンスのみ対応する',
      'CloudFront FunctionsはNode.jsランタイムで動作する',
      'CloudFront Functionsはオリジンリクエスト/レスポンスには対応しない',
      'Lambda@Edgeの方がCloudFront Functionsより実行時間が短い',
    ],
    answer: 2,
    explanation: 'CloudFront Functionsはビューアリクエスト/レスポンスのみに対応し、オリジンリクエスト/レスポンスにはLambda@Edgeが必要です。',
  },
  {
    question: 'データベースのMVCC（Multi-Version Concurrency Control）の主な利点はどれか。',
    choices: [
      'デッドロックが完全に排除される',
      '読取りが書込みをブロックしない',
      'トランザクション分離レベルがSERIALIZABLEに固定される',
      'ストレージ使用量が削減される',
    ],
    answer: 1,
    explanation: 'MVCCでは各トランザクションがデータの特定バージョンを参照するため、読取りが書込みをブロックせず高い並行性を実現します。',
  },
  {
    question: 'AWS Well-Architected Frameworkの6つの柱に含まれないものはどれか。',
    choices: ['サステナビリティ', '運用上の優秀性', 'コスト最適化', 'スケーラビリティ'],
    answer: 3,
    explanation: '6つの柱は「運用上の優秀性」「セキュリティ」「信頼性」「パフォーマンス効率」「コスト最適化」「サステナビリティ」です。スケーラビリティは独立した柱ではありません。',
  },
  {
    question: 'ゼロトラストアーキテクチャの原則として正しいものはどれか。',
    choices: [
      '社内ネットワークからのアクセスは暗黙的に信頼する',
      'すべてのアクセスを検証し、最小権限を適用する',
      'VPNを使用すれば認証は不要である',
      'ファイアウォールの内側では暗号化は不要である',
    ],
    answer: 1,
    explanation: 'ゼロトラストでは「決して信頼せず、常に検証する」が原則で、ネットワーク位置にかかわらずすべてのアクセスを認証・認可し、最小権限を適用します。',
  },
  {
    question: 'CQRSパターン（Command Query Responsibility Segregation）の主な特徴はどれか。',
    choices: [
      '読み取りと書き込みを同一モデルで処理する',
      'コマンド（更新）とクエリ（参照）の責務を分離する',
      'すべての操作をイベントソーシングで記録する',
      'マイクロサービスをモノリスに統合する',
    ],
    answer: 1,
    explanation: 'CQRSはコマンド（状態変更）とクエリ（状態参照）の責務を分離し、それぞれに最適化されたモデルを使用するパターンです。',
  },
  {
    question: 'AWS IAMポリシーの評価ロジックで正しいものはどれか。',
    choices: [
      '明示的なAllowは明示的なDenyより優先される',
      '明示的なDenyは常に最優先で評価される',
      'ポリシーが存在しない場合、デフォルトで許可される',
      'リソースベースポリシーはIAMポリシーより常に優先される',
    ],
    answer: 1,
    explanation: 'IAMポリシー評価では、明示的なDenyが最優先です。明示的なAllowがあってもDenyがあればアクセスは拒否されます。',
  },
  {
    question: 'コンテナランタイムにおいて、OCI（Open Container Initiative）が標準化しているものはどれか。',
    choices: [
      'コンテナオーケストレーション仕様',
      'コンテナイメージ形式とランタイム仕様',
      'CI/CDパイプライン仕様',
      'コンテナネットワーキング仕様',
    ],
    answer: 1,
    explanation: 'OCIはコンテナイメージ形式（Image Spec）とコンテナランタイム仕様（Runtime Spec）を標準化しています。',
  },
  {
    question: 'Istioサービスメッシュにおいて、トラフィック管理を行うコンポーネントはどれか。',
    choices: ['Envoy Proxy', 'Pilot（Istiod）', 'Citadel', 'Galley'],
    answer: 1,
    explanation: 'Pilot（現在はIstiodに統合）はトラフィック管理とサービスディスカバリの設定をEnvoyプロキシに配布するコントロールプレーンコンポーネントです。',
  },
  {
    question: 'AWS上でディザスタリカバリ戦略のうち、RPO/RTOが最も短いものはどれか。',
    choices: ['バックアップ＆リストア', 'パイロットライト', 'ウォームスタンバイ', 'マルチサイトアクティブ-アクティブ'],
    answer: 3,
    explanation: 'マルチサイトアクティブ-アクティブは常時稼働する冗長構成のため、RPO/RTOが最も短く（ほぼゼロに近い）なります。',
  },
  {
    question: 'eBPF（extended Berkeley Packet Filter）の用途として正しいものはどれか。',
    choices: [
      'カーネルモジュールを再コンパイルせずにカーネルの動作を拡張する',
      'ユーザ空間のプロセスを高速にスケジューリングする',
      'ファイルシステムのジャーナリングを実装する',
      'TCP/IPスタックを完全に置き換える',
    ],
    answer: 0,
    explanation: 'eBPFはカーネル内でサンドボックス化されたプログラムを実行し、カーネルの変更やモジュール追加なしにネットワーク・セキュリティ・オブザーバビリティなどを拡張できます。',
  },
];

const QUESTION_POOLS: Record<QuizDifficulty, QuizQuestion[]> = {
  normal: NORMAL_QUESTIONS,
  hard: HARD_QUESTIONS,
  nightmare: NIGHTMARE_QUESTIONS,
};

const QUESTION_COUNTS: Record<QuizDifficulty, number> = {
  normal: 10,
  hard: 10,
  nightmare: 10,
};

/** Fisher-Yates シャッフル */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 難易度に応じた問題配列を返す（ランダム選択）
 */
export function getQuestions(difficulty: QuizDifficulty): QuizQuestion[] {
  const pool = QUESTION_POOLS[difficulty];
  const count = QUESTION_COUNTS[difficulty];
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function getQuestionCount(difficulty: QuizDifficulty): number {
  return QUESTION_COUNTS[difficulty];
}
