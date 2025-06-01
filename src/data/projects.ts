import { Project } from '@/types';

export const projects: Project[] = [
  {
    name: 'LLM RAG Chatbot',
    description:
      'Clean Architecture で構築した LLM RAG チャットボット。FastAPI + Streamlit のフルスタック構成で、複数のLLMプロバイダーと検索エンジンをサポート。',
    techStack: [
      'Python',
      'FastAPI',
      'Streamlit',
      'ChromaDB',
      'FAISS',
      'LangChain',
      'Docker',
    ],
    githubUrl: 'https://github.com/miruky/llm-rag-chatbot',
    highlights: [
      'Clean Architecture + DI Container',
      '196 テスト（全パス）',
      'RAG パイプライン（チャンキング・埋め込み・検索）',
      'ML 評価メトリクス（BLEU, ROUGE, BERTScore）',
    ],
  },
  {
    name: 'AWS Serverless URL Shortener',
    description:
      'AWS サーバーレスアーキテクチャで構築した URL 短縮サービス。API Gateway + Lambda + DynamoDB のフルサーバーレス構成。',
    techStack: [
      'Python',
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'CloudFormation',
      'GitHub Actions',
    ],
    githubUrl: 'https://github.com/miruky/aws-serverless-url-shortener',
    highlights: [
      'フルサーバーレスアーキテクチャ',
      '92 テスト（全パス）',
      'IaC（CloudFormation）',
      'CI/CD パイプライン',
    ],
  },
  {
    name: 'Qiita Sample Code Collection',
    description:
      'Qiita 連載記事のサンプルコード集。AWS サービスの実装例やチュートリアルコードを整理。',
    techStack: ['Python', 'AWS', 'TypeScript', 'Terraform'],
    githubUrl: 'https://github.com/miruky/qiita',
    highlights: [
      '連載記事に対応したサンプルコード',
      '再利用可能なコードスニペット',
      'AWS サービス実装例',
    ],
  },
];
