import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CachedRepo {
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
  readme_content?: string;
  readme_html?: string;
  last_cached: string;
}

export interface CacheMetadata {
  last_updated: string;
  total_repos: number;
  username: string;
}

class GitHubCache {
  private cacheDir: string;
  private metadataFile: string;
  private reposDir: string;

  constructor() {
    this.cacheDir = path.join(process.cwd(), '.cache', 'github');
    this.metadataFile = path.join(this.cacheDir, 'metadata.json');
    this.reposDir = path.join(this.cacheDir, 'repos');
    
    this.ensureCacheDirectory();
  }

  private ensureCacheDirectory(): void {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
    if (!fs.existsSync(this.reposDir)) {
      fs.mkdirSync(this.reposDir, { recursive: true });
    }
  }

  private getRepoFilePath(repoName: string): string {
    return path.join(this.reposDir, `${repoName}.json`);
  }

  async getCachedRepos(): Promise<CachedRepo[]> {
    try {
      if (!fs.existsSync(this.metadataFile)) {
        return [];
      }

      const metadata: CacheMetadata = JSON.parse(fs.readFileSync(this.metadataFile, 'utf-8'));
      const repos: CachedRepo[] = [];

      // Read all repo files
      const files = fs.readdirSync(this.reposDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const repoData = JSON.parse(fs.readFileSync(path.join(this.reposDir, file), 'utf-8'));
          repos.push(repoData);
        }
      }

      return repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } catch (error) {
      console.error('Error reading cached repos:', error);
      return [];
    }
  }

  async cacheRepos(repos: CachedRepo[]): Promise<void> {
    try {
      // Save each repo individually
      for (const repo of repos) {
        const filePath = this.getRepoFilePath(repo.name);
        fs.writeFileSync(filePath, JSON.stringify(repo, null, 2));
      }

      // Save metadata
      const metadata: CacheMetadata = {
        last_updated: new Date().toISOString(),
        total_repos: repos.length,
        username: 'IORoot'
      };
      fs.writeFileSync(this.metadataFile, JSON.stringify(metadata, null, 2));

      console.log(`✅ Cached ${repos.length} repositories`);
    } catch (error) {
      console.error('Error caching repos:', error);
    }
  }

  async shouldUpdateCache(): Promise<boolean> {
    try {
      if (!fs.existsSync(this.metadataFile)) {
        return true;
      }

      const metadata: CacheMetadata = JSON.parse(fs.readFileSync(this.metadataFile, 'utf-8'));
      const lastUpdated = new Date(metadata.last_updated);
      const now = new Date();
      const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

      // Update if more than 24 hours have passed
      return hoursSinceUpdate >= 24;
    } catch (error) {
      console.error('Error checking cache update:', error);
      return true;
    }
  }

  async getCacheMetadata(): Promise<CacheMetadata | null> {
    try {
      if (!fs.existsSync(this.metadataFile)) {
        return null;
      }
      return JSON.parse(fs.readFileSync(this.metadataFile, 'utf-8'));
    } catch (error) {
      console.error('Error reading cache metadata:', error);
      return null;
    }
  }

  async clearCache(): Promise<void> {
    try {
      if (fs.existsSync(this.cacheDir)) {
        fs.rmSync(this.cacheDir, { recursive: true });
      }
      console.log('✅ Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export const githubCache = new GitHubCache(); 