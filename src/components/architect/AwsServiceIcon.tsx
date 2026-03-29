/* ============================================
   AWSサービスアイコン（簡略化SVG）
   AWS公式カラーパレットに準拠したミニマルアイコン
   ============================================ */

import type { AwsServiceId, ServiceCategory } from '@/data/architect/types';

const CATEGORY_COLORS: Record<ServiceCategory, string> = {
  compute: '#ED7100',
  storage: '#3F8624',
  database: '#2E73B8',
  networking: '#8C4FFF',
  security: '#DD344C',
  integration: '#E7157B',
  management: '#E7157B',
  analytics: '#8C4FFF',
  'ai-ml': '#01A88D',
  developer: '#2E73B8',
  containers: '#ED7100',
  migration: '#01A88D',
};

interface Props {
  serviceId: AwsServiceId;
  category: ServiceCategory;
  size?: number;
}

/**
 * カテゴリカラーを取得
 */
export function getCategoryColor(category: ServiceCategory): string {
  return CATEGORY_COLORS[category] || '#8C4FFF';
}

/**
 * 各サービス用の簡略化アイコンパス
 * AWS公式アイコンスタイルにインスパイアされたシンプルなシンボル
 */
function getIconPath(serviceId: AwsServiceId): string {
  const icons: Partial<Record<AwsServiceId, string>> = {
    // Compute
    'ec2':               'M4 6h16v12H4zM8 6V4h8v2M8 18v2h8v-2',
    'lambda':            'M3 20L12 4l9 16H3zM12 9v5M12 16h.01',
    'ecs':               'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    'eks':               'M12 2l9 5.5v9L12 22l-9-5.5v-9L12 2zM12 8v8M8 10l4 2 4-2',
    'fargate':           'M4 8h16v10H4zM7 8V5h10v3M9 12h6M9 15h6',
    'elastic-beanstalk': 'M12 3v18M8 7l4-4 4 4M8 12h8M6 17l6 4 6-4',
    'batch':             'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7zM7 7l7 7M17 7l-7 7',
    'lightsail':         'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6v6l4 4',

    // Storage
    's3':                'M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M14 4v16',
    'ebs':               'M6 3h12l-3 18H9L6 3zM8 8h8M8 13h8',
    'efs':               'M4 5h16v14H4zM4 9h16M4 14h16M10 5v14',
    's3-glacier':        'M4 8h16v12H4zM7 8L12 3l5 5M8 12h8M8 16h8',

    // Database
    'rds':               'M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3v12c0 1.66-3.58 3-8 3s-8-1.34-8-3V6zM4 10c0 1.66 3.58 3 8 3s8-1.34 8-3M4 14c0 1.66 3.58 3 8 3s8-1.34 8-3',
    'dynamodb':          'M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3v12c0 1.66-3.58 3-8 3s-8-1.34-8-3V6zM12 9l4-2M12 9L8 7M12 9v5',
    'elasticache':       'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    'aurora':            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z',
    'redshift':          'M4 6h16v12H4zM4 10h16M9 6v16M4 14h16',
    'neptune':           'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 9l3 3-3 3M13 9h4M13 15h4',
    'documentdb':        'M6 3h12v18H6zM10 3v18M6 8h12M6 13h12M6 18h12',

    // Networking
    'vpc':               'M3 3h18v18H3zM7 7h10v10H7zM3 12h4M17 12h4M12 3v4M12 17v4',
    'cloudfront':        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10M12 2c-2.5 3-4 7-4 10s1.5 7 4 10',
    'route53':           'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6l2 4 4 .5-3 3 .5 4.5-3.5-2-3.5 2 .5-4.5-3-3 4-.5z',
    'api-gateway':       'M4 4h16v16H4zM4 8h16M10 8v12M14 8v12M4 14h16',
    'alb':               'M3 12h18M12 3v18M7 7l5 5-5 5M17 7l-5 5 5 5',
    'nlb':               'M3 12h18M12 3v18M6 6l6 6M18 6l-6 6M6 18l6-6M18 18l-6-6',
    'direct-connect':    'M3 12h6M15 12h6M9 8v8M15 8v8M9 12h6',
    'transit-gateway':   'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M12 2v7M12 15v7M2 12h7M15 12h7M5 5l5 5M14 14l5 5M19 5l-5 5M10 14l-5 5',
    'nat-gateway':       'M4 12h16M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4',
    'igw':               'M3 3h18v18H3zM12 3v18M3 12h18M7 7l10 10M17 7L7 17',

    // Security
    'iam':               'M12 2C8.13 2 5 5.13 5 9v5c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5V9c0-3.87-3.13-7-7-7zM12 11m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 13v3',
    'cognito':           'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM6 20v-1c0-2.21 2.69-4 6-4s6 1.79 6 4v1',
    'waf':               'M3 3h18v18H3zM3 8h18M8 3v18M13 3v18M3 13h18M3 18h18',
    'shield':            'M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zM9 12l2 2 4-4',
    'kms':               'M12 2l2 2-2 2-2-2 2-2zM8 8h8v2H8zM10 10v8l2 2 2-2v-8',
    'secrets-manager':   'M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5zM6 10h12v10H6zM12 14m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M12 15.5V18',
    'acm':               'M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zM8 12h8M12 8v8',
    'guardduty':         'M12 2l8 4v6c0 5.52-3.58 10-8 12-4.42-2-8-6.48-8-12V6l8-4zM12 8v4M12 14h.01',

    // Integration
    'sqs':               'M2 6h8v12H2zM14 6h8v12h-8zM10 10h4M10 14h4',
    'sns':               'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
    'eventbridge':       'M4 4h16v16H4zM12 4v16M4 12h16M8 8l8 8M16 8l-8 8',
    'step-functions':    'M12 3v3M12 18v3M6 9h12v6H6zM9 9V6M15 9V6M9 15v3M15 15v3',
    'appsync':           'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6l4 3v6l-4 3-4-3V9l4-3z',

    // Management
    'cloudwatch':        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6v6l4 2',
    'cloudformation':    'M4 4h16v16H4zM8 8h8v8H8zM4 4l4 4M20 4l-4 4M4 20l4-4M20 20l-4-4',
    'cloudtrail':        'M4 18l4-6 3 2 5-8 4 6M4 18h16',
    'systems-manager':   'M4 4h16v16H4zM9 4v16M4 9h16M4 15h16M15 4v16',
    'config':            'M12 2l8 4v6c0 5.52-3.58 10-8 12-4.42-2-8-6.48-8-12V6l8-4zM12 8l2 2-4 4 2 2',

    // Analytics
    'athena':            'M12 2l8 6v8l-8 6-8-6V8l8-6zM12 8v8M8 10l4 2 4-2',
    'kinesis':           'M4 6c4 0 4 4 8 4s4-4 8-4M4 12c4 0 4 4 8 4s4-4 8-4M4 18c4 0 4-4 8-4s4 4 8 4',
    'glue':              'M4 4h6v6H4zM14 14h6v6h-6zM10 7h4l-4 10h4',
    'quicksight':        'M3 3h18v14H3zM7 20h10M12 17v3M7 8l3 4 2-2 5 3',
    'emr':               'M12 2l9 5v10l-9 5-9-5V7l9-5zM12 7v10M7 9.5l5 2.5 5-2.5',
    'opensearch':        'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',

    // AI/ML
    'sagemaker':         'M12 2a3 3 0 0 1 3 3v2h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-6 0v-2H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h2V5a3 3 0 0 1 3-3z',
    'bedrock':           'M4 8l8-6 8 6v8l-8 6-8-6V8zM4 8l8 4M12 12l8-4M12 12v10',
    'rekognition':       'M4 4h16v16H4zM8 10m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0M16 10m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0M8 15c1 2 7 2 8 0',
    'comprehend':        'M4 4h16v16H4zM8 9h8M8 12h6M8 15h4',
    'lex':               'M3 5h14v10H9l-4 4v-4H3V5zM20 3v12h-2',
    'polly':             'M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8',
    'transcribe':        'M4 5h16v14H4zM7 9h10M7 12h8M7 15h6M19 2l2 3-2 3',
    'translate':         'M4 4h7M7.5 4v1.5M5 10c1.5 2 4 3.5 7 3.5M9 4c-.5 3.5-1.5 6-4 8M14 4l5 16M16 12h4',

    // Developer
    'codepipeline':      'M4 6h16v3H4zM4 12h16v3H4zM4 18h16v3H4zM12 9v3M12 15v3',
    'codebuild':         'M12 2l8 4v12l-8 4-8-4V6l8-4zM8 10l4 2 4-2M12 12v6',
    'codedeploy':        'M4 4h16v16H4zM12 8v8M8 12h8M8 8l8 8M16 8l-8 8',
    'codecommit':        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6v6M8 15c0-2 8-2 8 0',

    // Containers
    'ecr':               'M4 4h16v16H4zM8 8h8v8H8zM8 12h8M12 8v8',

    // Migration
    'dms':               'M4 8h6v8H4zM14 8h6v8h-6zM10 12h4M10 10l2 2-2 2M14 10l-2 2 2 2',
  };
  return icons[serviceId] || 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
}

export default function AwsServiceIcon({ serviceId, category, size = 24 }: Props) {
  const color = getCategoryColor(category);
  const pathData = getIconPath(serviceId);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {pathData.split(/(?=M)/).map((segment, i) => (
        <path key={i} d={segment.trim()} />
      ))}
    </svg>
  );
}
