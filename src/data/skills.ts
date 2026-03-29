import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Cloud',
    icon: '',
    skills: [
      { name: 'Amazon Web Services (AWS)', category: 'Cloud', level: 95 },
      { name: 'Amazon EC2', category: 'Cloud', level: 90 },
      { name: 'Amazon S3', category: 'Cloud', level: 90 },
      { name: 'AWS Lambda', category: 'Cloud', level: 85 },
      { name: 'Amazon VPC', category: 'Cloud', level: 90 },
      { name: 'Amazon RDS', category: 'Cloud', level: 85 },
      { name: 'Amazon CloudFront', category: 'Cloud', level: 85 },
      { name: 'Amazon Connect', category: 'Cloud', level: 80 },
      { name: 'Amazon Bedrock', category: 'Cloud', level: 80 },
      { name: 'Amazon Lex', category: 'Cloud', level: 75 },
    ],
  },
  {
    name: 'IaC',
    icon: '',
    skills: [
      { name: 'Terraform', category: 'IaC', level: 80 },
      { name: 'AWS CloudFormation', category: 'IaC', level: 85 },
      { name: 'AWS CDK', category: 'IaC', level: 70 },
    ],
  },
  {
    name: 'ML / AI',
    icon: '',
    skills: [
      { name: 'Amazon Bedrock', category: 'ML / AI', level: 80 },
      { name: 'RAG (Retrieval-Augmented Generation)', category: 'ML / AI', level: 75 },
      { name: 'LangChain', category: 'ML / AI', level: 70 },
      { name: 'ChromaDB / FAISS', category: 'ML / AI', level: 70 },
    ],
  },
  {
    name: 'CI/CD',
    icon: '',
    skills: [
      { name: 'GitHub Actions', category: 'CI/CD', level: 85 },
      { name: 'AWS CodePipeline', category: 'CI/CD', level: 75 },
      { name: 'AWS CodeBuild', category: 'CI/CD', level: 75 },
    ],
  },
  {
    name: 'Languages',
    icon: '',
    skills: [
      { name: 'Python', category: 'Languages', level: 85 },
      { name: 'TypeScript', category: 'Languages', level: 75 },
      { name: 'JavaScript', category: 'Languages', level: 80 },
      { name: 'Bash', category: 'Languages', level: 75 },
      { name: 'SQL', category: 'Languages', level: 70 },
    ],
  },
  {
    name: 'Tools & Others',
    icon: '',
    skills: [
      { name: 'Git / GitHub', category: 'Tools & Others', level: 85 },
      { name: 'Docker', category: 'Tools & Others', level: 75 },
      { name: 'Linux', category: 'Tools & Others', level: 80 },
      { name: 'Nginx', category: 'Tools & Others', level: 70 },
      { name: 'Claude Code', category: 'Tools & Others', level: 80 },
    ],
  },
];
