import { SkillCategory } from '@/types';

/** shields.io badge slug mapping */
export const BADGE_MAP: Record<string, { slug: string; color: string }> = {
  'Amazon Web Services (AWS)': { slug: 'amazonwebservices', color: '232F3E' },
  'Amazon EC2': { slug: 'amazonec2', color: 'FF9900' },
  'Amazon S3': { slug: 'amazons3', color: '569A31' },
  'AWS Lambda': { slug: 'awslambda', color: 'FF9900' },
  'Amazon VPC': { slug: 'amazonwebservices', color: '232F3E' },
  'Amazon RDS': { slug: 'amazonrds', color: '527FFF' },
  'Amazon CloudFront': { slug: 'amazoncloudwatch', color: 'FF4F8B' },
  'Amazon Connect': { slug: 'amazonwebservices', color: 'FF9900' },
  'Amazon Bedrock': { slug: 'amazonwebservices', color: '232F3E' },
  'Amazon Lex': { slug: 'amazonalexa', color: '00CAFF' },
  'Terraform': { slug: 'terraform', color: '844FBA' },
  'AWS CloudFormation': { slug: 'amazonwebservices', color: 'FF4F8B' },
  'AWS CDK': { slug: 'amazonwebservices', color: 'FF9900' },
  'RAG (Retrieval-Augmented Generation)': { slug: 'openai', color: '412991' },
  'LangChain': { slug: 'langchain', color: '1C3C3C' },
  'ChromaDB / FAISS': { slug: 'chroma', color: 'FF6446' },
  'GitHub Actions': { slug: 'githubactions', color: '2088FF' },
  'AWS CodePipeline': { slug: 'amazonwebservices', color: '232F3E' },
  'AWS CodeBuild': { slug: 'amazonwebservices', color: '232F3E' },
  'Python': { slug: 'python', color: '3776AB' },
  'TypeScript': { slug: 'typescript', color: '3178C6' },
  'JavaScript': { slug: 'javascript', color: 'F7DF1E' },
  'Bash': { slug: 'gnubash', color: '4EAA25' },
  'SQL': { slug: 'postgresql', color: '4169E1' },
  'Git / GitHub': { slug: 'github', color: '181717' },
  'Docker': { slug: 'docker', color: '2496ED' },
  'Linux': { slug: 'linux', color: 'FCC624' },
  'Nginx': { slug: 'nginx', color: '009639' },
  'Claude Code': { slug: 'anthropic', color: '191919' },
};

export function getBadgeUrl(skillName: string): string | null {
  const badge = BADGE_MAP[skillName];
  if (!badge) return null;
  const label = encodeURIComponent(skillName);
  return `https://img.shields.io/badge/${label}-${badge.color}?style=flat&logo=${badge.slug}&logoColor=white`;
}

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
