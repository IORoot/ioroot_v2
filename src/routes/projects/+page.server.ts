import type { PageServerLoad } from './$types';

// Disable prerendering since this route relies on client-side data fetching
export const prerender = false;

export const load: PageServerLoad = async () => {
  // Return empty data - will be loaded client-side
  return {
    repos: [],
    totalRepos: 0
  };
}; 