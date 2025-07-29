import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Return empty data - will be loaded client-side
  return {
    repos: [],
    totalRepos: 0
  };
}; 