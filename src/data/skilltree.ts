export interface SkillNode {
  id: string;
  name: string;
  shortName: string;
  level: number;
  description: string;
}

export interface SkillBranch {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: SkillNode[];
}

export const skillTreeData: SkillBranch[] = [
  {
    id: 'cloud',
    name: 'Cloud',
    icon: '',
    color: '#00d4ff',
    skills: [
      { id: 'aws', name: 'Amazon Web Services', shortName: 'AWS', level: 95, description: 'クラウドインフラ全般の設計・構築・運用。12冠達成。' },
      { id: 'ec2', name: 'Amazon EC2', shortName: 'EC2', level: 90, description: '仮想サーバーの構築・オートスケーリング・AMI管理' },
      { id: 's3', name: 'Amazon S3', shortName: 'S3', level: 90, description: 'オブジェクトストレージ・静的ホスティング・ライフサイクル' },
      { id: 'lambda', name: 'AWS Lambda', shortName: 'Lambda', level: 85, description: 'サーバーレス関数の開発・デプロイ・運用' },
      { id: 'vpc', name: 'Amazon VPC', shortName: 'VPC', level: 90, description: 'ネットワーク設計・サブネット・セキュリティグループ' },
      { id: 'rds', name: 'Amazon RDS', shortName: 'RDS', level: 85, description: 'RDB管理・Multi-AZ・リードレプリカ' },
      { id: 'cloudfront', name: 'Amazon CloudFront', shortName: 'CF', level: 85, description: 'CDN配信・キャッシュ戦略・OAC設定' },
      { id: 'connect', name: 'Amazon Connect', shortName: 'Connect', level: 80, description: 'クラウドコンタクトセンターの構築' },
      { id: 'bedrock', name: 'Amazon Bedrock', shortName: 'Bedrock', level: 80, description: '生成AI基盤モデルの活用・Agents構築' },
      { id: 'lex', name: 'Amazon Lex', shortName: 'Lex', level: 75, description: '会話型AIボットの開発' },
    ],
  },
  {
    id: 'iac',
    name: 'IaC',
    icon: '',
    color: '#f59e0b',
    skills: [
      { id: 'terraform', name: 'Terraform', shortName: 'TF', level: 80, description: 'HCLによるマルチクラウドIaC管理' },
      { id: 'cfn', name: 'AWS CloudFormation', shortName: 'CFn', level: 85, description: 'AWSネイティブIaC・スタック管理' },
      { id: 'cdk', name: 'AWS CDK', shortName: 'CDK', level: 70, description: 'TypeScript / PythonによるAWSリソース定義' },
    ],
  },
  {
    id: 'mlai',
    name: 'ML / AI',
    icon: '',
    color: '#a855f7',
    skills: [
      { id: 'bedrock-ai', name: 'Amazon Bedrock', shortName: 'Bedrock', level: 80, description: '基盤モデルの活用・プロンプトエンジニアリング' },
      { id: 'rag', name: 'RAG', shortName: 'RAG', level: 75, description: '検索拡張生成パターンの設計・Knowledge Base活用' },
      { id: 'langchain', name: 'LangChain', shortName: 'LC', level: 70, description: 'LLMアプリケーションフレームワーク' },
      { id: 'vectordb', name: 'ChromaDB / FAISS', shortName: 'VecDB', level: 70, description: 'ベクトルDB・類似検索エンジン' },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: '',
    color: '#22c55e',
    skills: [
      { id: 'gha', name: 'GitHub Actions', shortName: 'GHA', level: 85, description: 'CI/CDワークフロー自動化・カスタムアクション' },
      { id: 'codepipeline', name: 'AWS CodePipeline', shortName: 'CP', level: 75, description: 'AWSネイティブCI/CDパイプライン' },
      { id: 'codebuild', name: 'AWS CodeBuild', shortName: 'CB', level: 75, description: 'ビルド・テスト自動化環境' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: '',
    color: '#3b82f6',
    skills: [
      { id: 'python', name: 'Python', shortName: 'Py', level: 85, description: '主要開発言語。Lambda・ML・自動化スクリプト' },
      { id: 'typescript', name: 'TypeScript', shortName: 'TS', level: 75, description: '型安全なフロントエンド・バックエンド開発' },
      { id: 'javascript', name: 'JavaScript', shortName: 'JS', level: 80, description: 'Web開発全般・DOM操作・非同期処理' },
      { id: 'bash', name: 'Bash', shortName: 'Bash', level: 75, description: 'シェルスクリプト・サーバー運用自動化' },
      { id: 'sql', name: 'SQL', shortName: 'SQL', level: 70, description: 'データベースクエリ・テーブル設計・最適化' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: '',
    color: '#ec4899',
    skills: [
      { id: 'git', name: 'Git / GitHub', shortName: 'Git', level: 85, description: 'バージョン管理・ブランチ戦略・PR運用' },
      { id: 'docker', name: 'Docker', shortName: 'Docker', level: 75, description: 'コンテナ化・Compose・マルチステージビルド' },
      { id: 'linux', name: 'Linux', shortName: 'Linux', level: 80, description: 'サーバーOS管理・LPIC-3保有' },
      { id: 'nginx', name: 'Nginx', shortName: 'Nginx', level: 70, description: 'Webサーバー・リバースプロキシ設定' },
      { id: 'claude', name: 'Claude Code', shortName: 'Claude', level: 80, description: 'AIコーディングアシスタントの実践的活用' },
    ],
  },
];
