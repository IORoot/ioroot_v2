import type { PageServerLoad } from './$types';
import { categorizeRepo, extractTagsFromRepo, formatDate, type GitHubRepo, type ProjectCategory } from '$lib/github';
import { githubCache } from '$lib/github-cache';

export const load: PageServerLoad = async () => {
  try {
    // Get cached repos instead of fetching from GitHub
    const repos = await githubCache.getCachedRepos();
    
    // If no repos in cache, return empty state
    if (repos.length === 0) {
      return {
        repos: [],
        categories: [],
        totalRepos: 0,
        error: 'No cached data available. Please refresh the cache.'
      };
    }
    
    // Process each repo
    const processedRepos = repos.map(repo => ({
      ...repo,
      category: categorizeRepo(repo),
      tags: extractTagsFromRepo(repo),
      formattedDate: formatDate(repo.updated_at)
    }));
    
    // Group repos by category
    const reposByCategory = processedRepos.reduce((acc, repo) => {
      const categoryName = repo.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = {
          ...repo.category,
          repos: []
        };
      }
      acc[categoryName].repos.push(repo);
      return acc;
    }, {} as Record<string, ProjectCategory & { repos: any[] }>);
    
    // Convert to array and sort by category name
    const categories = Object.values(reposByCategory).sort((a, b) => a.name.localeCompare(b.name));
    
    return {
      repos: processedRepos,
      categories,
      totalRepos: repos.length
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      repos: [],
      categories: [],
      totalRepos: 0,
      error: 'Failed to load projects. Please try again later.'
    };
  }
}; 