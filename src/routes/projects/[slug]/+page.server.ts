import type { PageServerLoad } from './$types';
import { categorizeRepo, extractTagsFromRepo, formatDate } from '$lib/github';
import { githubCache } from '$lib/github-cache';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { slug } = params;
    
    // Get cached repos instead of fetching from GitHub
    const repos = await githubCache.getCachedRepos();
    const repo = repos.find(r => r.name === slug);
    
    if (!repo) {
      return {
        status: 404,
        error: 'Project not found'
      };
    }
    
    // Process the repo data
    const processedRepo = {
      ...repo,
      category: categorizeRepo(repo),
      tags: extractTagsFromRepo(repo),
      formattedDate: formatDate(repo.updated_at)
    };
    
    // Process the repo data
    
    return {
      repo: processedRepo
    };
  } catch (error) {
    console.error('Error loading project:', error);
    return {
      status: 500,
      error: 'Failed to load project'
    };
  }
}; 