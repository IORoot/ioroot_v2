export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  readme_content?: string;
  readme_html?: string;
}

export interface ProjectCategory {
  name: string;
  icon: string;
  keywords: string[];
}

import { githubCache, type CachedRepo } from './github-cache';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    name: 'WordPress Development',
    icon: '🔧',
    keywords: ['wordpress', 'wp-plugin', 'wp-theme', 'php']
  },
  {
    name: 'Web Development',
    icon: '🌐',
    keywords: ['javascript', 'react', 'vue', 'html', 'css', 'web']
  },
  {
    name: 'DevOps & Infrastructure',
    icon: '⚙️',
    keywords: ['devops', 'terraform', 'puppet', 'azure', 'infrastructure', 'sre']
  },
  {
    name: 'AI & Machine Learning',
    icon: '🤖',
    keywords: ['ai', 'machine-learning', 'ml', 'neural', 'tensorflow']
  },
  {
    name: 'Video & Media',
    icon: '🎬',
    keywords: ['video', 'youtube', 'ffmpeg', 'media', 'camera']
  },
  {
    name: 'Tools & Utilities',
    icon: '🛠️',
    keywords: ['tool', 'utility', 'script', 'automation']
  },
  {
    name: 'Community & Documentation',
    icon: '📚',
    keywords: ['docs', 'wiki', 'community', 'parkour', 'london']
  }
];

export async function fetchGitHubRepos(username: string = 'IORoot'): Promise<GitHubRepo[]> {
  // Check if we should update the cache
  const shouldUpdate = await githubCache.shouldUpdateCache();
  
  // For testing pagination, force update if we have less than 200 repos
  const cachedRepos = await githubCache.getCachedRepos();
  const forceUpdate = cachedRepos.length > 0 && cachedRepos.length < 200;
  
  if (!shouldUpdate && !forceUpdate) {
    // Use cached data
    if (cachedRepos.length > 0) {
      console.log(`📦 Using cached data (${cachedRepos.length} repos)`);
      return cachedRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        topics: repo.topics,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        archived: repo.archived || false,
        readme_content: repo.readme_content,
        readme_html: repo.readme_html
      }));
    }
  }
  
  // Fetch fresh data from GitHub API
  try {
    console.log('🔄 Fetching fresh data from GitHub API...');
    
    // Get GitHub token from environment (SvelteKit way)
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    
    // Prepare headers
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'IORoot-Portfolio'
    };
    
    // Add authorization if token is available
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // Fetch all repos using pagination
    let allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;
    
    console.log(`🔄 Starting pagination fetch for ${username}...`);
    
    while (true) {
      console.log(`📄 Fetching page ${page}...`);
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`, {
        headers
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          console.warn('GitHub API rate limited, using cached data or empty fallback');
          const cachedRepos = await githubCache.getCachedRepos();
          return cachedRepos.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            topics: repo.topics,
            updated_at: repo.updated_at,
            created_at: repo.created_at,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            archived: repo.archived || false,
            readme_content: repo.readme_content,
            readme_html: repo.readme_html
          }));
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos: GitHubRepo[] = await response.json();
      
      // If no repos returned, we've reached the end
      if (repos.length === 0) {
        break;
      }
      
      allRepos = allRepos.concat(repos);
      console.log(`📦 Fetched page ${page} (${repos.length} repos)`);
      
      // If we got fewer repos than requested, we've reached the end
      if (repos.length < perPage) {
        console.log(`🏁 Reached end of repos (got ${repos.length} < ${perPage})`);
        break;
      }
      
      page++;
      
      // Small delay to be respectful to GitHub API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`📦 Total repos fetched: ${allRepos.length}`);
    
    // Fetch README content for each repo
    const reposWithReadme = await Promise.all(
      allRepos.map(async (repo) => {
        try {
          // Try to fetch raw README from GitHub's raw URL
          const rawReadmeUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/refs/heads/master/README.md`;
          const readmeResponse = await fetch(rawReadmeUrl);
          
          if (readmeResponse.ok) {
            const readmeContent = await readmeResponse.text();
            return {
              ...repo,
              readme_content: readmeContent,
              readme_html: `https://github.com/${username}/${repo.name}/blob/master/README.md`
            };
          } else {
            // Fallback to GitHub API if raw URL doesn't work
            const apiReadmeResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, {
              headers
            });
            if (apiReadmeResponse.ok) {
              const readmeData = await apiReadmeResponse.json();
              let readmeContent = '';
              
              // Decode the base64 content
              readmeContent = atob(readmeData.content);
              
              return {
                ...repo,
                readme_content: readmeContent,
                readme_html: readmeData.html_url
              };
            }
          }
        } catch (error) {
          console.warn(`Could not fetch README for ${repo.name}:`, error);
        }
        return repo;
      })
    );
    
    // Cache the fresh data
    const reposToCache: CachedRepo[] = reposWithReadme.map(repo => ({
      ...repo,
      last_cached: new Date().toISOString()
    }));
    
    await githubCache.cacheRepos(reposToCache);
    
    return reposWithReadme;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    
    // Fallback to cached data if available
    const cachedRepos = await githubCache.getCachedRepos();
    if (cachedRepos.length > 0) {
      console.log('📦 Falling back to cached data');
      return cachedRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        topics: repo.topics,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        archived: repo.archived || false,
        readme_content: repo.readme_content,
        readme_html: repo.readme_html
      }));
    }
    
    return [];
  }
}

export function categorizeRepo(repo: GitHubRepo): ProjectCategory {
  const allText = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')} ${repo.language || ''}`.toLowerCase();
  
  for (const category of PROJECT_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (allText.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  // Default category
  return {
    name: 'Other',
    icon: '📦',
    keywords: []
  };
}

export function extractTagsFromRepo(repo: GitHubRepo): string[] {
  const tags = new Set<string>();
  
  // Add language as tag
  if (repo.language) {
    tags.add(repo.language);
  }
  
  // Add topics as tags
  repo.topics.forEach(topic => tags.add(topic));
  
  // Extract common tech keywords from description and README
  const text = `${repo.description || ''} ${repo.readme_content || ''}`.toLowerCase();
  const techKeywords = [
    'wordpress', 'php', 'javascript', 'react', 'vue', 'python', 'node', 'typescript',
    'terraform', 'puppet', 'azure', 'aws', 'docker', 'kubernetes', 'github', 'api',
    'youtube', 'video', 'ffmpeg', 'svg', 'css', 'html', 'sass', 'laravel'
  ];
  
  techKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  });
  
  return Array.from(tags).slice(0, 8); // Limit to 8 tags
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'today';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
} 