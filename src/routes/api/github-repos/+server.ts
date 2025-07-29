import { json } from '@sveltejs/kit';
import { fetchGitHubRepos } from '$lib/github';

export async function GET() {
  try {
    console.log('📡 Fetching GitHub repos for client...');
    
    const repos = await fetchGitHubRepos('IORoot');
    
    return json({
      success: true,
      repos: repos,
      totalRepos: repos.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return json({
      success: false,
      repos: [],
      totalRepos: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 