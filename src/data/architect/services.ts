/* ============================================
   AWSサービスカタログ（70サービス）
   ============================================ */

import type { AwsService, CategoryMeta, ServiceCategory } from './types';

/** カテゴリメタデータ */
export const categoryMetas: CategoryMeta[] = [
  { id: 'compute',     name: 'Compute',     nameJa: 'コンピューティング', color: '#ED7100', bgColor: '#ED710018' },
  { id: 'storage',     name: 'Storage',     nameJa: 'ストレージ',         color: '#3F8624', bgColor: '#3F862418' },
  { id: 'database',    name: 'Database',    nameJa: 'データベース',       color: '#2E73B8', bgColor: '#2E73B818' },
  { id: 'networking',  name: 'Networking',  nameJa: 'ネットワーキング',   color: '#8C4FFF', bgColor: '#8C4FFF18' },
  { id: 'security',    name: 'Security',    nameJa: 'セキュリティ',       color: '#DD344C', bgColor: '#DD344C18' },
  { id: 'integration', name: 'Integration', nameJa: '統合',               color: '#E7157B', bgColor: '#E7157B18' },
  { id: 'management',  name: 'Management',  nameJa: '管理・ガバナンス',   color: '#E7157B', bgColor: '#E7157B18' },
  { id: 'analytics',   name: 'Analytics',   nameJa: '分析',               color: '#8C4FFF', bgColor: '#8C4FFF18' },
  { id: 'ai-ml',       name: 'AI/ML',       nameJa: 'AI・機械学習',       color: '#01A88D', bgColor: '#01A88D18' },
  { id: 'developer',   name: 'Developer',   nameJa: '開発者ツール',       color: '#2E73B8', bgColor: '#2E73B818' },
  { id: 'containers',  name: 'Containers',  nameJa: 'コンテナ',           color: '#ED7100', bgColor: '#ED710018' },
  { id: 'migration',   name: 'Migration',   nameJa: '移行',               color: '#01A88D', bgColor: '#01A88D18' },
];

/** カテゴリ取得ヘルパー */
export function getCategoryMeta(cat: ServiceCategory): CategoryMeta {
  return categoryMetas.find((c) => c.id === cat) ?? categoryMetas[0];
}

