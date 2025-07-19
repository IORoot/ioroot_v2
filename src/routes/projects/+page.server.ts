import type { PageServerLoad } from './$types';
import { extractTagsFromRepo, formatDate, type GitHubRepo } from '$lib/github';
import { githubCache } from '$lib/github-cache';

export const load: PageServerLoad = async () => {
  try {
    // Get cached repos instead of fetching from GitHub
    const repos = await githubCache.getCachedRepos();
    
    // If no repos in cache, return empty state
    if (repos.length === 0) {
          return {
      repos: [],
      totalRepos: 0,
      error: 'No cached data available. Please refresh the cache.'
    };
    }
    
    // Process each repo
    const processedRepos = repos.map(repo => ({
      ...repo,
      tags: extractTagsFromRepo(repo),
      formattedDate: formatDate(repo.updated_at)
    }));
    
    return {
      repos: processedRepos,
      totalRepos: repos.length
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      repos: [],
      totalRepos: 0,
      error: 'Failed to load projects. Please try again later.'
    };
  }
}; 