import { json } from '@sveltejs/kit';
import { githubCache } from '$lib/github-cache';
import { fetchGitHubRepos } from '$lib/github';

export async function POST() {
  try {
    console.log('🔄 Manual cache refresh requested...');
    
    // Force fetch fresh data
    const repos = await fetchGitHubRepos('IORoot');
    
    const metadata = await githubCache.getCacheMetadata();
    
    return json({
      success: true,
      message: `Cache refreshed successfully`,
      repos_count: repos.length,
      last_updated: metadata?.last_updated || new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return json({
      success: false,
      message: 'Failed to refresh cache',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const metadata = await githubCache.getCacheMetadata();
    const repos = await githubCache.getCachedRepos();
    
    return json({
      success: true,
      cache_info: metadata,
      repos_count: repos.length,
      repos: repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        last_cached: repo.last_cached
      }))
    });
  } catch (error) {
    console.error('Error getting cache info:', error);
    return json({
      success: false,
      message: 'Failed to get cache info',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await githubCache.clearCache();
    return json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return json({
      success: false,
      message: 'Failed to clear cache',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 