/** 全AWSサービス定義 */
export const awsServices: AwsService[] = [
  // ──── Compute ────
  { id: 'ec2',               name: 'Amazon EC2',              nameJa: 'EC2',               category: 'compute',     description: '仮想サーバー。柔軟にスケール可能なコンピューティング容量。' },
  { id: 'lambda',            name: 'AWS Lambda',              nameJa: 'Lambda',             category: 'compute',     description: 'サーバーレスコンピューティング。コード実行のみ課金。' },
  { id: 'ecs',               name: 'Amazon ECS',              nameJa: 'ECS',                category: 'containers',  description: 'コンテナオーケストレーション。Docker コンテナを管理。' },
  { id: 'eks',               name: 'Amazon EKS',              nameJa: 'EKS',                category: 'containers',  description: 'マネージド Kubernetes サービス。' },
  { id: 'fargate',           name: 'AWS Fargate',             nameJa: 'Fargate',            category: 'containers',  description: 'サーバーレスコンテナ。インフラ管理不要。' },
  { id: 'elastic-beanstalk', name: 'Elastic Beanstalk',       nameJa: 'Elastic Beanstalk',  category: 'compute',     description: 'アプリのデプロイ・管理を自動化するPaaS。' },
  { id: 'batch',             name: 'AWS Batch',               nameJa: 'Batch',              category: 'compute',     description: 'バッチコンピューティング。大規模並列処理。' },
  { id: 'lightsail',         name: 'Amazon Lightsail',        nameJa: 'Lightsail',          category: 'compute',     description: 'シンプルなVPS。小規模向け。' },

  // ──── Storage ────
  { id: 's3',                name: 'Amazon S3',               nameJa: 'S3',                 category: 'storage',     description: 'オブジェクトストレージ。99.999999999%の耐久性。' },
  { id: 'ebs',               name: 'Amazon EBS',              nameJa: 'EBS',                category: 'storage',     description: 'ブロックストレージ。EC2インスタンスのディスク。' },
  { id: 'efs',               name: 'Amazon EFS',              nameJa: 'EFS',                category: 'storage',     description: '共有ファイルシステム。複数EC2から同時アクセス。' },
  { id: 's3-glacier',        name: 'S3 Glacier',              nameJa: 'S3 Glacier',         category: 'storage',     description: '低コストのアーカイブストレージ。長期保存向け。' },

  // ──── Database ────
  { id: 'rds',               name: 'Amazon RDS',              nameJa: 'RDS',                category: 'database',    description: 'マネージドRDB。MySQL, PostgreSQL, Oracle等。' },
  { id: 'dynamodb',          name: 'Amazon DynamoDB',         nameJa: 'DynamoDB',           category: 'database',    description: 'フルマネージドNoSQLデータベース。ミリ秒レイテンシ。' },
  { id: 'elasticache',       name: 'Amazon ElastiCache',      nameJa: 'ElastiCache',        category: 'database',    description: 'インメモリキャッシュ。Redis/Memcached。' },
  { id: 'aurora',            name: 'Amazon Aurora',           nameJa: 'Aurora',             category: 'database',    description: 'クラウドネイティブRDB。MySQL/PostgreSQL互換。' },
  { id: 'redshift',          name: 'Amazon Redshift',         nameJa: 'Redshift',           category: 'database',    description: 'データウェアハウス。ペタバイト規模の分析。' },
  { id: 'neptune',           name: 'Amazon Neptune',          nameJa: 'Neptune',            category: 'database',    description: 'グラフデータベース。関係データの高速クエリ。' },
  { id: 'documentdb',        name: 'Amazon DocumentDB',       nameJa: 'DocumentDB',         category: 'database',    description: 'MongoDB互換のドキュメントDB。' },

  // ──── Networking ────
  { id: 'vpc',               name: 'Amazon VPC',              nameJa: 'VPC',                category: 'networking',  description: '仮想プライベートクラウド。ネットワーク分離。' },
  { id: 'cloudfront',        name: 'Amazon CloudFront',       nameJa: 'CloudFront',         category: 'networking',  description: 'CDN。世界中のエッジロケーションからコンテンツ配信。' },
  { id: 'route53',           name: 'Amazon Route 53',         nameJa: 'Route 53',           category: 'networking',  description: 'DNS サービス。ドメイン管理・ルーティング。' },
  { id: 'api-gateway',       name: 'Amazon API Gateway',      nameJa: 'API Gateway',        category: 'networking',  description: 'APIの作成・公開・管理。REST/WebSocket。' },
  { id: 'alb',               name: 'Application LB',          nameJa: 'ALB',                category: 'networking',  description: 'L7ロードバランサー。HTTP/HTTPSトラフィック分散。' },
  { id: 'nlb',               name: 'Network LB',              nameJa: 'NLB',                category: 'networking',  description: 'L4ロードバランサー。超低レイテンシ。' },
  { id: 'direct-connect',    name: 'AWS Direct Connect',      nameJa: 'Direct Connect',     category: 'networking',  description: '専用線接続。オンプレミスとAWSを直結。' },
  { id: 'transit-gateway',   name: 'Transit Gateway',         nameJa: 'Transit Gateway',    category: 'networking',  description: 'VPC間・オンプレ間のハブ。大規模ネットワーク。' },
  { id: 'nat-gateway',       name: 'NAT Gateway',             nameJa: 'NAT Gateway',        category: 'networking',  description: 'プライベートサブネットからのインターネット通信。' },
  { id: 'igw',               name: 'Internet Gateway',        nameJa: 'IGW',                category: 'networking',  description: 'VPCとインターネットの接続ポイント。' },

  // ──── Security ────
  { id: 'iam',               name: 'AWS IAM',                 nameJa: 'IAM',                category: 'security',    description: 'ID・アクセス管理。ユーザー・ロール・ポリシー。' },
  { id: 'cognito',           name: 'Amazon Cognito',          nameJa: 'Cognito',            category: 'security',    description: 'ユーザー認証・認可。サインアップ/サインイン。' },
  { id: 'waf',               name: 'AWS WAF',                 nameJa: 'WAF',                category: 'security',    description: 'Webアプリケーションファイアウォール。' },
  { id: 'shield',            name: 'AWS Shield',              nameJa: 'Shield',             category: 'security',    description: 'DDoS保護。Standard/Advanced。' },
  { id: 'kms',               name: 'AWS KMS',                 nameJa: 'KMS',                category: 'security',    description: '暗号鍵の作成・管理。データ暗号化。' },
  { id: 'secrets-manager',   name: 'Secrets Manager',         nameJa: 'Secrets Manager',    category: 'security',    description: 'シークレット管理。DB認証情報等の安全な保管。' },
  { id: 'acm',               name: 'AWS ACM',                 nameJa: 'ACM',                category: 'security',    description: 'SSL/TLS証明書のプロビジョニング・管理。' },
  { id: 'guardduty',         name: 'Amazon GuardDuty',        nameJa: 'GuardDuty',          category: 'security',    description: '脅威検出。機械学習で不正アクティビティを検知。' },

  // ──── Integration ────
  { id: 'sqs',               name: 'Amazon SQS',              nameJa: 'SQS',                category: 'integration', description: 'メッセージキュー。非同期メッセージング。' },
  { id: 'sns',               name: 'Amazon SNS',              nameJa: 'SNS',                category: 'integration', description: '通知サービス。Pub/Subメッセージング。' },
  { id: 'eventbridge',       name: 'Amazon EventBridge',      nameJa: 'EventBridge',        category: 'integration', description: 'サーバーレスイベントバス。イベント駆動アーキテクチャ。' },
  { id: 'step-functions',    name: 'AWS Step Functions',      nameJa: 'Step Functions',     category: 'integration', description: 'ワークフローオーケストレーション。ステートマシン。' },
  { id: 'appsync',           name: 'AWS AppSync',             nameJa: 'AppSync',            category: 'integration', description: 'マネージドGraphQL。リアルタイムデータ同期。' },

  // ──── Management ────
  { id: 'cloudwatch',        name: 'Amazon CloudWatch',       nameJa: 'CloudWatch',         category: 'management',  description: '監視・可観測性。メトリクス・ログ・アラーム。' },
  { id: 'cloudformation',    name: 'AWS CloudFormation',      nameJa: 'CloudFormation',     category: 'management',  description: 'IaC。テンプレートでインフラをコード管理。' },
  { id: 'cloudtrail',        name: 'AWS CloudTrail',          nameJa: 'CloudTrail',         category: 'management',  description: 'APIアクティビティログ。監査・コンプライアンス。' },
  { id: 'systems-manager',   name: 'Systems Manager',         nameJa: 'Systems Manager',    category: 'management',  description: '運用管理。パッチ適用・インベントリ・パラメータ。' },
  { id: 'config',            name: 'AWS Config',              nameJa: 'Config',             category: 'management',  description: 'リソース設定記録。コンプライアンス評価。' },

  // ──── Analytics ────
  { id: 'athena',            name: 'Amazon Athena',           nameJa: 'Athena',             category: 'analytics',   description: 'S3上のデータにSQLクエリ。サーバーレス分析。' },
  { id: 'kinesis',           name: 'Amazon Kinesis',          nameJa: 'Kinesis',            category: 'analytics',   description: 'リアルタイムストリーミングデータ処理。' },
  { id: 'glue',              name: 'AWS Glue',                nameJa: 'Glue',               category: 'analytics',   description: 'ETLサービス。データカタログ・変換。' },
  { id: 'quicksight',        name: 'Amazon QuickSight',       nameJa: 'QuickSight',         category: 'analytics',   description: 'BIダッシュボード。データ可視化。' },
  { id: 'emr',               name: 'Amazon EMR',              nameJa: 'EMR',                category: 'analytics',   description: 'ビッグデータ処理。Spark/Hadoop。' },
  { id: 'opensearch',        name: 'Amazon OpenSearch',       nameJa: 'OpenSearch',         category: 'analytics',   description: '全文検索・ログ分析。Elasticsearch互換。' },

  // ──── AI/ML ────
  { id: 'sagemaker',         name: 'Amazon SageMaker',        nameJa: 'SageMaker',          category: 'ai-ml',       description: 'ML開発プラットフォーム。構築・訓練・デプロイ。' },
  { id: 'bedrock',           name: 'Amazon Bedrock',          nameJa: 'Bedrock',            category: 'ai-ml',       description: '生成AI基盤。各社FMをAPI経由で利用。' },
  { id: 'rekognition',       name: 'Amazon Rekognition',      nameJa: 'Rekognition',        category: 'ai-ml',       description: '画像・動画分析。顔認識・物体検出。' },
  { id: 'comprehend',        name: 'Amazon Comprehend',       nameJa: 'Comprehend',         category: 'ai-ml',       description: '自然言語処理。感情分析・エンティティ認識。' },
  { id: 'lex',               name: 'Amazon Lex',              nameJa: 'Lex',                category: 'ai-ml',       description: '会話型AI。チャットボット構築。' },
  { id: 'polly',             name: 'Amazon Polly',            nameJa: 'Polly',              category: 'ai-ml',       description: 'テキスト→音声変換。多言語対応。' },
  { id: 'transcribe',        name: 'Amazon Transcribe',       nameJa: 'Transcribe',         category: 'ai-ml',       description: '音声→テキスト変換。文字起こし。' },
  { id: 'translate',         name: 'Amazon Translate',        nameJa: 'Translate',          category: 'ai-ml',       description: 'ニューラル機械翻訳。多言語対応。' },

  // ──── Developer ────
  { id: 'codepipeline',      name: 'AWS CodePipeline',        nameJa: 'CodePipeline',       category: 'developer',   description: 'CI/CDパイプライン。自動デリバリー。' },
  { id: 'codebuild',         name: 'AWS CodeBuild',           nameJa: 'CodeBuild',          category: 'developer',   description: 'ビルドサービス。コンパイル・テスト・パッケージ。' },
  { id: 'codedeploy',        name: 'AWS CodeDeploy',          nameJa: 'CodeDeploy',         category: 'developer',   description: 'デプロイ自動化。EC2/Lambda/ECS。' },
  { id: 'codecommit',        name: 'AWS CodeCommit',          nameJa: 'CodeCommit',         category: 'developer',   description: 'マネージドGitリポジトリ。' },

  // ──── Containers ────
  { id: 'ecr',               name: 'Amazon ECR',              nameJa: 'ECR',                category: 'containers',  description: 'コンテナイメージレジストリ。Docker Hub互換。' },

  // ──── Migration ────
  { id: 'dms',               name: 'AWS DMS',                 nameJa: 'DMS',                category: 'migration',   description: 'データベース移行サービス。異種DB間移行。' },
];

/** サービスIDで検索 */
export function getService(id: string): AwsService | undefined {
  return awsServices.find((s) => s.id === id);
}

/** カテゴリでグループ化 */
export function getServicesByCategory(): Map<ServiceCategory, AwsService[]> {
  const map = new Map<ServiceCategory, AwsService[]>();
  for (const s of awsServices) {
    const list = map.get(s.category) || [];
    list.push(s);
    map.set(s.category, list);
  }
  return map;
}
