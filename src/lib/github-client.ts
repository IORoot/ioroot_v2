export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  fork: boolean;
  topics: string[];
  homepage?: string;
  readme_content?: string;
  readme_html?: string;
  // Processed fields
  tags?: string[];
  formattedDate?: string;
  category?: string;
}

export function extractTagsFromRepo(repo: GitHubRepo): string[] {
  const tags: string[] = [];
  
  // Add language as a tag
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Add topics as tags
  if (repo.topics) {
    tags.push(...repo.topics);
  }
  
  // Add some derived tags based on repo properties
  if (repo.archived) {
    tags.push('archived');
  }
  
  if (repo.fork) {
    tags.push('fork');
  }
  
  if (repo.private) {
    tags.push('private');
  }
  
  // Add tags based on stargazers count
  if (repo.stargazers_count > 100) {
    tags.push('popular');
  }
  
  if (repo.stargazers_count > 10) {
    tags.push('starred');
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function categorizeRepo(repo: GitHubRepo): string {
  // Categorize based on language and topics
  const language = repo.language?.toLowerCase() || '';
  const topics = repo.topics?.map(t => t.toLowerCase()) || [];
  const description = repo.description?.toLowerCase() || '';
  const name = repo.name.toLowerCase();
  
  // Web Development
  if (['javascript', 'typescript', 'html', 'css', 'vue', 'react', 'angular', 'svelte'].includes(language) ||
      topics.some(t => ['web', 'frontend', 'backend', 'fullstack', 'spa', 'pwa'].includes(t)) ||
      description.includes('web') || description.includes('frontend') || description.includes('backend')) {
    return 'Web Development';
  }
  
  // Mobile Development
  if (['swift', 'kotlin', 'java', 'react-native', 'flutter', 'dart'].includes(language) ||
      topics.some(t => ['mobile', 'ios', 'android', 'react-native', 'flutter'].includes(t)) ||
      description.includes('mobile') || description.includes('ios') || description.includes('android')) {
    return 'Mobile Development';
  }
  
  // AI/ML
  if (['python', 'julia', 'r'].includes(language) ||
      topics.some(t => ['ai', 'ml', 'machine-learning', 'deep-learning', 'neural-network', 'tensorflow', 'pytorch'].includes(t)) ||
      description.includes('ai') || description.includes('machine learning') || description.includes('neural')) {
    return 'AI/ML';
  }
  
  // Data Science
  if (['python', 'r', 'julia', 'matlab'].includes(language) ||
      topics.some(t => ['data-science', 'data-analysis', 'statistics', 'visualization'].includes(t)) ||
      description.includes('data') || description.includes('analysis') || description.includes('visualization')) {
    return 'Data Science';
  }
  
  // DevOps/Infrastructure
  if (['dockerfile', 'yaml', 'shell', 'bash'].includes(language) ||
      topics.some(t => ['devops', 'docker', 'kubernetes', 'ci-cd', 'infrastructure'].includes(t)) ||
      description.includes('devops') || description.includes('docker') || description.includes('kubernetes')) {
    return 'DevOps/Infrastructure';
  }
  
  // Game Development
  if (['c#', 'c++', 'unity', 'unreal'].includes(language) ||
      topics.some(t => ['game', 'gaming', 'unity', 'unreal'].includes(t)) ||
      description.includes('game') || description.includes('gaming')) {
    return 'Game Development';
  }
  
  // Tools/Utilities
  if (['go', 'rust', 'c', 'c++'].includes(language) ||
      topics.some(t => ['cli', 'tool', 'utility', 'library'].includes(t)) ||
      description.includes('cli') || description.includes('tool') || description.includes('utility')) {
    return 'Tools/Utilities';
  }
  
  // Default category
  return 'Other';
} 