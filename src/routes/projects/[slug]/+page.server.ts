import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // Return empty data - will be loaded client-side
  return {
    repo: null,
    slug: params.slug
  };
}; 