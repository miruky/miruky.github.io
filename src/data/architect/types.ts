/* ============================================
   AWS Architect Learning Platform – 型定義
   ============================================ */

/** AWSサービスのカテゴリ */
export type ServiceCategory =
  | 'compute'
  | 'storage'
  | 'database'
  | 'networking'
  | 'security'
  | 'integration'
  | 'management'
  | 'analytics'
  | 'ai-ml'
  | 'developer'
  | 'migration'
  | 'containers';

/** AWSサービスID（全サービスのユニオン） */
export type AwsServiceId =
  // Compute
  | 'ec2' | 'lambda' | 'ecs' | 'eks' | 'fargate' | 'elastic-beanstalk' | 'batch' | 'lightsail'
  // Storage
  | 's3' | 'ebs' | 'efs' | 's3-glacier'
  // Database
  | 'rds' | 'dynamodb' | 'elasticache' | 'aurora' | 'redshift' | 'neptune' | 'documentdb'
  // Networking
  | 'vpc' | 'cloudfront' | 'route53' | 'api-gateway' | 'alb' | 'nlb' | 'direct-connect' | 'transit-gateway' | 'nat-gateway' | 'igw'
  // Security
  | 'iam' | 'cognito' | 'waf' | 'shield' | 'kms' | 'secrets-manager' | 'acm' | 'guardduty'
  // Integration
  | 'sqs' | 'sns' | 'eventbridge' | 'step-functions' | 'appsync'
  // Management
  | 'cloudwatch' | 'cloudformation' | 'cloudtrail' | 'systems-manager' | 'config'
  // Analytics
  | 'athena' | 'kinesis' | 'glue' | 'quicksight' | 'emr' | 'opensearch'
  // AI/ML
  | 'sagemaker' | 'bedrock' | 'rekognition' | 'comprehend' | 'lex' | 'polly' | 'transcribe' | 'translate'
  // Developer
  | 'codepipeline' | 'codebuild' | 'codedeploy' | 'codecommit'
  // Containers
  | 'ecr'
  // Migration
  | 'dms';

/** AWSサービス定義 */
export interface AwsService {
  id: AwsServiceId;
  name: string;
  nameJa: string;
  category: ServiceCategory;
  description: string;
}

/** カテゴリの表示情報 */
export interface CategoryMeta {
  id: ServiceCategory;
  name: string;
  nameJa: string;
  color: string;
  bgColor: string;
}

/** レッスン難易度 */
export type ArchitectDifficulty = 'beginner' | 'intermediate' | 'advanced';

/** ノード間の接続定義 */
export interface RequiredConnection {
  from: AwsServiceId;
  to: AwsServiceId;
  label?: string;
}

/** サービス設定チェック */
export interface ConfigCheck {
  serviceId: AwsServiceId;
  key: string;
  label: string;
  options: string[];
  correctValue: string;
}

/** アーキテクトレッスン */
export interface ArchitectLesson {
  id: number;
  title: string;
  difficulty: ArchitectDifficulty;
  category: string;
  scenario: string;
  requirements: string[];
  requiredServices: AwsServiceId[];
  requiredConnections: RequiredConnection[];
  configChecks?: ConfigCheck[];
  hints: string[];
  explanation: string;
  diagramDescription?: string;
}
