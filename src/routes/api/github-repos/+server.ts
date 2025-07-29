import { json } from '@sveltejs/kit';
import { githubCache } from '$lib/github-cache';
import { fetchGitHubRepos } from '$lib/github';

export async function GET() {
  try {
    // Use the server-side cache system
    const repos = await fetchGitHubRepos('IORoot');
    
    return json({
      repos: repos,
      totalRepos: repos.length
    });
  } catch (error) {
    console.error('Error fetching repos from cache:', error);
    return json({
      repos: [],
      totalRepos: 0,
      error: 'Failed to load repositories'
    }, { status: 500 });
  }
} 